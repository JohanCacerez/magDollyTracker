import { useState } from 'react'

function MagazineRegister() {
  const [formVisible, setFormVisible] = useState(true)
  const [isDamaged, setIsDamaged] = useState(false)
  return (
    <div
      className={`flex justify-center items-center  p-4 bg-gray-100 ${formVisible ? 'animate-fadeIn' : 'animate-fadeOut'}`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-8">
          <h1 className=" text-2xl font-bold">Registrar nuevo magazine</h1>
        </div>
        <form>
          <div className=" my-4">
            <label className="block text-sm font-medium text-gray-700">ID del magazine:</label>
            <input
              type="number"
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700">Ancho del magazine</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="175">175</option>
              <option value="190">190</option>
              <option value="250">250</option>
            </select>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700">
              ¿Cuenta con algun daño?
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="clean"
                value="yes"
                className="form-radio"
                onChange={() => setIsDamaged(true)}
              />{' '}
              Sí
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="clean"
                value="no"
                className="form-radio"
                onChange={() => setIsDamaged(false)}
              />{' '}
              No
            </label>

            {isDamaged && (
              <div className="mt-2">
                <label htmlFor="damageComment" className="block text-sm font-medium text-gray-700">
                  Comentario del daño:
                </label>
                <input
                  type="text"
                  id="damageComment"
                  onChange={(e) => setObservationDmg(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 my-4"></div>
        </form>
      </div>
    </div>
  )
}

export default MagazineRegister
