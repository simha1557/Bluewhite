import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 * Uses clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to format class names with conditional logic
 */
export function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Utility function to create responsive class names
 */
export function responsiveClass(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
) {
  return [
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`
  ].filter(Boolean).join(' ')
}

/**
 * Utility function to create responsive spacing
 */
export function responsiveSpacing(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
) {
  return responsiveClass(base, sm, md, lg, xl)
}

/**
 * Utility function to create responsive text sizes
 */
export function responsiveText(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
) {
  return responsiveClass(base, sm, md, lg, xl)
} 