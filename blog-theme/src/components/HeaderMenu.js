/**
 * HeaderMenu.js
 * Vanilla JavaScript for Header navigation menu functionality
 * - Hamburger menu toggle (open/close)
 * - Keyboard navigation support (Escape key to close)
 * - Focus trap when mobile menu is open
 * - Progressive enhancement (works without JS)
 */

// Import design system tokens
import responsive from '../styles/tokens/responsive.json' with { type: 'json' };
import animations from '../styles/tokens/animations.json' with { type: 'json' };

class HeaderMenu {
  constructor() {
    this.header = document.querySelector('.header');
    this.toggle = document.getElementById('mobile-menu-toggle');
    this.menu = document.getElementById('mobile-menu');
    this.menuLinks = null;
    this.isOpen = false;
    
    // Get design system values
    this.breakpointMd = parseInt(responsive.breakpoints.md); // 768
    this.animationDuration = parseInt(animations.transitionDuration.normal); // 220ms

    if (!this.toggle || !this.menu) {
      return; // Progressive enhancement - exit if elements not found
    }

    this.init();
  }

  init() {
    // Get all focusable elements in the mobile menu
    this.menuLinks = this.menu.querySelectorAll('.mobile-nav-link');

    // Add event listeners
    this.toggle.addEventListener('click', () => this.toggleMenu());
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Handle window resize - close menu if switching to desktop
    window.addEventListener('resize', () => this.handleResize());
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
    
    // Remove hidden class first to allow height calculation
    this.menu.classList.remove('hidden');
    
    // Force a reflow to ensure the hidden class removal is applied
    void this.menu.offsetHeight;
    
    // Set maxHeight for smooth animation
    this.menu.style.maxHeight = this.menu.scrollHeight + 'px';
    
    // Update ARIA attributes
    this.toggle.setAttribute('aria-expanded', 'true');
    
    // Animate hamburger icon to X
    this.animateHamburgerToX();
    
    // Add click-outside handler only when menu is open
    this.clickOutsideHandler = (e) => this.handleClickOutside(e);
    setTimeout(() => {
      document.addEventListener('click', this.clickOutsideHandler);
    }, 0);
    
    // Focus first menu link after animation
    setTimeout(() => {
      if (this.menuLinks.length > 0) {
        this.menuLinks[0].focus();
      }
    }, this.animationDuration);
  }

  closeMenu() {
    this.isOpen = false;
    
    // Set maxHeight to 0 for smooth collapse animation
    this.menu.style.maxHeight = '0px';
    
    // Update ARIA attributes
    this.toggle.setAttribute('aria-expanded', 'false');
    
    // Animate X back to hamburger icon
    this.animateXToHamburger();
    
    // Remove click-outside handler when menu closes
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
      this.clickOutsideHandler = null;
    }
    
    // Add hidden class after animation completes
    setTimeout(() => {
      this.menu.classList.add('hidden');
      this.menu.style.maxHeight = '';
    }, this.animationDuration);
  }

  animateHamburgerToX() {
    const topLine = this.toggle.querySelector('.hamburger-line-top');
    const middleLine = this.toggle.querySelector('.hamburger-line-middle');
    const bottomLine = this.toggle.querySelector('.hamburger-line-bottom');
    
    if (topLine && middleLine && bottomLine) {
      // Transform to X shape with consistent coordinate system
      topLine.setAttribute('d', 'M4 18L20 6');
      middleLine.setAttribute('d', 'M12 12h0'); // Make middle line invisible
      bottomLine.setAttribute('d', 'M4 6L20 18');
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
    // Get focusable elements within the mobile menu (exclude toggle button)
    const menuFocusableElements = Array.from(
      this.menu.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(
      el => el.offsetParent !== null && el.getAttribute('aria-hidden') !== 'true'
    );

    // If there are no focusable elements inside the menu, prevent tabbing
    if (menuFocusableElements.length === 0) {
      e.preventDefault();
      return;
    }

    const firstFocusable = menuFocusableElements[0];
    const lastFocusable = menuFocusableElements[menuFocusableElements.length - 1];
    const activeElement = document.activeElement;
    const isActiveInMenu = this.menu.contains(activeElement);

    // If only one focusable element, keep focus there
    if (menuFocusableElements.length === 1) {
      e.preventDefault();
      firstFocusable.focus();
      return;
    }

    // Trap focus within the menu
    if (e.shiftKey) {
      // Shift + Tab
      if (!isActiveInMenu || activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (!isActiveInMenu || activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  handleClickOutside(e) {
    // Check if click is outside header
    if (!this.header.contains(e.target)) {
      this.closeMenu();
    }
  }

  handleResize() {
    // Close menu if viewport becomes desktop size
    if (window.innerWidth >= this.breakpointMd && this.isOpen) {
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

// Export for potential module usage (ES module)
export default HeaderMenu;
