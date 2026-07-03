'use client'

// components/Navbar.tsx
// Glassmorphic sticky navbar with dark/light toggle and mobile hamburger.

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Launches', href: '/#launches' },
  { label: 'About',    href: '/about'    },
  { label: 'Contact',  href: '/contact'  },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [mounted,   setMounted]   = useState(false)
  const [isMobile,  setIsMobile]  = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  const isDark = resolvedTheme === 'dark'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* ── Logo ── */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <span className="font-bebas" style={{ fontSize: '1.875rem', letterSpacing: '0.15em', color: isDark ? '#fff' : '#0A0A0A' }}>
              PIE<span style={{ color: '#E50914' }}>NET</span>
            </span>
          </Link>

          {/* ── Desktop: Nav links + Toggle + CTA ── */}
          {!isMobile && mounted && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="nav-link">{link.label}</Link>
                  </li>
                ))}
              </ul>

              {/* Theme toggle */}
              <button
                id="theme-toggle"
                aria-label="Toggle dark/light mode"
                onClick={toggleTheme}
                style={{
                  position: 'relative',
                  width: '3rem',
                  height: '1.5rem',
                  borderRadius: '9999px',
                  border: `1px solid ${isDark ? '#E50914' : 'rgba(0,0,0,0.2)'}`,
                  background: isDark ? 'rgba(229,9,20,0.3)' : 'rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  outline: 'none',
                  flexShrink: 0,
                }}
              >
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: isDark ? '2px' : '26px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: isDark ? '#E50914' : '#0A0A0A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                  }}
                >
                  {isDark ? '🌙' : '☀️'}
                </motion.div>
              </button>

              {/* CTA */}
              <Link
                href="/contact"
                id="nav-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.5rem 1.25rem',
                  background: '#E50914',
                  color: '#fff',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'box-shadow 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(229,9,20,0.5)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
              >
                Stay in the Loop
              </Link>
            </div>
          )}

          {/* ── Mobile: Toggle + Hamburger ── */}
          {(isMobile || !mounted) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {mounted && (
                <button
                  id="theme-toggle-mobile"
                  aria-label="Toggle dark/light mode"
                  onClick={toggleTheme}
                  style={{
                    position: 'relative',
                    width: '2.5rem',
                    height: '1.25rem',
                    borderRadius: '9999px',
                    border: `1px solid ${isDark ? '#E50914' : 'rgba(0,0,0,0.2)'}`,
                    background: isDark ? 'rgba(229,9,20,0.3)' : 'rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{
                      position: 'absolute',
                      top: '1px',
                      left: isDark ? '2px' : '18px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: isDark ? '#E50914' : '#0A0A0A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '8px',
                    }}
                  >
                    {isDark ? '🌙' : '☀️'}
                  </motion.div>
                </button>
              )}
              <button
                id="hamburger-btn"
                style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px', background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                aria-label="Toggle menu"
                onClick={() => setMenuOpen((o) => !o)}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'block', width: '24px', height: '2px', background: '#FFFFFF', borderRadius: '2px', transformOrigin: 'center' }}
                    animate={
                      menuOpen
                        ? i === 0 ? { rotate: 45,  y: 7 }
                        : i === 1 ? { opacity: 0 }
                        : { rotate: -45, y: -7 }
                        : { rotate: 0, y: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.25 }}
                  />
                ))}
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '68px',
              left: 0,
              right: 0,
              zIndex: 40,
              background: 'rgba(10,10,10,0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: '0.5rem 0' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      display: 'block',
                      padding: '1rem 1.5rem',
                      color: '#A1A1AA',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#A1A1AA'; e.currentTarget.style.background = 'transparent' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li style={{ padding: '0.75rem 1.5rem 1rem' }}>
                <Link
                  href="/contact"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '0.75rem',
                    background: '#E50914',
                    color: '#fff',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  Stay in the Loop
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
