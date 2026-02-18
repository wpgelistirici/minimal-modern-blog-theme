# Color Token System - Minimal Modern Blog Theme

This document describes the color token system implemented for the minimal modern blog theme.

## Overview

The color token system follows a three-tier hierarchy:
1. **Primitive colors**: Base color scales (primary, secondary, accent, neutral)
2. **Semantic colors**: Purpose-based colors (success, error, warning, info)
3. **Surface aliases**: Context-based colors (background, card, border, etc.)

## File Structure

```
blog-theme/
├── src/
│   └── styles/
│       ├── tokens/
│       │   └── colors.json       # Central color token definitions
│       └── tailwind.css           # Tailwind imports and custom utilities
├── tailwind.config.js             # Tailwind configuration with color mapping
└── postcss.config.js              # PostCSS configuration
```

## Color Token Definitions

### Primitive Colors

All primitive colors use an 11-step scale (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950):

#### Primary (#48628b)
- Main brand color for primary actions and key elements
- Scale: `#f0f4f8` (50) to `#070a0e` (950)
- Main shade: `500` (#48628b)
- Hover shade: `600` (#3a4c6c)

#### Secondary (#507b6f)
- Supporting brand color for secondary actions
- Scale: `#f0f5f4` (50) to `#080c0c` (950)
- Main shade: `500` (#507b6f)
- Hover shade: `600` (#3e6057)

#### Accent (#c07247)
- Accent color for highlights and emphasis
- Scale: `#fdf6f2` (50) to `#1f110a` (950)
- Main shade: `500` (#c07247)
- Hover shade: `600` (#a15b35)

#### Neutral
- Grayscale for text, borders, and backgrounds
- Scale: `#fafafa` (50) to `#0a0a0a` (950)

### Semantic Colors

Purpose-based colors with light, default, and dark variants:

- **Success**: `#0f7d4f` - Positive actions and confirmations
- **Error**: `#d13b3b` - Errors and destructive actions
- **Warning**: `#ffbb23` - Warnings and cautions
- **Info**: `#2fa3d1` - Informational messages

### Surface Aliases

Context-aware colors that adapt to light/dark mode:

- `surface.background` - Main page background
- `surface.foreground` - Main text color
- `surface.card` - Card background
- `surface.cardForeground` - Card text color
- `surface.border` - Border color
- `surface.muted` - Muted background
- `surface.mutedForeground` - Muted text color

## Usage Examples

### Tailwind Utility Classes

```html
<!-- Primitive colors -->
<div class="bg-primary-500 text-white">Primary button</div>
<div class="bg-secondary-600 hover:bg-secondary-700">Secondary element</div>
<div class="border-accent-400">Accent border</div>

<!-- Semantic colors -->
<div class="bg-success text-white">Success message</div>
<div class="bg-error-light text-error-dark">Error alert</div>

<!-- Surface aliases -->
<div class="bg-surface-background text-surface-foreground">Main content</div>
<div class="bg-surface-card border border-surface-border">Card</div>
<p class="text-surface-mutedForeground">Muted text</p>
```

### Dark Mode Support

Toggle dark mode by adding the `dark` class to the root element:

```javascript
document.documentElement.classList.toggle('dark');
```

Surface colors automatically adapt:
```html
<!-- Automatically adjusts in dark mode -->
<div class="bg-surface-background text-surface-foreground">
  Content that works in both light and dark modes
</div>
```

## WCAG AA Compliance

All color combinations have been designed to meet WCAG AA contrast ratio requirements (4.5:1 for normal text):

- `surface.background` + `surface.foreground`: High contrast ✓
- `surface.card` + `surface.cardForeground`: High contrast ✓
- `primary-500` + white text: High contrast ✓
- `secondary-500` + white text: High contrast ✓
- All semantic colors with appropriate text colors: High contrast ✓

## Configuration

### Tailwind Config

The `tailwind.config.js` imports colors from `colors.json` and extends the theme:

```javascript
import colors from './src/styles/tokens/colors.json' assert { type: 'json' };

export default {
  theme: {
    extend: {
      colors: {
        primary: colors.primitive.primary,
        secondary: colors.primitive.secondary,
        // ... other color mappings
      }
    }
  }
}
```

### Safelist

To ensure all color utilities are generated (even if not used in initial templates), the config includes a safelist:

```javascript
safelist: [
  {
    pattern: /bg-(primary|secondary|accent|neutral)-(50|100|200|...)/,
  },
  // ... other patterns
]
```

## Adding New Colors

To add a new color:

1. Add it to `src/styles/tokens/colors.json`
2. Map it in `tailwind.config.js`
3. Add it to the safelist pattern if needed
4. Rebuild with `npm run build`

## Testing

Open `src/pages/index.html` in a browser to see all color tokens in action:

```bash
npm run dev
```

Then visit the dev server URL and test:
- All primitive color scales
- Semantic colors (success, error, warning, info)
- Surface aliases
- Dark mode toggle
- Component examples

## Design System Principles

1. **Consistency**: Use tokens, never hardcoded hex values
2. **Accessibility**: All combinations meet WCAG AA standards
3. **Flexibility**: Dark mode support built-in
4. **Scalability**: Easy to extend with new colors
5. **Maintainability**: Single source of truth in `colors.json`
