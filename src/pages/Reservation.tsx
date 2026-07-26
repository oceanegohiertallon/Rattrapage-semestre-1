import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useCreneau } from '../hooks/useCreneaux'
import { useExposition } from '../hooks/useExpositions'
import { useLieu } from '../hooks/useLieux'
import { useFestival } from '../context/festivalContext'
import { Loader } from '../components/ui/Loader'
import { formatDateLong } from '../utils/dateFormat'

export function Reservation() {
  const { creneauId } = useParams<{ creneauId: string }>()
  const { creneau, loading: loadingCreneau } = useCreneau(creneauId)
  const { exposition, loading: loadingExposition } = useExposition(creneau?.expositionId)
  const { lieu } = useLieu(exposition?.lieuId)
  const { reservations } = useFestival()

  const reservation = useMemo(
    () =>
      [...reservations]
        .filter((r) => r.creneauId === creneauId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null,
    [reservations, creneauId],
  )

  if (loadingCreneau || loadingExposition) return <Loader label="Confirmation en cours…" />

  if (!creneau || !exposition) {
    return <Navigate to="/expositions" replace />
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl text-emerald-400">
        ✓
      </div>
      <h1 className="mt-5 font-display text-3xl text-white">Réservation confirmée</h1>
      <p className="mt-2 text-white/60">
        {exposition.titre} · {lieu?.nom}
        <br />
        <span className="capitalize">{formatDateLong(creneau.date)}</span> à {creneau.heure}
      </p>

      {reservation && (
        <p className="mt-4 text-sm text-white/40">
          Référence <span className="text-white/70">{reservation.id.replace('res-', '')}</span> · au nom de{' '}
          {reservation.visiteur}
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/mes-reservations"
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-accent-dark"
        >
          Voir mes réservations
        </Link>
        <Link
          to="/expositions"
          className="rounded-xl border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:border-white/30"
        >
          Continuer à explorer
        </Link>
      </div>
    </div>
  )
}
