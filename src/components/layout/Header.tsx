import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/expositions', label: 'Expositions' },
  { to: '/artistes', label: 'Artistes' },
  { to: '/lieux', label: 'Lieux' },
  { to: '/parcours', label: 'Mon parcours' },
  { to: '/mes-reservations', label: 'Mes réservations' },
]

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `text-sm tracking-wide transition hover:text-accent ${
    isActive ? 'text-accent' : 'text-white/70'
  }`
}

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/" className="font-display text-lg text-white" onClick={() => setOpen(false)}>
          Festival Photo <span className="text-accent">Paris</span>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg border border-white/15 p-2 text-white/80 md:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 md:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-white/10 text-accent' : 'text-white/70'}`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
