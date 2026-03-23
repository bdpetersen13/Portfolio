---
status: pending
priority: p2
issue_id: "005"
tags: [code-review, content]
---

# Reframe "10+ Years Experience" to Clarify Scope

## Context
The 10+ years is accurate — it spans retail, operations, and product management across Brandon's full career (2-3 years specifically in product). The number itself isn't wrong. The issue is that the current wording ("10+ years building enterprise products") implies a decade of PM-specific work, which doesn't match a PM II title. A recruiter skimming quickly may misread this.

The resume provides full context, but the portfolio should set accurate expectations upfront.

## Findings
- `index.html` ~line 130 (About bio): "10+ years building enterprise products at Fortune 1 scale"
- `index.html` ~line 154 (Stats grid): "10+ Years Experience" — adjacent to "10+ Projects Delivered," making two identical "10+" stats that look like filler
- `index.html` ~line 176 (Impact section): "Measurable outcomes from 10+ years building products at Fortune 1 scale"

## Proposed Fix
Reframe to reflect the full career scope accurately:
- Bio: change to "10+ years in retail, operations, and product at Fortune 1 scale"
- Stats grid: keep "10+ Years Experience" but clarify in subtitle, or replace "10+ Projects Delivered" with a more specific metric (e.g., "3 Products Shipped" or "$2.4M+ Value Created" to avoid the duplicate 10+)
- Impact section: "10+ years of cross-functional experience building products at Fortune 1 scale"

## Acceptance Criteria
- [ ] "10+ years" is framed as total career experience (retail + ops + product), not PM-only
- [ ] No two stat cards show the same "10+" prefix — replace the weaker one with a specific metric
- [ ] Wording is consistent across all three locations

## Effort: Small (15 min)
