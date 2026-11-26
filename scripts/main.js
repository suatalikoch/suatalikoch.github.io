let PINNED = [];
let SHOWCASE = [];
let ACTIVE_TAB = "pinned";
let PROJECTS = [];

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

function highlightCode(raw) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc(raw).replace(
    /(\/\/[^\n]*|#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:const|let|var|function|return|import|from|export|async|await|if|else|for|while|class|def|try|catch|SELECT|FROM|WHERE|CREATE|TABLE|INSERT|INTO|VALUES)\b|\b\d+(?:\.\d+)?\b)/g,
    (m) => {
      if (m.startsWith("//") || m.startsWith("#")) return `<span class="tok-comment">${m}</span>`;
      if (m.startsWith('"') || m.startsWith("'")) return `<span class="tok-string">${m}</span>`;
      if (/^\d/.test(m)) return `<span class="tok-number">${m}</span>`;
      return `<span class="tok-keyword">${m}</span>`;
    }
  );
}

function renderMarkdown(md, repoName, owner = "suatalikoch") {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const resolveUrl = (url) => {
    if (/^https?:\/\//i.test(url)) return url;
    const clean = url.replace(/^\.?\//, "");
    return `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repoName)}/HEAD/${clean}`;
  };
  const inline = (s) =>
    esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => `<img src="${resolveUrl(url)}" alt="${alt}" loading="lazy" />`)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let inCode = false;
  let codeBuf = "";
  let inList = false;
  let inTable = false;

  const parseRow = (row) =>
    row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith("```")) {
      if (inList) { html += "</ul>"; inList = false; }
      if (inTable) { html += "</tbody></table>"; inTable = false; }
      if (inCode) {
        html += `<div class="code-block"><button class="code-copy" type="button">Copy</button><pre><code>${highlightCode(codeBuf.trimEnd())}</code></pre></div>`;
        codeBuf = "";
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf += line + "\n";
      continue;
    }
    if (/^\|.+\|$/.test(line.trim())) {
      if (inList) { html += "</ul>"; inList = false; }
      const next = lines[i + 1]?.trim() || "";
      if (!inTable && /^\|[\s|:-]+\|$/.test(next)) {
        const headers = parseRow(line);
        html += `<table><thead><tr>${headers.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>`;
        inTable = true;
        i++; // skip separator row
        continue;
      }
      if (inTable) {
        const cells = parseRow(line);
        html += `<tr>${cells.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`;
        continue;
      }
    } else if (inTable) {
      html += "</tbody></table>";
      inTable = false;
    }
    if (/^###\s+/.test(line)) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h3>${inline(line.replace(/^###\s+/, ""))}</h3>`;
    } else if (/^##\s+/.test(line)) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`;
    } else if (/^#\s+/.test(line)) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h1>${inline(line.replace(/^#\s+/, ""))}</h1>`;
    } else if (/^[-*]\s+/.test(line.trim())) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${inline(line.trim().replace(/^[-*]\s+/, ""))}</li>`;
    } else if (/^---+$/.test(line.trim())) {
      if (inList) { html += "</ul>"; inList = false; }
      html += "<hr />";
    } else if (line.trim() === "") {
      if (inList) { html += "</ul>"; inList = false; }
    } else {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<p>${inline(line)}</p>`;
    }
  }
  if (inList) html += "</ul>";
  if (inTable) html += "</tbody></table>";
  if (inCode) html += "</code></pre>";
  return html;
}

