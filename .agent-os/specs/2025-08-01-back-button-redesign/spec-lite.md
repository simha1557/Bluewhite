# Back Button Redesign - Lite Spec

## Quick Overview
Redesign the back button on About page with:
- Better arrow alignment
- Minimal CTA styling
- Improved visual hierarchy

## Implementation Tasks

### Task 1: Update Button Structure
- File: `src/app/about/page.tsx`
- Change from circular to pill-shaped button
- Improve arrow centering with flexbox

### Task 2: Apply Minimal CTA Styling
- Background: `bg-muted/50` with hover `bg-muted`
- Border: `border border-border`
- Padding: `px-4 py-2` for better touch target
- Rounded: `rounded-lg` for modern look

### Task 3: Enhance Interactions
- Hover scale effect: `hover:scale-105`
- Smooth transitions: `transition-all duration-200`
- Focus states for accessibility

## Design Changes
- **Shape**: Circular → Pill-shaped
- **Size**: Larger touch target (44px minimum)
- **Alignment**: Perfectly centered arrow
- **Styling**: Minimal, modern CTA appearance 