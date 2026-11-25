# ARCHITECTURE.md — Site Structure & Technical Plan

> **Overview:** Architecture for `suatalikoch.github.io`—a fast, static, keyboard-first programmer portfolio.

---

## 1. Information Architecture (Out-of-the-Box, Zero Fluff)

1. **Top Bar (Minimal):**
   - Name / Monogram (`suatalikoch`), live local status/timezone, Theme Toggle (Light/Dark), and `Cmd+K` trigger pill.
2. **Hero (Editorial & Direct):**
   - Concise positioning statement (what you build, your engineering focus).
   - Direct action links (Selected Work, GitHub, Email/Copy).
3. **Selected Work (Interactive Bento / Case Study Grid):**
   - Uniformly padded cards (`--space-6`) with `1px` hairline borders.
   - Each project shows: Title, 1-line technical summary, architecture/stack tags, and interactive detail view (problem -> architecture -> outcome).
4. **Engineering Principles / Craft:**
   - Tight, scannable 2x2 or 3-column grid with identical card dimensions and padding.
5. **Command Palette (`Cmd+K` / `Ctrl+K`):**
   - Instant jump to sections, open projects, toggle theme, copy email, open GitHub/LinkedIn.
6. **Footer:**
   - Clean, single-row colophon with copyright, source link, and keyboard hint.

---

## 2. Planned Directory Structure

```text
suatalikoch.github.io/
├── AGENTS.md           # Persistent AI instructions & anti-slop rules
├── DESIGN.md           # Apple-inspired design tokens, spacing, typography
├── SKILLS.md           # Engineering standards & verification checklist
├── ARCHITECTURE.md     # Site structure & technical plan
├── README.md           # Project overview & local dev instructions
├── index.html          # Semantic entry point
├── styles/
│   ├── tokens.css      # CSS custom properties (colors, spacing, radii, type)
│   └── main.css        # Layout, components, responsive rules
├── scripts/
│   ├── main.js         # Theme, interactions, progressive enhancement
│   └── command.js      # Cmd+K command palette
└── assets/             # Optimized media, icons, favicon
```
