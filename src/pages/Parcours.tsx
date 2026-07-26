import { useState } from 'react'
import { InterestSelector } from '../components/recommendation/InterestSelector'
import { ParcoursSummary } from '../components/recommendation/ParcoursSummary'
import { RecommendationList } from '../components/recommendation/RecommendationList'
import { EmptyState } from '../components/ui/EmptyState'
import { useRecommendedParcours } from '../hooks/useRecommendedParcours'
import type { TagId } from '../types'

export function Parcours() {
  const [interets, setInterets] = useState<TagId[]>([])
  const [budgetMinutes, setBudgetMinutes] = useState(180)

  const toggleInteret = (tag: TagId) => {
    setInterets((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const parcours = useRecommendedParcours(interets, budgetMinutes)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-white">Construisez votre parcours</h1>
      <p className="mt-1 text-white/50">
        Sélectionnez vos centres d’intérêt et le temps dont vous disposez : nous composons un
        itinéraire d’expositions recommandé.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <InterestSelector
          interets={interets}
          onToggle={toggleInteret}
          budgetMinutes={budgetMinutes}
          onChangeBudget={setBudgetMinutes}
        />
      </div>

      <div className="mt-8">
        {parcours.etapes.length === 0 ? (
          <EmptyState
            title="Aucun itinéraire ne tient dans ce budget"
            description="Augmentez le temps disponible ou modifiez vos centres d’intérêt."
          />
        ) : (
          <>
            <div className="mb-5">
              <ParcoursSummary parcours={parcours} />
            </div>
            <RecommendationList parcours={parcours} />
          </>
        )}
      </div>
    </div>
  )
}
