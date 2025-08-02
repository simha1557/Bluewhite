# Error Fix & Deployment Preparation Specification

## Problem Statement
The BlueWhiteMedia website has several critical errors preventing it from running properly:
1. Module resolution errors (framer-motion, @/lib/utils)
2. Client/Server component issues
3. Build compilation failures
4. Cache and dependency conflicts

## Current Error Analysis

### Critical Errors Identified
1. **Module Resolution**: `Can't resolve 'framer-motion'` and `Can't resolve '@/lib/utils'`
2. **Client Component Issues**: usePerformance hook needs 'use client' directive
3. **Build Cache Issues**: Corrupted Next.js cache causing compilation failures
4. **Dependency Conflicts**: Missing or incorrectly installed packages

## Fix Implementation Plan

### Phase 1: Immediate Error Resolution

#### 1.1 Clean Environment Setup
```bash
# Kill all Node processes
pkill -f node

# Clear all caches
rm -rf .next
rm -rf node_modules/.cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 1.2 Fix Module Resolution Issues
- Verify all dependencies are properly installed
- Check import paths and aliases
- Ensure TypeScript configuration is correct

#### 1.3 Fix Client Component Issues
- Add 'use client' directives where needed
- Separate client and server components
- Fix hook usage in server components

### Phase 2: Component Structure Fixes

#### 2.1 MobileNav Component Fix
```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// Rest of component...
```

#### 2.2 usePerformance Hook Fix
```tsx
'use client'

import { useEffect, useState } from 'react'

// Rest of hook...
```

#### 2.3 Utils File Verification
```tsx
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Phase 3: Build Configuration Fixes

#### 3.1 Next.js Configuration
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['react-hook-form', '@hookform/resolvers', 'zod', '@react-three/fiber', 'three'],
    optimizeCss: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
```

#### 3.2 TypeScript Configuration
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Phase 4: Testing & Validation

#### 4.1 Build Testing
```bash
# Test build process
npm run build

# Test development server
npm run dev

# Test production server
npm run start
```

#### 4.2 Component Testing
- Test all components individually
- Verify responsive design works
- Check mobile navigation functionality
- Test contact form submission

## Implementation Tasks

### Task 1: Environment Cleanup
**Priority**: Critical
**Status**: Pending

**Steps**:
1. Kill all Node processes
2. Clear Next.js cache
3. Clear npm cache
4. Reinstall dependencies

**Commands**:
```bash
pkill -f node
rm -rf .next
rm -rf node_modules/.cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Task 2: Fix Component Issues
**Priority**: Critical
**Status**: Pending

**Steps**:
1. Add 'use client' to MobileNav component
2. Fix usePerformance hook
3. Verify utils file exists and is correct
4. Check all import statements

### Task 3: Build Configuration
**Priority**: High
**Status**: Pending

**Steps**:
1. Update Next.js configuration
2. Verify TypeScript configuration
3. Check package.json scripts
4. Test build process

### Task 4: Testing & Validation
**Priority**: High
**Status**: Pending

**Steps**:
1. Test development server
2. Test production build
3. Verify responsive design
4. Test all functionality

## Code Changes Required

### 1. Fix MobileNav Component
```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  className?: string
}

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-6">
    <span className={cn(
      "absolute left-0 top-1/2 w-6 h-0.5 bg-current transform transition-all duration-300",
      isOpen ? "rotate-45" : "-translate-y-1"
    )} />
    <span className={cn(
      "absolute left-0 top-1/2 w-6 h-0.5 bg-current transform transition-all duration-300",
      isOpen ? "opacity-0" : "opacity-100"
    )} />
    <span className={cn(
      "absolute left-0 top-1/2 w-6 h-0.5 bg-current transform transition-all duration-300",
      isOpen ? "-rotate-45" : "translate-y-1"
    )} />
  </div>
)

export const MobileNav = ({ className }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <div className={cn("md:hidden", className)}>
      <button
        className="touch-target p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        aria-controls="mobile-menu"
      >
        <HamburgerIcon isOpen={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-80 h-full bg-background shadow-2xl border-l border-border"
              onClick={(e) => e.stopPropagation()}
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Menu</h2>
                <button
                  className="touch-target p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="block text-body font-medium text-foreground hover:text-primary transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-accent/50"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  <p>BlueWhiteMedia</p>
                  <p>Professional Design Services</p>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNav
```

### 2. Fix usePerformance Hook
```tsx
'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  CLS: number
  FID: number
  FCP: number
  LCP: number
  TTFB: number
}

export const usePerformance = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        const metrics: Partial<PerformanceMetrics> = {}

        getCLS((metric) => {
          metrics.CLS = metric.value
          console.log('CLS:', metric.value)
          if (metric.value > 0.1) {
            console.warn('Poor CLS detected:', metric.value)
          }
        })

        getFID((metric) => {
          metrics.FID = metric.value
          console.log('FID:', metric.value)
          if (metric.value > 100) {
            console.warn('Poor FID detected:', metric.value)
          }
        })

        getFCP((metric) => {
          metrics.FCP = metric.value
          console.log('FCP:', metric.value)
          if (metric.value > 1800) {
            console.warn('Poor FCP detected:', metric.value)
          }
        })

        getLCP((metric) => {
          metrics.LCP = metric.value
          console.log('LCP:', metric.value)
          if (metric.value > 2500) {
            console.warn('Poor LCP detected:', metric.value)
          }
        })

        getTTFB((metric) => {
          metrics.TTFB = metric.value
          console.log('TTFB:', metric.value)
          if (metric.value > 600) {
            console.warn('Poor TTFB detected:', metric.value)
          }
        })
      }).catch((error) => {
        console.warn('Failed to load web-vitals:', error)
      })
    }
  }, [])
}

export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReduced(mediaQuery.matches)
      
      const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])
  
  return prefersReduced
}
```

