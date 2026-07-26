# Festival Photo Paris

Front React (Vite + TypeScript + Tailwind CSS + react-router-dom) pour un festival international de photographie fictif : découverte des expositions, artistes et lieux, réservation de créneaux, affluence en direct, et un constructeur de parcours personnalisé selon centres d'intérêt et temps disponible.

Voir [NOTE_IA.md](./NOTE_IA.md) pour le détail de l'usage de l'IA, des corrections apportées et des limites connues.

## Lancer le projet

```bash
npm install
npm run dev       # serveur de développement
```

## Structure

```
src/
  data/         mocks typés (expositions, artistes, lieux, créneaux)
  types/        types partagés
  hooks/        hooks personnalisés (données, filtres, réservations, recommandation, affluence)
  context/      état global (réservations, favoris) via Context
  components/   composants réutilisables (cartes, filtres, réservation, recommandation, UI)
  pages/        pages routées
  router/       arbre de routes (routing avancé, lazy loading)
  utils/        formatage de dates, moteur de recommandation, simulation d'affluence
```
