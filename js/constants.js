/**
 * Constants - Centralized configuration values
 * All magic numbers and configuration in one place
 */

// Timing constants (in milliseconds)
export const TIMING = {
  SCROLL_DEBOUNCE: 800,        // Prevent scroll spam
  ANIMATION_DURATION: 500,      // Section transition duration
  NAVBAR_HIDE_DELAY: 1000,      // Delay before hiding navbar
  NAVBAR_INITIAL_HIDE: 3000,    // Initial navbar hide timer
  GREETING_ROTATION: 2000,      // Greeting text rotation interval
  GREETING_FADE: 300,           // Greeting fade transition
  WHEEL_TIMEOUT: 10,            // Wheel event debounce
  TOUCH_THRESHOLD: 50,          // Minimum touch distance for swipe
  TOUCH_TIME_LIMIT: 500         // Maximum touch time for swipe
};

// Section counts for each page
export const SECTIONS = {
  MAIN: 6,          // brandon_website.html
  WORK: 5,          // work.html
  IBG_CASE_STUDY: 10,      // IBG_Case_Study.html
  CURBSIDE_CASE_STUDY: 13  // curbside_case_study.html
};

// Cursor configuration
export const CURSOR = {
  SNAP_DISTANCE: 50,      // Maximum distance for magnetic snap
  SNAP_STRENGTH: 0.5,     // Strength of magnetic snap (0-1)
  EASING: 0.15,           // Smooth follow easing
  DIRECT_OVER_DISTANCE: 100,  // Distance for direct hover detection
  DEFAULT_SIZE: 20,       // Default cursor size in px
  HOVER_SIZE: 50          // Cursor size when hovering in px
};

// Navbar configuration
export const NAVBAR = {
  SHOW_THRESHOLD: 100,    // Mouse Y position to show navbar
  HIDE_THRESHOLD: 150     // Mouse Y position to hide navbar
};

// Multilingual greetings
export const GREETINGS = [
  'Hi',           // English
  'Hola',         // Spanish
  'Bonjour',      // French
  'Ciao',         // Italian
  'Hallo',        // German
  'Olá',          // Portuguese
  'Привет',       // Russian
  'こんにちは',      // Japanese
  '你好',          // Chinese
  '안녕하세요',      // Korean
  'Grüetzi',      // Swiss German
  'Hej',          // Swedish
  'Merhaba',      // Turkish
  'Namaste',      // Hindi
  'Sawubona'      // Zulu
];

// Responsive breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

// Theme storage key
export const THEME_STORAGE_KEY = 'theme';

// Theme values
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};
