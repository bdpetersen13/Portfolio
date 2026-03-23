---
status: pending
priority: p2
issue_id: "014"
tags: [code-review, content]
---

# Improve Homepage Narrative Clarity for External Audiences

## Findings

**1. Hero headline doesn't differentiate**
- Current subheadline: "Product Manager building products users love and businesses need. Specializing in AI/ML-driven products, user experiences, data-driven growth, and delivering measurable business outcomes."
- This could be any PM's portfolio. No anchor to company, scale, or domain. A recruiter can't tell in 5 seconds what kind of PM Brandon is or where he's done it.

**2. "Plus It" may need brief context for non-Disney audiences**
- "Plus It" originates from Disney — the practice of always adding to a great experience to make it exceptional. It's not internal Sam's Club jargon, but it's also not a widely known phrase outside Disney/hospitality contexts.
- Recruiters at tech companies (Stripe, Google, etc.) may not recognize it and could read it as a typo.
- Suggested fix: Add a brief parenthetical on first use: e.g., "Experience *is the Product,* I Plus It *(the Disney principle of always elevating a great experience)*" — or simply trust that the portfolio's tone makes it self-explanatory and remove the concern entirely.

**3. Current role not visible above the fold**
- "Sam's Club" and "PM II" don't appear in section-0 (Hero)
- Recruiters sourcing at a specific level or industry miss this context immediately
- Fix: Add a subtle line under the hero greeting: "Product Manager II at Sam's Club (Walmart)" in `text-white/50` styling

**4. About section grammatical error**
- "...data-informed decision making I utilize AI as a tool in my process" — missing period after "decision making"
- Fix: Add period

**5. "10+ Projects Delivered" stat is weak**
- Adjacent to "$2.4M value" and "1,800 hrs saved," this stat reads as filler
- Fix: Replace with a specific, substantiated metric already available on the site

## Proposed Solution
1. Add role + company to hero in muted styling
2. Add a brief contextual note on first use of "Plus It" (or decide it's self-evident and leave it)
3. Tighten hero subheadline to anchor to Sam's Club, Fortune 1 scale, or AI/ML specialty explicitly
4. Fix missing period in About bio
5. Replace "10+ Projects Delivered" with a specific metric

## Acceptance Criteria
- [ ] A recruiter unfamiliar with Brandon's background understands his level and context within 5 seconds
- [ ] "Plus It" either has context or the surrounding copy makes its meaning clear
- [ ] About section grammatical error is fixed
- [ ] Stat cards don't have duplicate "10+" figures

## Effort: Medium (1 hr)
