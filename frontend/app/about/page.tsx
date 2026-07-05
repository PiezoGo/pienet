// app/about/page.tsx
// Redirects to /company — NOCTURNE HOUSE company page has moved.

import { redirect } from 'next/navigation'

export default function AboutPage() {
  redirect('/company')
}
