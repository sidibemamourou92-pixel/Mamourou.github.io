# Portfolio — Mamourou Sidibé

Portfolio **3.0**, minimal et moderne, pour un ingénieur informatique.
Propulsé par **Astro 7** — zéro dépendance JS, CSS et JS incorporés au build. Le site s'ouvre partout, sans configuration.

## 👀 Voir le site

| Méthode | Commande |
|---|---|
| **Double-clic** | Ouvrez `index.html` à la racine (copie générée du site) |
| **Serveur local** | `npm install` puis `npm run dev` → http://localhost:4321 |
| **Build statique** | `npm run build` → le site prêt à publier est dans `dist/` |

## 📁 Structure

```
├── public/
│   ├── css/global.css     → design system (incorporé au HTML au build)
│   ├── js/main.js         → interactions (incorporées au HTML au build)
│   └── favicon.svg
├── src/
│   ├── data/site.js       → TOUT le contenu se modifie ici
│   ├── components/        → Header, Hero, APropos, Competences, Projets…
│   ├── layouts/Layout.astro
│   └── pages/             → index.astro, 404.astro
├── scripts/sync-root.mjs  → copie le build vers la racine (double-clic)
├── dist/                  → build généré (ignoré par git)
└── astro.config.mjs       → base: './' (chemins relatifs)
```

## ✨ Fonctionnalités

- Design **propre et minimal** : fond clair, un seul accent, cartes fines
- Thème **sombre / clair** mémorisé (+ `prefers-color-scheme`)
- Effet machine à écrire, filtres de projets, révélation au scroll (sans jamais laisser une page vide)
- Année et « Mis à jour le » automatiques · formulaire mailto + réseaux · page 404
- Accessible : liens d'évitement, focus visibles, `prefers-reduced-motion`, ARIA
- Impression : styles d'impression optimisés (CV)

## ✏️ Personnaliser

Tout le contenu est centralisé dans **`src/data/site.js`** :
profil, spécialités, compétences, projets, parcours, réseaux et navigation.
Modifiez, puis `npm run build`.

## 🚢 Déploiement

Site **statique** (`dist/`), chemins **relatifs** : fonctionne partout.

- **GitHub Pages** : workflow fourni dans `.github/workflows/deploy.yml` (pousser sur `main`)
- **Netlify / Vercel** : build `npm run build`, répertoire `dist`

© Mamourou Sidibé — fait avec ❤️ et Astro.