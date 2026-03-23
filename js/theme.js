/**
 * Theme Module
 * Handles light/dark mode toggle and persistence
 */

import { THEME_STORAGE_KEY, THEMES } from './constants.js';

export class ThemeManager {
  constructor() {
    this.body = document.body;
    this.sunIcon = document.getElementById('sun-icon');
    this.moonIcon = document.getElementById('moon-icon');

    this.init();
  }

  /**
   * Initialize theme from storage
   */
  init() {
    // Load saved theme preference on page load
    window.addEventListener('DOMContentLoaded', () => {
      this.loadTheme();
    });

    // Make toggle function globally accessible for onclick handlers
    window.toggleTheme = () => this.toggle();
  }

  /**
   * Toggle between light and dark themes
   */
  toggle() {
    this.body.classList.toggle('light-mode');

    if (this.body.classList.contains('light-mode')) {
      this.setTheme(THEMES.LIGHT);
    } else {
      this.setTheme(THEMES.DARK);
    }
  }

  /**
   * Set specific theme
   * @param {string} theme - Theme name ('light' or 'dark')
   */
  setTheme(theme) {
    if (!this.sunIcon || !this.moonIcon) {
      console.warn('Theme icons not found');
      return;
    }

    if (theme === THEMES.LIGHT) {
      this.sunIcon.style.display = 'none';
      this.moonIcon.style.display = 'block';
      sessionStorage.setItem(THEME_STORAGE_KEY, THEMES.LIGHT);
    } else {
      this.sunIcon.style.display = 'block';
      this.moonIcon.style.display = 'none';
      sessionStorage.setItem(THEME_STORAGE_KEY, THEMES.DARK);
    }
  }

  /**
   * Load theme from session storage
   */
  loadTheme() {
    const savedTheme = sessionStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === THEMES.LIGHT) {
      this.body.classList.add('light-mode');
      if (this.sunIcon) this.sunIcon.style.display = 'none';
      if (this.moonIcon) this.moonIcon.style.display = 'block';
    }
  }

  /**
   * Get current theme
   * @returns {string} Current theme ('light' or 'dark')
   */
  getCurrentTheme() {
    return this.body.classList.contains('light-mode') ? THEMES.LIGHT : THEMES.DARK;
  }
}
