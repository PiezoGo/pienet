'use client'

// components/FilmGrid.tsx
// NOCTURNE HOUSE — Responsive poster grid.
// Films sorted by premiere date; teaser entries visually distinct.

import { motion, AnimatePresence } from 'framer-motion'
import { useFilms } from '@/app/hooks/useFilms'
import FilmCard from './FilmCard'

const SkeletonCard = ({ i }: { i: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: i * 0.05 }}
    style={{ aspectRatio: '2/3', background: '#181818', position: 'relative', overflow: 'hidden' }}
    className="skeleton"
  />
)

export default function FilmGrid() {
  const { data: films, isLoading, isError } = useFilms()

  // Sort by release_date (nulls / teasers last)
  const sorted = films
    ? [...films].sort((a, b) => {
        if (!a.release_date) return 1
        if (!b.release_date) return -1
        return new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      })
    : []

  return (
    <section
      id="launches"
      style={{ padding: '7rem 0', background: '#080808' }}
      aria-label="Upcoming launches"
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <span style={{ height: '1px', width: '32px', background: '#B89A6A', opacity: 0.6 }} />
            <span className="pm-eyebrow">Upcoming Launches</span>
          </div>
          <h2
            className="pm-display"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#F5F0EB', marginBottom: '1rem' }}
          >
            The Season
          </h2>
          <p
            style={{
              fontFamily:  'var(--font-inter), Inter, sans-serif',
              fontSize:    '0.875rem',
              fontWeight:  300,
              color:       '#7A7066',
              maxWidth:    '480px',
              lineHeight:  1.8,
              letterSpacing: '0.02em',
            }}
          >
            Five films. Five first nights. One house, one standard.
          </p>
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div className="film-grid">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} i={i} />)}
          </div>
        )}

        {/* Error state */}
        {isError && !films && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '5rem 0' }}
          >
            <p
              className="pm-display"
              style={{ fontSize: '2rem', color: '#C8102E', marginBottom: '0.75rem' }}
            >
              Transmission interrupted.
            </p>
            <p
              style={{
                fontFamily:    'var(--font-inter), Inter, sans-serif',
                fontSize:      '0.8125rem',
                color:         '#7A7066',
                letterSpacing: '0.05em',
              }}
            >
              Could not reach the launch server. Make sure the API is running.
            </p>
          </motion.div>
        )}

        {/* Film grid — Desktop */}
        {!isLoading && sorted.length > 0 && (
          <>
            {/* Responsive grid (CSS-driven: 1 col mobile, 2 col sm, 3 col lg) */}
            <div className="film-grid">
              <AnimatePresence mode="popLayout">
                {sorted.map((film, i) => (
                  <motion.div
                    key={film.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{    opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                  >
                    <FilmCard film={film} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Mobile carousel (visible only below sm) */}
            <div
              className="sm:hidden carousel-scroll"
              style={{ marginLeft: '-2rem', marginRight: '-2rem', paddingLeft: '2rem', paddingRight: '2rem' }}
            >
              {sorted.map((film, i) => (
                <div key={film.slug} className="carousel-item" style={{ width: '72vw' }}>
                  <FilmCard film={film} index={i} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {!isLoading && sorted.length === 0 && !isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '5rem 0' }}
          >
            <p
              className="pm-display"
              style={{ fontSize: '2rem', color: 'rgba(245,240,235,0.15)' }}
            >
              No launches scheduled.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
