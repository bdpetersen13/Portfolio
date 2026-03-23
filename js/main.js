/**
 * Main Initialization File
 * Imports and initializes all modules
 */

import { CustomCursor } from './cursor.js';
import { SectionNavigation } from './navigation.js';
import { ThemeManager } from './theme.js';
import { NavbarManager } from './navbar.js';
import { GreetingRotator } from './greeting.js';

/**
 * Initialize all modules for the portfolio
 * @param {Object} config - Configuration object
 * @param {number} config.totalSections - Total number of sections on the page
 * @param {boolean} config.enableGreeting - Whether to enable greeting rotation
 */
export function initPortfolio(config = {}) {
  const {
    totalSections = 6,
    enableGreeting = false
  } = config;

  // Initialize custom cursor
  const cursor = new CustomCursor();

  // Initialize section navigation
  const navigation = new SectionNavigation(totalSections);

  // Store in window for global access (needed for onclick handlers)
  window.sectionNav = navigation;

  // Initialize theme manager
  const theme = new ThemeManager();

  // Initialize navbar auto-hide
  const navbar = new NavbarManager();

  // Initialize greeting rotator (only on homepage)
  let greeting = null;
  if (enableGreeting) {
    greeting = new GreetingRotator('greeting');
  }

  // Return instances for programmatic access if needed
  return {
    cursor,
    navigation,
    theme,
    navbar,
    greeting
  };
}
