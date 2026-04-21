# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Site

No build step required. Open any HTML file directly in a browser, or serve locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Architecture

This is a vanilla HTML/CSS/JS portfolio with no framework or bundler.

### Pages and Section Counts

Each page uses full-page section-snap navigation. The section count must match the number of `.section` divs in the HTML:

| Page | Sections |
|------|----------|
| `index.html` | 6 |
| `work.html` | 5 |
| `IBG_Case_Study.html` | 8 |
| `curbside_case_study.html` | 11 |

### JavaScript

**`js/portfolio-bundle.js`** is the single source of truth for all JavaScript behavior. It is loaded by every HTML page and is the only JS file that runs at runtime.

**`js/constants.js`** is a human-readable reference for all configuration constants. It is not loaded by any page — all constants are duplicated at the top of `portfolio-bundle.js`. When changing a constant value, update it in `portfolio-bundle.js` (and optionally `constants.js` for documentation purposes).

### Initialization Pattern

Each HTML page sets `window.portfolioConfig` before loading the bundle:

```html
<script>
    window.portfolioConfig = {
        totalSections: 6,
        enableGreeting: true  // only on index.html
    };
</script>
<script src="js/portfolio-bundle.js"></script>
```

The bundle auto-initializes on `DOMContentLoaded` using this config.

### CSS Modules

All five CSS files are linked in every page's `<head>`:

- `base.css` — Typography, resets, fluid sizing via `clamp()`
- `cursor.css` — Custom cursor element (`#custom-cursor`)
- `navigation.css` — `.section` full-page snap, `.dot` nav, touch zones
- `components.css` — `.glass-card`, `.skill-tag`, `.status-badge`, etc.
- `theme.css` — `body.light-mode` overrides for dark-default styles

### Key Configuration

All behavior constants (timing, cursor physics, breakpoints) live in `js/constants.js` and are duplicated at the top of `portfolio-bundle.js`. Theme preference is stored in `localStorage` under the key `'theme'`.

### Global API

`window.sectionNav` is set to the `SectionNavigation` instance, enabling inline `onclick="goToSection(N)"` calls in HTML. `toggleTheme()` is also global.

### Adding a New Page

1. Copy the CSS `<link>` block from an existing page (all 5 files)
2. Set `window.portfolioConfig` with the correct `totalSections`
3. Load `js/portfolio-bundle.js`
4. Structure content as `<div class="section" id="section-N">` divs
5. Add dot nav: `<div class="dot" onclick="goToSection(N)"></div>`
