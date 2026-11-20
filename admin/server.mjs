// ============================================================
//  ADMIN DU PORTFOLIO — serveur local (zéro dépendance)
//  Lancer :  npm run admin   →  http://localhost:4322
//
//  - Édite src/data/content.json (sauvegarde automatique de l'ancienne
//    version dans .admin-backups/)
//  - Téléverse photo, logo, favicon, image de partage, CV PDF, images de projets
//    dans public/images/ et public/files/
//  - Génère le site (npm run build) et le prévisualise sur /preview/
//
//  Sécurité :
//  - écoute uniquement sur 127.0.0.1, vérifie l'en-tête Host (anti DNS-rebinding)
//  - vérifie l'Origin des requêtes d'écriture (anti CSRF)
//  - connexion obligatoire : mot de passe haché (scrypt) dans .admin-secret.json
//    (jamais commité), session par cookie HttpOnly/SameSite=Strict, 8 h max,
//    5 essais ratés → blocage 15 min
//  Mot de passe oublié :  npm run admin -- --reset-password
// ============================================================
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import {
  readFile,
  writeFile,
  mkdir,
  readdir,
  unlink,
  stat,
  copyFile,
} from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, resolve, sep, basename } from "node:path";
import { timingSafeEqual, scrypt, randomBytes } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

const ROOT = process.cwd();
const PORT = Number(process.env.ADMIN_PORT) || 4322;
const HOST = "127.0.0.1";
const SECRET = join(ROOT, ".admin-secret.json");
const SESSION_MS = 8 * 60 * 60 * 1000; // 8 h
const CONTENT = join(ROOT, "src", "data", "content.json");
const PUBLIC = join(ROOT, "public");
const DIST = join(ROOT, "dist");
const BACKUPS = join(ROOT, ".admin-backups");
const UI = join(ROOT, "admin", "index.html");
const MAX_UPLOAD = 8 * 1024 * 1024; // 8 Mo

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
};

// Types de fichiers acceptés par emplacement
const SLOTS = {
  photo: { dir: "images", base: "photo", ext: [".jpg", ".jpeg", ".png", ".webp"] },
  favicon: { dir: "images", base: "favicon", ext: [".svg", ".png", ".ico"] },
  logo: { dir: "images", base: "logo-entreprise", ext: [".png", ".svg", ".webp", ".jpg", ".jpeg"] },
  partage: { dir: "images", base: "partage", ext: [".jpg", ".jpeg", ".png"] },
  cv: { dir: "files", base: "cv", ext: [".pdf"] },
  projet: { dir: "images/projets", base: null, ext: [".jpg", ".jpeg", ".png", ".webp", ".svg"] },
  logoParcours: { dir: "images/logos", base: null, ext: [".png", ".svg", ".webp", ".jpg", ".jpeg"] },
};

// ---------- utilitaires ----------
const send = (res, code, body, type = "application/json; charset=utf-8") => {
  res.writeHead(code, {
    "Content-Type": type,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
  });
  res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
};

function readBody(req, limit) {
  return new Promise((ok, ko) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) {
        ko(Object.assign(new Error("Fichier trop volumineux (max 8 Mo)."), { code: 413 }));
        req.destroy();
      } else chunks.push(c);
    });
    req.on("end", () => ok(Buffer.concat(chunks)));
    req.on("error", ko);
  });
}

/** Résout un chemin à l'intérieur d'un dossier, sans pouvoir en sortir. */
function inside(dir, rel) {
  const p = resolve(dir, "." + sep + decodeURIComponent(rel).replace(/^[/\\]+/, ""));
  return p === dir || p.startsWith(dir + sep) ? p : null;
}

async function serveFile(res, file, sandbox = false) {
  try {
    const s = await stat(file);
    if (s.isDirectory()) return serveFile(res, join(file, "index.html"), sandbox);
    // Fichiers envoyés (SVG…) : jamais exécutés dans l'origine de l'admin
    if (sandbox) res.setHeader("Content-Security-Policy", "sandbox; default-src 'none'; style-src 'unsafe-inline'; img-src data:");
    send(res, 200, await readFile(file), MIME[extname(file).toLowerCase()] || "application/octet-stream");
  } catch {
    send(res, 404, "Introuvable", "text/plain; charset=utf-8");
  }
}

function safeEq(a, b) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

// ---------- authentification ----------
const sessions = new Map(); // jeton → expiration
const essais = new Map(); // ip → { n, jusqua }

