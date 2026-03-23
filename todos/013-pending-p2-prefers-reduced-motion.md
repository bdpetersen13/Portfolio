---
status: pending
priority: p2
issue_id: "013"
tags: [code-review, accessibility, performance]
---

# Add `prefers-reduced-motion` Support + Mobile Cursor Guard

## Problem Statement
The portfolio has multiple continuous animations (60fps cursor loop, greeting rotation, section transitions, hover effects) that run unconditionally with no respect for the OS-level "Reduce Motion" accessibility setting. This is a WCAG 2.1 AA criterion (2.3.3). Additionally, the custom cursor rAF loop runs on mobile/touch devices where there is no cursor — wasting battery and CPU for no benefit.

## Findings
- **No `prefers-reduced-motion` media query anywhere** in any of the 5 CSS files (confirmed by agent)
- **Cursor rAF loop** runs unconditionally on all devices including mobile (`portfolio-bundle.js` lines 140–157)
- **`cursor: none !important`** in `css/base.css` line 7 suppresses native cursor globally — on mobile this affects tap feedback
- **`setInterval` greeting rotator** runs unconditionally (`portfolio-bundle.js` line 450)
- **Section transitions** use `transition: all 0.5s cubic-bezier...` with no reduced-motion override (`navigation.css` line 15)

## Proposed Solution

**CSS (add to each relevant file):**
```css
@media (prefers-reduced-motion: reduce) {
  .section { transition: opacity 0.1s linear !important; transform: none !important; }
  * { animation-duration: 0.01ms !important; transition-duration: 0.1ms !important; }
}
```

**JavaScript (`portfolio-bundle.js`):**
```javascript
// Guard cursor and greeting on reduced motion + touch devices
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = 'ontouchstart' in window;

const cursor = (!reduceMotion && !isTouchDevice) ? new CustomCursor() : null;
if (enableGreeting && !reduceMotion) greeting = new GreetingRotator('greeting');
```

**CSS cursor override — add media query to `base.css`:**
```css
@media (hover: none) and (pointer: coarse) {
  * { cursor: auto !important; }  /* restore native cursor on touch */
}
```

## Acceptance Criteria
- [ ] With "Reduce Motion" enabled in OS settings, no animations or transitions fire
- [ ] On a mobile/touch device, the cursor rAF loop does not start
- [ ] Native cursor/tap feedback is restored on touch devices
- [ ] Greeting rotation stops when reduced motion is preferred

## Effort: Medium (1 hr)
