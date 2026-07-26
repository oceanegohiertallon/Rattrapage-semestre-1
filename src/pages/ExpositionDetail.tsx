import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useExposition } from '../hooks/useExpositions'
import { useArtiste } from '../hooks/useArtistes'
import { useLieu } from '../hooks/useLieux'
import { useCreneauxParExposition } from '../hooks/useCreneaux'
import { useFestival } from '../context/festivalContext'
import { tagLabel } from '../data/tags'
import { formatDateLong, formatDuration } from '../utils/dateFormat'
import { Badge } from '../components/ui/Badge'
import { Loader } from '../components/ui/Loader'
import { SlotPicker } from '../components/booking/SlotPicker'
import { AffluenceBadge } from '../components/booking/AffluenceBadge'
import type { Creneau } from '../types'

export function ExpositionDetail() {
  const { expoId } = useParams<{ expoId: string }>()
  const navigate = useNavigate()
  const { exposition, loading } = useExposition(expoId)
  const { artiste } = useArtiste(exposition?.artisteId)
  const { lieu } = useLieu(exposition?.lieuId)
  const { creneaux } = useCreneauxParExposition(expoId)
  const { estFavori, toggleFavori, reserverCreneau, placesRestantes } = useFestival()

  const [selected, setSelected] = useState<Creneau | null>(null)
  const [visiteur, setVisiteur] = useState('')
  const [erreur, setErreur] = useState('')

  if (loading) return <Loader label="Chargement de l’exposition…" />
  if (!exposition) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="font-display text-xl text-white">Exposition introuvable</p>
        <Link to="/expositions" className="mt-3 inline-block text-accent hover:underline">
          Retour aux expositions
        </Link>
      </div>
    )
  }

  const handleReserver = () => {
    if (!selected) {
      setErreur('Choisissez un créneau.')
      return
    }
    if (!visiteur.trim()) {
      setErreur('Indiquez un nom pour la réservation.')
      return
    }
    if (placesRestantes(selected) === 0) {
      setErreur('Ce créneau vient de se remplir, choisissez-en un autre.')
      return
    }
    reserverCreneau(selected, visiteur.trim())
    navigate(`/reservation/${selected.id}`)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <img src={exposition.image} alt={exposition.titre} className="h-full w-full object-cover" />
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {exposition.tags.map((tag) => (
              <Badge key={tag} tone="accent">
                {tagLabel(tag)}
              </Badge>
            ))}
          </div>
          <h1 className="font-display text-3xl text-white">{exposition.titre}</h1>
          {artiste && (
            <Link to={`/artistes/${artiste.id}`} className="text-white/60 hover:text-accent">
              Par {artiste.nom}
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleFavori(exposition.id)}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
            estFavori(exposition.id)
              ? 'border-accent bg-accent text-ink'
              : 'border-white/15 text-white/70 hover:border-white/30'
          }`}
        >
          {estFavori(exposition.id) ? '★ Favori' : '☆ Ajouter aux favoris'}
        </button>
      </div>

      <p className="mt-4 max-w-2xl text-white/70">{exposition.description}</p>

      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-white/40">Durée</dt>
          <dd className="text-white/90">{formatDuration(exposition.dureeMinutes)}</dd>
        </div>
        <div>
          <dt className="text-white/40">Du</dt>
          <dd className="capitalize text-white/90">{formatDateLong(exposition.dateDebut)}</dd>
        </div>
        <div>
          <dt className="text-white/40">Au</dt>
          <dd className="capitalize text-white/90">{formatDateLong(exposition.dateFin)}</dd>
        </div>
        <div>
          <dt className="text-white/40">Popularité</dt>
          <dd className="text-white/90">{exposition.popularite}/100</dd>
        </div>
      </dl>

      {lieu && (
        <Link
          to={`/lieux/${lieu.id}`}
          className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-accent/40"
        >
          <div>
            <p className="font-display text-white">{lieu.nom}</p>
            <p className="text-xs text-white/50">
              {lieu.adresse}, {lieu.arrondissement}
            </p>
          </div>
          <AffluenceBadge lieuId={lieu.id} />
        </Link>
      )}

      <section className="mt-10">
        <h2 className="font-display text-xl text-white">Réserver un créneau</h2>
        <div className="mt-4">
          <SlotPicker creneaux={creneaux} selectedId={selected?.id} onSelect={setSelected} />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={visiteur}
            onChange={(e) => setVisiteur(e.target.value)}
            placeholder="Votre nom"
            className="rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none sm:w-64"
          />
          <button
            type="button"
            onClick={handleReserver}
            className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-accent-dark"
          >
            Confirmer la réservation
          </button>
        </div>
        {erreur && <p className="mt-2 text-sm text-rose-400">{erreur}</p>}
      </section>
    </div>
  )
}
