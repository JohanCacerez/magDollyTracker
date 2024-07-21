import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function Notification({ message, onClose }) {
  return (
    <div className="fixed top-0 right-0 m-4 p-4 bg-red-500 text-white rounded shadow-lg z-50">
      <p>{message}</p>
      <button onClick={onClose} className="ml-2 text-white font-bold">
        X
      </button>
    </div>
  )
}

function Navbar() {
  const navigate = useNavigate()
  const { user, updateUser } = useUser()
  const [isAuth, setIsAuth] = useState(false)
  const [showLoginMenu, setShowLoginMenu] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuth(!!token)
  }, [])

  const handleClickLogin = () => {
    setShowLoginMenu(true)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await window.api.loginUser(username, password)
      if (response.success) {
        localStorage.setItem('token', response.token)
        setIsAuth(true)
        setShowLoginMenu(false)
        setUsername('')
        setPassword('')
        updateUser(response.user)
        navigate(`/user/${response.user.id}`)
      } else {
        showNotification(response.message)
      }
    } catch (err) {
      showNotification('Error en el inicio de sesión')
      console.error(err)
    }
  }

  const handleClickLogout = () => {
    localStorage.removeItem('token')
    setIsAuth(false)
    updateUser(null)
    navigate('/')
  }

  const handleCloseLoginMenu = () => {
    setShowLoginMenu(false)
    setUsername('')
    setPassword('')
    clearNotification()
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      clearNotification()
    }, 5000) // Ocultar la notificación después de 5 segundos
  }

  const clearNotification = () => {
    setNotification(null)
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <button onClick={() => navigate('/')} className="cursor-pointer focus:outline-none">
            MagDollyTracker
          </button>
        </div>

        <div>
          {isAuth ? (
            <div className="flex items-center">
              <h2 className="text-white mr-4">{user?.name}</h2>
              <button
                className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded"
                onClick={handleClickLogout}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button
              className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded"
              onClick={handleClickLogin}
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>

      {/* Menú emergente de inicio de sesión */}
      {showLoginMenu && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseLoginMenu}
                  className="mr-2 px-4 py-2 text-sm rounded-md bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notificación */}
      {notification && <Notification message={notification} onClose={clearNotification} />}
    </nav>
  )
}

export default Navbar
