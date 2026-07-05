'use client'

// components/Footer.tsx
// Pienet Movies — spare, branded footer.

import Link from 'next/link'

const NAV = [
  { label: 'Launches', href: '/#launches' },
  { label: 'Company',  href: '/company'   },
  { label: 'Contact',  href: '/contact'   },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background:   '#080808',
        borderTop:    '1px solid rgba(255,255,255,0.05)',
        padding:      '3.5rem 2rem 2.5rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display:        'flex',
            flexWrap:       'wrap',
            alignItems:     'flex-start',
            justifyContent: 'space-between',
            gap:            '2rem',
            marginBottom:   '3rem',
          }}
        >
          {/* Wordmark + tagline */}
          <div style={{ maxWidth: '280px' }}>
            <Link
              href="/"
              style={{ textDecoration: 'none', display: 'block', marginBottom: '0.875rem' }}
            >
              <span
                className="pm-wordmark"
                style={{ fontSize: '0.9375rem', color: '#F5F0EB' }}
              >
                PIENET<span style={{ color: '#B89A6A', marginLeft: '0.12em' }}>MOVIES</span>
              </span>
            </Link>
            <p
              style={{
                fontFamily:    'var(--font-inter), Inter, sans-serif',
                fontSize:      '0.75rem',
                fontWeight:    300,
                color:         '#7A7066',
                lineHeight:    1.7,
                letterSpacing: '0.02em',
              }}
            >
              We give films their first night.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <p
              style={{
                fontFamily:    'var(--font-inter), Inter, sans-serif',
                fontSize:      '0.5625rem',
                fontWeight:    500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         '#7A7066',
                marginBottom:  '1rem',
              }}
            >
              Navigate
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily:    'var(--font-inter), Inter, sans-serif',
                      fontSize:      '0.75rem',
                      fontWeight:    300,
                      color:         '#7A7066',
                      textDecoration: 'none',
                      letterSpacing: '0.05em',
                      transition:    'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F0EB' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#7A7066' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily:    'var(--font-inter), Inter, sans-serif',
                fontSize:      '0.5625rem',
                fontWeight:    500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         '#7A7066',
                marginBottom:  '1rem',
              }}
            >
              Enquiries
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontSize:   '0.75rem',
                fontWeight: 300,
                color:      '#7A7066',
                lineHeight: 1.8,
              }}
            >
              launches@pienetmovies.com
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontSize:   '0.75rem',
                fontWeight: 300,
                color:      '#7A7066',
              }}
            >
              Press: press@pienetmovies.com
            </p>
          </div>
        </div>

        {/* Bottom rule + copyright */}
        <div
          style={{
            borderTop:      '1px solid rgba(255,255,255,0.05)',
            paddingTop:     '1.5rem',
            display:        'flex',
            flexWrap:       'wrap',
            alignItems:     'center',
            justifyContent: 'space-between',
            gap:            '0.75rem',
          }}
        >
          <p
            style={{
              fontFamily:    'var(--font-inter), Inter, sans-serif',
              fontSize:      '0.625rem',
              color:         'rgba(122,112,102,0.5)',
              letterSpacing: '0.1em',
            }}
          >
            © {year} Pienet Movies. All rights reserved.
          </p>
          <p
            style={{
              fontFamily:    'var(--font-inter), Inter, sans-serif',
              fontSize:      '0.625rem',
              color:         'rgba(122,112,102,0.4)',
              letterSpacing: '0.05em',
            }}
          >
            Premieres. Campaigns. Press.
          </p>
        </div>
      </div>
    </footer>
  )
}
