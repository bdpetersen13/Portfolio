# Brandon Petersen - Product Manager Portfolio

A modern, interactive portfolio website showcasing product management work with custom cursor effects, smooth section navigation, and light/dark themes.

## Overview

This portfolio demonstrates advanced frontend skills with modular, maintainable code architecture. Built with vanilla JavaScript, Tailwind CSS, and modern web standards.

## Project Structure

```
Portfolio/
├── index.html                  # Main homepage
├── css/                        # Modular CSS files
│   ├── base.css               # Typography, resets, utilities
│   ├── cursor.css             # Custom cursor styles
│   ├── navigation.css         # Section & dot navigation
│   ├── components.css         # Reusable UI components
│   └── theme.css              # Light/dark mode styles
├── js/                         # Modular JavaScript
│   ├── constants.js           # Configuration & constants
│   ├── cursor.js              # Custom cursor module
│   ├── navigation.js          # Section navigation
│   ├── theme.js               # Theme management
│   ├── navbar.js              # Auto-hide navbar
│   ├── greeting.js            # Greeting rotation
│   └── main.js                # Main initialization
├── images/                     # Image assets
│   ├── profile/               # Profile photos
│   └── case-studies/          # Case study images
├── pages/                      # Additional pages
│   ├── work.html              # Work & case studies listing
│   └── case-studies/          # Individual case studies
│       ├── ibg.html
│       └── curbside.html
└── README.md                   # This file
```

## Features

### Interactive Elements

- **Custom Magnetic Cursor**: Smooth cursor that snaps to interactive elements
- **Section Navigation**: Full-page sections with keyboard, wheel, and touch support
- **Auto-Hide Navbar**: Navigation bar appears on hover near top of page
- **Theme Toggle**: Switch between light and dark modes (persists in session)
- **Greeting Rotation**: Multilingual greeting that rotates every 2 seconds

### Technical Highlights

- **Modular Architecture**: Separated CSS and JS into logical modules
- **ES6 Modules**: Modern JavaScript with classes and imports
- **Responsive Design**: Fluid typography and spacing using `clamp()`
- **Accessibility**: Keyboard navigation, ARIA labels, semantic HTML
- **Performance**: Optimized assets, minimal dependencies

## File Descriptions

### CSS Modules

| File | Purpose | Key Classes |
|------|---------|-------------|
| `base.css` | Core typography, resets, responsive utilities | `.responsive-heading-*`, `.section-padding` |
| `cursor.css` | Custom cursor styling | `#custom-cursor`, `.hover` |
| `navigation.css` | Section and dot navigation | `.section`, `.dot`, `.touch-zone-*` |
| `components.css` | Reusable UI components | `.glass-card`, `.skill-tag`, `.status-badge` |
| `theme.css` | Light/dark mode overrides | `body.light-mode` selectors |

### JavaScript Modules

| File | Purpose | Exports |
|------|---------|---------|
| `constants.js` | Configuration values | `TIMING`, `SECTIONS`, `CURSOR`, `GREETINGS` |
| `cursor.js` | Custom cursor logic | `CustomCursor` class |
| `navigation.js` | Section navigation | `SectionNavigation` class |
| `theme.js` | Theme management | `ThemeManager` class |
| `navbar.js` | Auto-hide navbar | `NavbarManager` class |
| `greeting.js` | Greeting rotation | `GreetingRotator` class |
| `main.js` | Initialization | `initPortfolio()` function |

## Configuration

All timing, sizing, and behavior constants are centralized in [`js/constants.js`](js/constants.js):

```javascript
export const TIMING = {
  SCROLL_DEBOUNCE: 800,        // Prevent scroll spam
  ANIMATION_DURATION: 500,      // Section transition duration
  NAVBAR_HIDE_DELAY: 1000,      // Delay before hiding navbar
  // ... more timing constants
};

export const CURSOR = {
  SNAP_DISTANCE: 50,            // Magnetic snap distance
  SNAP_STRENGTH: 0.5,           // Snap strength (0-1)
  // ... more cursor config
};
```

## Usage

### Basic Setup

1. **Clone or download** this repository
2. **Open `index.html`** in a modern browser
3. **No build step required** - works with vanilla HTML/CSS/JS

### For Development

If you want to modify the code:

1. Edit modular CSS files in `/css/`
2. Edit modular JS files in `/js/`
3. Changes apply automatically (no compilation needed)

### Adding New Pages

