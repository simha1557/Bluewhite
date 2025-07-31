import ThemeToggle from '@/components/ThemeToggle'
import ContactForm from '@/components/ContactForm'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header with Theme Toggle */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-foreground">Design Agency Pro</h1>
          <ThemeToggle compact />
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-sans">
            Professional Design Services
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We help small to medium businesses and startups create compelling design solutions 
            that drive growth and establish strong brand presence.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#contact"
              className="btn-primary"
            >
              Get Started
            </a>
            <a
              href="#services"
              className="btn-secondary"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Comprehensive design solutions to elevate your business
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {[
              { name: 'Web Design', description: 'Modern, responsive websites that convert visitors into customers' },
              { name: 'Graphic Design', description: 'Visual identity and marketing materials that make an impact' },
              { name: 'UI/UX Design', description: 'User-centered design for exceptional digital experiences' },
              { name: 'Advertising', description: 'Strategic campaigns that reach and engage your target audience' },
            ].map((service) => (
              <div key={service.name} className="bg-card text-card-foreground p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-semibold font-sans">{service.name}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-sans">
              Let&apos;s Work Together
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Ready to elevate your brand? Get in touch with us today.
            </p>
          </div>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}