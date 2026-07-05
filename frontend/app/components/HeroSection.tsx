'use client'

// components/HeroSection.tsx
// Pienet Movies — Full-viewport cinematic hero with image slideshow backdrop.
// 5 images cycle via crossfade (~6s each). Manual prev/next + dot controls.
// Autoplay pauses on hover/focus. prefers-reduced-motion = static first image.
// Text content (wordmark, tagline, countdown) floats above the slideshow.

import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import CountdownTimer from './CountdownTimer'
import { useFilms } from '@/app/hooks/useFilms'

// ── Slideshow configuration ──────────────────────────────────────────────────
const SLIDES = [
  {
    src:  '/images/hero-backdrop.jpg',
    alt:  'A cinematic wide shot — dramatic action on screen',
  },
  {
    src:  '/images/red-hour.jpg',
    alt:  'Dark urban alleyway, moody neo-noir atmosphere',
  },
  {
    src:  '/images/the-long-silence.jpg',
    alt:  'Cinematic still — tense dramatic moment between characters',
  },
  {
    src:  '/images/echo-chamber.jpg',
    alt:  'Dark, atmospheric hallway — psychological tension',
  },
  {
    src:  '/images/vantage.jpg',
    alt:  'Wide-angle action scene — high stakes cinematic moment',
  },
]

const SLIDE_DURATION = 6000  // ms between auto-advances
const FADE_DURATION  = 0.9   // seconds for crossfade

