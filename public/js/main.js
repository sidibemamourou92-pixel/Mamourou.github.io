// ============================================================
//  main.js — Interactions du site (zéro dépendance)
// ============================================================

// ---------- Helpers ----------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReduced =
  typeof window.matchMedia === 'function' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches || false);

// ---------- Thème clair / sombre ----------
function initTheme() {
  const root = document.documentElement;
  const btn = $('[data-theme-toggle]');
  if (!btn) return;
  const setTheme = t => {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  };
  btn.addEventListener('click', () => {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    [root, btn].forEach(el => el.classList.add('theme-switching'));
    setTimeout(() => [root, btn].forEach(el => el.classList.remove('theme-switching')), 350);
  });
}

// ---------- Header : état scroll ----------
function initHeader() {
  const header = $('[data-header]');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- Menu mobile ----------
function initNav() {
  const toggle = $('[data-nav-toggle]');
  const nav = $('[data-nav]');
  const header = $('[data-header]');
  if (!toggle || !nav) return;

  const setOpen = open => {
    nav.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    header?.classList.toggle('nav-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') setOpen(false);
  });
}

// ---------- Barre de progression du scroll ----------
function initProgress() {
  const bar = $('[data-scroll-progress]');
  if (!bar) return;
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = `${max > 0 ? (h.scrollTop / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- Scrollspy (lien actif dans la nav) ----------
function initScrollSpy() {
  const links = $$('[data-spy]');
  if (!links.length) return;
  const ids = links.map(l => l.getAttribute('data-spy')).filter(Boolean);
  const map = new Map();
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) map.set(id, el);
  });

  const onScroll = () => {
    const pos = window.scrollY + window.innerHeight * 0.35;
    let current = ids[0];
    map.forEach((el, id) => { if (pos >= el.offsetTop) current = id; });
    links.forEach(l => l.classList.toggle('is-active', l.getAttribute('data-spy') === current));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- Révélation au scroll ----------
function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window) || prefersReduced) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach(el => io.observe(el));
}

// ---------- Compteurs animés ----------
function initCounters() {
  const els = $$('[data-count]');
  if (!els.length) return;
  const animate = el => {
    const target = Number(el.dataset.count) || 0;
    const dur = 1400;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window)) { els.forEach(animate); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
  }), { threshold: 0.6 });
  els.forEach(el => io.observe(el));
}

// ---------- Effet machine à écrire ----------
function initTypewriter() {
  const host = $('[data-type-roles]');
  if (!host) return;
  let roles = [];
  try { roles = JSON.parse(host.dataset.typeRoles || '[]'); } catch (e) {}
  if (!roles.length) return;
  const speeds = { type: 65, pause: 1700, delete: 30 };
  let r = 0, i = 0, deleting = false;

  const step = () => {
    const word = roles[r % roles.length];
    host.textContent = word.slice(0, i);
    if (!deleting) {
      if (i < word.length) { i++; setTimeout(step, speeds.type); }
      else { deleting = true; setTimeout(step, speeds.pause); }
    } else {
      if (i > 0) { i--; setTimeout(step, speeds.delete); }
      else { deleting = false; r++; setTimeout(step, speeds.type); }
    }
  };
  setTimeout(step, 400);
}

// ---------- Retour en haut ----------
function initBackToTop() {
  const btn = $('[data-back-to-top]');
  if (!btn) return;
  const ring = $('.btt-ring', btn);
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? h.scrollTop / max : 0;
    btn.classList.toggle('is-visible', window.scrollY > 500);
    if (ring) { ring.style.setProperty('--p', p * 100); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }));
  onScroll();
}
// ---------- Compétences : recherche & filtres ----------
function initSkills() {
  const search = $('#skillSearch');
  const filters = $$('.chip-filter');
  const cards = $$('.skill-card');
  if (!cards.length) return;

  const apply = () => {
    const term = (search?.value || '').toLowerCase().trim();
    const cat = filters.find(f => f.classList.contains('is-active'))?.dataset.skillCat || 'tous';
    cards.forEach(card => {
      const text = [card, ...$$('.skill-tags li', card), ...$$('.skill-projects', card)]
        .map(n => n.textContent.toLowerCase())
        .join(' ');
      const catOk = cat === 'tous' || card.dataset.cat === cat;
      const termOk = !term || text.includes(term);
      card.style.display = catOk && termOk ? '' : 'none';
      card.style.animation = catOk && termOk ? 'cardIn .35s ease' : '';
    });
  };

  search?.addEventListener('input', apply);
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x => x.classList.remove('is-active'));
    f.classList.add('is-active');
    apply();
  }));

  // Barres animées au scroll
  const fills = $$('.skill-bar-fill');
  if (!('IntersectionObserver' in window)) {
    fills.forEach(el => { el.style.width = Math.min(el.dataset.bar, 100) + '%'; });
    return;
  }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.style.width = Math.min(el.dataset.bar, 100) + '%';
    io.unobserve(el);
  }), { threshold: 0.5 });
  fills.forEach(el => io.observe(el));
}

// ---------- Projets : filtres par catégorie ----------
function initProjectFilters() {
  const btnWrap = $('.project-filters');
  const grid = $('#projectsGrid');
  if (!btnWrap || !grid) return;
  const cards = $$('[data-project-card]', grid);
  const empty = $('[data-projects-empty]');

  $$('.filter-btn', btnWrap).forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn', btnWrap).forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.dataset.filter;
      let shown = 0;
      cards.forEach(card => {
        const ok = cat === 'all' || card.dataset.cat === cat;
        card.style.display = ok ? '' : 'none';
        if (ok) { shown++; card.style.animation = 'cardIn .4s ease'; }
      });
      if (empty) empty.hidden = shown > 0;
    });
  });
}

// ---------- Effet tilt 3D (cartes) ----------
function initTilt() {
  if (prefersReduced || !window.PointerEvent) return;
  const cards = $$('.tilt');
  if (!cards.length) return;
  cards.forEach(el => {
    el.addEventListener('pointermove', e => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', (-y * 7) + 'deg');
      el.style.setProperty('--ry', (x * 9) + 'deg');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
}
// ---------- Modale projet + carrousel ----------
function initProjectModal() {
  const modal = $('#projectModal');
  if (!modal) return;
  let data = [];
  try { data = JSON.parse(window.__PROJECT_DATA__ || '[]'); } catch (e) {}
  if (!data.length) return;

  const img = $('#pmImage', modal);
  const dots = $('[data-carousel-dots]', modal);
  let list = [], idx = 0;

  const renderDots = n => {
    dots.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const li = document.createElement('li');
      li.addEventListener('click', () => { go(i); });
      dots.appendChild(li);
    }
  };
  const paint = () => {
    if (!list.length) return;
    img.src = list[idx].src;
    img.alt = list[idx].alt;
    $$('li', dots).forEach((d, i) => d.classList.toggle('is-active', i === idx));
  };
  const go = i => {
    idx = (i + list.length) % list.length;
    paint();
  };

  const open = id => {
    const p = data.find(x => x.id === Number(id));
    if (!p) return;
    idx = 0;
    list = p.gallery.map((src, i) => ({ src, alt: `Illustration ${i + 1} — ${p.title}` }));
    img.src = p.image;
    $('#pmTitle', modal).textContent = p.title;
    $('#pmDescription', modal).textContent = p.description;
    $('#pmStory', modal).textContent = p.story;
    $('#pmTechnologies', modal).innerHTML = p.technologies.map(t => '<li>' + t + '</li>').join('');
    $('#pmFeatures', modal).innerHTML = p.features.map(f => '<li>' + f + '</li>').join('');
    renderDots(list.length);
    paint();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  $('[data-carousel-next]', modal).addEventListener('click', next);
  $('[data-carousel-prev]', modal).addEventListener('click', prev);
  $$('[data-close-modal]', modal).forEach(el => el.addEventListener('click', close));

  const openBtns = $$('[data-open-project]');
  openBtns.forEach(b => b.addEventListener('click', () => open(b.dataset.openProject)));

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  window.openProjectModal = open;
}
// ---------- Lightbox de la galerie ----------
function initLightbox() {
  const imgs = $$('[data-gallery-img]');
  if (!imgs.length) return;
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML =
    '<button class="lb-close" aria-label="Fermer">&times;</button>' +
    '<button class="lb-prev" aria-label="Précédente">&#8249;</button>' +
    '<figure class="lb-figure"><img alt="" /><figcaption></figcaption></figure>' +
    '<button class="lb-next" aria-label="Suivante">&#8250;</button>';
  document.body.appendChild(lb);
  const figure = lb.querySelector('.lb-figure');
  const phImg = figure.querySelector('img');
  const cap = figure.querySelector('figcaption');
  let list = [], idx = 0;

  const show = i => {
    idx = (i + list.length) % list.length;
    phImg.src = list[idx].src;
    phImg.alt = list[idx].alt;
    cap.textContent = list[idx].alt;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => { lb.classList.remove('is-open'); document.body.style.overflow = ''; };

  imgs.forEach(img => img.addEventListener('click', () => {
    list = imgs.map(m => ({ src: m.getAttribute('src'), alt: m.getAttribute('alt') }));
    idx = imgs.indexOf(img);
    show(idx);
  }));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  lb.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); show(idx - 1); });
  lb.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); show(idx + 1); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });
}

// ---------- Formulaire de contact ----------
function initContact() {
  const form = $('[data-contact-form]');
  if (!form) return;
  const note = $('[data-form-note]', form);
  const btn = $('[data-submit-btn]', form);

  const validateField = field => {
    let ok = field.checkValidity();
    if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) ok = false;
    field.closest('.field')?.classList.toggle('has-error', !ok);
    return ok;
  };

  form.addEventListener('input', e => {
    if (e.target.matches('input, textarea')) e.target.closest('.field')?.classList.remove('has-error');
  });
  form.addEventListener('blur', e => {
    if (e.target.matches('input, textarea')) validateField(e.target);
  }, true);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea')].filter(f => f.required);
    const allOk = fields.map(validateField).every(Boolean);
    if (!allOk) {
      note.textContent = '⚠️ Merci de corriger les champs signalés.';
      note.classList.add('is-error');
      return;
    }
    const fd = new FormData(form);
    const subject = encodeURIComponent('[Portfolio] ' + (fd.get('sujet') || 'Nouveau message'));
    const body = encodeURIComponent(
      'Nom : ' + fd.get('nom') + '\nEmail : ' + fd.get('email') + '\n\n' + fd.get('message')
    );
    const email = 'contact@mamourou-sidibe.fr';
    if (btn) btn.disabled = true;
    note.classList.remove('is-error');
    note.textContent = '✅ Message prêt ! Votre client mail va s’ouvrir…';
    window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    setTimeout(() => { if (btn) btn.disabled = false; }, 2500);
  });
}

// ---------- Easter egg console ----------
function consoleEasterEgg() {
  try {
    console.log(
      '%c⚡ portfolio de Mamourou Sidibé %c\nAstro 7 · zéro dépendance JS · 100 % fait main\nRepo : https://github.com/sidibemamourou92-pixel',
      'color:#22d3ee;font-size:14px;font-weight:bold',
      'color:#93a3c3;font-size:12px'
    );
  } catch (e) {}
}

// ---------- Horloge « en ligne » (hero) ----------
function initLiveClock() {
  const t = $('[data-live-time]');
  const d = $('[data-live-date]');
  if (!t && !d) return;
  const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const paint = () => {
    const now = new Date();
    if (t) t.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    if (d) d.textContent = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
  };
  paint();
  setInterval(paint, 30000);
}

// ---------- Compteurs dynamiques (année, expérience) ----------
function initDynamicCounters() {
  const yr = $('[data-year]');
  if (yr) yr.textContent = String(new Date().getFullYear());
  const exp = $('[data-years][data-from]');
  if (exp) {
    const start = new Date(exp.dataset.from);
    const now = new Date();
    let y = now.getFullYear() - start.getFullYear();
    const anniv = new Date(now.getFullYear(), start.getMonth(), start.getDate()).getTime();
    if (now.getTime() < anniv) y--;
    exp.textContent = String(Math.max(y, 1));
  }
}

// ---------- Statistiques GitHub en direct ----------
function initGithub() {
  const wrap = $('[data-gh-stats]');
  const user = wrap?.dataset?.ghUser;
  const repos = $('[data-gh-repos]');
  const stars = $('[data-gh-stars]');
  const last = $('[data-gh-last]');
  if (!wrap || !user) return;
  const fmtAgo = iso => {
    const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 86400000));
    if (days === 0) return "aujourd'hui";
    if (days === 1) return 'hier';
    if (days < 60) return `il y a ${days} j`;
    return new Date(iso).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };
  fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated`, { cache: 'no-store' })
    .then(r => {
      if (!r.ok) throw new Error('gh ' + r.status);
      return r.json();
    })
    .then(list => {
      if (!Array.isArray(list)) return;
      if (repos) repos.textContent = String(list.length);
      if (stars) stars.textContent = String(list.reduce((a, b) => a + (b.stargazers_count || 0), 0));
      const dated = list.map(x => x.updated_at || '').filter(Boolean).sort().pop();
      if (last && dated) last.textContent = fmtAgo(dated);
    })
    .catch(() => { /* hors-ligne ou limite API : on conserve les tirets */ });
}

