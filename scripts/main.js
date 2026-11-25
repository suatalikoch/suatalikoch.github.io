const PROJECTS = [
  {
    meta: "2026 / WEB",
    title: "Browser State Sync",
    problem: "Large state updates on the main thread were causing noticeable UI stutter.",
    arch: "Moved state diffing into a WebWorker and sent only small patches back to the page.",
    outcome: "Cut main-thread work by 84% with no extra libraries."
  },
  {
    meta: "2026 / CLI",
    title: "Build Time Profiler",
    problem: "It was hard to see which step in a monorepo build was slowing down CI.",
    arch: "Wrote a small Rust CLI that reads compiler trace files and prints a breakdown in the terminal.",
    outcome: "Found and removed redundant build steps, cutting total CI time by 42%."
  },
  {
    meta: "2025 / UI",
    title: "Fast Data Table",
    problem: "Standard HTML tables froze when rendering and filtering 100,000+ rows.",
    arch: "Built a virtualized table that only renders visible rows and supports full keyboard navigation.",
    outcome: "Smooth 60fps scrolling and instant keyboard navigation across 150k rows."
  },
  {
    meta: "2025 / BACKEND",
    title: "Edge Cache Proxy",
    problem: "Origin servers spiked in latency whenever caches expired at the same time.",
    arch: "Built a Go HTTP proxy that serves stale responses while refreshing the cache in the background.",
    outcome: "Lowered p99 response time from 310ms to 18ms under heavy load."
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
  navigator.clipboard?.writeText("hello@suatalikoch.com");
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
