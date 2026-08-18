/* ============================================================
   puedesleerlo.github.io — page behaviour

   Three jobs:
     1. language toggle (EN / ES) over data-en / data-es
     2. theme toggle, writing data-theme on <html> — which is
        exactly what the design system's tokens read
     3. mounting design-system components into figure slots

   Prose and layout are static HTML. React is used only for the
   figures, so the page still reads without it.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var listeners = [];

  /* ---------- language ------------------------------------------------- */

  var nodes = document.querySelectorAll('[data-en]');
  var langBtns = document.querySelectorAll('[data-lang]');
  var lang = 'en';

  function setLang(next) {
    lang = next === 'es' ? 'es' : 'en';
    nodes.forEach(function (n) {
      var v = n.getAttribute('data-' + lang);
      if (v !== null) n.innerHTML = v;
    });
    root.setAttribute('lang', lang);
    langBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
    listeners.forEach(function (fn) { fn(lang); });
  }

  langBtns.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem('site-lang'); } catch (e) {}
  if (!savedLang && navigator.language && navigator.language.toLowerCase().indexOf('es') === 0) {
    savedLang = 'es';
  }

  /* ---------- theme ---------------------------------------------------- */

  function setTheme(t) {
    if (t === 'dark') root.setAttribute('data-theme', 'dark');
    else root.setAttribute('data-theme', 'light');
    try { localStorage.setItem('site-theme', t); } catch (e) {}
  }

  var themeBtn = document.getElementById('themeBtn');
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('site-theme'); } catch (e) {}
  if (!savedTheme) {
    savedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  }
  setTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- year ----------------------------------------------------- */

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- design-system figures ------------------------------------
     Each entry is { slot, render }. `render` receives the design
     system namespace, React, and the active language, and returns
     an element. A slot whose render throws is left with its static
     fallback rather than blanking the page.                            */

  function mountFigures() {
    var specs = window.SITE_FIGURES;
    if (!specs || !specs.length) return;

    var DS = window.TabaresDS;
    var R = window.React;
    var RD = window.ReactDOM;
    if (!DS || !R || !RD || !RD.createRoot) return;

    var mounted = specs.map(function (spec) {
      var el = document.getElementById(spec.slot);
      if (!el) return null;
      try {
        var node = document.createElement('div');
        el.replaceChildren(node);
        var reactRoot = RD.createRoot(node);
        reactRoot.render(spec.render(DS, R, lang));
        return { spec: spec, root: reactRoot };
      } catch (err) {
        if (window.console) console.warn('[figure] ' + spec.slot, err);
        return null;
      }
    }).filter(Boolean);

    listeners.push(function (nextLang) {
      mounted.forEach(function (m) {
        try { m.root.render(m.spec.render(DS, R, nextLang)); } catch (e) {}
      });
    });
  }

  /* Deferred scripts run in order, so React, the bundle and the page's
     own SITE_FIGURES are all in place by the time this executes. */
  mountFigures();

  /* Language is applied last so figures are already registered and
     re-render with the rest of the page. */
  if (savedLang) setLang(savedLang);
})();
