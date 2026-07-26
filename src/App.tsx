import { BrowserRouter } from 'react-router-dom'
import { FestivalProvider } from './context/FestivalProvider'
import { AppRouter } from './router/AppRouter'

function App() {
  return (
    <BrowserRouter>
      <FestivalProvider>
        <AppRouter />
      </FestivalProvider>
    </BrowserRouter>
  )
}

export default App
