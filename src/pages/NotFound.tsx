import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="font-display text-6xl text-accent">404</p>
      <h1 className="font-display text-2xl text-white">Page introuvable</h1>
      <p className="text-white/50">Ce cliché n’a pas encore été développé.</p>
      <Link to="/" className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-ink">
        Retour à l’accueil
      </Link>
    </div>
  )
}
