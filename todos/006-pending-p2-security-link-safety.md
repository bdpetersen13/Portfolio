---
status: pending
priority: p2
issue_id: "006"
tags: [code-review, security, quick-win]
---

# Fix Link Safety: Add rel="noopener noreferrer" to External Links

## Problem Statement
External links using `target="_blank"` are missing `rel="noopener noreferrer"`. Without `rel="noopener"`, a linked page can access `window.opener` and redirect the original tab. For LinkedIn specifically the risk is low, but the pattern should be correct baseline.

## Findings
`index.html` lines 485 and 508:
```html
<a href="https://www.linkedin.com/in/bdpetersen13" target="_blank" class="...">
```
Both LinkedIn links have `target="_blank"` with no `rel` attribute.

## Proposed Solution
Add `rel="noopener noreferrer"` to every `target="_blank"` link across all HTML files.

Audit all pages for `target="_blank"` before deploying.

## Acceptance Criteria
- [ ] All `target="_blank"` anchors have `rel="noopener noreferrer"`
- [ ] Grep for `target="_blank"` returns no results without the corresponding `rel`

## Effort: Small (10 min)
