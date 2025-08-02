"use client"

import FadeInUp from '@/components/animations/FadeInUp'

export default function QuoteSection() {
  return (
    <section className="pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 px-6 sm:px-8 bg-background">
      <div className="mx-auto max-w-4xl text-center">
        <FadeInUp delay={100}>
          <blockquote className="mb-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-foreground bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              "Cinema's characteristic forte is its ability to capture and communicate the intimacies of the human mind"
            </p>
            <footer className="text-base sm:text-lg font-medium text-muted-foreground">
              — Satyajit Ray
            </footer>
          </blockquote>
        </FadeInUp>
      </div>
    </section>
  )
} 