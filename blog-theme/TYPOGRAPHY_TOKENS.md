# Typography Tokens

This document describes the typography system implemented in the minimal modern blog theme.

## Overview

The typography system provides a complete scale of font sizes, weights, line heights, and letter spacing values, all aligned with the design system specifications.

## Font Families

### Heading Font: Inter
- **Usage**: All headings (h1-h6, display)
- **Weights**: 400, 600, 700
- **Characteristics**: Modern, clean, highly legible sans-serif font

### Body Font: IBM Plex Sans
- **Usage**: Body text, captions, overline
- **Weights**: 400, 600, 700
- **Characteristics**: Neutral, professional, excellent readability

### Mono Font: Fira Mono
- **Usage**: Code blocks, technical text
- **Weights**: 400, 500
- **Characteristics**: Clear monospace font for code

## Typography Scale

All typography scales follow the design system specifications with proper hierarchy.

### Display & Headings

| Level | Size (rem) | Size (px) | Weight | Line Height | Letter Spacing | Tailwind Class |
|-------|-----------|-----------|--------|-------------|----------------|----------------|
| Display | 2.986rem | ~47.8px | 700 | 1.2 | -0.02em | `text-display` |
| H1 | 2.488rem | ~39.8px | 700 | 1.2 | -0.02em | `text-h1` |
| H2 | 2.074rem | ~33.2px | 700 | 1.3 | -0.01em | `text-h2` |
| H3 | 1.728rem | ~27.6px | 600 | 1.4 | -0.01em | `text-h3` |
| H4 | 1.44rem | ~23.0px | 600 | 1.4 | 0em | `text-h4` |
| H5 | 1.2rem | ~19.2px | 600 | 1.5 | 0em | `text-h5` |
| H6 | 1rem | 16px | 600 | 1.5 | 0em | `text-h6` |

### Body Text

| Level | Size (rem) | Size (px) | Weight | Line Height | Letter Spacing | Tailwind Class |
|-------|-----------|-----------|--------|-------------|----------------|----------------|
| Body XL | 1.125rem | 18px | 400 | 1.6 | 0em | `text-body-xl` |
| Body LG | 1rem | 16px | 400 | 1.6 | 0em | `text-body-lg` |
| Body | 0.889rem | ~14.2px | 400 | 1.6 | 0em | `text-body` |
| Body SM | 0.79rem | ~12.6px | 400 | 1.5 | 0em | `text-body-sm` |

### Special Text

| Level | Size (rem) | Size (px) | Weight | Line Height | Letter Spacing | Tailwind Class |
|-------|-----------|-----------|--------|-------------|----------------|----------------|
| Caption | 0.704rem | ~11.3px | 400 | 1.4 | 0.01em | `text-caption` |
| Overline | 0.64rem | ~10.2px | 600 | 1.4 | 0.1em | `text-overline` |

## Usage Examples

### Headings
```html
<h1 class="text-h1 font-heading text-surface-foreground">Main Heading</h1>
<h2 class="text-h2 font-heading text-surface-foreground">Section Heading</h2>
<h3 class="text-h3 font-heading text-surface-foreground">Subsection</h3>
```

### Body Text
```html
<p class="text-body-lg text-surface-foreground">Lead paragraph with larger text.</p>
<p class="text-body text-surface-foreground">Regular body text.</p>
<p class="text-body-sm text-surface-mutedForeground">Small helper text.</p>
```

### Special Text
```html
<p class="text-caption text-surface-mutedForeground">Image caption or metadata</p>
<p class="text-overline uppercase text-surface-mutedForeground">Category Label</p>
```

### Code Blocks
```html
<code class="font-mono text-body bg-surface-muted px-2 py-1 rounded">
  const greeting = "Hello World";
</code>
```

### With Prose Plugin
```html
<article class="prose prose-neutral dark:prose-invert max-w-none">
  <h1>Blog Post Title</h1>
  <p>This content will automatically use the correct typography.</p>
</article>
```

## Font Loading

Fonts are loaded from Google Fonts with `display=swap` to ensure optimal performance:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=IBM+Plex+Sans:wght@400;600;700&family=Fira+Mono:wght@400&display=swap" rel="stylesheet">
```

## Accessibility

- ✅ Minimum body text size: 14.2px (exceeds 14px minimum)
- ✅ Line heights range from 1.2 to 1.6 for optimal readability
- ✅ Clear hierarchy between heading levels
- ✅ WCAG AA compliant contrast ratios when used with design system colors
- ✅ Proper letter spacing for improved legibility

## Responsive Behavior

The typography system is designed to be responsive:

- **Mobile**: All sizes work well on small screens (min 320px)
- **Tablet**: Typography scales appropriately for medium screens
- **Desktop**: Full typography scale is utilized

Body text maintains a minimum of 14.2px (0.889rem) on mobile devices for optimal readability.

## Token File

All typography tokens are centralized in `/src/styles/tokens/typography.json` for:
- Easy maintenance
- Consistent usage across the project
- Automation and documentation
- Type safety in tooling

## Validation

Run typography validation to ensure all tokens are correctly configured:

```bash
npm run validate:typography
```

Or validate both colors and typography:

```bash
npm run validate:all
```

## Dark Mode

Typography scales and font families remain consistent in dark mode. Only text colors change based on the surface tokens:

```html
<!-- Automatically adapts to dark mode -->
<p class="text-body text-surface-foreground">
  This text maintains the same size and font in both light and dark modes.
</p>
```

## Design Principles

1. **Hierarchy**: Clear visual distinction between heading levels
2. **Readability**: Appropriate line heights and letter spacing
3. **Consistency**: All values from centralized design tokens
4. **Accessibility**: WCAG AA compliant sizes and contrast ratios
5. **Performance**: Fonts loaded with optimal strategy (display=swap)
