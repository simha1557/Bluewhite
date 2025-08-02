# Hero Section Content Replacement Specification

## Overview
Replace the current generic hero section content with personalized content for Pavan Simha, changing from business-focused messaging to personal filmmaker introduction.

## Current Content Analysis

### Current Hero Section Content:
1. **Badge**: "✨ Trusted by businesses worldwide"
2. **Main Heading**: "WE ARE CREATIVE DIRECTORS"
3. **Subheading**: "We make advertising, branding and portfolio for film aspirants."

### Issues with Current Content:
- Too generic and business-focused
- Doesn't reflect Pavan's personal identity as a filmmaker
- Lacks personal connection and storytelling approach
- Doesn't align with the About page's personal narrative

## New Content Requirements

### 1. Badge Replacement
- **Current**: "✨ Trusted by businesses worldwide"
- **New**: "✨ Filmmaker & Creative Director"
- **Purpose**: Personal introduction and professional identity

### 2. Main Heading Replacement
- **Current**: "WE ARE CREATIVE DIRECTORS"
- **New**: "Hi. I'm Pavan Simha, a creative director and filmmaker."
- **Purpose**: Personal greeting and direct introduction

### 3. Subheading Replacement
- **Current**: "We make advertising, branding and portfolio for film aspirants."
- **New**: "I believe every story deserves to be told beautifully, where shadows become characters and light becomes dialogue."
- **Purpose**: Poetic statement about storytelling philosophy

## Technical Requirements

### 1. Typography Adjustments
- **Main Heading**: 
  - Change from bold business style to personal greeting style
  - Maintain gradient effect on "Pavan Simha" name
  - Adjust font weight and size for personal tone
- **Subheading**:
  - Longer text requires responsive line height adjustments
  - Maintain readability across all screen sizes
  - Preserve poetic flow and readability

### 2. Content Structure
- **Badge**: Update text and styling to reflect personal brand
- **Heading**: Restructure for personal introduction format
- **Subheading**: Accommodate longer, more poetic text
- **Animation**: Maintain existing fade-in animations and timing

### 3. Responsive Design
- **Mobile**: Ensure text fits properly on small screens
- **Tablet**: Optimize line breaks and spacing
- **Desktop**: Maintain visual impact and readability

## Implementation Tasks

### Task 1: Update Badge Content
- [ ] Change badge text to "✨ Filmmaker & Creative Director"
- [ ] Adjust badge styling if needed for new content
- [ ] Test responsive behavior

### Task 2: Replace Main Heading
- [ ] Update heading text to personal introduction format
- [ ] Apply gradient effect to "Pavan Simha" name
- [ ] Adjust typography for personal tone
- [ ] Maintain responsive font sizing

### Task 3: Update Subheading
- [ ] Replace with poetic storytelling statement
- [ ] Adjust line height and spacing for longer text
- [ ] Ensure proper responsive behavior
- [ ] Test readability across all devices

### Task 4: Visual Testing
- [ ] Verify content flows naturally
- [ ] Check responsive behavior on all screen sizes
- [ ] Ensure animations work properly
- [ ] Validate accessibility and readability

## Code Changes

### Current Badge
```tsx
<div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 mb-8 animate-pulse-slow hover:animate-none hover:bg-primary/20 transition-all duration-300">
  ✨ Trusted by businesses worldwide
</div>
```

### Updated Badge
```tsx
<div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 mb-8 animate-pulse-slow hover:animate-none hover:bg-primary/20 transition-all duration-300">
  ✨ Filmmaker & Creative Director
</div>
```

### Current Heading
```tsx
<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-sans bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
  WE ARE <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">CREATIVE DIRECTORS</span>
</h1>
```

### Updated Heading
```tsx
<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-sans">
  Hi. I'm <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">Pavan Simha</span>, a creative director and filmmaker.
</h1>
```

### Current Subheading
```tsx
<p className="mt-6 sm:mt-8 text-lg sm:text-xl leading-8 text-muted-foreground max-w-3xl mx-auto px-4">
  We make advertising, branding and portfolio for film aspirants.
</p>
```

### Updated Subheading
```tsx
<p className="mt-6 sm:mt-8 text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-4xl mx-auto px-4">
  I believe every story deserves to be told beautifully, where shadows become characters and light becomes dialogue.
</p>
```

## Design Considerations

### 1. Personal Branding
- Shift from corporate to personal tone
- Maintain professional credibility
- Reflect filmmaker's creative philosophy

### 2. Content Flow
- Natural progression from introduction to philosophy
- Maintain visual hierarchy and impact
- Ensure smooth reading experience

### 3. Responsive Behavior
- Text must remain readable on all devices
- Proper line breaks and spacing
- Maintain visual impact across screen sizes

## Success Criteria
- [ ] Personal introduction feels natural and welcoming
- [ ] Content reflects Pavan's identity as a filmmaker
- [ ] Typography maintains visual impact and readability
- [ ] Responsive design works across all devices
- [ ] Animations and interactions remain smooth
- [ ] Content aligns with About page narrative

## Testing Checklist
- [ ] Desktop view (1024px+) - verify content flow
- [ ] Tablet view (768px - 1023px) - check responsive behavior
- [ ] Mobile view (320px - 767px) - ensure readability
- [ ] Verify gradient effects on name
- [ ] Test animation timing and flow
- [ ] Check accessibility and screen reader compatibility 