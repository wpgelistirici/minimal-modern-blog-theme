export default {
  title: 'Components/Header',
  tags: ['autodocs'],
  argTypes: {
    view: {
      control: { type: 'select' },
      options: ['desktop', 'mobile'],
      description: 'View mode for testing responsive behavior',
    },
    menuOpen: {
      control: 'boolean',
      description: 'Mobile menu state (mobile view only)',
    },
  },
};

// Create the Header HTML structure
const createHeader = ({ view = 'desktop', menuOpen = false } = {}) => {
  const menuHiddenClass = menuOpen ? '' : 'hidden';
  const ariaExpanded = menuOpen ? 'true' : 'false';
  
  return `
    <header 
      class="header sticky top-0 z-50 bg-primary-50 shadow-sm
             transition-shadow duration-normal ease-default">
      <div class="container mx-auto px-4 md:px-6">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a 
            href="/" 
            class="logo flex items-center gap-2 text-h4 font-heading text-primary-600 
                   transition-colors duration-normal ease-default
                   hover:text-primary-700
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:rounded-sm"
            aria-label="Homepage">
            <span>Blog</span>
          </a>

          <!-- Desktop Navigation -->
          <nav 
            class="hidden md:flex items-center gap-6"
            aria-label="Main navigation">
            <a 
              href="/" 
              class="nav-link text-body font-body text-primary-600
                     transition-colors duration-normal ease-default
                     hover:text-primary-700 hover:underline underline-offset-4
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:rounded-sm"
              aria-current="page">
              Home
            </a>
            <a 
              href="/blog.html" 
              class="nav-link text-body font-body text-primary-600
                     transition-colors duration-normal ease-default
                     hover:text-primary-700 hover:underline underline-offset-4
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:rounded-sm">
              Blog
            </a>
            <a 
              href="/about.html" 
              class="nav-link text-body font-body text-primary-600
                     transition-colors duration-normal ease-default
                     hover:text-primary-700 hover:underline underline-offset-4
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:rounded-sm">
              About
            </a>
            <a 
              href="/contact.html" 
              class="nav-link text-body font-body text-primary-600
                     transition-colors duration-normal ease-default
                     hover:text-primary-700 hover:underline underline-offset-4
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:rounded-sm">
              Contact
            </a>
          </nav>

          <!-- Mobile Menu Toggle Button -->
          <button 
            id="mobile-menu-toggle"
            type="button"
            class="mobile-menu-toggle md:hidden inline-flex items-center justify-center p-2 rounded-md
                   text-primary-600 bg-transparent
                   transition-colors duration-normal ease-out
                   hover:bg-primary-100 hover:text-primary-700
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2"
            aria-expanded="${ariaExpanded}"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu">
            <!-- Hamburger Icon -->
            <svg 
              class="hamburger-icon w-6 h-6 transition-transform duration-normal ease-out" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path 
                class="hamburger-line-top"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="${menuOpen ? 'M4 18L20 6' : 'M4 6h16'}"/>
              <path 
                class="hamburger-line-middle"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="${menuOpen ? 'M12 12h0' : 'M4 12h16'}"/>
              <path 
                class="hamburger-line-bottom"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="${menuOpen ? 'M4 6L20 18' : 'M4 18h16'}"/>
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation Menu -->
        <div 
          id="mobile-menu"
          class="mobile-menu md:hidden ${menuHiddenClass} overflow-hidden transition-all duration-normal ease-out"
          style="${menuOpen ? 'max-height: 300px;' : ''}">
          <nav class="py-4 space-y-2" aria-label="Mobile navigation">
            <!-- NOTE: Set aria-current="page" dynamically based on the current page URL -->
            <a 
              href="/" 
              class="mobile-nav-link block px-4 py-2 text-body font-body text-primary-600 rounded-md
                     transition-colors duration-normal ease-default
                     hover:bg-primary-100 hover:text-primary-700
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2"
              aria-current="page">
              Home
            </a>
            <a 
              href="/blog.html" 
              class="mobile-nav-link block px-4 py-2 text-body font-body text-primary-600 rounded-md
                     transition-colors duration-normal ease-default
                     hover:bg-primary-100 hover:text-primary-700
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2">
              Blog
            </a>
            <a 
              href="/about.html" 
              class="mobile-nav-link block px-4 py-2 text-body font-body text-primary-600 rounded-md
                     transition-colors duration-normal ease-default
                     hover:bg-primary-100 hover:text-primary-700
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2">
              About
            </a>
            <a 
              href="/contact.html" 
              class="mobile-nav-link block px-4 py-2 text-body font-body text-primary-600 rounded-md
                     transition-colors duration-normal ease-default
                     hover:bg-primary-100 hover:text-primary-700
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  `;
};

