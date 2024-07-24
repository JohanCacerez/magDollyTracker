import React, { useEffect, useState } from 'react'

const MagazineReview = () => {
  const [expiredMagazines, setExpiredMagazines] = useState([])
  const [aboutToExpireMagazines, setAboutToExpireMagazines] = useState([])
  const [goodConditionMagazines, setGoodConditionMagazines] = useState([])
  const [userNames, setUserNames] = useState({})

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const expiredResponse = await window.api.getExpiredMagazines()
        setExpiredMagazines(expiredResponse)
        const aboutToExpireResponse = await window.api.getAboutToExpireMagazines()
        setAboutToExpireMagazines(aboutToExpireResponse)
        const goodConditionResponse = await window.api.getGoodMagazines()
        setGoodConditionMagazines(goodConditionResponse)

        const userIds = new Set([
          ...expiredResponse.map((m) => m.id_user),
          ...aboutToExpireResponse.map((m) => m.id_user),
          ...goodConditionResponse.map((m) => m.id_user)
        ])

        const userNamesTemp = {}
        for (const id of userIds) {
          const response = await window.api.searchUserById(id)
          console.log(`Response for user ID ${id}:`, response)
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

      <div className="table-container h-64 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Magazines por Vencer</h2>
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
