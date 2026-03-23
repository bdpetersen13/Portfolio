---
status: pending
priority: p2
issue_id: "009"
tags: [code-review, content, ux, quick-win]
---

# Fix Misleading and Dead CTA Buttons

## Problem Statement
Multiple calls-to-action across the site either point to the wrong destination or have dead links, undermining the user journey for recruiters.

## Findings

**1. "Coming Soon" project cards on work.html have `onclick="window.location.href='#'"`**
- `work.html` lines ~271, ~306
- Both "Coming Soon" cards (Optimizing Weight Logic, Dallas Mavericks) are fully clickable via `onclick` that navigates to `href='#'`, causing a page scroll-to-top. Non-navigable cards should not behave like links.

**2. "View Full Portfolio" contact section button links to LinkedIn**
- `index.html` Contact section: label says "View Full Portfolio," destination is `https://www.linkedin.com/in/bdpetersen13`
- LinkedIn is not a portfolio. This misleads a hiring manager who expects more work samples.

**3. Curbside CTA bottom section resume button is `<a href="#">`**
- `curbside_case_study.html` line ~1021: Dead link, scrolls to top

## Proposed Solution
1. Remove `onclick` handlers from "Coming Soon" cards entirely — cards that aren't ready shouldn't be navigable. Add a visual "Coming Soon" badge/overlay that signals they're not yet available.
2. Change the "View Full Portfolio" button label to "Connect on LinkedIn" or change `href` to `work.html`.
3. Fix the `curbside_case_study.html` CTA resume button to point to the actual PDF (see todo #002).

## Acceptance Criteria
- [ ] "Coming Soon" cards are not clickable
- [ ] "View Full Portfolio" either goes to work.html or is honestly labeled
- [ ] No `href="#"` CTAs remain anywhere except as intentional anchors

## Effort: Small (20 min)
