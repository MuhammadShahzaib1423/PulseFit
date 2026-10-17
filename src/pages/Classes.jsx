import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal'
import { days, categories, schedule } from '../data/classes'

const STORAGE_KEY = 'pulsefit-class-bookings'

function loadBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function todayName() {
  return days[(new Date().getDay() + 6) % 7]
}

const intensityStyles = {
  Low: 'bg-volt-400/15 text-volt-400',
  Moderate: 'bg-amber-400/15 text-amber-300',
  High: 'bg-red-400/15 text-red-400',
}

export default function Classes() {
  const [day, setDay] = useState(() => todayName())
  const [category, setCategory] = useState('all')
  const [bookings, setBookings] = useState(() => loadBookings())
  const [justBooked, setJustBooked] = useState(null)

  const handleBook = (cls) => {
    setBookings((prev) => {
      const next = { ...prev, [cls.id]: (prev[cls.id] || 0) + 1 }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
    setJustBooked(cls.id)
    window.setTimeout(() => {
      setJustBooked((current) => (current === cls.id ? null : current))
    }, 2200)
  }

  const spotsLeft = (cls) => cls.spots - (bookings[cls.id] || 0)

  const visible = schedule[day].filter(
    (cls) => category === 'all' || cls.category === category
  )

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8"
    >
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">Timetable</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Weekly class schedule</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Over 120 coach-led sessions every week. Pick a day, filter by style, and reserve your spot —
          bookings are saved to your device instantly.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Days of the week">
          {days.map((name) => (
            <button
              key={name}
              role="tab"
              aria-selected={day === name}
              onClick={() => setDay(name)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                day === name
                  ? 'bg-volt-400 text-ink-950'
                  : 'border border-white/15 text-zinc-300 hover:border-volt-400/60 hover:text-white'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                category === cat.id
                  ? 'bg-white text-ink-950'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((cls) => {
            const left = spotsLeft(cls)
            const full = left <= 0
            return (
              <motion.article
                layout
                key={`${day}-${cls.id}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-ink-900 p-6 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${intensityStyles[cls.intensity]}`}>
                      {cls.intensity} intensity
                    </span>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium capitalize text-zinc-300">
                      {cls.category}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-xl text-white">{cls.name}</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    with {cls.trainer} · {cls.duration} min
                  </p>
                  <p className="mt-2 font-display text-2xl text-volt-400">
                    {cls.time}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                  <p className={`text-xs font-semibold ${full ? 'text-red-400' : 'text-zinc-400'}`}>
                    {full ? 'Class full' : `${left} of ${cls.spots} spots left`}
                  </p>
                  <button
                    onClick={() => handleBook(cls)}
                    disabled={full}
                    className={`rounded-full px-6 py-2.5 text-sm font-bold transition-transform ${
                      full
                        ? 'cursor-not-allowed bg-white/10 text-zinc-500'
                        : justBooked === cls.id
                          ? 'bg-white text-ink-950'
                          : 'bg-volt-400 text-ink-950 hover:scale-105'
                    }`}
                  >
                    {full ? 'Sold out' : justBooked === cls.id ? 'Booked' : 'Book'}
                  </button>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-10 rounded-2xl border border-white/10 bg-ink-900 p-8 text-center text-sm text-zinc-400">
          No classes in this category on {day}. Try another day or category.
        </p>
      )}
    </motion.main>
  )
}
