# Design System Token Testing Guide

This guide explains how to test and validate the design system tokens using Storybook and Playwright.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- All dependencies installed (`npm install`)

## Testing Setup

### 1. Storybook Component Testing

Storybook provides an interactive environment to view and test all component variants and states.

#### Starting Storybook

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`. You can:

- View all component variants (Button, Card, Input)
- Test different states (default, hover, focus, disabled, error, success)
- Test responsive breakpoints
- Toggle dark mode
- Check accessibility with the A11y addon

#### Building Storybook for Production

```bash
npm run build-storybook
```

This creates a static build in `storybook-static/` that can be deployed.

### 2. Visual Regression Testing with Playwright

Playwright tests validate that design tokens are correctly applied and take screenshots for visual regression testing.

#### Running All Tests

```bash
# Make sure Storybook is running first
npm run storybook

# In another terminal, run the tests
npm run test:visual
```

#### Running Tests with UI Mode

```bash
npm run test:visual:ui
```

This opens Playwright's UI mode for debugging tests.

#### Running Tests in Headed Mode

```bash
npm run test:visual:headed
```

This runs tests in a visible browser window.

#### Updating Snapshots

When you intentionally change the design, update the baseline snapshots:

```bash
npm run test:visual:update
```

## Test Coverage

### Components Tested

1. **Button Component**
   - Primary, Secondary, Accent variants
   - Outline and Ghost variants
   - Small, Medium, Large sizes
   - States: default, hover, active, focus, disabled, loading

2. **Card Component**
   - Default, Featured, Simple variants
   - Error, Success, Warning, Info states
   - Long content overflow handling
   - Empty state
   - Responsive grid layouts

3. **Input Component**
   - Default, with icon variants
   - Error, Success states
   - Disabled state
   - Textarea variant
   - Form examples
   - Focus states

### Design Tokens Validated

- **Colors**: Primary, secondary, accent, neutral, semantic colors
- **Typography**: Font families (Inter, IBM Plex Sans, Fira Mono), sizes, weights
- **Spacing**: Padding, margin, gap using design system scale
- **Borders**: Border radius tokens (none, sm, md, lg, xl, full)
- **Shadows**: Box shadow tokens (sm, md, lg, xl)
- **Transitions**: Duration and easing functions
- **Focus Rings**: Keyboard navigation focus states
- **Responsive**: Breakpoints (sm: 480px, md: 768px, lg: 1024px, xl: 1280px)

### Responsive Breakpoints Tested

All components are tested at:
- Mobile: 375px
- Small: 480px
- Tablet: 768px
- Desktop: 1024px
- Large: 1280px
- XL: 1920px

### Accessibility Testing

All components are tested for:
- WCAG AA contrast ratios
- Keyboard navigation
- Focus indicators
- ARIA attributes
- Screen reader compatibility

## Test Structure

```
blog-theme/
├── .storybook/           # Storybook configuration
│   ├── main.js          # Main config
│   └── preview.js       # Preview settings and decorators
├── src/
│   └── components/
│       ├── Button.html        # Button component
│       ├── Card.html          # Card component
│       ├── Input.html         # Input component
│       └── __stories__/       # Storybook stories
│           ├── Button.stories.js
│           ├── Card.stories.js
│           └── Input.stories.js
├── test/
│   ├── design-system-tokens.spec.js  # Playwright tests
│   └── snapshots/                     # Baseline screenshots
├── playwright.config.js  # Playwright configuration
└── package.json         # Scripts and dependencies
```

## Common Issues

### Storybook Won't Start

1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Check if port 6006 is already in use:
   ```bash
   lsof -i :6006
   ```

3. Try a different port:
   ```bash
   npx storybook dev -p 6007
   ```

### Playwright Tests Failing

1. Ensure Storybook is running before tests
2. Update snapshots if design changed intentionally:
   ```bash
   npm run test:visual:update
   ```
3. Check test output for specific errors

### Visual Regression Differences

Small differences are expected due to:
- Font rendering across platforms
- Anti-aliasing differences
- Browser version differences

The threshold is set to `0.2` (20%) to account for minor variations.

## CI/CD Integration

For continuous integration, you can:

1. Build Storybook as static files
2. Run Playwright tests against the static build
3. Store snapshots in version control
4. Fail builds on visual regressions

Example CI script:

```bash
# Install dependencies
npm ci

# Build Storybook
npm run build-storybook

# Serve static build
npx serve storybook-static -p 6006 &

# Wait for server
sleep 10

# Run tests
npm run test:visual

# Upload test results
# (implementation depends on your CI platform)
```

## Manual Testing Checklist

When adding or modifying components, verify:

- [ ] All variants render correctly in Storybook
- [ ] Interactive states work (hover, focus, active)
- [ ] Component is responsive at all breakpoints
- [ ] Dark mode works correctly
- [ ] Accessibility score is 100% (check A11y addon)
- [ ] All design tokens are applied (no hardcoded values)
- [ ] Focus ring appears only on keyboard navigation
- [ ] Disabled states have proper styling and attributes
- [ ] Error/success states have appropriate colors and messages

## Validation Scripts

In addition to visual tests, run these validation scripts:

```bash
# Validate all design tokens
npm run validate:all

# Individual validations
npm run validate:colors
npm run validate:typography
npm run validate:spacing
npm run validate:borders
npm run validate:shadows
npm run validate:animations
npm run validate:states
npm run validate:responsive
```

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/html/get-started/introduction)
- [Playwright Documentation](https://playwright.dev/)
- [Axe Accessibility Testing](https://www.deque.com/axe/)
- [Design System Tokens Documentation](../docs/design-system-tokens.md)
