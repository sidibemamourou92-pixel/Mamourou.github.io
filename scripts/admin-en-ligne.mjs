// Publie l'administration en ligne dans dist/admin/ (après `astro build`).
// Même interface que `npm run admin`, mais elle enregistre directement dans le
// dépôt GitHub via l'API (connexion par jeton d'accès personnel).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const root = process.cwd();
const contenu = JSON.parse(readFileSync(join(root, "src", "data", "content.json"), "utf8"));
const depot = (contenu.site.depot || "").trim();

if (!/^[\w.-]+\/[\w.-]+$/.test(depot)) {
  console.log("ℹ️  Admin en ligne non publiée : renseignez « Dépôt GitHub » dans Paramètres.");
  process.exit(0);
}
if (!existsSync(join(root, "dist"))) {
  console.error("❌ dist/ introuvable : lancez d'abord astro build.");
  process.exit(1);
}

const config = {
  depot,
  branche: contenu.site.branche || "main",
  nom: `${contenu.profil.prenom} ${contenu.profil.nom}`,
  favicon: contenu.site.favicon,
  accent: contenu.site.apparence?.couleurAccent,
};

let html = readFileSync(join(root, "admin", "index.html"), "utf8")
  // le navigateur normalise CRLF → LF avant de calculer les empreintes CSP
  .replace(/\r\n?/g, "\n")
  // les polices du site sont un dossier plus haut
  .replaceAll('url("fonts/', 'url("../fonts/')
  .replace(
    '<script id="config" type="application/json">{}</script>',
    `<script id="config" type="application/json">${JSON.stringify(config).replace(/</g, "\\u003c")}</script>`,
  );

// CSP : seuls ce script et ce style peuvent s'exécuter ; seule l'API GitHub est joignable.
const sha = (t) => `'sha256-${createHash("sha256").update(t, "utf8").digest("base64")}'`;
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const styles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
const csp = [
  "default-src 'none'",
  `script-src ${scripts.map(sha).join(" ")}`,
  `style-src ${styles.map(sha).join(" ")}`,
  "img-src 'self' data: blob: https://raw.githubusercontent.com",
  "font-src 'self'",
  "connect-src https://api.github.com",
  "base-uri 'none'",
  "form-action 'none'",
  "object-src 'none'",
].join("; ");

html = html.replace(
  '<meta charset="UTF-8" />',
  `<meta charset="UTF-8" />\n<meta http-equiv="Content-Security-Policy" content="${csp}" />\n<meta name="referrer" content="no-referrer" />`,
);

mkdirSync(join(root, "dist", "admin"), { recursive: true });
writeFileSync(join(root, "dist", "admin", "index.html"), html);
console.log(`✅ Admin en ligne publiée dans dist/admin/ (dépôt ${depot}).`);
