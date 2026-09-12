// Donn├®es des projets pour la modale
const projectsData = {
    1: {
        title: 'Ventilateur Automatique Intelligent',
        description: 'Tout a commenc├® par un probl├¿me simple : comment automatiser la ventilation d\'une pi├¿ce sans surveillance constante ? Ce projet est n├® de la volont├® de cr├®er un syst├¿me autonome capable de maintenir une temp├®rature ambiante optimale. En combinant un capteur de temp├®rature, un microcontr├┤leur et un syst├¿me de relais, j\'ai d├®velopp├® une solution intelligente qui s\'adapte en temps r├®el aux conditions environnementales.',
        story: 'Le d├®fi ├®tait de rendre le syst├¿me suffisamment r├®actif tout en ├®tant ├®conome en ├®nergie. J\'ai d├╗ r├®soudre des probl├¿mes de calibration du capteur et d\'hyst├®r├®sis pour ├®viter les d├®clenchements intempestifs. Aujourd\'hui, ce syst├¿me fonctionne de mani├¿re fiable et m\'a permis de ma├«triser les bases des syst├¿mes de contr├┤le automatique.',
        image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200',
        technologies: ['Arduino Uno', 'Capteur DHT11', '├ëcran LCD 16x2', 'Relais 5V'],
        features: ['Mesure de temp├®rature en temps r├®el', 'Contr├┤le automatique du ventilateur', 'Affichage des donn├®es sur LCD', 'Seuil de temp├®rature ajustable'],
        gallery: [
            'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=400',
            'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?q=80&w=400',
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400'
        ]
    },
    2: {
        title: 'Robot Quadrup├¿de (ESP32)',
        description: 'Fascin├® par la biom├®canique et la fa├ºon dont les animaux se d├®placent, j\'ai voulu cr├®er un robot capable de reproduire une d├®marche naturelle. Ce quadrup├¿de repr├®sente des mois de travail sur la cin├®matique inverse et la synchronisation des mouvements. Chaque pas du robot est le r├®sultat d\'algorithmes complexes calculant l\'angle de chaque servomoteur pour cr├®er une locomotion fluide et r├®aliste.',
        story: 'Le plus grand d├®fi a ├®t├® d\'atteindre une stabilit├® dynamique. J\'ai d├╗ impl├®menter des algorithmes de contr├┤le pr├®dictif et effectuer des centaines de tests pour trouver les bons param├¿tres de mouvement. La connexion Bluetooth permet un contr├┤le en temps r├®el, transformant mon smartphone en t├®l├®commande sophistiqu├®e. Ce projet m\'a appris la patience et la rigueur n├®cessaires en robotique.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200',
        technologies: ['ESP32 DevKit', 'Servomoteurs MG996R (x4)', 'Servomoteurs MG90S (x4)', 'Batterie LiPo 7.4V'],
        features: ['D├®marche avant/arri├¿re', 'Rotation gauche/droite', 'Mouvements de danse', 'Contr├┤le via Bluetooth'],
        gallery: [
            'image\WIN_20260508_12_25_31_Pro.jpg',
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400'
        ]
    },
    3: {
        title: 'Configuration Headless Raspberry Pi 5',
        description: 'Comment d├®ployer un serveur complet sans jamais brancher d\'├®cran ni de clavier ? C\'est le d├®fi que j\'ai relev├® avec ce projet d\'installation headless. L\'objectif : cr├®er un syst├¿me enti├¿rement automatis├® qui se configure lui-m├¬me au premier d├®marrage, ├®tablissant une connexion WiFi s├®curis├®e et permettant un acc├¿s distant imm├®diat.',
        story: 'J\'ai con├ºu un point d\'acc├¿s WiFi temporaire qui, lors de la premi├¿re connexion, capture les identifiants r├®seau et les configure automatiquement. L\'acc├¿s SSH par cl├®s publiques garantit une s├®curit├® maximale. Ce projet m\'a plong├® dans les arcanes de Linux et des r├®seaux, et constitue aujourd\'hui ma m├®thode standard pour d├®ployer des Raspberry Pi en production.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
        technologies: ['Raspberry Pi 5', 'Raspberry Pi OS Lite', 'SSH & VNC', 'Scripts Bash d\'automatisation'],
        features: ['Configuration WiFi headless', 'Acc├¿s SSH s├®curis├® par cl├®s', 'Point d\'acc├¿s mobile pour configuration', 'Monitoring ├á distance'],
        gallery: [
            'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400',
            'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400'
        ]
    },
    4: {
        title: 'Polygraphe Bio-├ëlectronique (ESP32)',
        description: 'Inspir├® par les techniques d\'investigation polici├¿re, j\'ai d├®cid├® de construire mon propre polygraphe pour mesurer les r├®actions physiologiques. Ce projet explore la conductance cutan├®e, un indicateur fiable du stress ├®motionnel. Les signaux ├®tant naturellement bruit├®s, j\'ai d├®velopp├® des algorithmes de filtrage num├®rique sophistiqu├®s pour extraire des donn├®es exploitables.',
        story: 'La difficult├® principale r├®sidait dans la qualit├® des signaux. Les ├®lectrodes en cuivre produisaient beaucoup de bruit parasite. J\'ai impl├®ment├® un filtre de moyenne mobile et test├® diff├®rentes fr├®quences d\'├®chantillonnage pour obtenir des courbes lisibles. Ce projet m\'a fait d├®couvrir le traitement du signal num├®rique et ses applications biom├®dicales.',
        image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=1200',
        technologies: ['ESP32', 'Capteurs de conductance cutan├®e', 'Filtres num├®riques (moyenne mobile)', '├ëcran OLED'],
        features: ['Mesure en temps r├®el', 'Filtrage des signaux bruyants', 'Affichage graphique des courbes', 'Enregistrement des donn├®es'],
        gallery: [
            'image\WIN_20260508_12_25_31_Pro.jpg',
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400'
        ]
    },
    
    5: {
        title: 'Robot Araign├®e (12 Servomoteurs)',
        description: 'Observer une araign├®e se d├®placer avec une agilit├® d├®concertante m\'a donn├® l\'id├®e de ce projet. Reproduire la biom├®canique d\'un arthropode demande une ma├«trise parfaite de 12 servomoteurs synchronis├®s. Chaque patte doit bouger en harmonie avec les autres pour garantir stabilit├® et fluidit├® du mouvement.',
        story: 'La complexit├® ├®tait de taille : 12 degr├®s de libert├® ├á contr├┤ler simultan├®ment. J\'ai utilis├® un Arduino Mega pour sa puissance de calcul et un contr├┤leur PWM PCA9685 pour g├®rer tous les servomoteurs sans surcharger le microcontr├┤leur. L\'impression 3D de la structure a permis d\'ajuster pr├®cis├®ment les articulations. Voir ce robot se d├®placer de mani├¿re autonome reste l\'une de mes plus grandes fiert├®s.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200',
        technologies: ['Arduino Mega 2560', 'Servomoteurs MG996R (x12)', 'PCA9685 (contr├┤leur PWM)', 'Structure 3D imprim├®e'],
        features: ['12 degr├®s de libert├®', 'Cin├®matique inverse', 'Plusieurs modes de marche', 'Contr├┤le via application mobile'],
        gallery: [
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400',
            'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400',
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400'
        ]
    },
    6: {
        title: 'Voiture T├®l├®command├®e & Autonome',
        description: 'Qui n\'a jamais r├¬v├® de construire sa propre voiture autonome ? Ce projet combine le plaisir du jeu avec la sophistication de l\'intelligence artificielle embarqu├®e. En mode manuel, elle se contr├┤le via smartphone en Bluetooth. En mode autonome, elle utilise des capteurs ├á ultrasons pour d├®tecter et ├®viter les obstacles intelligemment.',
        story: 'Le d├®fi ├®tait d\'assurer une transition fluide entre les deux modes de fonctionnement. J\'ai d├╗ g├®rer les conflits de commande et optimiser les temps de r├®ponse du capteur ultrason pour des d├®cisions rapides. Les tests en conditions r├®elles ont r├®v├®l├® des limitations de port├®e que j\'ai r├®solues par un algorithme de scan panoramique. Aujourd\'hui, cette voiture navigue de mani├¿re autonome dans un environnement complexe.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1200',
        technologies: ['Arduino Uno', 'Module Bluetooth HC-05', 'Capteur ├á ultrasons HC-SR04', 'Moteurs DC avec L298N'],
        features: ['Mode t├®l├®command├® via smartphone', 'Mode autonome avec ├®vitement', 'D├®tection d\'obstacles ├á 30cm', 'Vitesse variable'],
        gallery: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400',
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400'
        ]
    },
    7: {
        title: 'Syst├¿me de Reconnaissance ESP32-CAM',
        description: 'L\'intelligence artificielle embarqu├®e repr├®sente l\'avenir de l\'IoT. Ce projet pousse les limites de l\'ESP32-CAM en y int├®grant des capacit├®s de vision par ordinateur. Le syst├¿me peut d├®tecter des visages et reconna├«tre des objets en temps r├®el, le tout diffus├® via WiFi sur un serveur web accessible depuis n\'importe quel appareil.',
        story: 'Le plus grand d├®fi ├®tait d\'optimiser des mod├¿les TensorFlow Lite pour qu\'ils s\'ex├®cutent sur un microcontr├┤leur aux ressources limit├®es. J\'ai d├╗ quantifier les mod├¿les et r├®duire leur complexit├® sans perdre en pr├®cision. Le streaming vid├®o en temps r├®el demandait ├®galement une optimisation pouss├®e de la compression. Ce projet d├®montre que l\'edge computing et l\'IA embarqu├®e sont accessibles d├¿s aujourd\'hui.',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200',
        technologies: ['ESP32-CAM', 'TensorFlow Lite Micro', 'OpenCV', 'Serveur Web streaming'],
        features: ['D├®tection de visages', 'Reconnaissance d\'objets', 'Streaming vid├®o WiFi', 'Enregistrement sur carte SD'],
        gallery: [
            'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400',
            'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400',
            'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=400'
        ]
    }
};

