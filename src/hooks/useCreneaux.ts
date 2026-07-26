import { useMemo } from 'react'
import { CRENEAUX } from '../data/creneaux'
import { useMockFetch } from './useMockFetch'

export function useCreneauxParExposition(expositionId: string | undefined) {
  const { data, loading, error } = useMockFetch(CRENEAUX)

  const creneaux = useMemo(
    () => (data ?? []).filter((c) => c.expositionId === expositionId),
    [data, expositionId],
  )

  return { creneaux, loading, error }
}

export function useCreneau(creneauId: string | undefined) {
  const { data, loading, error } = useMockFetch(CRENEAUX)
  const creneau = useMemo(() => data?.find((c) => c.id === creneauId) ?? null, [data, creneauId])
  return { creneau, loading, error }
}
