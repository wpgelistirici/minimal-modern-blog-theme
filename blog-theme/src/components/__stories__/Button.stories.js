export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'outline', 'ghost'],
      description: 'Button variant',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'focus', 'disabled', 'loading'],
      description: 'Button state',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    label: {
      control: 'text',
      description: 'Button text',
    },
  },
};

// Size configurations
const sizes = {
  sm: 'px-3 py-1.5 text-body-sm',
  md: 'px-4 py-2 text-body',
  lg: 'px-6 py-3 text-body-lg',
};

// Variant configurations
const variants = {
  primary: {
    base: 'bg-primary-500 text-white',
    hover: 'hover:bg-primary-600',
    active: 'active:bg-primary-700',
    focus: 'focus-visible:ring-primary-300',
  },
  secondary: {
    base: 'bg-secondary-500 text-white',
    hover: 'hover:bg-secondary-600',
    active: 'active:bg-secondary-700',
    focus: 'focus-visible:ring-secondary-300',
  },
  accent: {
    base: 'bg-accent-500 text-white',
    hover: 'hover:bg-accent-600',
    active: 'active:bg-accent-700',
    focus: 'focus-visible:ring-accent-300',
  },
  outline: {
    base: 'bg-transparent text-primary-500 border border-primary-500',
    hover: 'hover:bg-primary-50',
    active: 'active:bg-primary-100',
    focus: 'focus-visible:ring-primary-300',
  },
  ghost: {
    base: 'bg-transparent text-primary-500',
    hover: 'hover:bg-primary-50',
    active: 'active:bg-primary-100',
    focus: 'focus-visible:ring-primary-300',
  },
};

const createButton = ({ variant = 'primary', size = 'md', label = 'Button', state = 'default' }) => {
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];
  const isDisabled = state === 'disabled';
  const isLoading = state === 'loading';
  
  let stateClasses = '';
  if (state === 'hover') stateClasses = 'hover-simulation';
  if (state === 'active') stateClasses = 'active-simulation';
  if (state === 'focus') stateClasses = 'focus-visible-simulation';

  const button = document.createElement('button');
  button.type = 'button';
  button.disabled = isDisabled;
  button.className = `
    btn inline-flex items-center justify-center gap-2
    ${variantClasses.base}
    ${sizeClasses}
    rounded-md shadow-sm
    transition-all duration-normal ease-default
    ${variantClasses.hover} hover:shadow-md hover:scale-[1.02]
    ${variantClasses.active} active:scale-[0.98] active:shadow-sm
    focus-visible:outline-none focus-visible:ring-2 ${variantClasses.focus} focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${stateClasses}
  `.trim().replace(/\s+/g, ' ');

  if (isLoading) {
    button.innerHTML = `
      <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading...
    `;
  } else {
    button.textContent = label;
  }

  return button.outerHTML;
};

// Default story
export const Default = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Button',
    state: 'default',
  },
  render: (args) => createButton(args),
};

// Primary variants
export const Primary = {
  render: () => createButton({ variant: 'primary', label: 'Primary Button' }),
};

export const Secondary = {
  render: () => createButton({ variant: 'secondary', label: 'Secondary Button' }),
};

export const Accent = {
  render: () => createButton({ variant: 'accent', label: 'Accent Button' }),
};

export const Outline = {
  render: () => createButton({ variant: 'outline', label: 'Outline Button' }),
};

export const Ghost = {
  render: () => createButton({ variant: 'ghost', label: 'Ghost Button' }),
};

// Size variants
export const Small = {
  render: () => createButton({ size: 'sm', label: 'Small Button' }),
};

export const Medium = {
  render: () => createButton({ size: 'md', label: 'Medium Button' }),
};

export const Large = {
  render: () => createButton({ size: 'lg', label: 'Large Button' }),
};

// State variants
export const Hover = {
  render: () => createButton({ state: 'hover', label: 'Hover State' }),
};

export const Active = {
  render: () => createButton({ state: 'active', label: 'Active State' }),
};

export const Focus = {
  render: () => createButton({ state: 'focus', label: 'Focus State' }),
};

export const Disabled = {
  render: () => createButton({ state: 'disabled', label: 'Disabled Button' }),
};

export const Loading = {
  render: () => createButton({ state: 'loading', label: 'Loading' }),
};

// All variants showcase
export const AllVariants = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'space-y-8';
    
    const variantNames = ['primary', 'secondary', 'accent', 'outline', 'ghost'];
    
    variantNames.forEach(variant => {
      const section = document.createElement('div');
      section.className = 'space-y-4';
      
      const title = document.createElement('h3');
      title.className = 'text-h5 font-heading capitalize mb-4';
      title.textContent = `${variant} Variant`;
      section.appendChild(title);
      
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'flex flex-wrap gap-4';
      buttonGroup.innerHTML = `
        ${createButton({ variant, label: 'Default' })}
        ${createButton({ variant, label: 'Small', size: 'sm' })}
        ${createButton({ variant, label: 'Large', size: 'lg' })}
        ${createButton({ variant, label: 'Disabled', state: 'disabled' })}
      `;
      section.appendChild(buttonGroup);
      container.appendChild(section);
    });
    
    return container.outerHTML;
  },
};

// Responsive showcase
export const ResponsiveShowcase = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  render: () => {
    const container = document.createElement('div');
    container.className = 'space-y-4';
    container.innerHTML = `
      <div class="bg-surface-card p-4 rounded-lg">
        <p class="text-caption text-surface-mutedForeground mb-4">Mobile View (375px)</p>
        <div class="flex flex-col gap-3">
          ${createButton({ variant: 'primary', label: 'Full Width Button' })}
          ${createButton({ variant: 'secondary', label: 'Full Width Button' })}
        </div>
      </div>
    `;
    return container.outerHTML;
  },
};
