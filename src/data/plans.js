export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Everything you need to get moving',
    monthly: 29,
    features: [
      'Full gym floor access (off-peak)',
      '2 group classes per week',
      'Locker room & showers',
      'Free induction session',
      'PulseFit app access',
    ],
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Our most popular membership',
    monthly: 49,
    features: [
      'Full gym floor access (all hours)',
      'Unlimited group classes',
      '1 personal training session / month',
      'Sauna & recovery zone',
      'Nutrition starter guide',
      'Guest passes (2 / month)',
    ],
    featured: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Train like a professional athlete',
    monthly: 79,
    features: [
      'Everything in Pro',
      '4 personal training sessions / month',
      'Personalised programme reviews',
      'Priority class booking',
      'Physio assessment discount',
      'Guest passes (4 / month)',
    ],
    featured: false,
  },
]

export function priceFor(plan, billing) {
  if (billing === 'yearly') {
    return plan.monthly * 10
  }
  return plan.monthly
}
