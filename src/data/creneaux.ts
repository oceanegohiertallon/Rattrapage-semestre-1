import type { Creneau } from '../types'
import { EXPOSITIONS } from './expositions'
import { todayISO } from '../utils/dateFormat'

const HEURES = ['10:00', '12:00', '14:00', '16:00', '18:00']

function hash(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0
  }
  return h
}

function addDays(iso: string, days: number): string {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(year, month - 1, day + days)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function generateCreneaux(): Creneau[] {
  const creneaux: Creneau[] = []
  const today = todayISO()

  for (const exposition of EXPOSITIONS) {
    for (let dayOffset = 0; dayOffset < 10; dayOffset += 1) {
      const date = addDays(today, dayOffset)
      if (date < exposition.dateDebut) continue
      if (date > exposition.dateFin) break

      for (const heure of HEURES) {
        const seed = hash(`${exposition.id}-${date}-${heure}`)
        const capacite = 20 + (seed % 4) * 5
        const reserves = Math.min(capacite, seed % (capacite + 1))

        creneaux.push({
          id: `${exposition.id}-${date}-${heure}`,
          expositionId: exposition.id,
          date,
          heure,
          capacite,
          reserves,
        })
      }
    }
  }

  return creneaux
}

export const CRENEAUX: Creneau[] = generateCreneaux()
