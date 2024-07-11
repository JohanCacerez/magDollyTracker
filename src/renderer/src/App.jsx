import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MenuPage from './pages/MenuPage'
import ControlPane from './pages/ControlPanePages/ControlPaneMenu'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/controlpane" element={<ControlPane />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
