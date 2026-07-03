// lib/api.ts
// Axios client configured to talk to the Laravel backend.

import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pienet-backend.onrender.com'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
  timeout: 10000,
})

// ── Response interceptor: normalise errors ──────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

export default apiClient

// ── Film API helpers ─────────────────────────────────────────────────────────
export interface Film {
  id: number
  title: string
  slug: string
  genre: string
  logline: string
  synopsis: string
  director: string
  cast: string[]
  release_date: string
  trailer_url: string
  poster_image: string
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export const fetchFilms = async (): Promise<Film[]> => {
  const { data } = await apiClient.get('/films')
  return data.data ?? data
}

export const fetchFilm = async (slug: string): Promise<Film> => {
  const { data } = await apiClient.get(`/films/${slug}`)
  return data.data ?? data
}

export const submitContact = async (payload: ContactPayload): Promise<{ message: string }> => {
  const { data } = await apiClient.post('/contact', payload)
  return data
}
