/**
 * Custom Cursor Module
 * Handles magnetic snap cursor effect
 */

import { CURSOR } from './constants.js';

export class CustomCursor {
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
    this.magnetTarget = null;

    // Configuration
    this.snapDistance = options.snapDistance || CURSOR.SNAP_DISTANCE;
    this.snapStrength = options.snapStrength || CURSOR.SNAP_STRENGTH;
    this.easing = options.easing || CURSOR.EASING;
    this.directOverDistance = options.directOverDistance || CURSOR.DIRECT_OVER_DISTANCE;

    this.init();
  }

  /**
   * Initialize cursor event listeners and animation
   */
  init() {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));

    this.animate();
  }

  /**
   * Update mouse position
   * @param {MouseEvent} e - Mouse event
   */
  handleMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  /**
   * Hide cursor when leaving window
   */
  handleMouseLeave() {
    this.cursorEl.style.opacity = '0';
  }

  /**
   * Show cursor when entering window
   */
  handleMouseEnter() {
    this.cursorEl.style.opacity = '1';
  }

  /**
   * Find the closest interactive element for magnetic snap
   * @returns {Object|null} Target object with x, y, element, distance or null
   */
  findMagneticTarget() {
    const interactiveElements = document.querySelectorAll(
      'button, a, .dot, [onclick], .theme-toggle, .project-card'
    );

    let foundTarget = null;
    let minDistance = this.snapDistance;

    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();

      // Skip if element has no dimensions
      if (rect.width === 0 || rect.height === 0) return;

      // Skip elements not in current section (except navbar and dots)
      const isNavbarElement = element.closest('#navbar') || element.classList.contains('dot');
      const currentSection = document.querySelector('.section.active');
      if (!isNavbarElement && currentSection && !currentSection.contains(element)) {
        return;
      }

      // Calculate distance from mouse to center of element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(this.mouseX - centerX, 2) +
        Math.pow(this.mouseY - centerY, 2)
      );

      // Check if mouse is directly over the element's bounding box
      const isDirectlyOver =
        this.mouseX >= rect.left &&
        this.mouseX <= rect.right &&
        this.mouseY >= rect.top &&
        this.mouseY <= rect.bottom;

      // Snap if directly over OR very close
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

  /**
   * Animate cursor with requestAnimationFrame
   */
  animate() {
    const foundTarget = this.findMagneticTarget();

    if (foundTarget) {
      // Magnetic snap effect
      this.cursorX += (foundTarget.x - this.cursorX) * this.snapStrength;
      this.cursorY += (foundTarget.y - this.cursorY) * this.snapStrength;
      this.cursorEl.classList.add('hover');
    } else {
      // Normal smooth follow
      this.cursorX += (this.mouseX - this.cursorX) * this.easing;
      this.cursorY += (this.mouseY - this.cursorY) * this.easing;
      this.cursorEl.classList.remove('hover');
    }

    this.cursorEl.style.left = this.cursorX + 'px';
    this.cursorEl.style.top = this.cursorY + 'px';

    requestAnimationFrame(() => this.animate());
  }
}
