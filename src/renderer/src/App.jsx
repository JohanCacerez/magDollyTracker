import { HashRouter, Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import Navbar from './components/Navbar'
import { UserProvider } from './context/UserContext'
import ControlAdminPage from './pages/ControlAdminPage'

function App() {
  return (
    <HashRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/user/:id" element={<MenuPage />} />
          <Route path="/controlpane" element={<ControlAdminPage />} />
        </Routes>
      </UserProvider>
    </HashRouter>
  )
}

export default App
