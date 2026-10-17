import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { priceFor } from '../data/plans'

export default function PlanModal({ plan, billing, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
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
    if (!/^[\d\s()+]{7,}$/.test(form.phone.trim())) {
      next.phone = 'Please enter a valid phone number.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) {
      return
    }
    const signup = {
      planId: plan.id,
      planName: plan.name,
      billing,
      price: priceFor(plan, billing),
      ...form,
      createdAt: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('pulsefit-memberships') || '[]')
    existing.push(signup)
    localStorage.setItem('pulsefit-memberships', JSON.stringify(existing))
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
              <h2 className="mt-5 font-display text-2xl text-white">Welcome to PulseFit</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Thank you, {form.name.split(' ')[0]}. Your {plan.name} membership ({billing === 'yearly' ? 'billed yearly' : 'billed monthly'}) is
                registered. Check your inbox at {form.email} to activate your membership and book your induction.
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
                  <h2 className="font-display text-2xl text-white">Choose {plan.name}</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    £{priceFor(plan, billing)} {billing === 'yearly' ? 'per year' : 'per month'} · no joining fee
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close signup form"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-400 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <div>
                  <label htmlFor="pl-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Full name
                  </label>
                  <input id="pl-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Alex Morgan" className={inputClass('name')} />
                  {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="pl-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Email
                  </label>
                  <input id="pl-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="alex@example.com" className={inputClass('email')} />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="pl-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Phone
                  </label>
                  <input id="pl-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="07700 900123" className={inputClass('phone')} />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-volt-400 px-6 py-3.5 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
                >
                  Start my membership
                </button>
                <p className="text-center text-xs text-zinc-500">Cancel anytime · 14-day money-back guarantee</p>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
