// ======================================================
// Institutional Header Loader
// Safe Injection + Mobile Toggle Initialization
// + Section-Based Active Navigation Highlight
// + Theme Toggle Initialization
// + Layout Stabilization
// + GA4 PDF Download Tracking
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
      initializePDFTracking();

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
// GA4 PDF Download Tracking
// ======================================================

function initializePDFTracking() {

  document.addEventListener("click", function(event) {

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

// ======================================================
// Google Analytics Loader
// ======================================================

function initializeAnalytics() {

  if (window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-B7RTGWC99E";

  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  window.gtag = function(){dataLayer.push(arguments);};

  gtag('js', new Date());
  gtag('config', 'G-B7RTGWC99E');

}
// Close initialization guard
}

// ======================================================
// Specification Section Scroll Tracking
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