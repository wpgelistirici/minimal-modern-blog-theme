# Responsive Tokens Documentation

## 📋 Overview

This document describes the responsive breakpoints and container configuration for the minimal modern blog theme. These tokens ensure consistent, mobile-first responsive behavior across all components and layouts.

## 🎯 Design Principles

1. **Mobile-First**: All styles default to mobile, then progressively enhance for larger screens
2. **Content-First**: Breakpoints chosen based on content needs, not device sizes
3. **Readability-Focused**: Container max-widths capped at 1140px for optimal reading experience
4. **Consistent Spacing**: Container padding aligns with the 4px spacing grid system

## 📱 Breakpoints

| Token | Value | Description | Target Devices |
|-------|-------|-------------|----------------|
| `sm` | 480px | Small devices | Large phones (landscape), small tablets |
| `md` | 768px | Medium devices | Tablets (portrait), small laptops |
| `lg` | 1024px | Large devices | Tablets (landscape), laptops |
| `xl` | 1280px | Extra large devices | Desktops, large laptops |

### Usage in Tailwind CSS

```html
<!-- Default styles apply to all sizes -->
<div class="text-body-sm">

<!-- Apply at sm (≥480px) and above -->
<div class="sm:text-body">

<!-- Apply at md (≥768px) and above -->
<div class="md:text-body-lg">

<!-- Apply at lg (≥1024px) and above -->
<div class="lg:text-body-xl">

<!-- Apply at xl (≥1280px) and above -->
<div class="xl:text-h4">
</div>
```

### Responsive Grid Example

```html
<!-- 1 column on mobile, 2 on md, 3 on lg, 4 on xl -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</div>
```

## 📦 Container Configuration

The container component automatically centers content and applies responsive max-widths and padding.

### Container Max-Widths

| Breakpoint | Max-Width | Reasoning |
|------------|-----------|-----------|
| `sm` | 100% | Full width on small screens for maximum content space |
| `md` | 720px | Comfortable reading width for tablets |
| `lg` | 960px | Optimal line length for desktop reading |
| `xl` | 1140px | Maximum width capped for readability |

### Container Padding

Responsive padding ensures content never touches screen edges:

| Breakpoint | Padding | Spacing Token |
|------------|---------|---------------|
| default | 24px | `spacing.6` |
| `sm` | 16px | `spacing.4` |
| `md` | 24px | `spacing.6` |
| `lg` | 32px | `spacing.8` |
| `xl` | 40px | `spacing.10` |

### Usage

```html
<!-- Container with automatic centering and responsive padding -->
<div class="container mx-auto">
  <h1>Your content here</h1>
  <p>This content is automatically centered and has responsive padding.</p>
</div>
```

## 🎨 Common Responsive Patterns

### Responsive Typography

Scale text sizes across breakpoints:

```html
<h1 class="text-h2 md:text-h1 lg:text-display">
  Responsive Heading
</h1>

<p class="text-body-sm sm:text-body md:text-body-lg">
  Responsive body text
</p>
```

### Responsive Spacing

Adjust spacing based on screen size:

```html
<!-- Smaller gaps on mobile, larger on desktop -->
<div class="space-y-4 md:space-y-6 lg:space-y-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Responsive padding -->
<div class="p-4 md:p-6 lg:p-8 xl:p-10">
  Content with responsive padding
</div>
```

### Responsive Layout

Change layout structure at different breakpoints:

```html
<!-- Stack on mobile, flex row on tablet+ -->
<div class="flex flex-col md:flex-row gap-4">
  <aside class="md:w-1/4">Sidebar</aside>
  <main class="md:w-3/4">Main content</main>
</div>

<!-- Hide/show elements -->
<div class="hidden md:block">Visible on tablet and up</div>
<div class="block md:hidden">Visible only on mobile</div>
```

## 🔧 Technical Implementation

### JSON Token File

Location: `src/styles/tokens/responsive.json`

```json
{
  "breakpoints": {
    "sm": "480px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px"
  },
  "container": {
    "padding": {
      "default": "24px",
      "sm": "16px",
      "md": "24px",
      "lg": "32px",
      "xl": "40px"
    },
    "maxWidth": {
      "sm": "100%",
      "md": "720px",
      "lg": "960px",
      "xl": "1140px"
    }
  }
}
```