async function lireSecret() {
  try { return JSON.parse(await readFile(SECRET, "utf8")); } catch { return null; }
}
async function hacher(mdp, sel = randomBytes(16).toString("hex")) {
  const h = await scryptAsync(mdp.normalize("NFKC"), sel, 64, { N: 16384, r: 8, p: 1 });
  return { sel, hash: h.toString("hex") };
}
async function verifier(mdp) {
  const s = await lireSecret();
  if (!s) return false;
  const { hash } = await hacher(mdp, s.sel);
  return safeEq(hash, s.hash);
}
function motDePasseValide(m) {
  return typeof m === "string" && m.length >= 10 && m.length <= 200;
}
function cookieSession(req) {
  const m = /(?:^|;\s*)admin_session=([a-f0-9]{64})/.exec(req.headers.cookie || "");
  return m ? m[1] : null;
}
function estConnecte(req) {
  const t = cookieSession(req);
  const exp = t && sessions.get(t);
  if (!exp) return false;
  if (exp < Date.now()) { sessions.delete(t); return false; }
  return true;
}
function ouvrirSession(res) {
  const t = randomBytes(32).toString("hex");
  sessions.set(t, Date.now() + SESSION_MS);
  res.setHeader("Set-Cookie", `admin_session=${t}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_MS / 1000}`);
}
function fermerSession(req, res) {
  const t = cookieSession(req);
  if (t) sessions.delete(t);
  res.setHeader("Set-Cookie", "admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0");
}
function bloque(ip) {
  const e = essais.get(ip);
  return e && e.n >= 5 && e.jusqua > Date.now();
}
function echec(ip) {
  const e = essais.get(ip);
  const n = e && e.jusqua > Date.now() ? e.n + 1 : 1;
  essais.set(ip, { n, jusqua: Date.now() + 15 * 60 * 1000 });
}
async function lireJson(req) {
  try { return JSON.parse((await readBody(req, 10 * 1024)).toString("utf8")); } catch { return {}; }
}

// ---------- validation minimale du contenu ----------
function valider(c) {
  const erreurs = [];
  const req = (cond, msg) => cond || erreurs.push(msg);
  req(c && typeof c === "object", "Contenu invalide.");
  if (erreurs.length) return erreurs;
  req(c.site?.url?.startsWith("http"), "Paramètres : l'URL du site doit commencer par http(s)://");
  req(c.profil?.prenom?.trim(), "Profil : le prénom est obligatoire.");
  req(c.profil?.nom?.trim(), "Profil : le nom est obligatoire.");
  req(
    !c.profil?.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.profil.email),
    "Profil : adresse e-mail invalide.",
  );
  req(!c.profil?.pratiqueDepuis || !isNaN(Date.parse(c.profil.pratiqueDepuis)), "Profil : date « pratique depuis » invalide.");
  req(Array.isArray(c.projets), "Projets : liste attendue.");
  const ap = c.site?.apparence;
  req(!ap?.couleurAccent || /^#[0-9a-f]{6}$/i.test(ap.couleurAccent), "Apparence : couleur invalide (format #RRGGBB).");
  req(!ap?.police || ["technique", "editorial", "systeme"].includes(ap.police), "Apparence : police inconnue.");
  const fo = c.site?.formulaire;
  req(!fo?.service || ["formsubmit", "web3forms", "mailto"].includes(fo.service), "Formulaire : service inconnu.");
  req(fo?.service !== "web3forms" || /^[0-9a-f-]{36}$/i.test(fo.cleWeb3forms || ""), "Formulaire : la clé Web3Forms doit ressembler à xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.");
  req(fo?.service === "mailto" || c.profil?.email, "Formulaire : renseignez votre e-mail dans le Profil pour recevoir les messages.");
  req(!ap?.arrondi || ["net", "doux", "arrondi"].includes(ap.arrondi), "Apparence : arrondi inconnu.");
  const cats = new Set((c.projetCategories || []).map((x) => x.cle));
  (c.projets || []).forEach((p, i) => {
    req(cats.has(p.categorie), `Projet n°${i + 1} : catégorie « ${p.categorie} » inconnue.`);
  });
  for (const [k, v] of Object.entries({ "favicon": c.site?.favicon, "photo": c.profil?.photo })) {
    req(!v || existsSync(join(PUBLIC, v)), `Fichier ${k} introuvable : public/${v}`);
  }
  return erreurs;
}

// ---------- build ----------
let buildEnCours = null;
function lancerBuild() {
  if (buildEnCours) return buildEnCours;
  buildEnCours = new Promise((ok) => {
    const npm = process.platform === "win32" ? "npm.cmd" : "npm";
    const child = spawn(npm, ["run", "build"], { cwd: ROOT, shell: process.platform === "win32" });
    let log = "";
    child.stdout.on("data", (d) => (log += d));
    child.stderr.on("data", (d) => (log += d));
    child.on("close", (code) => ok({ ok: code === 0, code, log: log.slice(-6000) }));
    child.on("error", (e) => ok({ ok: false, code: -1, log: String(e) }));
  }).finally(() => (buildEnCours = null));
  return buildEnCours;
}

