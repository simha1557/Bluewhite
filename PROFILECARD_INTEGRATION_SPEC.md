# ProfileCard Integration Specification

## 1. PROJECT OVERVIEW

### 1.1 What We Are Creating
We are integrating a sophisticated ProfileCard component into the About page that displays Pavan Simha's creative director profile with:
- Interactive 3D tilt effects on hover
- Profile image with gradient backgrounds
- Contact button that redirects to Linktree
- Responsive design for mobile and desktop
- Dark theme styling to match the website

### 1.2 Component Location
- **Component File**: `src/components/ProfileCard.tsx`
- **CSS File**: `src/components/ProfileCard.css`
- **Integration**: `src/app/about/page.tsx`

## 2. TECHNICAL SPECIFICATIONS

### 2.1 Component Structure
```
src/components/
├── ProfileCard.tsx          # Main component with TypeScript interfaces
└── ProfileCard.css          # Styling with CSS custom properties
```

### 2.2 Props Interface
```typescript
interface ProfileCardProps {
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  behindGradient?: string;
  innerGradient?: string;
  showBehindGradient?: boolean;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}
```

### 2.3 Animation Configuration
```typescript
const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
} as const;
```

## 3. IMPLEMENTATION TASKS

### Task 1: Create ProfileCard Component
**Priority**: High
**Estimated Time**: 2-3 hours

#### 3.1.1 Create Component File
- Create `src/components/ProfileCard.tsx`
- Implement TypeScript interfaces
- Add React hooks for animation handling
- Include error handling for image loading

#### 3.1.2 Key Features to Implement
- **3D Tilt Animation**: Mouse/touch interaction with smooth transitions
- **Gradient Backgrounds**: Dynamic CSS custom properties
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: RAF optimization, memoization

### Task 2: Create ProfileCard CSS
**Priority**: High
**Estimated Time**: 1-2 hours

#### 3.2.1 CSS Requirements
- **CSS Custom Properties**: For dynamic gradient positioning
- **3D Transforms**: Tilt effects with perspective
- **Responsive Units**: Fluid typography and spacing
- **Dark Theme**: Consistent with existing design system
- **Smooth Transitions**: Hardware-accelerated animations

#### 3.2.2 CSS Structure
```css
.pc-card-wrapper {
  /* Container with perspective */
}

.pc-card {
  /* 3D card with tilt transforms */
}

.pc-inside {
  /* Inner content with gradients */
}

.pc-content {
  /* Avatar and user info layout */
}
```

### Task 3: Integrate into About Page
**Priority**: High
**Estimated Time**: 1 hour

#### 3.3.1 Integration Steps
1. Import ProfileCard component
2. Replace placeholder in right section
3. Configure props for Pavan's profile
4. Test responsive behavior
5. Verify accessibility

#### 3.3.2 Usage Implementation
```tsx
<ProfileCard
  name="Pavan Simha"
  title="Creative Director"
  handle="pavansimha"
  status="Online"
  contactText="Contact Me"
  avatarUrl="/images/pavan-profile.jpg"
  showUserInfo={true}
  enableTilt={true}
  enableMobileTilt={false}
  onContactClick={() => window.open('https://linktr.ee/pavansimha', '_blank')}
/>
```

### Task 4: Image Asset Management
**Priority**: Medium
**Estimated Time**: 30 minutes

#### 3.4.1 Image Requirements
- **Profile Image**: `/public/images/pavan-profile.jpg`
- **Fallback Handling**: Graceful degradation for missing images
- **Optimization**: WebP format with fallbacks
- **Loading**: Lazy loading with skeleton states

### Task 5: Testing and Optimization
**Priority**: Medium
**Estimated Time**: 1-2 hours

#### 3.5.1 Testing Checklist
- [ ] Desktop hover interactions
- [ ] Mobile touch interactions
- [ ] Responsive breakpoints
- [ ] Accessibility compliance
- [ ] Performance metrics
- [ ] Cross-browser compatibility

#### 3.5.2 Performance Optimization
- **RAF Management**: Proper cleanup of animation frames
- **Event Listeners**: Efficient binding/unbinding
- **Memory Leaks**: Prevent with proper cleanup
- **Bundle Size**: Tree-shaking and code splitting

## 4. DESIGN SPECIFICATIONS

### 4.1 Visual Design
- **Color Scheme**: Dark theme with blue/purple gradients
- **Typography**: Consistent with existing design system
- **Spacing**: 8px grid system
- **Border Radius**: 12px for cards, 50% for avatars

### 4.2 Animation Design
- **Tilt Sensitivity**: Configurable via props
- **Smooth Transitions**: 600ms duration with easing
- **Initial Animation**: 1500ms entrance animation
- **Mobile Optimization**: Reduced sensitivity for touch