### Tailwind Configuration

Location: `tailwind.config.js`

```javascript
import responsive from './src/styles/tokens/responsive.json' with { type: 'json' };

export default {
  theme: {
    screens: responsive.breakpoints,
    container: {
      center: true,
      padding: {
        DEFAULT: responsive.container.padding.default,
        sm: responsive.container.padding.sm,
        md: responsive.container.padding.md,
        lg: responsive.container.padding.lg,
        xl: responsive.container.padding.xl,
      },
      screens: {
        sm: responsive.container.maxWidth.sm,
        md: responsive.container.maxWidth.md,
        lg: responsive.container.maxWidth.lg,
        xl: responsive.container.maxWidth.xl,
      },
    },
    // ... other config
  }
}
```

## ✅ Validation

Run the validation script to ensure responsive tokens are correctly configured:

```bash
npm run validate:responsive
```

This validates:
- ✅ Breakpoint values match specifications
- ✅ Mobile-first approach (values increase with breakpoints)
- ✅ Container max-widths are appropriate
- ✅ Padding values align with spacing system
- ✅ Max-width doesn't exceed readability limit (1140px)
- ✅ Minimum padding ensures content safety (≥16px)
- ✅ Tailwind config integration is correct

## 🛡️ Edge Cases & Best Practices

### 1. Content Overflow Prevention

Always ensure content can't overflow containers:

```html
<!-- Prevent long text from breaking layout -->
<div class="container mx-auto">
  <h1 class="break-words">Very Long Title That Might Break Layout</h1>
</div>
```

### 2. Touch-Friendly Spacing

On mobile, use adequate spacing for touch targets:

```html
<!-- Larger gaps on mobile for easier touch interaction -->
<div class="flex flex-col gap-4 sm:gap-3 md:gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

### 3. Responsive Images

Ensure images scale properly within containers:

```html
<div class="container mx-auto">
  <img src="image.jpg" class="w-full h-auto" alt="Responsive image">
</div>
```

### 4. Between-Breakpoint Behavior

Styles cascade from mobile up, so test carefully between breakpoints:

```html
<!-- This will be red on mobile and tablet (< 1024px), blue on desktop (≥ 1024px) -->
<div class="text-error-500 lg:text-primary-500">
  Content
</div>
```

### 5. RTL Support

Container padding and centering work automatically in RTL mode:

```html
<html dir="rtl">
  <div class="container mx-auto">
    <!-- Content automatically adapts for RTL -->
  </div>
</html>
```

## 📊 Breakpoint Decision Matrix

Use this guide to choose the right breakpoint for your responsive changes:

| Screen Width | Breakpoint | Typical Changes |
|--------------|------------|-----------------|
| 320-479px | (default) | Single column, stacked layout, largest touch targets |
| 480-767px | `sm:` | Slight spacing adjustments, show more info |
| 768-1023px | `md:` | 2-column layouts, sidebar appears, reduced padding |
| 1024-1279px | `lg:` | 3-column layouts, more whitespace, larger typography |
| 1280px+ | `xl:` | 4-column layouts, maximum content width, enhanced spacing |

## 🔍 Testing Checklist

When implementing responsive designs, test:

- [ ] Content displays correctly at exactly each breakpoint value
- [ ] Content displays correctly between breakpoints
- [ ] No horizontal scroll appears at any width
- [ ] Container padding prevents content from touching edges
- [ ] Text remains readable at all sizes
- [ ] Touch targets are adequately sized on mobile (minimum 44x44px)
- [ ] Layout doesn't break with very long words or URLs
- [ ] Images scale properly within containers
- [ ] Navigation is accessible at all breakpoints

## 📖 Additional Resources

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Mobile-First CSS](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)
- [WCAG 2.1 Reflow Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html)

## 🔄 Version History

- **v1.0.0** (2024-02): Initial responsive token implementation
  - Defined 4 breakpoints (sm, md, lg, xl)
  - Configured container max-widths and padding
  - Established mobile-first approach
