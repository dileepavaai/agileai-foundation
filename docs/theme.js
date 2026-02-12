/* =========================================================
   AGILE AI UNIVERSITY
   Institutional Theme Controller — v1.0
   Shared Across Public Surfaces
   ========================================================= */

(function () {

  const STORAGE_KEY = "agileai-theme";
  const root = document.documentElement;

  /**
   * Apply explicit theme
   */
  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme"); // system
    }
  }

  /**
   * Resolve system preference
   */
  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  /**
   * Initialize theme on load
   */
  function initializeTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "light" || saved === "dark") {
      applyTheme(saved);
    } else {
      // system mode
      applyTheme("system");
    }
  }

  /**
   * Public API — used by toggle links
   */
  window.setAgileAITheme = function (theme) {
    if (theme === "system") {
      localStorage.removeItem(STORAGE_KEY);
      applyTheme("system");
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
      applyTheme(theme);
    }
  };

  /**
   * React to system changes if in system mode
   */
  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        applyTheme("system");
      }
    });

  // Run immediately
  initializeTheme();

})();
