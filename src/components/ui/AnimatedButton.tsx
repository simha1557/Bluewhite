'use client'

import React from 'react'
import Link from 'next/link'

interface AnimatedButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold
    transition-all duration-300 ease-out
    transform-gpu will-change-transform
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    group overflow-hidden
  `

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 
      hover:from-blue-500 hover:to-blue-600
      text-white shadow-lg hover:shadow-xl
      focus:ring-blue-500
      hover:scale-105 active:scale-95
      before:absolute before:inset-0 
      before:bg-gradient-to-r before:from-white/20 before:to-transparent 
      before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200 
      hover:from-gray-50 hover:to-gray-100
      text-gray-900 border border-gray-300
      focus:ring-gray-500 shadow-sm hover:shadow-md
      hover:scale-105 active:scale-95
    `,
    outline: `
      border-2 border-blue-600 text-blue-600
      hover:bg-blue-600 hover:text-white
      focus:ring-blue-500
      hover:scale-105 active:scale-95
      before:absolute before:inset-0 before:bg-blue-600
      before:scale-x-0 hover:before:scale-x-100
      before:transition-transform before:duration-300
      before:origin-left before:-z-10
    `
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl'
  }

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `

  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Shine effect */}
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500" />
    </>
  )

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {buttonContent}
    </button>
  )
}

export default AnimatedButton