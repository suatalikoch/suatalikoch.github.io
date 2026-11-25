# DESIGN.md — Design System & Visual Philosophy

> **Core Principle:** Apple-inspired industrial precision. Restraint, clarity, mathematical consistency, and zero decorative noise. Every pixel, padding, and margin is governed by a strict token system.

---

## 1. Design Philosophy

1. **Clarity & Restraint:** Content and engineering craft are the hero. No gratuitous gradients, no glowing neon borders, no floating 3D blobs, no stock-card clutter.
2. **Mathematical Consistency:** Every identical element MUST share identical padding, margin, border-radius, and typographic scale. No ad-hoc `13px` or `19px` overrides.
3. **Tactile & Purposeful Motion:** Transitions must feel like physical hardware—crisp, immediate, and damped (`cubic-bezier(0.22, 1, 0.36, 1)`), never sluggish or floaty.
4. **Typographic Hierarchy:** Contrast is achieved through weight, tracking, and scale—not by throwing colors at text.

---

## 2. Anti-Slop Manifesto (Strictly Banned)

Any AI or contributor touching this codebase MUST NOT use:
- **Banned Colors:** Purple-to-pink/cyan "AI gradients", neon glows, `#6366f1` / `#8b5cf6` default SaaS indigo, or rainbow badges.
- **Banned Layouts:** Generic 3-column "Features" cards with centered icons, "About Me" with a circular avatar + generic bio, or fake terminal windows that just print `whoami`.
- **Banned Copy:** "Passionate developer", "Crafting digital experiences", "Turning coffee into code", "Let's build something amazing together", or emoji bullet points.
- **Banned Motion:** Slow `1s+` fade-ins, bounce/elastic easings, continuous floating/bobbing animations, or scroll-jacking.

---

## 3. Color System (Semantic Tokens)

High-contrast, neutral, Apple-like surface hierarchy. Light mode default with first-class Dark mode support.

### Light Mode
- `--bg-primary`: `#FFFFFF` (Canvas)
- `--bg-secondary`: `#F5F5F7` (Grouped / Bento surface)
- `--bg-tertiary`: `#EBEBF0` (Hover / Active surface)
- `--text-primary`: `#1D1D1F` (Headings, primary copy)
- `--text-secondary`: `#6E6E73` (Metadata, captions, secondary copy)
- `--text-tertiary`: `#86868B` (Disabled, subtle labels)
- `--border-hairline`: `rgba(0, 0, 0, 0.08)` (1px structural dividers)
- `--accent`: `#0071E3` (Interactive links, primary focus)

### Dark Mode
- `--bg-primary`: `#000000` (True OLED black canvas)
- `--bg-secondary`: `#111113` (Elevated surface)
- `--bg-tertiary`: `#1C1C1E` (Hover / Active surface)
- `--text-primary`: `#F5F5F7` (Headings, primary copy)
- `--text-secondary`: `#A1A1A6` (Metadata, captions)
- `--text-tertiary`: `#6E6E73` (Subtle labels)
- `--border-hairline`: `rgba(255, 255, 255, 0.12)` (1px structural dividers)
- `--accent`: `#2997FF` (Interactive links, primary focus)

---

## 4. Spacing & Grid System (8pt / 4pt Base)

**Rule:** Identical elements MUST use the exact same spacing token. Never mix arbitrary values.

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--space-1` | `4px` | Tight inline gaps (icon-to-label) |
| `--space-2` | `8px` | Compact element gaps, badge padding-y |
| `--space-3` | `12px` | Small list item gaps, input padding |
| `--space-4` | `16px` | Standard element-to-element gap |
| `--space-6` | `24px` | **Standard Card / Module internal padding** |
| `--space-8` | `32px` | Grid gap between major bento/project cards |
| `--space-12` | `48px` | Subsection vertical separation |
| `--space-16` | `64px` | Section vertical padding (mobile) |
| `--space-24` | `96px` | Section vertical padding (desktop) |

### Container & Grid
- **Max Container Width:** `1120px` (centered, `padding-inline: 24px` on mobile, `32px` on desktop).
- **Bento / Project Grid:** CSS Grid with uniform `gap: var(--space-8)` (`32px`) or `var(--space-6)` (`24px`)—never mixed within the same grid.
- **Border Radius:**
  - `--radius-sm`: `8px` (buttons, inputs, tags)
  - `--radius-md`: `14px` (nested cards, code blocks)
  - `--radius-lg`: `20px` (top-level bento/project cards)

---

## 5. Typography

- **Primary Sans:** `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif`
- **Monospace (Code / Metrics / Shortcuts):** `"SF Mono", "JetBrains Mono", ui-monospace, monospace`
- **Scale:**
  - Display: `clamp(2.5rem, 5vw, 4rem)` | `line-height: 1.05` | `letter-spacing: -0.03em` | `font-weight: 600`
  - H2 (Section): `clamp(1.75rem, 3vw, 2.25rem)` | `line-height: 1.15` | `letter-spacing: -0.02em` | `font-weight: 600`
  - H3 (Card Title): `1.25rem` (`20px`) | `line-height: 1.25` | `letter-spacing: -0.015em` | `font-weight: 600`
  - Body: `1rem` (`16px`) | `line-height: 1.5` | `font-weight: 400`
  - Caption / Meta: `0.8125rem` (`13px`) | `line-height: 1.4` | `font-weight: 500`

---

## 6. Interactive & Motion Standards

- **Duration:** `150ms` for micro-interactions (hover, focus), `250ms` for layout/modal transitions.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (fast start, smooth settle).
- **Keyboard First:** Global `Cmd+K` / `Ctrl+K` command palette for instant navigation, theme toggle, and copying contact info.
