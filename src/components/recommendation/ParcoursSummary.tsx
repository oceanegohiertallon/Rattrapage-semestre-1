import type { Parcours } from '../../types'
import { tagLabel } from '../../data/tags'
import { formatDuration } from '../../utils/dateFormat'
import { Badge } from '../ui/Badge'

export function ParcoursSummary({ parcours }: { parcours: Parcours }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-lg text-white">
          {parcours.etapes.length} étape{parcours.etapes.length > 1 ? 's' : ''} · {formatDuration(parcours.dureeTotaleMinutes)}
        </p>
      </div>
      {parcours.interetsCouverts.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {parcours.interetsCouverts.map((tag) => (
            <Badge key={tag} tone="accent">
              {tagLabel(tag)}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
