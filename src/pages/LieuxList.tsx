import { useLieux } from '../hooks/useLieux'
import { VenueCard } from '../components/cards/VenueCard'
import { Loader } from '../components/ui/Loader'

export function LieuxList() {
  const { lieux, loading } = useLieux()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-white">Lieux du festival</h1>
      <p className="mt-1 text-white/50">{lieux.length} lieux à travers Paris</p>

      <div className="mt-8">
        {loading ? (
          <Loader label="Chargement des lieux…" />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lieux.map((lieu) => (
              <VenueCard key={lieu.id} lieu={lieu} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
