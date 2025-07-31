'use client'

import { useTheme } from '@/lib/theme-context'
import { useEffect, useState } from 'react'

export default function ThemeDebug() {
  const { theme } = useTheme()
  const [documentClass, setDocumentClass] = useState('')

  useEffect(() => {
    const updateDocumentClass = () => {
      setDocumentClass(document.documentElement.className)
    }

    updateDocumentClass()
    
    // Create observer to watch for class changes
    const observer = new MutationObserver(updateDocumentClass)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-3 text-xs space-y-1 shadow-lg z-50">
      <div className="font-mono">
        <div>Theme: <span className="font-bold">{theme}</span></div>
        <div>HTML Class: <span className="font-bold">{documentClass}</span></div>
      </div>
    </div>
  )
}