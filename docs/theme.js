/* =========================================================
   AGILE AI FOUNDATION
   Institutional Theme Controller — v1.2 (Stabilized)
   Navigation Stabilized for Versioned Structure
   Deterministic Theme Control (Single Source of Truth)
   ========================================================= */

(function () {

  const STORAGE_KEY = "agileai-theme";
  const root = document.documentElement;

  /* =========================================================
     THEME LOGIC (Deterministic & Stable)
     ========================================================= */

  function detectSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    }
  }

  function initializeTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "light" || saved === "dark") {
      applyTheme(saved);
    } else {
      // System mode — explicitly set detected theme
      applyTheme(detectSystemTheme());
    }
  }

  window.setAgileAITheme = function (theme) {
    if (theme === "system") {
      localStorage.removeItem(STORAGE_KEY);
      applyTheme(detectSystemTheme());
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
      applyTheme(theme);
    }
  };

  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        applyTheme(detectSystemTheme());
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