// ============================================================
//  DONNÉES DU SITE — Modifiez ici pour mettre à jour le contenu
// ============================================================

export const site = {
  auteur: 'Mamourou Sidibé',
  role: 'Ingénieur en Informatique',
  specialites: ['Robotique', 'IoT', 'Intelligence Artificielle embarquée'],
  description:
    "Ingénieur passionné de systèmes embarqués. Je conçois des solutions connectées, du circuit électronique au code applicatif, en transformant des idées complexes en prototypes fonctionnels et innovants.",
  email: 'contact@mamourou-sidibe.fr', // TODO : remplacez par votre adresse email
  localisation: 'Mali',
  dispo: true,
  annee: new Date().getFullYear(),
  url: 'https://sidibemamourou92-pixel.github.io',
};

// Rôles animés (effet machine à écrire du hero)
// Pas d'emojis : affichage universel sur toutes les plateformes.
export const roles = [
  'Ingénieur en Informatique',
  'Spécialiste Robotique',
  'Développeur IoT',
  'Passionné d’IA embarquée',
  'Créateur de prototypes',
];

// Liens sociaux
export const socials = [
  {
    nom: 'GitHub',
    url: 'https://github.com/sidibemamourou92-pixel',
    icone: 'github',
    handle: '@sidibemamourou92-pixel',
  },
  {
    nom: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sidib%C3%A9-mamourou-36848233a',
    icone: 'linkedin',
    handle: '/in/sidibé-mamourou',
  },
  {
    nom: 'WhatsApp',
    url: 'https://wa.me/22375506750',
    icone: 'whatsapp',
    handle: '+223 75 50 67 50',
  },
];

// Statistiques animées (hero + à-propos)
export const stats = [
  { valeur: 9, suffixe: '+', label: 'Projets réalisés', icone: 'wrench' },
  { valeur: 4, suffixe: '', label: 'Domaines de compétence', icone: 'cpu' },
  { valeur: 12, suffixe: '+', label: 'Technologies maîtrisées', icone: 'code' },
  { valeur: 100, suffixe: '%', label: 'Passion & rigueur', icone: 'bolt' },
];
// ---- Projets -----------------------------------------------------------
// image & gallery pointent vers les illustrations SVG dans /image/ligne
export const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'electronique', label: 'Électronique' },
  { id: 'robotique', label: 'Robotique' },
  { id: 'reseaux', label: 'Réseaux' },
  { id: 'dev', label: 'Développement' },
];

