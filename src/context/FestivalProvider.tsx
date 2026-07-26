import { useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { FestivalContext, type FestivalContextValue } from './festivalContext'
import type { Creneau, Reservation } from '../types'

const RESERVATIONS_KEY = 'festival:reservations'
const FAVORIS_KEY = 'festival:favoris'

export function FestivalProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useLocalStorage<Reservation[]>(RESERVATIONS_KEY, [])
  const [favoris, setFavoris] = useLocalStorage<string[]>(FAVORIS_KEY, [])

  const value = useMemo<FestivalContextValue>(() => {
    const reserverCreneau = (creneau: Creneau, visiteur: string): Reservation => {
      const reference = Math.random().toString(36).slice(2, 8).toUpperCase()
      const reservation: Reservation = {
        id: `res-${reference}`,
        creneauId: creneau.id,
        expositionId: creneau.expositionId,
        visiteur,
        createdAt: new Date().toISOString(),
      }
      setReservations((prev) => [...prev, reservation])
      return reservation
    }

    const annulerReservation = (reservationId: string) => {
      setReservations((prev) => prev.filter((r) => r.id !== reservationId))
    }

    const toggleFavori = (expositionId: string) => {
      setFavoris((prev) =>
        prev.includes(expositionId)
          ? prev.filter((id) => id !== expositionId)
          : [...prev, expositionId],
      )
    }

    const estFavori = (expositionId: string) => favoris.includes(expositionId)

    const placesRestantes = (creneau: Creneau) => {
      const reservesLocalement = reservations.filter((r) => r.creneauId === creneau.id).length
      return Math.max(0, creneau.capacite - creneau.reserves - reservesLocalement)
    }

    return {
      reservations,
      favoris,
      reserverCreneau,
      annulerReservation,
      toggleFavori,
      estFavori,
      placesRestantes,
    }
  }, [reservations, favoris, setReservations, setFavoris])

  return <FestivalContext.Provider value={value}>{children}</FestivalContext.Provider>
}
