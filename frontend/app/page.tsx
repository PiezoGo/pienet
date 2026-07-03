// app/page.tsx
// Homepage: Hero section + Film grid.

import type { Metadata } from 'next'
import HeroSection from '@/app/components/HeroSection'
import FilmGrid from '@/app/components/FilmGrid'

export const metadata: Metadata = {
  title: 'PieNet — View What\'s On',
  description: 'The most anticipated film premieres of 2026–2027. Explore PieNet\'s exclusive upcoming launches.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FilmGrid />
    </>
  )
}
