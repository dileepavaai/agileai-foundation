document.querySelectorAll(".section-anchor").forEach(anchor => {

  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const url = window.location.origin + window.location.pathname + this.getAttribute("href");

    navigator.clipboard.writeText(url);

    this.textContent = "✓";

    setTimeout(() => {
      this.textContent = "¶";
    }, 1200);

  });

});