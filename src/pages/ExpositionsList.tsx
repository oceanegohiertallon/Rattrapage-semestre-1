import { useMemo } from 'react'
import { useExpositions } from '../hooks/useExpositions'
import { useExpositionFilters } from '../hooks/useExpositionFilters'
import { useArtistes } from '../hooks/useArtistes'
import { useLieux } from '../hooks/useLieux'
import { ExpositionCard } from '../components/cards/ExpositionCard'
import { FilterBar } from '../components/filters/FilterBar'
import { Loader } from '../components/ui/Loader'
import { EmptyState } from '../components/ui/EmptyState'

export function ExpositionsList() {
  const { filters, setFilter, resetFilters, hasActiveFilters } = useExpositionFilters()
  const { expositions, loading } = useExpositions(filters)
  const { artistes } = useArtistes()
  const { lieux } = useLieux()

  const artisteParId = useMemo(() => new Map(artistes.map((a) => [a.id, a])), [artistes])
  const lieuParId = useMemo(() => new Map(lieux.map((l) => [l.id, l])), [lieux])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-white">Expositions</h1>
      <p className="mt-1 text-white/50">{expositions.length} exposition(s) à découvrir</p>

      <div className="mt-6">
        <FilterBar
          q={filters.q}
          tag={filters.tag}
          lieuId={filters.lieuId}
          lieux={lieux}
          onChangeQ={(v) => setFilter('q', v)}
          onChangeTag={(v) => setFilter('tag', v)}
          onChangeLieu={(v) => setFilter('lieuId', v)}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <div className="mt-8">
        {loading ? (
          <Loader label="Chargement des expositions…" />
        ) : expositions.length === 0 ? (
          <EmptyState
            title="Aucune exposition ne correspond"
            description="Essayez de retirer un filtre ou une recherche."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expositions.map((exposition) => (
              <ExpositionCard
                key={exposition.id}
                exposition={exposition}
                artiste={artisteParId.get(exposition.artisteId)}
                lieu={lieuParId.get(exposition.lieuId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
