# ProfileCard Hover Glare Fix Specification

## 1. ISSUE IDENTIFICATION

### 1.1 Primary Problems
**Issue 1**: Hover Glare Effect
- **Problem**: When mouse hovers on card, it creates unwanted glare effects
- **Location**: `.pc-shine` and related hover effects causing excessive brightness/contrast
- **Impact**: Poor user experience, image looks worse on hover

**Issue 2**: Image Height Positioning
- **Problem**: Image is positioned too low within the card
- **Location**: `.pc-avatar-content .avatar` positioning
- **Impact**: Image appears cut off or not optimally positioned

### 1.2 Visual Symptoms
- **Glare on Hover**: Excessive brightness and contrast when hovering
- **Low Image Position**: Image appears too close to bottom of card
- **Poor Visual Balance**: Image doesn't fill the card space optimally

## 2. IMMEDIATE FIXES REQUIRED

### Task 1: Remove Hover Glare Effects
**Priority**: Critical
**Estimated Time**: 3 minutes

#### 2.1.1 Disable Problematic Hover Effects
```css
/* Remove or reduce glare-causing hover effects */
.pc-card:hover .pc-shine,
.pc-card.active .pc-shine {
  /* Remove: filter: brightness(0.85) contrast(1.5) saturate(0.5); */
  filter: brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5);
  animation: holo-bg 18s linear infinite; /* Keep original animation */
}

.pc-card:hover .pc-shine::before,
.pc-card.active .pc-shine::before,
.pc-card:hover .pc-shine::after,
.pc-card.active .pc-shine::after {
  /* Remove: opacity: 1; */
  opacity: 0; /* Keep hidden to prevent glare */
}
```

### Task 2: Adjust Image Height Position
**Priority**: High
**Estimated Time**: 2 minutes

#### 2.2.1 Improve Image Positioning
```css
.pc-avatar-content .avatar {
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(1);
  /* Change from: bottom: 2px; */
  bottom: 20px; /* Increase height to move image up */
  opacity: calc(1.75 - var(--pointer-from-center));
}
```

## 3. DESIGN IMPROVEMENTS

### 3.1 Hover Effect Simplification
- **Remove Glare**: Disable brightness/contrast changes on hover
- **Keep Subtle Effects**: Maintain 3D tilt without visual artifacts
- **Smooth Transitions**: Ensure hover feels natural and professional

### 3.2 Image Positioning Enhancement
- **Better Vertical Balance**: Move image up for better visual composition
- **Optimal Sizing**: Ensure image fills card space appropriately
- **Maintain Aspect Ratio**: Keep image proportions intact

### 3.3 Visual Consistency
- **No Glare**: Eliminate any brightness/contrast issues
- **Clean Hover**: Subtle interactions without visual artifacts
- **Professional Appearance**: Maintain polished design

## 4. IMPLEMENTATION STEPS

### Step 1: Fix Hover Glare
1. Modify `.pc-card:hover .pc-shine` styles
2. Remove problematic filter effects
3. Keep original animation running
4. Test hover interactions

### Step 2: Adjust Image Position
1. Update `.pc-avatar-content .avatar` positioning
2. Increase bottom value to move image up
3. Test visual balance
4. Fine-tune if needed

### Step 3: Test and Verify
1. Check hover effects
2. Verify image positioning
3. Test on different devices
4. Ensure no visual artifacts

## 5. CSS CHANGES REQUIRED

### 5.1 Remove Hover Glare
```css
.pc-card:hover .pc-shine,
.pc-card.active .pc-shine {
  /* Remove glare-causing effects */
  filter: brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5);
  animation: holo-bg 18s linear infinite;
}

.pc-card:hover .pc-shine::before,
.pc-card.active .pc-shine::before,
.pc-card:hover .pc-shine::after,
.pc-card.active .pc-shine::after {
  opacity: 0; /* Keep hidden to prevent glare */
}
```

### 5.2 Adjust Image Height
```css
.pc-avatar-content .avatar {
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(1);
  bottom: 20px; /* Increased from 2px to move image up */
  opacity: calc(1.75 - var(--pointer-from-center));
}
```

### 5.3 Optional: Further Image Adjustments
```css
/* If more adjustment needed */
.pc-avatar-content .avatar {
  bottom: 30px; /* Further increase if needed */
  /* Or use percentage-based positioning */
  /* bottom: 15%; */
}
```

## 6. TESTING CHECKLIST

### 6.1 Hover Effects
- [ ] No glare or excessive brightness on hover
- [ ] Smooth 3D tilt maintained
- [ ] No contrast issues
- [ ] Professional appearance

### 6.2 Image Positioning
- [ ] Image positioned higher in card
- [ ] Better visual balance
- [ ] No cutoff issues
- [ ] Optimal sizing

### 6.3 Overall Design
- [ ] Clean hover interactions
- [ ] Professional appearance
- [ ] Consistent styling
- [ ] Good user experience

## 7. SUCCESS CRITERIA

### 7.1 Hover Quality
- [ ] No glare effects on hover
- [ ] Subtle 3D interactions
- [ ] Smooth transitions
- [ ] Professional feel

### 7.2 Image Quality
- [ ] Better vertical positioning
- [ ] Optimal visual balance
- [ ] No positioning issues
- [ ] Professional appearance

### 7.3 User Experience
- [ ] Intuitive interactions
- [ ] No visual artifacts
- [ ] Responsive design
- [ ] Enhanced engagement

## 8. ROLLBACK PLAN

If issues occur:
1. **Temporary**: Revert to previous working version
2. **Investigation**: Debug step by step
3. **Alternative**: Use simpler hover approach
4. **Documentation**: Update implementation notes

This specification ensures the ProfileCard has clean hover effects without glare and properly positioned images. 