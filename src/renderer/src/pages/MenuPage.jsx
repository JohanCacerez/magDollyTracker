import React from 'react'
import { FaBox, FaDolly } from 'react-icons/fa'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
  const token = localStorage.getItem('token')
  const { user } = useUser()
  const isAdmin = user && user.range === 'admin'
  let isAuth = false
  const navigate = useNavigate()

  const handleClick = () => {
    console.log('controlpane')
    navigate('/controlpane')
  }

  const handleClickMagazine = () => {
    navigate('/magazinetracker')
  }

  const handleClickDollie = () => {
    navigate('/dollietracker')
  }

  if (token) {
    try {
      isAuth = true
    } catch (error) {
      console.error('Token inválido', error)
      localStorage.removeItem('token')
    }
  }

  const magazines = []
  for (let i = 1; i <= 359; i++) {
    const id = `D-${i.toString().padStart(4, '0')}`
    magazines.push([
      id,
      '2023-06-23', // create_at
      '2024-06-23', // next_maintenance
      'desconocido', //status
      'no', // damage
      '', // observation_damage
      0, // screws_count
      1, // user
      '' // comment
    ])
  }

  const agregarMagazines = async (magazines) => {
    const response = await window.api.insert(magazines)
    if (response.status === 'success') {
      console.log('Datos insertados correctamente.')
    } else {
      console.error('Error al insertar datos.')
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
          onClick={() => handleClickMagazine()}
          disabled={!isAuth}
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
          onClick={() => handleClickDollie()}
          disabled={!isAuth}
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
          disabled={!isAuth || !isAdmin}
        >
          <span className="text-lg">Admin Panel</span>
        </button>
      </div>
    </div>
  )
}

export default Menu
