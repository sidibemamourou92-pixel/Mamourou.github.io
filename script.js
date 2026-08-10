// Données des projets pour la modale
const projectsData = {
    1: {
        title: 'Ventilateur Automatique Intelligent',
        description: 'Tout a commencé par un problème simple : comment automatiser la ventilation d\'une pièce sans surveillance constante ? Ce projet est né de la volonté de créer un système autonome capable de maintenir une température ambiante optimale. En combinant un capteur de température, un microcontrôleur et un système de relais, j\'ai développé une solution intelligente qui s\'adapte en temps réel aux conditions environnementales.',
        story: 'Le défi était de rendre le système suffisamment réactif tout en étant économe en énergie. J\'ai dû résoudre des problèmes de calibration du capteur et d\'hystérésis pour éviter les déclenchements intempestifs. Aujourd\'hui, ce système fonctionne de manière fiable et m\'a permis de maîtriser les bases des systèmes de contrôle automatique.',
        image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200',
        technologies: ['Arduino Uno', 'Capteur DHT11', 'Écran LCD 16x2', 'Relais 5V'],
        features: ['Mesure de température en temps réel', 'Contrôle automatique du ventilateur', 'Affichage des données sur LCD', 'Seuil de température ajustable'],
        gallery: [
            'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=400',
            'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?q=80&w=400',
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400'
        ]
    },
    2: {
        title: 'Robot Quadrupède (ESP32)',
        description: 'Fasciné par la biomécanique et la façon dont les animaux se déplacent, j\'ai voulu créer un robot capable de reproduire une démarche naturelle. Ce quadrupède représente des mois de travail sur la cinématique inverse et la synchronisation des mouvements. Chaque pas du robot est le résultat d\'algorithmes complexes calculant l\'angle de chaque servomoteur pour créer une locomotion fluide et réaliste.',
        story: 'Le plus grand défi a été d\'atteindre une stabilité dynamique. J\'ai dû implémenter des algorithmes de contrôle prédictif et effectuer des centaines de tests pour trouver les bons paramètres de mouvement. La connexion Bluetooth permet un contrôle en temps réel, transformant mon smartphone en télécommande sophistiquée. Ce projet m\'a appris la patience et la rigueur nécessaires en robotique.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200',
        technologies: ['ESP32 DevKit', 'Servomoteurs MG996R (x4)', 'Servomoteurs MG90S (x4)', 'Batterie LiPo 7.4V'],
        features: ['Démarche avant/arrière', 'Rotation gauche/droite', 'Mouvements de danse', 'Contrôle via Bluetooth'],
        gallery: [
            'image\WIN_20260508_12_25_31_Pro.jpg',
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400'
        ]
    },
    3: {
        title: 'Configuration Headless Raspberry Pi 5',
        description: 'Comment déployer un serveur complet sans jamais brancher d\'écran ni de clavier ? C\'est le défi que j\'ai relevé avec ce projet d\'installation headless. L\'objectif : créer un système entièrement automatisé qui se configure lui-même au premier démarrage, établissant une connexion WiFi sécurisée et permettant un accès distant immédiat.',
        story: 'J\'ai conçu un point d\'accès WiFi temporaire qui, lors de la première connexion, capture les identifiants réseau et les configure automatiquement. L\'accès SSH par clés publiques garantit une sécurité maximale. Ce projet m\'a plongé dans les arcanes de Linux et des réseaux, et constitue aujourd\'hui ma méthode standard pour déployer des Raspberry Pi en production.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
        technologies: ['Raspberry Pi 5', 'Raspberry Pi OS Lite', 'SSH & VNC', 'Scripts Bash d\'automatisation'],
        features: ['Configuration WiFi headless', 'Accès SSH sécurisé par clés', 'Point d\'accès mobile pour configuration', 'Monitoring à distance'],
        gallery: [
            'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400',
            'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400'
        ]
    },
    4: {
        title: 'Polygraphe Bio-Électronique (ESP32)',
        description: 'Inspiré par les techniques d\'investigation policière, j\'ai décidé de construire mon propre polygraphe pour mesurer les réactions physiologiques. Ce projet explore la conductance cutanée, un indicateur fiable du stress émotionnel. Les signaux étant naturellement bruités, j\'ai développé des algorithmes de filtrage numérique sophistiqués pour extraire des données exploitables.',
        story: 'La difficulté principale résidait dans la qualité des signaux. Les électrodes en cuivre produisaient beaucoup de bruit parasite. J\'ai implémenté un filtre de moyenne mobile et testé différentes fréquences d\'échantillonnage pour obtenir des courbes lisibles. Ce projet m\'a fait découvrir le traitement du signal numérique et ses applications biomédicales.',
        image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=1200',
        technologies: ['ESP32', 'Capteurs de conductance cutanée', 'Filtres numériques (moyenne mobile)', 'Écran OLED'],
        features: ['Mesure en temps réel', 'Filtrage des signaux bruyants', 'Affichage graphique des courbes', 'Enregistrement des données'],
        gallery: [
            'image\WIN_20260508_12_25_31_Pro.jpg',
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400'
        ]
    },
    
    5: {
        title: 'Robot Araignée (12 Servomoteurs)',
        description: 'Observer une araignée se déplacer avec une agilité déconcertante m\'a donné l\'idée de ce projet. Reproduire la biomécanique d\'un arthropode demande une maîtrise parfaite de 12 servomoteurs synchronisés. Chaque patte doit bouger en harmonie avec les autres pour garantir stabilité et fluidité du mouvement.',
        story: 'La complexité était de taille : 12 degrés de liberté à contrôler simultanément. J\'ai utilisé un Arduino Mega pour sa puissance de calcul et un contrôleur PWM PCA9685 pour gérer tous les servomoteurs sans surcharger le microcontrôleur. L\'impression 3D de la structure a permis d\'ajuster précisément les articulations. Voir ce robot se déplacer de manière autonome reste l\'une de mes plus grandes fiertés.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200',
        technologies: ['Arduino Mega 2560', 'Servomoteurs MG996R (x12)', 'PCA9685 (contrôleur PWM)', 'Structure 3D imprimée'],
        features: ['12 degrés de liberté', 'Cinématique inverse', 'Plusieurs modes de marche', 'Contrôle via application mobile'],
        gallery: [
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400',
            'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400',
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400'
        ]
    },
    6: {
        title: 'Voiture Télécommandée & Autonome',
        description: 'Qui n\'a jamais rêvé de construire sa propre voiture autonome ? Ce projet combine le plaisir du jeu avec la sophistication de l\'intelligence artificielle embarquée. En mode manuel, elle se contrôle via smartphone en Bluetooth. En mode autonome, elle utilise des capteurs à ultrasons pour détecter et éviter les obstacles intelligemment.',
        story: 'Le défi était d\'assurer une transition fluide entre les deux modes de fonctionnement. J\'ai dû gérer les conflits de commande et optimiser les temps de réponse du capteur ultrason pour des décisions rapides. Les tests en conditions réelles ont révélé des limitations de portée que j\'ai résolues par un algorithme de scan panoramique. Aujourd\'hui, cette voiture navigue de manière autonome dans un environnement complexe.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1200',
        technologies: ['Arduino Uno', 'Module Bluetooth HC-05', 'Capteur à ultrasons HC-SR04', 'Moteurs DC avec L298N'],
        features: ['Mode télécommandé via smartphone', 'Mode autonome avec évitement', 'Détection d\'obstacles à 30cm', 'Vitesse variable'],
        gallery: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400',
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400'
        ]
    },
    7: {
        title: 'Système de Reconnaissance ESP32-CAM',
        description: 'L\'intelligence artificielle embarquée représente l\'avenir de l\'IoT. Ce projet pousse les limites de l\'ESP32-CAM en y intégrant des capacités de vision par ordinateur. Le système peut détecter des visages et reconnaître des objets en temps réel, le tout diffusé via WiFi sur un serveur web accessible depuis n\'importe quel appareil.',
        story: 'Le plus grand défi était d\'optimiser des modèles TensorFlow Lite pour qu\'ils s\'exécutent sur un microcontrôleur aux ressources limitées. J\'ai dû quantifier les modèles et réduire leur complexité sans perdre en précision. Le streaming vidéo en temps réel demandait également une optimisation poussée de la compression. Ce projet démontre que l\'edge computing et l\'IA embarquée sont accessibles dès aujourd\'hui.',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200',
        technologies: ['ESP32-CAM', 'TensorFlow Lite Micro', 'OpenCV', 'Serveur Web streaming'],
        features: ['Détection de visages', 'Reconnaissance d\'objets', 'Streaming vidéo WiFi', 'Enregistrement sur carte SD'],
        gallery: [
            'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400',
            'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400',
            'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=400'
        ]
    }
};

