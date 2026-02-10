# NordLion Design System

> A comprehensive luxury design system for automotive excellence

## Overview

The NordLion design system embodies luxury, elegance, and modern sophistication. Inspired by premium automotive brands and luxury marketplaces like Elita, this system provides a cohesive visual language across the entire platform.

---

## Color Palette

### Primary Colors

#### Gold (Brand Color)
```css
--gold: #D4AF37        /* Primary brand color */
--gold-light: #E8C95A  /* Highlights and hover states */
--gold-dark: #B8962C   /* Active states and depth */
```

**Usage**: Primary CTAs, accents, luxury highlights, interactive elements

**Gold Scale**:
- `gold-50`: #FAF8F3 - Lightest tint
- `gold-100`: #F5F0E6
- `gold-200`: #EBE1CD
- `gold-300`: #E0D2B4
- `gold-400`: #D6C39B
- `gold-500`: #D4AF37 - Base
- `gold-600`: #B8962C
- `gold-700`: #9C7D21
- `gold-800`: #806416
- `gold-900`: #644B0B
- `gold-950`: #4A380A - Darkest shade

#### Dark (Background)
```css
--dark: #0a0a0a           /* Primary background */
--dark-lighter: #262626   /* Elevated surfaces */
--dark-darkest: #050505   /* Deep backgrounds */
```

**Dark Scale**:
- `dark-50`: #f7f7f7 - Light mode base
- `dark-100`: #e3e3e3
- `dark-200`: #c8c8c8
- `dark-300`: #a4a4a4
- `dark-400`: #818181
- `dark-500`: #666666
- `dark-600`: #515151
- `dark-700`: #434343
- `dark-800`: #262626
- `dark-900`: #0a0a0a - Base dark
- `dark-950`: #050505 - Deepest black

### Semantic Colors

```css
--foreground: #fafafa    /* Primary text */
--muted: #666666         /* Secondary text */
--border: #262626        /* Dividers and borders */
```

---

## Typography

### Font Families

#### Playfair Display (Headings)
```css
font-family: var(--font-playfair), Georgia, serif;
```

**Characteristics**:
- Elegant serif typeface
- High contrast
- Luxury feel
- Weights: 400, 500, 600, 700, 800, 900

**Usage**: All headings (h1-h6), luxury callouts, hero titles

#### Inter (Body)
```css
font-family: var(--font-inter), system-ui, sans-serif;
```

**Characteristics**:
- Clean sans-serif
- Excellent readability
- Modern appearance
- Weights: 300, 400, 500, 600, 700

**Usage**: Body text, UI elements, navigation, buttons

### Type Scale

| Element | Desktop | Tablet | Mobile | Weight |
|---------|---------|--------|--------|--------|
| h1 | 6rem (96px) | 4.5rem | 3rem | 700 |
| h2 | 3.75rem (60px) | 3rem | 2.25rem | 600 |
| h3 | 3rem (48px) | 2.25rem | 1.875rem | 600 |
| h4 | 2.25rem (36px) | 1.875rem | 1.5rem | 600 |
| h5 | 1.5rem (24px) | 1.25rem | 1.125rem | 600 |
| h6 | 1.25rem (20px) | 1.125rem | 1rem | 600 |
| body | 1rem (16px) | 1rem | 0.875rem | 400 |

### Typography Utilities

```css
.gradient-text        /* Gold gradient text effect */
.text-gold           /* Solid gold color */
.text-gold-light     /* Light gold */
.text-gold-dark      /* Dark gold */
```

---

## Spacing System

Based on 4px base unit:

```
4px   8px   12px  16px  20px  24px  32px  40px  48px  64px  80px  96px
```

Tailwind utilities: `p-1` (4px), `p-2` (8px), `p-4` (16px), etc.

---

## Components

### Buttons

#### Primary Button
```html
<button class="btn-primary">
  Explore Collection
</button>
```

