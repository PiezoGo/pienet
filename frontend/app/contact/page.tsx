'use client'

// app/contact/page.tsx
// Pienet Movies — "Stay in the Loop" contact form.
// Submits to POST /api/contact (name, email, message).
// Distinct success / validation error / network error states.

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact, type ContactPayload } from '@/app/lib/api'

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'validation_error'

const CONTACT_INFO = [
  { label: 'Press Enquiries',  value: 'press@pienetmovies.com' },
  { label: 'Launch Enquiries', value: 'launches@pienetmovies.com' },
  { label: 'Location',         value: '18 Curtain Row, London EC2A 3AT' },
]

export default function ContactPage() {
  const [status,  setStatus]  = useState<FormStatus>('idle')
  const [errMsg,  setErrMsg]  = useState('')

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
      // Distinguish validation errors (422) from network/server errors
      if (message.toLowerCase().includes('validation') || message.toLowerCase().includes('422')) {
        setStatus('validation_error')
      } else {
        setStatus('error')
      }
      setErrMsg(message)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', position: 'relative' }}>
      {/* Subtle background image behind form section — bottom half only */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '55%',
          zIndex: 0,
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/paper-moons.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.06 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #080808 0%, transparent 30%, rgba(8,8,8,0.7) 100%)' }} />
      </div>

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section
        style={{
          position:      'relative',
          overflow:      'hidden',
          paddingTop:    'clamp(7rem, 15vw, 11rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          paddingLeft:   '2rem',
          paddingRight:  '2rem',
          zIndex:        1,
        }}
      >
        <div
          style={{
            position:   'absolute', inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(200,16,46,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        <div className="grain-overlay" aria-hidden="true" />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
              <span style={{ height: '1px', width: '32px', background: '#B89A6A', opacity: 0.6 }} />
              <span className="pm-eyebrow">Stay in the Loop</span>
            </div>
            <h1
              className="pm-display"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', color: '#F5F0EB', marginBottom: '1.25rem' }}
            >
              Be first.
              <br />
              <span style={{ color: '#B89A6A' }}>Always.</span>
            </h1>
            <p
              style={{
                fontFamily:    'var(--font-inter), Inter, sans-serif',
                fontSize:      '0.9375rem',
                fontWeight:    300,
                color:         '#7A7066',
                maxWidth:      '440px',
                lineHeight:    1.9,
                letterSpacing: '0.02em',
              }}
            >
              Be the first to know when the lights go down.
              Exclusive access to premiere nights, trailer drops, and press events before they're public.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FORM SECTION ─────────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) 2rem clamp(5rem, 10vw, 8rem)',
          position: 'relative',
          zIndex:   1,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr',
              gap:                 'clamp(3rem, 6vw, 6rem)',
              alignItems:          'start',
            }}
            className="lg:grid-contact-split"
          >

            {/* Left: info column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
            >
              <div>
                <div className="section-divider" />
                <h2
                  className="font-cormorant"
                  style={{ fontSize: '1.125rem', fontWeight: 300, color: '#F5F0EB', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}
                >
                  Get in Touch
                </h2>
                <p
                  style={{
                    fontFamily:    'var(--font-inter), Inter, sans-serif',
                    fontSize:      '0.875rem',
                    fontWeight:    300,
                    color:         '#7A7066',
                    lineHeight:    1.9,
                    letterSpacing: '0.02em',
                  }}
                >
                  Whether you represent a studio, a film, or simply want to know what's premiering — we read every message.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {CONTACT_INFO.map((item) => (
                  <div key={item.label}>
                    <p
                      style={{
                        fontFamily:    'var(--font-inter), Inter, sans-serif',
                        fontSize:      '0.5625rem',
                        fontWeight:    500,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color:         '#B89A6A',
                        marginBottom:  '0.25rem',
                        opacity:       0.8,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily:    'var(--font-inter), Inter, sans-serif',
                        fontSize:      '0.8125rem',
                        fontWeight:    300,
                        color:         '#7A7066',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <AnimatePresence mode="wait">

                {/* ── SUCCESS ── */}
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{   opacity: 0, scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                    style={{
                      display:        'flex',
                      flexDirection:  'column',
                      alignItems:     'center',
                      justifyContent: 'center',
                      minHeight:      '420px',
                      textAlign:      'center',
                      gap:            '1.5rem',
                      border:         '1px solid rgba(255,255,255,0.05)',
                      background:     'rgba(255,255,255,0.01)',
                      padding:        '3rem 2rem',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
                      style={{
                        width:  '56px', height: '56px',
                        border: '1px solid #B89A6A',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        boxShadow: '0 0 30px rgba(184,154,106,0.2)',
                      }}
                    >
                      <svg width="22" height="22" fill="none" stroke="#B89A6A" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <div>
                      <h3
                        className="pm-display"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F5F0EB', marginBottom: '0.5rem' }}
                      >
                        You're in the loop.
                      </h3>
                      <p
                        style={{
                          fontFamily:    'var(--font-inter), Inter, sans-serif',
                          fontSize:      '0.8125rem',
                          fontWeight:    300,
                          color:         '#7A7066',
                          letterSpacing: '0.04em',
                        }}
                      >
                        We've received your message. Expect to hear from us before the credits roll.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="btn-outline"
                      id="send-another-btn"
                      style={{ marginTop: '0.5rem' }}
                    >
                      Send another message
                    </button>
                  </motion.div>

                ) : (
                  /* ── FORM ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{   opacity: 0 }}
                    style={{
                      display:    'flex',
                      flexDirection:'column',
                      gap:        '1.5rem',
                      border:     '1px solid rgba(255,255,255,0.05)',
                      background: 'rgba(255,255,255,0.01)',
                      padding:    'clamp(1.5rem, 4vw, 2.5rem)',
                    }}
                    noValidate
                  >
                    <div>
                      <div className="section-divider" />
                      <h2
                        className="font-cormorant"
                        style={{ fontSize: '1.125rem', fontWeight: 300, color: '#F5F0EB', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                      >
                        Send a Message
                      </h2>
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="form-label">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your full name"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        {...register('name', {
                          required: 'Name is required.',
                          minLength: { value: 2, message: 'Must be at least 2 characters.' },
                        })}
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          role="alert"
                          style={{ marginTop: '0.375rem', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', color: '#C8102E', letterSpacing: '0.05em' }}
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="form-label">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        {...register('email', {
                          required: 'Email address is required.',
                          pattern: {
                            value:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email address.',
                          },
                        })}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          role="alert"
                          style={{ marginTop: '0.375rem', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', color: '#C8102E', letterSpacing: '0.05em' }}
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="form-label">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Tell us about your project or enquiry…"
                        className={`form-input ${errors.message ? 'error' : ''}`}
                        style={{ resize: 'none' }}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        {...register('message', {
                          required: 'A message is required.',
                          minLength: { value: 10, message: 'Please write at least 10 characters.' },
                        })}
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          role="alert"
                          style={{ marginTop: '0.375rem', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', color: '#C8102E', letterSpacing: '0.05em' }}
                        >
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Network/server error */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        style={{
                          padding:     '1rem 1.25rem',
                          border:      '1px solid rgba(200,16,46,0.3)',
                          background:  'rgba(200,16,46,0.04)',
                        }}
                      >
                        <p
                          style={{
                            fontFamily:    'var(--font-inter), Inter, sans-serif',
                            fontSize:      '0.8125rem',
                            fontWeight:    300,
                            color:         '#C8102E',
                            letterSpacing: '0.03em',
                          }}
                        >
                          Server error — {errMsg || 'Could not send your message. Please try again or email us directly.'}
                        </p>
                      </motion.div>
                    )}

                    {/* Validation error from server */}
                    {status === 'validation_error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        style={{
                          padding:     '1rem 1.25rem',
                          border:      '1px solid rgba(184,154,106,0.3)',
                          background:  'rgba(184,154,106,0.04)',
                        }}
                      >
                        <p
                          style={{
                            fontFamily:    'var(--font-inter), Inter, sans-serif',
                            fontSize:      '0.8125rem',
                            fontWeight:    300,
                            color:         '#B89A6A',
                            letterSpacing: '0.03em',
                          }}
                        >
                          Please check your submission — {errMsg}
                        </p>
                      </motion.div>
                    )}

                    {/* Submit */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary"
                      style={{ justifyContent: 'center', marginTop: '0.5rem' }}
                    >
                      {status === 'loading' ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            style={{
                              display: 'inline-block',
                              width:   '14px', height: '14px',
                              border:  '1px solid rgba(245,240,235,0.3)',
                              borderTopColor: '#F5F0EB',
                              borderRadius: '50%',
                            }}
                          />
                          Sending…
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
