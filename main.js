(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("stuck", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (reduced || !("IntersectionObserver" in window)) return;

  const targets = document.querySelectorAll(
    ".label, h1, h2, .sub, .cta, .note, .shot, .agents, .json, .feat article, .body, .quote, .spec, .stats, .faqs details, .more"
  );
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.15 });

  targets.forEach((el) => {
    el.classList.add("rv");
    const kids = el.parentElement ? [...el.parentElement.children] : [];
    el.style.transitionDelay = Math.min(Math.max(kids.indexOf(el), 0), 6) * 80 + "ms";
    io.observe(el);
  });
})();
