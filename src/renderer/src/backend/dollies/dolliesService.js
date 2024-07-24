import { queryDatabase, insertIntoDatabase } from '../dbService'

export const registerDollie = async (
  id,
  damage,
  observation_damage,
  screws_count,
  comment,
  status,
  id_user
) => {
  try {
    // Comprobar que todos los datos estén llenos, excepto observation_damage y comment que pueden estar vacíos
    const requiredFields = [id, id_user]
    const allRequiredFieldsFilled = requiredFields.every(
      (field) => field !== '' && field !== null && field !== undefined
    )

    if (!allRequiredFieldsFilled) {
      return { success: false, message: 'Faltan datos' }
    }

    // Obtener la fecha de hoy
    const today = new Date().toISOString().split('T')[0] // Formato 'YYYY-MM-DD'

    // Calcular la fecha para el próximo mantenimiento (dentro de un año)
    const nextMaintenanceDate = new Date()
    nextMaintenanceDate.setFullYear(nextMaintenanceDate.getFullYear() + 1)
    const nextMaintenance = nextMaintenanceDate.toISOString().split('T')[0] // Formato 'YYYY-MM-DD'

    //comprobar si existe ya ese id
    const existDollieId = await queryDatabase('SELECT * FROM dollies WHERE id = ?', [id])

    if (existDollieId.length > 0) {
      return { success: false, message: 'El dollie con este ID ya existe' }
    } else {
      //registrar dollie
      await insertIntoDatabase(
        'INSERT INTO dollies (id, status, damage, observation_damage, screws_count, create_at, last_maintenance, next_maintenance, user, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          id,
          status,
          damage,
          observation_damage,
          screws_count,
          today,
          today,
          nextMaintenance,
          id_user,
          comment
        ]
      )
      //registrar mantenimiento magazine
      const maintenanceExists = await queryDatabase(
        'SELECT * FROM maintenance_dollies WHERE id_dollie = ?',
        [id]
      )
      if (maintenanceExists.length > 0) {
        console.log(id_user)
        await insertIntoDatabase(
          'UPDATE maintenance_dollies SET current_maintenance = ?, next_maintenance = ?, status = ?, damage = ?, observation_damage = ?, screws_count = ?, id_user = ?, comments = ? WHERE id_magazine = ?',
          [
            today,
            nextMaintenance,
            status,
            damage,
            observation_damage,
            screws_count,
            id_user,
            comment,
            id
          ]
        )
      } else {
        await insertIntoDatabase(
          'INSERT INTO maintenance_dollies  (id_dollie, next_maintenance, status, damage, observation_damage, screws_count, id_user, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [id, nextMaintenance, status, damage, observation_damage, screws_count, id_user, comment]
        )
      }
      return { success: true, message: 'Mantenimiento registrado' }
    }
  } catch (error) {
    return {
      success: false,
      message: `Ocurrió un error al actualizar los datos del dollie, error: ${error}`
    }
  }
}
