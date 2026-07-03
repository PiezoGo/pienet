// hooks/useFilms.ts
// Fetches all films from the API. Falls back to static data when API is offline.

import { useQuery } from '@tanstack/react-query'
import { fetchFilms } from '@/app/lib/api'
import { STATIC_FILMS } from '@/app/lib/staticFilms'

export function useFilms() {
  return useQuery({
    queryKey:     ['films'],
    queryFn:      fetchFilms,
    staleTime:    5 * 60 * 1000,  // 5 min
    retry:        1,
    // When API fails, return static data as a graceful fallback
    placeholderData: STATIC_FILMS,
  })
}
