'use client'

// app/contact/page.tsx
// Newsletter / contact form with React Hook Form validation, API submission,
// loading state, success animation, and error handling.

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact, type ContactPayload } from '@/app/lib/api'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [status, setStatus]   = useState<FormStatus>('idle')
  const [errMsg, setErrMsg]   = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactPayload>()

  const onSubmit = async (data: ContactPayload) => {
    setStatus('loading')
    setErrMsg('')
    try {
      await submitContact(data)
      setStatus('success')
      reset()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setErrMsg(message)
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-pienet-black">
      {/* ── PAGE HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ paddingTop: '9rem', paddingBottom: '4rem' }}>
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-pienet-red" />
              <span className="font-inter text-xs font-semibold tracking-[0.3em] uppercase text-pienet-red">
                Stay in the Loop
              </span>
            </div>
            <h1 className="font-bebas text-6xl sm:text-8xl md:text-[9rem] leading-none text-white tracking-tight">
              Contact<br />
              <span className="text-gradient-red">PieNet</span>
            </h1>
            <p className="mt-5 font-inter text-pienet-zinc text-base md:text-lg leading-relaxed max-w-xl">
              Be the first to know about our upcoming premieres, exclusive screenings, and press events.
              Drop us a message — we read every one.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FORM SECTION ─────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Left: Info column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="lg:col-span-2 space-y-10"
            >
              <div>
                <h2 className="font-bebas text-3xl text-white tracking-wide mb-3">Get in Touch</h2>
                <p className="font-inter text-pienet-zinc text-sm leading-relaxed">
                  Whether you're a film industry professional, a press representative, or simply an
                  enthusiast who wants front-row access to the next big launch — we'd love to hear from you.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  { icon: '📍', label: 'Location', value: '1 Premiere Plaza, Hollywood, CA' },
                  { icon: '📧', label: 'Email',    value: 'launches@pienet.com' },
                  { icon: '📞', label: 'Press',    value: '+1 (800) PIE-FILM' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-pienet-red mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-inter text-pienet-zinc text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {/* ── SUCCESS STATE ─── */}
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{   opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center min-h-[400px] text-center gap-6 bg-pienet-surface border border-white/5 p-12"
                  >
                    {/* Animated checkmark */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                      className="w-20 h-20 rounded-full border-2 border-pienet-red flex items-center justify-center"
                      style={{ boxShadow: '0 0 40px rgba(229,9,20,0.3)' }}
                    >
                      <motion.svg
                        className="w-9 h-9 text-pienet-red"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </motion.div>
                    <div>
                      <h3 className="font-bebas text-4xl text-white tracking-wide mb-2">
                        You're in the Loop!
                      </h3>
                      <p className="font-inter text-pienet-zinc text-sm">
                        We've received your message. Expect to hear from us before the credits roll.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="btn-outline text-sm"
                      id="send-another-btn"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  /* ── FORM STATE ─── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 bg-pienet-surface border border-white/5 p-8 md:p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{   opacity: 0 }}
                  >
                    <div className="section-divider" />
                    <h2 className="font-bebas text-3xl text-white tracking-wide">Send a Message</h2>

                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="form-label">Your Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. John Doe"
                        className={`form-input ${errors.name ? 'border-pienet-red' : ''}`}
                        {...register('name', {
                          required: 'Name is required',
                          minLength: { value: 2, message: 'Must be at least 2 characters' },
                        })}
                      />
                      {errors.name && (
                        <p className="mt-1.5 font-inter text-xs text-pienet-red">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="form-label">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. you@example.com"
                        className={`form-input ${errors.email ? 'border-pienet-red' : ''}`}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email address',
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1.5 font-inter text-xs text-pienet-red">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="form-label">Message *</label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Tell us what you're working on..."
                        className={`form-input resize-none ${errors.message ? 'border-pienet-red' : ''}`}
                        {...register('message', {
                          required: 'Message is required',
                          minLength: { value: 10, message: 'Please write at least 10 characters' },
                        })}
                      />
                      {errors.message && (
                        <p className="mt-1.5 font-inter text-xs text-pienet-red">{errors.message.message}</p>
                      )}
                    </div>

                    {/* API Error */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-pienet-red/30 bg-pienet-red/5"
                      >
                        <p className="font-inter text-sm text-pienet-red">
                          ⚠️ {errMsg || 'Could not send your message. Make sure the API is running.'}
                        </p>
                      </motion.div>
                    )}

                    {/* Submit */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                          />
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}
