'use client'

// components/Navbar.tsx
// Pienet Movies — glassmorphic sticky navbar, mobile hamburger, no theme toggle.

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Launches', href: '/#launches' },
  { label: 'Company',  href: '/company'   },
  { label: 'Contact',  href: '/contact'   },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [mounted,   setMounted]   = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href.replace('/#launches', '/'))
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position:     'fixed',
          top:          0,
          left:         0,
          right:        0,
          zIndex:       50,
          padding:      scrolled ? '0.875rem 0' : '1.5rem 0',
          background:   scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition:   'padding 0.4s ease, background 0.4s ease, border-color 0.4s ease',
        }}
        aria-label="Main navigation"
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* ── Wordmark ── */}
          <Link
            href="/"
            aria-label="Pienet Movies — home"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <span
              className="pm-wordmark"
              style={{ fontSize: '1.0625rem', color: '#F5F0EB', letterSpacing: '0.22em' }}
            >
              PIENET<span style={{ color: '#B89A6A', marginLeft: '0.15em' }}>MOVIES</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          {mounted && (
            <div
              className="hidden md:flex"
              style={{ alignItems: 'center', gap: '2.5rem' }}
            >
              <ul style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none' }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nav-link ${isActive(link.href) ? 'nav-link-active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/contact"
                id="nav-cta"
                className="btn-primary"
                style={{ padding: '0.5625rem 1.375rem', fontSize: '0.625rem' }}
              >
                Stay in the Loop
              </Link>
            </div>
          )}

          {/* ── Mobile: hamburger ── */}
          <button
            id="hamburger-btn"
            className="md:hidden"
            style={{
              display: 'flex', flexDirection: 'column', gap: '5px',
              padding: '6px', background: 'none', border: 'none',
              cursor: 'pointer', outline: 'none',
            }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                style={{
                  display: 'block', width: '22px', height: '1px',
                  background: '#F5F0EB', transformOrigin: 'center',
                }}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45,  y: 6 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position:            'fixed',
              top:                 '64px',
              left:                0,
              right:               0,
              zIndex:              40,
              background:          'rgba(8,8,8,0.97)',
              backdropFilter:      'blur(24px)',
              WebkitBackdropFilter:'blur(24px)',
              borderBottom:        '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <nav aria-label="Mobile navigation">
              <ul style={{ listStyle: 'none', padding: '0.75rem 0 1.25rem' }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        display: 'block',
                        padding: '0.875rem 2rem',
                        color: '#7A7066',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-inter), Inter, sans-serif',
                        fontSize: '0.6875rem',
                        fontWeight: 400,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        transition: 'color 0.2s ease',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F0EB' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#7A7066' }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li style={{ padding: '1rem 2rem 0' }}>
                  <Link
                    href="/contact"
                    className="btn-primary"
                    style={{ justifyContent: 'center', width: '100%' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Stay in the Loop
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
