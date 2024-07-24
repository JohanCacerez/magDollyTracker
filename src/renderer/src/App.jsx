import { HashRouter, Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import Navbar from './components/Navbar'
import { UserProvider } from './context/UserContext'
import ControlAdminPage from './pages/ControlAdminPage'
import MagazineTrackerPage from './pages/MagazineTrackerPage'
import DollieTrackerPage from './pages/DollieTrackerPage'

function App() {
  return (
    <HashRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/user/:id" element={<MenuPage />} />
          <Route path="/controlpane" element={<ControlAdminPage />} />
          <Route path="/magazinetracker" element={<MagazineTrackerPage />} />
          <Route path="/dollietracker" element={<DollieTrackerPage />} />
        </Routes>
      </UserProvider>
    </HashRouter>
  )
}

export default App
