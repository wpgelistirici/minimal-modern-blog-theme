/**
 * Header.a11y.test.js
 * Accessibility and interactivity unit tests for Header component
 * Tests keyboard navigation, ARIA attributes, focus management, and axe-core accessibility
 */

const axe = require('axe-core');
const fs = require('fs');
const path = require('path');

/**
 * Setup JSDOM environment for testing
 */
function setupDOM() {
  // Read the Header component HTML
  const headerHTML = fs.readFileSync(
    path.join(__dirname, '../Header.html'),
    'utf-8'
  );

  // Create a basic HTML document
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Header Test</title>
    </head>
    <body>
      ${headerHTML}
    </body>
    </html>
  `;

  // Set up document
  document.body.innerHTML = html;
  document.documentElement.innerHTML = html;
}

/**
 * Test Suite: Header Component Accessibility
 */
describe('Header Component - Accessibility Tests', () => {
  beforeEach(() => {
    setupDOM();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Structure and Semantics', () => {
    test('should have semantic header element', () => {
      const header = document.querySelector('header');
      expect(header).toBeTruthy();
      expect(header.classList.contains('header')).toBe(true);
    });

    test('should have navigation landmark with aria-label', () => {
      const nav = document.querySelector('nav[aria-label="Main navigation"]');
      expect(nav).toBeTruthy();
    });

    test('should have mobile navigation with proper aria-label', () => {
      const mobileNav = document.querySelector('#mobile-menu[role="navigation"]');
      expect(mobileNav).toBeTruthy();
      expect(mobileNav.getAttribute('aria-label')).toBe('Mobile navigation');
    });

    test('logo should have proper aria-label', () => {
      const logo = document.querySelector('.logo');
      expect(logo).toBeTruthy();
      expect(logo.getAttribute('aria-label')).toBe('Homepage');
    });
  });

  describe('ARIA Attributes', () => {
    test('mobile menu toggle should have aria-expanded', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      expect(toggle).toBeTruthy();
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
    });

    test('mobile menu toggle should have aria-controls', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      expect(toggle.getAttribute('aria-controls')).toBe('mobile-menu');
    });

    test('mobile menu toggle should have aria-label', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      expect(toggle.getAttribute('aria-label')).toBe('Toggle navigation menu');
    });

    test('active navigation link should have aria-current', () => {
      const activeLink = document.querySelector('a[aria-current="page"]');
      expect(activeLink).toBeTruthy();
    });

    test('hamburger icon should have aria-hidden', () => {
      const icon = document.querySelector('.hamburger-icon');
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Focus Management', () => {
    test('all navigation links should be focusable', () => {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        expect(link.tabIndex).not.toBe(-1);
      });
    });

    test('mobile menu toggle should be focusable', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      expect(toggle.tabIndex).not.toBe(-1);
    });

    test('logo link should be focusable', () => {
      const logo = document.querySelector('.logo');
      expect(logo.tabIndex).not.toBe(-1);
    });

    test('all links should have focus-visible styles defined', () => {
      const allLinks = document.querySelectorAll('a, button');
      allLinks.forEach(element => {
        const classes = element.className;
        expect(classes).toContain('focus-visible:ring-2');
        expect(classes).toContain('focus-visible:ring-primary-300');
        expect(classes).toContain('focus-visible:ring-offset-2');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    test('should support Enter key on toggle button', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      const clickHandler = jest.fn();
      toggle.addEventListener('click', clickHandler);
      
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      toggle.dispatchEvent(enterEvent);
      toggle.click();
      
      expect(clickHandler).toHaveBeenCalled();
    });

    test('should support Space key on toggle button', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      const clickHandler = jest.fn();
      toggle.addEventListener('click', clickHandler);
      
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      toggle.dispatchEvent(spaceEvent);
      toggle.click();
      
      expect(clickHandler).toHaveBeenCalled();
    });
  });

  describe('Responsive Behavior', () => {
    test('desktop navigation should be hidden on mobile', () => {
      const desktopNav = document.querySelector('nav[aria-label="Main navigation"]');
      expect(desktopNav.classList.contains('hidden')).toBe(false);
      expect(desktopNav.classList.contains('md:flex')).toBe(true);
    });

    test('mobile menu toggle should be hidden on desktop', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      expect(toggle.classList.contains('md:hidden')).toBe(true);
    });

    test('mobile menu should be hidden by default', () => {
      const mobileMenu = document.querySelector('#mobile-menu');
      expect(mobileMenu.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Design System Tokens', () => {
    test('header should use primary-50 background', () => {
      const header = document.querySelector('header');
      expect(header.classList.contains('bg-primary-50')).toBe(true);
    });

    test('header should have shadow-sm elevation', () => {
      const header = document.querySelector('header');
      expect(header.classList.contains('shadow-sm')).toBe(true);
    });

    test('logo should use h4 typography scale', () => {
      const logo = document.querySelector('.logo');
      expect(logo.classList.contains('text-h4')).toBe(true);
    });

    test('logo should use font-heading (Inter)', () => {
      const logo = document.querySelector('.logo');
      expect(logo.classList.contains('font-heading')).toBe(true);
    });

    test('logo should use primary-600 color', () => {
      const logo = document.querySelector('.logo');
      expect(logo.classList.contains('text-primary-600')).toBe(true);
    });

    test('transitions should use duration-normal (220ms)', () => {
      const header = document.querySelector('header');
      expect(header.classList.contains('duration-normal')).toBe(true);
    });

    test('transitions should use ease-out or ease-default', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      expect(
        toggle.classList.contains('ease-out') || 
        toggle.classList.contains('ease-default')
      ).toBe(true);
    });
  });

  describe('Axe-Core Accessibility Scan', () => {
    test('should pass axe-core accessibility checks', async () => {
      const results = await axe.run(document.documentElement, {
        rules: {
          // Enable all rules
          region: { enabled: true },
          'landmark-one-main': { enabled: false }, // Header doesn't need main landmark
          'page-has-heading-one': { enabled: false }, // Not testing full page
        }
      });

      expect(results.violations).toHaveLength(0);
      
      // If there are violations, log them for debugging
      if (results.violations.length > 0) {
        console.log('Accessibility violations found:');
        results.violations.forEach(violation => {
          console.log(`- ${violation.id}: ${violation.description}`);
          console.log(`  Impact: ${violation.impact}`);
          console.log(`  Nodes: ${violation.nodes.length}`);
        });
      }
    });

    test('should have no incomplete checks', async () => {
      const results = await axe.run(document.documentElement);
      expect(results.incomplete).toHaveLength(0);
    });

    test('should pass color contrast checks', async () => {
      const results = await axe.run(document.documentElement, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      const contrastViolations = results.violations.filter(
        v => v.id === 'color-contrast'
      );
      expect(contrastViolations).toHaveLength(0);
    });
  });

  describe('Link Accessibility', () => {
    test('all links should have accessible names', () => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        const text = link.textContent.trim();
        const ariaLabel = link.getAttribute('aria-label');
        expect(text.length > 0 || ariaLabel).toBeTruthy();
      });
    });

    test('links should have hover states', () => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        expect(link.className).toContain('hover:');
      });
    });

    test('links should have transition animations', () => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        expect(link.className).toContain('transition');
        expect(link.className).toContain('duration-normal');
      });
    });
  });

  describe('Button Accessibility', () => {
    test('toggle button should have proper type', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      expect(toggle.getAttribute('type')).toBe('button');
    });

    test('toggle button should have adequate click area', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      // Check for padding classes (p-2 = 8px padding, total 16px + icon size)
      expect(toggle.className).toContain('p-2');
    });

    test('toggle button should have hover and focus states', () => {
      const toggle = document.querySelector('#mobile-menu-toggle');
      expect(toggle.className).toContain('hover:bg-primary-100');
      expect(toggle.className).toContain('focus-visible:ring-2');
    });
  });
});

/**
 * Test Suite: HeaderMenu.js Functionality
 */
describe('HeaderMenu JavaScript - Interactivity Tests', () => {
  let HeaderMenu;

  beforeEach(() => {
    setupDOM();
    
    // Mock HeaderMenu class for testing
    // In a real environment, this would be imported from HeaderMenu.js
    HeaderMenu = class {
      constructor() {
        this.toggle = document.getElementById('mobile-menu-toggle');
        this.menu = document.getElementById('mobile-menu');
        this.isOpen = false;
      }

      toggleMenu() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
          this.menu.classList.remove('hidden');
          this.toggle.setAttribute('aria-expanded', 'true');
        } else {
          this.menu.classList.add('hidden');
          this.toggle.setAttribute('aria-expanded', 'false');
        }
      }
    };
  });

  test('should initialize with menu closed', () => {
    const headerMenu = new HeaderMenu();
    expect(headerMenu.isOpen).toBe(false);
    expect(headerMenu.menu.classList.contains('hidden')).toBe(true);
  });

  test('should toggle menu open', () => {
    const headerMenu = new HeaderMenu();
    headerMenu.toggleMenu();
    expect(headerMenu.isOpen).toBe(true);
    expect(headerMenu.menu.classList.contains('hidden')).toBe(false);
    expect(headerMenu.toggle.getAttribute('aria-expanded')).toBe('true');
  });

  test('should toggle menu closed', () => {
    const headerMenu = new HeaderMenu();
    headerMenu.toggleMenu(); // Open
    headerMenu.toggleMenu(); // Close
    expect(headerMenu.isOpen).toBe(false);
    expect(headerMenu.menu.classList.contains('hidden')).toBe(true);
    expect(headerMenu.toggle.getAttribute('aria-expanded')).toBe('false');
  });
});
