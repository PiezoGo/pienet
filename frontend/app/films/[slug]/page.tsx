'use client'

// app/films/[slug]/page.tsx
// Film detail page — poster, metadata, synopsis, cast, director, trailer embed.

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useFilm } from '@/app/hooks/useFilm'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { formatDate } from '@/app/lib/utils'

export default function FilmDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const { data: film, isLoading, isError } = useFilm(slug)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pienet-black">
        <LoadingSpinner size={60} />
      </div>
    )
  }

  if (isError || !film) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pienet-black gap-6 px-4">
        <p className="font-bebas text-5xl text-pienet-red">Film Not Found</p>
        <p className="font-inter text-pienet-zinc text-sm text-center">
          This title doesn't exist in our archives. Check the API is running.
        </p>
        <button onClick={() => router.push('/')} className="btn-outline">← Back to Launches</button>
      </div>
    )
  }

  const posterSrc = film.poster_image?.startsWith('/images/')
    ? film.poster_image
    : `/images/${film.poster_image}`

  return (
    <div className="min-h-screen bg-pienet-black">
      {/* ── HERO BANNER ─────────────────────────────────────────────── */}
      <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <Image
          src={posterSrc}
          alt={film.title}
          fill
          className="object-cover object-top"
          priority
        />
        {/* Deep gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pienet-black via-pienet-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-pienet-black/80 via-transparent to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => router.push('/')}
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-pienet-zinc hover:text-white font-inter text-sm tracking-wide transition-colors"
          id="back-to-launches"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Launches
        </motion.button>

        {/* Hero Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block font-inter text-xs font-semibold tracking-[0.2em] uppercase text-pienet-red mb-3"
          >
            {film.genre}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-4xl sm:text-6xl md:text-8xl leading-none text-white tracking-wide"
          >
            {film.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 mt-4 text-pienet-zinc font-inter text-sm"
          >
            <span>🎬 Directed by <strong className="text-white">{film.director}</strong></span>
            <span>📅 <strong className="text-white">{formatDate(film.release_date)}</strong></span>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Left: Synopsis + Trailer */}
          <div className="lg:col-span-2">
            {/* Logline */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="border-l-2 border-pienet-red pl-5 mb-8"
            >
              <p className="font-inter text-lg md:text-xl text-white/70 italic leading-relaxed">
                "{film.logline}"
              </p>
            </motion.blockquote>

            {/* Synopsis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="font-bebas text-3xl text-white tracking-wide mb-4">Synopsis</h2>
              <p className="font-inter text-pienet-zinc leading-relaxed text-[1.0625rem]">
                {film.synopsis}
              </p>
            </motion.div>

            {/* Trailer */}
            {film.trailer_url && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mt-12"
              >
                <h2 className="font-bebas text-3xl text-white tracking-wide mb-5">Official Trailer</h2>
                <div className="trailer-wrapper border border-white/5">
                  <iframe
                    src={film.trailer_url}
                    title={`${film.title} — Official Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Metadata sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            {/* Cast */}
            <div>
              <div className="section-divider" />
              <h3 className="font-bebas text-2xl text-white tracking-wide mb-4">Cast</h3>
              <ul className="space-y-2">
                {(Array.isArray(film.cast) ? film.cast : [film.cast]).map((actor) => (
                  <li
                    key={actor}
                    className="font-inter text-sm text-pienet-zinc flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-pienet-red flex-shrink-0" />
                    {actor}
                  </li>
                ))}
              </ul>
            </div>

            {/* Director */}
            <div>
              <div className="section-divider" />
              <h3 className="font-bebas text-2xl text-white tracking-wide mb-2">Director</h3>
              <p className="font-inter text-pienet-zinc text-sm">{film.director}</p>
            </div>

            {/* Genre */}
            <div>
              <div className="section-divider" />
              <h3 className="font-bebas text-2xl text-white tracking-wide mb-2">Genre</h3>
              <span className="inline-block bg-pienet-red/10 border border-pienet-red/30 text-pienet-red font-inter text-xs font-semibold px-3 py-1.5 uppercase tracking-widest">
                {film.genre}
              </span>
            </div>

            {/* Premiere Date */}
            <div>
              <div className="section-divider" />
              <h3 className="font-bebas text-2xl text-white tracking-wide mb-2">Premiere</h3>
              <p className="font-inter text-pienet-zinc text-sm">{formatDate(film.release_date)}</p>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => router.push('/#launches')}
                className="btn-outline w-full justify-center text-sm"
                id="view-all-launches"
              >
                ← View All Launches
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
