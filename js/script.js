/* ==========================================================
   Harinisri Ramesh — Portfolio
   Vanilla JS: nav behaviour, scroll reveal, waveform generation,
   vital scroll-progress line, back-to-top.
========================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Sticky header shadow ---------------- */
  var header = document.getElementById("siteHeader");
  function onScrollHeader() {
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  navToggle.addEventListener("click", function () {
    var isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- Active nav link on scroll ---------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("active", match);
      if (match) link.style.color = "var(--blue)";
      else link.style.color = "";
    });
  }
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------- Back to top ---------------- */
  var backToTop = document.getElementById("backToTop");
  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ==========================================================
     WAVEFORM GENERATION
     Builds a biological-signal-like path: a resting baseline
     punctuated by periodic pulses (ECG-esque) or smooth breathing
     curves (respiration-esque), depending on context.
  ========================================================== */
  function buildEcgPath(width, height, mid, beats, amp) {
    var d = "M0," + mid;
    var segment = width / beats;
    for (var i = 0; i < beats; i++) {
      var x0 = i * segment;
      d += " L" + (x0 + segment * 0.32) + "," + mid;
      d += " L" + (x0 + segment * 0.40) + "," + (mid + amp * 0.18);
      d += " L" + (x0 + segment * 0.46) + "," + (mid - amp);
      d += " L" + (x0 + segment * 0.52) + "," + (mid + amp * 0.6);
      d += " L" + (x0 + segment * 0.60) + "," + mid;
      d += " L" + (x0 + segment * 0.78) + "," + (mid - amp * 0.25);
      d += " L" + (x0 + segment) + "," + mid;
    }
    d += " L" + width + "," + mid;
    return d;
  }

  function buildRespPath(width, height, mid, cycles, amp) {
    var d = "M0," + mid;
    var seg = width / cycles;
    for (var i = 0; i < cycles; i++) {
      var x0 = i * seg;
      var cx1 = x0 + seg * 0.25;
      var cx2 = x0 + seg * 0.75;
      d += " C" + cx1 + "," + (mid - amp) + " " + cx2 + "," + (mid - amp) + " " + (x0 + seg) + "," + mid;
      cx1 = x0 + seg + seg * 0.25;
      cx2 = x0 + seg + seg * 0.75;
    }
    return d;
  }

  function buildTracePath(width, height, mid, points, amp) {
    var d = "M0," + mid;
    var seg = width / points;
    var prevY = mid;
    for (var i = 1; i <= points; i++) {
      var x = i * seg;
      var y = mid + (Math.sin(i * 1.7) * amp * 0.6) + (Math.sin(i * 0.6) * amp * 0.4);
      var cx = x - seg / 2;
      d += " Q" + cx + "," + prevY + " " + x + "," + y;
      prevY = y;
    }
    return d;
  }

  /* Hero waveform: gentle continuous ECG-like trace */
  var heroPath = document.getElementById("heroWavePath");
  if (heroPath) {
    heroPath.setAttribute("d", buildEcgPath(1200, 300, 150, 6, 70));
  }

  /* Section dividers */
  document.querySelectorAll(".section-divider").forEach(function (div) {
    var path = div.querySelector("path");
    var type = div.getAttribute("data-wave");
    var d;
    if (type === "ecg") d = buildEcgPath(1200, 60, 30, 8, 16);
    else if (type === "trace") d = buildTracePath(1200, 60, 30, 24, 14);
    else d = buildRespPath(1200, 60, 30, 5, 12);
    if (path) path.setAttribute("d", d);
  });

  /* Vital scroll-progress bar: a live "pulse" line whose visible
     extent grows with scroll depth, echoing a monitor readout. */
  var vitalPath = document.getElementById("vitalPath");
  var vitalFullD = buildEcgPath(1000, 40, 20, 14, 15);
  if (vitalPath) {
    vitalPath.setAttribute("d", vitalFullD);
    var len = vitalPath.getTotalLength();
    vitalPath.style.strokeDasharray = len;
    vitalPath.style.strokeDashoffset = len;

    function updateVital() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      vitalPath.style.strokeDashoffset = len * (1 - pct);
    }
    updateVital();
    window.addEventListener("scroll", updateVital, { passive: true });
    window.addEventListener("resize", updateVital);
  }

  /* Subtle hero waveform ambient drift (skipped if reduced motion) */
  if (!reduceMotion && heroPath) {
    var t = 0;
    function drift() {
      t += 0.002;
      var offset = Math.sin(t) * 6;
      heroPath.style.transform = "translateY(" + offset + "px)";
      requestAnimationFrame(drift);
    }
    requestAnimationFrame(drift);
  }
})();
