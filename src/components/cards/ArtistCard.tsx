import { Link } from 'react-router-dom'
import type { Artiste } from '../../types'
import { tagLabel } from '../../data/tags'
import { Badge } from '../ui/Badge'

export function ArtistCard({ artiste }: { artiste: Artiste }) {
  return (
    <Link
      to={`/artistes/${artiste.id}`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center transition hover:border-accent/40 hover:bg-white/[0.05]"
    >
      <img
        src={artiste.photo}
        alt={artiste.nom}
        loading="lazy"
        className="h-24 w-24 rounded-full object-cover ring-2 ring-white/10 transition group-hover:ring-accent/50"
      />
      <div>
        <h3 className="font-display text-base text-white group-hover:text-accent">{artiste.nom}</h3>
        <p className="text-xs text-white/50">{artiste.pays}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {artiste.tags.map((tag) => (
          <Badge key={tag}>{tagLabel(tag)}</Badge>
        ))}
      </div>
    </Link>
  )
}
