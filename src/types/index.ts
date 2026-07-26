export type TagId =
  | 'f1'
  | 'gaming'
  | 'voyage'
  | 'animalier'
  | 'portrait'
  | 'documentaire'
  | 'paysage'
  | 'street'
  | 'contemporain'
  | 'nature'

export interface Tag {
  id: TagId
  label: string
}

export interface Artiste {
  id: string
  nom: string
  pays: string
  bio: string
  photo: string
  tags: TagId[]
}

export interface Lieu {
  id: string
  nom: string
  adresse: string
  arrondissement: string
  description: string
  image: string
  capacite: number
}

export interface Exposition {
  id: string
  titre: string
  artisteId: string
  lieuId: string
  description: string
  image: string
  tags: TagId[]
  dureeMinutes: number
  popularite: number
  dateDebut: string
  dateFin: string
}

export interface Creneau {
  id: string
  expositionId: string
  date: string
  heure: string
  capacite: number
  reserves: number
}

export interface Reservation {
  id: string
  creneauId: string
  expositionId: string
  visiteur: string
  createdAt: string
}

export type NiveauAffluence = 'faible' | 'moyenne' | 'forte'

export interface EtapeParcours {
  exposition: Exposition
  lieu: Lieu
  artiste: Artiste
  creneau: Creneau | null
}

export interface Parcours {
  etapes: EtapeParcours[]
  dureeTotaleMinutes: number
  interetsCouverts: TagId[]
}
