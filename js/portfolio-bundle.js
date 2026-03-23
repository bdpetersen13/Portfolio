/**
 * Portfolio Bundle - All JavaScript in one file for browser compatibility
 * This file bundles all modules to work without ES6 module support
 */

// ============================================
// CONSTANTS
// ============================================
const TIMING = {
  SCROLL_DEBOUNCE: 800,
  ANIMATION_DURATION: 500,
  NAVBAR_HIDE_DELAY: 1000,
  NAVBAR_INITIAL_HIDE: 3000,
  GREETING_ROTATION: 2000,
  GREETING_FADE: 300,
  WHEEL_TIMEOUT: 10,
  TOUCH_THRESHOLD: 50,
  TOUCH_TIME_LIMIT: 500
};

const SECTIONS = {
  MAIN: 6,
  WORK: 5,
  IBG_CASE_STUDY: 10,
  CURBSIDE_CASE_STUDY: 13
};

const CURSOR = {
  SNAP_DISTANCE: 50,
  SNAP_STRENGTH: 0.5,
  EASING: 0.15,
  DIRECT_OVER_DISTANCE: 100,
  DEFAULT_SIZE: 20,
  HOVER_SIZE: 50
};

const NAVBAR = {
  SHOW_THRESHOLD: 100,
  HIDE_THRESHOLD: 150
};

const GREETINGS = [
  'Hi', 'Hola', 'Bonjour', 'Ciao', 'Hallo', 'Olá',
  'Привет', 'こんにちは', '你好', '안녕하세요',
  'Grüetzi', 'Hej', 'Merhaba', 'Namaste', 'Sawubona'
];

const THEME_STORAGE_KEY = 'theme';
const THEMES = { LIGHT: 'light', DARK: 'dark' };

// ============================================
// CUSTOM CURSOR
// ============================================
class CustomCursor {
  constructor(options = {}) {
    this.cursorEl = document.getElementById('custom-cursor');
    if (!this.cursorEl) {
      console.warn('Custom cursor element not found');
      return;
    }

    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;

    this.snapDistance = options.snapDistance || CURSOR.SNAP_DISTANCE;
    this.snapStrength = options.snapStrength || CURSOR.SNAP_STRENGTH;
    this.easing = options.easing || CURSOR.EASING;
    this.directOverDistance = options.directOverDistance || CURSOR.DIRECT_OVER_DISTANCE;

    this.init();
  }

  init() {
    this.cachedElements = document.querySelectorAll(
      'button, a, .dot, [onclick], .theme-toggle, .project-card'
    );
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('mouseleave', () => this.handleMouseLeave());
    document.addEventListener('mouseenter', () => this.handleMouseEnter());
    this.animate();
  }

  handleMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  handleMouseLeave() {
    this.cursorEl.style.opacity = '0';
  }

  handleMouseEnter() {
    this.cursorEl.style.opacity = '1';
  }