export async function openCaseStudy(index) {
  const p = PROJECTS[index];
  if (!p) return;
  const owner = p.owner || "suatalikoch";
  const readmeEl = document.getElementById("case-readme");
  document.getElementById("case-meta").textContent = (p.language || "CODE").toUpperCase();
  document.getElementById("case-title").textContent = p.name;
  readmeEl.textContent = "Loading README.md...";
  document.getElementById("case-outcome").innerHTML = p.url
    ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent);">View repository on GitHub →</a>`
    : "";
  caseModal.setAttribute("data-open", "true");

  try {
    const res = await fetch(`https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(p.name)}/HEAD/README.md`);
    if (!res.ok) throw new Error("Not found");
    const text = await res.text();
    readmeEl.innerHTML = text.trim() ? renderMarkdown(text.trim(), p.name, owner) : `<p>${p.description || "No README.md found."}</p>`;
    readmeEl.querySelectorAll(".code-copy").forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.nextElementSibling?.textContent || "";
        navigator.clipboard?.writeText(code);
        btn.textContent = "Copied";
        setTimeout(() => { btn.textContent = "Copy"; }, 1500);
      });
    });
  } catch {
    readmeEl.innerHTML = `<p>${p.description || "No README.md available for this repository."}</p>`;
  }
}

export function closeCaseStudy() {
  caseModal.setAttribute("data-open", "false");
}

function renderProjects(projects) {
  const grid = document.getElementById("project-grid");
  if (!grid || !projects.length) return;
  grid.innerHTML = "";
  projects.forEach((p, idx) => {
    const btn = document.createElement("button");
    btn.className = "card card-interactive";
    btn.type = "button";
    btn.dataset.project = String(idx);
    btn.innerHTML = `
      <div class="card-top">
        <div class="card-meta">${(p.language || "CODE").toUpperCase()}</div>
        <h3 class="card-title">${p.name}</h3>
        <p class="card-desc">${p.description || "Pinned repository on GitHub."}</p>
      </div>
      <div class="tag-list">
        <span class="tag">${p.language || "Code"}</span>
        <span class="tag">GitHub</span>
      </div>
    `;
    btn.addEventListener("click", () => openCaseStudy(idx));
    grid.appendChild(btn);
  });
  requestAnimationFrame(() => initTagMarquee());
window.addEventListener("resize", () => requestAnimationFrame(initTagMarquee));
}

function initTagMarquee() {
  document.querySelectorAll(".tag-list").forEach((list) => {
    if (list.querySelector(".tag-track")) return;
    const items = Array.from(list.children);
    if (!items.length) return;

    // Marquee whenever tags wrap to a second row
    const wraps = items[items.length - 1].offsetTop > items[0].offsetTop + 4;
    if (!wraps) return;

    list.classList.add("is-marquee");
    const track = document.createElement("div");
    track.className = "tag-track";
    items.forEach((el) => track.appendChild(el));
    items.forEach((el) => {
      const clone = el.cloneNode(true);
      clone.classList.add("tag-clone");
      track.appendChild(clone);
    });
    list.appendChild(track);
    const distance = track.scrollWidth / 2;
    track.style.animationDuration = `${Math.max(distance / 40, 4).toFixed(2)}s`;
  });
}

requestAnimationFrame(() => initTagMarquee());
window.addEventListener("resize", () => requestAnimationFrame(initTagMarquee));

async function loadProjects() {
  try {
    const [pinRes, showRes] = await Promise.all([
      fetch("./projects.json", { cache: "no-cache" }),
      fetch("./showcase.json", { cache: "no-cache" })
    ]);
    if (pinRes.ok) PINNED = await pinRes.json();
    if (showRes.ok) SHOWCASE = await showRes.json();
    PROJECTS = ACTIVE_TAB === "showcase" ? SHOWCASE : PINNED;
    renderProjects(PROJECTS);
  } catch {
    // Keep static fallback cards if offline
  }
}

document.querySelectorAll(".seg-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    ACTIVE_TAB = btn.dataset.tab;
    document.querySelectorAll(".seg-btn").forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
    PROJECTS = ACTIVE_TAB === "showcase" ? SHOWCASE : PINNED;
    renderProjects(PROJECTS);
  });
});

loadProjects();

caseClose.addEventListener("click", closeCaseStudy);
caseModal.addEventListener("click", (e) => {
  if (e.target === caseModal) closeCaseStudy();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCaseStudy();
});

// Subtle scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".section").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});
