import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sessionTypes = ['Strength', 'HIIT', 'Yoga & Mobility', 'Boxing', 'Nutrition Consult']

export default function BookingModal({ trainer, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', date: '', sessionType: sessionTypes[0] })
  const [errors, setErrors] = useState({})
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

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
    if (!form.date) {
      next.date = 'Please choose a date.'
    } else {
      const chosen = new Date(form.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (chosen < today) {
        next.date = 'The date cannot be in the past.'
      }
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) {
      return
    }
    const booking = {
      trainerId: trainer.id,
      trainerName: trainer.name,
      ...form,
      createdAt: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('pulsefit-session-bookings') || '[]')
    existing.push(booking)
    localStorage.setItem('pulsefit-session-bookings', JSON.stringify(existing))
    setConfirmed(true)
  }

  const inputClass = (field) =>
    `w-full rounded-xl border bg-ink-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-volt-400 ${
      errors[field] ? 'border-red-500' : 'border-white/15'
    }`

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 24, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          onClick={(event) => event.stopPropagation()}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-ink-900 p-6 shadow-2xl sm:p-8"
        >
          {confirmed ? (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-volt-400/15">
                <svg className="h-8 w-8 text-volt-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-5 font-display text-2xl text-white">Session booked</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Thank you, {form.name.split(' ')[0]}. Your {form.sessionType.toLowerCase()} session with {trainer.name} on{' '}
                {new Date(`${form.date}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}{' '}
                is confirmed. We have emailed the details to {form.email}.
              </p>
              <button
                onClick={onClose}
                className="mt-6 w-full rounded-full bg-volt-400 px-6 py-3 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-2xl text-white">Book a session</h2>
                  <p className="mt-1 text-sm text-zinc-400">with {trainer.name} · {trainer.role}</p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close booking form"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-400 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <div>
                  <label htmlFor="bk-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Full name
                  </label>
                  <input id="bk-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Alex Morgan" className={inputClass('name')} />
                  {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="bk-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Email
                  </label>
                  <input id="bk-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="alex@example.com" className={inputClass('email')} />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bk-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Preferred date
                    </label>
                    <input id="bk-date" name="date" type="date" value={form.date} onChange={handleChange} className={inputClass('date')} />
                    {errors.date && <p className="mt-1.5 text-xs text-red-400">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="bk-type" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Session type
                    </label>
                    <select id="bk-type" name="sessionType" value={form.sessionType} onChange={handleChange} className={inputClass('sessionType')}>
                      {sessionTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-volt-400 px-6 py-3.5 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
                >
                  Confirm booking
                </button>
                <p className="text-center text-xs text-zinc-500">Free for members · £25 for guests</p>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
