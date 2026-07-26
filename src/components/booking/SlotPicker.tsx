import { useMemo } from 'react'
import type { Creneau } from '../../types'
import { formatDateLong } from '../../utils/dateFormat'
import { useFestival } from '../../context/festivalContext'

interface SlotPickerProps {
  creneaux: Creneau[]
  selectedId?: string
  onSelect: (creneau: Creneau) => void
}

export function SlotPicker({ creneaux, selectedId, onSelect }: SlotPickerProps) {
  const { placesRestantes } = useFestival()

  const parDate = useMemo(() => {
    const groupes = new Map<string, Creneau[]>()
    for (const creneau of creneaux) {
      const liste = groupes.get(creneau.date) ?? []
      liste.push(creneau)
      groupes.set(creneau.date, liste)
    }
    return Array.from(groupes.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [creneaux])

  if (creneaux.length === 0) {
    return <p className="text-sm text-white/50">Aucun créneau disponible pour cette exposition.</p>
  }

  return (
    <div className="flex flex-col gap-5">
      {parDate.map(([date, slots]) => (
        <div key={date}>
          <p className="mb-2 text-sm font-medium capitalize text-white/70">{formatDateLong(date)}</p>
          <div className="flex flex-wrap gap-2">
            {slots.map((creneau) => {
              const restantes = placesRestantes(creneau)
              const complet = restantes === 0
              const selected = creneau.id === selectedId

              return (
                <button
                  key={creneau.id}
                  type="button"
                  disabled={complet}
                  onClick={() => onSelect(creneau)}
                  className={`flex flex-col items-center rounded-xl border px-3.5 py-2 text-sm transition ${
                    complet
                      ? 'cursor-not-allowed border-white/5 text-white/25 line-through'
                      : selected
                        ? 'border-accent bg-accent text-ink'
                        : 'border-white/15 text-white/80 hover:border-accent/50'
                  }`}
                >
                  <span className="font-medium">{creneau.heure}</span>
                  <span className={`text-[11px] ${selected ? 'text-ink/70' : 'text-white/40'}`}>
                    {complet ? 'Complet' : `${restantes} places`}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
