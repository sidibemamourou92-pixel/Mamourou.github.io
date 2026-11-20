// ============================================================
//  DONNÉES DU PORTFOLIO
//  Le contenu se modifie dans src/data/content.json,
//  idéalement via l'interface d'administration : `npm run admin`.
//  Ce fichier ne fait que lire ce JSON et calculer les valeurs dérivées.
// ============================================================
// Import surveillé par Astro/Vite : chaque enregistrement depuis l'admin
// recharge automatiquement le site en développement.
import data from "./content.json";

/** Chemin relatif d'un fichier de public/ (ex. "images/photo.jpeg" → "./images/photo.jpeg"). */
export const asset = (p) =>
  !p ? "" : /^(https?:)?\/\//.test(p) ? p : "./" + p.replace(/^\.?\//, "");

/** URL absolue d'un fichier de public/ (SEO, Open Graph). */
export const absolu = (p) =>
  !p
    ? ""
    : /^https?:\/\//.test(p)
      ? p
      : data.site.url.replace(/\/$/, "") + "/" + p.replace(/^\.?\//, "");

/** Nombre d'années révolues depuis une date ISO. */
function anneesDepuis(iso) {
  const debut = new Date(iso);
  const now = new Date();
  let y = now.getFullYear() - debut.getFullYear();
  if (
    now < new Date(now.getFullYear(), debut.getMonth(), debut.getDate())
  )
    y--;
  return Math.max(y, 1);
}

/** N'accepte que les liens http(s) et mailto (bloque javascript:, data:…). */
export const lienSur = (u) => {
  const v = String(u || "").trim();
  return /^(https?:\/\/|mailto:)/i.test(v) ? v : "";
};

export const site = data.site;
export const profil = data.profil;
export const entreprise = { ...data.entreprise, url: lienSur(data.entreprise.url) };
export const competences = data.competences;
export const projets = data.projets.map((p) => ({ ...p, code: lienSur(p.code), demo: lienSur(p.demo) }));
export const parcours = data.parcours.map((p) => ({ ...p, url: lienSur(p.url) }));
export const cv = data.cv;

export const projetCategories = [
  { cle: "tous", label: { fr: "Tous", en: "All" } },
  // On n'affiche que les catégories réellement utilisées par au moins un projet
  ...data.projetCategories.filter((c) =>
    data.projets.some((p) => p.categorie === c.cle),
  ),
];

export const stats = data.stats.map((s) => ({
  ...s,
  valeur:
    s.auto === "annees"
      ? anneesDepuis(profil.pratiqueDepuis)
      : s.auto === "projets"
        ? projets.length
        : s.valeur,
}));

// L'e-mail est toujours ajouté aux réseaux à partir du profil (une seule source).
export const reseaux = [
  ...data.reseaux.map((r) => ({ ...r, url: lienSur(r.url) })).filter((r) => r.url),
  ...(profil.email
    ? [{ nom: "Email", url: `mailto:${profil.email}`, icone: "mail" }]
    : []),
];

export const typesParcours = {
  formation: { fr: "Formation", en: "Education" },
  experience: { fr: "Expérience", en: "Experience" },
  certification: { fr: "Certification", en: "Certification" },
};

const toutesSections = [
  { href: "#accueil", cle: null, label: { fr: "Accueil", en: "Home" } },
  { href: "#apropos", cle: "apropos", label: { fr: "À propos", en: "About" } },
  { href: "#cv", cle: "cv", label: { fr: "CV", en: "Resume" } },
  { href: "#competences", cle: "competences", label: { fr: "Compétences", en: "Skills" } },
  { href: "#projets", cle: "projets", label: { fr: "Projets", en: "Projects" } },
  { href: "#parcours", cle: "parcours", label: { fr: "Parcours", en: "Background" } },
  { href: "#contact", cle: "contact", label: { fr: "Contact", en: "Contact" } },
];

export const sectionVisible = (cle) => site.sections?.[cle] !== false;
export const navigation = toutesSections.filter(
  (s) => s.cle === null || sectionVisible(s.cle),
);

/** Numéro affiché devant chaque section visible (« 01 », « 02 »…). */
export const numeroSection = (cle) => {
  const i = navigation.filter((s) => s.cle).findIndex((s) => s.cle === cle);
  return String(i + 1).padStart(2, "0");
};

// ---------- Apparence ----------
const POLICES = {
  technique: {
    display: "'Space Grotesk', 'Segoe UI', system-ui, sans-serif",
    body: "'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif",
    fichiers: [
      ["Space Grotesk", "space-grotesk.woff2", "300 700"],
      ["IBM Plex Sans", "ibm-plex-sans-400.woff2", "400"],
      ["IBM Plex Sans", "ibm-plex-sans-500.woff2", "500"],
      ["IBM Plex Sans", "ibm-plex-sans-600.woff2", "600"],
      ["JetBrains Mono", "jetbrains-mono.woff2", "100 800"],
    ],
  },
  editorial: {
    display: "'Fraunces', Georgia, 'Times New Roman', serif",
    body: "'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif",
    fichiers: [
      ["Fraunces", "fraunces.woff2", "100 900"],
      ["IBM Plex Sans", "ibm-plex-sans-400.woff2", "400"],
      ["IBM Plex Sans", "ibm-plex-sans-500.woff2", "500"],
      ["IBM Plex Sans", "ibm-plex-sans-600.woff2", "600"],
      ["JetBrains Mono", "jetbrains-mono.woff2", "100 800"],
    ],
  },
  systeme: {
    display: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
    fichiers: [],
  },
};
const ARRONDIS = { net: "2px", doux: "8px", arrondi: "18px" };

function texteSur(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
  if (!m) return "#ffffff";
  const n = parseInt(m[1], 16);
  const lin = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  // contraste avec blanc vs noir
  return (1.05 / (L + 0.05)) >= ((L + 0.05) / 0.05) ? "#ffffff" : "#111111";
}

const ap = site.apparence ?? {};
const police = POLICES[ap.police] ?? POLICES.technique;
const accent = /^#[0-9a-f]{6}$/i.test(ap.couleurAccent || "") ? ap.couleurAccent : "#0e7490";

/** CSS généré à partir des réglages d'apparence (polices + variables). */
export const cssApparence =
  police.fichiers
    .map(
      ([fam, f, w]) =>
        `@font-face{font-family:'${fam}';src:url('./fonts/${f}') format('woff2');font-weight:${w};font-style:normal;font-display:swap}`,
    )
    .join("") +
  `:root{--accent:${accent};--on-accent:${texteSur(accent)};--radius:${ARRONDIS[ap.arrondi] ?? ARRONDIS.doux};` +
  `--f-display:${police.display};--f-body:${police.body};--f-mono:${police.fichiers.length ? "'JetBrains Mono'," : ""}ui-monospace,'Cascadia Code',Consolas,monospace}`;

export const couleurAccent = accent;
export const photoAccueil = ap.photoAccueil !== false;

export const build = new Date().toISOString();
