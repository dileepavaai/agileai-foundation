/* =========================================================
   AGILE AI FOUNDATION
   Institutional Theme Controller — v1.1 (Frozen)
   Navigation Stabilized for Versioned Structure
   3–5 Year Safe Implementation
   ========================================================= */

(function () {

  const STORAGE_KEY = "agileai-theme";
  const root = document.documentElement;

  /* =========================================================
     THEME LOGIC
     ========================================================= */

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme"); // system
    }
  }

  function initializeTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "light" || saved === "dark") {
      applyTheme(saved);
    } else {
      applyTheme("system");
    }
  }

  window.setAgileAITheme = function (theme) {
    if (theme === "system") {
      localStorage.removeItem(STORAGE_KEY);
      applyTheme("system");
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
      applyTheme(theme);
    }
  };

  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        applyTheme("system");
      }
    });

  initializeTheme();

  /* =========================================================
     SHARED HEADER INJECTION
     ========================================================= */

  function injectHeader() {

    const container = document.getElementById("site-header");

    if (!container) {
      initializeHeaderBehavior();
      return;
    }

    fetch("/shared/header.html")
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
        initializeHeaderBehavior();
      })
      .catch(() => {
        console.warn("Shared header failed to load.");
        initializeHeaderBehavior();
      });
  }

  /* =========================================================
     HEADER BEHAVIOR
     ========================================================= */

  function initializeHeaderBehavior() {

    const wrapper = document.getElementById("site-header");
    if (!wrapper) return;

    /* -----------------------------------------
       Scroll Shadow
       ----------------------------------------- */

    function handleScroll() {
      if (window.scrollY > 1) {
        wrapper.classList.add("is-scrolled");
      } else {
        wrapper.classList.remove("is-scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    /* -----------------------------------------
       Active Navigation Highlight
       Version-Aware & Future-Safe
       ----------------------------------------- */

    const page = document.body.dataset.page;
    if (!page) return;

    const navLinks = wrapper.querySelectorAll(".site-nav a");

    navLinks.forEach(link => {

      const href = link.getAttribute("href");

      if (
        (page === "elements" && href === "/index.html") ||
        (page === "guide" && href.startsWith("/guide/")) ||
        (page === "governance" && href === "/governance.html")
      ) {
        link.classList.add("is-active");
      }

    });
  }

  /* =========================================================
     EXECUTION
     ========================================================= */

  injectHeader();

})();