// ======================================================
// Institutional Footer Loader
// Canonical Shared Injection System
// ======================================================

fetch("/shared/footer.html")
  .then(response => {
    if (!response.ok) {
      throw new Error("Footer fetch failed with status " + response.status);
    }
    return response.text();
  })
  .then(data => {
    const footerContainer = document.getElementById("site-footer");
    if (!footerContainer) return;

    footerContainer.innerHTML = data;

    applyFooterEnhancements();
  })
  .catch(error => {
    console.error("Footer load failed:", error);
  });

// ======================================================
// Footer Enhancements
// ======================================================

function applyFooterEnhancements() {
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}