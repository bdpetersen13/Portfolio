---
status: pending
priority: p2
issue_id: "012"
tags: [code-review, performance, security]
---

# Replace Tailwind CDN with Local Compiled Build

## Problem Statement
All four pages load Tailwind via its Play CDN (`https://cdn.tailwindcss.com`). This CDN build is explicitly documented by Tailwind as not intended for production — it ships a full JS runtime (~350KB uncompressed), scans the DOM to generate CSS at runtime, and is render-blocking. On a slow mobile connection, this can cause 300–700ms of blank-page before any content paints. It also has no Subresource Integrity hash and introduces an external CDN dependency.

## Findings
`index.html` line 9, `work.html` line 9, `IBG_Case_Study.html` line 7, `curbside_case_study.html` line 7:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

All four pages. No `defer`. No `integrity` attribute.

## Proposed Solution
1. Install Tailwind CLI: `npm install -D tailwindcss` (or use the standalone CLI binary — no Node project needed)
2. Create `tailwind.config.js` with `content: ["./**/*.html"]`
3. Create an input CSS file (or use `css/base.css` as input)
4. Run: `npx tailwindcss -i css/base.css -o css/tailwind.min.css --minify`
5. Replace the CDN `<script>` tag on all 4 pages with:
   ```html
   <link rel="stylesheet" href="css/tailwind.min.css">
   ```

The purged output for this site's actual class usage will be under 10KB.

Document the build command in `CLAUDE.md` under "Common Commands."

## Acceptance Criteria
- [ ] No CDN `<script src="https://cdn.tailwindcss.com">` on any page
- [ ] All Tailwind utility classes still render correctly after purge
- [ ] `css/tailwind.min.css` is committed and under 20KB
- [ ] Build command is documented in `CLAUDE.md`

## Effort: Medium (1–2 hrs)
