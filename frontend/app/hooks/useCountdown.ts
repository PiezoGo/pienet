'use client'

// hooks/useCountdown.ts
// Returns a live countdown (days, hours, minutes, seconds) to a target date.

import { useState, useEffect } from 'react'
import { pad } from '@/app/lib/utils'

interface CountdownResult {
  days:    string
  hours:   string
  minutes: string
  seconds: string
  expired: boolean
}

export function useCountdown(target: Date): CountdownResult {
  const calculate = (): CountdownResult => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00', expired: true }
    }
    const totalSecs = Math.floor(diff / 1000)
    const days    = Math.floor(totalSecs / 86400)
    const hours   = Math.floor((totalSecs % 86400) / 3600)
    const minutes = Math.floor((totalSecs % 3600) / 60)
    const seconds = totalSecs % 60
    return {
      days:    pad(days),
      hours:   pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
      expired: false,
    }
  }

  const [countdown, setCountdown] = useState<CountdownResult>(calculate)

  useEffect(() => {
    const timer = setInterval(() => setCountdown(calculate()), 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return countdown
}
