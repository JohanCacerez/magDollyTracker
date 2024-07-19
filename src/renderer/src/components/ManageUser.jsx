import React, { useState, useEffect } from 'react'

function ManageUser() {
  const [openSection, setOpenSection] = useState(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)
  const [userFound, setUserFound] = useState(false) // Estado para verificar si se ha encontrado al usuario
  const [userId, setUserId] = useState('') // Estado para almacenar el ID del usuario

  // Efecto para actualizar el estado de userFound en función del valor de userId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await window.api.searchUserById(userId) // Cambia esto a tu lógica real de búsqueda
        if (response.success) {
          setUserFound(true)
        } else {
          setUserFound(false)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUserFound(false)
      }
    }

    fetchUser()
  }, [userId])

  const handleUserDelete = async () => {
    try {
      const response = await window.api.userDelete(userId)
      if (response.success) {
        setUserId('') // Vaciar el campo de ID
        setShowConfirmDelete(false) // Cerrar la ventana emergente
        setUserFound(false) // Resetear el estado de usuario encontrado
      } else {
        console.log(response.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  const confirmDeleteUser = () => {
    if (userFound) {
      setShowConfirmDelete(true)
    }
  }

  const changeUserPassword = () => {
    if (userFound) {
      setShowChangePasswordForm(true)
    }
  }

  const closeModals = () => {
    setShowConfirmDelete(false)
    setShowChangePasswordForm(false)
  }

  return (
    <section className="mb-6">
      <button
        className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
        onClick={() => toggleSection('manageUser')}
      >
        Modificar o Eliminar Usuario
      </button>
      {openSection === 'manageUser' && (
        <div className="mt-4">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Buscar por ID</label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Ingrese ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
          </form>
          <div className="mt-4 space-y-4">
            <button
              type="button"
              className={`w-full py-2 ${userFound ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-md`}
              onClick={confirmDeleteUser}
              disabled={!userFound}
            >
              Eliminar Usuario
            </button>
            <button
              type="button"
              className={`w-full py-2 ${userFound ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-md`}
              onClick={changeUserPassword}
              disabled={!userFound}
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      )}

      {/* Ventana emergente de confirmación de eliminación */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="mb-4">¿Estás seguro de que deseas eliminar este usuario?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={closeModals}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                onClick={handleUserDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formulario emergente para cambiar la contraseña */}
      {showChangePasswordForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Cambiar Contraseña</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                <input
                  type="password"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Ingrese nueva contraseña"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Confirme nueva contraseña"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                  onClick={closeModals}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default ManageUser