// Fonctionnalit├® de filtrage des projets
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

        // Fonctionnalit├®s
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

    // Fonctionnalit├® de filtrage
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // G├®rer la classe active
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterText = this.textContent;

            // Filtrer les cartes
            projectCards.forEach(card => {
                let shouldShow = false;

                if (filterText === 'Tout') {
                    shouldShow = true;
                } else if (filterText === '├ëlectronique & Robotique') {
                    shouldShow = card.classList.contains('category-electronique') || 
                                 card.classList.contains('category-robotique');
                } else if (filterText === 'D├®veloppement & Donn├®es') {
                    shouldShow = card.classList.contains('category-developpement');
                } else if (filterText === 'R├®seaux & RF') {
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

// Fonctionnalit├® de recherche et filtrage des comp├®tences
document.addEventListener('DOMContentLoaded', function() {
    const skillSearch = document.getElementById('skillSearch');
    const skillFilter = document.getElementById('skillFilter');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillTitles = document.querySelectorAll('.skill-title');

    // S'assurer que toutes les cartes sont ferm├®es par d├®faut
    skillCards.forEach(card => {
        card.classList.remove('expanded');
    });

    // Fonction de toggle pour afficher/masquer les d├®tails
    function toggleSkillCard(card) {
        // Chaque carte est ind├®pendante, pas de fermeture des autres
        card.classList.toggle('expanded');
    }

    // Ajouter le clic sur chaque titre de comp├®tence
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

            // V├®rifier le filtre de cat├®gorie
            const categoryMatch = selectedCategory === 'all' || category === selectedCategory;

            // V├®rifier le terme de recherche
            const searchMatch = searchTerm === '' || 
                               title.includes(searchTerm) || 
                               tags.includes(searchTerm) ||
                               projects.includes(searchTerm);

            if (categoryMatch && searchMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease';
                // Masquer le contenu par d├®faut lors du filtrage
                card.classList.remove('expanded');
            } else {
                card.style.display = 'none';
                card.classList.remove('expanded');
            }
        });
    }

    // ├ëcouter les ├®v├®nements de recherche
    skillSearch.addEventListener('input', filterSkills);

    // ├ëcouter les ├®v├®nements de filtre
    skillFilter.addEventListener('change', filterSkills);

    // Ajouter le clic sur les projets associ├®s dans les comp├®tences
    const skillProjectLinks = document.querySelectorAll('.skill-projects li[data-project]');
    skillProjectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            window.openModal(projectId);
        });
    });
});
