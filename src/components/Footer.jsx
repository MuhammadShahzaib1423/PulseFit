import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-2xl text-white">
            Pulse<span className="text-volt-400">Fit</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            An independent fitness club helping everyday people train hard and feel electric since 2016.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
            <li><Link to="/trainers" className="hover:text-volt-400">Trainers</Link></li>
            <li><Link to="/classes" className="hover:text-volt-400">Classes</Link></li>
            <li><Link to="/bmi-calculator" className="hover:text-volt-400">BMI Calculator</Link></li>
            <li><Link to="/pricing" className="hover:text-volt-400">Membership</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Club</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
            <li><Link to="/about" className="hover:text-volt-400">About us</Link></li>
            <li><Link to="/contact" className="hover:text-volt-400">Contact</Link></li>
            <li><Link to="/pricing" className="hover:text-volt-400">Join PulseFit</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Visit</h3>
          <address className="mt-4 text-sm not-italic leading-relaxed text-zinc-400">
            14 Ironworks Lane<br />
            Manchester M4 6QT<br />
            United Kingdom
          </address>
          <p className="mt-3 text-sm text-zinc-400">Open daily 05:30 – 23:00</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} PulseFit. All rights reserved.</p>
          <p>All trainer names and photography on this site are fictional.</p>
          <p>Built by <a href="https://shahzaib-portfolio-muhammad-shahzaibs-projects-16858ef3.vercel.app" className="hover:text-volt-400">Muhammad Shahzaib</a></p>
        </div>
      </div>
    </footer>
  )
}
