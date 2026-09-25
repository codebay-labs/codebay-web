(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("stuck", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const car = document.querySelector("[data-car]");
  if (car) {
    const slides = [...car.querySelectorAll(".slide")];
    const tabs = [...car.querySelectorAll(".dots button")];
    let i = 0;
    let timer = 0;

    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("on", k === i));
      tabs.forEach((t, k) => t.setAttribute("aria-selected", String(k === i)));
    };
    // Once the visitor steers it by hand, the page stops steering for them.
    const stop = () => { clearInterval(timer); timer = 0; };
    const start = () => { if (!reduced && !timer) timer = setInterval(() => show(i + 1), 6000); };

    tabs.forEach((t) => t.addEventListener("click", () => { stop(); show(+t.dataset.go); }));
    car.querySelector("[data-prev]").addEventListener("click", () => { stop(); show(i - 1); });
    car.querySelector("[data-next]").addEventListener("click", () => { stop(); show(i + 1); });
    car.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { stop(); show(i - 1); }
      if (e.key === "ArrowRight") { stop(); show(i + 1); }
    });
    car.addEventListener("pointerenter", stop);
    car.addEventListener("pointerleave", start);
    car.addEventListener("focusin", stop);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    show(0);
    start();
  }

  if (reduced || !("IntersectionObserver" in window)) return;

  const targets = document.querySelectorAll(
    ".label, h1, h2, .sub, .cta, .note, .car, .agents, .json, .feat article, .body, .quote, .spec, .stats, .faqs details, .more"
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
