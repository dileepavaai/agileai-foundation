// ======================================================
// Institutional Header Loader
// Safe Injection + Mobile Toggle Initialization
// + Section-Based Active Navigation Highlight
// + Theme Toggle Initialization
// + Layout Stabilization
// ======================================================


// Prevent duplicate initialization
if (!window.__AAF_HEADER_INITIALIZED__) {
  window.__AAF_HEADER_INITIALIZED__ = true;


// ------------------------------------------------------
// Header Loader
// ------------------------------------------------------

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

    // Inject header HTML
    headerContainer.innerHTML = data;

    // Stabilize layout after injection
    requestAnimationFrame(() => {

      initializeNavigation();
      applyActiveNavigation();
      initializeThemeToggle();

    });

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
// Active Navigation Highlight
// Supports both:
//   <body data-section="">
//   <body data-page="">
// ======================================================

function applyActiveNavigation() {

  let section = document.body.getAttribute("data-section");

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
// ======================================================

function initializeThemeToggle() {

  const toggle = document.getElementById("theme-toggle");

  if (!toggle) return;

  const storedTheme = localStorage.getItem("aaf-theme");

  if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
  }

  toggle.addEventListener("click", function () {

    const currentTheme =
      document.documentElement.getAttribute("data-theme");

    const newTheme =
      currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("aaf-theme", newTheme);

  });

}




// ======================================================
// Scroll-Based Header Styling
// ======================================================

window.addEventListener("scroll", () => {

  const header = document.getElementById("site-header");

  if (!header) return;

  if (window.scrollY > 10) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }

});


// Close initialization guard
}