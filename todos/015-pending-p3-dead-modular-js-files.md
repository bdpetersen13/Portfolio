---
status: pending
priority: p3
issue_id: "015"
tags: [code-review, architecture, javascript]
---

# Delete or Quarantine Unused Modular JS Files

## Problem Statement
The `js/` directory contains six ES6 module files (`cursor.js`, `navigation.js`, `theme.js`, `navbar.js`, `greeting.js`, `main.js`, `constants.js`) that are not loaded by any HTML page and have already begun diverging from `portfolio-bundle.js`. They are a maintenance trap: any developer (or AI agent) reading them will treat them as authoritative, make changes that never reach the live site, and be confused by contradictions with the bundle.

## Findings
- `js/navigation.js` line 61 wraps `initNavLinks()` in a `DOMContentLoaded` listener; the bundle does not
- `js/constants.js` exports `BREAKPOINTS` — this constant doesn't exist in the bundle at all
- `js/main.js` doesn't assign `window.goToSection` but the bundle does
- `js/navigation.js` line 209 sets `window.goToSection` before `SectionNavigation` is instantiated; the bundle sets it correctly inside `initPortfolio()`
- `js/constants.js` line 21 references `brandon_website.html` — a stale filename from before the rename to `index.html`

CLAUDE.md currently instructs to maintain both in sync — a contract that has already failed.

## Proposed Solution
Delete `js/cursor.js`, `js/navigation.js`, `js/theme.js`, `js/navbar.js`, `js/greeting.js`, `js/main.js`.

Keep `js/constants.js` only if you want a human-readable reference for all constants — but update CLAUDE.md to clearly note it is a reference document, not loaded by any page. Fix the stale `brandon_website.html` comment on line 21.

Update `CLAUDE.md` to remove the "update both bundle and modular files" instruction and replace with: "`portfolio-bundle.js` is the single source of truth for all JavaScript behavior."

## Acceptance Criteria
- [ ] Unused modular JS files are deleted (or moved to a clearly marked `js/reference/` directory)
- [ ] CLAUDE.md no longer instructs dual-maintenance
- [ ] `js/constants.js` stale filename comment is fixed if the file is kept

## Effort: Small (15 min)
