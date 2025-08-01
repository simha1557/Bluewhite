# Branding and Navigation Updates - Lite Spec

## Quick Overview
Three key updates to implement:

1. **Logo**: "BlueWhiteMedia" → "Pavan Simha" (home page header)
2. **About Button**: Apply StarBorder styling (magenta, 3.7px thickness, 5s speed)
3. **Back Arrow**: Add to About page for home navigation

## Implementation Tasks

### Task 1: Update Logo
- File: `src/app/page.tsx`
- Change: `<h1>BlueWhiteMedia</h1>` → `<h1>Pavan Simha</h1>`

### Task 2: Style About Button
- File: `src/app/page.tsx`
- Replace current About Link with StarBorder component
- Props: `color="magenta"`, `speed="5s"`, `thickness={3.7}`

### Task 3: Add Back Arrow
- File: `src/app/about/page.tsx`
- Add back arrow button in top-left
- Navigate to home page (`/`)
- Use arrow icon with hover effects

## Files to Modify
- `src/app/page.tsx` (logo + about button)
- `src/app/about/page.tsx` (back arrow) 