To create a new page with the same interactive features:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Link to modular CSS -->
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/cursor.css">
    <link rel="stylesheet" href="../css/navigation.css">
    <link rel="stylesheet" href="../css/components.css">
    <link rel="stylesheet" href="../css/theme.css">
</head>
<body>
    <!-- Your content with sections -->
    <div class="section active" id="section-0">...</div>
    <div class="section" id="section-1">...</div>

    <!-- Initialize modules -->
    <script type="module">
        import { initPortfolio } from '../js/main.js';
        initPortfolio({ totalSections: 2 });
    </script>
</body>
</html>
```

## Customization

### Change Theme Colors

Edit theme colors in [`css/theme.css`](css/theme.css):

```css
body.light-mode {
  background: white; /* Change light mode background */
}
```

### Adjust Timing

Modify timing constants in [`js/constants.js`](js/constants.js):

```javascript
export const TIMING = {
  SCROLL_DEBOUNCE: 1000,  // Slower scroll (default: 800)
  GREETING_ROTATION: 3000 // Slower greeting rotation (default: 2000)
};
```

### Add More Greetings

Add new greetings to the rotation in [`js/constants.js`](js/constants.js):

```javascript
export const GREETINGS = [
  'Hi', 'Hola', 'Bonjour',
  'Your New Greeting' // Add here
];
```

### Customize Cursor Behavior

Adjust cursor behavior in [`js/constants.js`](js/constants.js):

```javascript
export const CURSOR = {
  SNAP_DISTANCE: 75,      // Larger snap distance
  SNAP_STRENGTH: 0.7,     // Stronger snap
  EASING: 0.2             // Faster cursor follow
};
```

## Browser Support

- **Chrome/Edge**: Full support ✅
- **Firefox**: Full support ✅
- **Safari**: Full support ✅
- **Mobile browsers**: Touch navigation supported ✅

Requires modern browser with ES6 module support (2017+).

## Performance

- **Zero external JS dependencies** (only Tailwind CSS via CDN)
- **Modular CSS** allows browser caching across pages
- **ES6 modules** enable code splitting
- **Lazy loading** ready for images

## Accessibility

- ✅ Keyboard navigation (Arrow keys, Spacebar)
- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Theme toggle for visual preference
- ⚠️ Custom cursor may affect accessibility (can be disabled)

### Disabling Custom Cursor

To disable custom cursor for accessibility, comment out in [`css/cursor.css`](css/cursor.css):

```css
/* Uncomment to disable custom cursor
* {
  cursor: none !important;
}
*/
```

## Development Principles

This codebase follows:

- **DRY (Don't Repeat Yourself)**: No code duplication across pages
- **Separation of Concerns**: HTML, CSS, JS in separate files
- **Modularity**: Reusable components and utilities
- **Maintainability**: Clear naming, constants, and documentation
- **Readability**: Well-commented, descriptive names

## Future Enhancements

Potential improvements:

- [ ] Add build process (Vite/Webpack) for minification
- [ ] Convert to TypeScript for type safety
- [ ] Add unit tests for JavaScript modules
- [ ] Implement lazy loading for images
- [ ] Add prefers-reduced-motion media query
- [ ] Optimize images (convert to WebP)
- [ ] Add service worker for offline support

## Credits

**Built by**: Brandon Petersen
**Technologies**: Vanilla JavaScript, Tailwind CSS, HTML5
**Fonts**: Inter, Geist, Playfair Display (Google Fonts)

## License

This portfolio is for personal use. All rights reserved.

---

## Quick Reference

### Key Files to Edit

| What You Want | Edit This File |
|---------------|----------------|
| Homepage content | `index.html` |
| Timing/behavior | `js/constants.js` |
| Colors/themes | `css/theme.css` |
| Component styles | `css/components.css` |
| Cursor behavior | `js/cursor.js` |
| Navigation logic | `js/navigation.js` |

### Common Tasks

**Add a new section to homepage:**
1. Add `<div class="section" id="section-X">` to `index.html`
2. Update `totalSections` in the `initPortfolio()` call
3. Add dot navigation: `<div class="dot" onclick="goToSection(X)"></div>`

**Change scroll speed:**
1. Edit `TIMING.SCROLL_DEBOUNCE` in `js/constants.js`

**Modify cursor snap distance:**
1. Edit `CURSOR.SNAP_DISTANCE` in `js/constants.js`

**Add a new theme color:**
1. Add CSS rule in `css/theme.css` under `body.light-mode`

---

For questions or support, contact Brandon Petersen.
