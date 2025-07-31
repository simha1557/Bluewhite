import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Design Agency Pro - Professional Design Services',
  description: 'Professional design agency offering web design, graphic design, UI/UX, and advertising services for small to medium businesses and startups.',
  keywords: ['design agency', 'web design', 'graphic design', 'UI/UX', 'advertising', 'branding'],
  authors: [{ name: 'Design Agency Pro' }],
  creator: 'Design Agency Pro',
  publisher: 'Design Agency Pro',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Design Agency Pro - Professional Design Services',
    description: 'Professional design agency offering comprehensive design services',
    siteName: 'Design Agency Pro',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}