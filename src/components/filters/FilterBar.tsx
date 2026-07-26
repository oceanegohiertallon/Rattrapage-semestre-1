import { useEffect, useState } from 'react'
import { TAGS } from '../../data/tags'
import type { Lieu, TagId } from '../../types'
import { useDebounce } from '../../hooks/useDebounce'
import { TagChip } from './TagChip'
import { SearchInput } from './SearchInput'

interface FilterBarProps {
  q: string
  tag: TagId | ''
  lieuId: string
  lieux: Lieu[]
  onChangeQ: (value: string) => void
  onChangeTag: (tag: TagId | '') => void
  onChangeLieu: (lieuId: string) => void
  onReset: () => void
  hasActiveFilters: boolean
}

export function FilterBar({
  q,
  tag,
  lieuId,
  lieux,
  onChangeQ,
  onChangeTag,
  onChangeLieu,
  onReset,
  hasActiveFilters,
}: FilterBarProps) {
  const [searchDraft, setSearchDraft] = useState(q)
  const debouncedSearch = useDebounce(searchDraft, 300)

  useEffect(() => {
    onChangeQ(debouncedSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:w-72">
          <SearchInput value={searchDraft} onChange={setSearchDraft} placeholder="Titre d'exposition…" />
        </div>

        <select
          value={lieuId}
          onChange={(e) => onChangeLieu(e.target.value)}
          className="rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white focus:border-accent focus:outline-none"
        >
          <option value="" className="bg-ink">
            Tous les lieux
          </option>
          {lieux.map((lieu) => (
            <option key={lieu.id} value={lieu.id} className="bg-ink">
              {lieu.nom}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSearchDraft('')
              onReset()
            }}
            className="text-sm text-white/50 underline-offset-4 hover:text-white hover:underline"
          >
            Réinitialiser
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <TagChip
            key={t.id}
            label={t.label}
            active={tag === t.id}
            onClick={() => onChangeTag(tag === t.id ? '' : t.id)}
          />
        ))}
      </div>
    </div>
  )
}
