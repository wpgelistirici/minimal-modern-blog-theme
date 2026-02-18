export default {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'with-icon', 'error', 'success', 'disabled'],
      description: 'Input variant',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'search', 'number', 'textarea'],
      description: 'Input type',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder',
    },
  },
};

const createInput = ({
  variant = 'default',
  type = 'text',
  label = 'Input Label',
  placeholder = 'Enter text...',
  value = '',
  message = '',
}) => {
  const container = document.createElement('div');
  container.className = 'w-full max-w-md';

  const labelEl = document.createElement('label');
  labelEl.className = `block text-body-sm font-body font-medium mb-2 ${
    variant === 'disabled' ? 'text-surface-mutedForeground' : 'text-surface-foreground'
  }`;
  labelEl.textContent = label;

  const variants = {
    default: {
      inputClass: 'border border-surface-border hover:border-primary-300 focus:border-primary-500 focus:ring-primary-300',
      bgClass: 'bg-surface-background',
      textClass: 'text-surface-foreground',
    },
    'with-icon': {
      inputClass: 'border border-surface-border hover:border-primary-300 focus:border-primary-500 focus:ring-primary-300',
      bgClass: 'bg-surface-background',
      textClass: 'text-surface-foreground',
      icon: true,
    },
    error: {
      inputClass: 'border-2 border-error hover:border-error focus:border-error focus:ring-error',
      bgClass: 'bg-surface-background',
      textClass: 'text-surface-foreground',
      message: message || 'Please enter a valid value.',
      messageClass: 'text-error',
    },
    success: {
      inputClass: 'border-2 border-success hover:border-success focus:border-success focus:ring-success',
      bgClass: 'bg-surface-background',
      textClass: 'text-surface-foreground',
      message: message || 'Looks good!',
      messageClass: 'text-success',
    },
    disabled: {
      inputClass: 'border border-surface-border opacity-50 cursor-not-allowed',
      bgClass: 'bg-surface-muted',
      textClass: 'text-surface-mutedForeground',
      disabled: true,
    },
  };

  const config = variants[variant];

  if (config.icon) {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative';

    const iconDiv = document.createElement('div');
    iconDiv.className = 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none';
    iconDiv.innerHTML = `
      <svg class="h-5 w-5 text-surface-mutedForeground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    `;

    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.value = value;
    input.className = `
      input w-full pl-10 pr-4 py-3
      ${config.bgClass} ${config.textClass} font-body text-body
      ${config.inputClass} rounded-md shadow-sm
      transition-colors duration-normal ease-default
      focus:outline-none focus:ring-2
      placeholder:text-surface-mutedForeground
    `.trim().replace(/\s+/g, ' ');

    wrapper.appendChild(iconDiv);
    wrapper.appendChild(input);
    container.appendChild(labelEl);
    container.appendChild(wrapper);
  } else if (type === 'textarea') {
    const textarea = document.createElement('textarea');
    textarea.rows = 4;
    textarea.placeholder = placeholder;
    textarea.value = value;
    textarea.disabled = config.disabled || false;
    textarea.className = `
      input w-full px-4 py-3
      ${config.bgClass} ${config.textClass} font-body text-body
      ${config.inputClass} rounded-md shadow-sm
      transition-colors duration-normal ease-default
      focus:outline-none focus:ring-2
      placeholder:text-surface-mutedForeground
      resize-y
    `.trim().replace(/\s+/g, ' ');

    container.appendChild(labelEl);
    container.appendChild(textarea);
  } else {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.value = value;
    input.disabled = config.disabled || false;
    input.className = `
      input w-full px-4 py-3
      ${config.bgClass} ${config.textClass} font-body text-body
      ${config.inputClass} rounded-md shadow-sm
      transition-colors duration-normal ease-default
      focus:outline-none focus:ring-2
      placeholder:text-surface-mutedForeground
    `.trim().replace(/\s+/g, ' ');

    container.appendChild(labelEl);
    container.appendChild(input);
  }

  if (config.message) {
    const messageEl = document.createElement('p');
    messageEl.className = `mt-2 text-body-sm ${config.messageClass}`;
    messageEl.textContent = config.message;
    container.appendChild(messageEl);
  }

  return container.outerHTML;
};

