import { TAGS } from '../../data/tags'
import type { TagId } from '../../types'
import { TagChip } from '../filters/TagChip'
import { formatDuration } from '../../utils/dateFormat'

const BUDGETS = [90, 120, 180, 240, 360]

interface InterestSelectorProps {
  interets: TagId[]
  onToggle: (tag: TagId) => void
  budgetMinutes: number
  onChangeBudget: (minutes: number) => void
}

export function InterestSelector({
  interets,
  onToggle,
  budgetMinutes,
  onChangeBudget,
}: InterestSelectorProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-medium text-white/70">
          Vos centres d’intérêt {interets.length > 0 && `(${interets.length})`}
        </p>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <TagChip
              key={tag.id}
              label={tag.label}
              active={interets.includes(tag.id)}
              onClick={() => onToggle(tag.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-white/70">Temps disponible</p>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((minutes) => (
            <button
              key={minutes}
              type="button"
              onClick={() => onChangeBudget(minutes)}
              aria-pressed={budgetMinutes === minutes}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                budgetMinutes === minutes
                  ? 'border-accent bg-accent text-ink'
                  : 'border-white/15 text-white/70 hover:border-white/30'
              }`}
            >
              {formatDuration(minutes)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
