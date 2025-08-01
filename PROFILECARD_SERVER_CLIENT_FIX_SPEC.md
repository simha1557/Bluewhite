# ProfileCard Server-Client Component Fix Specification

## 1. CRITICAL ISSUE IDENTIFICATION

### 1.1 Primary Error
**Error**: "Event handlers cannot be passed to Client Component props"
- **Root Cause**: About page (Server Component) is passing `onContactClick` function to ProfileCard (Client Component)
- **Impact**: Runtime error, component fails to render
- **Location**: `src/app/about/page.tsx` → `src/components/ProfileCard.tsx`

### 1.2 Error Details
```
Error: Event handlers cannot be passed to Client Component props.
If you need interactivity, consider converting part of this to a Client Component.
```

## 2. IMMEDIATE FIXES REQUIRED

### Task 1: Convert About Page to Client Component
**Priority**: Critical
**Estimated Time**: 2 minutes

#### 2.1.1 Fix Implementation
Add `"use client"` directive to `src/app/about/page.tsx`:

```typescript
"use client"

import SmoothScroll from '@/components/SmoothScroll'
import Link from 'next/link'
import ProfileCard from '@/components/ProfileCard'
```

#### 2.1.2 Alternative Solution
Move event handler logic into ProfileCard component itself

### Task 2: Remove Function Props from Server Component
**Priority**: Critical
**Estimated Time**: 1 minute

#### 2.2.1 Remove onContactClick Prop
```typescript
// Remove this from About page:
onContactClick={() => window.open('https://linktr.ee/pavansimha', '_blank')}

// ProfileCard will handle the click internally
```

### Task 3: Update ProfileCard to Handle Click Internally
**Priority**: Critical
**Estimated Time**: 2 minutes

#### 2.3.1 Modify Contact Handler
```typescript
const handleContactClick = useCallback(() => {
  try {
    // Use default behavior if no custom handler provided
    if (onContactClick) {
      onContactClick();
    } else {
      window.open('https://linktr.ee/pavansimha', '_blank');
    }
  } catch (error) {
    console.error('Error in contact button click handler:', error);
    // Fallback to default behavior
    window.open('https://linktr.ee/pavansimha', '_blank');
  }
}, [onContactClick]);
```

## 3. IMPLEMENTATION STEPS

### Step 1: Fix About Page
1. Add `"use client"` to top of `src/app/about/page.tsx`
2. Remove `onContactClick` prop from ProfileCard usage
3. Test compilation

### Step 2: Update ProfileCard
1. Ensure ProfileCard handles click internally
2. Add fallback behavior for missing onContactClick
3. Test functionality

### Step 3: Verify Fix
1. Check browser console for errors
2. Test contact button functionality
3. Verify all interactions work

## 4. ALTERNATIVE APPROACHES

### Approach A: Client Component Conversion (Recommended)
- Convert About page to Client Component
- Keep all existing functionality
- Maintain current props structure

### Approach B: Internal Handler
- Remove onContactClick prop entirely
- Handle click logic inside ProfileCard
- Simpler but less flexible

### Approach C: Hybrid Approach
- Keep About page as Server Component
- Move ProfileCard usage to a separate Client Component wrapper
- Best for performance but more complex

## 5. TESTING CHECKLIST

### 5.1 Compilation Tests
- [ ] No build errors
- [ ] No TypeScript errors
- [ ] No runtime errors

### 5.2 Functionality Tests
- [ ] About page loads
- [ ] ProfileCard renders
- [ ] Contact button works
- [ ] 3D effects work
- [ ] Responsive design works

### 5.3 Performance Tests
- [ ] Page loads quickly
- [ ] No hydration errors
- [ ] Smooth animations
- [ ] No memory leaks

## 6. SUCCESS CRITERIA

### 6.1 Error Resolution
- [ ] No "Event handlers cannot be passed" error
- [ ] No console errors
- [ ] No runtime crashes

### 6.2 Functionality Verification
- [ ] Contact button redirects to Linktree
- [ ] All animations work properly
- [ ] Component is fully interactive

### 6.3 Performance Verification
- [ ] Page loads without delays
- [ ] Animations are smooth
- [ ] No hydration mismatches

## 7. ROLLBACK PLAN

If issues persist:
1. **Temporary**: Remove ProfileCard from About page
2. **Alternative**: Use static profile card
3. **Investigation**: Debug step by step
4. **Documentation**: Update error logs

This specification provides a clear path to resolve the Server-Client Component event handler issue. 