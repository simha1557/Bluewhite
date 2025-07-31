'use client'

import { useTheme } from '@/lib/theme-context'
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
  compact?: boolean
}

export default function ThemeToggle({ 
  className = '', 
  showLabel = false, 
  compact = false 
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`${compact ? 'w-10 h-10' : 'w-12 h-12'} bg-muted rounded-lg animate-pulse ${className}`} />
    )
  }

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️'
      case 'dark':
        return '🌙'
      case 'system':
        return '💻'
      default:
        return '☀️'
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light theme'
      case 'dark':
        return 'Dark theme'
      case 'system':
        return 'System theme'
      default:
        return 'Light theme'
    }
  }

  const getNextThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark theme'
      case 'dark':
        return 'Switch to system theme'
      case 'system':
        return 'Switch to light theme'
      default:
        return 'Switch to dark theme'
    }
  }

  if (compact) {
    return (
      <button
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`
          w-10 h-10 rounded-lg bg-secondary hover:bg-accent 
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
          transition-all duration-200 flex items-center justify-center
          text-lg group relative
          ${className}
        `}
        aria-label={getNextThemeLabel()}
        title={getNextThemeLabel()}
        type="button"
      >
        <span className="transition-transform duration-200 group-hover:scale-110">
          {getIcon()}
        </span>
      </button>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">Theme</span>
          <span className="text-xs text-muted-foreground">
            {getLabel()} {resolvedTheme !== theme && `(${resolvedTheme})`}
          </span>
        </div>
      )}
      <button
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="
          flex items-center gap-2 px-4 py-2 rounded-lg 
          bg-secondary text-secondary-foreground 
          hover:bg-accent hover:text-accent-foreground
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          transition-all duration-200 text-sm font-medium
          border border-border group
        "
        aria-label={getNextThemeLabel()}
        type="button"
      >
        <span className="text-base transition-transform duration-200 group-hover:scale-110">
          {getIcon()}
        </span>
        <span className="hidden sm:inline">
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </span>
      </button>
    </div>
  )
}