**Characteristics**:
- Gold background (#D4AF37)
- Black text for contrast
- Rounded corners (12px)
- Scale up on hover (1.05)
- Gold glow shadow effect
- 300ms transition

#### Secondary Button
```html
<button class="btn-secondary">
  Learn More
</button>
```

**Characteristics**:
- Transparent background
- White text
- Subtle border (white/10)
- Glass effect on hover
- 300ms transition

### Cards

#### Luxury Card
```html
<div class="glass-effect luxury-hover p-6 rounded-xl">
  <!-- Content -->
</div>
```

**Effects**:
- Glass morphism background
- Backdrop blur
- Subtle border
- Scale up on hover
- Shadow depth change

### Glass Morphism

```css
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## Effects

### Gold Glow

```css
.gold-glow {
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
}

.gold-glow:hover {
  box-shadow: 0 0 60px rgba(212, 175, 55, 0.25);
}
```

**Usage**: Featured cards, CTAs, highlighted elements

### Luxury Hover

```css
.luxury-hover:hover {
  transform: scale(1.02);
  transition: all 500ms ease-out;
}
```

**Usage**: Interactive cards, vehicle listings, feature blocks

---

## Animations

### Available Animations

| Class | Duration | Easing | Effect |
|-------|----------|--------|--------|
| `animate-fade-in` | 800ms | ease-out | Opacity fade |
| `animate-fade-in-up` | 800ms | ease-out | Fade + slide up |
| `animate-fade-in-down` | 800ms | ease-out | Fade + slide down |
| `animate-slide-in-left` | 800ms | ease-out | Slide from left |
| `animate-slide-in-right` | 800ms | ease-out | Slide from right |
| `animate-scale-in` | 600ms | ease-out | Scale from 0.9 |
| `animate-shimmer` | 2s | linear | Shimmer effect |
| `animate-float` | 6s | ease-in-out | Floating motion |
| `animate-pulse-gold` | 3s | ease-in-out | Gold pulse |
| `animate-rotate-slow` | 20s | linear | Slow rotation |

### Usage Example

```html
<div class="animate-fade-in-up">
  <!-- Content appears with smooth upward motion -->
</div>
```

---

## Gradients

### Luxury Gradient
```css
background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1410 100%);
```
**Usage**: Hero backgrounds, section dividers

### Gold Gradient
```css
background: linear-gradient(135deg, #B8962C 0%, #D4AF37 50%, #E8C95A 100%);
```
**Usage**: CTAs, accent elements, highlights

### Radial Gold
```css
background: radial-gradient(circle at center, #E8C95A 0%, #D4AF37 50%, #B8962C 100%);
```
**Usage**: Spotlights, feature highlights

---

## Shadows

```css
shadow-gold       /* 0 0 40px rgba(212, 175, 55, 0.15) */
shadow-gold-lg    /* 0 0 60px rgba(212, 175, 55, 0.25) */
shadow-gold-xl    /* 0 0 80px rgba(212, 175, 55, 0.35) */
shadow-luxury     /* 0 20px 60px rgba(0, 0, 0, 0.5) */
shadow-luxury-lg  /* 0 25px 80px rgba(0, 0, 0, 0.6) */
```

---

## Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid #D4AF37;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.3);
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Only
```html
<span class="sr-only">Descriptive text for screen readers</span>
```

---

## Custom Elements

### Scrollbar

- Width: 10px
- Track: #0a0a0a
- Thumb: #D4AF37 (gold)
- Hover: #E8C95A (light gold)
- Border radius: 5px

### Text Selection

- Background: rgba(212, 175, 55, 0.3)
- Color: #ffffff

---

## Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

---

## Best Practices

### Do's ✅

1. **Use semantic HTML** - Proper heading hierarchy
2. **Apply consistent spacing** - Use spacing scale
3. **Leverage design tokens** - Use CSS variables
4. **Consider accessibility** - Include focus states
5. **Optimize performance** - Minimize animations
6. **Test dark mode** - Ensure contrast ratios
7. **Mobile-first** - Design for smallest screen first

### Don'ts ❌

1. **Don't mix color systems** - Stick to palette
2. **Don't over-animate** - Keep it subtle
3. **Don't ignore contrast** - Ensure readability
4. **Don't hardcode colors** - Use design tokens
5. **Don't skip hover states** - Always provide feedback
6. **Don't forget loading states** - Show progress

---

## Component Checklist

When creating new components:

- [ ] Uses design system colors
- [ ] Follows typography scale
- [ ] Includes hover states
- [ ] Has focus indicators
- [ ] Responsive across breakpoints
- [ ] Supports dark mode
- [ ] Accessible (ARIA labels if needed)
- [ ] Performant (60fps animations)
- [ ] Uses consistent spacing
- [ ] Follows brand aesthetics

---

## Resources

### Design Tools
- Figma design files (coming soon)
- Component library
- Icon set
- Image guidelines

### Code References
- `globals.css` - Complete style definitions
- `tailwind.config.ts` - Design tokens
- `layout.tsx` - Font configuration

### Inspiration
- Elita luxury marketplace
- High-end automotive brands
- Premium e-commerce platforms
- Luxury fashion websites

---

## Version History

**v1.0.0** - February 2026
- Initial luxury design system
- Gold color palette
- Playfair Display typography
- Complete animation library
- Glass morphism effects

---

**Maintained by**: NordLion Design Team  
**Last Updated**: February 7, 2026
