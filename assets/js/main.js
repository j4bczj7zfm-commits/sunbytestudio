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
    description:
      "Demo multipagina (Home, Servizi, Contatti) con menu mobile e layout credibile.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Multipagina", "Menu mobile", "Form contatti"],
    status: "Demo Live",
    demo: "demos/studionova/index.html",
    caseStudy: "demos/studionova/case-study.html",
  },
  {
    title: "Landing Page — Palestra (Demo)",
    description: "Landing page dimostrativa con sezioni, prezzi e modulo contatti.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["CTA", "Prezzi", "Form contatto"],
    status: "Demo Live",
    demo: "demos/gym-landing/index.html",
    caseStudy: "demos/gym-landing/case-study.html",
  },
];

/* =========================
   HELPERS
========================= */

let projectsFilter = "all"; // all | live | coming

function normalizeStatus(status) {
  return String(status || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function isLiveProject(project) {
  const s = normalizeStatus(project.status);
  return s === "live" || s === "demo live" || s === "demolive";
}

function applyProjectsFilter(list) {
  if (projectsFilter === "live") return list.filter(isLiveProject);
  if (projectsFilter === "coming") return list.filter((p) => !isLiveProject(p));
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
    .map((p, i) => {
      const isLive = isLiveProject(p);
      const eventName = `cta_projects_open_demo_${i + 1}`;

      return `
        <article class="project-card">
          <h3>${p.title}</h3>
          <p>${p.description}</p>

          <ul class="project-features">
            ${(p.features || []).slice(0, 3).map((f) => `<li>${f}</li>`).join("")}
          </ul>

          <div class="project-tags">
            ${(p.tech || []).map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>

          <div class="project-footer">
            <span class="project-status ${isLive ? "live" : "coming"}">
              ${p.status}
            </span>

            ${
              isLive
                ? `
                  <div class="project-links">
                    <a
                      class="project-link"
                      href="${p.demo}"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-umami-event="${eventName}"
                    >
                      Apri la demo
                    </a>
                  </div>
                `
                : `<span class="project-link disabled">In arrivo</span>`
            }
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
  if (year) year.textContent = new Date().getFullYear();
}

/* =========================
   BOOTSTRAP
========================= */

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initProjectsFilters();
  renderProjects();
  initYear();
});