  findMagneticTarget() {
    const interactiveElements = this.cachedElements;

    let foundTarget = null;
    let minDistance = this.snapDistance;

    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const isNavbarElement = element.closest('#navbar') || element.classList.contains('dot');
      const currentSection = document.querySelector('.section.active');
      if (!isNavbarElement && currentSection && !currentSection.contains(element)) {
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(this.mouseX - centerX, 2) +
        Math.pow(this.mouseY - centerY, 2)
      );

      const isDirectlyOver =
        this.mouseX >= rect.left &&
        this.mouseX <= rect.right &&
        this.mouseY >= rect.top &&
        this.mouseY <= rect.bottom;

      if (isDirectlyOver && distance < this.directOverDistance) {
        foundTarget = { x: centerX, y: centerY, element, distance };
        minDistance = distance;
      } else if (!isDirectlyOver && distance < this.snapDistance) {
        if (distance < minDistance) {
          foundTarget = { x: centerX, y: centerY, element, distance };
          minDistance = distance;
        }
      }
    });

    return foundTarget;
  }

  animate() {
    const foundTarget = this.findMagneticTarget();

    if (foundTarget) {
      this.cursorX += (foundTarget.x - this.cursorX) * this.snapStrength;
      this.cursorY += (foundTarget.y - this.cursorY) * this.snapStrength;
      this.cursorEl.classList.add('hover');
    } else {
      this.cursorX += (this.mouseX - this.cursorX) * this.easing;
      this.cursorY += (this.mouseY - this.cursorY) * this.easing;
      this.cursorEl.classList.remove('hover');
    }

    this.cursorEl.style.left = this.cursorX + 'px';
    this.cursorEl.style.top = this.cursorY + 'px';

    this.rafId = requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// SECTION NAVIGATION
// ============================================
class SectionNavigation {
  constructor(totalSections) {
    this.currentSection = 0;
    this.isAnimating = false;
    this.totalSections = totalSections;
    this.lastScrollTime = 0;
    this.wheelTimeout = null;
    this.touchStartY = 0;
    this.touchStartTime = 0;

    this.init();
  }

  init() {
    this.updateDots();
    this.goToSection(0, true);

    const touchNext = document.getElementById('touch-next');
    const touchPrev = document.getElementById('touch-prev');

    if (touchNext) touchNext.addEventListener('click', () => this.nextSection());
    if (touchPrev) touchPrev.addEventListener('click', () => this.prevSection());

    document.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    document.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    document.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

    document.body.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });

    this.initNavLinks();
  }

  initNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const sectionIndex = parseInt(e.currentTarget.getAttribute('data-section'));
        if (!isNaN(sectionIndex)) {
          this.goToSection(sectionIndex, true);
        }
      });
    });
  }

  updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSection);
    });
  }

  goToSection(sectionIndex, force = false) {
    if (
      !force &&
      (this.isAnimating ||
        sectionIndex === this.currentSection ||
        sectionIndex < 0 ||
        sectionIndex >= this.totalSections)
    ) {
      return;
    }

    this.isAnimating = true;
    const oldSection = document.getElementById(`section-${this.currentSection}`);
    const newSection = document.getElementById(`section-${sectionIndex}`);

    if (oldSection) oldSection.classList.remove('active');
    if (newSection) {
      newSection.classList.add('active');
      newSection.scrollTop = 0; // reset scroll position when entering a section
    }

    this.currentSection = sectionIndex;
    this.updateDots();

    setTimeout(() => {
      this.isAnimating = false;
    }, TIMING.ANIMATION_DURATION);
  }

  nextSection() {
    if (this.currentSection < this.totalSections - 1) {
      this.goToSection(this.currentSection + 1);
    }
  }

  prevSection() {
    if (this.currentSection > 0) {
      this.goToSection(this.currentSection - 1);
    }
  }

  handleWheel(e) {
    // If the active section has overflowing content, let it scroll naturally
    // until it reaches the top or bottom edge, then navigate sections.
    const activeSection = document.querySelector('.section.active');
    if (activeSection) {
      const { scrollTop, scrollHeight, clientHeight } = activeSection;
      const isScrollable = scrollHeight > clientHeight + 2;
      if (isScrollable) {
        const atBottom = scrollTop + clientHeight >= scrollHeight - 4;
        const atTop = scrollTop <= 0;
        if (e.deltaY > 0 && !atBottom) return; // let section scroll down
        if (e.deltaY < 0 && !atTop) return;    // let section scroll up
      }
    }

    e.preventDefault();

    const now = Date.now();
    if (now - this.lastScrollTime < TIMING.SCROLL_DEBOUNCE || this.isAnimating) {
      return;
    }

    clearTimeout(this.wheelTimeout);
    this.wheelTimeout = setTimeout(() => {
      if (e.deltaY > 0) {
        this.lastScrollTime = now;
        this.nextSection();
      } else if (e.deltaY < 0) {
        this.lastScrollTime = now;
        this.prevSection();
      }
    }, TIMING.WHEEL_TIMEOUT);
  }

  handleKeydown(e) {
    if (this.isAnimating) return;

    if (e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      this.nextSection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.prevSection();
    }
  }

  handleTouchStart(e) {
    this.touchStartY = e.touches[0].clientY;
    this.touchStartTime = Date.now();
  }

  handleTouchEnd(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndTime = Date.now();
    const deltaY = this.touchStartY - touchEndY;
    const deltaTime = touchEndTime - this.touchStartTime;

    if (
      Math.abs(deltaY) > TIMING.TOUCH_THRESHOLD &&
      deltaTime < TIMING.TOUCH_TIME_LIMIT &&
      !this.isAnimating
    ) {
      if (deltaY > 0) {
        this.nextSection();
      } else {
        this.prevSection();
      }
    }
  }
}

// ============================================
// THEME MANAGER
// ============================================
class ThemeManager {
  constructor() {
    this.body = document.body;
    this.sunIcon = document.getElementById('sun-icon');
    this.moonIcon = document.getElementById('moon-icon');
    this.init();
  }

  init() {
    this.loadTheme();
    window.toggleTheme = () => this.toggle();
  }

  toggle() {
    this.body.classList.toggle('light-mode');

    if (this.body.classList.contains('light-mode')) {
      this.setTheme(THEMES.LIGHT);
    } else {
      this.setTheme(THEMES.DARK);
    }
  }

