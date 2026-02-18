# Minimal Modern Blog Theme

A minimal and modern personal blog theme built with HTML, CSS, and Tailwind CSS. This theme features a comprehensive design system with a harmonious color palette, semantic tokens, and full dark mode support.

## 🎨 Features

- **Design System**: Complete color token system with primitive, semantic, and surface aliases
- **Accessibility**: All color combinations meet WCAG AA contrast standards (4.5:1)
- **Dark Mode**: Built-in dark mode support with surface aliases that automatically adapt
- **Utility-First**: Tailwind CSS for rapid development and consistent styling
- **Modern Build**: Vite for fast development and optimized production builds
- **Responsive**: Mobile-first approach with responsive design patterns

## 🚀 Quick Start

### Installation

```bash
cd blog-theme
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

### Validate Colors

Run color token validation:

```bash
npm run validate:colors
```

## 📁 Project Structure

```
blog-theme/
├── public/
│   └── assets/          # Static assets
├── src/
│   ├── components/      # Reusable HTML components
│   ├── pages/           # Page templates
│   │   └── index.html   # Color token demonstration page
│   └── styles/
│       ├── tokens/
│       │   └── colors.json  # Central color token definitions
│       └── tailwind.css     # Tailwind imports and utilities
├── scripts/
│   └── validate-colors.js   # Color validation script
├── dist/                    # Build output (generated)
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.js          # Vite configuration
├── package.json
├── COLOR_TOKENS.md         # Detailed color system documentation
└── README.md
```

## 🎨 Color System

The theme implements a three-tier color token hierarchy:

### Primitive Colors

Base color scales with 11 shades (50-950):

- **Primary** (#48628b): Main brand color for primary actions
- **Secondary** (#507b6f): Supporting brand color for secondary actions  
- **Accent** (#c07247): Accent color for highlights and emphasis
- **Neutral**: Grayscale for text, borders, and backgrounds

### Semantic Colors

Purpose-based colors:

- **Success** (#0f7d4f): Positive actions and confirmations
- **Error** (#d13b3b): Errors and destructive actions
- **Warning** (#ffbb23): Warnings and cautions
- **Info** (#2fa3d1): Informational messages

### Surface Aliases

Context-aware colors that adapt to light/dark mode:

- `surface.background`: Main page background
- `surface.foreground`: Main text color
- `surface.card`: Card background
- `surface.border`: Border color
- `surface.muted`: Muted background

## 🔧 Usage Examples

### Using Color Tokens in HTML

```html
<!-- Primitive colors -->
<button class="bg-primary-500 text-white hover:bg-primary-600">
  Primary Button
</button>

<!-- Semantic colors -->
<div class="bg-success-light border-l-4 border-success p-4">
  <p class="text-success-dark">Success message</p>
</div>

<!-- Surface aliases -->
<div class="bg-surface-card border border-surface-border p-6">
  <h2 class="text-surface-foreground">Card Title</h2>
  <p class="text-surface-mutedForeground">Card content</p>
</div>
```

### Dark Mode

Toggle dark mode by adding/removing the `dark` class on the root element:

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

## 📚 Documentation

- See [COLOR_TOKENS.md](./COLOR_TOKENS.md) for detailed color system documentation
- View `src/pages/index.html` for a live demonstration of all color tokens
- Check `scripts/validate-colors.js` for validation logic

## ✅ Color Validation

The project includes automated validation that checks:

- ✅ All colors are in valid HEX format
- ✅ All required color tokens are present
- ✅ WCAG AA contrast ratios (4.5:1) are met for key combinations
- ✅ All color scales have the required 11 shades

Run validation:

```bash
npm run validate:colors
```

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styles and Tailwind utilities
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast development and build tool
- **PostCSS**: CSS processing with Autoprefixer

## 📝 Design Principles

1. **Consistency**: Use design tokens, never hardcoded values
2. **Accessibility**: All combinations meet WCAG AA standards
3. **Flexibility**: Dark mode support built-in from the start
4. **Scalability**: Easy to extend with new colors and components
5. **Maintainability**: Single source of truth in `colors.json`

## 🤝 Contributing

1. Make changes to color tokens in `src/styles/tokens/colors.json`
2. Update `tailwind.config.js` if adding new color categories
3. Run `npm run validate:colors` to ensure all colors are valid
4. Run `npm run build` to compile changes
5. Test in both light and dark modes

## 📄 License

MIT

## 🔗 Links

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Vite Documentation](https://vitejs.dev)
