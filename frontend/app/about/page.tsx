'use client'

// app/about/page.tsx
// PieNet company story, mission, and services.

import { motion } from 'framer-motion'
import Link from 'next/link'

const SERVICES = [
  {
    id: 'premieres',
    icon: '🎭',
    title: 'Red-Carpet Premieres',
    description:
      'We orchestrate unforgettable premiere nights — from venue selection and celebrity coordination to live streaming and global press distribution. Every detail is a statement.',
  },
  {
    id: 'campaigns',
    icon: '📡',
    title: 'Teaser Campaigns',
    description:
      'Our multi-channel teaser strategies build anticipation over months. From cryptic social drops to IMAX pre-roll exclusives, we manufacture desire before day one.',
  },
  {
    id: 'press',
    icon: '🎙️',
    title: 'Press & Media Events',
    description:
      'Junkets, roundtables, embargo strategies, and controlled leak campaigns. We manage the global press cycle to ensure your film enters every conversation on your terms.',
  },
]

const STATS = [
  { value: '47', label: 'Premieres Hosted' },
  { value: '12', label: 'Global Markets' },
  { value: '3.2B', label: 'Opening Weekend Gross' },
  { value: '98%', label: 'Client Retention' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pienet-black">
      {/* ── PAGE HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ paddingTop: '9rem', paddingBottom: '6rem' }}>
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-pienet-red" />
              <span className="font-inter text-xs font-semibold tracking-[0.3em] uppercase text-pienet-red">
                Our Story
              </span>
            </div>
            <h1 className="font-bebas text-6xl sm:text-8xl md:text-[10rem] leading-none text-white tracking-tight">
              About<br />
              <span className="text-gradient-red">PieNet</span>
            </h1>
            <p className="mt-6 font-inter text-pienet-zinc text-lg md:text-xl leading-relaxed max-w-2xl">
              A studio-adjacent launch house operating at the intersection of culture, cinema, and spectacle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-pienet-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="section-divider" />
              <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide leading-tight">
                We Don't Release Films.<br />
                <span className="text-pienet-red">We Launch Legends.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="font-inter text-pienet-zinc text-base leading-relaxed mb-6">
                PieNet is a studio-adjacent house that unveils and premieres films. We specialize in
                red-carpet premieres, global teaser campaigns, and high-impact press events. We don't
                just release movies; we launch legends.
              </p>
              <p className="font-inter text-pienet-zinc text-base leading-relaxed mb-6">
                Founded on the belief that every great film deserves a debut as powerful as its story,
                PieNet has cultivated a reputation for orchestrating cultural moments — the kind that
                become part of cinema history.
              </p>
              <p className="font-inter text-pienet-zinc text-base leading-relaxed">
                We work with directors, studios, and distributors who understand that the premiere isn't
                just a party. It's the opening act of a film's life in the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="font-bebas text-5xl md:text-6xl text-gradient-red">{stat.value}</div>
                <div className="font-inter text-xs text-pienet-zinc uppercase tracking-widest mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-pienet-red" />
              <span className="font-inter text-xs font-semibold tracking-[0.3em] uppercase text-pienet-red">What We Do</span>
              <span className="h-px w-10 bg-pienet-red" />
            </div>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide">
              Our <span className="text-gradient-red">Services</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                id={`service-${service.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                whileHover={{ y: -6 }}
                className="bg-pienet-surface border border-white/5 p-8 group hover:border-pienet-red/30 transition-all duration-300"
                style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.3)' }}
              >
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="font-bebas text-2xl text-white tracking-wide mb-3">
                  {service.title}
                </h3>
                <p className="font-inter text-pienet-zinc text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 w-8 h-0.5 bg-pienet-red transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ──────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-pienet-red/5 border-t border-pienet-red/10"
      >
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-4">
            Ready to Make History?
          </h2>
          <p className="font-inter text-pienet-zinc text-base mb-8">
            Let's talk about your film's launch.
          </p>
          <Link href="/contact" className="btn-primary inline-flex" id="about-contact-cta">
            Get in Touch
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
