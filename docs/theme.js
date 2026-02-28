/* =========================================================
   AGILE AI UNIVERSITY
   Institutional Theme Controller — v1.0
   Extended for Agile AI Foundation Navigation Authority
   Stable 3–5 Year Architecture
   ========================================================= */

(function () {

  const STORAGE_KEY = "agileai-theme";
  const root = document.documentElement;

  /* =========================================================
     THEME LOGIC (UNCHANGED CORE)
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

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
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
     SHARED HEADER INJECTION (FOUNDATION)
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

    const header = document.querySelector(".site-header");
    if (!header) return;

    /* -----------------------------------------
       Scroll Shadow (activates after 1px)
       ----------------------------------------- */

    function handleScroll() {
      if (window.scrollY > 1) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    /* -----------------------------------------
       Active Navigation Highlight
       ----------------------------------------- */

    const page = document.body.dataset.page;
    if (!page) return;

    const navLinks = document.querySelectorAll(".site-nav a");

    navLinks.forEach(link => {

      const href = link.getAttribute("href");

      if (
        (page === "elements" && href === "/index.html") ||
        (page === "guide" && href === "/guide/index.html") ||
        (page === "governance" && href === "/governance/index.html")
      ) {
        link.classList.add("is-active");
      }

    });
  }

  /* =========================================================
     EXECUTE HEADER LOGIC
     ========================================================= */

  injectHeader();

})();