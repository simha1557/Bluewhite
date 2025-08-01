'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface StarBorderProps {
  as?: React.ElementType
  className?: string
  color?: string
  speed?: string
  thickness?: number
  children: React.ReactNode
  href?: string
  onClick?: () => void
  [key: string]: any
}

const StarBorder: React.FC<StarBorderProps> = ({
  as: Component = "button",
  className = "",
  color = "magenta",
  speed = "6s",
  thickness = 3.7,
  children,
  href,
  onClick,
  ...rest
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const animationSpeed = prefersReducedMotion ? '0s' : speed

  const buttonContent = (
    <div className="relative inline-block">
      {/* Light beam border container */}
      <div 
        className="relative rounded-[20px] overflow-hidden"
        style={{
          padding: `${thickness}px`,
        }}
      >
        {/* Top light beam */}
        <div className="absolute top-0 left-0 w-full h-[3px] overflow-hidden">
          <div 
            className="w-full h-full animate-light-beam"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}40, ${color}, ${color}40, transparent)`,
              animationDuration: animationSpeed,
            }}
          />
        </div>

        {/* Bottom light beam */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] overflow-hidden">
          <div 
            className="w-full h-full animate-light-beam-reverse"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}40, ${color}, ${color}40, transparent)`,
              animationDuration: animationSpeed,
            }}
          />
        </div>

        {/* Left light beam */}
        <div className="absolute top-0 left-0 w-[3px] h-full overflow-hidden">
          <div 
            className="w-full h-full animate-light-beam-vertical"
            style={{
              background: `linear-gradient(180deg, transparent, ${color}40, ${color}, ${color}40, transparent)`,
              animationDuration: animationSpeed,
            }}
          />
        </div>

        {/* Right light beam */}
        <div className="absolute top-0 right-0 w-[3px] h-full overflow-hidden">
          <div 
            className="w-full h-full animate-light-beam-vertical-reverse"
            style={{
              background: `linear-gradient(180deg, transparent, ${color}40, ${color}, ${color}40, transparent)`,
              animationDuration: animationSpeed,
            }}
          />
        </div>

        {/* Additional glow effect */}
        <div 
          className="absolute inset-0 rounded-[20px] animate-light-glow"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}20 0%, transparent 70%)`,
            animationDuration: animationSpeed,
          }}
        />

        {/* Button content */}
        <div className="relative bg-gradient-to-b from-black to-gray-900 text-white text-center text-[16px] py-3 px-6 rounded-[16px] z-10">
          {children}
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className={`inline-block will-change-transform transform-gpu ${className}`} {...rest}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <Component 
      className={`inline-block will-change-transform transform-gpu ${className}`}
      onClick={onClick}
      {...rest}
    >
      {buttonContent}
    </Component>
  )
}

export default StarBorder 