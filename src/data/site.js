// ============================================================
//  PORTFOLIO 4.0 — DONNÉES (bilingue FR / EN)
//  Les textes sont des objets { fr, en } : modifiez-les ici.
// ============================================================

export const profil = {
  prenom: 'Mamourou',
  nom: 'Sidibé',
  role: { fr: 'Ingénieur Informatique', en: 'Software Engineer' },
  specialites: [
    { fr: 'Systèmes embarqués', en: 'Embedded Systems' },
    { fr: 'IoT', en: 'IoT' },
    { fr: 'IA embarquée', en: 'Edge AI' },
    { fr: 'Développement web', en: 'Web Development' },
  ],
  accroche: {
    fr: "Je conçois des produits numériques robustes : du circuit imprimé jusqu'à l'interface qui le pilote.",
    en: "I build robust digital products: from the printed circuit board to the interface that controls it.",
  },
  bio: [
    {
      fr: "Ingénieur informatique basé à Bamako, je travaille à la frontière entre matériel et logiciel. Objets connectés, IA embarquée et interfaces simples : j'aime transformer des idées en produits fiables.",
      en: "Software engineer based in Bamako, I work at the boundary between hardware and software. Connected devices, edge AI and simple interfaces: I love turning ideas into reliable products.",
    },
    {
      fr: "Mon approche : comprendre le besoin, prototyper vite, tester sur le terrain, puis livrer du code propre, documenté et facile à maintenir.",
      en: "My approach: understand the need, prototype fast, test in the field, then ship clean, documented, maintainable code.",
    },
  ],
  points: [
    { fr: 'Du circuit au cloud, projets menés de A à Z', en: 'From hardware to cloud, end-to-end projects' },
    { fr: 'Prototypage rapide puis industrialisation', en: 'Fast prototyping, then industrialisation' },
    { fr: 'Code propre, documenté, orienté terrain', en: 'Clean, documented, field-tested code' },
  ],
  email: 'contact@mamourou-sidibe.fr',
  localisation: { fr: 'Bamako, Mali', en: 'Bamako, Mali' },
  dispo: true,
  dispoTexte: { fr: 'ouvert aux nouvelles missions', en: 'open to new missions' },
};

export const entreprise = {
  nom: 'TengaDé Tech',
  slogan: { fr: "L'esprit du guide, la force du code", en: "The spirit of the guide, the strength of code" },
  url: 'https://tangade-tech.vercel.app/',
  logo: './logo-tangade.png',
};

export const deploiement = {
  // Nom du déploiement (Vercel / projet) et URL finale du site (SEO, canonical, sitemap).
  nom: 'mamourou-sidibe-portfolio',
  url: 'https://sidibemamourou92-pixel.github.io', // ← à adapter une fois en ligne
  ogImage: 'https://sidibemamourou92-pixel.github.io/cv-photo.jpg',
};

export const horizon = {
  experienceDepuis: '2021-01-01',
  build: new Date().toISOString(),
};

export const reseaux = [
  { nom: 'GitHub', url: 'https://github.com/sidibemamourou92-pixel', icone: 'github' },
  { nom: 'LinkedIn', url: 'https://www.linkedin.com/in/sidib%C3%A9-mamourou-36848233a', icone: 'linkedin' },
  { nom: 'Email', url: 'mailto:contact@mamourou-sidibe.fr', icone: 'mail' },
];

export const roles = [
  { fr: 'Ingénieur Informatique', en: 'Software Engineer' },
  { fr: 'Développeur IoT', en: 'IoT Developer' },
  { fr: 'Passionné d’IA embarquée', en: 'Edge AI enthusiast' },
  { fr: 'Full-stack & embarqué', en: 'Full-stack & embedded' },
];

export const stats = [
  { icone: 'cpu', valeur: 4, suffixe: '+', label: { fr: "ans d'ingénierie", en: 'years of engineering' } },
  { icone: 'wrench', valeur: 10, suffixe: '+', label: { fr: 'projets réalisés', en: 'projects built' } },
  { icone: 'code', valeur: 15, suffixe: '+', label: { fr: 'technologies maîtrisées', en: 'technologies mastered' } },
];

export const navigation = [
  { href: '#accueil', label: { fr: 'Accueil', en: 'Home' } },
  { href: '#apropos', label: { fr: 'À propos', en: 'About' } },
  { href: '#cv', label: { fr: 'CV', en: 'CV' } },
  { href: '#competences', label: { fr: 'Compétences', en: 'Skills' } },
  { href: '#projets', label: { fr: 'Projets', en: 'Projects' } },
  { href: '#parcours', label: { fr: 'Parcours', en: 'Experience' } },
  { href: '#contact', label: { fr: 'Contact', en: 'Contact' } },
];

