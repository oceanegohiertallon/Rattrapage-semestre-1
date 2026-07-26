import { useMemo } from 'react'
import { LIEUX } from '../data/lieux'
import { useMockFetch } from './useMockFetch'

export function useLieux() {
  const { data, loading, error } = useMockFetch(LIEUX)
  return { lieux: data ?? [], loading, error }
}

export function useLieu(lieuId: string | undefined) {
  const { data, loading, error } = useMockFetch(LIEUX)
  const lieu = useMemo(() => data?.find((l) => l.id === lieuId) ?? null, [data, lieuId])
  return { lieu, loading, error }
}
