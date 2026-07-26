import type {
  Artiste,
  Creneau,
  EtapeParcours,
  Exposition,
  Lieu,
  Parcours,
  TagId,
} from '../types'

const TRAVEL_BUFFER_MINUTES = 20

interface BuildParcoursInput {
  expositions: Exposition[]
  lieux: Lieu[]
  artistes: Artiste[]
  creneaux: Creneau[]
  interets: TagId[]
  budgetMinutes: number
  today: string
}

function scoreExposition(exposition: Exposition, interets: TagId[]): number {
  const overlap = exposition.tags.filter((tag) => interets.includes(tag)).length
  const interestScore = interets.length === 0 ? 0 : overlap / interets.length
  return interestScore * 100 + exposition.popularite * 0.2
}

function nextAvailableCreneau(
  creneaux: Creneau[],
  expositionId: string,
  today: string,
): Creneau | null {
  const candidats = creneaux
    .filter((c) => c.expositionId === expositionId && c.date >= today && c.reserves < c.capacite)
    .sort((a, b) => (a.date + a.heure).localeCompare(b.date + b.heure))
  return candidats[0] ?? null
}

export function buildParcours({
  expositions,
  lieux,
  artistes,
  creneaux,
  interets,
  budgetMinutes,
  today,
}: BuildParcoursInput): Parcours {
  const eligible = expositions.filter((exposition) => exposition.dateFin >= today)

  const ranked = [...eligible].sort(
    (a, b) => scoreExposition(b, interets) - scoreExposition(a, interets),
  )

  const etapes: EtapeParcours[] = []
  let dureeTotale = 0

  for (const exposition of ranked) {
    const coutTemps =
      exposition.dureeMinutes + (etapes.length > 0 ? TRAVEL_BUFFER_MINUTES : 0)
    if (dureeTotale + coutTemps > budgetMinutes) continue

    const lieu = lieux.find((l) => l.id === exposition.lieuId)
    const artiste = artistes.find((a) => a.id === exposition.artisteId)
    if (!lieu || !artiste) continue

    etapes.push({
      exposition,
      lieu,
      artiste,
      creneau: nextAvailableCreneau(creneaux, exposition.id, today),
    })
    dureeTotale += coutTemps
  }

  const interetsCouverts = Array.from(
    new Set(etapes.flatMap((etape) => etape.exposition.tags.filter((t) => interets.includes(t)))),
  )

  return { etapes, dureeTotaleMinutes: dureeTotale, interetsCouverts }
}
