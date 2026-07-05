// app/page.tsx
// Pienet Movies — Homepage: Hero + Film Grid.

import type { Metadata } from 'next'
import HeroSection from '@/app/components/HeroSection'
import FilmGrid from '@/app/components/FilmGrid'

export const metadata: Metadata = {
  title: 'Pienet Movies — Film Premiere & Launch Atelier',
  description: 'Pienet Movies — we give films their first night. Upcoming premieres, cinematic launches, and exclusive press events. One house, one standard.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FilmGrid />
    </>
  )
}
