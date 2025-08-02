'use client'

import { useEffect } from 'react'
import { useState } from 'react'

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
      // Monitor Core Web Vitals
      import('web-vitals').then((webVitals) => {
        const { onCLS, onFCP, onLCP, onTTFB, onINP } = webVitals;
        const metrics: Partial<PerformanceMetrics> = {}

        onCLS((metric) => {
          metrics.CLS = metric.value
          console.log('CLS:', metric.value)
          if (metric.value > 0.1) {
            console.warn('Poor CLS detected:', metric.value)
          }
        })

        onINP((metric) => {
          metrics.FID = metric.value
          console.log('INP (was FID):', metric.value)
          if (metric.value > 200) {
            console.warn('Poor INP detected:', metric.value)
          }
        })

        onFCP((metric) => {
          metrics.FCP = metric.value
          console.log('FCP:', metric.value)
          if (metric.value > 1800) {
            console.warn('Poor FCP detected:', metric.value)
          }
        })

        onLCP((metric) => {
          metrics.LCP = metric.value
          console.log('LCP:', metric.value)
          if (metric.value > 2500) {
            console.warn('Poor LCP detected:', metric.value)
          }
        })

        onTTFB((metric) => {
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

export const usePerformanceObserver = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor long tasks
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry)
          }
        }
      })
      
      observer.observe({ entryTypes: ['longtask'] })
      
      return () => observer.disconnect()
    }
  }, [])
} 