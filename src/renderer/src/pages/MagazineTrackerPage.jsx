import React, { useState } from 'react'
import MagazineMantoTracker from './MagazineTracker/MagazineMantoTracker'
import MagazineRegister from './MagazineTracker/MagazineRegister'
import MagazineReview from './MagazineTracker/MagazineReview'

function MagazineTrackerPage() {
  const [selectedOption, setSelectedOption] = useState('review')

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Magazine Tracker</h1>
      <div className="mb-4">
        <label htmlFor="menu" className="block text-sm font-medium text-gray-700">
          Seleccione una opción:
        </label>
        <select
          id="menu"
          value={selectedOption}
          onChange={handleSelectChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="review">Revisar Magazines</option>
          <option value="register">Registrar Magazine</option>
          <option value="maintenance">Mantenimiento Magazine</option>
          <option value="export">Extraer Base de Datos a Excel</option>
        </select>
      </div>

      {selectedOption === 'review' && <MagazineReview />}

      {selectedOption === 'register' && <MagazineRegister />}

      {selectedOption === 'maintenance' && <MagazineMantoTracker />}

      {selectedOption === 'export' && <div>{/* Lógica para extraer base de datos a Excel */}</div>}
    </div>
  )
}

export default MagazineTrackerPage
