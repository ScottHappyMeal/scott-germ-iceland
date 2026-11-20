/* Motion choreography for Scott & Jerm's Iceland.
   Uses the Motion library (motion.dev, v12.23.24, self-hosted in vendor/).
   Rules: animate transform and opacity only, spring physics for interactions,
   scroll-linked effects through Motion's scroll(), and nothing at all when the
   viewer prefers reduced motion. */
(function () {
  "use strict";

  var M = window.Motion;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  /* Springs, tuned by feel: soft for reveals, snappier for interactions. */
  var SPRING_SOFT = { type: "spring", visualDuration: 0.9, bounce: 0 };
  var SPRING_UI = { type: "spring", visualDuration: 0.45, bounce: 0.18 };
  var SPRING_TIGHT = { type: "spring", visualDuration: 0.32, bounce: 0.08 };

  var FX = {
    enabled: !!M && !reduce,
    tick: function () {},
    slide: function (el, dir, swap) { swap(); },
    lbIn: function () {},
    lbOut: function (root_, wrap, done) { done(); },
    railTo: null
  };
  window.TripFX = FX;
  if (!FX.enabled) return;

  var animate = M.animate, scroll = M.scroll, inView = M.inView;
  root.classList.add("fx");

  function px(n) { return Math.round(n * 100) / 100 + "px"; }

  /* ---------- scroll progress ---------- */
  var bar = document.getElementById("progressBar");
  if (bar) scroll(animate(bar, { transform: ["scaleX(0)", "scaleX(1)"] }, { ease: "linear" }));

  /* ---------- hero: intro, then scroll-linked parallax ---------- */
  var hero = document.getElementById("hero");
  var heroImg = document.getElementById("heroImg");
  var heroInner = document.getElementById("heroInner");
  if (hero && heroImg) {
    animate(heroImg, { transform: ["scale(1.22)", "scale(1.08)"], opacity: [0, 1] }, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
    /* transitions.dev "texts reveal": lines rise out of a mask with an offset stagger */
    var lines = hero.querySelectorAll(".hero-title .li");
    animate(lines, { transform: ["translateY(108%)", "translateY(0%)"] }, Object.assign({}, SPRING_SOFT, { delay: M.stagger(0.12, { startDelay: 0.3 }) }));
    var parts = hero.querySelectorAll(".eyebrow, .hero-lede, .hero-badges, .live-card");
    animate(parts, { opacity: [0, 1], transform: ["translateY(30px)", "translateY(0px)"] }, Object.assign({}, SPRING_SOFT, { delay: M.stagger(0.08, { startDelay: 0.55 }) }));
    var outer = hero.querySelector(".hero-media");
    scroll(animate(outer, { transform: ["translateY(0%)", "translateY(18%)"] }, { ease: "linear" }), { target: hero, offset: ["start start", "end start"] });
    if (heroInner) scroll(animate(heroInner, { opacity: [1, 0], transform: ["translateY(0px)", "translateY(-80px)"] }, { ease: "linear" }), { target: hero, offset: ["start start", "end 25%"] });
  }

  /* ---------- reveals, staggered within each parent ---------- */
  function revealAll() {
    inView(".reveal", function (el) {
      var sibs = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains("reveal"); }) : [el];
      var i = Math.max(0, sibs.indexOf(el));
      animate(el, { opacity: [0, 1], transform: ["translateY(28px)", "translateY(0px)"] }, Object.assign({}, SPRING_SOFT, { delay: Math.min(i, 6) * 0.07 }));
      var kids = el.querySelectorAll(".reveal-child");
      if (kids.length) animate(kids, { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] }, Object.assign({}, SPRING_SOFT, { delay: M.stagger(0.08, { startDelay: 0.15 }) }));
    }, { margin: "0px 0px -8% 0px" });
  }

  /* ---------- count-up totals ---------- */
  function countUps() {
    inView("[data-count]", function (el) {
      var to = Number(el.getAttribute("data-count")) || 0;
      animate(0, to, {
        duration: 1.6, ease: [0.16, 1, 0.3, 1],
        onUpdate: function (v) { el.textContent = "$" + Math.round(v).toLocaleString("en-US"); },
        onComplete: function () { el.textContent = "$" + to.toLocaleString("en-US"); }
      });
    }, { amount: 0.6 });
  }

  /* ---------- daylight bars grow out from solar noon ---------- */
  function daylight() {
    inView("#daylightChart", function (chart) {
      var tw = chart.querySelectorAll(".dl-twilight");
      var sun = chart.querySelectorAll(".dl-sun");
      animate(tw, { transform: ["scaleX(0)", "scaleX(1)"], opacity: [0, 1] }, { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: M.stagger(0.06) });
      animate(sun, { transform: ["scaleX(0)", "scaleX(1)"], opacity: [0, 1] }, Object.assign({}, SPRING_SOFT, { delay: M.stagger(0.06, { startDelay: 0.25 }) }));
    }, { amount: 0.3 });
  }

  /* ---------- chapter covers: scroll-linked parallax ---------- */
  function chapters() {
    document.querySelectorAll(".chapter-cover").forEach(function (cover) {
      var img = cover.querySelector(".cover-media");
      var num = cover.querySelector(".cover-num");
      var text = cover.querySelector(".cover-text");
      if (img) scroll(animate(img, { transform: ["translateY(-7%)", "translateY(7%)"] }, { ease: "linear" }), { target: cover, offset: ["start end", "end start"] });
      if (num) scroll(animate(num, { transform: ["translateY(40%)", "translateY(-30%)"], opacity: [0, 1, 1, 0.2] }, { ease: "linear" }), { target: cover, offset: ["start end", "end start"] });
      if (text) {
        text.style.opacity = "0";
        inView(cover, function () {
          animate(text, { opacity: [0, 1], transform: ["translateY(40px)", "translateY(0px)"] }, SPRING_SOFT);
        }, { amount: 0.35 });
      }
    });
  }

  /* ---------- day rail pill: spring between days ---------- */
  var pill = document.getElementById("railPill");
  var railScroller = document.getElementById("dayrail");
  FX.railTo = function (link) {
    if (!pill || !link) return;
    pill.style.width = link.offsetWidth + "px";
    animate(pill, { transform: "translateX(" + px(link.offsetLeft) + ")" }, SPRING_UI);
    if (railScroller && railScroller.scrollWidth > railScroller.clientWidth) {
      railScroller.scrollTo({ left: link.offsetLeft - railScroller.clientWidth / 2 + link.offsetWidth / 2, behavior: "smooth" });
    }
  };

  /* ---------- countdown digits ---------- */
  /* transitions.dev "number pop-in": the new digit swings in on a drum with a little bounce */
  FX.tick = function (el) {
    animate(el, { transform: ["rotateX(-88deg)", "rotateX(0deg)"], opacity: [0.2, 1] }, { type: "spring", visualDuration: 0.42, bounce: 0.35 });
  };

  /* transitions.dev "tabs sliding": the pill follows the active map day */
  FX.pillTo = function (pill, to) {
    animate(pill, { transform: to }, SPRING_UI);
  };

  /* MotionSites menu: backdrop fades, links stagger in at 0.15s + 0.05s each */
  FX.menuIn = function (menu) {
    animate(menu.querySelector(".menu-backdrop"), { opacity: [0, 1] }, { duration: 0.25 });
    animate(menu.querySelectorAll(".menu-links a"), { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0px)"] }, Object.assign({}, SPRING_UI, { delay: M.stagger(0.05, { startDelay: 0.15 }) }));
  };
  FX.menuOut = function (menu, done) {
    animate(menu.querySelectorAll(".menu-links a"), { opacity: 0 }, { duration: 0.12 });
    animate(menu.querySelector(".menu-backdrop"), { opacity: 0 }, { duration: 0.2 }).then(function () {
      menu.querySelectorAll(".menu-links a, .menu-backdrop").forEach(function (n) { n.style.opacity = ""; n.style.transform = ""; });
      done();
    });
  };

  /* ---------- lightbox: spring from the tapped photo, slide between photos ---------- */
  FX.lbIn = function (box, wrap, origin) {
    var back = box.querySelector(".lb-backdrop");
    var chrome = box.querySelectorAll(".lb-btn, .lb-strip, figcaption");
    animate(back, { opacity: [0, 1] }, { duration: 0.3 });
    animate(chrome, { opacity: [0, 1] }, { duration: 0.35, delay: 0.12 });
    var img = wrap.querySelector("img");
    var from = origin && origin.getBoundingClientRect ? origin.getBoundingClientRect() : null;
    var run = function () {
      var to = img.getBoundingClientRect();
      if (from && to.width && from.width) {
        var dx = (from.left + from.width / 2) - (to.left + to.width / 2);
        var dy = (from.top + from.height / 2) - (to.top + to.height / 2);
        var s = Math.max(0.12, Math.min(1, from.width / to.width));
        animate(wrap, { transform: ["translate(" + px(dx) + "," + px(dy) + ") scale(" + s + ")", "translate(0px,0px) scale(1)"], opacity: [0.4, 1] }, SPRING_UI);
      } else {
        animate(wrap, { transform: ["scale(0.94)", "scale(1)"], opacity: [0, 1] }, SPRING_UI);
      }
    };
    if (img.complete && img.naturalWidth) run();
    else { wrap.style.opacity = "0"; img.addEventListener("load", run, { once: true }); setTimeout(function () { if (wrap.style.opacity === "0") run(); }, 600); }
  };
  FX.lbOut = function (box, wrap, done) {
    var back = box.querySelector(".lb-backdrop");
    var chrome = box.querySelectorAll(".lb-btn, .lb-strip, figcaption");
    animate(chrome, { opacity: 0 }, { duration: 0.15 });
    animate(wrap, { transform: "scale(0.92)", opacity: 0 }, { duration: 0.22, ease: [0.4, 0, 1, 1] });
    animate(back, { opacity: 0 }, { duration: 0.25 }).then(function () {
      wrap.style.transform = ""; wrap.style.opacity = "";
      box.querySelectorAll(".lb-btn, .lb-strip, figcaption, .lb-backdrop").forEach(function (n) { n.style.opacity = ""; });
      done();
    });
  };
  FX.slide = function (wrap, dir, swap) {
    animate(wrap, { transform: "translateX(" + (dir > 0 ? -60 : 60) + "px)", opacity: 0 }, { duration: 0.16, ease: [0.4, 0, 1, 1] }).then(function () {
      swap();
      animate(wrap, { transform: ["translateX(" + (dir > 0 ? 80 : -80) + "px)", "translateX(0px)"], opacity: [0, 1] }, SPRING_UI);
    });
  };

  /* ---------- tiles: a little spring on press ---------- */
  document.addEventListener("pointerdown", function (e) {
    var t = e.target.closest(".tile, .film, .mini-img, .book-soon-img");
    if (!t) return;
    animate(t, { transform: "scale(0.975)" }, SPRING_TIGHT);
    var up = function () { animate(t, { transform: "scale(1)" }, SPRING_UI); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  });

  /* ---------- transitions.dev "3D tilt" with a cursor glare, fine pointers only ---------- */
  function tilt() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.querySelectorAll(".stay-card, .tip-card").forEach(function (card) {
      card.classList.add("tilt");
      var glare = document.createElement("span");
      glare.className = "glare";
      glare.setAttribute("aria-hidden", "true");
      card.appendChild(glare);
      var raf = 0, last = null;
      card.addEventListener("pointermove", function (e) {
        last = e;
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          var r = card.getBoundingClientRect();
          var x = (last.clientX - r.left) / r.width - 0.5, y = (last.clientY - r.top) / r.height - 0.5;
          animate(card, { transform: "perspective(1100px) rotateX(" + (-y * 5).toFixed(2) + "deg) rotateY(" + (x * 6).toFixed(2) + "deg) translateY(-4px)" }, SPRING_TIGHT);
          animate(glare, { transform: "translate(" + (x * 50).toFixed(1) + "%, " + (y * 50).toFixed(1) + "%)", opacity: 1 }, SPRING_TIGHT);
        });
      });
      card.addEventListener("pointerleave", function () {
        animate(card, { transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)" }, SPRING_UI);
        animate(glare, { opacity: 0 }, { duration: 0.3 });
      });
    });
  }

  function start() {
    tilt();
    revealAll();
    countUps();
    daylight();
    chapters();
  }
  if (document.documentElement.classList.contains("is-ready")) start();
  else document.addEventListener("DOMContentLoaded", function () { setTimeout(start, 0); });
})();
