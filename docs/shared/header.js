// ======================================================
// Institutional Header Loader
// Safe Injection + Mobile Toggle Initialization
// + Section-Based Active Navigation Highlight
// ======================================================

fetch("shared/header.html")
  .then(response => response.text())
  .then(data => {
    const headerContainer = document.getElementById("site-header");
    if (!headerContainer) return;

    headerContainer.innerHTML = data;

    initializeNavigation();
    applyActiveNavigation();
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