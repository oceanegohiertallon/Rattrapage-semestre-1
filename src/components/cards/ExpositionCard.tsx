import { Link } from 'react-router-dom'
import type { Artiste, Exposition, Lieu } from '../../types'
import { tagLabel } from '../../data/tags'
import { formatDuration } from '../../utils/dateFormat'
import { useFestival } from '../../context/festivalContext'
import { Badge } from '../ui/Badge'

interface ExpositionCardProps {
  exposition: Exposition
  artiste?: Artiste | null
  lieu?: Lieu | null
}

export function ExpositionCard({ exposition, artiste, lieu }: ExpositionCardProps) {
  const { estFavori, toggleFavori } = useFestival()
  const favori = estFavori(exposition.id)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-accent/40 hover:bg-white/[0.05]">
      <Link to={`/expositions/${exposition.id}`} className="block">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={exposition.image}
            alt={exposition.titre}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavori(exposition.id)}
        aria-pressed={favori}
        aria-label={favori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition ${
          favori ? 'bg-accent text-ink' : 'bg-black/40 text-white hover:bg-black/60'
        }`}
      >
        {favori ? '★' : '☆'}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {exposition.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} tone="accent">
              {tagLabel(tag)}
            </Badge>
          ))}
        </div>

        <Link to={`/expositions/${exposition.id}`}>
          <h3 className="font-display text-lg text-white transition group-hover:text-accent">
            {exposition.titre}
          </h3>
        </Link>

        {artiste && (
          <Link
            to={`/artistes/${artiste.id}`}
            className="text-sm text-white/60 hover:text-white"
          >
            {artiste.nom}
          </Link>
        )}

        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-white/50">
          {lieu && <span>{lieu.nom}</span>}
          <span>{formatDuration(exposition.dureeMinutes)}</span>
        </div>
      </div>
    </article>
  )
}
