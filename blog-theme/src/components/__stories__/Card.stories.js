export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'featured', 'simple', 'error', 'success', 'warning', 'info'],
      description: 'Card variant',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is interactive',
    },
  },
};

const createCard = ({ 
  variant = 'default', 
  interactive = true,
  title = 'Card Title',
  description = 'This is a card component with design system tokens applied.',
  showAction = true
}) => {
  const card = document.createElement('div');
  
  const variants = {
    default: {
      container: 'bg-surface-card border border-surface-border',
      title: 'text-surface-foreground',
      description: 'text-surface-mutedForeground',
      badge: null,
    },
    featured: {
      container: 'bg-primary-50 border-2 border-primary-200',
      title: 'text-primary-700',
      description: 'text-primary-600',
      badge: '<span class="inline-block px-3 py-1 text-caption font-body font-semibold bg-primary-500 text-white rounded-full mb-3">Featured</span>',
    },
    simple: {
      container: 'bg-surface-card',
      title: 'text-surface-foreground',
      description: 'text-surface-mutedForeground',
      badge: null,
      simple: true,
    },
    error: {
      container: 'bg-error/5 border border-error',
      title: 'text-error',
      description: 'text-error/80',
      icon: '<svg class="w-5 h-5 text-error flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
    },
    success: {
      container: 'bg-success/5 border border-success',
      title: 'text-success',
      description: 'text-success/80',
      icon: '<svg class="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
    },
    warning: {
      container: 'bg-warning/5 border border-warning',
      title: 'text-warning',
      description: 'text-warning/80',
      icon: '<svg class="w-5 h-5 text-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>',
    },
    info: {
      container: 'bg-info/5 border border-info',
      title: 'text-info',
      description: 'text-info/80',
      icon: '<svg class="w-5 h-5 text-info flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>',
    },
  };

  const config = variants[variant];
  
  const interactiveClasses = interactive && !config.simple
    ? 'card-interactive transition-shadow duration-normal ease-default hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2'
    : '';

  const shadow = config.simple ? 'shadow-sm' : 'shadow-md';
  const padding = config.simple ? 'p-4' : 'p-6';
  const rounded = config.simple ? 'rounded-md' : 'rounded-lg';

  card.className = `${config.container} ${rounded} ${padding} ${shadow} ${interactiveClasses}`.trim();
  
  if (config.icon) {
    card.innerHTML = `
      <div class="flex items-start gap-3">
        ${config.icon}
        <div>
          <h4 class="text-h6 font-heading ${config.title} mb-2">${title}</h4>
          <p class="text-body-sm font-body ${config.description}">${description}</p>
        </div>
      </div>
    `;
  } else {
    const titleSize = config.simple ? 'text-h5' : variant === 'featured' ? 'text-h3' : 'text-h4';
    card.innerHTML = `
      ${config.badge || ''}
      <h3 class="${titleSize} font-heading ${config.title} mb-3">${title}</h3>
      <p class="text-body font-body ${config.description} mb-4">${description}</p>
      ${showAction && !config.simple ? '<button class="btn px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">Action</button>' : ''}
    `;
  }

  return card.outerHTML;
};

// Default story
export const Default = {
  args: {
    variant: 'default',
    interactive: true,
  },
  render: (args) => createCard(args),
};

// Variant stories
export const DefaultCard = {
  render: () => createCard({ variant: 'default' }),
};

export const FeaturedCard = {
  render: () => createCard({ 
    variant: 'featured',
    title: 'Featured Card',
    description: 'This is a featured card with elevated styling and emphasis.',
  }),
};

export const SimpleCard = {
  render: () => createCard({ 
    variant: 'simple',
    title: 'Simple Card',
    description: 'A minimal card without interaction states.',
    interactive: false,
    showAction: false,
  }),
};

export const ErrorCard = {
  render: () => createCard({ 
    variant: 'error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    showAction: false,
  }),
};

export const SuccessCard = {
  render: () => createCard({ 
    variant: 'success',
    title: 'Success',
    description: 'Your action was completed successfully.',
    showAction: false,
  }),
};

export const WarningCard = {
  render: () => createCard({ 
    variant: 'warning',
    title: 'Warning',
    description: 'Please review this information carefully.',
    showAction: false,
  }),
};

export const InfoCard = {
  render: () => createCard({ 
    variant: 'info',
    title: 'Information',
    description: 'Here is some helpful information for you.',
    showAction: false,
  }),
};

// State showcase
export const AllVariants = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    container.innerHTML = `
      ${createCard({ variant: 'default', title: 'Default Card' })}
      ${createCard({ variant: 'featured', title: 'Featured Card' })}
      ${createCard({ variant: 'simple', title: 'Simple Card', showAction: false })}
      ${createCard({ variant: 'error', title: 'Error', description: 'Something went wrong.', showAction: false })}
      ${createCard({ variant: 'success', title: 'Success', description: 'Action completed!', showAction: false })}
      ${createCard({ variant: 'info', title: 'Info', description: 'Helpful information.', showAction: false })}
    `;
    return container.outerHTML;
  },
};

// Responsive showcase
export const ResponsiveGrid = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6';
    
    const cards = [];
    for (let i = 1; i <= 6; i++) {
      cards.push(createCard({ 
        variant: i % 2 === 0 ? 'featured' : 'default',
        title: `Card ${i}`,
        description: `This is card number ${i} with responsive grid layout.`,
      }));
    }
    
    container.innerHTML = cards.join('');
    return container.outerHTML;
  },
};

// Long content overflow test
export const LongContent = {
  render: () => createCard({
    variant: 'default',
    title: 'Card with Very Long Title That Might Wrap to Multiple Lines in Smaller Viewports',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
};

// Empty state
export const EmptyState = {
  render: () => {
    const card = document.createElement('div');
    card.className = 'bg-surface-card border border-surface-border rounded-lg p-8 shadow-md text-center';
    card.innerHTML = `
      <svg class="w-16 h-16 mx-auto text-surface-mutedForeground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
      </svg>
      <h3 class="text-h4 font-heading text-surface-foreground mb-2">No items found</h3>
      <p class="text-body text-surface-mutedForeground mb-6">Get started by creating your first item.</p>
      <button class="btn px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">Create Item</button>
    `;
    return card.outerHTML;
  },
};
