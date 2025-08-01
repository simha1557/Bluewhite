'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Handle smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement
      
      if (!link) return
      
      const href = link.getAttribute('href')
      if (!href || href === '#') return
      
      e.preventDefault()
      
      const targetElement = document.querySelector(href)
      if (!targetElement) return
      
      // Calculate offset for sticky header
      const headerHeight = 80 // Approximate header height
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Update URL without triggering page refresh
      history.pushState(null, '', href)
    }
    
    // Add event listener to document
    document.addEventListener('click', handleClick)
    
    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
  
  return null // This component doesn't render anything
}