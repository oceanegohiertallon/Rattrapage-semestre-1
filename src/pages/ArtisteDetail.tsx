import { Link, useParams } from 'react-router-dom'
import { useArtiste } from '../hooks/useArtistes'
import { useExpositions } from '../hooks/useExpositions'
import { useLieux } from '../hooks/useLieux'
import { ExpositionCard } from '../components/cards/ExpositionCard'
import { Loader } from '../components/ui/Loader'
import { Badge } from '../components/ui/Badge'
import { tagLabel } from '../data/tags'
import { useMemo } from 'react'

export function ArtisteDetail() {
  const { artisteId } = useParams<{ artisteId: string }>()
  const { artiste, loading } = useArtiste(artisteId)
  const { expositions } = useExpositions()
  const { lieux } = useLieux()

  const lieuParId = useMemo(() => new Map(lieux.map((l) => [l.id, l])), [lieux])
  const expositionsArtiste = expositions.filter((e) => e.artisteId === artisteId)

  if (loading) return <Loader label="Chargement…" />
  if (!artiste) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="font-display text-xl text-white">Artiste introuvable</p>
        <Link to="/artistes" className="mt-3 inline-block text-accent hover:underline">
          Retour aux artistes
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <img
          src={artiste.photo}
          alt={artiste.nom}
          className="h-28 w-28 rounded-full object-cover ring-2 ring-white/10"
        />
        <div>
          <h1 className="font-display text-3xl text-white">{artiste.nom}</h1>
          <p className="text-white/50">{artiste.pays}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {artiste.tags.map((tag) => (
              <Badge key={tag} tone="accent">
                {tagLabel(tag)}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-white/70">{artiste.bio}</p>

      <h2 className="mt-10 font-display text-xl text-white">
        Expositions ({expositionsArtiste.length})
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {expositionsArtiste.map((exposition) => (
          <ExpositionCard
            key={exposition.id}
            exposition={exposition}
            artiste={artiste}
            lieu={lieuParId.get(exposition.lieuId)}
          />
        ))}
      </div>
    </div>
  )
}