// Default story
export const Default = {
  args: {
    view: 'desktop',
    menuOpen: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-surface-background';
    container.innerHTML = createHeader(args);
    
    // Add HeaderMenu.js functionality
    setTimeout(() => {
      import('../HeaderMenu.js');
    }, 0);
    
    return container.outerHTML;
  },
};

// Desktop view
export const Desktop = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  render: () => {
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-surface-background';
    container.innerHTML = createHeader({ view: 'desktop' });
    
    setTimeout(() => {
      import('../HeaderMenu.js');
    }, 0);
    
    return container.outerHTML;
  },
};

// Mobile view with menu closed
export const MobileClosed = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => {
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-surface-background';
    container.innerHTML = createHeader({ view: 'mobile', menuOpen: false });
    
    setTimeout(() => {
      import('../HeaderMenu.js');
    }, 0);
    
    return container.outerHTML;
  },
};

// Mobile view with menu open
export const MobileOpen = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => {
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-surface-background';
    container.innerHTML = createHeader({ view: 'mobile', menuOpen: true });
    
    return container.outerHTML;
  },
};

// With scrollable content to test sticky behavior
export const WithScrollableContent = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-surface-background';
    container.innerHTML = `
      ${createHeader({ view: 'desktop' })}
      <main class="container mx-auto px-4 md:px-6 py-12">
        <h1 class="text-h1 font-heading mb-6">Sticky Header Test</h1>
        <p class="text-body mb-6">Scroll down to see the sticky header stay at the top.</p>
        <div class="space-y-4">
          ${Array.from({ length: 10 }, (_, i) => `
            <div class="h-64 bg-primary-50 rounded-lg flex items-center justify-center">
              <p class="text-h4 font-heading text-primary-600">Section ${i + 1}</p>
            </div>
          `).join('')}
        </div>
      </main>
    `;
    
    setTimeout(() => {
      import('../HeaderMenu.js');
    }, 0);
    
    return container.outerHTML;
  },
};

// Focus states demonstration
export const FocusStates = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-surface-background';
    container.innerHTML = `
      ${createHeader({ view: 'desktop' })}
      <main class="container mx-auto px-4 md:px-6 py-12">
        <div class="bg-info/5 border border-info rounded-lg p-6">
          <h2 class="text-h3 font-heading text-info mb-4">Keyboard Navigation</h2>
          <p class="text-body mb-4">Press <kbd class="px-2 py-1 bg-neutral-200 rounded text-caption font-mono">Tab</kbd> to navigate through the header links and see focus states.</p>
          <ul class="text-body space-y-2">
            <li>• Logo has focus ring on Tab</li>
            <li>• Navigation links have focus ring</li>
            <li>• Mobile toggle button has focus ring</li>
            <li>• Press <kbd class="px-2 py-1 bg-neutral-200 rounded text-caption font-mono">Escape</kbd> to close mobile menu</li>
          </ul>
        </div>
      </main>
    `;
    
    setTimeout(() => {
      import('../HeaderMenu.js');
    }, 0);
    
    return container.outerHTML;
  },
};