// ── Slideshow component ──────────────────────────────────────────────────────
function HeroSlideshow() {
  const [current,     setCurrent]     = useState(0)
  const [isHovered,   setIsHovered]   = useState(false)
  const [prefersStill, setPrefersStill] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Detect prefers-reduced-motion on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersStill(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersStill(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length)
  }, [])

  const retreat = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  const goTo = useCallback((i: number) => {
    setCurrent(i)
  }, [])

  // Autoplay
  useEffect(() => {
    if (prefersStill || isHovered) return
    timerRef.current = setTimeout(advance, SLIDE_DURATION)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, isHovered, prefersStill, advance])

  return (
    <div
      style={{ position: 'absolute', inset: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Slide images ── */}
      {prefersStill ? (
        /* Static fallback — no animation */
        <Image
          src={SLIDES[0].src}
          alt={SLIDES[0].alt}
          fill
          priority
          className="object-cover object-center"
          style={{ opacity: 0.38 }}
        />
      ) : (
        /* Crossfade slideshow */
        <AnimatePresence mode="sync">
          {SLIDES.map((slide, i) =>
            i === current ? (
              <motion.div
                key={slide.src}
                style={{ position: 'absolute', inset: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{   opacity: 0 }}
                transition={{ duration: FADE_DURATION, ease: 'easeInOut' }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="object-cover object-center"
                  style={{ opacity: 0.38 }}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      )}

      {/* Vignette — always present */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 80% at 50% 45%, transparent 0%, rgba(8,8,8,0.55) 60%, rgba(8,8,8,0.95) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, #080808)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '20%', background: 'linear-gradient(to top, transparent, rgba(8,8,8,0.6))' }}
        aria-hidden="true"
      />

      {/* ── Slideshow controls ── */}
      {!prefersStill && (
        <>
          {/* Prev / Next arrows */}
          <button
            aria-label="Previous slide"
            onClick={retreat}
            style={{
              position:    'absolute',
              left:        '1.5rem',
              top:         '50%',
              transform:   'translateY(-50%)',
              zIndex:      5,
              background:  'rgba(8,8,8,0.5)',
              border:      '1px solid rgba(255,255,255,0.1)',
              color:       '#7A7066',
              width:       '40px',
              height:      '40px',
              display:     'flex',
              alignItems:  'center',
              justifyContent: 'center',
              cursor:      'pointer',
              transition:  'all 0.2s ease',
              backdropFilter: 'blur(4px)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#B89A6A'; e.currentTarget.style.color = '#B89A6A' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#7A7066' }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            aria-label="Next slide"
            onClick={advance}
            style={{
              position:    'absolute',
              right:       '1.5rem',
              top:         '50%',
              transform:   'translateY(-50%)',
              zIndex:      5,
              background:  'rgba(8,8,8,0.5)',
              border:      '1px solid rgba(255,255,255,0.1)',
              color:       '#7A7066',
              width:       '40px',
              height:      '40px',
              display:     'flex',
              alignItems:  'center',
              justifyContent: 'center',
              cursor:      'pointer',
              transition:  'all 0.2s ease',
              backdropFilter: 'blur(4px)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#B89A6A'; e.currentTarget.style.color = '#B89A6A' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#7A7066' }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div
            role="tablist"
            aria-label="Slideshow navigation"
            style={{
              position:       'absolute',
              bottom:         '5rem',
              left:           '50%',
              transform:      'translateX(-50%)',
              zIndex:         5,
              display:        'flex',
              alignItems:     'center',
              gap:            '0.5rem',
            }}
          >
            {SLIDES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === current}
                onClick={() => goTo(i)}
                style={{
                  width:      i === current ? '24px' : '6px',
                  height:     '2px',
                  background: i === current ? '#B89A6A' : 'rgba(255,255,255,0.2)',
                  border:     'none',
                  cursor:     'pointer',
                  padding:    0,
                  transition: 'all 0.35s ease',
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Main Hero Section ────────────────────────────────────────────────────────
export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const { data: films } = useFilms()

  const { nextDate, nextTitle } = useMemo(() => {
    if (!films || films.length === 0) {
      return { nextDate: new Date('2026-09-12T00:00:00'), nextTitle: 'VANTAGE' }
    }
    const upcoming = films
      .filter((f) => f.release_date && new Date(f.release_date + 'T00:00:00').getTime() > Date.now())
      .sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime())

    if (upcoming.length === 0) {
      return { nextDate: new Date('2026-09-12T00:00:00'), nextTitle: 'VANTAGE' }
    }
    return {
      nextDate:  new Date(upcoming[0].release_date + 'T00:00:00'),
      nextTitle: upcoming[0].title,
    }
  }, [films])

  const scrollToLaunches = () => {
    document.getElementById('launches')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
      aria-label="Pienet Movies hero section"
    >
      {/* ── LAYER 1: Slideshow backdrop ── */}
      <HeroSlideshow />

      {/* ── LAYER 2: Grain texture ── */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── LAYER 3: Hero content (above slideshow) ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ y: contentY, opacity, padding: '0 1.5rem', maxWidth: '900px', width: '100%' }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
        >
          <span style={{ height: '1px', width: '40px', background: '#B89A6A', opacity: 0.7 }} />
          <span className="pm-eyebrow">Premiere & Launch House</span>
          <span style={{ height: '1px', width: '40px', background: '#B89A6A', opacity: 0.7 }} />
        </motion.div>

        {/* Main wordmark / heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pm-display"
          style={{
            fontSize:   'clamp(3.5rem, 12vw, 10rem)',
            color:      '#F5F0EB',
            textShadow: '0 2px 60px rgba(0,0,0,0.8)',
          }}
        >
          PIENET
          <br />
          <span style={{ color: '#B89A6A', fontWeight: 300 }}>MOVIES</span>
        </motion.h1>

        {/* Voice tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          style={{
            fontFamily:    'var(--font-inter), Inter, sans-serif',
            fontSize:      'clamp(0.75rem, 1.5vw, 0.9375rem)',
            fontWeight:    300,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         '#7A7066',
            marginTop:     '1.5rem',
            maxWidth:      '480px',
          }}
        >
          Every film gets one first night.
          <br />
          <span style={{ color: '#E8E0D4', opacity: 0.8 }}>We make sure it's the right one.</span>
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          style={{ marginTop: '3.5rem' }}
        >
          <CountdownTimer
            target={nextDate}
            label="Next Premiere"
            filmTitle={nextTitle}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25 }}
          style={{ marginTop: '3rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}
        >
          <button
            id="explore-launches-btn"
            onClick={scrollToLaunches}
            className="btn-primary"
          >
            Explore Launches
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <a href="/company" className="btn-outline">
            About the House
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10"
        style={{ x: '-50%', opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontFamily:    'var(--font-inter), Inter, sans-serif',
              fontSize:      '0.5rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         'rgba(122,112,102,0.4)',
            }}
          >
            Scroll
          </span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(184,154,106,0.5), transparent)' }} />
        </div>
      </motion.div>
    </section>
  )
}
