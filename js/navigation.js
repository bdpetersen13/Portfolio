/**
 * Navigation Module
 * Handles section navigation, keyboard, touch, and wheel events
 */

import { TIMING } from './constants.js';

export class SectionNavigation {
  constructor(totalSections) {
    this.currentSection = 0;
    this.isAnimating = false;
    this.totalSections = totalSections;
    this.lastScrollTime = 0;
    this.wheelTimeout = null;

    // Touch tracking
    this.touchStartY = 0;
    this.touchStartTime = 0;

    this.init();
  }

  /**
   * Initialize all event listeners
   */
  init() {
    // Initialize with first section active
    this.updateDots();
    this.goToSection(0, true);

    // Touch zones
    const touchNext = document.getElementById('touch-next');
    const touchPrev = document.getElementById('touch-prev');

    if (touchNext) touchNext.addEventListener('click', () => this.nextSection());
    if (touchPrev) touchPrev.addEventListener('click', () => this.prevSection());

    // Wheel event for desktop
    document.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });

    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeydown.bind(this));

    // Touch events for mobile
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });

    // Prevent default touch scrolling
    document.body.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });

    // Navigation link listeners
    this.initNavLinks();
  }

  /**
   * Initialize navigation link event listeners
   */
  initNavLinks() {
    document.addEventListener('DOMContentLoaded', () => {
      const navLinks = document.querySelectorAll('.nav-link');

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
    });
  }

  /**
   * Update dot navigation indicators
   */
  updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSection);
    });
  }

  /**
   * Navigate to specific section
   * @param {number} sectionIndex - Index of section to navigate to
   * @param {boolean} force - Force navigation even if already on section
   */
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
    if (newSection) newSection.classList.add('active');

    this.currentSection = sectionIndex;
    this.updateDots();

    setTimeout(() => {
      this.isAnimating = false;
    }, TIMING.ANIMATION_DURATION);
  }

  /**
   * Navigate to next section
   */
  nextSection() {
    if (this.currentSection < this.totalSections - 1) {
      this.goToSection(this.currentSection + 1);
    }
  }

  /**
   * Navigate to previous section
   */
  prevSection() {
    if (this.currentSection > 0) {
      this.goToSection(this.currentSection - 1);
    }
  }

  /**
   * Handle wheel events for desktop navigation
   * @param {WheelEvent} e - Wheel event
   */
  handleWheel(e) {
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

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} e - Keyboard event
   */
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

  /**
   * Handle touch start
   * @param {TouchEvent} e - Touch event
   */
  handleTouchStart(e) {
    this.touchStartY = e.touches[0].clientY;
    this.touchStartTime = Date.now();
  }

  /**
   * Handle touch end for swipe navigation
   * @param {TouchEvent} e - Touch event
   */
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

// Make goToSection globally accessible for onclick handlers in HTML
window.goToSection = function(sectionIndex) {
  if (window.sectionNav) {
    window.sectionNav.goToSection(sectionIndex, true);
  }
};
