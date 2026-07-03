'use client'

// components/GenreFilter.tsx
// Pill-style filter buttons for genre filtering.

import { motion } from 'framer-motion'

const GENRES = ['All', 'Neo-Noir Thriller', 'Sci-Fi Drama', 'Cyberpunk Action', 'Psychological Thriller', 'Sci-Fi Mystery', 'Crime Drama']

interface Props {
  selected: string
  onChange: (genre: string) => void
}

export default function GenreFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap justify-center md:justify-start" role="group" aria-label="Filter by genre">
      {GENRES.map((genre, i) => (
        <motion.button
          key={genre}
          id={`genre-filter-${genre.toLowerCase().replace(/\s+/g, '-')}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onChange(genre)}
          className={`genre-pill ${selected === genre ? 'active' : ''}`}
          aria-pressed={selected === genre}
        >
          {genre}
        </motion.button>
      ))}
    </div>
  )
}
