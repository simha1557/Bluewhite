export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Professional Design Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
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
      <section id="services" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
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
              <div key={service.name} className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                <p className="mt-4 text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Let&apos;s Work Together
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Ready to elevate your brand? Get in touch with us today.
            </p>
          </div>
          <div className="mt-12 bg-gray-50 p-8 rounded-xl">
            <p className="text-center text-gray-600">
              Contact form coming soon...
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}