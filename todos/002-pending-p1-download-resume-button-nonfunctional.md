---
status: pending
priority: p3
issue_id: "002"
tags: [code-review, ux]
---

# Connect Resume Button Before Publishing

## Context
The "Download Resume" button is intentionally unconnected. The site is still in development and the resume is being updated. This will be wired up as part of the publishing checklist — not a bug, a known future task.

## What to Do Before Publishing
1. Finalize and export resume as PDF (e.g., `assets/brandon-petersen-resume.pdf`)
2. Replace the `<button>` on all 4 pages with an `<a>` tag:
```html
<a href="assets/brandon-petersen-resume.pdf" download="Brandon_Petersen_Resume.pdf" class="...existing classes...">
  Download Resume
</a>
```
3. Fix the `<a href="#">` CTA version in `curbside_case_study.html` line ~1021 to match

## Files
- `index.html` line ~65
- `work.html` line ~65
- `IBG_Case_Study.html` line ~333
- `curbside_case_study.html` lines ~350 and ~1021

## Effort: Small (15 min once PDF is ready)
