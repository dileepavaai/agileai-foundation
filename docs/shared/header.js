// ======================================================
// Institutional Header Loader
// Safe Injection + Mobile Toggle Initialization
// + Section-Based Active Navigation Highlight
// + Theme Toggle Initialization
// ======================================================

// Always load from site root (prevents subdirectory breakage)
fetch("/shared/header.html")
  .then(response => {
    if (!response.ok) {
      throw new Error("Header fetch failed with status " + response.status);
    }
    return response.text();
  })
  .then(data => {
    const headerContainer = document.getElementById("site-header");
    if (!headerContainer) return;

    headerContainer.innerHTML = data;

    initializeNavigation();
    applyActiveNavigation();
    initializeThemeToggle();   // NEW
  })
  .catch(error => {
    console.error("Header load failed:", error);
  });


// ======================================================
// Mobile Navigation Toggle
// ======================================================

function initializeNavigation() {

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {

    const isOpen = nav.classList.toggle("open");

    toggle.classList.toggle("active");
    toggle.setAttribute("aria-expanded", isOpen);

  });

}


// ======================================================
// Active Navigation Highlight (Dual-Mode Compatible)
// Supports both:
//   <body data-section="...">
//   <body data-page="...">
// ======================================================

function applyActiveNavigation() {

  let section = document.body.getAttribute("data-section");

  // Fallback to legacy model
  if (!section) {
    section = document.body.getAttribute("data-page");
  }

  if (!section) return;

  const activeLink = document.querySelector(`[data-nav="${section}"]`);
  if (!activeLink) return;

  activeLink.classList.add("nav-active");

}


// ======================================================
// Theme Toggle Initialization
// Works with existing CSS token system
// ======================================================

function initializeThemeToggle() {

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const storedTheme = localStorage.getItem("aaf-theme");

  // Apply stored theme on load
  if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
  }

  toggle.addEventListener("click", function () {

    const currentTheme = document.documentElement.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("aaf-theme", newTheme);

  });

}