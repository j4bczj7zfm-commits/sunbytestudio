/* =========================
   DATA
========================= */

const projects = [
  {
    title: "SunByte Studio — Portfolio",
    description: "Sito portfolio personale con layout responsive e menu mobile.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Dark / Light mode", "Griglia progetti dinamica", "Menu mobile"],
    status: "Live",
    demo: "index.html",
  },
  {
  title: "Sito vetrina multipagina — StudioNova (Demo)",
  description: "Demo multipagina (Home, Servizi, Contatti) con menu mobile e layout credibile.",
  tech: ["HTML", "CSS", "JavaScript"],
  features: ["Multipagina", "Menu mobile", "Form contatti"],
  status: "DemoLive",
  demo: "demos/studionova/index.html",
  caseStudy: "demos/studionova/case-study.html"
},
  {
  title: "Landing Page — Palestra (Demo)",
  description: "Landing page dimostrativa con sezioni, prezzi e modulo contatti.",
  tech: ["HTML", "CSS", "JavaScript"],
  features: ["CTA", "Prezzi", "Form contatto"],
  status: "DemoLive",
  demo: "demos/gym-landing/index.html",
  caseStudy: "demos/gym-landing/case-study.html"
},
];

/* =========================
   HELPERS
========================= */

let projectsFilter = "all"; // all | live | coming

function applyProjectsFilter(list) {
  if (projectsFilter === "live") {
    return list.filter(p => p.status === "Live" || p.status === "Demo Live");
  }
  if (projectsFilter === "coming") {
    return list.filter(p => p.status !== "Live" && p.status !== "Demo Live");
  }
  return list;
}

/* =========================
   RENDER
========================= */

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const filtered = applyProjectsFilter(projects);

  grid.innerHTML = filtered
    .map(p => {
      const isLive = p.status === "Live";

      return `
        <article class="project-card">
          <h3>${p.title}</h3>
          <p>${p.description}</p>

          <ul class="project-features">
            ${(p.features || []).slice(0, 3).map(f => `<li>${f}</li>`).join("")}
          </ul>

          <div class="project-tags">
            ${p.tech.map(t => `<span class="tag">${t}</span>`).join("")}
          </div>

          <div class="project-footer">
            <span class="project-status ${isLive ? "live" : "coming"}">
              ${p.status}
            </span>

            ${
              isLive
                ? `
                  <div class="project-links">
                    ${
                      p.demo && p.demo !== "#"
                        ? `<a class="project-link" href="${p.demo}" target="_blank" rel="noopener noreferrer">Apri demo</a>`
                        : `<span class="project-link disabled">Demo non disponibile</span>`
                    } 
                    ${
                      p.caseStudy
                       ? `<a class="project-link" href="${p.caseStudy}" target="_blank" rel="noopener noreferrer">Approfondisci</a>`
                       : ""
                    }
                  </div>
                `
                : `<span class="project-link disabled">In arrivo</span>`
            }}
          </div>
        </article>
      `;
    })
    .join("");
}

/* =========================
   MODULE INIT
========================= */

function initProjectsFilters() {
  const controls = document.getElementById("projectsControls");
  if (!controls) return;

  controls.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-filter]");
    if (!btn) return;

    projectsFilter = btn.dataset.filter;

    controls.querySelectorAll(".filter-btn").forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-pressed", String(isActive));
    });

    renderProjects();
  });
}

function initTheme() {
  const toggle = document.getElementById("themeToggle");

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    setTheme(saved);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }
}

function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mainMenu");

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") closeMenu();
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedToggle = toggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) closeMenu();
  });
}

function initYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

/* =========================
   BOOTSTRAP
========================= */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMenu();
  initProjectsFilters();
  renderProjects();
  initYear();
});