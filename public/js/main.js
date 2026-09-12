// ============================================================
//  PORTFOLIO 3.0 — Interactions (zéro dépendance)
// ============================================================

// ---------- Helpers ----------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReduced =
  typeof window.matchMedia === 'function' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches || false);

let curLang = 'fr';

// ---------- Thème clair / sombre ----------
function initTheme() {
  const btn = $('[data-theme-toggle]');
  if (!btn) return;
  const root = document.documentElement;
  const apply = t => {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  };
  btn.addEventListener('click', () => {
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

// ---------- En-tête : état au scroll ----------
function initHeader() {
  const header = $('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- Menu mobile ----------
function initNav() {
  const toggle = $('[data-nav-toggle]');
  const nav = $('[data-nav]');
  if (!toggle || !nav) return;
  const setOpen = open => {
    nav.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') setOpen(false);
  });
}

// ---------- Scrollspy ----------
function initSpy() {
  const links = $$('[data-spy]');
  if (!links.length) return;
  const ids = links.map(a => a.getAttribute('data-spy')).filter(Boolean);
  const map = new Map();
  ids.forEach(id => { const el = document.getElementById(id); if (el) map.set(id, el); });
  const onScroll = () => {
    const pos = window.scrollY + window.innerHeight * 0.35;
    let current = ids[0];
    map.forEach((el, id) => { if (pos >= el.offsetTop) current = id; });
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('data-spy') === current));
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
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        try { io.unobserve(e.target); } catch (_) {}
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach(el => io.observe(el));
}

// ---------- Année & compteurs ----------
function initCounters() {
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

// ---------- Effet machine à écrire ----------
function initTypewriter() {
  const host = $('[data-type-roles]');
  if (!host) return;
  let roles = [];
  try { roles = JSON.parse(host.dataset.typeRoles || '[]'); } catch (e) {}
  if (!roles.length) return;
  const speeds = { type: 62, pause: 1500, delete: 26 };
  let r = 0, i = 0, deleting = false;
  const step = () => {
    try { roles = JSON.parse(host.dataset.typeRoles || '[]'); } catch (e) { roles = []; }
    if (!roles.length) return;
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
  setTimeout(step, 500);
}

// ---------- Filtres projets ----------
function initFilters() {
  const wrap = $('[data-filters]');
  const grid = $('[data-projects-grid]');
  if (!wrap || !grid) return;
  const cards = $$('[data-project]', grid);
  const apply = cat => {
    cards.forEach(card => {
      const ok = cat === 'tous' || card.dataset.category === cat;
      card.style.display = ok ? '' : 'none';
      if (ok) card.style.animation = 'cardIn .35s ease';
    });
  };
  $$('.filter-btn', wrap).forEach(b => {
    b.addEventListener('click', () => {
      $$('.filter-btn', wrap).forEach(x => x.classList.remove('is-active'));
      b.classList.add('is-active');
      apply(b.dataset.filter);
    });
  });
}

// ---------- Formulaire de contact ----------
function initContact() {
  const form = $('[data-contact-form]');
  if (!form) return;
  const note = $('[data-form-note]', form);
  const btn = $('[data-submit-btn]', form);
  const validate = field => {
    let ok = field.checkValidity();
    if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) ok = false;
    field.closest('.field')?.classList.toggle('is-invalid', !ok);
    return ok;
  };
  form.addEventListener('input', e => {
    if (e.target.matches('input, textarea')) e.target.closest('.field')?.classList.remove('is-invalid');
  });
  form.addEventListener('blur', e => {
    if (e.target.matches('input, textarea')) validate(e.target);
  }, true);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea')].filter(f => f.required);
    const allOk = fields.map(validate).every(Boolean);
    if (!allOk) {
      note.textContent = curLang === 'fr' ? 'Merci de corriger les champs signalés.' : 'Please fix the highlighted fields.';
      note.classList.add('is-error');
      return;
    }
    const fd = new FormData(form);
    const subject = encodeURIComponent('[Portfolio] ' + (fd.get('sujet') || 'Nouveau message'));
    const body = encodeURIComponent('Nom : ' + fd.get('nom') + '\nEmail : ' + fd.get('email') + '\n\n' + fd.get('message'));
    const email = form.dataset.email || 'contact@mamourou-sidibe.fr';
    if (btn) btn.disabled = true;
    note.classList.remove('is-error');
    note.textContent = curLang === 'fr' ? 'Message prêt — votre client mail va s’ouvrir…' : 'Message ready — your mail app will open…';
    window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    setTimeout(() => { if (btn) btn.disabled = false; }, 2500);
  });
}

// ---------- Retour en haut ----------
function initBackToTop() {
  const btn = $('[data-back-to-top]');
  if (!btn) return;
  const onScroll = () => btn.classList.toggle('is-visible', window.scrollY > 480);
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }));
  onScroll();
}

// ---------- Langue FR / EN ----------
function applyLang(lang) {
  curLang = lang;
  document.documentElement.setAttribute('lang', lang);
  $$('[data-i18n]').forEach(el => {
    const v = el.dataset[lang];
    if (v) el.textContent = v;
  });
  $$('[data-ph-fr]').forEach(el => {
    const v = lang === 'fr' ? el.dataset.phFr : el.dataset.phEn;
    if (v) el.placeholder = v;
  });
  const tw = $('[data-type-roles]');
  if (tw) {
    const v = lang === 'fr' ? tw.dataset.typeRolesFr : tw.dataset.typeRolesEn;
    if (v) tw.dataset.typeRoles = v;
  }
  const title = $('title');
  if (title) {
    const v = title.dataset[lang];
    if (v) title.textContent = v;
  }
  const desc = $('meta[name="description"]');
  if (desc) {
    const v = desc.dataset[lang + 'Description'];
    if (v) desc.setAttribute('content', v);
  }
  $$('[data-set-lang]').forEach(b => b.classList.toggle('is-active', b.dataset.setLang === lang));
}

function initLang() {
  let lang = 'fr';
  try { lang = localStorage.getItem('lang') || 'fr'; } catch (e) {}
  applyLang(lang);
  $$('[data-set-lang]').forEach(b => b.addEventListener('click', () => {
    const l = b.dataset.setLang;
    applyLang(l);
    try { localStorage.setItem('lang', l); } catch (e) {}
  }));
}

// ---------- Initialisation ----------
function safeInit(fn) {
  try { fn(); } catch (err) { console.warn?.('[portfolio] init :', err?.message || err); }
}

document.addEventListener('DOMContentLoaded', () => {
  safeInit(initLang);
  safeInit(initTheme);
  safeInit(initHeader);
  safeInit(initNav);
  safeInit(initSpy);
  safeInit(initReveal);
  safeInit(initCounters);
  safeInit(initTypewriter);
  safeInit(initFilters);
  safeInit(initContact);
  safeInit(initBackToTop);
});

// Petit clin d’œil console
try {
  console.log('%cPortfolio 3.0', 'font-weight:bold;color:#2563eb;font-size:13px');
} catch (e) {}