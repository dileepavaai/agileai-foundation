/* =========================================================
Specification Navigation Behavior
Shared Script for Standards Documents
Safe Activation: Runs only when .spec-toc exists
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

const toc = document.querySelector(".spec-toc");
if (!toc) return;

/* -----------------------------------------------
Scroll Spy (Active Section Highlight)
----------------------------------------------- */

const sections = document.querySelectorAll("section h2, section h3");
const navLinks = toc.querySelectorAll("a");

window.addEventListener("scroll", () => {

```
let current = "";

sections.forEach(section => {

  const sectionTop = section.offsetTop - 120;

  if (window.pageYOffset >= sectionTop) {
    current = section.getAttribute("id");
  }

});

navLinks.forEach(link => {

  link.classList.remove("toc-active");

  if (link.getAttribute("href") === "#" + current) {
    link.classList.add("toc-active");
  }

});
```

});

/* -----------------------------------------------
Mobile TOC Collapse
----------------------------------------------- */

if (window.innerWidth < 1024) {

```
const parent = toc.querySelector("li > ul");

if (parent) {

  const parentItem = parent.parentElement;

  parentItem.querySelector("a").addEventListener("click", function (e) {

    e.preventDefault();
    parentItem.classList.toggle("toc-open");

  });

}
```

}

});
