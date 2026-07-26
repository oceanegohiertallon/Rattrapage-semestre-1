export function Loader({ label = 'Chargement…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-white/50">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