  setTheme(theme) {
    if (!this.sunIcon || !this.moonIcon) {
      console.warn('Theme icons not found');
      return;
    }

    if (theme === THEMES.LIGHT) {
      this.sunIcon.style.display = 'none';
      this.moonIcon.style.display = 'block';
      localStorage.setItem(THEME_STORAGE_KEY, THEMES.LIGHT);
    } else {
      this.sunIcon.style.display = 'block';
      this.moonIcon.style.display = 'none';
      localStorage.setItem(THEME_STORAGE_KEY, THEMES.DARK);
    }
  }

  loadTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === THEMES.LIGHT) {
      this.body.classList.add('light-mode');
      if (this.sunIcon) this.sunIcon.style.display = 'none';
      if (this.moonIcon) this.moonIcon.style.display = 'block';
    }
  }

  getCurrentTheme() {
    return this.body.classList.contains('light-mode') ? THEMES.LIGHT : THEMES.DARK;
  }
}

// ============================================
// NAVBAR MANAGER
// ============================================
class NavbarManager {
  constructor() {
    this.navbar = document.getElementById('navbar');
    if (!this.navbar) {
      console.warn('Navbar element not found');
      return;
    }

    this.lastMouseY = 0;
    this.navbarHidden = false;
    this.hideTimeout = null;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));

    setTimeout(() => {
      if (this.lastMouseY > NAVBAR.HIDE_THRESHOLD) {
        this.hide();
      }
    }, TIMING.NAVBAR_INITIAL_HIDE);
  }

  handleMouseMove(e) {
    this.lastMouseY = e.clientY;

    if (e.clientY < NAVBAR.SHOW_THRESHOLD) {
      this.show();
    } else if (e.clientY > NAVBAR.HIDE_THRESHOLD && !this.navbarHidden) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = setTimeout(() => {
        if (this.lastMouseY > NAVBAR.HIDE_THRESHOLD) {
          this.hide();
        }
      }, TIMING.NAVBAR_HIDE_DELAY);
    }
  }

  show() {
    this.navbar.style.transform = 'translateY(0)';
    this.navbarHidden = false;
  }

  hide() {
    this.navbar.style.transform = 'translateY(-100%)';
    this.navbarHidden = true;
  }

  toggle() {
    if (this.navbarHidden) {
      this.show();
    } else {
      this.hide();
    }
  }
}

// ============================================
// GREETING ROTATOR
// ============================================
class GreetingRotator {
  constructor(elementId = 'greeting') {
    this.greetingElement = document.getElementById(elementId);
    if (!this.greetingElement) {
      console.warn('Greeting element not found');
      return;
    }

    this.currentIndex = 0;
    this.greetings = GREETINGS;
    this.init();
  }

  init() {
    this.greetingElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    this.intervalId = setInterval(() => this.rotate(), TIMING.GREETING_ROTATION);
  }

  rotate() {
    this.greetingElement.style.opacity = '0';
    this.greetingElement.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.greetings.length;
      this.greetingElement.textContent = this.greetings[this.currentIndex];
      this.greetingElement.style.opacity = '1';
      this.greetingElement.style.transform = 'translateY(0)';
    }, TIMING.GREETING_FADE);
  }
}

// ============================================
// INITIALIZATION
// ============================================
function initPortfolio(config = {}) {
  const {
    totalSections = 6,
    enableGreeting = false
  } = config;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const cursor = (!reduceMotion && !isTouchDevice) ? new CustomCursor() : null;
  const navigation = new SectionNavigation(totalSections);
  window.sectionNav = navigation;

  // Global function for onclick handlers
  window.goToSection = function(sectionIndex) {
    if (window.sectionNav) {
      window.sectionNav.goToSection(sectionIndex, true);
    }
  };

  const theme = new ThemeManager();
  const navbar = new NavbarManager();

  let greeting = null;
  if (enableGreeting && !reduceMotion) {
    greeting = new GreetingRotator('greeting');
  }

  // Navigate to target section if arriving via cross-page link (e.g. About, Contact from other pages)
  const targetSection = sessionStorage.getItem('targetSection');
  if (targetSection !== null) {
    sessionStorage.removeItem('targetSection');
    const sectionIndex = parseInt(targetSection, 10);
    if (!isNaN(sectionIndex) && sectionIndex > 0) {
      setTimeout(() => navigation.goToSection(sectionIndex, true), 100);
    }
  }

  return { cursor, navigation, theme, navbar, greeting };
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Configuration will be set by page-specific script
    if (window.portfolioConfig) {
      initPortfolio(window.portfolioConfig);
    }
  });
} else {
  // DOM is already ready
  if (window.portfolioConfig) {
    initPortfolio(window.portfolioConfig);
  }
}
