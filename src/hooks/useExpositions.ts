import { useMemo } from 'react'
import { EXPOSITIONS } from '../data/expositions'
import { useMockFetch } from './useMockFetch'
import type { TagId } from '../types'

export interface ExpositionFilters {
  tag: TagId | ''
  lieuId: string
  q: string
}

export function useExpositions(filters?: Partial<ExpositionFilters>) {
  const { data, loading, error } = useMockFetch(EXPOSITIONS)

  const expositions = useMemo(() => {
    const list = data ?? []
    if (!filters) return list

    const q = filters.q?.trim().toLowerCase()

    return list.filter((exposition) => {
      if (filters.tag && !exposition.tags.includes(filters.tag)) return false
      if (filters.lieuId && exposition.lieuId !== filters.lieuId) return false
      if (q && !exposition.titre.toLowerCase().includes(q)) return false
      return true
    })
  }, [data, filters])

  return { expositions, loading, error }
}

export function useExposition(expositionId: string | undefined) {
  const { data, loading, error } = useMockFetch(EXPOSITIONS)
  const exposition = useMemo(
    () => data?.find((e) => e.id === expositionId) ?? null,
    [data, expositionId],
  )
  return { exposition, loading, error }
}
