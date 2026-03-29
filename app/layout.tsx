import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: {
    default: 'VINCheck Pro - Free VIN Decoder & Vehicle History Reports',
    template: '%s | VINCheck Pro'
  },
  description: 'Get instant vehicle history reports, VIN decoding, recall information, and ownership costs. Trusted by millions for accurate, affordable vehicle information.',
  keywords: ['VIN decoder', 'vehicle history report', 'car history', 'VIN check', 'vehicle recalls', 'car specs', 'ownership costs'],
  authors: [{ name: 'VINCheck Pro' }],
  creator: 'VINCheck Pro',
  publisher: 'VINCheck Pro',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vincheckpro.com',
    siteName: 'VINCheck Pro',
    title: 'VINCheck Pro - Free VIN Decoder & Vehicle History Reports',
    description: 'Get instant vehicle history reports, VIN decoding, recall information, and ownership costs.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VINCheck Pro - Vehicle History Reports',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VINCheck Pro - Free VIN Decoder & Vehicle History Reports',
    description: 'Get instant vehicle history reports, VIN decoding, recall information, and ownership costs.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
