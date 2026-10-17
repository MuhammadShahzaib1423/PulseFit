import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal'
import PlanModal from '../components/PlanModal'
import { plans, priceFor } from '../data/plans'

export default function Pricing() {
  const [billing, setBilling] = useState('monthly')
  const [selected, setSelected] = useState(null)

  const handleChoose = (plan) => {
    setSelected(plan)
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
      <Reveal className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">Membership</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Simple, honest pricing</h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          No joining fee, no lock-in contracts, cancel anytime. Pay yearly and get two months free.
        </p>
      </Reveal>

      <Reveal className="mt-8 flex justify-center">
        <div className="inline-flex rounded-full border border-white/15 bg-ink-900 p-1.5">
          {['monthly', 'yearly'].map((option) => (
            <button
              key={option}
              onClick={() => setBilling(option)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-bold capitalize transition-colors ${
                billing === option ? 'text-ink-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {billing === option && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-full bg-volt-400"
                  transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                />
              )}
              <span className="relative">
                {option}
                {option === 'yearly' && (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${billing === 'yearly' ? 'bg-ink-950/15 text-ink-950' : 'bg-volt-400/20 text-volt-400'}`}>
                    -17%
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 0.1} className="h-full">
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                plan.featured
                  ? 'border-volt-400 bg-ink-900 shadow-[0_0_50px_rgba(212,245,66,0.12)]'
                  : 'border-white/10 bg-ink-900'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-volt-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink-950">
                  Most popular
                </span>
              )}
              <h2 className="font-display text-2xl text-white">{plan.name}</h2>
              <p className="mt-1 text-sm text-zinc-400">{plan.tagline}</p>
              <div className="mt-6 flex h-20 items-end gap-1.5">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${plan.id}-${billing}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-5xl text-white"
                  >
                    £{priceFor(plan, billing)}
                  </motion.span>
                </AnimatePresence>
                <span className="pb-1.5 text-sm text-zinc-500">
                  / {billing === 'yearly' ? 'year' : 'month'}
                </span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-volt-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleChoose(plan)}
                className={`mt-8 w-full rounded-full px-6 py-3.5 text-sm font-bold transition-transform hover:scale-[1.02] ${
                  plan.featured
                    ? 'bg-volt-400 text-ink-950'
                    : 'border border-white/25 text-white hover:border-volt-400 hover:text-volt-400'
                }`}
              >
                Choose {plan.name}
              </button>
            </motion.article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <p className="text-center text-sm text-zinc-500">
          All plans include a free induction, app access and a 14-day money-back guarantee.
          Students and NHS staff save 10% — ask at reception.
        </p>
      </Reveal>

      {selected && <PlanModal plan={selected} billing={billing} onClose={handleClose} />}
    </motion.main>
  )
}
