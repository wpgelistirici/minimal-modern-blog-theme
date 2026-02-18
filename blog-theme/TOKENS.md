# Spacing, Border Radius, and Shadow Tokens

This document describes the spacing, border radius, and shadow tokens implemented in the design system.

## Spacing Tokens (4px Grid System)

All spacing values follow a 4px grid system for visual consistency and harmony.

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|--------|
| `spacing.0` | 0px | `p-0`, `m-0`, `gap-0` | Reset spacing |
| `spacing.1` | 4px | `p-1`, `m-1`, `gap-1` | Icon-text gap, inline spacing |
| `spacing.2` | 8px | `p-2`, `m-2`, `gap-2` | Small element spacing, badge padding |
| `spacing.3` | 12px | `p-3`, `m-3`, `gap-3` | Standard padding, list item gap |
| `spacing.4` | 16px | `p-4`, `m-4`, `gap-4` | Standard padding, list item gap |
| `spacing.5` | 20px | `p-5`, `m-5`, `gap-5` | Card padding, section gap |
| `spacing.6` | 24px | `p-6`, `m-6`, `gap-6` | Card padding, section gap |
| `spacing.8` | 32px | `p-8`, `m-8`, `gap-8` | Section padding, large gaps |
| `spacing.10` | 40px | `p-10`, `m-10`, `gap-10` | Page margin, hero spacing |
| `spacing.12` | 48px | `p-12`, `m-12`, `gap-12` | Page margin, hero spacing |
| `spacing.16` | 64px | `p-16`, `m-16`, `gap-16` | Large section spacing |
| `spacing.20` | 80px | `p-20`, `m-20`, `gap-20` | Extra large spacing |
| `spacing.24` | 96px | `p-24`, `m-24`, `gap-24` | Maximum spacing |

### Usage Examples

```html
<!-- Card with standard padding -->
<div class="p-6 rounded-lg shadow-md">
  <h3 class="mb-3">Card Title</h3>
  <p class="mb-4">Card content</p>
</div>

<!-- Flex layout with gap -->
<div class="flex gap-4 items-center">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Section spacing -->
<section class="py-12 px-6">
  <h2 class="mb-6">Section Title</h2>
  <p>Section content</p>
</section>
```

## Border Radius Tokens

Border radius values for consistent corner styling across components.

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|--------|
| `borderRadius.none` | 0px | `rounded-none` | Sharp corners |
| `borderRadius.sm` | 2px | `rounded-sm` | Subtle rounding |
| `borderRadius.md` | 4px | `rounded-md` | Standard buttons, inputs |
| `borderRadius.lg` | 8px | `rounded-lg` | Cards, containers |
| `borderRadius.xl` | 12px | `rounded-xl` | Large cards, modals |
| `borderRadius.full` | 9999px | `rounded-full` | Pills, avatars, circles |

### Usage Examples

```html
<!-- Button with standard radius -->
<button class="px-4 py-2 rounded-md bg-primary-500 text-white">
  Click me
</button>

<!-- Card with large radius -->
<div class="p-6 rounded-lg bg-surface-card shadow-md">
  Card content
</div>

<!-- Avatar with full radius -->
<img src="avatar.jpg" class="w-12 h-12 rounded-full" alt="Avatar">
```

## Shadow Tokens (Elevation)

Shadow levels for creating depth and visual hierarchy.

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|--------|
| `boxShadow.sm` | `0 1px 2px 0 rgba(30, 34, 40, 0.04)` | `shadow-sm` | Subtle elevation - buttons, inputs |
| `boxShadow.md` | `0 2px 8px 0 rgba(30, 34, 40, 0.08)` | `shadow-md` | Cards, dropdowns |
| `boxShadow.lg` | `0 4px 16px 0 rgba(30, 34, 40, 0.12)` | `shadow-lg` | Modals, popovers, floating elements |
| `boxShadow.xl` | `0 8px 32px 0 rgba(30, 34, 40, 0.16)` | `shadow-xl` | Hero cards, spotlight elements |

### Usage Examples

```html
<!-- Button with subtle shadow -->
<button class="px-4 py-2 rounded-md bg-primary-500 text-white shadow-sm hover:shadow-md transition-shadow">
  Click me
</button>

<!-- Card with standard shadow -->
<div class="p-6 rounded-lg bg-surface-card shadow-md">
  Card content
</div>

<!-- Modal with large shadow -->
<div class="p-8 rounded-xl bg-white shadow-lg max-w-md mx-auto">
  Modal content
</div>

<!-- Hero card with extra large shadow -->
<div class="p-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-xl">
  Hero content
</div>
```

## Combined Token Usage

Here's an example combining all three token types:

```html
<article class="p-6 rounded-lg bg-surface-card shadow-md hover:shadow-lg transition-shadow duration-200">
  <header class="mb-4">
    <div class="flex items-center gap-3 mb-3">
      <img src="avatar.jpg" class="w-12 h-12 rounded-full" alt="Author">
      <div>
        <h3 class="text-h5 font-heading">Article Title</h3>
        <p class="text-body-sm text-neutral-600">By John Doe</p>
      </div>
    </div>
  </header>
  
  <p class="text-body text-neutral-700 mb-4">
    Article excerpt goes here...
  </p>
  
  <footer class="flex gap-2">
    <button class="px-4 py-2 rounded-md bg-primary-500 text-white shadow-sm hover:shadow-md transition-all">
      Read More
    </button>
    <button class="px-4 py-2 rounded-md border border-surface-border hover:bg-surface-muted transition-colors">
      Save
    </button>
  </footer>
</article>
```

## Design Principles

1. **4px Grid System**: All spacing values follow a 4px grid for mathematical consistency and visual harmony.

2. **Progressive Scale**: Spacing increases progressively (4, 8, 12, 16, 20, 24...) for clear visual hierarchy.

3. **Border Radius Progression**: Border radius values increase on a progressive scale (2, 4, 8, 12) for clear distinction.

4. **Shadow Depth**: Shadow blur and spread increase proportionally to create realistic elevation levels.

5. **Consistency**: Always use tokens instead of arbitrary values to maintain design system integrity.

## Validation

Run the following command to validate all tokens:

```bash
npm run validate:tokens
```

Or validate all design tokens:

```bash
npm run validate:all
```

## File Structure

Token files are located in:
- `src/styles/tokens/spacing.json` - Spacing scale
- `src/styles/tokens/borders.json` - Border radius values
- `src/styles/tokens/shadows.json` - Shadow levels

These tokens are imported and mapped in `tailwind.config.js` to make them available as Tailwind utility classes.

## Testing

Visit `/tokens-test.html` to see all tokens in action with visual examples.
