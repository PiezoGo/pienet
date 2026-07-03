// hooks/useFilm.ts
// Fetches a single film by slug. Falls back to static data when API is offline.

import { useQuery } from '@tanstack/react-query'
import { fetchFilm } from '@/app/lib/api'
import { STATIC_FILMS } from '@/app/lib/staticFilms'

export function useFilm(slug: string) {
  return useQuery({
    queryKey:  ['film', slug],
    queryFn:   () => fetchFilm(slug),
    staleTime: 5 * 60 * 1000,
    retry:     1,
    enabled:   !!slug,
    // Serve from static data as placeholder
    placeholderData: STATIC_FILMS.find((f) => f.slug === slug),
  })
}
