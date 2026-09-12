# 🚀 Portfolio — Mamourou Sidibé

Portfolio **entièrement réinventé** avec **Astro 7**, en **zéro dépendance JS**.

> Ingénieur en Informatique · Robotique · IoT · IA embarquée

## 👀 Voir le site (mode rapide)

| Méthode | Commande / Action |
|---|---|
| **Double-clic** | Ouvrez **`index.html`** à la racine du projet → le site s'affiche directement (copie générée par le build, aucune installation nécessaire) |
| **Serveur local** | `npm install` puis `npm run dev` → http://localhost:4321 |
| **Build statique** | `npm run build` → le site prêt à publier est dans **`dist/`** |

## ✨ Nouvelles fonctionnalités

- 🌗 **Thème sombre / clair** (mémorisé, respecte `prefers-color-scheme`)
- ⌨️ **Effet machine à écrire** sur le titre (rôles animés)
- 📊 **Compteurs animés** de statistiques
- 🔍 **Recherche + filtres** de compétences et de projets
- 🃏 **Filtrage de projets** par catégorie + effet **tilt 3D** sur les cartes
- 📂 **Modale projet** détaillée avec **carrousel** d'images et navigation clavier
- 📶 **Barres de compétences animées** au scroll
- ⏳ **Timeline** de parcours / formation
- 🖼️ **Galerie photos** avec **lightbox** (flèches + Échap)
- 📮 **Formulaire de contact validé** avec ouverture du client mail
- 🧭 **Barre de progression** de lecture + bouton **retour en haut**
- ♿ **Accessibilité** : liens d'évitement, focus visibles, `prefers-reduced-motion`, ARIA
- 🔍 **SEO** renforcé (Open Graph, Twitter Card, JSON-LD)
- 🚫 **Page 404** personnalisée
- ⏱️ **Portfolio évolutif** : horloge « en ligne », année automatique, compteurs d’expérience
- 🐙 **Stats GitHub en direct** : repos, étoiles et dernière activité (repli élégant hors-ligne)
- 📜 **Chronique d’activité** : journal daté, trié automatiquement, modifiable dans `src/data/site.js`

## ♻️ Il évolue dans le temps

- **`src/data/site.js`** centralise tout : ajoutez un projet, une compétence ou une entrée de **chronique** sans toucher au code.
- Les **compteurs automatiques** (année, années d’ingénierie, horloge, date de mise à jour) restent à jour tout seuls.
- Les **statistiques GitHub** (repos, étoiles, dernière activité) sont lues en direct depuis l’API publique, avec repli hors-ligne.
- Après modification : `npm run build` et le site est à jour.

## 🧰 Stack

| Outil | Rôle |
|---|---|
| **Astro 7** | Framework statique ultra-rapide |
| **CSS custom** | Design system en tokens, thèmes clair/sombre |
| **JS vanilla** | Toutes les interactions (zéro dépendance) |
| **SVG inline** | Icones + illustrations techniques des projets |

## 📁 Structure

```
├── public/                 → sources statiques (CSS, JS, images, favicon)
│   ├── css/global.css      → toute la feuille de style (incorporée dans le HTML au build)
│   ├── js/main.js          → toutes les interactions (incorporé dans le HTML au build)
│   ├── image/              → images + illustrations SVG
│   └── favicon.svg
├── src/                    → code source Astro
│   ├── data/site.js        → TOUT le contenu est modifiable ici
│   ├── components/         → Hero, About, Skills, Projects, Gallery…
│   ├── layouts/Layout.astro
│   └── pages/              → index.astro, 404.astro
├── scripts/sync-root.mjs   → copie le build (dist/) vers la racine
├── legacy/                 → sauvegarde de l'ancienne version du site
├── dist/                   → build généré (ignoré par git)
└── astro.config.mjs        → base: './' (chemins relatifs)
```

> ⚙️ **Fichiers générés** : `index.html`, `404.html`, `favicon.svg`, `css/`, `js/`, `image/`
> à la racine du projet sont produits par `npm run build` (raccourci « double-clic »).
> Ils sont **ignorés par git** — la source de vérité reste `src/` + `public/`.

## 🛠️ Démarrage

```bash
npm install
npm run dev        # développement (http://localhost:4321)
npm run build      # → dossier dist/ (statique, prêt à publier)
npm run preview    # prévisualiser le build
```

## 🚢 Déploiement

Le site est **statique** (`dist/`), les chemins sont **relatifs** (`base: './'`), donc il fonctionne partout :

- **GitHub Pages** : le workflow `.github/workflows/deploy.yml` est fourni (pousser sur `main` déploie)
- **Netlify / Vercel** : build `npm run build`, répertoire `dist`
- **Local** : ouvrir `dist/index.html` dans un navigateur (Chemins relatifs)

## ✏️ Personnaliser

Tout le contenu est centralisé dans **`src/data/site.js`** :
projets, compétences, sites web, parcours, galerie, réseaux sociaux, email…

© Mamourou Sidibé — fait avec ❤️ et Astro.