// Default story
export const Default = {
  args: {
    variant: 'default',
    type: 'text',
    label: 'Input Label',
    placeholder: 'Enter text...',
  },
  render: (args) => createInput(args),
};

// Variant stories
export const DefaultInput = {
  render: () => createInput({ variant: 'default', label: 'Default Input' }),
};

export const WithIcon = {
  render: () => createInput({ 
    variant: 'with-icon', 
    label: 'Search Input',
    placeholder: 'Search...',
  }),
};

export const ErrorState = {
  render: () => createInput({ 
    variant: 'error', 
    label: 'Email Address',
    type: 'email',
    value: 'invalid-email',
    message: 'Please enter a valid email address.',
  }),
};

export const SuccessState = {
  render: () => createInput({ 
    variant: 'success', 
    label: 'Email Address',
    type: 'email',
    value: 'user@example.com',
    message: 'Email looks good!',
  }),
};

export const DisabledState = {
  render: () => createInput({ 
    variant: 'disabled', 
    label: 'Disabled Input',
    value: 'Cannot edit this',
  }),
};

export const TextareaInput = {
  render: () => createInput({ 
    variant: 'default', 
    type: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message...',
  }),
};

// Type variations
export const EmailInput = {
  render: () => createInput({ 
    type: 'email',
    label: 'Email Address',
    placeholder: 'you@example.com',
  }),
};

export const PasswordInput = {
  render: () => createInput({ 
    type: 'password',
    label: 'Password',
    placeholder: '••••••••',
  }),
};

export const NumberInput = {
  render: () => createInput({ 
    type: 'number',
    label: 'Age',
    placeholder: '25',
  }),
};

// All variants showcase
export const AllVariants = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'space-y-6';
    container.innerHTML = `
      ${createInput({ variant: 'default', label: 'Default Input' })}
      ${createInput({ variant: 'with-icon', label: 'Search Input', placeholder: 'Search...' })}
      ${createInput({ variant: 'error', label: 'Error State', value: 'invalid', message: 'This field has an error.' })}
      ${createInput({ variant: 'success', label: 'Success State', value: 'valid@example.com', message: 'Looks good!' })}
      ${createInput({ variant: 'disabled', label: 'Disabled State', value: 'Cannot edit' })}
      ${createInput({ type: 'textarea', label: 'Textarea', placeholder: 'Enter message...' })}
    `;
    return container.outerHTML;
  },
};

// Form example
export const FormExample = {
  render: () => {
    const form = document.createElement('form');
    form.className = 'space-y-6 max-w-md';
    form.innerHTML = `
      ${createInput({ label: 'Full Name', placeholder: 'John Doe' })}
      ${createInput({ type: 'email', label: 'Email Address', placeholder: 'john@example.com' })}
      ${createInput({ type: 'password', label: 'Password', placeholder: '••••••••' })}
      ${createInput({ type: 'textarea', label: 'Bio', placeholder: 'Tell us about yourself...' })}
      <div class="flex gap-3">
        <button type="submit" class="btn px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
          Submit
        </button>
        <button type="button" class="btn px-6 py-2 bg-transparent text-primary-500 border border-primary-500 rounded-md hover:bg-primary-50">
          Cancel
        </button>
      </div>
    `;
    return form.outerHTML;
  },
};

// Responsive showcase
export const ResponsiveForm = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'w-full';
    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        ${createInput({ label: 'First Name', placeholder: 'John' })}
        ${createInput({ label: 'Last Name', placeholder: 'Doe' })}
      </div>
      <div class="mt-6">
        ${createInput({ type: 'email', label: 'Email Address', placeholder: 'john@example.com' })}
      </div>
    `;
    return container.outerHTML;
  },
};

// Focus and hover states
export const FocusStates = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'space-y-6';
    container.innerHTML = `
      <div>
        <p class="text-body-sm text-surface-mutedForeground mb-4">Try tabbing through these inputs to see the focus ring:</p>
        ${createInput({ label: 'Input 1', placeholder: 'Tab to focus' })}
      </div>
      <div>
        ${createInput({ label: 'Input 2', placeholder: 'Tab to focus' })}
      </div>
      <div>
        ${createInput({ label: 'Input 3', placeholder: 'Tab to focus' })}
      </div>
    `;
    return container.outerHTML;
  },
};
