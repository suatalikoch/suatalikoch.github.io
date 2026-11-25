import { toggleTheme, copyEmail, openCaseStudy } from "./main.js";

const COMMANDS = [
  { label: "Jump to Selected Work", hint: "Section", action: () => (location.hash = "#work") },
  { label: "Jump to Engineering Principles", hint: "Section", action: () => (location.hash = "#principles") },
  { label: "Open Case Study: Browser State Sync", hint: "Project", action: () => openCaseStudy(0) },
  { label: "Open Case Study: Build Time Profiler", hint: "Project", action: () => openCaseStudy(1) },
  { label: "Toggle Light / Dark Theme", hint: "Theme", action: () => toggleTheme() },
  { label: "Copy Email Address", hint: "Action", action: () => copyEmail() },
  { label: "Open GitHub Profile", hint: "External", action: () => window.open("https://github.com/suatalikoch", "_blank", "noopener") }
];

const modal = document.getElementById("cmd-modal");
const trigger = document.getElementById("cmd-trigger");
const input = document.getElementById("cmd-input");
const list = document.getElementById("cmd-list");

let filtered = [...COMMANDS];
let activeIndex = 0;

function render() {
  list.innerHTML = "";
  filtered.forEach((cmd, idx) => {
    const li = document.createElement("li");
    li.className = "cmd-item";
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", String(idx === activeIndex));
    li.innerHTML = `<span>${cmd.label}</span><span class="kbd">${cmd.hint}</span>`;
    li.addEventListener("click", () => execute(idx));
    list.appendChild(li);
  });
}

function execute(idx) {
  const cmd = filtered[idx];
  if (!cmd) return;
  closePalette();
  cmd.action();
}

function openPalette() {
  modal.setAttribute("data-open", "true");
  input.value = "";
  filtered = [...COMMANDS];
  activeIndex = 0;
  render();
  input.focus();
}

function closePalette() {
  modal.setAttribute("data-open", "false");
}

trigger.addEventListener("click", openPalette);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closePalette();
});

input.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();
  filtered = COMMANDS.filter((c) => c.label.toLowerCase().includes(q));
  activeIndex = 0;
  render();
});

document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    const isOpen = modal.getAttribute("data-open") === "true";
    isOpen ? closePalette() : openPalette();
    return;
  }

  if (modal.getAttribute("data-open") !== "true") return;

  if (e.key === "Escape") {
    closePalette();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex = (activeIndex + 1) % Math.max(filtered.length, 1);
    render();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex = (activeIndex - 1 + filtered.length) % Math.max(filtered.length, 1);
    render();
  } else if (e.key === "Enter") {
    e.preventDefault();
    execute(activeIndex);
  }
});
