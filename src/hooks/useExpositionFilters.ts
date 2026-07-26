import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { TagId } from '../types'
import type { ExpositionFilters } from './useExpositions'

const EMPTY: ExpositionFilters = { tag: '', lieuId: '', q: '' }

export function useExpositionFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: ExpositionFilters = useMemo(
    () => ({
      tag: (searchParams.get('tag') as TagId | null) ?? EMPTY.tag,
      lieuId: searchParams.get('lieu') ?? EMPTY.lieuId,
      q: searchParams.get('q') ?? EMPTY.q,
    }),
    [searchParams],
  )

  const setFilter = useCallback(
    (key: keyof ExpositionFilters, value: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          const paramName = key === 'lieuId' ? 'lieu' : key
          if (value) next.set(paramName, value)
          else next.delete(paramName)
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const resetFilters = useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams])

  const hasActiveFilters = Boolean(filters.tag || filters.lieuId || filters.q)

  return { filters, setFilter, resetFilters, hasActiveFilters }
}
