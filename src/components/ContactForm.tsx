'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ 
  className = ''
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange'
  })

  const watchedFields = watch()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setSubmitStatus('success')
      reset()
      console.log('Form submitted successfully:', data)
    } catch (error) {
      setSubmitStatus('error')
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form'
      console.error('Form submission error:', errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldError = (fieldName: keyof ContactFormData) => {
    return errors[fieldName]?.message
  }

  const isFieldValid = (fieldName: keyof ContactFormData) => {
    return watchedFields[fieldName] && !errors[fieldName]
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 max-w-2xl mx-auto ${className}`}>
      {/* Name Field */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-foreground mb-2"
        >
          Full Name *
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className={`
            w-full px-4 py-3 rounded-lg border bg-background text-foreground
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
            text-base sm:text-sm
            ${errors.name 
              ? 'border-destructive focus:border-destructive' 
              : isFieldValid('name')
                ? 'border-green-500 focus:border-green-500'
                : 'border-border hover:border-accent-foreground'
            }
          `}
          placeholder="Enter your full name"
          disabled={isSubmitting}
        />
        {getFieldError('name') && (
          <p className="mt-1 text-sm text-destructive">{getFieldError('name')}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-foreground mb-2"
        >
          Email Address *
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={`
            w-full px-4 py-3 rounded-lg border bg-background text-foreground
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
            text-base sm:text-sm
            ${errors.email 
              ? 'border-destructive focus:border-destructive' 
              : isFieldValid('email')
                ? 'border-green-500 focus:border-green-500'
                : 'border-border hover:border-accent-foreground'
            }
          `}
          placeholder="Enter your email address"
          disabled={isSubmitting}
        />
        {getFieldError('email') && (
          <p className="mt-1 text-sm text-destructive">{getFieldError('email')}</p>
        )}
      </div>

      {/* Company Field */}
      <div>
        <label 
          htmlFor="company" 
          className="block text-sm font-medium text-foreground mb-2"
        >
          Company (Optional)
        </label>
        <input
          {...register('company')}
          type="text"
          id="company"
          className={`
            w-full px-4 py-3 rounded-lg border bg-background text-foreground
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
            text-base sm:text-sm
            ${errors.company 
              ? 'border-destructive focus:border-destructive' 
              : isFieldValid('company')
                ? 'border-green-500 focus:border-green-500'
                : 'border-border hover:border-accent-foreground'
            }
          `}
          placeholder="Enter your company name"
          disabled={isSubmitting}
        />
        {getFieldError('company') && (
          <p className="mt-1 text-sm text-destructive">{getFieldError('company')}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label 
          htmlFor="message" 
          className="block text-sm font-medium text-foreground mb-2"
        >
          Message *
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          className={`
            w-full px-4 py-3 rounded-lg border bg-background text-foreground
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
            resize-vertical min-h-[120px] text-base sm:text-sm
            ${errors.message 
              ? 'border-destructive focus:border-destructive' 
              : isFieldValid('message')
                ? 'border-green-500 focus:border-green-500'
                : 'border-border hover:border-accent-foreground'
            }
          `}
          placeholder="Tell us about your project or how we can help you..."
          disabled={isSubmitting}
        />
        {getFieldError('message') && (
          <p className="mt-1 text-sm text-destructive">{getFieldError('message')}</p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          {watchedFields.message?.length || 0} / 2000 characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={`
          w-full px-6 py-4 rounded-lg font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          text-base sm:text-sm min-h-[52px] flex items-center justify-center
          ${isSubmitting || !isValid
            ? 'bg-muted text-muted-foreground cursor-not-allowed'
            : 'bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] shadow-lg hover:shadow-xl'
          }
        `}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending Message...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-in fade-in-50 slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <div className="text-green-600 dark:text-green-400 text-xl">✅</div>
            <div>
              <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                Message sent successfully!
              </p>
              <p className="text-green-600 dark:text-green-300 text-xs mt-1">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-in fade-in-50 slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <div className="text-red-600 dark:text-red-400 text-xl">❌</div>
            <div>
              <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                Failed to send message
              </p>
              <p className="text-red-600 dark:text-red-300 text-xs mt-1">
                Please try again or contact us directly at agency@yourcompany.com
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Required fields note */}
      <p className="text-xs text-muted-foreground">
        * Required fields
      </p>
    </form>
  )
}