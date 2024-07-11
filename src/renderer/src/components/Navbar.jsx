import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const handleClickLogin = () => {
    navigate('/login')
  }
  const handleClickMenu = () => {
    navigate('/')
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <button onClick={handleClickMenu}>MagDollyTracker</button>
        </div>
        <div>
          <button
            className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded"
            onClick={handleClickLogin}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
