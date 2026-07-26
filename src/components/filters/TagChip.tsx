interface TagChipProps {
  label: string
  active: boolean
  onClick: () => void
}

export function TagChip({ label, active, onClick }: TagChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
        active
          ? 'border-accent bg-accent text-ink'
          : 'border-white/15 bg-transparent text-white/70 hover:border-white/30 hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}
