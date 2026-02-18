# Animation & Transition Tokens

This document describes the animation and transition design tokens used in the Minimal Modern Blog Theme.

## Overview

Animation tokens ensure consistent, smooth micro-interactions throughout the theme. All animations respect user preferences for reduced motion, following WCAG accessibility guidelines.

## Animation Durations

| Token | Value | Use Case |
|-------|-------|----------|
| `duration-fast` | 120ms | Quick feedback (button hover, focus states) |
| `duration-normal` | 220ms | Standard transitions (color changes, shadows) |
| `duration-slow` | 420ms | Deliberate animations (modals, page transitions) |

### Usage Examples

```html
<!-- Fast duration for immediate feedback -->
<button class="transition-colors duration-fast hover:bg-primary-600">
  Click me
</button>

<!-- Normal duration for balanced transitions -->
<div class="transition-shadow duration-normal hover:shadow-lg">
  Card with elevation
</div>

<!-- Slow duration for dramatic effects -->
<div class="transition-all duration-slow">
  Modal content
</div>
```

## Easing Functions (Timing Functions)

| Token | Cubic Bezier | Use Case |
|-------|--------------|----------|
| `ease-default` | cubic-bezier(0.4, 0, 0.2, 1) | General purpose (same as ease-inOut) |
| `ease-in` | cubic-bezier(0.4, 0, 1, 1) | Elements exiting |
| `ease-out` | cubic-bezier(0, 0, 0.2, 1) | Elements entering |
| `ease-inOut` | cubic-bezier(0.4, 0, 0.2, 1) | Bidirectional motion |
| `ease-spring` | cubic-bezier(0.22, 1, 0.36, 1) | Playful, bouncy feel |

> **Note:** `ease-default` and `ease-inOut` have the same cubic-bezier values intentionally. The default easing is designed to be a balanced ease-in-out curve, suitable for most transitions.

### Usage Examples

```html
<!-- Spring easing for playful interactions -->
<button class="transition-transform duration-fast ease-spring hover:scale-105">
  Bouncy button
</button>

<!-- Ease-out for entering elements -->
<div class="transition-opacity duration-normal ease-out">
  Fade in smoothly
</div>
```

## Transition Properties

Pre-configured transition properties for common use cases:

| Token | CSS Properties | Use Case |
|-------|----------------|----------|
| `transition-colors` | color, background-color, border-color, text-decoration-color, fill, stroke | Color transitions |
| `transition-opacity` | opacity | Fade effects |
| `transition-shadow` | box-shadow | Elevation changes |
| `transition-transform` | transform | Scale, rotate, translate |
| `transition-all` | all | Multiple properties (use sparingly) |

### Usage Examples

```html
<!-- Color transitions -->
<button class="bg-primary-500 hover:bg-primary-600 transition-colors duration-fast">
  Button
</button>

<!-- Shadow transitions for cards -->
<div class="shadow-md hover:shadow-xl transition-shadow duration-normal">
  Card with elevation
</div>

<!-- Transform for scale effects -->
<div class="hover:scale-[1.02] transition-transform duration-fast">
  Subtle lift
</div>
```

## Keyframe Animations

Five pre-defined keyframe animations for common UI patterns:

### 1. Fade In
```html
<div class="animate-fade-in">
  Content fades in smoothly
</div>
```

**Animation:** opacity 0 → 1  
**Duration:** 220ms  
**Easing:** default (cubic-bezier)

### 2. Fade Out
```html
<div class="animate-fade-out">
  Content fades out
</div>
```

**Animation:** opacity 1 → 0  
**Duration:** 220ms  
**Easing:** default

### 3. Slide Up
```html
<div class="animate-slide-up">
  Slides up from below
</div>
```

**Animation:** translateY(1rem) + opacity 0 → translateY(0) + opacity 1  
**Duration:** 220ms  
**Easing:** ease-out

### 4. Slide Down
```html
<div class="animate-slide-down">
  Slides down from above
</div>
```

**Animation:** translateY(-1rem) + opacity 0 → translateY(0) + opacity 1  
**Duration:** 220ms  
**Easing:** ease-out

### 5. Scale In
```html
<div class="animate-scale-in">
  Scales in with spring
</div>
```

**Animation:** scale(0.95) + opacity 0 → scale(1) + opacity 1  
**Duration:** 120ms  
**Easing:** spring

## Common Patterns

### Interactive Button States

```html
<button class="
  bg-primary-500 
  hover:bg-primary-600 
  active:bg-primary-700 
  focus-visible:ring-2 
  focus-visible:ring-primary-300 
  focus-visible:ring-offset-2
  transition-colors 
  duration-fast
">
  Interactive Button
</button>
```

### Card with Hover Effect

```html
<article class="
  bg-surface-card 
  rounded-lg 
  shadow-md 
  hover:shadow-xl 
  hover:scale-[1.02]
  transition-all 
  duration-normal
">
  Card content
</article>
```

### Border Transition

```html
<div class="
  border-2 
  border-surface-border 
  hover:border-primary-500
  transition-colors 
  duration-normal
">
  Hover to change border
</div>
```

### Staggered List Animation

```html
<ul>
  <li class="animate-slide-up" style="animation-delay: 0ms;">Item 1</li>
  <li class="animate-slide-up" style="animation-delay: 100ms;">Item 2</li>
  <li class="animate-slide-up" style="animation-delay: 200ms;">Item 3</li>
</ul>
```

## Accessibility

### Prefers Reduced Motion

All animations automatically respect the user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

When a user enables "Reduce motion" in their system settings:
- All animations are nearly instant (0.01ms)
- Transitions are minimized
- Smooth scrolling is disabled

### Best Practices

1. **Always use transitions on interactive elements** (buttons, links, cards)
2. **Keep durations short** (< 500ms) for better perceived performance
3. **Use appropriate easing** (spring for playful, ease-out for entering)
4. **Don't animate layout properties excessively** (width, height can cause reflow)
5. **Test with reduced motion enabled** to ensure critical UI still works
6. **Combine animations sparingly** - too many simultaneous animations can be distracting

## Implementation Details

### Token File Location
`src/styles/tokens/animations.json`

### CSS File Location
`src/styles/animations.css`

### Tailwind Configuration
Tokens are imported and configured in `tailwind.config.js`:

```javascript
import animations from './src/styles/tokens/animations.json' with { type: 'json' };

export default {
  theme: {
    extend: {
      transitionDuration: animations.transitionDuration,
      transitionTimingFunction: animations.transitionTimingFunction,
      transitionProperty: animations.transitionProperty,
      keyframes: { /* ... */ },
      animation: { /* ... */ },
    },
  },
}
```

## Validation

Run the animation token validation script:

```bash
npm run validate:animations
```

This validates:
- All duration tokens are properly defined
- All easing functions match specifications
- Transition properties are defined
- Keyframe animations exist in CSS
- Prefers-reduced-motion media query is present

## Testing

View all animation examples on the test page:

```bash
npm run dev
# Navigate to /animations-test.html
```

The test page demonstrates:
- All transition durations
- All easing functions
- Transition properties in action
- Keyframe animations
- Interactive state examples
- Micro-interaction patterns

## Design System Integration

These animation tokens are part of the comprehensive design system:

- **Colors**: Consistent color transitions
- **Spacing**: Animated spacing changes
- **Shadows**: Smooth elevation effects
- **Typography**: Text state changes
- **Borders**: Border style transitions

All tokens work together to create a cohesive, minimal, and modern user experience.
