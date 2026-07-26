import { useAffluence } from '../../hooks/useAffluence'
import { NIVEAU_LABEL } from '../../utils/affluenceSimulator'
import { Badge } from '../ui/Badge'
import type { NiveauAffluence } from '../../types'

const TONE_BY_NIVEAU: Record<NiveauAffluence, 'success' | 'warning' | 'danger'> = {
  faible: 'success',
  moyenne: 'warning',
  forte: 'danger',
}

export function AffluenceBadge({ lieuId }: { lieuId: string }) {
  const niveau = useAffluence(lieuId)

  return (
    <Badge tone={TONE_BY_NIVEAU[niveau]}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {NIVEAU_LABEL[niveau]}
    </Badge>
  )
}
