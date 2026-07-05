'use client'

// app/company/page.tsx
// Pienet Movies — Company brand statement, positioning, and three services.
// Editorial/typographic with supporting imagery.

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const SERVICES = [
  {
    id:          'premieres',
    number:      '01',
    title:       'Premieres',
    description: 'Physical and hybrid premiere events: red carpet production, venue and guest experience design, live coordination, and the thousand invisible decisions that make the night feel inevitable. We\'ve produced premiere events across five continents. We don\'t manage events. We design moments.',
  },
  {
    id:          'campaigns',
    number:      '02',
    title:       'Campaigns',
    description: 'Teaser and trailer release strategy. Countdown campaigns. Embargo and reveal choreography. We control the information architecture of a film\'s pre-release — what lands first, what follows, and what makes the trailer drop feel like a cultural event rather than a content post.',
  },
  {
    id:          'press',
    number:      '03',
    title:       'Press',
    description: 'Junket coordination. Media day design. Talent scheduling. Embargo management. We treat the press cycle not as a necessary obligation but as an extension of the film\'s world — every interview, every room, every question asked in the right order.',
  },
]

const fadeUp = {
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true },
  transition:  { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
}

export default function CompanyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section
        style={{
          position:      'relative',
          overflow:      'hidden',
          paddingTop:    'clamp(7rem, 15vw, 11rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          paddingLeft:   '2rem',
          paddingRight:  '2rem',
        }}
      >
        {/* Hero backdrop image — low opacity atmospheric */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/red-hour.jpg"
            alt="Cinematic red carpet atmosphere"
            fill
            priority
            className="object-cover object-center"
            style={{ opacity: 0.12 }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.7) 60%, #080808 100%)',
            }}
          />
        </div>
        <div className="grain-overlay" aria-hidden="true" />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ height: '1px', width: '32px', background: '#B89A6A', opacity: 0.6 }} />
              <span className="pm-eyebrow">The House</span>
            </div>

            <h1
              className="pm-display"
              style={{ fontSize: 'clamp(3rem, 10vw, 8.5rem)', color: '#F5F0EB', maxWidth: '900px' }}
            >
              We don't distribute films.
              <br />
              <span style={{ color: '#B89A6A' }}>We give them their first night.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── POSITIONING STATEMENT — with supporting image ────────────────── */}
      <section
        style={{
          padding:      'clamp(4rem, 8vw, 7rem) 2rem',
          background:   '#111111',
          borderTop:    '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr',
              gap:                 'clamp(3rem, 6vw, 5rem)',
              alignItems:          'start',
            }}
            className="lg:grid-company-split"
          >
            {/* Left: Statement */}
            <motion.div {...fadeUp}>
              <div className="section-divider" />
              <h2
                className="pm-display"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#F5F0EB', maxWidth: '520px' }}
              >
                Studio-adjacent.
                <br />
                Entirely independent.
              </h2>

              {/* Supporting image — below heading on left column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ marginTop: '2rem', position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}
              >
                <Image
                  src="/images/echo-chamber.jpg"
                  alt="Pienet Movies — premiere production atmosphere"
                  fill
                  className="object-cover object-center"
                  style={{ opacity: 0.7 }}
                />
                {/* Gold corner accents on image */}
                <span style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '1px solid #B89A6A', borderLeft: '1px solid #B89A6A', opacity: 0.5 }} />
                <span style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '1px solid #B89A6A', borderRight: '1px solid #B89A6A', opacity: 0.5 }} />
                <span style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: '1px solid #B89A6A', borderLeft: '1px solid #B89A6A', opacity: 0.5 }} />
                <span style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '1px solid #B89A6A', borderRight: '1px solid #B89A6A', opacity: 0.5 }} />
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(17,17,17,0.6) 0%, transparent 50%)',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Right: Copy */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                style={{
                  fontFamily:    'var(--font-inter), Inter, sans-serif',
                  fontSize:      '0.9375rem',
                  fontWeight:    300,
                  color:         '#7A7066',
                  lineHeight:    1.9,
                  letterSpacing: '0.02em',
                  marginBottom:  '1.5rem',
                }}
              >
                Pienet Movies is hired by studios, streamers, and independent filmmakers to design and run the unveiling. We are not producers. We are not distributors. We are the people who make sure a film's first public moment feels inevitable — and unforgettable.
              </p>
              <p
                style={{
                  fontFamily:    'var(--font-inter), Inter, sans-serif',
                  fontSize:      '0.9375rem',
                  fontWeight:    300,
                  color:         '#7A7066',
                  lineHeight:    1.9,
                  letterSpacing: '0.02em',
                  marginBottom:  '1.5rem',
                }}
              >
                The red carpet. The trailer drop strategy. The press day. The countdown campaign. Opening night itself. One house handles everything — because a film's first night cannot be assembled from disconnected vendors. It has to be authored.
              </p>
              <p
                className="font-cormorant"
                style={{
                  fontSize:      'clamp(1.125rem, 2vw, 1.5rem)',
                  fontWeight:    300,
                  fontStyle:     'italic',
                  color:         '#E8E0D4',
                  lineHeight:    1.6,
                  letterSpacing: '0.01em',
                }}
              >
                "Premieres. Campaigns. Press. One house, one standard."
              </p>

              {/* Second supporting image — alongside copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ marginTop: '2.5rem', position: 'relative', aspectRatio: '16/7', overflow: 'hidden' }}
              >
                <Image
                  src="/images/vantage.jpg"
                  alt="Pienet Movies — film launch night"
                  fill
                  className="object-cover object-top"
                  style={{ opacity: 0.55 }}
                />
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to right, rgba(17,17,17,0.5) 0%, transparent 60%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
                  <span className="pm-eyebrow" style={{ color: '#B89A6A', fontSize: '0.5rem' }}>
                    Pienet Movies
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── IMAGE BREAK with pull quote ──────────────────────────────────── */}
      <section style={{ position: 'relative', height: 'clamp(240px, 30vw, 400px)', overflow: 'hidden' }}>
        <Image
          src="/images/company-texture.jpg"
          alt="Cinematic atmosphere — premiere night"
          fill
          className="object-cover object-center"
          style={{ opacity: 0.25 }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, #080808, transparent 30%, transparent 70%, #080808)',
          }}
        />
        <div
          style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            padding:        '2rem',
          }}
        >
          <motion.p
            {...fadeUp}
            className="pm-display"
            style={{
              fontSize:  'clamp(1.5rem, 4vw, 3rem)',
              color:     '#F5F0EB',
              textAlign: 'center',
              maxWidth:  '700px',
              opacity:   0.9,
            }}
          >
            "The lights go down once.
            <br />
            <span style={{ color: '#B89A6A' }}>We build everything around that second."</span>
          </motion.p>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div {...fadeUp} style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ height: '1px', width: '32px', background: '#B89A6A', opacity: 0.6 }} />
              <span className="pm-eyebrow">What We Do</span>
            </div>
            <h2
              className="pm-display"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#F5F0EB' }}
            >
              Three disciplines.
              <br />One standard.
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                id={`service-${service.id}`}
                {...fadeUp}
                transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display:             'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap:                 'clamp(1.5rem, 3vw, 3rem)',
                  padding:             'clamp(2rem, 4vw, 3.5rem) 0',
                  borderBottom:        '1px solid rgba(255,255,255,0.05)',
                  alignItems:          'start',
                }}
              >
                <div>
                  <span
                    className="font-cormorant"
                    style={{ fontSize: '0.75rem', fontWeight: 300, color: '#B89A6A', letterSpacing: '0.2em', opacity: 0.6 }}
                  >
                    {service.number}
                  </span>
                </div>
                <div>
                  <h3
                    className="pm-display"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#F5F0EB', marginBottom: '1rem' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily:    'var(--font-inter), Inter, sans-serif',
                      fontSize:      '0.9rem',
                      fontWeight:    300,
                      color:         '#7A7066',
                      lineHeight:    1.9,
                      letterSpacing: '0.02em',
                      maxWidth:      '560px',
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <motion.section
        {...fadeUp}
        style={{
          padding:   'clamp(4rem, 8vw, 6rem) 2rem',
          background:'#111111',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <p className="pm-eyebrow" style={{ marginBottom: '1.5rem' }}>Work With Us</p>
          <h2
            className="pm-display"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F5F0EB', marginBottom: '0.75rem' }}
          >
            Your film's first night
            <br />
            <span style={{ color: '#B89A6A' }}>starts here.</span>
          </h2>
          <p
            style={{
              fontFamily:    'var(--font-inter), Inter, sans-serif',
              fontSize:      '0.875rem',
              fontWeight:    300,
              color:         '#7A7066',
              marginBottom:  '2.5rem',
              letterSpacing: '0.04em',
            }}
          >
            We take on a limited number of launches each season.
          </p>
          <Link href="/contact" className="btn-primary" id="company-contact-cta">
            Get in Touch
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
