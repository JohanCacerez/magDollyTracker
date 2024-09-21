import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'

const MagazineReview = () => {
  const [expiredMagazines, setExpiredMagazines] = useState([])
  const [aboutToExpireMagazines, setAboutToExpireMagazines] = useState([])
  const [goodConditionMagazines, setGoodConditionMagazines] = useState([])
  const [auidtedMagazines, setAuditedMagazines] = useState([])
  const [selectedMagazines, setSelectedMagazines] = useState([]) // Estado para los magazines seleccionados
  const [userNames, setUserNames] = useState({})
  const { user } = useUser()

  const isAuditor = user && (user.range === 'auditor' || user.range === 'admin')

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const expiredResponse = await window.api.getExpiredMagazines()
        setExpiredMagazines(expiredResponse)
        const aboutToExpireResponse = await window.api.getAboutToExpireMagazines()
        setAboutToExpireMagazines(aboutToExpireResponse)
        const goodConditionResponse = await window.api.getGoodMagazines()
        setGoodConditionMagazines(goodConditionResponse)
        const auditedResponse = await window.api.getAuditedMagazines()
        setAuditedMagazines(auditedResponse)

        const userIds = new Set([
          ...expiredResponse.map((m) => m.id_user),
          ...aboutToExpireResponse.map((m) => m.id_user),
          ...goodConditionResponse.map((m) => m.id_user),
          ...auditedResponse.map((m) => m.id_user)
        ])

        const userNamesTemp = {}
        for (const id of userIds) {
          const response = await window.api.searchUserById(id)
          if (response.success) {
            userNamesTemp[id] = response.user[0].name
          } else {
            userNamesTemp[id] = 'Usuario no encontrado'
          }
        }
        setUserNames(userNamesTemp)
      } catch (error) {
        console.log('error fetching magazines ', error)
      }
    }

    fetchMagazines()
  }, [])

  const formatDateString = (dateString) => new Date(dateString).toLocaleDateString()

  // Manejar cambios en los checkboxes
  const handleCheckboxChange = (id_magazine) => {
    setSelectedMagazines(
      (prevSelected) =>
        prevSelected.includes(id_magazine)
          ? prevSelected.filter((id) => id !== id_magazine) // Si ya está seleccionado, lo deselecciona
          : [...prevSelected, id_magazine] // Si no está seleccionado, lo agrega
    )
  }

  const handleMarkAsAudited = async (id) => {
    const result = await window.api.markMagazineAsAudited(id)
    if (result.success) {
      console.log('correcto auditado')
    } else {
      console.log('auditado incorrecto')
    }
  }

  // Función para actualizar las tablas
  const updateAuditor = async () => {
    // Itera sobre los magazines seleccionados y llama a la función para marcar cada uno como auditado
    for (const id of selectedMagazines) {
      await handleMarkAsAudited(id)
    }

    // Actualiza las tablas después de marcar los magazines como auditados
    const updatedAuditedMagazines = auidtedMagazines.filter(
      (magazine) => !selectedMagazines.includes(magazine.id_magazine)
    )
    const magazinesToMove = auidtedMagazines.filter((magazine) =>
      selectedMagazines.includes(magazine.id_magazine)
    )

    // Actualizar las tablas
    setAuditedMagazines(updatedAuditedMagazines)
    setGoodConditionMagazines([...goodConditionMagazines, ...magazinesToMove])

    // Limpiar la selección
    setSelectedMagazines([])
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="table-container h-64 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Magazines con Mantenimiento Vencido</h2>
        <table className="table-auto w-full border border-red-500 bg-red-100">
          <thead>
            <tr className="bg-red-200">
              <th className="w-1/12 p-2 border border-red-400">ID</th>
              <th className="w-1/12 p-2 border border-red-400">Fecha de Mantenimiento</th>
              <th className="w-1/12 p-2 border border-red-400">Fecha de sig. mantenimiento</th>
              <th className="w-1/12 p-2 border border-red-400">Estado</th>
              <th className="w-1/12 p-2 border border-red-400">Dañado</th>
              <th className="w-2/12 p-2 border border-red-400">Comentario del daño</th>
              <th className="w-1/12 p-2 border border-red-400">Tornillos faltantes</th>
              <th className="w-1/12 p-2 border border-red-400">Usuario</th>
              <th className="w-2/12 p-2 border border-red-400">Comentario</th>
            </tr>
          </thead>
          <tbody>
            {expiredMagazines.map((magazine) => (
              <tr key={magazine.id} className="bg-red-50 hover:bg-red-200">
                <td className="p-2 border border-red-400">{magazine.id_magazine}</td>
                <td className="p-2 border border-red-400">
                  {formatDateString(magazine.current_maintenance)}
                </td>
                <td className="p-2 border border-red-400">
                  {formatDateString(magazine.next_maintenance)}
                </td>
                <td className="p-2 border border-red-400">{magazine.status}</td>
                <td className="p-2 border border-red-400">{magazine.damaged ? 'Sí' : 'No'}</td>
                <td className="p-2 border border-red-400">{magazine.damageComment}</td>
                <td className="p-2 border border-red-400">{magazine.missingScrews}</td>
                <td className="p-2 border border-red-400">
                  {userNames[magazine.id_user] || magazine.id_user}
                </td>
                <td className="p-2 border border-red-400">{magazine.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="table-container h-64 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Magazines por vencer</h2>
        <table className="table-auto w-full border border-yellow-500 bg-yellow-100">
          <thead>
            <tr className="bg-yellow-200">
              <th className="w-1/12 p-2 border border-yellow-400">ID</th>
              <th className="w-1/12 p-2 border border-yellow-400">Fecha de Mantenimiento</th>
              <th className="w-1/12 p-2 border border-yellow-400">Fecha de sig. mantenimiento</th>
              <th className="w-1/12 p-2 border border-yellow-400">Estado</th>
              <th className="w-1/12 p-2 border border-yellow-400">Dañado</th>
              <th className="w-2/12 p-2 border border-yellow-400">Comentario del daño</th>
              <th className="w-1/12 p-2 border border-yellow-400">Tornillos faltantes</th>
              <th className="w-1/12 p-2 border border-yellow-400">Usuario</th>
              <th className="w-2/12 p-2 border border-yellow-400">Comentario</th>
            </tr>
          </thead>
          <tbody>
            {aboutToExpireMagazines.map((magazine) => (
              <tr key={magazine.id} className="bg-yellow-50 hover:bg-yellow-200">
                <td className="p-2 border border-yellow-400">{magazine.id_magazine}</td>
                <td className="p-2 border border-yellow-400">
                  {formatDateString(magazine.current_maintenance)}
                </td>
                <td className="p-2 border border-yellow-400">
                  {formatDateString(magazine.next_maintenance)}
                </td>
                <td className="p-2 border border-yellow-400">{magazine.status}</td>
                <td className="p-2 border border-yellow-400">{magazine.damaged ? 'Sí' : 'No'}</td>
                <td className="p-2 border border-yellow-400">{magazine.damageComment}</td>
                <td className="p-2 border border-yellow-400">{magazine.missingScrews}</td>
                <td className="p-2 border border-yellow-400">
                  {userNames[magazine.id_user] || magazine.id_user}
                </td>
                <td className="p-2 border border-yellow-400">{magazine.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      {/* Tabla de magazines por revisar */}
      <div className="table-container h-64 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Magazines por revisar</h2>
        <table className="table-auto w-full border border-orange-500 bg-orange-100">
          <thead>
            <tr className="bg-orange-200">
              <th className="w-1/12 p-2 border border-orange-400">ID</th>
              <th className="w-1/12 p-2 border border-orange-400">Fecha de Mantenimiento</th>
              <th className="w-1/12 p-2 border border-orange-400">Fecha de sig. mantenimiento</th>
              <th className="w-1/12 p-2 border border-orange-400">Estado</th>
              <th className="w-1/12 p-2 border border-orange-400">Dañado</th>
              <th className="w-2/12 p-2 border border-orange-400">Comentario del daño</th>
              <th className="w-1/12 p-2 border border-orange-400">Tornillos faltantes</th>
              <th className="w-1/12 p-2 border border-orange-400">Usuario</th>
              <th className="w-2/12 p-2 border border-orange-400">Comentario</th>
              <th className="w-2/12 p-2 border border-orange-400">Auditado</th>
            </tr>
          </thead>
          <tbody>
            {auidtedMagazines.map((magazine) => (
              <tr key={magazine.id} className="bg-orange-50 hover:bg-orange-200">
                <td className="p-2 border border-orange-400">{magazine.id_magazine}</td>
                <td className="p-2 border border-orange-400">
                  {formatDateString(magazine.current_maintenance)}
                </td>
                <td className="p-2 border border-orange-400">
                  {formatDateString(magazine.next_maintenance)}
                </td>
                <td className="p-2 border border-orange-400">{magazine.status}</td>
                <td className="p-2 border border-orange-400">{magazine.damaged ? 'Sí' : 'No'}</td>
                <td className="p-2 border border-orange-400">{magazine.damageComment}</td>
                <td className="p-2 border border-orange-400">{magazine.missingScrews}</td>
                <td className="p-2 border border-orange-400">
                  {userNames[magazine.id_user] || magazine.id_user}
                </td>
                <td className="p-2 border border-orange-400">{magazine.comment}</td>
                <td className="p-2 border border-orange-400">
                  <input
                    type="checkbox"
                    disabled={!isAuditor} // Disabled if user is not an Auditor
                    className="form-checkbox text-orange-500"
                    onChange={() => handleCheckboxChange(magazine.id_magazine)}
                    checked={selectedMagazines.includes(magazine.id_magazine)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className={`font-bold py-2 px-4 rounded ${
            isAuditor
              ? 'bg-orange-500 hover:bg-orange-700 text-white'
              : 'bg-gray-500 text-gray-200 cursor-not-allowed'
          }`}
          disabled={!isAuditor}
          onClick={updateAuditor}
        >
          Enviar Revisión
        </button>
      </div>

      {/* Tabla de magazines en buen estado */}
      <div className="table-container h-64 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Magazines en Buen Estado</h2>
        <table className="table-auto w-full border border-green-500 bg-green-100">
          <thead>
            <tr className="bg-green-200">
              <th className="w-1/12 p-2 border border-green-400">ID</th>
              <th className="w-1/12 p-2 border border-green-400">Fecha de Mantenimiento</th>
              <th className="w-1/12 p-2 border border-green-400">Fecha de sig. mantenimiento</th>
              <th className="w-1/12 p-2 border border-green-400">Estado</th>
              <th className="w-1/12 p-2 border border-green-400">Dañado</th>
              <th className="w-2/12 p-2 border border-green-400">Comentario del daño</th>
              <th className="w-1/12 p-2 border border-green-400">Tornillos faltantes</th>
              <th className="w-1/12 p-2 border border-green-400">Usuario</th>
              <th className="w-2/12 p-2 border border-green-400">Comentario</th>
            </tr>
          </thead>
          <tbody>
            {goodConditionMagazines.map((magazine) => (
              <tr key={magazine.id} className="bg-green-50 hover:bg-green-200">
                <td className="p-2 border border-green-400">{magazine.id_magazine}</td>
                <td className="p-2 border border-green-400">
                  {formatDateString(magazine.current_maintenance)}
                </td>
                <td className="p-2 border border-green-400">
                  {formatDateString(magazine.next_maintenance)}
                </td>
                <td className="p-2 border border-green-400">{magazine.status}</td>
                <td className="p-2 border border-green-400">{magazine.damaged ? 'Sí' : 'No'}</td>
                <td className="p-2 border border-green-400">{magazine.damageComment}</td>
                <td className="p-2 border border-green-400">{magazine.missingScrews}</td>
                <td className="p-2 border border-green-400">
                  {userNames[magazine.id_user] || magazine.id_user}
                </td>
                <td className="p-2 border border-green-400">{magazine.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MagazineReview
