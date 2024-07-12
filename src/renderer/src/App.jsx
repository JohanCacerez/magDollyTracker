import { HashRouter, Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import ControlPane from './pages/ControlPanePages/ControlPaneMenu'
import Navbar from './components/Navbar'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <HashRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/user/:id" element={<MenuPage />} />
          <Route path="/controlpane" element={<ControlPane />} />
        </Routes>
      </UserProvider>
    </HashRouter>
  )
}

export default App
