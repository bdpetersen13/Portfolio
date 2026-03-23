---
status: pending
priority: p1
issue_id: "004"
tags: [code-review, architecture, javascript, css]
---

# Consolidate Case Study Pages: Remove Inline CSS/JS, Use portfolio-bundle.js

## Problem Statement
`IBG_Case_Study.html` and `curbside_case_study.html` embed their own ~280 lines of inline CSS and ~250 lines of inline JavaScript instead of using the shared CSS modules and `portfolio-bundle.js`. This creates a third independent implementation of the same logic (alongside the bundle and the unused modular JS files). Magic number timing values in the inline scripts diverge from `TIMING` constants; the cursor implementation differs; and any bug fix to the bundle silently leaves the case study pages broken.

## Findings
- **Inline CSS (~280 lines each):** Cursor styles, `.section` layout, responsive typography, dot nav, light-mode overrides — duplicated verbatim across both files instead of using the 5 CSS module `<link>` tags
- **Inline JS (~250 lines each):** Section navigation, cursor, auto-hide navbar, theme toggle — all reimplemented as bare global variables with hardcoded magic numbers (`800`, `500`, `50`, `0.5`, `0.15`, `1000`, `3000`) instead of using `portfolio-bundle.js`
- **Side effects:** Inline CSS has slightly different `clamp()` values than `base.css`, so case study pages render at different sizes than index/work pages. `sessionStorage` theme key referenced inline. Global variable pollution (`currentSection`, `isAnimating`, etc.).

## Proposed Solution

**Step 1:** Replace the `<style>` block in each case study's `<head>` with the same 5 `<link>` tags used in `index.html` lines 17–21:
```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/cursor.css">
<link rel="stylesheet" href="css/navigation.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/theme.css">
```

**Step 2:** Replace each case study's inline `<script>` block with the `portfolioConfig` + bundle pattern used by `index.html` lines 517–524:
```html
<script>
  window.portfolioConfig = {
    totalSections: 10  // or 13 for curbside
  };
</script>
<script src="js/portfolio-bundle.js"></script>
```

## Acceptance Criteria
- [ ] Case study pages load and behave identically to index.html (cursor, section nav, theme, navbar)
- [ ] No `<style>` block and no inline `<script>` block in either case study file
- [ ] Section counts match: IBG = 10, Curbside = 13
- [ ] Light/dark theme works on case study pages

## Effort: Medium (1-2 hrs)
