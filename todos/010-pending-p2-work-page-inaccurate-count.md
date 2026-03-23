---
status: pending
priority: p2
issue_id: "010"
tags: [code-review, content, quick-win]
---

# Fix work.html: Inaccurate "6 Featured Projects" Claim + Mavericks Role Label

## Problem Statement
The work page hero badge claims "6 Featured Projects" but delivers 2 complete case studies and 2 "Coming Soon" cards — a total of 4 items, 2 of which are unavailable. Advertising a number you can't deliver reduces credibility. Additionally, one project card lists the role as "Lead Designer & Developer," which is inconsistent with a PM portfolio.

## Findings

**1. "6 Featured Projects" badge**
- `work.html` line ~106: Badge shows "6 Featured Projects"
- Actual content: 2 full case studies (Curbside, IBG) + 2 "Coming Soon" (Weight Logic, Mavericks) = 4 items
- The number 6 has no basis in visible content

**2. Dallas Mavericks card role**
- `work.html` line ~324: `Role: Lead Designer & Developer`
- This is a PM portfolio. Describing a role as designer/developer with no PM framing sends mixed signals to a hiring manager filtering for PMs. Either reframe the role toward product/UX leadership or contextualize it as pre-PM background.

## Proposed Solution
1. Update the badge to "4 Projects" or "2 Case Studies + More Coming"
2. For the Mavericks card, either:
   - Add a "Pre-PM / Early Career" label and reframe toward any PM-adjacent responsibilities
   - Or remove the card until a proper write-up is ready and it won't undermine the PM narrative

## Acceptance Criteria
- [ ] Project count badge accurately reflects available content
- [ ] No role label on the portfolio contradicts the PM narrative without context
- [ ] Mavericks card either has a PM-framed role or a clear "early career" contextualization

## Effort: Small (15 min)
