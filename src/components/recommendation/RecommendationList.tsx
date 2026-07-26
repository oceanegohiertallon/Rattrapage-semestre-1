import { Link } from 'react-router-dom'
import type { Parcours } from '../../types'
import { formatDateLong, formatDuration } from '../../utils/dateFormat'

export function RecommendationList({ parcours }: { parcours: Parcours }) {
  return (
    <ol className="flex flex-col gap-4">
      {parcours.etapes.map((etape, index) => (
        <li
          key={etape.exposition.id}
          className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
        >
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent/20 font-display text-accent">
            {index + 1}
          </span>

          <img
            src={etape.exposition.image}
            alt={etape.exposition.titre}
            loading="lazy"
            className="h-20 w-24 flex-none rounded-lg object-cover"
          />

          <div className="flex flex-1 flex-col gap-1">
            <Link
              to={`/expositions/${etape.exposition.id}`}
              className="font-display text-base text-white hover:text-accent"
            >
              {etape.exposition.titre}
            </Link>
            <p className="text-sm text-white/60">
              {etape.artiste.nom} · {etape.lieu.nom}
            </p>
            <p className="text-xs text-white/40">
              {formatDuration(etape.exposition.dureeMinutes)}
              {etape.creneau && (
                <>
                  {' · prochain créneau : '}
                  <span className="capitalize">{formatDateLong(etape.creneau.date)}</span> à{' '}
                  {etape.creneau.heure}
                </>
              )}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
