import { Link } from 'react-router-dom'
import { useFestival } from '../context/festivalContext'
import { ReservationSummary } from '../components/booking/ReservationSummary'
import { EmptyState } from '../components/ui/EmptyState'

export function MesReservations() {
  const { reservations, annulerReservation } = useFestival()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-white">Mes réservations</h1>
      <p className="mt-1 text-white/50">
        {reservations.length} réservation{reservations.length > 1 ? 's' : ''} enregistrée
        {reservations.length > 1 ? 's' : ''} sur cet appareil
      </p>

      <div className="mt-8">
        {reservations.length === 0 ? (
          <EmptyState
            title="Aucune réservation pour l’instant"
            description="Parcourez les expositions et réservez un créneau pour le retrouver ici."
            action={
              <Link
                to="/expositions"
                className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-ink"
              >
                Voir les expositions
              </Link>
            }
          />
        ) : (
          <div className="flex flex-col gap-4">
            {[...reservations]
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((reservation) => (
                <ReservationSummary
                  key={reservation.id}
                  reservation={reservation}
                  onCancel={annulerReservation}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
