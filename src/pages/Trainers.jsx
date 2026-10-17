import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import BookingModal from '../components/BookingModal'
import { trainers } from '../data/trainers'

export default function Trainers() {
  const [selected, setSelected] = useState(null)

  const handleBook = (trainer) => {
    setSelected(trainer)
  }

  const handleClose = () => {
    setSelected(null)
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8"
    >
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">Coaching team</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Trainers who get results</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Every PulseFit coach is fully qualified, first-aid trained and obsessed with your progress.
          Book a one-to-one session with any of them — free for members.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer, index) => (
          <Reveal key={trainer.id} delay={(index % 3) * 0.1}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={trainer.image} alt={`Portrait of ${trainer.name}`} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl text-white">{trainer.name}</h2>
                    <p className="mt-1 text-sm text-volt-400">{trainer.role}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-volt-400/15 px-3 py-1 text-xs font-bold text-volt-400">
                    {trainer.experience}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {trainer.specialities.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{trainer.bio}</p>
                <button
                  onClick={() => handleBook(trainer)}
                  className="mt-6 w-full rounded-full bg-volt-400 px-6 py-3 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.02]"
                >
                  Book session
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {selected && <BookingModal trainer={selected} onClose={handleClose} />}
    </motion.main>
  )
}
