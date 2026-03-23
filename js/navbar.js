/**
 * Navbar Module
 * Handles auto-hide navigation bar behavior
 */

import { NAVBAR, TIMING } from './constants.js';

export class NavbarManager {
  constructor() {
    this.navbar = document.getElementById('navbar');
    if (!this.navbar) {
      console.warn('Navbar element not found');
      return;
    }

    this.lastMouseY = 0;
    this.navbarHidden = false;

    this.init();
  }

  /**
   * Initialize navbar event listeners
   */
  init() {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));

    // Auto-hide navbar after initial delay
    setTimeout(() => {
      if (this.lastMouseY > NAVBAR.HIDE_THRESHOLD) {
        this.hide();
      }
    }, TIMING.NAVBAR_INITIAL_HIDE);
  }

  /**
   * Handle mouse movement for show/hide logic
   * @param {MouseEvent} e - Mouse event
   */
  handleMouseMove(e) {
    this.lastMouseY = e.clientY;

    if (e.clientY < NAVBAR.SHOW_THRESHOLD) {
      // Mouse is near top - show navbar
      this.show();
    } else if (e.clientY > NAVBAR.HIDE_THRESHOLD && !this.navbarHidden) {
      // Mouse is away from top - hide navbar after delay
      setTimeout(() => {
        if (this.lastMouseY > NAVBAR.HIDE_THRESHOLD) {
          this.hide();
        }
      }, TIMING.NAVBAR_HIDE_DELAY);
    }
  }

  /**
   * Show the navbar
   */
  show() {
    this.navbar.style.transform = 'translateY(0)';
    this.navbarHidden = false;
  }

  /**
   * Hide the navbar
   */
  hide() {
    this.navbar.style.transform = 'translateY(-100%)';
    this.navbarHidden = true;
  }

  /**
   * Toggle navbar visibility
   */
  toggle() {
    if (this.navbarHidden) {
      this.show();
    } else {
      this.hide();
    }
  }
}
