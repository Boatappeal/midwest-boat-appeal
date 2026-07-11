/* =========================================================
   Midwest Boat Appeal — scroll-driven motion
========================================================= */
(function () {
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Hero dropdowns ---- */
  const heroDDs = $$(".hero-dd");
  function closeAllDDs(except) {
    heroDDs.forEach((dd) => {
      if (dd === except) return;
      const b = dd.querySelector(".hero-dd-btn");
      const p = dd.querySelector(".hero-dd-panel");
      b.setAttribute("aria-expanded", "false");
      if (p) p.hidden = true;
    });
  }
  heroDDs.forEach((dd) => {
    const btn = dd.querySelector(".hero-dd-btn");
    const panel = dd.querySelector(".hero-dd-panel");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      closeAllDDs(dd);
      if (isOpen) {
        btn.setAttribute("aria-expanded", "false");
        panel.hidden = true;
      } else {
        btn.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
    // Stop clicks inside the panel from closing it
    panel?.addEventListener("click", (e) => e.stopPropagation());
  });
  // Click outside closes all
  document.addEventListener("click", () => closeAllDDs(null));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAllDDs(null); });

  /* ---- Boat-for-sale gallery (thumbs + prev/next + keyboard) ---- */
  const mainImg = $("#listingMain");
  const thumbs  = $$(".listing-thumbs .thumb");
  const counter = $("#listingCounter");
  let activeIdx = 0;
  function setActive(i) {
    if (!thumbs.length || !mainImg) return;
    activeIdx = (i + thumbs.length) % thumbs.length;
    const src = thumbs[activeIdx].getAttribute("data-src");
    mainImg.style.opacity = "0";
    const tmp = new Image();
    tmp.onload = () => { mainImg.src = src; mainImg.style.opacity = "1"; };
    tmp.src = src;
    thumbs.forEach((b, idx) => b.classList.toggle("is-active", idx === activeIdx));
    if (counter) counter.textContent = `${activeIdx + 1} / ${thumbs.length}`;
  }
  thumbs.forEach((btn, idx) => btn.addEventListener("click", () => setActive(idx)));
  $("#listingPrev")?.addEventListener("click", () => setActive(activeIdx - 1));
  $("#listingNext")?.addEventListener("click", () => setActive(activeIdx + 1));
  // arrow-key nav when the gallery is in view
  document.addEventListener("keydown", (e) => {
    const main = document.querySelector(".listing-main");
    if (!main) return;
    const r = main.getBoundingClientRect();
    const inView = r.bottom > 0 && r.top < window.innerHeight;
    if (!inView) return;
    if (e.key === "ArrowLeft")  setActive(activeIdx - 1);
    if (e.key === "ArrowRight") setActive(activeIdx + 1);
  });

  /* ---- Sticky nav style on scroll ---- */
  const nav = $("#nav");
  const onScroll = () => {
    nav.classList.toggle("is-stuck", window.scrollY > 24);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on intersect ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  $$(".reveal, .timeline li").forEach((el) => io.observe(el));

  /* ---- Craft section parallax on the photo ---- */
  const craftMedia = document.querySelector(".craft-media img");
  const craftSection = document.querySelector(".craft");
  function updateCraft() {
    if (!craftMedia || !craftSection) return;
    const r = craftSection.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = (vh - r.top) / (r.height + vh); // 0..1 ish
    const clamped = Math.max(-0.3, Math.min(1.3, p));
    const shift = (clamped - 0.5) * 80; // px
    craftMedia.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(1.08)`;
  }

  /* ---- Restoration sequence ---- */
  const restoreSection = $(".restore");
  const restoreStage   = $("#restoreStage");
  const restoreFill    = $("#restoreFill");
  const restoreSteps   = $$(".restore-steps li");

  const restoreArt = restoreSection?.querySelector(".restore-art");
  function updateRestore() {
    if (!restoreSection || !restoreStage || !restoreArt) return;
    const vh = window.innerHeight;

    // Anchor on the photo itself, not the whole section, so the stages line
    // up with where the viewer is actually looking. Compute the photo's
    // vertical center relative to the viewport, then map it from
    //   p = 0 when the photo is just entering (center ~= 85% of vh)
    //   p = 1 when the photo is near the top of the viewport (center ~= 25% of vh)
    const pr = restoreArt.getBoundingClientRect();
    const center = pr.top + pr.height / 2;
    const startY = vh * 0.85;
    const endY   = vh * 0.25;
    let p = (startY - center) / (startY - endY);
    p = Math.max(0, Math.min(1, p));

    let step = 1;
    if (p >= 0.70)      step = 3;
    else if (p >= 0.40) step = 2;

    restoreStage.setAttribute("data-step", step);
    if (restoreFill) restoreFill.style.setProperty("--p", `${(p * 100).toFixed(1)}%`);
    restoreSteps.forEach((li, i) => li.classList.toggle("active", i + 1 === step));
  }

  /* ---- Hero photo parallax (subtle, cinematic) ---- */
  const heroBg = document.querySelector(".hero-bg");
  function updateHero() {
    if (!heroBg) return;
    const y = window.scrollY;
    if (y > window.innerHeight) return; // stop work once past hero
    const shift = y * 0.22; // slower than scroll for parallax
    const scale = 1.04 + Math.min(0.04, y / window.innerHeight * 0.04);
    heroBg.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
  }

  /* ---- rAF loop, run only while in view ---- */
  let ticking = false;
  function onAny() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateCraft();
      updateRestore();
      updateHero();
      ticking = false;
    });
  }
  document.addEventListener("scroll", onAny, { passive: true });
  window.addEventListener("resize", onAny);
  onAny();
})();
