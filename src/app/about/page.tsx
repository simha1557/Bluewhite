"use client"

import SmoothScroll from '@/components/SmoothScroll'
import Link from 'next/link'
import ProfileCard from '@/components/ProfileCard'
import QuoteSection from '@/components/QuoteSection'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <SmoothScroll />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-foreground">Pavan Simha</h1>
          
          {/* Back Arrow */}
          <Link 
            href="/"
            className="flex items-center justify-center px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 min-h-[44px]"
            aria-label="Back to home"
          >
            <span className="text-base font-medium">← Back</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-sans animate-fade-in">
              About <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">Pavan Simha Reddy</span>
            </h1>
          </div>

          {/* Split Layout Container */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
            {/* Left Section - Biographical Content (60%) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
                  Pavan Simha Reddy is an Indian writer and creative director from Telangana, Sathupally. He was born in 2003, and he developed a passion for movies when he used to love his favorite early childhood movies, such as Finding Nemo, Dinosaur, and Hanuman, which continue to inspire him.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
                  He learned the art of storytelling in his childhood from his father's Kodak camera and home movies. His early curiosity developed into serious passion in his late teens when he officially learned about film making and film techniques.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
                  Pavan attained distinction during his college years by winning short film competitions conducted in successive intercollege film festivals over a period of three years. His best film is a short film titled "Krishna," which is education and environment oriented.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">
                  As a creative director and writer, Pavan focuses on developing meaningful narratives for film. He combines technical knowledge with creative storytelling to produce compelling visual content. Outside filmmaking, he maintains balance through yoga practice and playing badminton.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  Currently, Pavan is building his professional portfolio while pursuing opportunities in the film industry. His goal is to establish himself as a filmmaker who creates impactful stories through thoughtful direction and writing.
                </p>
              </div>
            </div>

            {/* Right Section - Profile Card Container (40%) */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="flex items-center justify-center h-full min-h-[400px] lg:min-h-[600px]">
                <div className="profile-card-container w-full max-w-sm md:max-w-md">
                  <ProfileCard
                    name="Pavan Simha"
                    title="Creative Director"
                    handle="pavansimha"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl="/images/pavan-profile.png"
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <QuoteSection />
    </main>
  )
} 