export const competences = [
  {
    domaine: { fr: 'Systèmes embarqués', en: 'Embedded Systems' },
    icone: 'chip',
    niveau: { fr: 'Avancé', en: 'Advanced' },
    tags: ['Arduino', 'ESP32', 'Raspberry Pi', 'C / C++', 'Capteurs', 'Conception PCB'],
  },
  {
    domaine: { fr: 'Intelligence artificielle', en: 'Artificial Intelligence' },
    icone: 'cpu',
    niveau: { fr: 'Intermédiaire', en: 'Intermediate' },
    tags: ['Python', 'TensorFlow Lite', 'OpenCV', 'Vision par ordinateur', 'Modèles quantifiés'],
  },
  {
    domaine: { fr: 'Développement web', en: 'Web Development' },
    icone: 'code',
    niveau: { fr: 'Avancé', en: 'Advanced' },
    tags: ['JavaScript', 'Astro', 'HTML / CSS', 'APIs REST', 'Git / GitHub'],
  },
  {
    domaine: { fr: 'Réseaux & systèmes', en: 'Networks & Systems' },
    icone: 'net',
    niveau: { fr: 'Avancé', en: 'Advanced' },
    tags: ['Linux', 'SSH', 'Docker', 'Bash', 'Supervision', 'Réseaux locaux'],
  },
];

export const projetCategories = [
  { cle: 'tous', label: { fr: 'Tous', en: 'All' } },
  { cle: 'iot', label: { fr: 'IoT', en: 'IoT' } },
  { cle: 'robotique', label: { fr: 'Robotique', en: 'Robotics' } },
  { cle: 'ia', label: { fr: 'IA', en: 'AI' } },
  { cle: 'web', label: { fr: 'Web', en: 'Web' } },
  { cle: 'systemes', label: { fr: 'Systèmes', en: 'Systems' } },
];

export const projets = [
  {
    id: 1,
    titre: { fr: 'Station météo connectée', en: 'Connected weather station' },
    categorie: 'iot',
    resume: {
      fr: 'Borne autonome de mesure de température, humidité et qualité de l’air, avec tableau de bord en temps réel.',
      en: 'Autonomous monitoring unit for temperature, humidity and air quality, with a real-time dashboard.',
    },
    illustration: 'gear',
    tags: ['ESP32', 'DHT22', 'MQTT', 'Dashboard'],
    annee: '2026',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      { fr: 'Firmware ESP32 optimisé en basse consommation (deep-sleep)', en: 'Low-power ESP32 firmware (deep-sleep)' },
      { fr: 'Publication MQTT sécurisée vers un broker', en: 'Secure MQTT publishing to a broker' },
      { fr: 'Tableau de bord temps réel en WebSocket', en: 'Real-time WebSocket dashboard' },
    ],
  },
  {
    id: 2,
    titre: { fr: 'Robot suiveur de ligne', en: 'Line-following robot' },
    categorie: 'robotique',
    resume: {
      fr: 'Robot mobile autonome qui suit un tracé grâce à un correcteur PID réglé sur mesure.',
      en: 'Autonomous mobile robot following a track thanks to a custom-tuned PID controller.',
    },
    illustration: 'robot',
    tags: ['Arduino', 'PID', 'Capteurs IR', 'Bluetooth'],
    annee: '2025',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      { fr: 'Asservissement PID pour un suivi stable en virage', en: 'PID control for stable cornering' },
      { fr: 'Châssis imprimé en 3D, alimentation embarquée', en: '3D-printed chassis, embedded power' },
      { fr: 'Télépilotage optionnel via application mobile', en: 'Optional remote control via mobile app' },
    ],
  },
  {
    id: 3,
    titre: { fr: 'Caméra intelligente embarquée', en: 'Edge AI smart camera' },
    categorie: 'ia',
    resume: {
      fr: 'Caméra qui détecte des objets en local, directement sur le microcontrôleur, sans cloud.',
      en: 'Camera detecting objects locally, directly on the microcontroller, no cloud needed.',
    },
    illustration: 'camera',
    tags: ['ESP32-CAM', 'TensorFlow Lite', 'OpenCV'],
    annee: '2026',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      { fr: 'Inférence locale de modèles quantifiés', en: 'Local inference of quantized models' },
      { fr: 'Streaming MJPEG basse latence', en: 'Low-latency MJPEG streaming' },
      { fr: 'Détection configurable sur le terrain', en: 'Field-configurable detection' },
    ],
  },
  {
    id: 4,
    titre: { fr: 'Application de gestion', en: 'Management web app' },
    categorie: 'web',
    resume: {
      fr: 'Application web complète : authentification, API REST documentée et interface épurée.',
      en: 'Full web application: authentication, documented REST API and a clean interface.',
    },
    illustration: 'briefcase',
    tags: ['JavaScript', 'API REST', 'Base de données', 'UI'],
    annee: '2025',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      { fr: 'API REST documentée et sécurisée', en: 'Documented, secure REST API' },
      { fr: 'Interface responsive, pensée mobile d’abord', en: 'Responsive, mobile-first interface' },
      { fr: 'Tests et déploiement automatisés', en: 'Automated tests and deployment' },
    ],
  },
  {
    id: 5,
    titre: { fr: 'Serveur maison sous Linux', en: 'Home Linux server' },
    categorie: 'systemes',
    resume: {
      fr: 'Infrastructure personnelle : stockage, sauvegardes, supervision et automatisations.',
      en: 'Personal infrastructure: storage, backups, monitoring and automations.',
    },
    illustration: 'net',
    tags: ['Linux', 'Raspberry Pi', 'Docker', 'SSH'],
    annee: '2024',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      { fr: 'Services conteneurisés et isolés (Docker)', en: 'Containerized, isolated services (Docker)' },
      { fr: 'Sauvegardes automatiques chiffrées', en: 'Automated encrypted backups' },
      { fr: 'Supervision et alertes e-mail', en: 'Monitoring and e-mail alerts' },
    ],
  },
  {
    id: 6,
    titre: { fr: 'Assistant vocal local', en: 'Local voice assistant' },
    categorie: 'ia',
    resume: {
      fr: 'Assistant vocal fonctionnant entièrement hors-ligne : le privé d’abord.',
      en: 'Fully offline voice assistant: privacy first.',
    },
    illustration: 'terminal',
    tags: ['Python', 'Reconnaissance vocale', 'LLM local'],
    annee: '2026',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      { fr: 'Wake word local et reconnaissance robuste', en: 'Local wake word, robust speech recognition' },
      { fr: 'Génération de réponses sans cloud', en: 'No-cloud answer generation' },
      { fr: 'Intégration à des automatisations maison', en: 'Integration with home automations' },
    ],
  },
];

