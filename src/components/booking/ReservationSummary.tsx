import { Link } from 'react-router-dom'
import type { Reservation } from '../../types'
import { useExposition } from '../../hooks/useExpositions'
import { useCreneau } from '../../hooks/useCreneaux'
import { useLieu } from '../../hooks/useLieux'
import { formatDateLong } from '../../utils/dateFormat'

interface ReservationSummaryProps {
  reservation: Reservation
  onCancel?: (reservationId: string) => void
}

export function ReservationSummary({ reservation, onCancel }: ReservationSummaryProps) {
  const { exposition } = useExposition(reservation.expositionId)
  const { creneau } = useCreneau(reservation.creneauId)
  const { lieu } = useLieu(exposition?.lieuId)

  if (!exposition || !creneau) return null

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-accent">Réf. {reservation.id.replace('res-', '')}</p>
        <Link to={`/expositions/${exposition.id}`} className="font-display text-lg text-white hover:text-accent">
          {exposition.titre}
        </Link>
        <p className="text-sm text-white/60">
          {lieu?.nom} · <span className="capitalize">{formatDateLong(creneau.date)}</span> à {creneau.heure}
        </p>
        <p className="text-xs text-white/40">Réservé pour {reservation.visiteur}</p>
      </div>

      {onCancel && (
        <button
          type="button"
          onClick={() => onCancel(reservation.id)}
          className="self-start rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/70 transition hover:border-rose-400/50 hover:text-rose-400 sm:self-center"
        >
          Annuler
        </button>
      )}
    </div>
  )
}
