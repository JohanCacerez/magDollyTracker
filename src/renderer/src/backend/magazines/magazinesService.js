import { queryDatabase, insertIntoDatabase, runQuery } from '../dbService'

export const searchMagazineById = async (id) => {
  const magazines = await queryDatabase('SELECT * FROM magazines WHERE id = ?', [id])
  if (magazines.length > 0) {
    const magazine = magazines[0]
    return { success: true, magazine }
  } else {
    return { success: false }
  }
}

export const updateMagazine = async (
  id,
  damage,
  observation_damage,
  screws_count,
  comment,
  status,
  id_user
) => {
  try {
    // Obtener la fecha de hoy
    const today = new Date().toISOString().split('T')[0] // Formato 'YYYY-MM-DD'

    // Calcular la fecha para el próximo mantenimiento (dentro de un año)
    const nextMaintenanceDate = new Date()
    nextMaintenanceDate.setFullYear(nextMaintenanceDate.getFullYear() + 1)
    const nextMaintenance = nextMaintenanceDate.toISOString().split('T')[0] // Formato 'YYYY-MM-DD'

    // Ejecutar la consulta de actualización
    await insertIntoDatabase(
      `
          UPDATE magazines 
          SET 
            damage = ?, 
            observation_damage = ?, 
            screws_count = ?, 
            comment = ?, 
            status = ?, 
            last_maintenance = ?, 
            next_maintenance = ?
          WHERE id = ?
        `,
      [damage, observation_damage, screws_count, comment, status, today, nextMaintenance, id]
    )

    const maintenanceExists = await queryDatabase(
      'SELECT * FROM maintenance_magazines WHERE id = ?',
      [id]
    )
    if (maintenanceExists.length > 0) {
      console.log(id_user)
      await insertIntoDatabase(
        'UPDATE maintenance_magazines SET current_maintenance = ?, next_maintenance = ?, status = ?, damage = ?, observation_damage = ?, screws_count = ?, id_user = ?, comments = ? WHERE id_magazine = ?',
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
        'INSERT INTO maintenance_magazines  (id_magazine, next_maintenance, status, damage, observation_damage, screws_count, id_user, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, nextMaintenance, status, damage, observation_damage, screws_count, id_user, comment]
      )
    }
    return { success: true, message: 'mantenimiento registardo' }
  } catch (error) {
    return {
      success: false,
      message: `Ocurrió un error al actualizar los datos del magazine, error: ${error}`
    }
  }
}

export const registerMagazine = async (
  id,
  size,
  damage,
  observation_damage,
  screws_count,
  comment,
  status,
  id_user
) => {
  try {
    // Obtener la fecha de hoy
    const today = new Date().toISOString().split('T')[0] // Formato 'YYYY-MM-DD'

    // Calcular la fecha para el próximo mantenimiento (dentro de un año)
    const nextMaintenanceDate = new Date()
    nextMaintenanceDate.setFullYear(nextMaintenanceDate.getFullYear() + 1)
    const nextMaintenance = nextMaintenanceDate.toISOString().split('T')[0] // Formato 'YYYY-MM-DD'

    //comprobar si existe ya ese id
    const existMagazineId = await queryDatabase('SELECT * FROM magazines WHERE id = ?', [id])

    if (existMagazineId.length > 0) {
      return { success: false, message: 'El magazine con este ID ya existe' }
    } else {
      //registrar magazine
      await insertIntoDatabase(
        'INSERT INTO magazines (id, size, status, damage, observation_damage, screws_count, create_at, last_maintenance, next_maintenance, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          id,
          size,
          status,
          damage,
          observation_damage,
          screws_count,
          today,
          today,
          nextMaintenance,
          comment
        ]
      )
      //registrar mantenimiento magazine
      const maintenanceExists = await queryDatabase(
        'SELECT * FROM maintenance_magazines WHERE id_magazine = ?',
        [id]
      )
      if (maintenanceExists.length > 0) {
        console.log(id_user)
        await insertIntoDatabase(
          'UPDATE maintenance_magazines SET current_maintenance = ?, next_maintenance = ?, status = ?, damage = ?, observation_damage = ?, screws_count = ?, id_user = ?, comments = ? WHERE id_magazine = ?',
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
          'INSERT INTO maintenance_magazines  (id_magazine, next_maintenance, status, damage, observation_damage, screws_count, id_user, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [id, nextMaintenance, status, damage, observation_damage, screws_count, id_user, comment]
        )
      }
      return { success: true, message: 'Mantenimiento registrado' }
    }
  } catch (error) {
    return {
      success: false,
      message: `Ocurrió un error al actualizar los datos del magazine, error: ${error}`
    }
  }
}
