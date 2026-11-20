/* Motion choreography for Scott & Jerm's Iceland.
   Uses the Motion library (motion.dev, v12.23.24, self-hosted in vendor/).
   Rules: transform and opacity only, springs for anything the hand drives, and
   nothing runs when the visitor prefers reduced motion (the book then switches pages instantly). */
(function () {
  "use strict";
  var M = window.Motion;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!M || !M.animate || reduce) { window.TripFX = null; return; }
  document.documentElement.classList.add("fx");

  var animate = M.animate, stagger = M.stagger;
  var TURN = { duration: 0.62, ease: [0.32, 0.72, 0, 1] };
  var SOFT = { type: "spring", visualDuration: 0.5, bounce: 0.12 };
  var running = [];
  var pendingDone = null;

  function track(c) { running.push(c); return c; }
  function finish() {
    var list = running; running = [];
    list.forEach(function (c) { try { c.complete(); } catch (e) {} });
    if (pendingDone) { var d = pendingDone; pendingDone = null; d(); }
  }
  function currentX(el) {
    var m = /translate3d\((-?[\d.]+)px/.exec(el.style.transform || "");
    return m ? parseFloat(m[1]) : 0;
  }

  /* words on a page arrive in a soft stagger */
  function reveal(page, delay) {
    var items = page.querySelectorAll(".rv");
    if (!items.length) return;
    track(animate(items, { opacity: [0, 1], y: [18, 0] }, { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: stagger(0.045, { startDelay: delay || 0 }) }));
  }

  /* a page turn: the new page slides over the old one, which eases back and dims */
  function turn(out, inn, dir, fromPx, done) {
    var W = window.innerWidth;
    var start = fromPx || currentX(out);
    inn.classList.add("is-entering");
    inn.classList.toggle("from-left", dir < 0);
    var media = inn.querySelector(".media");
    var dim = out.querySelector(".dim");
    var outMedia = out.querySelector(".media");
    pendingDone = function () {
      inn.classList.remove("is-entering", "from-left");
      [inn, out, media, outMedia].forEach(function (el) { if (el) el.style.transform = ""; });
      if (dim) dim.style.opacity = "";
      out.style.opacity = "";
      done();
    };
    var a = track(animate(inn, { x: [dir * W, 0] }, TURN));
    if (media) track(animate(media, { x: [-dir * W * 0.22, 0] }, TURN));
    track(animate(out, { x: [start, -dir * W * 0.28] }, TURN));
    if (outMedia) track(animate(outMedia, { x: [0, dir * W * 0.06] }, TURN));
    if (dim) track(animate(dim, { opacity: [0, 0.45] }, { duration: 0.5 }));
    reveal(inn, 0.18);
    var safety = setTimeout(function () { if (pendingDone) finish(); }, 1400);
    a.then(function () {
      clearTimeout(safety);
      if (!pendingDone) return;
      var d = pendingDone; pendingDone = null;
      running = running.filter(function (c) { return c !== a; });
      d();
    });
  }

  /* a drag that did not go far enough springs back */
  function settle(page) {
    var x = currentX(page);
    if (!x) { page.style.transform = ""; return; }
    animate(page, { x: [x, 0] }, SOFT).then(function () { page.style.transform = ""; });
  }

  function intro(page) {
    var media = page.querySelector(".media img");
    if (media) animate(media, { scale: [1.08, 1], opacity: [0, 1] }, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    reveal(page, 0.25);
  }

  function progress(el, frac) {
    animate(el, { scaleX: frac }, SOFT);
  }

  function tick(el) {
    animate(el, { opacity: [0.2, 1], y: [-8, 0] }, { duration: 0.35, ease: [0.22, 1, 0.36, 1] });
  }

  function pillTo(pill, transform) {
    var m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(transform);
    if (!m) { pill.style.transform = transform; return; }
    animate(pill, { x: parseFloat(m[1]), y: parseFloat(m[2]) }, SOFT);
  }

  function menuIn(menu) {
    animate(menu, { opacity: [0, 1] }, { duration: 0.3 });
    var items = menu.querySelectorAll(".c-group li, .c-head");
    animate(items, { opacity: [0, 1], y: [14, 0] }, { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: stagger(0.02, { startDelay: 0.05 }) });
  }
  function menuOut(menu, done) {
    animate(menu, { opacity: [1, 0] }, { duration: 0.22 }).then(function () { menu.style.opacity = ""; done(); });
  }

  function lbIn(root, wrap) {
    animate(root.querySelector(".lb-backdrop"), { opacity: [0, 1] }, { duration: 0.3 });
    animate(wrap, { opacity: [0, 1], scale: [0.94, 1] }, SOFT);
  }
  function lbOut(root, wrap, done) {
    animate(root.querySelector(".lb-backdrop"), { opacity: [1, 0] }, { duration: 0.25 });
    animate(wrap, { opacity: [1, 0], scale: [1, 0.96] }, { duration: 0.22 }).then(done);
  }
  function slide(wrap, dir, swap) {
    animate(wrap, { opacity: [1, 0], x: [0, -dir * 40] }, { duration: 0.16 }).then(function () {
      swap();
      animate(wrap, { opacity: [0, 1], x: [dir * 40, 0] }, SOFT);
    });
  }

  window.TripFX = {
    turn: turn, finish: finish, settle: settle, intro: intro, reveal: reveal, progress: progress,
    tick: tick, pillTo: pillTo, menuIn: menuIn, menuOut: menuOut, lbIn: lbIn, lbOut: lbOut, slide: slide
  };
})();
