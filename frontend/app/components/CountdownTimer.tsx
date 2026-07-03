'use client'

// components/CountdownTimer.tsx
// Displays a live countdown to the next premiere date.

import { useCountdown } from '@/app/hooks/useCountdown'

interface Props {
  target: Date
  label?: string
}

const Block = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center gap-1 min-w-[72px]">
    <div
      className="relative flex items-center justify-center w-full px-3 py-3 border border-white/10 bg-black/40 backdrop-blur-sm"
      style={{ boxShadow: '0 0 20px rgba(229,9,20,0.1)' }}
    >
      {/* Digit */}
      <span className="countdown-digit">{value}</span>
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-pienet-red" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-pienet-red" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-pienet-red" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-pienet-red" />
    </div>
    <span className="countdown-label">{label}</span>
  </div>
)

const Separator = () => (
  <span className="font-bebas text-4xl text-pienet-red/60 mb-5 select-none">:</span>
)

export default function CountdownTimer({ target, label = 'Next Premiere' }: Props) {
  const { days, hours, minutes, seconds, expired } = useCountdown(target)

  if (expired) {
    return (
      <div className="text-center">
        <p className="font-bebas text-2xl tracking-widest text-pienet-red">Premiere Live Now</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-inter text-[10px] font-semibold tracking-[0.25em] uppercase text-pienet-red">
        {label}
      </p>
      <div className="flex items-end gap-2 sm:gap-3">
        <Block value={days}    label="Days"    />
        <Separator />
        <Block value={hours}   label="Hours"   />
        <Separator />
        <Block value={minutes} label="Mins"    />
        <Separator />
        <Block value={seconds} label="Secs"    />
      </div>
    </div>
  )
}
