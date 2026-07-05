import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { QueryProvider } from '@/app/context/QueryProvider'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import './globals.css'

// ── Google Font imports ────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  weight:   ['300', '400', '600', '700'],
  subsets:  ['latin'],
  variable: '--font-cormorant',
  display:  'swap',
  style:    ['normal', 'italic'],
})

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

// ── Global SEO metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:  'Pienet Movies — Film Premiere & Launch Atelier',
    template: '%s | Pienet Movies',
  },
  description:
    'Pienet Movies is a studio-adjacent premiere and launch house. We give films their first night. Premieres. Campaigns. Press. One house, one standard.',
  keywords: ['Pienet Movies', 'film premieres', 'movie launches', 'cinematic events', 'premiere house', 'film atelier'],
  openGraph: {
    type:        'website',
    siteName:    'Pienet Movies',
    title:       'Pienet Movies — Film Premiere & Launch Atelier',
    description: 'Every film gets one first night. We make sure it\'s the right one.',
  },
}

// ── Root Layout ────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-pm-void text-pm-text antialiased">
        <QueryProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
