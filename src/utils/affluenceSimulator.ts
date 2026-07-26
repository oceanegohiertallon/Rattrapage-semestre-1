import type { NiveauAffluence } from '../types'

function hash(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0
  }
  return h
}

export function computeAffluenceScore(lieuId: string, at: Date): number {
  const base = hash(lieuId) % 30
  const hour = at.getHours() + at.getMinutes() / 60

  const middayPeak = Math.exp(-((hour - 13) ** 2) / 8) * 45
  const eveningPeak = Math.exp(-((hour - 17) ** 2) / 6) * 35

  const score = base + middayPeak + eveningPeak
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function scoreToNiveau(score: number): NiveauAffluence {
  if (score < 35) return 'faible'
  if (score < 70) return 'moyenne'
  return 'forte'
}

export const NIVEAU_LABEL: Record<NiveauAffluence, string> = {
  faible: 'Affluence faible',
  moyenne: 'Affluence modérée',
  forte: 'Forte affluence',
}
