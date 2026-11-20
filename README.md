# Portfolio — Mamourou Sidibé

Portfolio d'ingénieur informatique (embarqué, IoT, web) : thème sombre/clair,
bilingue FR/EN, section CV, projets filtrables, et **interface d'administration locale**
pour modifier tout le contenu, la photo, le favicon et les réglages sans toucher au code.

Propulsé par **Astro** — site 100 % statique, CSS et JS incorporés au HTML au build.

## Démarrage

```bash
npm install
npm run admin    # interface d'administration → http://localhost:4322
npm run dev      # site en développement     → http://localhost:4321
npm run build    # site prêt à publier dans dist/ (+ copie à la racine)
```

## ⚙️ Administration (`npm run admin`)

| Écran              | Ce qu'on y modifie                                                                  |
| ------------------ | ----------------------------------------------------------------------------------- |
| **Apparence**      | Couleur principale, typographie, forme des éléments, thème par défaut (aperçu direct) |
| **Paramètres**     | URL du site (SEO), langue par défaut, sections affichées/masquées                   |
| **Photo & médias** | Photo de profil, favicon, logo d'entreprise, image de partage, CV en PDF            |
| **Profil**         | Nom, titre, accroche, présentation, disponibilité, coordonnées                      |
| **Chiffres clés**  | Chiffres sous votre nom (années / nombre de projets calculés automatiquement)       |
| **Entreprise**     | Nom, fonction, slogan, lien                                                         |
| **Réseaux**        | GitHub, LinkedIn… (l'e-mail du profil est ajouté automatiquement)                   |
| **Compétences**    | Domaines, niveaux, technologies                                                     |
| **Projets**        | Projets (image, liens Code/Démo), catégories                                        |
| **Parcours**       | Formations, expériences, logo de l'établissement, mise en avant dans « À propos »   |
| **CV**             | Résumé, langues                                                                     |
| **Publier**        | Générer le site, prévisualiser, restaurer une sauvegarde                            |

- Le contenu est stocké dans **`src/data/content.json`** ; les fichiers envoyés vont dans
  `public/images/` et `public/files/`.
- Chaque enregistrement sauvegarde l'ancienne version dans `.admin-backups/` (30 dernières).
- L'admin n'écoute que sur la machine locale (127.0.0.1) et n'est **jamais publiée** avec le site.
- **Connexion obligatoire** : au premier lancement, vous créez votre mot de passe (10 caractères min.).
  Il est stocké haché (scrypt) dans `.admin-secret.json`, jamais commité. Session de 8 h,
  blocage 15 min après 5 essais ratés. Changement du mot de passe : Paramètres → Sécurité.
  Mot de passe oublié : `npm run admin -- --reset-password`.
- Raccourci : **Ctrl + S** pour enregistrer.

### Mettre en ligne après une modification

```bash
git add -A
git commit -m "Mise à jour du contenu"
git push
```

GitHub Actions (`.github/workflows/deploy.yml`) ou Vercel (`vercel.json`) reconstruit et publie le site.

## 📁 Structure

```
├── admin/
│   ├── server.mjs         → serveur de l'admin (Node, zéro dépendance)
│   └── index.html         → interface de l'admin
├── public/
│   ├── images/            → photo, favicon, logo, images de projets
│   ├── files/             → CV PDF (si ajouté)
│   ├── css/global.css     → design system (incorporé au HTML au build)
│   └── js/main.js         → interactions (thème, langue, filtres…)
├── src/
│   ├── data/content.json  → TOUT le contenu (modifié par l'admin)
│   ├── data/site.js       → lecture du JSON + valeurs calculées
│   ├── components/        → Header, Hero, APropos, CV, Competences, Projets…
│   ├── layouts/Layout.astro
│   └── pages/             → index, 404, robots.txt, sitemap.xml (générés depuis la config)
└── scripts/               → minification (esbuild) et copie du build à la racine
```

## 🔒 Sécurité du site publié

- **CSP** (Content-Security-Policy) : seuls les scripts et styles du site (empreintes SHA-256
  calculées au build) peuvent s'exécuter ; le formulaire ne peut joindre que FormSubmit/Web3Forms.
- Liens filtrés (seuls `http(s)://` et `mailto:` sont acceptés), données structurées échappées.
- En-têtes de sécurité sur Vercel (`vercel.json`) : HSTS, anti-iframe, nosniff, Permissions-Policy.
- L'admin n'est jamais publiée : seul `dist/` est mis en ligne.

## ✨ Fonctionnalités

- Thème sombre/clair et langue FR/EN mémorisés (valeurs par défaut réglables)
- Années d'expérience et nombre de projets calculés automatiquement
- SEO : canonical, Open Graph, JSON-LD `Person`, sitemap et robots générés depuis l'URL du site
- Accessible : lien d'évitement, focus visibles, `prefers-reduced-motion`, ARIA
- Responsive de 320 px à 4K, styles d'impression
