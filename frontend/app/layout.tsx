import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { QueryProvider } from '@/app/context/QueryProvider'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import './globals.css'

// ── Google Font imports ────────────────────────────────────────────────────
const bebasNeue = Bebas_Neue({
  weight:   '400',
  subsets:  ['latin'],
  variable: '--font-bebas-var',
  display:  'swap',
})

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter-var',
  display:  'swap',
})

// ── Global SEO metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:  'PieNet — View What\'s On',
    template: '%s | PieNet',
  },
  description:
    'PieNet is a cinematic launch house. We unveil and premiere the most anticipated films of the decade. Where premieres become legends.',
  keywords: ['PieNet', 'film premieres', 'movie launches', 'cinematic events', 'film house'],
  openGraph: {
    type:      'website',
    siteName:  'PieNet',
    title:     'PieNet — View What\'s On',
    description: 'Where premieres become legends.',
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
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-pienet-black text-white antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="pienet-theme"
        >
          <QueryProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
