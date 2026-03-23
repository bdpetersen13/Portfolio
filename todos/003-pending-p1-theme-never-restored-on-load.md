---
status: pending
priority: p1
issue_id: "003"
tags: [code-review, bug, javascript]
---

# Fix: Theme Preference Is Never Restored on Page Load (Silent JS Bug)

## Problem Statement
`ThemeManager.init()` registers a `DOMContentLoaded` listener, but `initPortfolio()` is only called *after* `DOMContentLoaded` has already fired. The listener registers and immediately becomes a no-op — `loadTheme()` is never called. Every visitor always sees dark mode on load, regardless of their saved preference.

## Findings
`portfolio-bundle.js` lines 324–329:
```javascript
init() {
  window.addEventListener('DOMContentLoaded', () => {
    this.loadTheme();  // Never fires — DOMContentLoaded already fired
  });
  window.toggleTheme = () => this.toggle();
}
```

`initPortfolio()` is only triggered at lines 499–509, which runs inside its own `DOMContentLoaded` handler. By the time `ThemeManager` is constructed and `init()` runs, the DOM is already ready — the event has fired and will never fire again.

**Secondary issue:** Theme is stored in `sessionStorage`, not `localStorage` (lines 350, 354, 359). This means the preference resets when a user closes the tab or opens a link in a new tab. CLAUDE.md incorrectly documents this as `localStorage`.

## Proposed Solution
In `portfolio-bundle.js` line 325, replace the event listener with a direct call:
```javascript
init() {
  this.loadTheme();  // DOM is already ready — call directly
  window.toggleTheme = () => this.toggle();
}
```

Also change `sessionStorage` → `localStorage` on lines 350, 354, and 359, and update `CLAUDE.md` line 66 to correctly document `localStorage`.

## Acceptance Criteria
- [ ] Setting light mode, closing the tab, and reopening shows light mode
- [ ] Opening a case study link in a new tab preserves the theme
- [ ] Verified: `ThemeManager` calls `loadTheme()` synchronously on init
- [ ] CLAUDE.md updated to correctly say `localStorage`

## Effort: Small (10 min)
