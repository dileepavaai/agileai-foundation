document.addEventListener("DOMContentLoaded", function () {

  // Inject header HTML
  fetch("shared/header.html")
    .then(response => response.text())
    .then(data => {
      const headerContainer = document.getElementById("site-header");
      if (headerContainer) {
        headerContainer.innerHTML = data;
        initializeNavigation();
      }
    })
    .catch(error => {
      console.error("Header load failed:", error);
    });

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

});