// ---------- serveur ----------
const server = createServer(async (req, res) => {
  try {
    // Anti DNS-rebinding : n'accepter que localhost
    const host = (req.headers.host || "").replace(/:\d+$/, "");
    if (!["localhost", "127.0.0.1", "[::1]"].includes(host)) return send(res, 403, { error: "Hôte refusé" });

    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const ecriture = req.method !== "GET" && req.method !== "HEAD";

    if (ecriture) {
      // Anti CSRF : la requête doit venir de l'admin lui-même
      const origin = req.headers.origin || "";
      if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) || !origin.endsWith(":" + PORT))
        return send(res, 403, { error: "Origine refusée" });
    }
    // --- Interface (ne contient aucune donnée) ---
    if (req.method === "GET" && (path === "/" || path === "/index.html")) return serveFile(res, UI);

    // --- Routes publiques : identité visuelle de la page de connexion ---
    const contenuPublic = async () => JSON.parse(await readFile(CONTENT, "utf8"));
    if (path === "/api/branding" && req.method === "GET") {
      const c = await contenuPublic();
      return send(res, 200, { nom: `${c.profil.prenom} ${c.profil.nom}`, favicon: c.site.favicon, accent: c.site.apparence?.couleurAccent });
    }
    if (req.method === "GET" && path.startsWith("/fonts/")) {
      const f = inside(join(PUBLIC, "fonts"), path.slice("/fonts/".length));
      return f ? serveFile(res, f, true) : send(res, 400, "Chemin invalide", "text/plain");
    }
    if (req.method === "GET" && (path.startsWith("/public/fonts/") || path === "/public/" + (await contenuPublic()).site.favicon)) {
      const f = inside(PUBLIC, path.slice("/public/".length));
      return f ? serveFile(res, f, true) : send(res, 400, "Chemin invalide", "text/plain");
    }

    // --- Connexion ---
    const ip = req.socket.remoteAddress || "local";
    if (path === "/api/session" && req.method === "GET") {
      return send(res, 200, { configure: existsSync(SECRET), connecte: estConnecte(req) });
    }
    if (path === "/api/setup" && req.method === "POST") {
      if (existsSync(SECRET)) return send(res, 409, { error: "Un mot de passe existe déjà." });
      const { motDePasse } = await lireJson(req);
      if (!motDePasseValide(motDePasse)) return send(res, 400, { error: "Le mot de passe doit contenir au moins 10 caractères." });
      await writeFile(SECRET, JSON.stringify(await hacher(motDePasse)), { encoding: "utf8", mode: 0o600, flag: "wx" });
      ouvrirSession(res);
      return send(res, 200, { ok: true });
    }
    if (path === "/api/login" && req.method === "POST") {
      if (bloque(ip)) return send(res, 429, { error: "Trop d'essais. Réessayez dans 15 minutes." });
      const { motDePasse } = await lireJson(req);
      if (typeof motDePasse !== "string" || !(await verifier(motDePasse))) {
        echec(ip);
        await new Promise((r) => setTimeout(r, 600)); // ralentit les essais en rafale
        return send(res, 401, { error: "Mot de passe incorrect." });
      }
      essais.delete(ip);
      ouvrirSession(res);
      return send(res, 200, { ok: true });
    }
    if (path === "/api/logout" && req.method === "POST") {
      fermerSession(req, res);
      return send(res, 200, { ok: true });
    }

    // --- Tout le reste exige une session valide ---
    if (!estConnecte(req)) {
      if (path.startsWith("/api/")) return send(res, 401, { error: "Session expirée : reconnectez-vous." });
      res.writeHead(302, { Location: "/" });
      return res.end();
    }

    if (path === "/api/password" && req.method === "POST") {
      const { ancien, nouveau } = await lireJson(req);
      if (bloque(ip)) return send(res, 429, { error: "Trop d'essais. Réessayez dans 15 minutes." });
      if (typeof ancien !== "string" || !(await verifier(ancien))) { echec(ip); return send(res, 401, { error: "Mot de passe actuel incorrect." }); }
      if (!motDePasseValide(nouveau)) return send(res, 400, { error: "Le nouveau mot de passe doit contenir au moins 10 caractères." });
      await writeFile(SECRET, JSON.stringify(await hacher(nouveau)), { encoding: "utf8", mode: 0o600 });
      sessions.clear(); // déconnecte les autres sessions
      ouvrirSession(res);
      return send(res, 200, { ok: true });
    }

    // --- Fichiers de public/ (aperçu des images dans l'admin) ---
    if (req.method === "GET" && path.startsWith("/public/")) {
      const f = inside(PUBLIC, path.slice("/public/".length));
      return f ? serveFile(res, f, true) : send(res, 400, "Chemin invalide", "text/plain");
    }

    // --- Aperçu du site généré ---
    if (req.method === "GET" && (path === "/preview" || path.startsWith("/preview/"))) {
      if (path === "/preview") {
        res.writeHead(302, { Location: "/preview/" });
        return res.end();
      }
      if (!existsSync(join(DIST, "index.html")))
        return send(res, 404, "Aucun build : cliquez sur « Enregistrer & générer » dans l'admin.", "text/plain; charset=utf-8");
      const f = inside(DIST, path.slice("/preview/".length) || "index.html");
      return f ? serveFile(res, f) : send(res, 400, "Chemin invalide", "text/plain");
    }

    // --- API ---

    if (path === "/api/content" && req.method === "GET") {
      return send(res, 200, await readFile(CONTENT, "utf8"));
    }

    if (path === "/api/content" && req.method === "PUT") {
      const raw = await readBody(req, 2 * 1024 * 1024);
      let data;
      try {
        data = JSON.parse(raw.toString("utf8"));
      } catch {
        return send(res, 400, { error: "JSON invalide." });
      }
      const erreurs = valider(data);
      if (erreurs.length) return send(res, 422, { error: "Contenu invalide.", details: erreurs });
      await mkdir(BACKUPS, { recursive: true });
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      await copyFile(CONTENT, join(BACKUPS, `content-${stamp}.json`));
      // On ne garde que les 30 dernières sauvegardes
      const olds = (await readdir(BACKUPS)).filter((f) => f.startsWith("content-")).sort();
      for (const f of olds.slice(0, Math.max(0, olds.length - 30))) await unlink(join(BACKUPS, f));
      await writeFile(CONTENT, JSON.stringify(data, null, 2) + "\n", "utf8");
      return send(res, 200, { ok: true });
    }

    if (path === "/api/upload" && req.method === "POST") {
      const slot = SLOTS[url.searchParams.get("slot")];
      const nom = basename(url.searchParams.get("name") || "");
      const ext = extname(nom).toLowerCase();
      if (!slot) return send(res, 400, { error: "Emplacement inconnu." });
      if (!slot.ext.includes(ext))
        return send(res, 400, { error: `Format non accepté (${slot.ext.join(", ")}).` });
      const buf = await readBody(req, MAX_UPLOAD);
      if (!buf.length) return send(res, 400, { error: "Fichier vide." });

      const dir = join(PUBLIC, slot.dir);
      await mkdir(dir, { recursive: true });
      let base = slot.base;
      if (!base) {
        const propre = nom
          .slice(0, -ext.length)
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 40) || "image";
        base = `${propre}-${Date.now().toString(36)}`;
      } else {
        // Supprime l'ancienne version de cet emplacement (autre extension)
        for (const f of await readdir(dir)) {
          if (f.startsWith(base + ".") && f !== base + ext) await unlink(join(dir, f)).catch(() => {});
        }
      }
      await writeFile(join(dir, base + ext), buf);
      return send(res, 200, { ok: true, path: `${slot.dir}/${base}${ext}` });
    }

    if (path === "/api/build" && req.method === "POST") {
      return send(res, 200, await lancerBuild());
    }

    if (path === "/api/backups" && req.method === "GET") {
      const list = existsSync(BACKUPS) ? (await readdir(BACKUPS)).filter((f) => f.endsWith(".json")).sort().reverse() : [];
      return send(res, 200, list);
    }

    if (path === "/api/restore" && req.method === "POST") {
      const f = inside(BACKUPS, url.searchParams.get("file") || "");
      if (!f || !existsSync(f)) return send(res, 404, { error: "Sauvegarde introuvable." });
      await copyFile(CONTENT, join(BACKUPS, `content-${new Date().toISOString().replace(/[:.]/g, "-")}-avant-restauration.json`));
      await copyFile(f, CONTENT);
      return send(res, 200, { ok: true });
    }

    send(res, 404, { error: "Introuvable" });
  } catch (e) {
    send(res, e.code === 413 ? 413 : 500, { error: e.message || String(e) });
  }
});

// Mot de passe oublié : npm run admin -- --reset-password
if (process.argv.includes("--reset-password")) {
  if (existsSync(SECRET)) await unlink(SECRET);
  console.log("\n  🔑 Mot de passe supprimé : vous en choisirez un nouveau à la prochaine connexion.");
}

server.listen(PORT, HOST, () => {
  console.log(`\n  ⚙️  Admin du portfolio : http://localhost:${PORT}`);
  console.log(`     Contenu : src/data/content.json`);
  console.log(existsSync(SECRET) ? "     Connexion protégée par mot de passe" : "     Première connexion : vous allez créer votre mot de passe");
  console.log("     Ctrl+C pour arrêter.\n");
});
