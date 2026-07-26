import { createContext, useContext } from 'react'
import type { Creneau, Reservation } from '../types'

export interface FestivalContextValue {
  reservations: Reservation[]
  favoris: string[]
  reserverCreneau: (creneau: Creneau, visiteur: string) => Reservation
  annulerReservation: (reservationId: string) => void
  toggleFavori: (expositionId: string) => void
  estFavori: (expositionId: string) => boolean
  placesRestantes: (creneau: Creneau) => number
}

export const FestivalContext = createContext<FestivalContextValue | null>(null)

export function useFestival(): FestivalContextValue {
  const ctx = useContext(FestivalContext)
  if (!ctx) throw new Error('useFestival must be used within a FestivalProvider')
  return ctx
}
