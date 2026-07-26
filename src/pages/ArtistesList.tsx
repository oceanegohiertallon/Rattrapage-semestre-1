import { useArtistes } from '../hooks/useArtistes'
import { ArtistCard } from '../components/cards/ArtistCard'
import { Loader } from '../components/ui/Loader'

export function ArtistesList() {
  const { artistes, loading } = useArtistes()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-white">Artistes</h1>
      <p className="mt-1 text-white/50">{artistes.length} photographes présentés cette édition</p>

      <div className="mt-8">
        {loading ? (
          <Loader label="Chargement des artistes…" />
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {artistes.map((artiste) => (
              <ArtistCard key={artiste.id} artiste={artiste} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
