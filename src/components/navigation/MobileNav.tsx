'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  className?: string
}

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-6 flex flex-col justify-center items-center">
    <motion.span
      className="absolute w-6 h-0.5 bg-current rounded-full"
      animate={{
        rotate: isOpen ? 45 : 0,
        y: isOpen ? 0 : -6,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
    <motion.span
      className="absolute w-6 h-0.5 bg-current rounded-full"
      animate={{
        opacity: isOpen ? 0 : 1,
        scale: isOpen ? 0 : 1,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    />
    <motion.span
      className="absolute w-6 h-0.5 bg-current rounded-full"
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? 0 : 6,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </div>
)

export const MobileNav = ({ className }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when menu is open
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
    { href: '/about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <div className={cn("md:hidden relative", className)}>
      {/* Hamburger Button */}
      <motion.button
        className="touch-target p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-accent/50 hover:border-accent/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        aria-controls="mobile-menu-popup"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <HamburgerIcon isOpen={isOpen} />
      </motion.button>

      {/* Mobile Menu Popup Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          >
            {/* Popup Box */}
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.2, 
                ease: "easeOut"
              }}
              className="absolute top-20 right-4 w-48 bg-black rounded-lg shadow-lg border border-gray-800 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              id="mobile-menu-popup"
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              {/* Menu Items */}
              <div className="p-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="block w-full text-white text-center py-3 px-4 font-medium transition-all duration-200 hover:text-gray-300 focus:outline-none focus:text-gray-300 mb-2 last:mb-0"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.05 + index * 0.1, 
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNav 