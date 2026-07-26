import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useExpositions } from '../hooks/useExpositions'
import { useArtistes } from '../hooks/useArtistes'
import { useLieux } from '../hooks/useLieux'
import { ExpositionCard } from '../components/cards/ExpositionCard'
import { Loader } from '../components/ui/Loader'

export function Home() {
  const { expositions, loading } = useExpositions()
  const { artistes } = useArtistes()
  const { lieux } = useLieux()

  const artisteParId = useMemo(() => new Map(artistes.map((a) => [a.id, a])), [artistes])
  const lieuParId = useMemo(() => new Map(lieux.map((l) => [l.id, l])), [lieux])

  const misesEnAvant = useMemo(
    () => [...expositions].sort((a, b) => b.popularite - a.popularite).slice(0, 3),
    [expositions],
  )

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />

        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">1er juillet — 15 août 2026</p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            Festival International de Photographie de Paris
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Six lieux, des dizaines d’expositions et un parcours pensé pour vous, selon vos
            centres d’intérêt et le temps que vous avez à consacrer au festival.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/parcours"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-medium text-ink transition hover:bg-accent-dark"
            >
              Créer mon parcours
            </Link>
            <Link
              to="/expositions"
              className="rounded-xl border border-white/20 px-6 py-3 text-sm text-white/90 transition hover:border-white/40"
            >
              Explorer les expositions
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-white">À ne pas manquer</h2>
          <Link to="/expositions" className="text-sm text-accent hover:underline">
            Toutes les expositions →
          </Link>
        </div>

        <div className="mt-6">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {misesEnAvant.map((exposition) => (
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
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-14 sm:grid-cols-3 sm:px-6">
          <Link to="/lieux" className="rounded-2xl border border-white/10 p-6 transition hover:border-accent/40">
            <p className="font-display text-lg text-white">Les lieux</p>
            <p className="mt-1 text-sm text-white/50">
              Affluence en direct pour choisir le meilleur moment.
            </p>
          </Link>
          <Link to="/artistes" className="rounded-2xl border border-white/10 p-6 transition hover:border-accent/40">
            <p className="font-display text-lg text-white">Les artistes</p>
            <p className="mt-1 text-sm text-white/50">Sept artistes, Sept regards sur le monde.</p>
          </Link>
          <Link to="/mes-reservations" className="rounded-2xl border border-white/10 p-6 transition hover:border-accent/40">
            <p className="font-display text-lg text-white">Mes réservations</p>
            <p className="mt-1 text-sm text-white/50">Retrouvez et gérez vos créneaux réservés.</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
