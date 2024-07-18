// src/renderer/src/components/SelectionMenu.js
import React from 'react'
import { FaBox, FaDolly } from 'react-icons/fa'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Menu = ({ onSelect }) => {
  const token = localStorage.getItem('token')
  const { user } = useUser()
  const isAdmin = user && user.range === 'admin'
  let isAuth = false
  const navigate = useNavigate()

  const handleClick = () => {
    console.log('controlpane')
    navigate('/controlpane')
  }

  if (token) {
    try {
      isAuth = true
    } catch (error) {
      console.error()('Token invalido', error)
      localStorage.removeItem('token')
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex space-x-4">
        <button
          className={`flex items-center px-6 py-4 rounded shadow-lg transition duration-300 ${
            isAuth
              ? 'bg-blue-500 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
          onClick={() => onSelect('Magazine Tracker')}
          disabled={!isAuth} // Deshabilitar si no hay token válido
        >
          <FaBox className="w-8 h-8 mr-2" />
          <span className="text-lg">Magazine Tracker</span>
        </button>
        <button
          className={`flex items-center px-6 py-4 rounded shadow-lg transition duration-300 ${
            isAuth
              ? 'bg-green-500 text-white hover:bg-green-700'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
          onClick={() => onSelect('Dollie Tracker')}
          disabled={!isAuth} // Deshabilitar si no hay token válido
        >
          <FaDolly className="w-8 h-8 mr-2" />
          <span className="text-lg">Dollie Tracker</span>
        </button>
        <button
          className={`flex items-center px-6 py-4 rounded shadow-lg transition duration-300 ${
            isAdmin
              ? 'bg-yellow-500 text-white hover:bg-yellow-700'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
          onClick={() => isAdmin && handleClick()}
          disabled={!isAuth || !isAdmin} // Deshabilitar si no hay token válido o el usuario no es administrador
        >
          <span className="text-lg">Admin Panel</span>
        </button>
      </div>
    </div>
  )
}

export default Menu
