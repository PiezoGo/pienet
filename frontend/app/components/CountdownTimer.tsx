'use client'

// components/CountdownTimer.tsx
// NOCTURNE HOUSE — Live countdown with Cormorant digits and gold accents.

import { useCountdown } from '@/app/hooks/useCountdown'

interface Props {
  target: Date
  label?: string
  filmTitle?: string
}

const Block = ({ value, label }: { value: string; label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', minWidth: '68px' }}>
    <div
      style={{
        position:       'relative',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          '100%',
        padding:        '0.625rem 0.75rem',
        border:         '1px solid rgba(255,255,255,0.07)',
        background:     'rgba(8,8,8,0.5)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span className="countdown-digit">{value}</span>
      {/* Gold corner accents */}
      <span style={{ position: 'absolute', top: 0, left: 0, width: '8px', height: '8px', borderTop: '1px solid #B89A6A', borderLeft: '1px solid #B89A6A', opacity: 0.6 }} />
      <span style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', borderTop: '1px solid #B89A6A', borderRight: '1px solid #B89A6A', opacity: 0.6 }} />
      <span style={{ position: 'absolute', bottom: 0, left: 0, width: '8px', height: '8px', borderBottom: '1px solid #B89A6A', borderLeft: '1px solid #B89A6A', opacity: 0.6 }} />
      <span style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderBottom: '1px solid #B89A6A', borderRight: '1px solid #B89A6A', opacity: 0.6 }} />
    </div>
    <span className="countdown-label">{label}</span>
  </div>
)

const Separator = () => (
  <span
    className="font-cormorant"
    style={{ fontSize: '2rem', fontWeight: 300, color: 'rgba(184,154,106,0.4)', paddingBottom: '1.2rem', lineHeight: 1, userSelect: 'none' }}
  >
    :
  </span>
)

export default function CountdownTimer({ target, label = 'Next Premiere', filmTitle }: Props) {
  const { days, hours, minutes, seconds, expired } = useCountdown(target)

  if (expired) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p
          className="pm-eyebrow"
          style={{ color: '#B89A6A', fontSize: '0.625rem', letterSpacing: '0.25em' }}
        >
          Premiere Night
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily:    'var(--font-inter), Inter, sans-serif',
            fontSize:      '0.5625rem',
            fontWeight:    500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color:         '#7A7066',
            marginBottom:  '0.25rem',
          }}
        >
          {label}
        </p>
        {filmTitle && (
          <p
            className="font-cormorant"
            style={{ fontSize: '1rem', fontWeight: 300, color: '#E8E0D4', letterSpacing: '0.05em', fontStyle: 'italic' }}
          >
            {filmTitle}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
        <Block value={days}    label="Days"  />
        <Separator />
        <Block value={hours}   label="Hours" />
        <Separator />
        <Block value={minutes} label="Mins"  />
        <Separator />
        <Block value={seconds} label="Secs"  />
      </div>
    </div>
  )
}
