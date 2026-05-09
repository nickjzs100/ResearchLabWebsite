const body = document.body;
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuButton = document.querySelector("[data-menu-button]");
const navLinks = [...document.querySelectorAll(".main-nav a")];

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("is-open", !isOpen);
  body.classList.toggle("nav-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    body.classList.remove("nav-open");
  });
});

const researchTabs = [...document.querySelectorAll("[data-research-tab]")];
const researchPanels = [...document.querySelectorAll("[data-research-panel]")];

researchTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.researchTab;

    researchTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    researchPanels.forEach((panel) => {
      panel.hidden = panel.dataset.researchPanel !== target;
    });
  });
});

const projectFilters = [...document.querySelectorAll("[data-project-filter]")];
const projectCards = [...document.querySelectorAll("[data-project-card]")];
const projectCount = document.querySelector("[data-project-count]");

function filterProjects(filter) {
  let visible = 0;

  projectCards.forEach((card) => {
    const tags = card.dataset.tags.split(" ");
    const shouldShow = filter === "all" || tags.includes(filter);
    card.classList.toggle("is-hidden", !shouldShow);
    if (shouldShow) visible += 1;
  });

  if (projectCount) {
    projectCount.textContent = String(visible);
  }
}

projectFilters.forEach((button) => {
  button.addEventListener("click", () => {
    projectFilters.forEach((item) => item.classList.toggle("is-active", item === button));
    filterProjects(button.dataset.projectFilter);
  });
});

const publicationFilters = [...document.querySelectorAll("[data-publication-filter]")];
const publicationCards = [...document.querySelectorAll("[data-publication-card]")];

publicationFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.publicationFilter;

    publicationFilters.forEach((item) => item.classList.toggle("is-active", item === button));
    publicationCards.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

const newsFilters = [...document.querySelectorAll("[data-news-filter]")];
const newsItems = [...document.querySelectorAll("[data-news-item]")];

newsFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.newsFilter;

    newsFilters.forEach((item) => item.classList.toggle("is-active", item === button));
    newsItems.forEach((item) => {
      const tags = item.dataset.tags.split(" ");
      item.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

const copyButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("zsjiang@sfsu.edu");
    copyStatus.textContent = "Email copied.";
  } catch {
    copyStatus.textContent = "Email: zsjiang@sfsu.edu";
  }
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: [0.08, 0.18, 0.32],
  },
);

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});
