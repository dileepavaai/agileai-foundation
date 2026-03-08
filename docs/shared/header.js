// ======================================================
// Agile AI Foundation — Institutional Header System
// ======================================================
//
// Responsibilities
// ------------------------------------------------------
// 1. Load shared header HTML
// 2. Initialize navigation behavior
// 3. Apply active navigation highlighting
// 4. Initialize theme toggle
// 5. Load Google Analytics (centralized)
// 6. Track PDF downloads
// 7. Track specification section reading
// 8. Apply scroll-based header styling
//
// Design Principles
// ------------------------------------------------------
// • Deterministic initialization order
// • No duplicate initialization
// • Centralized analytics loading
// • Non-invasive behavior tracking
// • Governance-safe architecture
// ======================================================


// ======================================================
// Initialization Guard
// Prevent duplicate execution if header loads twice
// ======================================================

if (!window.__AAF_HEADER_INITIALIZED__) {

  window.__AAF_HEADER_INITIALIZED__ = true;


// ======================================================
// Header Loader
// Inject shared header HTML into every page
// ======================================================

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

    // Inject header markup
    headerContainer.innerHTML = data;

    // Stabilize layout and initialize system
    requestAnimationFrame(() => {

      // Order matters
      initializeAnalytics();
      initializeNavigation();
      applyActiveNavigation();
      initializeThemeToggle();
      initializePDFTracking();
      initializeSectionTracking();

    });

  })

  .catch(error => {
    console.error("Header load failed:", error);
  });




// ======================================================
// Mobile Navigation Toggle
// Handles hamburger navigation on mobile devices
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
// Controls light / dark theme switching
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
// Google Analytics Loader (Centralized)
// Loads GA4 once for the entire site
// ======================================================

function initializeAnalytics() {

  // Prevent duplicate GA initialization
  if (window.gtag) return;

  const script = document.createElement("script");

  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=G-B7RTGWC99E";

  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  window.gtag = function () {
    dataLayer.push(arguments);
  };

  gtag("js", new Date());

  gtag("config", "G-B7RTGWC99E");

}




// ======================================================
// PDF Download Tracking
// Tracks downloads of standards and guide PDFs
// ======================================================

function initializePDFTracking() {

  document.addEventListener("click", function (event) {

    const link = event.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (!href) return;

    if (href.toLowerCase().endsWith(".pdf")) {

      if (typeof gtag === "function") {

        gtag("event", "pdf_download", {
          file_name: href.split("/").pop(),
          file_path: href
        });

      }

    }

  });

}




// ======================================================
// Specification Section Tracking
// Tracks which sections of a specification are viewed
// ======================================================

function initializeSectionTracking() {

  const sections = document.querySelectorAll("section[id]");

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const sectionId = entry.target.id;

        if (typeof gtag === "function") {

          gtag("event", "spec_section_view", {
            section: sectionId,
            page: window.location.pathname
          });

        }

      }

    });

  }, {
    threshold: 0.6
  });

  sections.forEach(section => observer.observe(section));

}




// ======================================================
// Scroll-Based Header Styling
// Adds subtle styling when page scrolls
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


// ======================================================
// End Initialization Guard
// ======================================================

}