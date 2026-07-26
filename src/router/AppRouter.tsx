import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { Loader } from '../components/ui/Loader'

const Home = lazy(() => import('../pages/Home').then((m) => ({ default: m.Home })))
const ExpositionsList = lazy(() =>
  import('../pages/ExpositionsList').then((m) => ({ default: m.ExpositionsList })),
)
const ExpositionDetail = lazy(() =>
  import('../pages/ExpositionDetail').then((m) => ({ default: m.ExpositionDetail })),
)
const ArtistesList = lazy(() =>
  import('../pages/ArtistesList').then((m) => ({ default: m.ArtistesList })),
)
const ArtisteDetail = lazy(() =>
  import('../pages/ArtisteDetail').then((m) => ({ default: m.ArtisteDetail })),
)
const LieuxList = lazy(() => import('../pages/LieuxList').then((m) => ({ default: m.LieuxList })))
const LieuDetail = lazy(() => import('../pages/LieuDetail').then((m) => ({ default: m.LieuDetail })))
const Parcours = lazy(() => import('../pages/Parcours').then((m) => ({ default: m.Parcours })))
const Reservation = lazy(() =>
  import('../pages/Reservation').then((m) => ({ default: m.Reservation })),
)
const MesReservations = lazy(() =>
  import('../pages/MesReservations').then((m) => ({ default: m.MesReservations })),
)
const NotFound = lazy(() => import('../pages/NotFound').then((m) => ({ default: m.NotFound })))

export function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="expositions" element={<ExpositionsList />} />
          <Route path="expositions/:expoId" element={<ExpositionDetail />} />
          <Route path="artistes" element={<ArtistesList />} />
          <Route path="artistes/:artisteId" element={<ArtisteDetail />} />
          <Route path="lieux" element={<LieuxList />} />
          <Route path="lieux/:lieuId" element={<LieuDetail />} />
          <Route path="parcours" element={<Parcours />} />
          <Route path="reservation/:creneauId" element={<Reservation />} />
          <Route path="mes-reservations" element={<MesReservations />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