// Fonctionnalité de filtrage des projets
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');

    // Fonction pour ouvrir la modale
    window.openModal = function(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;

        // Storytelling
        const storyText = document.getElementById('modalStoryText');
        storyText.textContent = project.story || '';

        // Technologies
        const techList = document.getElementById('modalTechnologies');
        techList.innerHTML = '';
        project.technologies.forEach(tech => {
            const li = document.createElement('li');
            li.textContent = tech;
            techList.appendChild(li);
        });

        // Fonctionnalités
        const featList = document.getElementById('modalFeatures');
        featList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featList.appendChild(li);
        });

        // Galerie
        const gallery = document.getElementById('modalGallery');
        gallery.innerHTML = '';
        project.gallery.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = project.title;
            gallery.appendChild(img);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Fonction pour fermer la modale
    window.closeModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Ajouter le clic sur chaque carte de projet
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Fermer la modale avec le bouton X
    modalClose.addEventListener('click', closeModal);

    // Fermer la modale en cliquant en dehors
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Fonctionnalité de filtrage
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Gérer la classe active
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterText = this.textContent;

            // Filtrer les cartes
            projectCards.forEach(card => {
                let shouldShow = false;

                if (filterText === 'Tout') {
                    shouldShow = true;
                } else if (filterText === 'Électronique & Robotique') {
                    shouldShow = card.classList.contains('category-electronique') || 
                                 card.classList.contains('category-robotique');
                } else if (filterText === 'Développement & Données') {
                    shouldShow = card.classList.contains('category-developpement');
                } else if (filterText === 'Réseaux & RF') {
                    shouldShow = card.classList.contains('category-reseaux');
                }

                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Ajouter l'animation CSS dynamiquement
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Fonctionnalité de recherche et filtrage des compétences
document.addEventListener('DOMContentLoaded', function() {
    const skillSearch = document.getElementById('skillSearch');
    const skillFilter = document.getElementById('skillFilter');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillTitles = document.querySelectorAll('.skill-title');

    // S'assurer que toutes les cartes sont fermées par défaut
    skillCards.forEach(card => {
        card.classList.remove('expanded');
    });

    // Fonction de toggle pour afficher/masquer les détails
    function toggleSkillCard(card) {
        // Chaque carte est indépendante, pas de fermeture des autres
        card.classList.toggle('expanded');
    }

    // Ajouter le clic sur chaque titre de compétence
    skillTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.skill-card');
            toggleSkillCard(card);
        });
    });

    // Fonction de filtrage
    function filterSkills() {
        const searchTerm = skillSearch.value.toLowerCase();
        const selectedCategory = skillFilter.value;

        skillCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('.skill-title').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.skill-tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');
            const projects = Array.from(card.querySelectorAll('.skill-projects li'))
                .map(li => li.textContent.toLowerCase())
                .join(' ');

            // Vérifier le filtre de catégorie
            const categoryMatch = selectedCategory === 'all' || category === selectedCategory;

            // Vérifier le terme de recherche
            const searchMatch = searchTerm === '' || 
                               title.includes(searchTerm) || 
                               tags.includes(searchTerm) ||
                               projects.includes(searchTerm);

            if (categoryMatch && searchMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease';
                // Masquer le contenu par défaut lors du filtrage
                card.classList.remove('expanded');
            } else {
                card.style.display = 'none';
                card.classList.remove('expanded');
            }
        });
    }

    // Écouter les événements de recherche
    skillSearch.addEventListener('input', filterSkills);

    // Écouter les événements de filtre
    skillFilter.addEventListener('change', filterSkills);

    // Ajouter le clic sur les projets associés dans les compétences
    const skillProjectLinks = document.querySelectorAll('.skill-projects li[data-project]');
    skillProjectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            window.openModal(projectId);
        });
    });
});