export const projects = [
  {
    id: 1,
    title: 'Ventilateur Automatique Intelligent',
    category: 'electronique',
    short: 'Système autonome de ventilation régulant la température ambiante en temps réel.',
    description:
      'Tout a commencé par un problème simple : comment automatiser la ventilation d’une pièce sans surveillance constante ? Ce projet est né de la volonté de créer un système autonome capable de maintenir une température ambiante optimale. En combinant un capteur de température, un microcontrôleur et un système de relais, j’ai développé une solution intelligente qui s’adapte en temps réel aux conditions environnementales.',
    story:
      'Le défi était de rendre le système suffisamment réactif tout en étant économe en énergie. J’ai dû résoudre des problèmes de calibration du capteur et d’hystérésis pour éviter les déclenchements intempestifs. Aujourd’hui, ce système fonctionne de manière fiable et m’a permis de maîtriser les bases des systèmes de contrôle automatique.',
    image: 'image/ligne/ventilateur.svg',
    technologies: ['Arduino Uno', 'Capteur DHT11', 'Écran LCD 16x2', 'Relais 5V'],
    features: [
      'Mesure de température en temps réel',
      'Contrôle automatique du ventilateur',
      'Affichage des données sur LCD',
      'Seuil de température ajustable',
    ],
    gallery: [
      'image/ligne/ventilateur.svg',
      'image/ligne/polygraphe.svg',
      'image/ligne/raspberry.svg',
    ],
  },
  {
    id: 2,
    title: 'Robot Quadrupède (ESP32)',
    category: 'robotique',
    short: 'Robot à démarche biomimétique contrôlé par Bluetooth, 8 servomoteurs synchronisés.',
    description:
      'Fasciné par la biomécanique et la façon dont les animaux se déplacent, j’ai voulu créer un robot capable de reproduire une démarche naturelle. Ce quadrupède représente des mois de travail sur la cinématique inverse et la synchronisation des mouvements. Chaque pas du robot est le résultat d’algorithmes complexes calculant l’angle de chaque servomoteur pour créer une locomotion fluide et réaliste.',
    story:
      'Le plus grand défi a été d’atteindre une stabilité dynamique. J’ai dû implémenter des algorithmes de contrôle prédictif et effectuer des centaines de tests pour trouver les bons paramètres de mouvement. La connexion Bluetooth permet un contrôle en temps réel, transformant mon smartphone en télécommande sophistiquée. Ce projet m’a appris la patience et la rigueur nécessaires en robotique.',
    image: 'image/ligne/quadrupede.svg',
    technologies: ['ESP32 DevKit', 'Servomoteurs MG996R (x4)', 'Servomoteurs MG90S (x4)', 'Batterie LiPo 7.4V'],
    features: [
      'Démarche avant/arrière',
      'Rotation gauche/droite',
      'Mouvements de danse',
      'Contrôle via Bluetooth',
    ],
    gallery: [
      'image/ligne/quadrupede.svg',
      'image/ligne/araignee.svg',
      'image/ligne/voiture.svg',
    ],
  },
{
    id: 3,
    title: 'Configuration Headless Raspberry Pi 5',
    category: 'reseaux',
    short: 'Déploiement serveur 100 % automatisé, sans écran ni clavier, avec accès SSH sécurisé.',
    description:
      'Comment déployer un serveur complet sans jamais brancher d’écran ni de clavier ? C’est le défi que j’ai relevé avec ce projet d’installation headless. L’objectif : créer un système entièrement automatisé qui se configure lui-même au premier démarrage, établissant une connexion WiFi sécurisée et permettant un accès distant immédiat.',
    story:
      'J’ai conçu un point d’accès WiFi temporaire qui, lors de la première connexion, capture les identifiants réseau et les configure automatiquement. L’accès SSH par clés publiques garantit une sécurité maximale. Ce projet m’a plongé dans les arcanes de Linux et des réseaux, et constitue aujourd’hui ma méthode standard pour déployer des Raspberry Pi en production.',
    image: 'image/ligne/raspberry.svg',
    technologies: ['Raspberry Pi 5', 'Raspberry Pi OS Lite', 'SSH & VNC', 'Scripts Bash d’automatisation'],
    features: [
      'Configuration WiFi headless',
      'Accès SSH sécurisé par clés',
      'Point d’accès mobile pour configuration',
      'Monitoring à distance',
    ],
    gallery: [
      'image/ligne/raspberry.svg',
      'image/ligne/ventilateur.svg',
      'image/ligne/esp32-cam.svg',
    ],
  },
  {
    id: 4,
    title: 'Polygraphe Bio-Électronique (ESP32)',
    category: 'electronique',
    short: 'Mesure de la conductance cutanée et filtrage numérique du signal de stress.',
    description:
      'Inspiré par les techniques d’investigation policière, j’ai décidé de construire mon propre polygraphe pour mesurer les réactions physiologiques. Ce projet explore la conductance cutanée, un indicateur fiable du stress émotionnel. Les signaux étant naturellement bruités, j’ai développé des algorithmes de filtrage numérique sophistiqués pour extraire des données exploitables.',
    story:
      'La difficulté principale résidait dans la qualité des signaux. Les électrodes en cuivre produisaient beaucoup de bruit parasite. J’ai implémenté un filtre de moyenne mobile et testé différentes fréquences d’échantillonnage pour obtenir des courbes lisibles. Ce projet m’a fait découvrir le traitement du signal numérique et ses applications biomédicales.',
    image: 'image/ligne/polygraphe.svg',
    technologies: ['ESP32', 'Capteurs de conductance cutanée', 'Filtres numériques (moyenne mobile)', 'Écran OLED'],
    features: [
      'Mesure en temps réel',
      'Filtrage des signaux bruyants',
      'Affichage graphique des courbes',
      'Enregistrement des données',
    ],
    gallery: [
      'image/ligne/polygraphe.svg',
      'image/ligne/ventilateur.svg',
      'image/ligne/esp32-cam.svg',
    ],
  },
{
    id: 5,
    title: 'Robot Araignée (12 Servomoteurs)',
    category: 'robotique',
    short: 'Biomécanique d’arthropode : 12 degrés de liberté contrôlés par Arduino Mega.',
    description:
      'Observer une araignée se déplacer avec une agilité déconcertante m’a donné l’idée de ce projet. Reproduire la biomécanique d’un arthropode demande une maîtrise parfaite de 12 servomoteurs synchronisés. Chaque patte doit bouger en harmonie avec les autres pour garantir stabilité et fluidité du mouvement.',
    story:
      'La complexité était de taille : 12 degrés de liberté à contrôler simultanément. J’ai utilisé un Arduino Mega pour sa puissance de calcul et un contrôleur PWM PCA9685 pour gérer tous les servomoteurs sans surcharger le microcontrôleur. L’impression 3D de la structure a permis d’ajuster précisément les articulations. Voir ce robot se déplacer de manière autonome reste l’une de mes plus grandes fiertés.',
    image: 'image/ligne/araignee.svg',
    technologies: ['Arduino Mega 2560', 'Servomoteurs MG996R (x12)', 'PCA9685 (contrôleur PWM)', 'Structure 3D imprimée'],
    features: [
      '12 degrés de liberté',
      'Cinématique inverse',
      'Plusieurs modes de marche',
      'Contrôle via application mobile',
    ],
    gallery: [
      'image/ligne/araignee.svg',
      'image/ligne/quadrupede.svg',
      'image/ligne/voiture.svg',
    ],
  },
  {
    id: 6,
    title: 'Voiture Télécommandée & Autonome',
    category: 'robotique',
    short: 'Double mode télécommandé/autonome : évitement d’obstacles par ultrasons.',
    description:
      'Qui n’a jamais rêvé de construire sa propre voiture autonome ? Ce projet combine le plaisir du jeu avec la sophistication de l’intelligence artificielle embarquée. En mode manuel, elle se contrôle via smartphone en Bluetooth. En mode autonome, elle utilise des capteurs à ultrasons pour détecter et éviter les obstacles intelligemment.',
    story:
      'Le défi était d’assurer une transition fluide entre les deux modes de fonctionnement. J’ai dû gérer les conflits de commande et optimiser les temps de réponse du capteur ultrason pour des décisions rapides. Les tests en conditions réelles ont révélé des limitations de portée que j’ai résolues par un algorithme de scan panoramique. Aujourd’hui, cette voiture navigue de manière autonome dans un environnement complexe.',
    image: 'image/ligne/voiture.svg',
    technologies: ['Arduino Uno', 'Module Bluetooth HC-05', 'Capteur à ultrasons HC-SR04', 'Moteurs DC avec L298N'],
    features: [
      'Mode télécommandé via smartphone',
      'Mode autonome avec évitement',
      'Détection d’obstacles à 30cm',
      'Vitesse variable',
    ],
    gallery: [
      'image/ligne/voiture.svg',
      'image/ligne/araignee.svg',
      'image/ligne/quadrupede.svg',
    ],
  },
{
    id: 7,
    title: 'Système de Reconnaissance ESP32-CAM',
    category: 'dev',
    short: 'Vision par ordinateur embarquée : détection de visages et d’objets en streaming WiFi.',
    description:
      'L’intelligence artificielle embarquée représente l’avenir de l’IoT. Ce projet pousse les limites de l’ESP32-CAM en y intégrant des capacités de vision par ordinateur. Le système peut détecter des visages et reconnaître des objets en temps réel, le tout diffusé via WiFi sur un serveur web accessible depuis n’importe quel appareil.',
    story:
      'Le plus grand défi était d’optimiser des modèles TensorFlow Lite pour qu’ils s’exécutent sur un microcontrôleur aux ressources limitées. J’ai dû quantifier les modèles et réduire leur complexité sans perdre en précision. Le streaming vidéo en temps réel demandait également une optimisation poussée de la compression. Ce projet démontre que l’edge computing et l’IA embarquée sont accessibles dès aujourd’hui.',
    image: 'image/ligne/esp32-cam.svg',
    technologies: ['ESP32-CAM', 'TensorFlow Lite Micro', 'OpenCV', 'Serveur Web streaming'],
    features: [
      'Détection de visages',
      'Reconnaissance d’objets',
      'Streaming vidéo WiFi',
      'Enregistrement sur carte SD',
    ],
    gallery: [
      'image/ligne/esp32-cam.svg',
      'image/ligne/raspberry.svg',
      'image/ligne/polygraphe.svg',
    ],
  },
];
// Cartographie projet → compétence (pour le clic depuis les compétences)
export const projectMap = Object.fromEntries(projects.map(p => [p.title, p.id]));

