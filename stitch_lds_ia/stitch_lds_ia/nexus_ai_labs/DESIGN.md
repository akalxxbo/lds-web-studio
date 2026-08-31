---
name: Nexus AI Labs
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353435'
  on-surface: '#E5E2E2'
  on-surface-variant: '#C6C6CC'
  inverse-surface: '#e5e2e2'
  inverse-on-surface: '#313031'
  outline: '#909096'
  outline-variant: '#45464b'
  surface-tint: '#c3c6d3'
  primary: '#c3c6d3'
  on-primary: '#2c303a'
  primary-container: '#090d16'
  on-primary-container: '#777a86'
  inverse-primary: '#5a5e69'
  secondary: '#adc6ff'
  on-secondary: '#122f5f'
  secondary-container: '#2c4677'
  on-secondary-container: '#9cb5ed'
  tertiary: '#d0bcff'
  on-tertiary: '#37265e'
  tertiary-container: '#120037'
  on-tertiary-container: '#8371ae'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dfe2ef'
  primary-fixed-dim: '#c3c6d3'
  on-primary-fixed: '#181b25'
  on-primary-fixed-variant: '#434751'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#2c4677'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#210f48'
  on-tertiary-fixed-variant: '#4d3d76'
  background: '#131314'
  on-background: '#e5e2e2'
  surface-variant: '#353435'
  surface-lowest: '#0E0E0F'
  surface-low: '#1C1B1C'
  accent-cyan: '#00F2FE'
  error-red: '#FFB4AB'
  border-subtle: rgba(255, 255, 255, 0.08)
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  margin-desktop: 80px
  margin-mobile: 20px
  section-padding-v: 96px
  gutter: 24px
  card-p: 24px
---

## Brand & Style

Nexus AI Labs embodies a **Cyber-Enterprise** aesthetic, blending high-end corporate reliability with futuristic technology. The brand personality is innovative, precise, and authoritative, targeting enterprise-level decision-makers looking for "digital workforce" solutions.

The design style is **Glassmorphic / High-Tech Modern**, characterized by:
- Deep indigo backgrounds contrasted with vibrant cyan and violet accents.
- Subtle transparency and backdrop blurs (`backdrop-blur-xl`) that suggest depth and fluidity.
- High-precision data visualizations using gradients and glows.
- Interactive "glow" effects (`glow-cyan`) that provide tactile feedback for primary actions.
- A "live" operational feel, mimicking real-time monitoring dashboards.

## Colors

The palette is rooted in a deep-space **Dark Mode** foundation. 

- **Primary & Background:** `#090D16` serves as the core darkness, providing a high-contrast base for technical elements.
- **Secondary (Cyan/Blue):** Used for primary actions, success states, and progress indicators. It represents speed and connectivity.
- **Tertiary (Violet):** Used for secondary metrics and decorative gradients, representing the complexity and "magic" of AI.
- **Neutral/Surface:** A tiered gray system (`#0E0E0F` to `#2A2A2B`) is used to organize information into distinct containers without relying on heavy borders.
- **Gradients:** Use linear gradients from Secondary to Tertiary to highlight key messaging and brand-defining "Force de Trabajo" (Workforce) elements.

## Typography

The typography system relies on **Plus Jakarta Sans** for headlines to provide a modern, slightly rounded, and premium feel. **Inter** is used for body and labels to ensure maximum legibility for technical data.

- **Scale:** Bold, massive headlines (64px) establish a strong visual hierarchy.
- **Weights:** Heavy use of Extra Bold (800) for hero sections and Semi-Bold (600) for labels.
- **Labels:** Technical metadata and "overlines" use Uppercase with wide letter spacing (0.05em) to mimic terminal or HUD displays.
- **Gradients:** Headlines frequently use text-clipping with gradients to draw attention.

## Layout & Spacing

The layout follows a **Fixed Grid** approach with a maximum container width of 1280px.

- **Vertical Rhythm:** Generous 96px vertical padding between sections creates an airy, premium feel.
- **Desktop Margins:** A wide 80px margin on desktop ensures the content remains focused in the center of the screen.
- **Dashboards/Cards:** Content within cards uses a 24px internal padding (`card-p`) with 16px to 24px gaps between elements to maintain technical clarity.
- **Mobile Reflow:** For screens < 1024px, grid columns (e.g., 2-column hero or footer) collapse into a single-column stack.

## Elevation & Depth

Hierarchy is defined through **Tonal Layering** and **Ambient Glows** rather than traditional drop shadows.

- **Background:** The base layer is `#090D16`.
- **Secondary Layer (Cards):** Surfaces use `surface-low` (`#1C1B1C`) with a very subtle white-border overlay (opacity 5-10%) to define edges.
- **Glass Effects:** Navigation bars and hero chips use `backdrop-blur-xl` and 60% opacity backgrounds to float above the content.
- **Glows:** Primary buttons and critical data points use soft cyan shadows (`0 0 20px rgba(0, 242, 254, 0.15)`) to suggest active energy.
- **Gradients:** Radial background blurs (120px blur) in secondary and tertiary colors are placed behind sections to break the monotony of the dark background.

## Shapes

The design uses a mix of **Rounded** and **Pill** shapes to balance corporate structure with modern softness.

- **Standard Containers:** Cards and dashboards use `2rem` (32px) corner radii for a friendly, modern tech look.
- **Interactive Elements:** Buttons, chips, and small icons are exclusively **Pill-shaped (rounded-full)** to differentiate them from static containers.
- **Small Components:** Metric cards and inner nested elements use `0.75rem` (12px) to `1rem` (16px) radii.

## Components

### Buttons
- **Primary:** Pill-shaped, `bg-secondary-container`, `text-on-secondary-container`. Must include a `glow-cyan` hover effect and an icon (e.g., `arrow_forward`) that shifts on hover.
- **Secondary:** Pill-shaped, transparent background with `border-outline-variant`. Hover state should fill with `surface-container`.

### Cards & Dashboards
- Glassmorphic treatment with `border-white/10` and `backdrop-blur`. 
- Top-aligned "Traffic Light" dots (red, violet, cyan) are a signature visual element for dashboard-style cards.

### Input Fields
- Dark backgrounds (`#090D16`) with `white/10` borders. 
- Focus state must transition the border to `secondary` color.

### Progress & Metrics
- Progress bars use a rounded track with a high-contrast `secondary` fill. 
- Technical icons should be housed in low-opacity circles (`bg-primary/10`) with thin borders.

### Navigation
- Fixed header with a 60% background opacity and strong `backdrop-blur-xl`.
- Links use `label-md` with `on-surface-variant` color, transitioning to `on-surface` on hover.