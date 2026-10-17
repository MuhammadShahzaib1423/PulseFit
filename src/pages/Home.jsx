import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import { trainers } from '../data/trainers'
import { testimonials } from '../data/testimonials'

const highlights = [
  { image: '/images/class-hiit.jpg', title: 'HIIT & Conditioning', text: 'Short, brutal and brilliantly effective interval sessions.' },
  { image: '/images/class-yoga.jpg', title: 'Yoga & Mobility', text: 'Recover properly with guided flow and deep-stretch classes.' },
  { image: '/images/facility.jpg', title: 'Strength Floor', text: 'Two floors of racks, platforms and premium kit, open 05:30–23:00.' },
]

const stats = [
  { value: 2400, suffix: '+', label: 'Active members' },
  { value: 28, suffix: '', label: 'Expert trainers' },
  { value: 120, suffix: '+', label: 'Classes every week' },
]

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero.jpg" alt="Athletes training in the PulseFit gym" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-ink-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-2xl"
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="mb-5 inline-block rounded-full border border-volt-400/40 bg-volt-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-volt-400"
            >
              Manchester's independent fitness club
            </motion.p>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            >
              Train hard.<br />
              Feel <span className="text-volt-400">electric.</span>
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300"
            >
              World-class coaches, 120+ weekly classes and a strength floor that never sleeps.
              Whatever your starting point, PulseFit builds the programme around you.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/classes"
                className="rounded-full bg-volt-400 px-8 py-4 text-sm font-bold text-ink-950 transition-transform hover:scale-105"
              >
                Explore classes
              </Link>
              <Link
                to="/pricing"
                className="rounded-full border border-white/25 px-8 py-4 text-sm font-bold text-white transition-colors hover:border-volt-400 hover:text-volt-400"
              >
                View memberships
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/15 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-volt-400 sm:text-4xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured trainers */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">Coaching team</p>
              <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">Meet your trainers</h2>
            </div>
            <Link to="/trainers" className="text-sm font-semibold text-volt-400 hover:underline">
              View all trainers
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.slice(0, 3).map((trainer, index) => (
            <Reveal key={trainer.id} delay={index * 0.1}>
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={`Portrait of ${trainer.name}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-white">{trainer.name}</h3>
                  <p className="mt-1 text-sm text-volt-400">{trainer.role}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {trainer.specialities.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Class highlights */}
      <section className="bg-ink-900/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">What we do</p>
            <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">Training for every goal</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {highlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl">
                  <img src={item.image} alt={item.title} className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="font-display text-xl text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-zinc-300">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              to="/classes"
              className="inline-block rounded-full bg-volt-400 px-8 py-4 text-sm font-bold text-ink-950 transition-transform hover:scale-105"
            >
              See the full schedule
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">Member stories</p>
          <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">Real people, real results</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900 p-6">
                <div className="flex gap-1 text-volt-400" aria-label="Five star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">“{item.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-white">{item.name}</p>
                  <p className="text-xs text-zinc-500">{item.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-volt-400 px-6 py-14 text-center sm:px-12">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-ink-950/10 blur-2xl" />
            <h2 className="relative font-display text-3xl text-ink-950 sm:text-4xl">Your first week is on us</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm font-medium text-ink-900/80 sm:text-base">
              Join any plan today and get seven days of full access — every class, the whole gym floor and a personal induction.
            </p>
            <Link
              to="/pricing"
              className="relative mt-8 inline-block rounded-full bg-ink-950 px-10 py-4 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              Claim your free week
            </Link>
          </div>
        </Reveal>
      </section>
    </motion.main>
  )
}
