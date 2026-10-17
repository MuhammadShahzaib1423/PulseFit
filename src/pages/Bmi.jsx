import { useEffect, useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'
import Reveal from '../components/Reveal'

function categoryFor(bmi) {
  if (bmi < 18.5) {
    return {
      label: 'Underweight',
      colour: 'text-sky-400',
      bar: 'bg-sky-400',
      advice:
        'Your BMI is below the healthy range. Focus on strength training and a calorie-surplus eating plan built around whole foods. A PulseFit coach can design a personalised programme — consider booking a nutrition consult.',
    }
  }
  if (bmi < 25) {
    return {
      label: 'Healthy weight',
      colour: 'text-volt-400',
      bar: 'bg-volt-400',
      advice:
        'Great work — your BMI sits in the healthy range. Keep it there with a balanced mix of strength, cardio and mobility training, plus consistent sleep and hydration.',
    }
  }
  if (bmi < 30) {
    return {
      label: 'Overweight',
      colour: 'text-amber-400',
      bar: 'bg-amber-400',
      advice:
        'Your BMI is above the healthy range. A combination of regular cardio, full-body strength work and mindful eating makes a real difference. Our HIIT and spin classes are a brilliant place to start.',
    }
  }
  return {
    label: 'Obese',
    colour: 'text-red-400',
    bar: 'bg-red-400',
    advice:
      'Your BMI is well above the healthy range. Start gently — low-impact cardio, guided strength sessions and professional advice. Speak to one of our coaches for a personalised, judgment-free plan.',
  }
}

const MIN = 12
const MAX = 42

export default function Bmi() {
  const [height, setHeight] = useState(178)
  const [weight, setWeight] = useState(75)
  const bmi = weight / ((height / 100) ** 2)

  const [displayBmi, setDisplayBmi] = useState(bmi)
  const prevRef = useRef(bmi)

  useEffect(() => {
    const from = prevRef.current
    const controls = animate(from, bmi, {
      duration: 0.4,
      ease: 'easeOut',
      onUpdate: (v) => {
        setDisplayBmi(v)
      },
      onComplete: () => {
        prevRef.current = bmi
      },
    })
    return () => {
      controls.stop()
    }
  }, [bmi])

  const category = categoryFor(bmi)
  const clamped = Math.min(MAX, Math.max(MIN, bmi))
  const rotation = -90 + ((clamped - MIN) / (MAX - MIN)) * 180

  const handleHeightInput = (event) => {
    const value = Number(event.target.value)
    if (!Number.isNaN(value)) {
      setHeight(Math.min(220, Math.max(130, value)))
    }
  }

  const handleWeightInput = (event) => {
    const value = Number(event.target.value)
    if (!Number.isNaN(value)) {
      setWeight(Math.min(180, Math.max(35, value)))
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8"
    >
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-400">Health tools</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">BMI Calculator</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Drag the sliders or type your measurements to see your Body Mass Index.
          It is a rough guide, not a diagnosis — muscle mass and build affect the reading.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-ink-900 p-6 sm:p-8">
            <div className="space-y-8">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label htmlFor="bmi-height" className="text-sm font-semibold text-white">Height</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={height}
                      onChange={handleHeightInput}
                      min={130}
                      max={220}
                      aria-label="Height in centimetres"
                      className="w-20 rounded-lg border border-white/15 bg-ink-800 px-2 py-1.5 text-center text-sm font-bold text-volt-400 outline-none focus:border-volt-400"
                    />
                    <span className="text-xs text-zinc-500">cm</span>
                  </div>
                </div>
                <input
                  id="bmi-height"
                  type="range"
                  min={130}
                  max={220}
                  value={height}
                  onChange={(event) => setHeight(Number(event.target.value))}
                  className="w-full"
                />
                <div className="mt-1 flex justify-between text-xs text-zinc-500">
                  <span>130 cm</span>
                  <span>220 cm</span>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label htmlFor="bmi-weight" className="text-sm font-semibold text-white">Weight</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={weight}
                      onChange={handleWeightInput}
                      min={35}
                      max={180}
                      aria-label="Weight in kilograms"
                      className="w-20 rounded-lg border border-white/15 bg-ink-800 px-2 py-1.5 text-center text-sm font-bold text-volt-400 outline-none focus:border-volt-400"
                    />
                    <span className="text-xs text-zinc-500">kg</span>
                  </div>
                </div>
                <input
                  id="bmi-weight"
                  type="range"
                  min={35}
                  max={180}
                  value={weight}
                  onChange={(event) => setWeight(Number(event.target.value))}
                  className="w-full"
                />
                <div className="mt-1 flex justify-between text-xs text-zinc-500">
                  <span>35 kg</span>
                  <span>180 kg</span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-ink-800 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Your BMI</p>
              <p className="mt-1 font-display text-5xl text-white">{displayBmi.toFixed(1)}</p>
              <p className={`mt-2 text-lg font-bold ${category.colour}`}>{category.label}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900 p-6 sm:p-8">
            <svg viewBox="0 0 200 120" className="w-full" role="img" aria-label={`BMI gauge showing ${bmi.toFixed(1)}`}>
              <path d="M 20 105 A 80 80 0 0 1 180 105" fill="none" stroke="#27272a" strokeWidth="14" strokeLinecap="round" />
              <line
                x1="100"
                y1="105"
                x2="100"
                y2="42"
                stroke="#fafafa"
                strokeWidth="5"
                strokeLinecap="round"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: '100px 105px',
                  transformBox: 'view-box',
                  transition: 'transform 0.7s cubic-bezier(0.34, 1.2, 0.64, 1)',
                }}
              />
              <circle cx="100" cy="105" r="9" fill="#d4f542" />
              <text x="20" y="118" fill="#71717a" fontSize="9">12</text>
              <text x="92" y="118" fill="#71717a" fontSize="9">27</text>
              <text x="168" y="118" fill="#71717a" fontSize="9">42</text>
            </svg>

            <div className="mt-4 flex h-3 overflow-hidden rounded-full">
              <div className="bg-sky-400" style={{ width: '21.7%' }} title="Underweight" />
              <div className="bg-volt-400" style={{ width: '21.7%' }} title="Healthy" />
              <div className="bg-amber-400" style={{ width: '16.6%' }} title="Overweight" />
              <div className="bg-red-400" style={{ width: '40%' }} title="Obese" />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-zinc-500">
              <span>&lt; 18.5</span>
              <span>18.5 – 24.9</span>
              <span>25 – 29.9</span>
              <span>30 +</span>
            </div>

            <div className={`mt-6 rounded-xl border-l-4 ${category.bar.replace('bg-', 'border-')} bg-ink-800 p-5`}>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">What this means</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{category.advice}</p>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-zinc-600">
              BMI does not distinguish between muscle and fat, so very muscular people may read high.
              For a complete picture, book a body-composition assessment with a PulseFit coach.
            </p>
          </div>
        </Reveal>
      </div>
    </motion.main>
  )
}
