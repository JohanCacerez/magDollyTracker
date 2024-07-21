import { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext'

function MagazineMantoTracker() {
  const [magazineId, setMagazineId] = useState('')
  const [magazineData, setMagazineData] = useState(null)
  const [esd, setEsd] = useState(false)
  const [commentEsd, setCommentEsd] = useState('')
  const [isDamaged, setIsDamaged] = useState(false)
  const [observationDmg, setObservationDmg] = useState('')
  const [missingScrews, setMissingScrews] = useState(false)
  const [screwsCount, setScrewsCount] = useState(0)
  const [comment, setComment] = useState('')
  const [selected, setSelected] = useState('good')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [formVisible, setFormVisible] = useState(true)
  const { user } = useUser()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')
    try {
      const screwsCountNumber = parseInt(screwsCount, 10) || 0
      const response = await window.api.updateMagazine(
        parseInt(magazineId, 10),
        isDamaged ? 'yes' : 'no',
        observationDmg || '',
        screwsCountNumber,
        comment || '',
        selected || 'good',
        user?.id
      )

      if (response.success) {
        setMagazineId('')
        setSuccessMessage('Magazine actualizado exitosamente.')
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        setErrorMessage(response.message || 'Error al actualizar el magazine.')
        setTimeout(() => setErrorMessage(''), 3000)
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error al enviar el formulario.')
      setTimeout(() => setErrorMessage(''), 3000)
      console.log('Ocurrió un error al enviar el formulario:', error)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await window.api.searchMagazineById(magazineId)
        if (response.success) {
          setMagazineData(true)
        } else if (magazineId !== '') {
          setErrorMessage('No se encontro un magazine con ese ID.')
          setTimeout(() => setErrorMessage(''), 3000)
          setMagazineData(false)
        } else {
          setMagazineData(false)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setMagazineData(false)
      }
    }

    fetchUser()
  }, [magazineId])

  return (
    <div
      className={`flex justify-center items-center min-h-screen p-4 bg-gray-100 ${formVisible ? 'animate-fadeIn' : 'animate-fadeOut'}`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="magazineId" className="block text-sm font-medium text-gray-700">
              ID del Magazine:
            </label>
            <input
              type="text"
              id="magazineId"
              value={magazineId}
              onChange={(e) => setMagazineId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {magazineData && (
            <>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  ¿Está limpio el magazine?
                </label>
                <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center">
                    <input type="radio" name="clean" value="yes" className="form-radio" /> Sí
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="clean" value="no" className="form-radio" /> No
                  </label>
                </div>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  ¿El magazine es del ancho correcto?
                </label>
                <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center">
                    <input type="radio" name="width" value="yes" className="form-radio" /> Sí
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="width" value="no" className="form-radio" /> No
                  </label>
                </div>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">¿revision ESD?</label>
                <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="esd"
                      value="yes"
                      className="form-radio"
                      onChange={() => setEsd(false)}
                    />{' '}
                    Pasa
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="esd"
                      value="no"
                      className="form-radio"
                      onChange={() => setEsd(true)}
                    />{' '}
                    No pasa
                  </label>
                </div>
                {esd && (
                  <div className="mt-2">
                    <label htmlFor="esdComment" className="block text-sm font-medium text-gray-700">
                      Comentario de ESD:
                    </label>
                    <input
                      type="text"
                      id="esdComment"
                      onChange={(e) => setCommentEsd(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  ¿Cuenta con algún daño?
                </label>
                <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="damaged"
                      value="yes"
                      className="form-radio"
                      onChange={() => setIsDamaged(true)}
                    />{' '}
                    Sí
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="damaged"
                      value="no"
                      className="form-radio"
                      onChange={() => setIsDamaged(false)}
                    />{' '}
                    No
                  </label>
                </div>
                {isDamaged && (
                  <div className="mt-2">
                    <label
                      htmlFor="damageComment"
                      className="block text-sm font-medium text-gray-700"
                    >
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  ¿Falta algún tornillo?
                </label>
                <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="missingScrews"
                      value="yes"
                      className="form-radio"
                      onChange={() => setMissingScrews(true)}
                    />{' '}
                    Sí
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="missingScrews"
                      value="no"
                      className="form-radio"
                      onChange={() => setMissingScrews(false)}
                    />{' '}
                    No
                  </label>
                </div>
                {missingScrews && (
                  <div className="mt-2">
                    <label
                      htmlFor="screwsCount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cantidad de tornillos faltantes:
                    </label>
                    <input
                      type="number"
                      id="screwsCount"
                      onChange={(e) => setScrewsCount(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                )}
              </div>
              {(missingScrews || isDamaged) && (
                <div className="border-t border-gray-200 my-4"></div>
              )}
              {missingScrews || isDamaged ? (
                <div className="mb-4">
                  <label
                    htmlFor="correctionMethod"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Método de corrección:
                  </label>
                  <input
                    type="text"
                    id="correctionMethod"
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="border-t border-gray-200 my-4"></div>
              <div className="mb-4">
                <label htmlFor="classification" className="block text-sm font-medium text-gray-700">
                  Clasificación del magazine:
                </label>
                <select
                  id="classification"
                  onChange={(e) => setSelected(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="good">Bueno</option>
                  <option value="repaired">Reparado</option>
                  <option value="damaged">Dañado</option>
                </select>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enviar
                </button>
              </div>
            </>
          )}
        </form>
        {successMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md animate-fadeIn">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md animate-fadeIn">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  )
}

export default MagazineMantoTracker
