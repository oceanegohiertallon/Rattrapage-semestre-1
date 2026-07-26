import { useMemo } from 'react'
import { ARTISTES } from '../data/artistes'
import { useMockFetch } from './useMockFetch'

export function useArtistes() {
  const { data, loading, error } = useMockFetch(ARTISTES)
  return { artistes: data ?? [], loading, error }
}

export function useArtiste(artisteId: string | undefined) {
  const { data, loading, error } = useMockFetch(ARTISTES)
  const artiste = useMemo(
    () => data?.find((a) => a.id === artisteId) ?? null,
    [data, artisteId],
  )
  return { artiste, loading, error }
}
