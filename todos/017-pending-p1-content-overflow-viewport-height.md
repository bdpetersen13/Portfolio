---
status: pending
priority: p1
issue_id: "017"
tags: [code-review, responsive, ux]
---

# Fix Content Overflow on Smaller Viewport Heights (14" MacBook Air)

## Problem Statement
On a 14" MacBook Air, multiple sections have more content than fits in `100vh`. Because sections use `height: 100vh; overflow: hidden`, the clipped content is simply invisible — users cannot scroll within a section to see it. This is confirmed by screenshots showing cut-off content on four different pages.

## Affected Sections (from screenshots)

| Page | Section | What's Cut Off |
|------|---------|----------------|
| `IBG_Case_Study.html` | "The Problem" | "Core Challenges" 2-column grid is partially clipped at the bottom |
| `IBG_Case_Study.html` | "Key Features" | Bottom two feature cards (Scenario Planning, Collaborative Workflows) descriptions cut off |
| `curbside_case_study.html` | "Experience Design" | Bullet points below phone mockup frames are cut off |
| `index.html` | "Skills & Expertise" | Certifications section cards at the bottom are cut off |

## Root Cause
`navigation.css` sets `.section { height: 100vh; overflow: hidden; }`. Content that exceeds `100vh` at the current viewport is clipped with no scroll escape.

## Proposed Solutions

**Option A — Height-based media queries (recommended, lowest risk):**
Add `@media (max-height: 900px)` rules to reduce `section-padding`, shrink card heights/font sizes, and compress content in the dense sections. This keeps the snap behavior intact.

```css
@media (max-height: 900px) {
  .section-padding { padding-top: clamp(1rem, 3vh, 2rem); padding-bottom: clamp(1rem, 3vh, 2rem); }
  .responsive-heading-xl { font-size: clamp(2rem, 5vw, 3.5rem); }
}
```

**Option B — Allow intra-section scrolling:**
Change sections to `overflow-y: auto` and update the wheel/touch handlers in `portfolio-bundle.js` to detect when a section has reached its scroll end before triggering navigation to the next section. More complex but more robust.

**Option C — Content restructuring:**
Split the densest sections (IBG "The Problem" has hero stats + full challenge grid; IBG "Key Features" has 4 screenshot cards) into additional sections. Increases total section count but ensures nothing is ever clipped.

## Recommendation
Start with Option A (height-based media queries) for a quick fix. If the compressed layout still doesn't fit at very small heights, consider splitting the most content-heavy sections (Option C).

## Specific Sections to Audit
Walk through every section on every page with browser dev tools set to 900px viewport height and identify all overflow. The screenshots caught 4 — there may be more.

## Acceptance Criteria
- [ ] No content is clipped on a 14" MacBook Air (viewport height ~870px with browser chrome)
- [ ] All sections render completely at 900px viewport height
- [ ] Section snap behavior is unaffected
- [ ] Test on both index.html, work.html, IBG_Case_Study.html, and curbside_case_study.html

## Effort: Medium (2–3 hrs)
