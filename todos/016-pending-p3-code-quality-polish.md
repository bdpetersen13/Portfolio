---
status: pending
priority: p3
issue_id: "016"
tags: [code-review, javascript, css, quality]
---

# Code Quality Polish: JS Leaks, CSS Cleanup, Tap Targets

## Problem Statement
A collection of lower-priority code quality issues that don't individually block the portfolio's effectiveness but represent good engineering hygiene.

## Findings

**1. `document.querySelectorAll()` called inside every rAF tick (~60×/sec)**
- `portfolio-bundle.js` line 96: `findMagneticTarget()` runs `document.querySelectorAll(...)` on every animation frame
- On the 13-section curbside case study, all sections' DOM is present simultaneously — this traverses a large DOM tree 60 times per second
- Fix: Cache the element list in the constructor; invalidate only when sections change

**2. NavbarManager `setTimeout` accumulation on `mousemove`**
- `portfolio-bundle.js` lines 399–409: every `mousemove` event below y=150 spawns a new 1000ms `setTimeout` without clearing the prior one
- Can accumulate dozens of pending timeouts during normal mouse movement
- Fix: Store the timeout reference (`this.hideTimeout`) and `clearTimeout(this.hideTimeout)` at the start of `handleMouseMove` — same pattern used for `wheelTimeout`

**3. `setInterval` in `GreetingRotator` not stored**
- `portfolio-bundle.js` line 450: interval ID not stored, cannot be cleared
- Fix: `this.intervalId = setInterval(...)` and add a `destroy()` method

**4. rAF loop in `CustomCursor` has no cancellation handle**
- `portfolio-bundle.js` lines 140–157: no `cancelAnimationFrame` path, loop runs until page unload
- Fix: `this.rafId = requestAnimationFrame(...)` in `animate()` and add `destroy()` method

**5. Dot navigation tap targets are too small**
- `css/navigation.css` lines 40–47: dots are 12px with `space-y-4` spacing — well below 44px minimum recommended tap target
- Fix: Add `padding: 16px` to `.dot` to expand the hit area without changing the visual dot size

**6. `loading="lazy"` missing on off-screen images**
- `work.html` lines ~137, ~205; `IBG_Case_Study.html` all case study images beyond section-0
- Fix: Add `loading="lazy"` to all images not in the first visible section

**7. `index.html` "h2 before h1" inverted heading hierarchy**
- `index.html` and `work.html`: `<h2>` used for the label ("Hi"), `<h1>` for the tagline — semantically backwards
- Fix: Swap to `<h1>` for the primary identity statement, `<h2>` for section labels

**8. Inline glowing button styles repeated ~15×**
- The radial-gradient button with glow effect is written as a 250+ character Tailwind utility string repeated across all pages
- Fix: Extract to `.btn-primary` in `components.css`

## Acceptance Criteria
- [ ] `querySelectorAll` is no longer called inside the rAF loop
- [ ] NavbarManager clears its prior timeout before creating a new one
- [ ] Greeting interval ID is stored
- [ ] Dot tap targets are at least 36px in each dimension
- [ ] `loading="lazy"` on all off-screen images

## Effort: Medium (2–3 hrs for all items)
