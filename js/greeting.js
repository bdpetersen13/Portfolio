/**
 * Greeting Module
 * Rotates through multilingual greetings
 */

import { GREETINGS, TIMING } from './constants.js';

export class GreetingRotator {
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

  /**
   * Initialize greeting rotation
   */
  init() {
    // Set initial transition style
    this.greetingElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    // Start rotation interval
    setInterval(() => this.rotate(), TIMING.GREETING_ROTATION);
  }

  /**
   * Rotate to next greeting with fade animation
   */
  rotate() {
    // Fade out
    this.greetingElement.style.opacity = '0';
    this.greetingElement.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      // Change text
      this.currentIndex = (this.currentIndex + 1) % this.greetings.length;
      this.greetingElement.textContent = this.greetings[this.currentIndex];

      // Fade in
      this.greetingElement.style.opacity = '1';
      this.greetingElement.style.transform = 'translateY(0)';
    }, TIMING.GREETING_FADE);
  }

  /**
   * Set specific greeting
   * @param {number} index - Index of greeting to display
   */
  setGreeting(index) {
    if (index >= 0 && index < this.greetings.length) {
      this.currentIndex = index;
      this.greetingElement.textContent = this.greetings[this.currentIndex];
    }
  }

  /**
   * Add custom greeting to rotation
   * @param {string} greeting - Greeting text to add
   */
  addGreeting(greeting) {
    this.greetings.push(greeting);
  }
}
