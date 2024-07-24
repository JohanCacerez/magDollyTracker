import React, { useEffect, useState } from 'react'

function DollieReview() {
  const [expiredDollies, setExpiredDollies] = useState([])
  const [aboutToExpireDollies, setAboutToExpireDollies] = useState([])
  const [goodConditionDollies, setGoodConditionDollies] = useState([])
  const [userNames, setUserNames] = useState({})

  useEffect(() => {
    const fetchDollies = async () => {
      try {
        const expiredResponse = await window.api.getExpiredDollies()
        setExpiredDollies(expiredResponse)
        const aboutToExpireResponse = await window.api.getAboutToExpiredDollies()
        setAboutToExpireDollies(aboutToExpireResponse)
        const goodConditionResponse = await window.api.getGoodConditionDollies()
        setGoodConditionDollies(goodConditionResponse)

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
        console.log('error fetching dollies ', error)
      }
    }

    fetchDollies()
  }, [])

  const formatDateString = (dateString) => new Date(dateString).toLocaleDateString()

  return (
    <div className="flex flex-col space-y-8">
      <div className="table-container h-64 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Dollies con Mantenimiento Vencido</h2>
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
            {expiredDollies.map((dollie) => (
              <tr key={dollie.id} className="bg-red-50 hover:bg-red-200">
                <td className="p-2 border border-red-400">{dollie.id_dollie}</td>
                <td className="p-2 border border-red-400">
                  {formatDateString(dollie.current_maintenance)}
                </td>
                <td className="p-2 border border-red-400">
                  {formatDateString(dollie.next_maintenance)}
                </td>
                <td className="p-2 border border-red-400">{dollie.status}</td>
                <td className="p-2 border border-red-400">{dollie.damaged ? 'Sí' : 'No'}</td>
                <td className="p-2 border border-red-400">{dollie.damageComment}</td>
                <td className="p-2 border border-red-400">{dollie.missingScrews}</td>
                <td className="p-2 border border-red-400">
                  {userNames[dollie.id_user] || dollie.id_user}
                </td>
                <td className="p-2 border border-red-400">{dollie.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container h-64 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Dollies por Vencer</h2>
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
            {aboutToExpireDollies.map((dollie) => (
              <tr key={dollie.id} className="bg-yellow-50 hover:bg-yellow-200">
                <td className="p-2 border border-yellow-400">{dollie.id_dollie}</td>
                <td className="p-2 border border-yellow-400">
                  {formatDateString(dollie.current_maintenance)}
                </td>
                <td className="p-2 border border-yellow-400">
                  {formatDateString(dollie.next_maintenance)}
                </td>
                <td className="p-2 border border-yellow-400">{dollie.status}</td>
                <td className="p-2 border border-yellow-400">{dollie.damaged ? 'Sí' : 'No'}</td>
                <td className="p-2 border border-yellow-400">{dollie.damageComment}</td>
                <td className="p-2 border border-yellow-400">{dollie.missingScrews}</td>
                <td className="p-2 border border-yellow-400">
                  {userNames[dollie.id_user] || dollie.id_user}
                </td>
                <td className="p-2 border border-yellow-400">{dollie.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container h-64 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Dollies en Buen Estado</h2>
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
            {goodConditionDollies.map((dollie) => (
              <tr key={dollie.id} className="bg-green-50 hover:bg-green-200">
                <td className="p-2 border border-green-400">{dollie.id_dollie}</td>
                <td className="p-2 border border-green-400">
                  {formatDateString(dollie.current_maintenance)}
                </td>
                <td className="p-2 border border-green-400">
                  {formatDateString(dollie.next_maintenance)}
                </td>
                <td className="p-2 border border-green-400">{dollie.status}</td>
                <td className="p-2 border border-green-400">{dollie.damaged ? 'Sí' : 'No'}</td>
                <td className="p-2 border border-green-400">{dollie.damageComment}</td>
                <td className="p-2 border border-green-400">{dollie.missingScrews}</td>
                <td className="p-2 border border-green-400">
                  {userNames[dollie.id_user] || dollie.id_user}
                </td>
                <td className="p-2 border border-green-400">{dollie.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DollieReview
