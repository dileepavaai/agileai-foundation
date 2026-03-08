// ======================================================
// Agile AI Foundation — Institutional Header System
// Version: v1.11
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
// 8. Track concept progression automatically
// 9. Measure section engagement time
// 10. Apply scroll-based header styling
//
// UX Enhancements (v1.11)
// ------------------------------------------------------
// • Premium mobile navigation behaviour
// • Background scroll lock when menu open
// • Auto-close navigation on link click
// • ESC key support for accessibility
// • ARIA state consistency
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
// ======================================================

if (!window.__AAF_HEADER_INITIALIZED__) {

window.__AAF_HEADER_INITIALIZED__ = true;


// ======================================================
// Header Loader
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

headerContainer.innerHTML = data;

requestAnimationFrame(() => {

initializeAnalytics();
initializeNavigation();
applyActiveNavigation();
initializeThemeToggle();
initializePDFTracking();
initializeConceptTracking();
initializeSectionTracking();

});

})

.catch(error => {
console.error("Header load failed:", error);
});



// ======================================================
// Mobile Navigation Toggle
// Premium UX + Accessibility
// ======================================================

function initializeNavigation() {

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (!toggle || !nav) return;

/* ------------------------------------------------------
   Toggle navigation
------------------------------------------------------ */

toggle.addEventListener("click", function () {

const isOpen = nav.classList.toggle("open");

toggle.classList.toggle("active");

toggle.setAttribute("aria-expanded", isOpen);

/* Lock background scroll (premium UX) */

document.body.classList.toggle("menu-open", isOpen);

/* Accessibility */

if (isOpen) {
nav.querySelector("a")?.focus();
}

});


/* ------------------------------------------------------
   Close menu when link clicked
------------------------------------------------------ */

nav.querySelectorAll("a").forEach(link => {

link.addEventListener("click", () => {

nav.classList.remove("open");
toggle.classList.remove("active");
toggle.setAttribute("aria-expanded", false);

document.body.classList.remove("menu-open");

});

});


/* ------------------------------------------------------
   ESC key closes menu
   (WCAG accessibility improvement)
------------------------------------------------------ */

document.addEventListener("keydown", function (event) {

if (event.key === "Escape") {

nav.classList.remove("open");
toggle.classList.remove("active");
toggle.setAttribute("aria-expanded", false);

document.body.classList.remove("menu-open");

toggle.focus();

}

});

}



// ======================================================
// Active Navigation Highlight
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
// Theme Toggle
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
// Google Analytics Loader
// ======================================================

function initializeAnalytics() {

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
// Concept Progression Tracking
// ======================================================

function initializeConceptTracking() {

if (typeof gtag !== "function") return;

const path = window.location.pathname.toLowerCase();

let conceptLayer = null;

if (path.includes("/definition")) {
conceptLayer = "definition";
}

else if (path.includes("/guide")) {
conceptLayer = "guide";
}

else if (path.includes("/standards")) {
conceptLayer = "standards";
}

else if (path.includes("/governance")) {
conceptLayer = "governance";
}

if (!conceptLayer) return;

gtag("event", "concept_layer_view", {
concept_layer: conceptLayer,
page_path: path
});

}



// ======================================================
// PDF Download Tracking
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
// Specification Section Tracking + Engagement Time
// ======================================================

function initializeSectionTracking() {

const sections = document.querySelectorAll("section[id]");

if (!sections.length) return;

let activeSection = null;
let sectionStartTime = null;

const observer = new IntersectionObserver((entries) => {

entries.forEach(entry => {

if (entry.isIntersecting) {

const newSection = entry.target.id;

/* Send engagement time */

if (activeSection && sectionStartTime && typeof gtag === "function") {

const duration = Math.round(
(Date.now() - sectionStartTime) / 1000
);

gtag("event", "spec_section_engagement", {
section: activeSection,
duration_seconds: duration,
page: window.location.pathname
});

}

/* Start new section */

activeSection = newSection;
sectionStartTime = Date.now();

/* Track view */

if (typeof gtag === "function") {

gtag("event", "spec_section_view", {
section: newSection,
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
// ======================================================

window.addEventListener("scroll", () => {

const header = document.getElementById("site-header");

if (!header) return;

if (window.scrollY > 10) {
header.classList.add("is-scrolled");
}
else {
header.classList.remove("is-scrolled");
}

});


// ======================================================
// End Initialization Guard
// ======================================================

}