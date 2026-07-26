import { Link } from 'react-router-dom'
import type { Lieu } from '../../types'
import { AffluenceBadge } from '../booking/AffluenceBadge'

export function VenueCard({ lieu }: { lieu: Lieu }) {
  return (
    <Link
      to={`/lieux/${lieu.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-accent/40 hover:bg-white/[0.05]"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={lieu.image}
          alt={lieu.nom}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg text-white group-hover:text-accent">{lieu.nom}</h3>
          <AffluenceBadge lieuId={lieu.id} />
        </div>
        <p className="text-xs text-white/50">
          {lieu.adresse}, {lieu.arrondissement}
        </p>
        <p className="text-sm text-white/60">{lieu.description}</p>
      </div>
    </Link>
  )
}
