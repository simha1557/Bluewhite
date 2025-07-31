'use client'

import { useTheme } from '@/lib/theme-context'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">Theme Control</span>
        <span className="text-xs text-muted-foreground">
          Current: {theme} (Resolved: {resolvedTheme})
        </span>
      </div>
      <button
        onClick={handleToggle}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '🌙 Dark' : theme === 'dark' ? '💻 System' : '☀️ Light'}
      </button>
    </div>
  )
}