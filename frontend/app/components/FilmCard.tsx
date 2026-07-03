'use client'

// components/FilmCard.tsx
// Premium film card with 3D tilt hover, red glow, and poster image.

import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { type Film } from '@/app/lib/api'
import { formatDate } from '@/app/lib/utils'

interface Props {
  film: Film
  index?: number
}

// Genre badge colours
const GENRE_COLORS: Record<string, string> = {
  'Neo-Noir Thriller':   'bg-purple-900/60 text-purple-300 border-purple-500/30',
  'Sci-Fi Drama':        'bg-blue-900/60   text-blue-300   border-blue-500/30',
  'Cyberpunk Action':    'bg-cyan-900/60   text-cyan-300   border-cyan-500/30',
  'Psychological Thriller': 'bg-red-900/60 text-red-300    border-red-500/30',
  'Sci-Fi Mystery':      'bg-indigo-900/60 text-indigo-300 border-indigo-500/30',
  'Crime Drama':         'bg-emerald-900/60 text-emerald-300 border-emerald-500/30',
}

export default function FilmCard({ film, index = 0 }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]),  { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  const genreClass = GENRE_COLORS[film.genre] ?? 'bg-zinc-900/60 text-zinc-300 border-zinc-500/30'

  // Determine poster source (local public vs API)
  const posterSrc = film.poster_image?.startsWith('/images/')
    ? film.poster_image
    : `/images/${film.poster_image}`

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="film-card cursor-pointer"
    >
      <Link href={`/films/${film.slug}`} id={`film-card-${film.slug}`} className="block w-full">
        <div className="group relative overflow-hidden bg-pienet-card w-full aspect-[2/3]">
          {/* Poster */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={posterSrc}
              alt={`${film.title} poster`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={index < 3}
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Top: Genre badge */}
          <div className="absolute top-4 left-4">
            <span className={`text-[10px] font-inter font-semibold px-2.5 py-1 border rounded-full tracking-widest uppercase ${genreClass}`}>
              {film.genre}
            </span>
          </div>

          {/* Red glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
               style={{ boxShadow: 'inset 0 0 0 1px rgba(229,9,20,0.5)' }} />

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-bebas text-2xl tracking-wide text-white leading-tight mb-1.5">
              {film.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-pienet-zinc text-xs font-inter">
                🎬 {formatDate(film.release_date)}
              </p>
              <span className="text-pienet-red text-xs font-inter font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
