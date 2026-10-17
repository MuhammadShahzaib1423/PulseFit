export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'strength', label: 'Strength' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'yoga', label: 'Yoga' },
  { id: 'hiit', label: 'HIIT' },
]

export const schedule = {
  Monday: [
    { id: 'mon-1', name: 'Iron Strength', trainer: 'Marcus Hale', time: '06:30', duration: 60, intensity: 'High', category: 'strength', spots: 16 },
    { id: 'mon-2', name: 'Sunrise Spin', trainer: 'Priya Nair', time: '07:30', duration: 45, intensity: 'Moderate', category: 'cardio', spots: 24 },
    { id: 'mon-3', name: 'Lunch Express HIIT', trainer: 'Amara Okafor', time: '12:15', duration: 30, intensity: 'High', category: 'hiit', spots: 20 },
    { id: 'mon-4', name: 'Evening Vinyasa', trainer: 'Sofia Lindqvist', time: '18:00', duration: 60, intensity: 'Low', category: 'yoga', spots: 22 },
  ],
  Tuesday: [
    { id: 'tue-1', name: 'Boxing Fundamentals', trainer: 'Jake Thornton', time: '06:30', duration: 60, intensity: 'High', category: 'cardio', spots: 14 },
    { id: 'tue-2', name: 'Kettlebell Circuit', trainer: 'Tomás Silva', time: '09:30', duration: 45, intensity: 'Moderate', category: 'strength', spots: 18 },
    { id: 'tue-3', name: 'Metcon Madness', trainer: 'Amara Okafor', time: '17:30', duration: 45, intensity: 'High', category: 'hiit', spots: 20 },
    { id: 'tue-4', name: 'Deep Stretch & Mobility', trainer: 'Sofia Lindqvist', time: '20:00', duration: 45, intensity: 'Low', category: 'yoga', spots: 22 },
  ],
  Wednesday: [
    { id: 'wed-1', name: 'Deadlift Club', trainer: 'Marcus Hale', time: '06:30', duration: 60, intensity: 'High', category: 'strength', spots: 12 },
    { id: 'wed-2', name: 'Hill Climb Spin', trainer: 'Priya Nair', time: '12:15', duration: 45, intensity: 'Moderate', category: 'cardio', spots: 24 },
    { id: 'wed-3', name: 'Tabata Burn', trainer: 'Amara Okafor', time: '17:30', duration: 30, intensity: 'High', category: 'hiit', spots: 20 },
    { id: 'wed-4', name: 'Power Yoga', trainer: 'Sofia Lindqvist', time: '19:00', duration: 60, intensity: 'Moderate', category: 'yoga', spots: 22 },
  ],
  Thursday: [
    { id: 'thu-1', name: 'Fight Fit Boxing', trainer: 'Jake Thornton', time: '06:30', duration: 60, intensity: 'High', category: 'cardio', spots: 14 },
    { id: 'thu-2', name: 'Functional Foundations', trainer: 'Tomás Silva', time: '09:30', duration: 45, intensity: 'Low', category: 'strength', spots: 18 },
    { id: 'thu-3', name: 'Sprint Intervals', trainer: 'Priya Nair', time: '12:15', duration: 30, intensity: 'High', category: 'hiit', spots: 20 },
    { id: 'thu-4', name: 'Candlelit Yin', trainer: 'Sofia Lindqvist', time: '20:00', duration: 60, intensity: 'Low', category: 'yoga', spots: 22 },
  ],
  Friday: [
    { id: 'fri-1', name: 'Squat & Press', trainer: 'Marcus Hale', time: '06:30', duration: 60, intensity: 'High', category: 'strength', spots: 16 },
    { id: 'fri-2', name: 'Rhythm Ride', trainer: 'Priya Nair', time: '07:30', duration: 45, intensity: 'Moderate', category: 'cardio', spots: 24 },
    { id: 'fri-3', name: 'After-Work HIIT', trainer: 'Amara Okafor', time: '17:30', duration: 45, intensity: 'High', category: 'hiit', spots: 20 },
    { id: 'fri-4', name: 'Boxing Sparring Drills', trainer: 'Jake Thornton', time: '19:00', duration: 60, intensity: 'High', category: 'cardio', spots: 12 },
  ],
  Saturday: [
    { id: 'sat-1', name: 'Weekend Warrior WOD', trainer: 'Tomás Silva', time: '09:00', duration: 60, intensity: 'High', category: 'hiit', spots: 24 },
    { id: 'sat-2', name: 'Olympic Lifting Technique', trainer: 'Marcus Hale', time: '10:30', duration: 75, intensity: 'Moderate', category: 'strength', spots: 12 },
    { id: 'sat-3', name: 'Open Mat Boxing', trainer: 'Jake Thornton', time: '12:00', duration: 60, intensity: 'Moderate', category: 'cardio', spots: 16 },
    { id: 'sat-4', name: 'Restorative Yoga', trainer: 'Sofia Lindqvist', time: '16:00', duration: 60, intensity: 'Low', category: 'yoga', spots: 22 },
  ],
  Sunday: [
    { id: 'sun-1', name: 'Long Slow Ride', trainer: 'Priya Nair', time: '09:00', duration: 75, intensity: 'Low', category: 'cardio', spots: 24 },
    { id: 'sun-2', name: 'Full-Body Strength', trainer: 'Marcus Hale', time: '10:30', duration: 60, intensity: 'Moderate', category: 'strength', spots: 16 },
    { id: 'sun-3', name: 'Mobility & Breathwork', trainer: 'Sofia Lindqvist', time: '12:00', duration: 45, intensity: 'Low', category: 'yoga', spots: 22 },
    { id: 'sun-4', name: 'Sunday Sweat HIIT', trainer: 'Amara Okafor', time: '16:00', duration: 45, intensity: 'High', category: 'hiit', spots: 20 },
  ],
}

export function getAllClasses() {
  return days.flatMap((day) =>
    schedule[day].map((cls) => ({ ...cls, day }))
  )
}
