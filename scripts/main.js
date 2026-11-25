const PROJECTS = [
  {
    meta: "TYPESCRIPT / NEXT.JS",
    title: "studies",
    problem: "Students need a single place to track deadlines, manage notes, and monitor study progress.",
    arch: "Built with Next.js and Supabase for real-time data sync and secure authentication.",
    outcome: "Full-stack student hub with deadline tracking, note management, and progress monitoring.",
    url: "https://github.com/suatalikoch/studies"
  },
  {
    meta: "JAVASCRIPT / VANILLA",
    title: "client-server",
    problem: "Understanding authentication and request handling without relying on heavy web frameworks.",
    arch: "Custom client-server architecture for user registration and authentication in plain JavaScript.",
    outcome: "Clean, framework-free reference implementation of auth flows.",
    url: "https://github.com/suatalikoch/client-server"
  },
  {
    meta: "PYTHON / PYQT6",
    title: "VSCodeClone",
    problem: "Building a desktop code editor with modern syntax highlighting and familiar ergonomics.",
    arch: "Python desktop shell powered by PyQt6 embedding the Monaco Editor.",
    outcome: "Lightweight, VS Code-inspired desktop editor.",
    url: "https://github.com/suatalikoch/VSCodeClone"
  },
  {
    meta: "C# / .NET",
    title: "RentACar",
    problem: "Managing vehicle inventory, bookings, and customer records for a rental workflow.",
    arch: "Structured C# application built as an IT Career project.",
    outcome: "Complete rental management system.",
    url: "https://github.com/suatalikoch/RentACar"
  },
  {
    meta: "C# / .NET",
    title: "SportShop",
    problem: "Storefront and inventory management for sporting goods.",
    arch: "C# application with structured data models and catalog management.",
    outcome: "Clean e-commerce and inventory workflow.",
    url: "https://github.com/suatalikoch/SportShop"
  },
  {
    meta: "C# / .NET",
    title: "BarRenting",
    problem: "Scheduling and managing bar equipment and venue rentals.",
    arch: "C# application handling rental bookings and availability.",
    outcome: "Reliable booking and inventory tracking.",
    url: "https://github.com/suatalikoch/BarRenting"
  }
];

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");

export function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeLabel.textContent = theme === "dark" ? "Light" : "Dark";
}

export function toggleTheme() {
  const current = root.getAttribute("data-theme") || "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", toggleTheme);

// Copy Email
const copyBtn = document.getElementById("copy-email");
export function copyEmail() {
  navigator.clipboard?.writeText("suat.alikoch@gmail.com");
  const original = copyBtn.textContent;
  copyBtn.textContent = "Copied";
  setTimeout(() => {
    copyBtn.textContent = original;
  }, 1500);
}
copyBtn.addEventListener("click", copyEmail);

// Case Study Modal
const caseModal = document.getElementById("case-modal");
const caseClose = document.getElementById("case-close");

export function openCaseStudy(index) {
  const p = PROJECTS[index];
  if (!p) return;
  document.getElementById("case-meta").textContent = p.meta;
  document.getElementById("case-title").textContent = p.title;
  document.getElementById("case-problem").textContent = p.problem;
  document.getElementById("case-arch").textContent = p.arch;
  document.getElementById("case-outcome").textContent = p.outcome;
  caseModal.setAttribute("data-open", "true");
}

export function closeCaseStudy() {
  caseModal.setAttribute("data-open", "false");
}

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", () => openCaseStudy(Number(card.dataset.project)));
});

caseClose.addEventListener("click", closeCaseStudy);
caseModal.addEventListener("click", (e) => {
  if (e.target === caseModal) closeCaseStudy();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCaseStudy();
});
