'use client'

// components/HeroSection.tsx
// The signature cinematic hero with 3-layer Framer Motion parallax.
// Layer 1 (bg):  Slowly rotating abstract geometric blobs — the slowest.
// Layer 2 (mid): Floating film-reel icons and text snippets at medium speed.
// Layer 3 (fg):  Hero headline & tagline moving at a slight counter-direction.

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CountdownTimer from './CountdownTimer'

// Earliest premiere: Oct 15, 2026
const NEXT_PREMIERE = new Date('2026-10-15T00:00:00')

// Floating text snippets for midground layer
const FLOATING_SNIPPETS = [
  'Premieres', 'Legends', '2026', 'Red Carpet', 'Global', 'Exclusive',
  'IMAX', 'World First', 'Teaser', 'Launch', 'FILMS',
]

interface ShapeProps {
  size: number; top: string; left: string;
  color: string; delay: number; duration: number;
}

const FloatingShape = ({ size, top, left, color, delay, duration }: ShapeProps) => (
  <motion.div
    className="hero-shape absolute rounded-full"
    style={{ width: size, height: size, top, left, background: color }}
    animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.25, 0.12] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
)

const FloatingSnippet = ({ text, x, y, delay }: { text: string; x: string; y: string; delay: number }) => (
  <motion.span
    className="absolute font-bebas tracking-widest text-white/5 select-none pointer-events-none whitespace-nowrap"
    style={{ left: x, top: y, fontSize: `${Math.random() * 1.5 + 0.8}rem` }}
    animate={{ y: [0, -20, 0], opacity: [0.03, 0.08, 0.03] }}
    transition={{ duration: 5 + Math.random() * 4, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    {text}
  </motion.span>
)

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax transforms for each layer
  const bgY   = useTransform(scrollYProgress, [0, 1], ['0%',   '40%'])  // Fastest bg drift
  const midY  = useTransform(scrollYProgress, [0, 1], ['0%',   '20%'])  // Mid speed
  const fgY   = useTransform(scrollYProgress, [0, 1], ['0%',   '-10%']) // Foreground counter-drift
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToLaunches = () => {
    document.getElementById('launches')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-pienet-black"
      style={{ paddingTop: '8rem', paddingBottom: '4rem' }}
      aria-label="Hero section"
    >
      {/* ── LAYER 1: Background geometric blobs ──────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        {/* Large background gradient pulse */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(229,9,20,0.08) 0%, transparent 70%)',
          }}
        />
        <FloatingShape size={700} top="-15%"  left="-10%" color="rgba(229,9,20,0.2)"   delay={0}   duration={12} />
        <FloatingShape size={500} top="60%"   left="70%"  color="rgba(100,20,255,0.15)" delay={3}   duration={15} />
        <FloatingShape size={300} top="30%"   left="80%"  color="rgba(229,9,20,0.12)"   delay={1.5} duration={10} />
        <FloatingShape size={400} top="70%"   left="-5%"  color="rgba(50,50,200,0.1)"   delay={2}   duration={13} />
        {/* Film-frame grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </motion.div>

      {/* ── LAYER 2: Midground floating snippets & film reels ─────────── */}
      <motion.div
        className="absolute pointer-events-none overflow-hidden"
        style={{ y: midY, inset: '80px 0 0 0' }}
      >
        {FLOATING_SNIPPETS.map((text, i) => (
          <FloatingSnippet
            key={text}
            text={text}
            x={`${(i * 19 + 5) % 90}%`}
            y={`${(i * 13 + 8) % 85}%`}
            delay={i * 0.4}
          />
        ))}
        {/* Decorative film strip dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full bg-pienet-red/20"
            style={{
              left: `${Math.random() * 100}%`,
              top:  `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 0.6, 0], scale: [0, 1.5, 0] }}
            transition={{
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* ── LAYER 3: Foreground hero content ─────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4"
        style={{ y: fgY, opacity }}
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-12 bg-pienet-red" />
          <span className="font-inter text-xs font-semibold tracking-[0.3em] uppercase text-pienet-red">
            PieNet Launch House
          </span>
          <span className="h-px w-12 bg-pienet-red" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-bebas text-[clamp(4rem,15vw,12rem)] leading-none tracking-tight text-white"
          style={{ textShadow: '0 0 80px rgba(229,9,20,0.3)' }}
        >
          View<br />
          <span className="text-gradient-red">what's on.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 font-inter text-pienet-zinc text-lg md:text-xl font-light tracking-wide max-w-xl"
        >
          Where premieres become legends.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-12"
        >
          <CountdownTimer target={NEXT_PREMIERE} label="Next Premiere — Spider-Man: Brand New Day" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <button
            id="explore-launches-btn"
            onClick={scrollToLaunches}
            className="btn-primary min-w-[200px] justify-center"
          >
            <span>Explore Launches</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <a href="/about" className="btn-outline min-w-[200px] justify-center">
            Our Story
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-pienet-zinc/50">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-pienet-red to-transparent" />
      </motion.div>
    </section>
  )
}
