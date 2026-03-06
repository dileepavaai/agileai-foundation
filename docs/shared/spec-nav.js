/* =========================================================
   Specification Navigation Controller
   Scope: Standards / Specification Pages Only
   Governance: Additive, Non-Invasive
   Features:
   - Auto-generate TOC if empty
   - Scroll spy highlight
   - Mobile expand / collapse
   - Auto-scroll TOC to active section
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const toc = document.querySelector(".spec-toc");
  const content = document.querySelector(".spec-content");

  if (!toc || !content) return;

  let tocList = toc.querySelector("ul");

  /* ---------------------------------------------------------
     Auto-Generate TOC (only if empty)
     --------------------------------------------------------- */

  if (!tocList || tocList.children.length === 0) {

    tocList = document.createElement("ul");

    const headings = content.querySelectorAll("h2[id], h3[id]");

    headings.forEach(heading => {

      const li = document.createElement("li");
      const link = document.createElement("a");

      link.href = "#" + heading.id;
      link.textContent = heading.textContent;

      li.appendChild(link);

      if (heading.tagName === "H3") {
        li.style.paddingLeft = "1rem";
      }

      tocList.appendChild(li);

    });

    toc.appendChild(tocList);
  }

  const tocLinks = toc.querySelectorAll("a[href^='#']");
  const sections = [];

  /* ---------------------------------------------------------
     Map TOC links to sections
     --------------------------------------------------------- */

  tocLinks.forEach(link => {

    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);

    if (section) {
      sections.push({ id, section, link });
    }

  });

  /* ---------------------------------------------------------
     Scroll Spy — Highlight Active Section
     --------------------------------------------------------- */

  let currentActive = null;

  function updateActiveSection() {

    let newActive = null;

    sections.forEach(({ id, section }) => {

      const rect = section.getBoundingClientRect();

      if (rect.top <= 120 && rect.bottom > 120) {
        newActive = id;
      }

    });

    if (newActive === currentActive) return;

    currentActive = newActive;

    tocLinks.forEach(link => {

      const target = link.getAttribute("href");

      if (target === "#" + currentActive) {

        link.classList.add("toc-active");

        link.scrollIntoView({
          block: "nearest"
        });

      } else {

        link.classList.remove("toc-active");

      }

    });

  }

  window.addEventListener("scroll", updateActiveSection, { passive: true });

  updateActiveSection();

  /* ---------------------------------------------------------
     Mobile Expand / Collapse
     --------------------------------------------------------- */

  function isMobile() {
    return window.innerWidth < 1024;
  }

  tocLinks.forEach(link => {

    link.addEventListener("click", function () {

      if (!isMobile()) return;

      const parentLi = link.parentElement;
      if (!parentLi) return;

      toc.querySelectorAll("li.toc-open").forEach(li => {
        if (li !== parentLi) li.classList.remove("toc-open");
      });

      parentLi.classList.toggle("toc-open");

    });

  });

});