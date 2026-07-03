'use client'

// components/FilmGrid.tsx
// Responsive 3-column grid with genre filter + horizontal snap carousel on mobile.

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFilms } from '@/app/hooks/useFilms'
import FilmCard from './FilmCard'
import GenreFilter from './GenreFilter'
import LoadingSpinner from './LoadingSpinner'

export default function FilmGrid() {
  const { data: films, isLoading, isError } = useFilms()
  const [selectedGenre, setSelectedGenre] = useState('All')

  const filtered = useMemo(() => {
    if (!films) return []
    if (selectedGenre === 'All') return films
    return films.filter((f) => f.genre === selectedGenre)
  }, [films, selectedGenre])

  return (
    <section
      id="launches"
      className="relative py-20 md:py-32 bg-pienet-black"
      aria-label="Upcoming launches section"
    >
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="section-divider" />
          <h2 className="font-bebas text-5xl md:text-7xl tracking-wide text-white">
            Upcoming <span className="text-gradient-red">Launches</span>
          </h2>
          <p className="mt-3 font-inter text-pienet-zinc text-base max-w-lg">
            Six films. Six premieres. One house that turns releases into events.
          </p>
        </motion.div>

        {/* Genre Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <GenreFilter selected={selectedGenre} onChange={setSelectedGenre} />
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-24">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="font-bebas text-3xl text-pienet-red mb-2">Connection Lost</p>
            <p className="font-inter text-pienet-zinc text-sm">
              Could not reach the launch server. Make sure the API is running on port 8000.
            </p>
          </motion.div>
        )}

        {/* Film Grid — Desktop */}
        {!isLoading && !isError && (
          <>
            {/* Desktop Grid (hidden on mobile) */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((film, i) => (
                  <motion.div
                    key={film.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{  opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FilmCard film={film} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Mobile Carousel (snap-scroll) */}
            <div className="sm:hidden carousel-scroll -mx-4 px-4">
              {filtered.map((film, i) => (
                <div key={film.slug} className="carousel-item w-[75vw]">
                  <FilmCard film={film} index={i} />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="font-bebas text-4xl text-white/20">No films in this genre</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
