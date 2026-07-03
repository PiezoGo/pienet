// lib/utils.ts
// Shared utility helpers.

/**
 * Format a date string (YYYY-MM-DD) into a human-readable format.
 * e.g. "2026-10-15" → "Oct 15, 2026"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  })
}

/**
 * Convert a film title to a URL-friendly slug.
 * e.g. "Spider-Man: Brand New Day" → "spiderman-brand-new-day"
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/**
 * Get the countdown target: the earliest upcoming premiere.
 */
export function getNextPremiere(dates: string[]): Date {
  const now = Date.now()
  const future = dates
    .map((d) => new Date(d + 'T00:00:00').getTime())
    .filter((t) => t > now)
    .sort((a, b) => a - b)
  return future.length > 0 ? new Date(future[0]) : new Date('2026-10-15T00:00:00')
}

/**
 * Pad a number to always be 2 digits: 7 → "07"
 */
export function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/**
 * Build a poster image URL, falling back to a gradient placeholder.
 */
export function posterUrl(path: string): string {
  if (!path) return '/images/placeholder.jpg'
  if (path.startsWith('http')) return path
  // Prepend Laravel's base URL for relative paths
  const base = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000'
  return `${base}/storage/${path}`
}
