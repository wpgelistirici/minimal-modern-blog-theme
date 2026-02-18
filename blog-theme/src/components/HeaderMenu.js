/**
 * HeaderMenu.js
 * Vanilla JavaScript for Header navigation menu functionality
 * - Hamburger menu toggle (open/close)
 * - Keyboard navigation support (Escape key to close)
 * - Focus trap when mobile menu is open
 * - Progressive enhancement (works without JS)
 */

class HeaderMenu {
  constructor() {
    this.header = document.querySelector('.header');
    this.toggle = document.getElementById('mobile-menu-toggle');
    this.menu = document.getElementById('mobile-menu');
    this.menuLinks = null;
    this.isOpen = false;
    this.focusableElements = [];
    this.firstFocusable = null;
    this.lastFocusable = null;

    if (!this.toggle || !this.menu) {
      return; // Progressive enhancement - exit if elements not found
    }

    this.init();
  }

  init() {
    // Get all focusable elements in the mobile menu
    this.menuLinks = this.menu.querySelectorAll('.mobile-nav-link');
    this.updateFocusableElements();

    // Add event listeners
    this.toggle.addEventListener('click', () => this.toggleMenu());
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Close menu when clicking outside
    document.addEventListener('click', (e) => this.handleClickOutside(e));

    // Handle window resize - close menu if switching to desktop
    window.addEventListener('resize', () => this.handleResize());
  }

  updateFocusableElements() {
    // Get all focusable elements in the menu
    this.focusableElements = [
      this.toggle,
      ...Array.from(this.menuLinks)
    ].filter(el => el && !el.disabled && el.offsetParent !== null);

    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    this.menu.classList.remove('hidden');
    this.menu.style.maxHeight = this.menu.scrollHeight + 'px';
    
    // Update ARIA attributes
    this.toggle.setAttribute('aria-expanded', 'true');
    
    // Animate hamburger icon to X
    this.animateHamburgerToX();
    
    // Focus first menu link after animation
    setTimeout(() => {
      if (this.menuLinks.length > 0) {
        this.menuLinks[0].focus();
      }
    }, 220); // Match animation duration (220ms = duration-normal)
  }

  closeMenu() {
    this.isOpen = false;
    this.menu.style.maxHeight = '0px';
    
    // Update ARIA attributes
    this.toggle.setAttribute('aria-expanded', 'false');
    
    // Animate X back to hamburger icon
    this.animateXToHamburger();
    
    // Hide menu after animation
    setTimeout(() => {
      this.menu.classList.add('hidden');
    }, 220); // Match animation duration
  }

  animateHamburgerToX() {
    const icon = this.toggle.querySelector('.hamburger-icon');
    const topLine = this.toggle.querySelector('.hamburger-line-top');
    const middleLine = this.toggle.querySelector('.hamburger-line-middle');
    const bottomLine = this.toggle.querySelector('.hamburger-line-bottom');
    
    if (icon && topLine && middleLine && bottomLine) {
      // Transform to X shape
      topLine.setAttribute('d', 'M6 18L18 6');
      middleLine.setAttribute('d', 'M12 12h0'); // Make middle line invisible
      bottomLine.setAttribute('d', 'M6 6L18 18');
    }
  }

  animateXToHamburger() {
    const topLine = this.toggle.querySelector('.hamburger-line-top');
    const middleLine = this.toggle.querySelector('.hamburger-line-middle');
    const bottomLine = this.toggle.querySelector('.hamburger-line-bottom');
    
    if (topLine && middleLine && bottomLine) {
      // Transform back to hamburger
      topLine.setAttribute('d', 'M4 6h16');
      middleLine.setAttribute('d', 'M4 12h16');
      bottomLine.setAttribute('d', 'M4 18h16');
    }
  }

  handleKeyDown(e) {
    // Close menu with Escape key
    if (e.key === 'Escape' && this.isOpen) {
      this.closeMenu();
      this.toggle.focus();
      return;
    }

    // Focus trap when menu is open
    if (this.isOpen && e.key === 'Tab') {
      this.handleTabKey(e);
    }
  }

  handleTabKey(e) {
    // If only toggle button is focusable, do nothing
    if (this.focusableElements.length === 1) {
      e.preventDefault();
      return;
    }

    // Trap focus within menu
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusable) {
        e.preventDefault();
        this.lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusable) {
        e.preventDefault();
        this.firstFocusable.focus();
      }
    }
  }

  handleClickOutside(e) {
    if (!this.isOpen) return;

    // Check if click is outside header
    if (!this.header.contains(e.target)) {
      this.closeMenu();
    }
  }

  handleResize() {
    // Close menu if viewport becomes desktop size
    if (window.innerWidth >= 768 && this.isOpen) {
      this.closeMenu();
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new HeaderMenu();
  });
} else {
  // DOM already loaded
  new HeaderMenu();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeaderMenu;
}
