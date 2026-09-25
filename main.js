(() => {
  const targets = document.querySelectorAll(
    ".section .kicker, .section h2, .section .lead, .agent-card, .feature, .native-item, .stat, .plugin-panel, .download-card > *, details"
  );
  if (!("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

  targets.forEach((el, i) => {
    el.classList.add("rv");
    const siblings = el.parentElement ? [...el.parentElement.children] : [];
    el.style.transitionDelay = Math.min(siblings.indexOf(el), 8) * 60 + "ms";
    io.observe(el);
  });
})();
