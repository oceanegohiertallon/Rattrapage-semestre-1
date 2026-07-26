import { useEffect, useState } from 'react'
import { computeAffluenceScore, scoreToNiveau } from '../utils/affluenceSimulator'
import type { NiveauAffluence } from '../types'

const REFRESH_MS = 30_000

export function useAffluence(lieuId: string): NiveauAffluence {
  const [niveau, setNiveau] = useState<NiveauAffluence>(() =>
    scoreToNiveau(computeAffluenceScore(lieuId, new Date())),
  )

  useEffect(() => {
    const update = () => setNiveau(scoreToNiveau(computeAffluenceScore(lieuId, new Date())))
    update()
    const interval = setInterval(update, REFRESH_MS)
    return () => clearInterval(interval)
  }, [lieuId])

  return niveau
}
