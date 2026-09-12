# Portfolio — Mamourou Sidibé 🚀 v4.0

Portfolio **« développeur »** : thème sombre, fenêtre de code animée, **bilingue FR/EN**,
avec une section **CV** complète (photo + parcours + infos personnelles).
Propulsé par **Astro 7** — zéro dépendance JS, CSS et JS incorporés au build (1 seul fichier HTML).

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
│   ├── js/main.js         → interactions incl. bascule FR/EN (incorporées)
│   ├── logo-tangade.png   → logo de l'entreprise (TengaDé Tech)
│   ├── cv-photo.jpg       → votre photo (remplacez-la par la vôtre)
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
- Thème **« développeur »** sombre par défaut : palette d'éditeur, grille animée, fenêtre de code, accent vert
- **Bilingue FR / EN** : bascule instantanée (bouton FR/EN), mémorisée
- Section **CV** : photo, infos personnelles, langues, nationalité, chiffres clés
- Thème **sombre / clair** mémorisé · effet machine à écrire · filtres de projets · révélation au scroll
- Année et « Mis à jour le » automatiques · formulaire mailto + réseaux · page 404
- Lien de l'entreprise **TengaDé Tech** (logo + slogan) dans le footer et la carte « À propos »
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