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
    const clickedInside = menu.contains(event.target);
    const clickedToggle = toggle.contains(event.target);
    if (!clickedInside && !clickedToggle) closeMenu();
  });
}

function initYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initYear();
});