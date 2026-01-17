async function injectFragment(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) {
      el.innerHTML = `<!-- Could not load ${url} -->`;
      return;
    }
    el.innerHTML = await res.text();
  }
  
  function initDropdowns(scope = document) {
    scope.querySelectorAll("[data-dropdown]").forEach((dd) => {
      const btn = dd.querySelector("button");
      const menu = dd.querySelector(".menu");
      if (!btn || !menu) return;
  
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = dd.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  
    document.addEventListener("click", () => {
      document.querySelectorAll("[data-dropdown].open").forEach((dd) => {
        dd.classList.remove("open");
        const btn = dd.querySelector("button");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    });
  }
  
  function initMobileNav(scope = document) {
    const burger = scope.querySelector("[data-burger]");
    const mobile = scope.querySelector("[data-mobile-nav]");
    if (!burger || !mobile) return;
  
    burger.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  
  (async function boot() {
    await injectFragment("#site-header", "header.html");
    await injectFragment("#site-footer", "footer.html");
  
    // Nach dem Inject initialisieren (wichtig!)
    initDropdowns(document);
    initMobileNav(document);
  })();
  