import { useEffect, useState } from 'react'

interface MockFetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useMockFetch<T>(data: T, delayMs = 200): MockFetchState<T> {
  const [state, setState] = useState<MockFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    const timeout = setTimeout(() => {
      if (!cancelled) setState({ data, loading: false, error: null })
    }, delayMs)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayMs])

  return state
}
