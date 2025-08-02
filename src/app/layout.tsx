import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'


const openSans = Open_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://bluewhitemedia.online'),
  title: 'BlueWhiteMedia - Professional Design Services That Drive Results',
  description: 'Transform your business with professional web design, graphic design, UI/UX, and digital advertising services. Trusted by 100+ businesses worldwide. Get a free consultation today.',
  keywords: [
    'professional design agency',
    'web design services', 
    'graphic design',
    'UI UX design', 
    'digital advertising',
    'branding services',
    'responsive web design',
    'conversion optimization',
    'small business design',
    'startup design services'
  ],
  authors: [{ name: 'BlueWhiteMedia' }],
  creator: 'BlueWhiteMedia',
  publisher: 'BlueWhiteMedia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bluewhitemedia.online',
    title: 'BlueWhiteMedia - Design That Drives Results',
    description: 'Professional design services that convert visitors into customers. Web design, branding, UI/UX, and digital advertising for growing businesses.',
    siteName: 'BlueWhiteMedia',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'BlueWhiteMedia - Professional Design Services',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlueWhiteMedia - Design That Drives Results',
    description: 'Professional design services that convert visitors into customers. Get your free consultation today.',
    images: ['/og-image.jpg'],
  },
  category: 'Business Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BlueWhiteMedia',
    url: 'https://bluewhitemedia.online',
    logo: 'https://bluewhitemedia.online/logo.png',
    description: 'Professional design agency offering web design, graphic design, UI/UX, and advertising services for small to medium businesses and startups.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://linkedin.com/company/bluewhitemedia',
      'https://twitter.com/bluewhitemedia',
    ],
    offers: {
      '@type': 'Service',
      name: 'Professional Design Services',
      description: 'Web design, graphic design, UI/UX design, and digital advertising services',
      provider: {
        '@type': 'Organization',
        name: 'BlueWhiteMedia',
      },
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://bluewhitemedia.online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${openSans.variable} ${openSans.className}`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}