export const parcours = [
  {
    periode: '2024 — 2028',
    titre: { fr: 'Licence en Génie Informatique', en: 'Bachelor in Computer Engineering' },
    lieu: { fr: 'Université Sup’Management, Mali', en: 'Sup’Management University, Mali' },
    type: { fr: 'Formation', en: 'Education' },
    detail: { fr: 'Programmation, bases de données, réseaux et architectures logicielles.', en: 'Programming, databases, networks and software architectures.' },
  },
  {
    periode: '2021 — 2024',
    titre: { fr: 'Ingénierie en Électronique & Robotique', en: 'Electronics & Robotics Engineering' },
    lieu: { fr: 'Université des Sciences et Technologies', en: 'University of Science and Technology' },
    type: { fr: 'Formation', en: 'Education' },
    detail: { fr: 'Systèmes embarqués, robotique mobile et intelligence artificielle appliquée.', en: 'Embedded systems, mobile robotics and applied AI.' },
  },
  {
    periode: '2021 — aujourd’hui',
    titre: { fr: 'Projets personnels & prototypes', en: 'Personal projects & prototypes' },
    lieu: { fr: 'Indépendant', en: 'Freelance' },
    type: { fr: 'Expérience', en: 'Experience' },
    detail: { fr: 'Stations connectées, robots, caméras IA et infrastructures Linux.', en: 'Connected stations, robots, AI cameras and Linux infrastructures.' },
  },
];

export const cv = {
  photo: './cv-photo.jpg',
  resume: {
    fr: 'Ingénieur logiciel & embarqué, je conçois des systèmes connectés fiables et des interfaces simples, en m’appuyant sur une veille technique constante et une culture du prototype.',
    en: 'Software & embedded engineer, I design reliable connected systems and simple interfaces, backed by constant tech watch and a strong prototyping culture.',
  },
  nationalite: { fr: 'Malienne', en: 'Malian' },
  infos: [
    { icone: 'mail', label: { fr: 'Email', en: 'Email' }, valeur: 'contact@mamourou-sidibe.fr' },
    { icone: 'whatsapp', label: { fr: 'Téléphone / WhatsApp', en: 'Phone / WhatsApp' }, valeur: '+223 75 50 67 50' },
    { icone: 'pin', label: { fr: 'Localisation', en: 'Location' }, valeur: { fr: 'Bamako, Mali', en: 'Bamako, Mali' } },
  ],
  langues: [
    { nom: { fr: 'Français', en: 'French' }, niveau: { fr: 'Courant', en: 'Fluent' } },
    { nom: { fr: 'Anglais', en: 'English' }, niveau: { fr: 'Professionnel', en: 'Professional' } },
    { nom: { fr: 'Bambara', en: 'Bambara' }, niveau: { fr: 'Maternel', en: 'Native' } },
  ],
};