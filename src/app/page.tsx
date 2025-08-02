
import SmoothScroll from '@/components/SmoothScroll'
import FadeInUp from '@/components/animations/FadeInUp'
import StarBorder from '@/components/ui/StarBorder'
import dynamic from 'next/dynamic'
import ResponsiveContainer from '@/components/layout/ResponsiveContainer'
import MobileNav from '@/components/navigation/MobileNav'
import ContactForm from '@/components/ContactForm'

// Dynamic import for DarkVeil component to avoid SSR issues
const DarkVeil = dynamic(() => import('@/components/DarkVeil'), {
  ssr: false,
  loading: () => (
    <div 
      className="w-full h-full"
      style={{ 
        background: 'linear-gradient(45deg, #7B748140, #7B748130, #7B748135, #7B748125)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite'
      }}
    />
  )
})

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <SmoothScroll />
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <ResponsiveContainer className="py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Pavan Simha</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <StarBorder
              as="a"
              href="/about"
              color="magenta"
              speed="5s"
              thickness={3.7}
              className="text-sm touch-target"
            >
              About
            </StarBorder>
          </nav>
          
          {/* Mobile Navigation */}
          <MobileNav />
        </ResponsiveContainer>
      </header>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        {/* DarkVeil Background */}
        <div className="absolute inset-0 z-0 opacity-80">
          <DarkVeil
            speed={0.5}
            hueShift={0}
            noiseIntensity={0.1}
            scanlineIntensity={0.05}
            scanlineFrequency={0.5}
            warpAmount={0.02}
            resolutionScale={1}
          />
        </div>

        <ResponsiveContainer className="relative z-10 max-w-4xl text-center">
          {/* Badge */}
          <FadeInUp delay={100}>
            <div className="inline-flex items-center rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-primary/20 text-primary ring-1 ring-inset ring-primary/30 mb-6 sm:mb-8 animate-pulse-slow hover:animate-none hover:bg-primary/30 transition-all duration-300 dark-glow">
              ✨ Filmmaker & Creative Director
            </div>
          </FadeInUp>
          
          <FadeInUp delay={200}>
            <h1 className="text-hero font-bold tracking-tight text-foreground font-sans leading-tight">
              Hi. I'm <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">Pavan Simha</span>, a creative director and filmmaker.
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={300}>
            <p className="mt-6 sm:mt-8 text-body leading-relaxed text-muted-foreground max-w-4xl mx-auto">
              I believe every story deserves to be told beautifully, where shadows become characters and light becomes dialogue.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={500}>
            <div className="mt-8 sm:mt-12 flex items-center justify-center">
              <StarBorder
                as="a"
                href="#contact"
                color="magenta"
                speed="5s"
                thickness={3.7}
                className="w-full sm:w-auto touch-target"
              >
                Let's Talk
              </StarBorder>
            </div>
          </FadeInUp>
        </ResponsiveContainer>
      </section>




      {/* Contact Section */}
      <section id="contact" className="section-padding bg-muted">
        <ResponsiveContainer>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-heading font-bold tracking-tight text-foreground font-sans">
              Let&apos;s Connect
            </h2>
            <p className="mt-4 text-body leading-8 text-muted-foreground">
              Got a story brewing? Drop me a line and let&apos;s make it happen.
            </p>
          </div>
          
          {/* Contact Form */}
          <div className="mt-12 sm:mt-16">
            <div className="mx-auto max-w-2xl">
              <div className="bg-background rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-border">
                <ContactForm />
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </section>
    </main>
  )
}