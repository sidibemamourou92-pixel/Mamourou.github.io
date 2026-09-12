// ============================================================
//  PORTFOLIO 3.0 — DONNÉES
//  Éditez ce fichier : tout le site se met à jour.
// ============================================================

export const profil = {
  prenom: 'Mamourou',
  nom: 'Sidibé',
  role: 'Ingénieur Informatique',
  specialites: ['Systèmes embarqués', 'IoT', 'IA embarquée', 'Développement web'],
  accroche:
    "Je conçois des produits numériques robustes : du circuit imprimé jusqu'à l'interface qui le pilote.",
  bio: [
    "Ingénieur informatique basé à Bamako, je travaille à la frontière entre matériel et logiciel. Objets connectés, IA embarquée et interfaces simples : j'aime transformer des idées en produits fiables.",
    "Mon approche : comprendre le besoin, prototyper vite, tester sur le terrain, puis livrer du code propre, documenté et facile à maintenir.",
  ],
  points: [
    'Du circuit au cloud, projets menés de A à Z',
    'Prototypage rapide puis industrialisation',
    'Code propre, documenté, orienté terrain',
  ],
  email: 'contact@mamourou-sidibe.fr',
  localisation: 'Bamako, Mali',
  dispo: true,
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
  'Ingénieur Informatique',
  'Développeur IoT',
  'Passionné d’IA embarquée',
  'Full-stack & embarqué',
];

export const stats = [
  { icone: 'cpu', valeur: 4, suffixe: '+', label: "ans d'ingénierie" },
  { icone: 'wrench', valeur: 10, suffixe: '+', label: 'projets réalisés' },
  { icone: 'code', valeur: 15, suffixe: '+', label: 'technologies maîtrisées' },
];

export const navigation = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#apropos', label: 'À propos' },
  { href: '#competences', label: 'Compétences' },
  { href: '#projets', label: 'Projets' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#contact', label: 'Contact' },
];

export const competences = [
  {
    domaine: 'Systèmes embarqués',
    icone: 'chip',
    niveau: 'Avancé',
    tags: ['Arduino', 'ESP32', 'Raspberry Pi', 'C / C++', 'Capteurs', 'Conception PCB'],
  },
  {
    domaine: 'Intelligence artificielle',
    icone: 'cpu',
    niveau: 'Intermédiaire',
    tags: ['Python', 'TensorFlow Lite', 'OpenCV', 'Vision par ordinateur', 'Modèles quantifiés'],
  },
  {
    domaine: 'Développement web',
    icone: 'code',
    niveau: 'Avancé',
    tags: ['JavaScript', 'Astro', 'HTML / CSS', 'APIs REST', 'Git / GitHub', 'UI propre'],
  },
  {
    domaine: 'Réseaux & systèmes',
    icone: 'net',
    niveau: 'Avancé',
    tags: ['Linux', 'SSH', 'Docker', 'Bash', 'Supervision', 'Réseaux locaux'],
  },
];

export const projetCategories = ['Tous', 'IoT', 'Robotique', 'IA', 'Web', 'Systèmes'];

export const projets = [
  {
    id: 1,
    titre: 'Station météo connectée',
    categorie: 'IoT',
    resume: 'Borne autonome de mesure de température, humidité et qualité de l’air, avec tableau de bord en temps réel.',
    illustration: 'gear',
    tags: ['ESP32', 'DHT22', 'MQTT', 'Dashboard'],
    annee: '2026',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      'Firmware ESP32 optimisé en basse consommation (deep-sleep)',
      'Publication MQTT sécurisée vers un broker',
      'Tableau de bord temps réel en WebSocket',
    ],
  },
  {
    id: 2,
    titre: 'Robot suiveur de ligne',
    categorie: 'Robotique',
    resume: 'Robot mobile autonome qui suit un tracé grâce à un correcteur PID réglé sur mesure.',
    illustration: 'robot',
    tags: ['Arduino', 'PID', 'Capteurs IR', 'Bluetooth'],
    annee: '2025',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      'Asservissement PID pour un suivi stable en virage',
      'Châssis imprimé en 3D, alimentation embarquée',
      'Télépilotage optionnel via application mobile',
    ],
  },
  {
    id: 3,
    titre: 'Caméra intelligente embarquée',
    categorie: 'IA',
    resume: 'Caméra qui détecte des objets en local, directement sur le microcontrôleur, sans cloud.',
    illustration: 'camera',
    tags: ['ESP32-CAM', 'TensorFlow Lite', 'OpenCV'],
    annee: '2026',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      'Inférence locale de modèles quantifiés',
      'Streaming MJPEG basse latence',
      'Détection configurable sur le terrain',
    ],
  },
  {
    id: 4,
    titre: 'Application de gestion',
    categorie: 'Web',
    resume: 'Application web complète : authentification, API REST documentée et interface épurée.',
    illustration: 'briefcase',
    tags: ['JavaScript', 'API REST', 'Base de données', 'UI'],
    annee: '2025',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      'API REST documentée et sécurisée',
      'Interface responsive, pensée mobile d’abord',
      'Tests et déploiement automatisés',
    ],
  },
  {
    id: 5,
    titre: 'Serveur maison sous Linux',
    categorie: 'Systèmes',
    resume: 'Infrastructure personnelle : stockage, sauvegardes, supervision et automatisations.',
    illustration: 'net',
    tags: ['Linux', 'Raspberry Pi', 'Docker', 'SSH'],
    annee: '2024',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      'Services conteneurisés et isolés (Docker)',
      'Sauvegardes automatiques chiffrées',
      'Supervision et alertes e-mail',
    ],
  },
  {
    id: 6,
    titre: 'Assistant vocal local',
    categorie: 'IA',
    resume: 'Assistant vocal fonctionnant entièrement hors-ligne : le privé d’abord.',
    illustration: 'terminal',
    tags: ['Python', 'Reconnaissance vocale', 'LLM local'],
    annee: '2026',
    github: 'https://github.com/sidibemamourou92-pixel',
    points: [
      'Wake word local et reconnaissance robuste',
      'Génération de réponses sans cloud',
      'Intégration à des automatisations maison',
    ],
  },
];

export const parcours = [
  {
    periode: '2024 — 2028',
    titre: 'Licence en Génie Informatique',
    lieu: 'Université Sup’Management, Mali',
    type: 'Formation',
    detail: 'Programmation, bases de données, réseaux et architectures logicielles.',
  },
  {
    periode: '2021 — 2024',
    titre: 'Ingénierie en Électronique & Robotique',
    lieu: 'Université des Sciences et Technologies',
    type: 'Formation',
    detail: 'Systèmes embarqués, robotique mobile et intelligence artificielle appliquée.',
  },
  {
    periode: '2021 — aujourd’hui',
    titre: 'Projets personnels & prototypes',
    lieu: 'Indépendant',
    type: 'Expérience',
    detail: 'Stations connectées, robots, caméras IA et infrastructures Linux.',
  },
];