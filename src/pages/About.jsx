import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'

const values = [
  {
    title: 'Coaching first',
    text: 'Machines do not change lives — coaches do. Every member gets real guidance from qualified trainers, not just a key fob.',
  },
  {
    title: 'No egos',
    text: 'Beginners and competitors train side by side here. We keep the atmosphere supportive, the music loud and the judgement at zero.',
  },
  {
    title: 'Honest pricing',
    text: 'No joining fees, no 12-month traps, no small print. If we would not sign it ourselves, we do not ask you to.',
  },
  {
    title: 'Always improving',
    text: 'New kit, new classes and coach development every quarter. Standing still is the one thing we refuse to do.',
  },
]

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
    >
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">Our story</p>
            <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Built by lifters, for everyone</h1>
            <p className="mt-6 leading-relaxed text-zinc-400">
              PulseFit opened in 2016 in a converted Manchester ironworks with second-hand racks and a
              simple idea: a gym where the coaching matters more than the mirrors. Ten years on we have
              grown into one of the city's best-loved independent clubs — but the idea has not changed.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Today our 28 coaches run more than 120 classes a week across strength, cardio, yoga and
              HIIT, alongside personal training, nutrition support and a recovery zone with sauna and
              mobility space. Members range from first-timers to national champions, and that mix is
              exactly what makes the place electric.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="font-display text-3xl text-volt-400"><Counter to={10} suffix="" /></p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">Years open</p>
              </div>
              <div>
                <p className="font-display text-3xl text-volt-400"><Counter to={2400} suffix="+" /></p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">Members</p>
              </div>
              <div>
                <p className="font-display text-3xl text-volt-400"><Counter to={96} suffix="%" /></p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">Would recommend us</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-3xl">
              <img src="/images/facility.jpg" alt="The PulseFit strength floor" className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-900/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">What we stand for</p>
            <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">Our values</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink-950 p-6">
                  <p className="font-display text-4xl text-volt-400/40">0{index + 1}</p>
                  <h3 className="mt-3 font-display text-lg text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">The club</p>
          <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">Take a look inside</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <img src="/images/class-hiit.jpg" alt="Members training in a HIIT class" className="aspect-video w-full rounded-2xl object-cover" />
          </Reveal>
          <Reveal delay={0.1}>
            <img src="/images/class-yoga.jpg" alt="A calm yoga session at PulseFit" className="aspect-video w-full rounded-2xl object-cover" />
          </Reveal>
        </div>
        <Reveal className="mt-12 text-center">
          <p className="mx-auto max-w-xl text-zinc-400">Come and see it for yourself — your first week of full access is free.</p>
          <Link
            to="/pricing"
            className="mt-6 inline-block rounded-full bg-volt-400 px-10 py-4 text-sm font-bold text-ink-950 transition-transform hover:scale-105"
          >
            Start your free week
          </Link>
        </Reveal>
      </section>
    </motion.main>
  )
}
