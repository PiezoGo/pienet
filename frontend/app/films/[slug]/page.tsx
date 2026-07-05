'use client'

// app/films/[slug]/page.tsx
// Pienet Movies — Film detail page.
// Cinematic backdrop hero, editorial layout, teaser-only graceful handling, 404 state.

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useFilm } from '@/app/hooks/useFilm'
import { formatDate } from '@/app/lib/utils'

export default function FilmDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug   = typeof params.slug === 'string' ? params.slug : ''
  const { data: film, isLoading, isError } = useFilm(slug)

  const isTeaser = !film?.release_date || film?.genre === 'Teaser'

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '40px', height: '1px', background: '#B89A6A', margin: '0 auto 1.5rem',
              animation: 'shimmer 1.5s infinite',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '0.625rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#7A7066',
            }}
          >
            Loading
          </p>
        </div>
      </div>
    )
  }

  // ── 404 / Not Found ───────────────────────────────────────────────────────
  if (isError || !film) {
    return (
      <div
        style={{
          minHeight:      '100vh',
          background:     '#080808',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '2rem',
          textAlign:      'center',
          gap:            '1.5rem',
        }}
      >
        <span className="pm-eyebrow" style={{ color: '#7A7066' }}>404 — Not in the Archive</span>
        <h1
          className="pm-display"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#F5F0EB', maxWidth: '600px' }}
        >
          This title doesn't exist yet.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize:   '0.875rem',
            fontWeight: 300,
            color:      '#7A7066',
            maxWidth:   '360px',
            lineHeight: 1.8,
          }}
        >
          It may not have been announced, or the slug is incorrect. Check the launches and try again.
        </p>
        <button onClick={() => router.push('/')} className="btn-outline" id="back-to-launches-404">
          ← Back to Launches
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>

      {/* ── HERO BACKDROP ──────────────────────────────────────── */}
      <div style={{ position: 'relative', height: 'clamp(500px, 70vh, 780px)', overflow: 'hidden' }}>
        {/* Image */}
        <Image
          src={film.poster_image || '/images/hero-backdrop.jpg'}
          alt={`${film.title} — backdrop`}
          fill
          className="object-cover object-center"
          priority
          style={{ opacity: isTeaser ? 0.45 : 0.55 }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.4) 60%, rgba(8,8,8,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.7) 0%, transparent 60%)' }} />

        {/* Grain */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ position: 'absolute', top: '6rem', left: '2rem' }}
        >
          <button
            onClick={() => router.push('/')}
            className="btn-ghost"
            id="back-to-launches"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            All Launches
          </button>
        </motion.div>

        {/* Hero text */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: 'clamp(1.5rem, 4vw, 4rem)',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <span className="pm-eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
              {film.genre}
              {isTeaser && (
                <span
                  style={{
                    marginLeft: '1rem',
                    padding: '0.2rem 0.5rem',
                    border: '1px solid rgba(184,154,106,0.35)',
                    color: '#B89A6A',
                    fontSize: '0.5rem',
                  }}
                >
                  Teaser Only
                </span>
              )}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="pm-display"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', color: '#F5F0EB' }}
          >
            {film.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem', alignItems: 'center' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontSize: '0.6875rem',
                fontWeight: 300,
                color: '#7A7066',
                letterSpacing: '0.1em',
              }}
            >
              Dir.&nbsp;
              <span style={{ color: '#E8E0D4' }}>{film.director}</span>
            </span>
            {!isTeaser && (
              <span
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontSize: '0.6875rem',
                  fontWeight: 300,
                  color: '#7A7066',
                  letterSpacing: '0.1em',
                }}
              >
                Premiere&nbsp;
                <span style={{ color: '#B89A6A' }}>{formatDate(film.release_date)}</span>
              </span>
            )}
            {isTeaser && (
              <span
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontSize: '0.6875rem',
                  fontWeight: 300,
                  color: '#B89A6A',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Date TBA
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 6rem) 2rem' }}>
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr',
            gap:                 'clamp(3rem, 5vw, 5rem)',
          }}
          className="lg:grid-article"
        >
          {/* Left: primary content */}
          <div style={{ maxWidth: '680px' }}>

            {/* Logline */}
            {film.logline && film.logline !== 'Logline withheld.' && (
              <motion.blockquote
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                style={{ borderLeft: '1px solid #B89A6A', paddingLeft: '1.5rem', marginBottom: '2.5rem' }}
              >
                <p
                  className="font-cormorant"
                  style={{
                    fontSize:    'clamp(1.125rem, 2.5vw, 1.5rem)',
                    fontWeight:  300,
                    fontStyle:   'italic',
                    color:       '#E8E0D4',
                    lineHeight:  1.6,
                    letterSpacing: '0.01em',
                  }}
                >
                  "{film.logline}"
                </p>
              </motion.blockquote>
            )}

            {/* Teaser withheld notice */}
            {isTeaser && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  border:     '1px solid rgba(184,154,106,0.2)',
                  padding:    '2rem 2rem 2rem 1.75rem',
                  borderLeft: '3px solid #B89A6A',
                  marginBottom: '2.5rem',
                }}
              >
                <p className="pm-eyebrow" style={{ marginBottom: '0.75rem' }}>Teaser Drop</p>
                <p
                  className="font-cormorant"
                  style={{
                    fontSize:  '1.25rem',
                    fontWeight: 300,
                    color:     '#E8E0D4',
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                  }}
                >
                  Details are withheld pending the official announcement. This is all we're saying for now.
                </p>
              </motion.div>
            )}

            {/* Synopsis */}
            {film.synopsis && film.synopsis !== 'Details withheld pending announcement. A new project from Pienet Movies. Coming.' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="section-divider" />
                <h2
                  className="font-cormorant"
                  style={{ fontSize: '1.125rem', fontWeight: 300, color: '#F5F0EB', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}
                >
                  Synopsis
                </h2>
                <p
                  style={{
                    fontFamily:  'var(--font-inter), Inter, sans-serif',
                    fontSize:    '0.9375rem',
                    fontWeight:  300,
                    color:       '#7A7066',
                    lineHeight:  1.9,
                    letterSpacing: '0.02em',
                  }}
                >
                  {film.synopsis}
                </p>
              </motion.div>
            )}

            {/* Trailer */}
            {film.trailer_url ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                style={{ marginTop: '3rem' }}
              >
                <div className="section-divider" />
                <h2
                  className="font-cormorant"
                  style={{ fontSize: '1.125rem', fontWeight: 300, color: '#F5F0EB', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}
                >
                  Official Trailer
                </h2>
                <div
                  className="trailer-wrapper"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <iframe
                    src={film.trailer_url}
                    title={`${film.title} — Official Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                style={{
                  marginTop:   '3rem',
                  border:      '1px solid rgba(255,255,255,0.05)',
                  padding:     '2.5rem',
                  textAlign:   'center',
                  background:  'rgba(255,255,255,0.01)',
                }}
              >
                <p className="pm-eyebrow" style={{ color: '#7A7066', marginBottom: '0.5rem' }}>Trailer</p>
                <p
                  className="font-cormorant"
                  style={{ fontSize: '1.125rem', fontWeight: 300, color: 'rgba(245,240,235,0.4)', fontStyle: 'italic' }}
                >
                  Not yet released.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right: metadata sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* Cast */}
            {film.cast && film.cast.length > 0 && (
              <div>
                <div className="section-divider" />
                <h3
                  className="font-cormorant"
                  style={{ fontSize: '1rem', fontWeight: 300, color: '#F5F0EB', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}
                >
                  Cast
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                  {(Array.isArray(film.cast) ? film.cast : [film.cast]).map((actor) => (
                    <li
                      key={actor}
                      style={{
                        display:     'flex',
                        alignItems:  'center',
                        gap:         '0.625rem',
                        fontFamily:  'var(--font-inter), Inter, sans-serif',
                        fontSize:    '0.8125rem',
                        fontWeight:  300,
                        color:       '#7A7066',
                        letterSpacing: '0.03em',
                      }}
                    >
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#B89A6A', flexShrink: 0, opacity: 0.7 }} />
                      {actor}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Director */}
            <div>
              <div className="section-divider" />
              <h3
                className="font-cormorant"
                style={{ fontSize: '1rem', fontWeight: 300, color: '#F5F0EB', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}
              >
                Director
              </h3>
              <p
                style={{
                  fontFamily:  'var(--font-inter), Inter, sans-serif',
                  fontSize:    '0.8125rem',
                  fontWeight:  300,
                  color:       '#7A7066',
                  letterSpacing: '0.03em',
                }}
              >
                {film.director}
              </p>
            </div>

            {/* Premiere */}
            <div>
              <div className="section-divider" />
              <h3
                className="font-cormorant"
                style={{ fontSize: '1rem', fontWeight: 300, color: '#F5F0EB', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}
              >
                Premiere
              </h3>
              <p
                style={{
                  fontFamily:  'var(--font-inter), Inter, sans-serif',
                  fontSize:    '0.8125rem',
                  fontWeight:  300,
                  color:       isTeaser ? '#B89A6A' : '#7A7066',
                  letterSpacing: '0.05em',
                  textTransform: isTeaser ? 'uppercase' : 'none',
                }}
              >
                {isTeaser ? 'TBA — Coming.' : formatDate(film.release_date)}
              </p>
            </div>

            {/* Back CTA */}
            <div style={{ paddingTop: '1rem' }}>
              <button
                onClick={() => router.push('/')}
                className="btn-outline"
                id="view-all-launches"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                ← View All Launches
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
