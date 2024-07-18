import React, { useState } from 'react'

function ControlAdminPage() {
  const [openSection, setOpenSection] = useState(null)

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <div className="container mx-auto my-4 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="font-bold text-2xl text-center mb-4">Panel de Control</h1>

      <section className="mb-6">
        <button
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          onClick={() => toggleSection('addUser')}
        >
          Agregar Nuevo Usuario
        </button>
        {openSection === 'addUser' && (
          <div className="mt-4">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <input
                  type="text"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Ingrese ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Ingrese Nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Ingrese Contraseña"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rango</label>
                <select className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <button
                type="button"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Agregar Usuario
              </button>
            </form>
          </div>
        )}
      </section>

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
                />
              </div>
              <button
                type="button"
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
              >
                Buscar Usuario
              </button>
            </form>
            <div className="mt-4 space-y-4">
              <button
                type="button"
                className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Eliminar Usuario
              </button>
              <button
                type="button"
                className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="mb-6">
        <button
          className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700"
          onClick={() => toggleSection('exportData')}
        >
          Extraer Base de Datos a Excel
        </button>
        {openSection === 'exportData' && (
          <div className="mt-4 text-center">
            <button
              type="button"
              className="py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-700"
            >
              Extraer Datos a Excel
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default ControlAdminPage
