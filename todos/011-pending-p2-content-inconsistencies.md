---
status: pending
priority: p2
issue_id: "011"
tags: [code-review, content]
---

# Fix Remaining Content Issues Across Case Studies

## Context
Several findings from the original review were clarified:
- **IBG team size (28 vs 12):** Not a contradiction. "28" = full cross-functional team (engineers, data scientists, UX, business). "12+" = number of siloed tools the merch finance team was using (the problem stat). However, the Behind the Scenes section copy may say "12-person cross-functional team" — if so, that's a wording error that needs to be corrected to not imply a team headcount of 12.
- **Curbside placeholders & "Significant Increase" metric:** Intentional — the product is in active delivery. Placeholders and unresolved metrics will be updated once delivered and measured. Not a current issue.

## Remaining Real Findings

**1. IBG Behind the Scenes: Verify wording doesn't say "12-person team"**
- If `IBG_Case_Study.html` Behind the Scenes section contains "Led 12-person cross-functional team," this needs to be corrected — 12 refers to the number of siloed tools, not team headcount
- Fix: Change to something like "Led 28-person cross-functional team" or remove the person count from that section

**2. Curbside hero subtitle uses jargon**
- Current: "Reducing friction and boosting delight across pickup — from associate comms to recovery"
- "Associate comms" is internal retail shorthand; "recovery" is ambiguous to an outside audience
- Fix: Rewrite to lead with outcomes: e.g., "Turning a transactional pickup moment into a personalized loyalty experience — improving NPS, reducing contact rates, and empowering associates with real-time member context"

**3. "100% Product Adoption Rate" on homepage needs context**
- `index.html` Impact section: stat appears without context
- A recruiter reading this will wonder: 100% of what?
- Fix: Add a qualifier — "100% Org Adoption (IBG Platform)" — so it's specific and credible

## Acceptance Criteria
- [ ] IBG Behind the Scenes section does not claim "12-person team" when the team was 28
- [ ] Curbside hero subtitle is clear to a non-retail audience
- [ ] "100% Product Adoption Rate" has an inline qualifier tying it to the IBG platform

## Effort: Small (20 min)
