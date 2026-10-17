import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'

const subjects = ['Membership enquiry', 'Personal training', 'Class timetable', 'Corporate membership', 'Something else']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) {
      next.name = 'Please enter your full name.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (form.message.trim().length < 10) {
      next.message = 'Please tell us a little more (at least 10 characters).'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) {
      return
    }
    const enquiry = { ...form, createdAt: new Date().toISOString() }
    const existing = JSON.parse(localStorage.getItem('pulsefit-enquiries') || '[]')
    existing.push(enquiry)
    localStorage.setItem('pulsefit-enquiries', JSON.stringify(existing))
    setSent(true)
  }

  const handleReset = () => {
    setForm({ name: '', email: '', subject: subjects[0], message: '' })
    setErrors({})
    setSent(false)
  }

  const inputClass = (field) =>
    `w-full rounded-xl border bg-ink-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-volt-400 ${
      errors[field] ? 'border-red-500' : 'border-white/15'
    }`

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8"
    >
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">Get in touch</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Contact us</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Questions about membership, classes or personal training? Send us a message and the team will reply within one working day.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-ink-900 p-6 sm:p-8">
            {sent ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-volt-400/15">
                  <svg className="h-8 w-8 text-volt-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-5 font-display text-2xl text-white">Message sent</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                  Thank you, {form.name.split(' ')[0]}. Your enquiry about “{form.subject.toLowerCase()}” is with the team —
                  expect a reply at {form.email} within one working day.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 rounded-full border border-white/25 px-8 py-3 text-sm font-bold text-white transition-colors hover:border-volt-400 hover:text-volt-400"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ct-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Full name
                    </label>
                    <input id="ct-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Alex Morgan" className={inputClass('name')} />
                    {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="ct-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Email
                    </label>
                    <input id="ct-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="alex@example.com" className={inputClass('email')} />
                    {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="ct-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Subject
                  </label>
                  <select id="ct-subject" name="subject" value={form.subject} onChange={handleChange} className={inputClass('subject')}>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="ct-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Message
                  </label>
                  <textarea
                    id="ct-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-volt-400 px-6 py-3.5 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-ink-900 p-6">
              <h2 className="font-display text-lg text-white">Visit the club</h2>
              <address className="mt-3 text-sm not-italic leading-relaxed text-zinc-400">
                14 Ironworks Lane<br />
                Manchester M4 6QT<br />
                United Kingdom
              </address>
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink-900 p-6">
              <h2 className="font-display text-lg text-white">Opening hours</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-zinc-400">Monday – Friday</dt><dd className="font-semibold text-white">05:30 – 23:00</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-400">Saturday</dt><dd className="font-semibold text-white">07:00 – 21:00</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-400">Sunday</dt><dd className="font-semibold text-white">08:00 – 20:00</dd></div>
              </dl>
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink-900 p-6">
              <h2 className="font-display text-lg text-white">Call or email</h2>
              <p className="mt-3 text-sm text-zinc-400">0161 496 0200</p>
              <p className="mt-1 text-sm text-zinc-400">hello@pulsefit.example.co.uk</p>
            </div>
          </div>
        </Reveal>
      </div>
    </motion.main>
  )
}
