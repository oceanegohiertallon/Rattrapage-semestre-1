import { useMemo } from 'react'
import { EXPOSITIONS } from '../data/expositions'
import { ARTISTES } from '../data/artistes'
import { LIEUX } from '../data/lieux'
import { CRENEAUX } from '../data/creneaux'
import { buildParcours } from '../utils/recommendation'
import { todayISO } from '../utils/dateFormat'
import type { TagId } from '../types'

export function useRecommendedParcours(interets: TagId[], budgetMinutes: number) {
  const interetsKey = interets.join(',')

  return useMemo(
    () =>
      buildParcours({
        expositions: EXPOSITIONS,
        lieux: LIEUX,
        artistes: ARTISTES,
        creneaux: CRENEAUX,
        interets,
        budgetMinutes,
        today: todayISO(),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [interetsKey, budgetMinutes],
  )
}
