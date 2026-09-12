# Portfolio — Mamourou Sidibé 🚀 v4.1

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
│   ├── favicon.svg
│   ├── robots.txt         → référencement Google
│   ├── sitemap.xml        → plan du site pour Google
│   └── .nojekyll          → GitHub Pages (pas de Jekyll)
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

- Design **« développeur »** : sombre par défaut, palette d'éditeur, grille animée, fenêtre de code, accent vert
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

## 📱 Mobile

Adapté à **toutes les tailles d'écran** (320 px → 4K, iOS & Android) :
menu **déroulant** sous l'en-tête avec voile de fermeture, champs de saisie sans zoom
iOS, zones tactiles confortables, encoches (notch) gérées, boutons pleine largeur.

## 🚢 Déploiement

Site **statique** (`dist/`), 100 % autonome (1 fichier HTML + images), chemins relatifs.

- **Nom du déploiement** : `mamourou-sidibe-portfolio` (`vercel.json` + bloc `deploiement` dans `src/data/site.js`)
- **GitHub Pages** : workflow fourni (`.github/workflows/deploy.yml`) — poussez sur `main`.
  URL finale selon le nom du dépôt : `https://sidibemamourou92-pixel.github.io/` (dépôt `<utilisateur>.github.io`)
  ou `/Portolio/` (dépôt classique).
- **Vercel** : `vercel.json` fourni (framework Astro, sortie `dist`, cache des images).
- **Après mise en ligne** : mettez à jour l'URL dans `src/data/site.js` → `deploiement.url`.

## 🔍 Indexation Google

Déjà en place :
- `robots.txt` + `sitemap.xml` (URL, fréquence, priorité)
- `canonical`, `robots index,follow`, `theme-color`, `geo.region`
- **Open Graph**, **Twitter Card**, **JSON-LD** (Person : nom, rôle, e-mail, réseaux, adresse, langues)

Une fois le site en ligne :
1. [Google Search Console](https://search.google.com/search-console) → ajoutez votre site
2. Soumettez `https://votre-site/sitemap.xml`
3. Contrôlez l'indexation : recherchez `site:votre-site`

© Mamourou Sidibé — fait avec ❤️ et Astro.