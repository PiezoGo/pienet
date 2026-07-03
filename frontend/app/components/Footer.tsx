'use client'

// components/Footer.tsx
// Ultra-minimal Pinterest-style footer.

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <footer 
      className="w-full py-4 px-4 text-center mt-auto border-t"
      style={{
        backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      }}
    >
      <ul className="flex flex-wrap items-center justify-center max-w-5xl mx-auto" style={{ gap: '1rem' }}>
        {[
          { label: 'About', href: '/about' },
          { label: 'Blog', href: '#' },
          { label: 'Business', href: '#' },
          { label: 'Careers', href: '#' },
          { label: 'Developers', href: '#' },
          { label: 'Removals', href: '#' },
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Contact', href: '/contact' },
        ].map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                color: isDark ? '#A1A1AA' : '#5F5F5F',
                textDecoration: 'none',
                transition: 'text-decoration 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}
