---
status: pending
priority: p2
issue_id: "007"
tags: [code-review, navigation, ux]
---

# Fix Broken Cross-Page Navigation Links

## Problem Statement
Multiple navigation links across the site silently go to the wrong destination. A recruiter navigating from a case study to "About" or "Contact" on the homepage will land on the hero section instead of the intended section. One CTA sends users to LinkedIn when it's labeled "View Full Portfolio."

## Findings

**1. `#about` and `#contact` hash links go nowhere**
- `work.html` lines 44, 46; `IBG_Case_Study.html` lines 311, 313; `curbside_case_study.html` lines 328, 330
- Links like `href="index.html#about"` and `href="index.html#contact"` fail because `index.html` uses JS section-snap navigation with no native anchor elements (`id="section-1"` not `id="about"`)
- Result: clicking "About" from any non-home page loads `index.html` and lands on section-0 (hero), not section-1 (About)

**2. "View Full Portfolio" links to LinkedIn**
- `index.html` Contact section line ~509: `href="https://www.linkedin.com/in/bdpetersen13"` with label "View Full Portfolio"
- A hiring manager clicks this expecting more work samples and gets a LinkedIn profile

**3. "View Full Portfolio" button on index.html links to index.html (self-link)**
- `index.html` line ~509: another instance links back to `index.html` — a no-op navigation from within the same page

## Proposed Solutions

**For #about / #contact cross-page links:**
Option A (simple): Change `href="index.html#about"` → `href="index.html"` and accept landing at section-0. Add a tooltip or rename to just "Home."
Option B (better): Before navigating, store the target section in `sessionStorage`: `onclick="sessionStorage.setItem('targetSection', 1); window.location.href='index.html'"` and read it in `initPortfolio()` to call `goToSection()` on load.

**For "View Full Portfolio":**
- Change `href` to `work.html` or change the label to "Connect on LinkedIn"

## Acceptance Criteria
- [ ] Clicking "About" from work.html or case study pages navigates to section-1 on index.html
- [ ] "View Full Portfolio" either goes to work.html or is relabeled "Connect on LinkedIn"
- [ ] No nav link sends the user to a dead or unintended destination

## Effort: Small–Medium (30 min)