// ---- Compétences -------------------------------------------------------
export const skillGroups = [
  {
    id: 'electronique',
    titre: 'Électronique & Circuits',
    categorie: 'Électronique',
    icone: 'chip',
    niveau: 90,
    tags: ['Arduino', 'ESP32', 'PCB', 'Capteurs', 'Relais', 'Soudure'],
    projets: ['Ventilateur Automatique Intelligent', 'Polygraphe Bio-Électronique (ESP32)'],
  },
  {
    id: 'robotique',
    titre: 'Robotique & Automatique',
    categorie: 'Robotique',
    icone: 'robot',
    niveau: 88,
    tags: ['Servomoteurs', 'Cinématique inverse', 'PWM', 'Contrôle prédictif', 'Impression 3D'],
    projets: ['Robot Quadrupède (ESP32)', 'Robot Araignée (12 Servomoteurs)', 'Voiture Télécommandée & Autonome'],
  },
  {
    id: 'dev',
    titre: 'Développement & IA',
    categorie: 'Développement',
    icone: 'code',
    niveau: 82,
    tags: ['C / C++', 'Python', 'TensorFlow Lite', 'OpenCV', 'HTML/CSS/JS', 'Astro'],
    projets: ['Système de Reconnaissance ESP32-CAM'],
  },
  {
    id: 'reseaux',
    titre: 'Réseaux & Systèmes Linux',
    categorie: 'Réseaux',
    icone: 'net',
    niveau: 85,
    tags: ['Linux', 'SSH', 'Raspberry Pi', 'WiFi', 'Bash', 'VNC'],
    projets: ['Configuration Headless Raspberry Pi 5'],
  },
];