### 3. Update Main Page Component
```tsx
import SmoothScroll from '@/components/SmoothScroll'
import FadeInUp from '@/components/animations/FadeInUp'
import StarBorder from '@/components/ui/StarBorder'
import Silk from '@/components/Silk'
import ResponsiveContainer from '@/components/layout/ResponsiveContainer'
import MobileNav from '@/components/navigation/MobileNav'
import dynamic from 'next/dynamic'

// Dynamically import ContactForm for better performance
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
  ssr: false
})

// Dynamically import performance hook to avoid SSR issues
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), {
  ssr: false
})

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <PerformanceMonitor />
      <SmoothScroll />
      
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <ResponsiveContainer className="py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Pavan Simha</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <StarBorder
              as="a"
              href="/about"
              color="magenta"
              speed="5s"
              thickness={3.7}
              className="text-sm touch-target"
            >
              About
            </StarBorder>
          </nav>
          
          {/* Mobile Navigation */}
          <MobileNav />
        </ResponsiveContainer>
      </header>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        {/* Silk Background */}
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="w-full h-full">
            <Silk
              speed={2.5}
              scale={1.2}
              noiseIntensity={1.5}
              rotation={0.1}
            />
          </div>
        </div>

        <ResponsiveContainer className="relative z-10 max-w-4xl text-center">
          {/* Badge */}
          <FadeInUp delay={100}>
            <div className="inline-flex items-center rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 mb-6 sm:mb-8 animate-pulse-slow hover:animate-none hover:bg-primary/20 transition-all duration-300">
              ✨ Filmmaker & Creative Director
            </div>
          </FadeInUp>
          
          <FadeInUp delay={200}>
            <h1 className="text-hero font-bold tracking-tight text-foreground font-sans leading-tight">
              Hi. I'm <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">Pavan Simha</span>, a creative director and filmmaker.
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={300}>
            <p className="mt-6 sm:mt-8 text-body leading-relaxed text-muted-foreground max-w-4xl mx-auto">
              I believe every story deserves to be told beautifully, where shadows become characters and light becomes dialogue.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={500}>
            <div className="mt-8 sm:mt-12 flex items-center justify-center">
              <StarBorder
                as="a"
                href="#contact"
                color="magenta"
                speed="5s"
                thickness={3.7}
                className="w-full sm:w-auto touch-target"
              >
                Let's Talk
              </StarBorder>
            </div>
          </FadeInUp>
        </ResponsiveContainer>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-muted">
        <ResponsiveContainer>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-heading font-bold tracking-tight text-foreground font-sans">
              Let&apos;s Connect
            </h2>
            <p className="mt-4 text-body leading-8 text-muted-foreground">
              Got a story brewing? Drop me a line and let&apos;s make it happen.
            </p>
          </div>
          
          {/* Contact Form */}
          <div className="mt-12 sm:mt-16">
            <div className="mx-auto max-w-2xl">
              <div className="bg-background rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-border">
                <ContactForm />
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </main>
  )
}
```

### 4. Create Performance Monitor Component
```tsx
'use client'

import { usePerformance } from '@/hooks/usePerformance'

export default function PerformanceMonitor() {
  usePerformance()
  return null
}
```

## Testing Strategy

### 1. Environment Testing
```bash
# Test clean environment
pkill -f node
rm -rf .next
rm -rf node_modules/.cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 2. Build Testing
```bash
# Test development build
npm run dev

# Test production build
npm run build

# Test production server
npm run start
```

### 3. Component Testing
- Test MobileNav component
- Test usePerformance hook
- Test ResponsiveContainer
- Test all responsive features

## Success Criteria

### Primary Goals
- [ ] No compilation errors
- [ ] Development server starts successfully
- [ ] Production build completes
- [ ] All components render properly
- [ ] Mobile navigation works
- [ ] Responsive design functions

### Secondary Goals
- [ ] Performance monitoring works
- [ ] All animations function
- [ ] Contact form submits
- [ ] Email system works
- [ ] Accessibility features work

## Risk Mitigation

### High-Risk Scenarios
1. **Dependency conflicts**
   - Mitigation: Clean environment setup
   
2. **Build cache issues**
   - Mitigation: Clear all caches
   
3. **Client/Server component issues**
   - Mitigation: Proper component separation

### Medium-Risk Scenarios
1. **Performance issues**
   - Mitigation: Lazy loading and optimization
   
2. **Mobile responsiveness issues**
   - Mitigation: Comprehensive testing

## Timeline

### Day 1: Error Resolution
- Environment cleanup
- Fix component issues
- Test basic functionality

### Day 2: Testing & Validation
- Comprehensive testing
- Performance optimization
- Final validation

### Day 3: Deployment Preparation
- Production build testing
- Performance auditing
- Documentation updates

## Conclusion

This specification provides a comprehensive approach to fixing all current errors and preparing the BlueWhiteMedia website for deployment. The implementation focuses on systematic error resolution, proper component structure, and thorough testing to ensure a stable and performant application. 