/* =========================================================
   Specification Navigation Controller
   Scope: Standards / Specification Pages Only
   Governance: Additive, Non-Invasive
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const toc = document.querySelector(".spec-toc");
  if (!toc) return; // Safe exit for non-spec pages

  const tocLinks = toc.querySelectorAll("a[href^='#']");
  const sections = [];

  /* ---------------------------------------------------------
     Map TOC links to real sections
     --------------------------------------------------------- */

  tocLinks.forEach(link => {

    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);

    if (section) {
      sections.push({
        id: id,
        section: section,
        link: link
      });
    }

  });

  /* ---------------------------------------------------------
     Scroll Spy — Highlight Active Section
     --------------------------------------------------------- */

  function updateActiveSection() {

    let currentId = null;

    sections.forEach(({ id, section }) => {

      const rect = section.getBoundingClientRect();

      if (rect.top <= 140 && rect.bottom > 140) {
        currentId = id;
      }

    });

    tocLinks.forEach(link => {

      const target = link.getAttribute("href");

      if (target === `#${currentId}`) {
        link.classList.add("toc-active");
      } else {
        link.classList.remove("toc-active");
      }

    });

  }

  window.addEventListener("scroll", updateActiveSection, { passive: true });

  updateActiveSection();


  /* ---------------------------------------------------------
     Mobile Collapse / Expand (≤1023px)
     --------------------------------------------------------- */

  function isMobile() {
    return window.innerWidth < 1024;
  }

  tocLinks.forEach(link => {

    link.addEventListener("click", function () {

      if (!isMobile()) return;

      const parentLi = link.parentElement;
      if (!parentLi) return;

      /* Close other open sections */

      toc.querySelectorAll("li.toc-open").forEach(li => {
        if (li !== parentLi) li.classList.remove("toc-open");
      });

      parentLi.classList.toggle("toc-open");

    });

  });

});