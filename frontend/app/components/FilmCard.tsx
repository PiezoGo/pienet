'use client'

// components/FilmCard.tsx
// NOCTURNE HOUSE — Cinematic poster card with 3D tilt hover.
// Teaser cards (no release_date) get a distinct treatment.

import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { type Film } from '@/app/lib/api'
import { formatDate } from '@/app/lib/utils'

interface Props {
  film: Film
  index?: number
}

export default function FilmCard({ film, index = 0 }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isTeaser = !film.release_date || film.genre === 'Teaser'

  // 3D tilt mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]),  { stiffness: 250, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 250, damping: 30 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5)
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  function handleMouseLeave() { mouseX.set(0); mouseY.set(0) }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="film-card"
    >
      <Link
        href={`/films/${film.slug}`}
        id={`film-card-${film.slug}`}
        style={{ display: 'block', width: '100%', textDecoration: 'none' }}
      >
        <div
          className="group"
          style={{ position: 'relative', overflow: 'hidden', background: '#181818', width: '100%', aspectRatio: '2/3' }}
        >
          {/* Poster image */}
          <Image
            src={film.poster_image || '/images/hero-backdrop.jpg'}
            alt={`${film.title} poster`}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
            className="poster-image"
            style={{ opacity: isTeaser ? 0.5 : 1 }}
            priority={index < 3}
          />

          {/* Gradient overlay — always present, deepens on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.3) 50%, transparent 100%)' }}
          />

          {/* Crimson border inset on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(200,16,46,0.45)' }}
            aria-hidden="true"
          />

          {/* Top badge area */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            {/* Genre */}
            <span
              style={{
                fontFamily:    'var(--font-inter), Inter, sans-serif',
                fontSize:      '0.5rem',
                fontWeight:    500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         '#7A7066',
                background:    'rgba(8,8,8,0.6)',
                padding:       '0.25rem 0.5rem',
                backdropFilter: 'blur(4px)',
              }}
            >
              {film.genre}
            </span>

            {/* Teaser badge */}
            {isTeaser && (
              <span className="teaser-badge">
                Teaser
              </span>
            )}
          </div>

          {/* Bottom info */}
          <div
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem' }}
          >
            <h3
              className="pm-display"
              style={{
                fontSize:    'clamp(1.25rem, 3vw, 1.75rem)',
                color:       '#F5F0EB',
                lineHeight:  1,
                marginBottom: '0.5rem',
                letterSpacing: '0.01em',
              }}
            >
              {film.title}
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p
                style={{
                  fontFamily:    'var(--font-inter), Inter, sans-serif',
                  fontSize:      '0.625rem',
                  fontWeight:    400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         '#7A7066',
                }}
              >
                {isTeaser ? 'Coming' : formatDate(film.release_date)}
              </p>

              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  fontFamily:    'var(--font-inter), Inter, sans-serif',
                  fontSize:      '0.5625rem',
                  fontWeight:    400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         '#C8102E',
                }}
              >
                View →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
