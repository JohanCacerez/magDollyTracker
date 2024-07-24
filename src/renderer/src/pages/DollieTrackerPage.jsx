import { useState } from 'react'
import DollieRegister from './DollieTracker/DollieRegister'
import DollieMantoTracker from './DollieTracker/DollieMantoTracker'
import DollieReview from './DollieTracker/DollieReview'

function DollieTrackerPage() {
  const [selectedOption, setSelectedOption] = useState('review')

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dollye Tracker</h1>
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
          <option value="review">Revisar Dollies</option>
          <option value="register">Registrar Dollie</option>
          <option value="maintenance">Mantenimiento Dollies</option>
          <option value="export">Extraer Base de Datos a Excel</option>
        </select>
      </div>

      {selectedOption === 'review' && <DollieReview />}

      {selectedOption === 'register' && <DollieRegister />}

      {selectedOption === 'maintenance' && <DollieMantoTracker />}

      {selectedOption === 'export' && <div>{/* Lógica para extraer base de datos a Excel */}</div>}
    </div>
  )
}

export default DollieTrackerPage
