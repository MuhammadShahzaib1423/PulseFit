# PulseFit

A complete gym & fitness club website built as a static React single-page application.
Dark, energetic design with scroll-triggered animations, interactive tools and booking flows.

All trainer names, member stories, photography and contact details are fictional and original.

## Stack

- React 18 + Vite
- Tailwind CSS v3 (with `tailwind.config.js` + PostCSS)
- Framer Motion (animations, page transitions, modals)
- react-router-dom v6 (`BrowserRouter`)
- Plain JSX, no TypeScript

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Routes

| Route            | Page                                              |
|------------------|---------------------------------------------------|
| `/`              | Home — animated hero, stats counters, trainers preview, class highlights, testimonials, CTA |
| `/trainers`      | 6 fictional trainer profiles with booking modal   |
| `/classes`       | Weekly schedule (Mon–Sun tabs), category filters, class booking with live spot counts |
| `/bmi-calculator`| Interactive BMI calculator with animated gauge, colour-coded categories and advice |
| `/pricing`       | 3 membership plans, monthly/yearly toggle, signup modal |
| `/about`         | Club story, values, animated counters, facility gallery |
| `/contact`       | Validated enquiry form plus club info            |

## Features

- Animated count-up statistics on the home page
- Trainer session booking modal (name, email, date, session type) with validation and confirmation
- Class schedule with day tabs and strength/cardio/yoga/HIIT filters; booking decrements spots
- BMI calculator with height/weight sliders + inputs, animated needle gauge and category advice
- Membership pricing with animated monthly/yearly toggle and validated signup modal
- Scroll-reveal animations throughout (`whileInView`), smooth animated page transitions
- Fully responsive layout with animated mobile menu
- Bookings, memberships and enquiries persist to `localStorage`:
  - `pulsefit-session-bookings`
  - `pulsefit-class-bookings`
  - `pulsefit-memberships`
  - `pulsefit-enquiries`

## Images

AI-generated photorealistic fitness photography lives in `public/images/`:

- `hero.jpg` — hero background
- `trainer-*.jpg` — 6 trainer portraits
- `class-hiit.jpg`, `class-yoga.jpg`, `facility.jpg` — class and facility imagery

## Deployment

`vercel.json` includes an SPA rewrite so client-side routes resolve correctly on Vercel.
