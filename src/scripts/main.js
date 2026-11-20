// ============================================================
//  PORTFOLIO — Interactions (zéro dépendance)
// ============================================================

// ---------- Helpers ----------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReduced =
  typeof window.matchMedia === "function" &&
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches || false);

let curLang = "fr";

// ---------- Thème clair / sombre ----------
function initTheme() {
  const btn = $("[data-theme-toggle]");
  if (!btn) return;
  const root = document.documentElement;
  const apply = (t) => {
    root.setAttribute("data-theme", t);
    try {
      localStorage.setItem("theme", t);
    } catch (e) {}
  };
  btn.addEventListener("click", () => {
    apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
}

// ---------- En-tête : état au scroll ----------
function initHeader() {
  const header = $(".site-header");
  if (!header) return;
  const onScroll = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ---------- Menu mobile (menu déroulant) ----------
function initNav() {
  const toggle = $("[data-nav-toggle]");
  const nav = $("[data-nav]");
  const backdrop = $("[data-nav-backdrop]");
  if (!toggle || !nav) return;
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    if (backdrop) backdrop.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () =>
    setOpen(!nav.classList.contains("is-open")),
  );
  backdrop?.addEventListener("click", () => setOpen(false));
  nav.addEventListener("click", (e) => {
    if (!e.target.closest("a")) setOpen(false);
  });
  $$("a", nav).forEach((a) =>
    a.addEventListener("click", () => setOpen(false)),
  );
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 960) setOpen(false);
  });
}

// ---------- Scrollspy ----------
function initSpy() {
  const links = $$("[data-spy]");
  if (!links.length) return;
  const ids = links.map((a) => a.getAttribute("data-spy")).filter(Boolean);
  const map = new Map();
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) map.set(id, el);
  });
  const onScroll = () => {
    const pos = window.scrollY + window.innerHeight * 0.35;
    let current = null; // rien de surligné tant qu'on est sur l'accueil
    map.forEach((el, id) => {
      if (pos >= el.offsetTop) current = id;
    });
    links.forEach((a) =>
      a.classList.toggle("is-active", a.getAttribute("data-spy") === current),
    );
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ---------- Révélation au scroll ----------
function initReveal() {
  const items = $$(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window) || prefersReduced) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          try {
            io.unobserve(e.target);
          } catch (_) {}
        }
      }),
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  items.forEach((el) => io.observe(el));
}

// ---------- Année & compteurs ----------
function initCounters() {
  const yr = $("[data-year]");
  if (yr) yr.textContent = String(new Date().getFullYear());
}

// ---------- Filtres projets ----------
function initFilters() {
  const wrap = $("[data-filters]");
  const grid = $("[data-projects-grid]");
  if (!wrap || !grid) return;
  const cards = $$("[data-project]", grid);
  const apply = (cat) => {
    cards.forEach((card) => {
      const ok = cat === "tous" || card.dataset.category === cat;
      card.style.display = ok ? "" : "none";
      if (ok) card.style.animation = "cardIn .35s ease";
    });
  };
  $$(".filter-btn", wrap).forEach((b) => {
    b.addEventListener("click", () => {
      $$(".filter-btn", wrap).forEach((x) => {
        x.classList.toggle("is-active", x === b);
        x.setAttribute("aria-pressed", String(x === b));
      });
      apply(b.dataset.filter);
    });
  });
}

