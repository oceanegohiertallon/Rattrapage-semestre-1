import type { Tag } from '../types'

export const TAGS: Tag[] = [
  { id: 'f1', label: 'Formule 1' },
  { id: 'gaming', label: 'Jeux vidéo' },
  { id: 'voyage', label: 'Voyage' },
  { id: 'animalier', label: 'Animalier' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'documentaire', label: 'Documentaire' },
  { id: 'paysage', label: 'Paysage' },
  { id: 'street', label: 'Street photography' },
  { id: 'contemporain', label: 'Contemporain' },
  { id: 'nature', label: 'Nature' },
]

export const tagLabel = (id: string): string =>
  TAGS.find((tag) => tag.id === id)?.label ?? id
