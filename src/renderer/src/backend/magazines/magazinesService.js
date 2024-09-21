import { queryDatabase, insertIntoDatabase } from '../dbService'

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
    // Comprobar que todos los datos estén llenos, excepto observation_damage y comment que pueden estar vacíos
    const requiredFields = [id, damage, screws_count, status, id_user]
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
      'SELECT * FROM maintenance_magazines WHERE id_magazine = ?',
      [id]
    )

    if (maintenanceExists.length > 0) {
      await insertIntoDatabase(
        'UPDATE maintenance_magazines SET current_maintenance = ?, next_maintenance = ?, status = ?, damage = ?, observation_damage = ?, screws_count = ?, id_user = ?, comments = ? audited = ? WHERE id_magazine = ?',
        [
          today,
          nextMaintenance,
          status,
          damage,
          observation_damage,
          screws_count,
          id_user,
          comment,
          0,
          id
        ]
      )
    } else {
      await insertIntoDatabase(
        'INSERT INTO maintenance_magazines (id_magazine, next_maintenance, status, damage, observation_damage, screws_count, id_user, comments, audited) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, nextMaintenance, status, damage, observation_damage, screws_count, id_user, comment, 0]
      )
    }

    return { success: true, message: 'Mantenimiento registrado' }
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
    // Comprobar que todos los datos estén llenos, excepto observation_damage y comment que pueden estar vacíos
    const requiredFields = [id, damage, screws_count, status, id_user]
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
    const existMagazineId = await queryDatabase('SELECT * FROM magazines WHERE id = ?', [id])

    if (existMagazineId.length > 0) {
      return { success: false, message: 'El magazine con este ID ya existe' }
    } else {
      //registrar magazine
      await insertIntoDatabase(
        'INSERT INTO magazines (id, size, status, damage, observation_damage, screws_count, create_at, last_maintenance, next_maintenance, user, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
          id_user,
          comment
        ]
      )
      //registrar mantenimiento magazine
      const maintenanceExists = await queryDatabase(
        'SELECT * FROM maintenance_magazines WHERE id_magazine = ?',
        [id]
      )
      if (maintenanceExists.length > 0) {
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

export const getExpiredMagazines = async () => {
  const now = new Date().toISOString()
  return await queryDatabase('SELECT * FROM maintenance_magazines WHERE next_maintenance < ?', [
    now
  ])
}

export const getAboutToExpireMagazines = async () => {
  // Obtén la fecha actual como objeto Date
  const now = new Date()

  // Obtén la fecha de un mes a partir de ahora
  const oneMonthFromNow = new Date(now)
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)

  // Formatea las fechas para la consulta
  const nowISOString = now.toISOString()
  const oneMonthFromNowISOString = oneMonthFromNow.toISOString()

  // Realiza la consulta en la base de datos
  const query = `
    SELECT * FROM maintenance_magazines
    WHERE next_maintenance >= ? AND next_maintenance < ?
  `
  return await queryDatabase(query, [nowISOString, oneMonthFromNowISOString])
}

export const getAuditedMagazines = async () => {
  // Obtén la fecha actual como objeto Date
  const now = new Date()

  // Obtén la fecha de un mes a partir de ahora
  const oneMonthFromNow = new Date(now)
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)

  // Formatea las fechas para la consulta
  const oneMonthFromNowISOString = oneMonthFromNow.toISOString()

  // Realiza la consulta en la base de datos
  const query = `
    SELECT * FROM maintenance_magazines
    WHERE next_maintenance >= ? AND status IN ('good', 'repaired', 'desconocido')  AND audited = 0
  `
  return await queryDatabase(query, [oneMonthFromNowISOString])
}

export const getGoodConditionMagazines = async () => {
  // Obtén la fecha actual como objeto Date
  const now = new Date()

  // Obtén la fecha de un mes a partir de ahora
  const oneMonthFromNow = new Date(now)
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)

  // Formatea las fechas para la consulta
  const oneMonthFromNowISOString = oneMonthFromNow.toISOString()

  // Realiza la consulta en la base de datos
  const query = `
    SELECT * FROM maintenance_magazines
    WHERE next_maintenance >= ? AND status IN ('good', 'repaired', 'desconocido') 
  `
  return await queryDatabase(query, [oneMonthFromNowISOString])
}

export const auditerCheck = async () => {}