// ---------- Formulaire de contact ----------
function initContact() {
  const form = $("[data-contact-form]");
  if (!form) return;
  const note = $("[data-form-note]", form);
  const btn = $("[data-submit-btn]", form);
  const validate = (field) => {
    let ok = field.checkValidity();
    if (
      field.type === "email" &&
      field.value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
    )
      ok = false;
    field.closest(".field")?.classList.toggle("is-invalid", !ok);
    return ok;
  };
  form.addEventListener("input", (e) => {
    if (e.target.matches("input, textarea"))
      e.target.closest(".field")?.classList.remove("is-invalid");
  });
  form.addEventListener(
    "blur",
    (e) => {
      if (e.target.matches("input, textarea")) validate(e.target);
    },
    true,
  );
  const t = (fr, en) => (curLang === "fr" ? fr : en);
  const setNote = (msg, kind) => {
    note.textContent = msg;
    note.classList.toggle("is-error", kind === "error");
    note.classList.toggle("is-ok", kind === "ok");
  };

  // Ouvre la messagerie du visiteur (repli si l'envoi en ligne échoue)
  const mailtoHref = (fd) =>
    "mailto:" +
    form.dataset.email +
    "?subject=" +
    encodeURIComponent("[Portfolio] " + (fd.get("sujet") || "Nouveau message")) +
    "&body=" +
    encodeURIComponent(
      "Nom : " + fd.get("nom") + "\nEmail : " + fd.get("email") + "\n\n" + fd.get("message"),
    );

  // Envoi via FormSubmit ou Web3Forms : le message arrive directement par e-mail
  async function envoyer(fd) {
    const service = form.dataset.service;
    const sujet = "[Portfolio] " + (fd.get("sujet") || "Nouveau message de " + fd.get("nom"));
    const payload =
      service === "web3forms"
        ? {
            access_key: form.dataset.key,
            subject: sujet,
            from_name: "Portfolio — " + form.dataset.site,
            name: fd.get("nom"),
            email: fd.get("email"),
            replyto: fd.get("email"),
            message: fd.get("message"),
            botcheck: "",
          }
        : {
            _subject: sujet,
            _replyto: fd.get("email"),
            _template: "table",
            _captcha: "false",
            Nom: fd.get("nom"),
            Email: fd.get("email"),
            Sujet: fd.get("sujet") || "—",
            Message: fd.get("message"),
          };
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(form.dataset.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      return res.ok && data.success !== false && data.success !== "false";
    } finally {
      clearTimeout(timer);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll("input, textarea")].filter((f) => f.required);
    if (!fields.map(validate).every(Boolean)) {
      setNote(t("Merci de corriger les champs signalés.", "Please fix the highlighted fields."), "error");
      return;
    }
    const fd = new FormData(form);
    if (fd.get("_gotcha")) return; // robot détecté : on ignore silencieusement

    if (form.dataset.service === "mailto" || !form.dataset.endpoint) {
      setNote(t("Votre messagerie va s’ouvrir…", "Your mail app will open…"));
      window.location.href = mailtoHref(fd);
      return;
    }

    if (btn) btn.disabled = true;
    setNote(t("Envoi en cours…", "Sending…"));
    let ok = false;
    try {
      ok = await envoyer(fd);
    } catch (_) {
      ok = false;
    }
    if (btn) btn.disabled = false;

    if (ok) {
      form.reset();
      setNote(
        t("Merci ! Votre message a bien été envoyé. Je vous réponds rapidement.", "Thank you! Your message has been sent. I’ll get back to you soon."),
        "ok",
      );
    } else {
      setNote(
        t("L’envoi a échoué. Vous pouvez m’écrire directement : ", "Sending failed. You can email me directly: "),
        "error",
      );
      const a = document.createElement("a");
      a.href = mailtoHref(fd);
      a.textContent = form.dataset.email;
      note.append(a);
    }
  });
}

// ---------- Retour en haut ----------
function initBackToTop() {
  const btn = $("[data-back-to-top]");
  if (!btn) return;
  const onScroll = () =>
    btn.classList.toggle("is-visible", window.scrollY > 480);
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }),
  );
  onScroll();
}

// ---------- Langue FR / EN ----------
function applyLang(lang) {
  curLang = lang;
  document.documentElement.setAttribute("lang", lang);
  $$("[data-i18n]").forEach((el) => {
    const v = el.dataset[lang];
    if (v) el.textContent = v;
  });
  $$("[data-ph-fr]").forEach((el) => {
    const v = lang === "fr" ? el.dataset.phFr : el.dataset.phEn;
    if (v) el.placeholder = v;
  });
  const title = $("title");
  if (title) {
    const v = title.dataset[lang];
    if (v) title.textContent = v;
  }
  const desc = $('meta[name="description"]');
  if (desc) {
    const v = desc.dataset[lang + "Description"];
    if (v) desc.setAttribute("content", v);
  }
  $$("[data-set-lang]").forEach((b) =>
    b.classList.toggle("is-active", b.dataset.setLang === lang),
  );
}

function initLang() {
  let lang = document.documentElement.dataset.defaultLang || "fr";
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") lang = saved;
  } catch (e) {}
  applyLang(lang);
  $$("[data-set-lang]").forEach((b) =>
    b.addEventListener("click", () => {
      const l = b.dataset.setLang;
      applyLang(l);
      try {
        localStorage.setItem("lang", l);
      } catch (e) {}
    }),
  );
}

// ---------- Initialisation ----------
function safeInit(fn) {
  try {
    fn();
  } catch (err) {
    console.warn?.("[portfolio] init :", err?.message || err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  safeInit(initLang);
  safeInit(initTheme);
  safeInit(initHeader);
  safeInit(initNav);
  safeInit(initSpy);
  safeInit(initReveal);
  safeInit(initCounters);
  safeInit(initFilters);
  safeInit(initContact);
  safeInit(initBackToTop);
});
