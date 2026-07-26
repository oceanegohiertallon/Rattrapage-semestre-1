import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLieu } from '../hooks/useLieux'
import { useExpositions } from '../hooks/useExpositions'
import { useArtistes } from '../hooks/useArtistes'
import { ExpositionCard } from '../components/cards/ExpositionCard'
import { AffluenceBadge } from '../components/booking/AffluenceBadge'
import { Loader } from '../components/ui/Loader'

export function LieuDetail() {
  const { lieuId } = useParams<{ lieuId: string }>()
  const { lieu, loading } = useLieu(lieuId)
  const { expositions } = useExpositions()
  const { artistes } = useArtistes()

  const artisteParId = useMemo(() => new Map(artistes.map((a) => [a.id, a])), [artistes])
  const expositionsLieu = expositions.filter((e) => e.lieuId === lieuId)

  if (loading) return <Loader label="Chargement…" />
  if (!lieu) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="font-display text-xl text-white">Lieu introuvable</p>
        <Link to="/lieux" className="mt-3 inline-block text-accent hover:underline">
          Retour aux lieux
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <img src={lieu.image} alt={lieu.nom} className="h-full w-full object-cover" />
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-white">{lieu.nom}</h1>
          <p className="text-white/50">
            {lieu.adresse}, {lieu.arrondissement} · capacité {lieu.capacite} personnes
          </p>
        </div>
        <AffluenceBadge lieuId={lieu.id} />
      </div>

      <p className="mt-4 max-w-2xl text-white/70">{lieu.description}</p>

      <h2 className="mt-10 font-display text-xl text-white">
        Expositions sur place ({expositionsLieu.length})
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {expositionsLieu.map((exposition) => (
          <ExpositionCard
            key={exposition.id}
            exposition={exposition}
            artiste={artisteParId.get(exposition.artisteId)}
            lieu={lieu}
          />
        ))}
      </div>
    </div>
  )
}
