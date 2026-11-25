# SKILLS.md — Engineering & AI Agent Capabilities

> **Purpose:** Defines the technical standards, workflows, and verification rules any AI agent or developer must follow when building or modifying this portfolio.

---

## 1. Core Engineering Standards

- **Zero Bloat:** Static-first architecture suitable for GitHub Pages (`suatalikoch.github.io`). Prefer vanilla web standards (semantic HTML5, modern CSS with custom properties, clean TypeScript/ESModules) or a minimal static build with zero unnecessary runtime dependencies.
- **Performance Budget:**
  - Lighthouse Performance, Accessibility, Best Practices, SEO: **100 / 100 / 100 / 100** target.
  - Zero layout shift (`CLS = 0`).
  - No unoptimized images, no blocking third-party scripts, no heavy animation libraries (e.g., no GSAP/Three.js unless strictly justified and lazy-loaded).
- **Accessibility (a11y):**
  - Full keyboard navigation (`Tab`, `Enter`, `Escape`, `Cmd/Ctrl+K`).
  - Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`).
  - `prefers-reduced-motion` respected on all transitions.
  - WCAG AA contrast minimum on all text/surface pairs.

---

## 2. Component & CSS Discipline

1. **Token-Only Styling:** Never hardcode colors, spacing, or radii in components. Always reference `DESIGN.md` CSS custom properties (`var(--space-6)`, `var(--bg-secondary)`, `var(--border-hairline)`).
2. **Uniformity Check:** Before finishing any UI task, verify that all sibling cards, buttons, and sections share identical padding, margin, and alignment.
3. **Responsive Parity:** Test at `375px` (mobile), `768px` (tablet), and `1280px` (desktop).

---

## 3. Verification Checklist (Before Marking Done)

- [ ] No banned AI-slop patterns from `DESIGN.md` Section 2.
- [ ] All spacing uses `--space-*` tokens; identical elements have identical padding/margin.
- [ ] Both Light and Dark modes render cleanly with crisp `1px` hairline borders.
- [ ] Keyboard navigation and `Cmd+K` command palette work without console errors.
- [ ] Build/output works cleanly as a static GitHub Pages site.