// ---------- Initialisation ----------
// Chaque init est isolée : une erreur ne bloque jamais les autres.
function safeInit(fn) {
  try {
    fn();
  } catch (err) {
    console.warn('[portfolio] init échouée:', err?.message || err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  safeInit(initTheme);
  safeInit(initHeader);
  safeInit(initNav);
  safeInit(initProgress);
  safeInit(initScrollSpy);
  safeInit(initReveal);
  safeInit(initCounters);
  safeInit(initTypewriter);
  safeInit(initBackToTop);
  safeInit(initSkills);
  safeInit(initProjectFilters);
  safeInit(initTilt);
  safeInit(initProjectModal);
  safeInit(initLightbox);
  safeInit(initContact);
  safeInit(initLiveClock);
  safeInit(initDynamicCounters);
  safeInit(initGithub);
  safeInit(consoleEasterEgg);
});

// Filet de sécurité : si le JS a masqué du contenu (gate .js) mais que la
// révélation n'a pas eu lieu (ex : scroll bloqué, IO défaillant), on force
// l'affichage quelques secondes plus tard pour ne JAMAIS laisser une page vide.
window.addEventListener('load', () => {
  setTimeout(() => {
    if (document.documentElement.classList.contains('js')) {
      const hidden = $$('.reveal:not(.is-in)');
      if (hidden.length) {
        // On ne force que si rien n'a été révélé du tout (page potentiellement vide),
        // sinon le reveal scroll reste actif normalement.
        const already = document.querySelectorAll('.reveal.is-in').length;
        if (already === 0) {
          hidden.forEach(el => el.classList.add('is-in'));
        }
      }
    }
  }, 1200);
});

