
import SmoothScroll from '@/components/SmoothScroll'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import StarBorder from '@/components/ui/StarBorder'
import Silk from '@/components/Silk'
import dynamic from 'next/dynamic'


// Dynamically import ContactForm for better performance
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
  ssr: false
})

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <SmoothScroll />
      {/* Header with Theme Toggle */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 flex justify-between items-center">
                           <h1 className="text-lg font-semibold text-foreground">BlueWhiteMedia</h1>
          {/* Dark theme only - no toggle needed */}
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        {/* Silk Background */}
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="w-full h-full">
            <Silk
              speed={2.5}
              scale={1.2}
              noiseIntensity={1.5}
              rotation={0.1}
            />
          </div>
        </div>


        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Badge */}
          <FadeInUp delay={100}>
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 mb-8 animate-pulse-slow hover:animate-none hover:bg-primary/20 transition-all duration-300">
              ✨ Trusted by businesses worldwide
            </div>
          </FadeInUp>
          
          <FadeInUp delay={200}>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-sans bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              WE ARE <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">CREATIVE DIRECTORS</span>
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={300}>
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl leading-8 text-muted-foreground max-w-3xl mx-auto px-4">
              We make advertising, branding and portfolio for film aspirants.
            </p>
          </FadeInUp>
          

          <FadeInUp delay={500}>
            <div className="mt-12 flex items-center justify-center">
              <StarBorder
                as="a"
                href="#contact"
                color="magenta"
                speed="5s"
                thickness={3.7}
                className="w-full sm:w-auto"
              >
                Let's Talk
              </StarBorder>
            </div>
          </FadeInUp>

          {/* Social proof */}
          <FadeInUp delay={600}>
            <div className="mt-16 flex items-center justify-center gap-8 opacity-60">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Trusted by companies like</div>
            </div>
            <StaggerContainer className="mt-4 flex items-center justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap px-4" staggerDelay={80}>
              {['Film Students', 'Indie Filmmakers', 'Production Houses', 'Actors & Directors', 'Film Festivals'].map((industry) => (
                <span key={industry} className="text-xs sm:text-sm font-medium text-muted-foreground/80 px-2 sm:px-3 py-1 rounded-full bg-muted border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:scale-105">
                  {industry}
                </span>
              ))}
            </StaggerContainer>
          </FadeInUp>
        </div>
      </section>




      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-sans">
              Let&apos;s Work Together
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Ready to elevate your brand? Let&apos;s discuss your project and create something amazing together.
            </p>
          </div>
          
          {/* Contact Form */}
          <div className="mt-16">
            <div className="mx-auto max-w-2xl">
              <div className="bg-background rounded-2xl shadow-xl p-8 sm:p-10 border border-border">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}