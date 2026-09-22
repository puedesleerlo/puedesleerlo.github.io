/* ============================================================
   puedesleerlo.github.io — page behaviour on Cosmografía

   1. language toggle (EN / ES) over data-en / data-es
   2. plates: illustrations assemble themselves ground-up (DS.mountPlates)
   3. seals: each catalogue entry gets its constellation (DS.sealMarkup)
   4. the vine on a rule, the ember highlight drawn in on arrival
   5. design-system figures mounted into slots (React, figures only)
   6. the running head marks the plate you are reading

   Prose and layout are static HTML: without script the page is
   complete — drawings are plain <img>, highlights are simply on.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var DS = window.TabaresDS || null;
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
    document.querySelectorAll('[data-alt-en]').forEach(function (n) {
      var v = n.getAttribute('data-alt-' + lang);
      if (v !== null) {
        n.setAttribute('data-alt', v);
        var s = n.querySelector('svg[role="img"]'); if (s) s.setAttribute('aria-label', v);
        var i = n.querySelector('img'); if (i) i.setAttribute('alt', v);
      }
    });
    root.setAttribute('lang', lang);
    langBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
    listeners.forEach(function (fn) { fn(lang); });
    armHighlights();
  }

  langBtns.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem('site-lang'); } catch (e) {}
  if (!savedLang && navigator.language && navigator.language.toLowerCase().indexOf('es') === 0) savedLang = 'es';

  /* The sheet is white, always. Clear a theme a previous version stored. */
  try { localStorage.removeItem('site-theme'); } catch (e) {}
  root.removeAttribute('data-theme');

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- plates, seals, vines ------------------------------------- */

  if (DS) {
    try { DS.mountPlates(document); } catch (e) { if (window.console) console.warn('[plates]', e); }

    document.querySelectorAll('[data-seal]').forEach(function (el) {
      el.innerHTML = DS.sealMarkup(el.getAttribute('data-seal'), +(el.getAttribute('data-size') || 64));
    });

    document.querySelectorAll('[data-vine]').forEach(function (el) {
      el.innerHTML = DS.vineMarkup(el.getAttribute('data-vine'), +(el.getAttribute('data-reach') || 0.34),
        el.getAttribute('data-from') || 'left');
      var svg = el.firstElementChild;
      if (svg) DS.watch(svg, 'is-armed', 'is-grown', 0.6);
    });

    document.querySelectorAll('[data-flock]').forEach(function (el) { el.innerHTML = DS.flockMarkup(); });
  }

  /* the ember highlight draws itself in when its sentence arrives. It is
     re-armed after a language swap, because innerHTML replaced the mark. */
  function armHighlights() {
    if (!DS) return;
    document.querySelectorAll('.ds-hl--draw:not(.is-on)').forEach(function (m) {
      if (m.dataset.watched) return;
      m.dataset.watched = '1';
      DS.watch(m, 'is-armed', 'is-on', 0.6);
    });
  }

  /* ---------- design-system figures ------------------------------------ */

  function mountFigures() {
    var specs = window.SITE_FIGURES;
    var R = window.React, RD = window.ReactDOM;
    if (!specs || !specs.length || !DS || !R || !RD || !RD.createRoot) return;
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
      mounted.forEach(function (m) { try { m.root.render(m.spec.render(DS, R, nextLang)); } catch (e) {} });
    });
  }
  mountFigures();

  /* ---------- running head: which plate am I on ------------------------ */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.bar nav a[href^="#"]'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = byId[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          navLinks.forEach(function (x) { x.removeAttribute('aria-current'); });
          a.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  if (savedLang) setLang(savedLang); else armHighlights();
})();