// ---- Sites web réalisés -------------------------------------------------
export const websites = [
  {
    titre: 'Site Saint-Valentin',
    description:
      'Un site web interactif et animé, conçu avec soin pour surprendre et offrir une expérience mémorable.',
    url: 'https://github.com/sidibemamourou92-pixel/Saint-valentin',
    icone: 'heart',
    statut: 'GitHub',
  },
  {
    titre: 'Portfolio — version Astro',
    description:
      'Ce portfolio nouvelle génération : performant, moderne, accessible et 100 % personnalisable. Le code est ouvert sur GitHub.',
    url: 'https://github.com/sidibemamourou92-pixel',
    icone: 'gear',
    statut: 'GitHub',
  },
];
// ---- Parcours / formation (timeline) -----------------------------------
export const timeline = [
  {
    periode: '2024 — 2028',
    titre: 'Licence en Génie Informatique',
    lieu: 'Université Sup’Management Mali',
    description:
      'Approfondissement en programmation, bases de données, réseaux et développement web, couplé à la robotique et aux systèmes embarqués.',
    type: 'formation',
  },
  {
    periode: '2021 — 2024',
    titre: 'Ingénierie en Électronique & Robotique',
    lieu: 'Université des Sciences et Technologies',
    description:
      'Spécialisation en systèmes embarqués, robotique mobile et intelligence artificielle appliquée. Conception de nombreux prototypes fonctionnels.',
    type: 'formation',
  },
  {
    periode: 'Baccalauréat',
    titre: 'Baccalauréat Scientifique',
    lieu: 'Lycée Privé La Référence',
    description:
      'Filière scientifique, base solide en mathématiques, physique et sciences de l’ingénieur.',
    type: 'formation',
  },
];

// ---- Galerie photos de laboratoire --------------------------------------
export const gallery = [
  { src: 'image/WIN_20260508_12_25_31_Pro.jpg', alt: 'Robot et servomoteurs en test' },
  { src: 'image/WIN_20260511_10_10_30_Pro.jpg', alt: 'Prototype Arduino et capteurs' },
  { src: 'image/WIN_20260511_10_10_38_Pro.jpg', alt: 'Maquette de robot araignée' },
  { src: 'image/WIN_20260516_10_17_30_Pro.jpg', alt: 'Circuit de mesure de conductance' },
  { src: 'image/WIN_20260616_10_17_56_Pro.jpg', alt: 'Serveur Raspberry Pi headless' },
  { src: 'image/Capture d\'écran 2026-07-08 162743.png', alt: 'Interface de supervision' },
  { src: 'image/WhatsApp Image 2026-07-10 at 14.40.53.jpeg', alt: 'Atelier et espace de travail' },
];

// ---- Navigation --------------------------------------------------------
export const navLinks = [
  { href: '#accueil', label: 'Accueil', icone: 'home' },
  { href: '#apropos', label: 'À propos', icone: 'user' },
  { href: '#competences', label: 'Compétences', icone: 'chip' },
  { href: '#projets', label: 'Projets', icone: 'wrench' },
  { href: '#sites', label: 'Sites web', icone: 'globe' },
  { href: '#parcours', label: 'Parcours', icone: 'road' },
  { href: '#galerie', label: 'Galerie', icone: 'camera' },
  { href: '#contact', label: 'Contact', icone: 'mail' },
];