### 4.3 Responsive Behavior
- **Desktop**: Full 3D tilt effects
- **Tablet**: Reduced tilt sensitivity
- **Mobile**: Optional tilt with touch gestures
- **Touch Devices**: Device orientation support

## 5. ACCESSIBILITY REQUIREMENTS

### 5.1 WCAG Compliance
- **Keyboard Navigation**: Tab order and focus management
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: Minimum 4.5:1 ratio
- **Motion Sensitivity**: Respects `prefers-reduced-motion`

### 5.2 Interactive Elements
- **Contact Button**: Clear call-to-action
- **Focus Indicators**: Visible focus states
- **Error Handling**: Graceful fallbacks for failed loads

## 6. PERFORMANCE REQUIREMENTS

### 6.1 Animation Performance
- **60fps Target**: Smooth animations without jank
- **Hardware Acceleration**: Use `transform3d` for GPU acceleration
- **RAF Optimization**: Efficient animation loops
- **Memory Management**: Proper cleanup of event listeners

### 6.2 Loading Performance
- **Lazy Loading**: Images load on demand
- **Skeleton States**: Loading placeholders
- **Error Boundaries**: Graceful error handling
- **Bundle Optimization**: Tree-shaking unused code

## 7. BROWSER COMPATIBILITY

### 7.1 Supported Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### 7.2 Feature Detection
- **3D Transforms**: Fallback for older browsers
- **Device Orientation**: Progressive enhancement
- **CSS Custom Properties**: Polyfill for IE11

## 8. IMPLEMENTATION TIMELINE

### Phase 1: Core Development (Week 1)
- [ ] Create ProfileCard component structure
- [ ] Implement basic 3D tilt functionality
- [ ] Add CSS styling and animations
- [ ] Basic responsive design

### Phase 2: Integration & Testing (Week 2)
- [ ] Integrate into About page
- [ ] Configure props and styling
- [ ] Test responsive behavior
- [ ] Accessibility testing

### Phase 3: Optimization & Polish (Week 3)
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Final accessibility audit
- [ ] Documentation updates

## 9. SUCCESS CRITERIA

### 9.1 Functional Requirements
- [ ] 3D tilt animation works on desktop
- [ ] Contact button redirects to Linktree
- [ ] Responsive design works on all devices
- [ ] Accessibility compliance achieved

### 9.2 Performance Requirements
- [ ] Animation runs at 60fps
- [ ] No memory leaks detected
- [ ] Lighthouse score > 90
- [ ] Bundle size < 50KB

### 9.3 User Experience
- [ ] Smooth interactions
- [ ] Intuitive design
- [ ] Fast loading times
- [ ] Error-free operation

## 10. RISK MITIGATION

### 10.1 Technical Risks
- **Performance Issues**: Implement RAF optimization and cleanup
- **Browser Compatibility**: Use feature detection and fallbacks
- **Memory Leaks**: Proper event listener cleanup
- **Bundle Size**: Tree-shaking and code splitting

### 10.2 Design Risks
- **Accessibility**: Comprehensive testing with screen readers
- **Mobile Experience**: Touch-friendly interactions
- **Loading States**: Skeleton screens and error handling

## 11. MAINTENANCE CONSIDERATIONS

### 11.1 Code Quality
- **TypeScript**: Strict typing for all props
- **Documentation**: JSDoc comments for complex functions
- **Testing**: Unit tests for core functionality
- **Code Review**: Peer review process

### 11.2 Future Enhancements
- **Additional Animations**: Expand animation library
- **Theme Support**: Light/dark mode toggle
- **Internationalization**: Multi-language support
- **Analytics**: Track interaction metrics

## 12. DEPENDENCIES

### 12.1 Required Dependencies
- **React**: 18+ for hooks and features
- **TypeScript**: 4.9+ for type safety
- **Next.js**: 13+ for app router
- **Tailwind CSS**: For utility classes

### 12.2 Optional Dependencies
- **Framer Motion**: Alternative animation library
- **React Spring**: Physics-based animations
- **React Intersection Observer**: Lazy loading

## 13. DELIVERABLES

### 13.1 Code Files
- `src/components/ProfileCard.tsx`
- `src/components/ProfileCard.css`
- Updated `src/app/about/page.tsx`

### 13.2 Documentation
- Component API documentation
- Usage examples
- Accessibility guidelines
- Performance benchmarks

### 13.3 Assets
- Optimized profile image
- Fallback images
- Loading skeletons

This specification provides a comprehensive roadmap for integrating the ProfileCard component into the About page with attention to performance, accessibility, and user experience. 