import type { Lieu } from '../types'

export const LIEUX: Lieu[] = [
  {
    id: 'grand-palais',
    nom: 'Grand Palais Éphémère',
    adresse: '3 Avenue du Général Eisenhower',
    arrondissement: '8e',
    description:
      "Nef monumentale accueillant les expositions phares du festival, sous verrière.",
    image: 'https://picsum.photos/seed/grand-palais/800/500',
    capacite: 400,
  },
  {
    id: 'hotel-sully',
    nom: 'Hôtel de Sully',
    adresse: '62 Rue Saint-Antoine',
    arrondissement: '4e',
    description:
      'Hôtel particulier du Marais, cour et jardins dédiés aux tirages argentiques.',
    image: 'https://picsum.photos/seed/hotel-sully/800/500',
    capacite: 120,
  },
  {
    id: 'bourse-commerce',
    nom: 'Bourse de Commerce',
    adresse: '2 Rue de Viarmes',
    arrondissement: '1er',
    description: 'Rotonde circulaire réservée aux grands formats contemporains.',
    image: 'https://picsum.photos/seed/bourse-commerce/800/500',
    capacite: 250,
  },
  {
    id: 'la-villette',
    nom: 'Grande Halle de la Villette',
    adresse: '211 Avenue Jean Jaurès',
    arrondissement: '19e',
    description: 'Ancien marché aux bestiaux reconverti en halle d’exposition XXL.',
    image: 'https://picsum.photos/seed/la-villette/800/500',
    capacite: 500,
  },
  {
    id: 'institut-marais',
    nom: 'Institut Photographique du Marais',
    adresse: '5 Rue de Fourcy',
    arrondissement: '4e',
    description: 'Galerie intimiste spécialisée dans le photojournalisme.',
    image: 'https://picsum.photos/seed/institut-marais/800/500',
    capacite: 90,
  },
  {
    id: 'carreau-temple',
    nom: 'Carreau du Temple',
    adresse: '4 Rue Eugène Spuller',
    arrondissement: '3e',
    description: 'Halle Belle Époque, scène des expositions mode et portrait.',
    image: 'https://picsum.photos/seed/carreau-temple/800/500',
    capacite: 180,
  },
]
