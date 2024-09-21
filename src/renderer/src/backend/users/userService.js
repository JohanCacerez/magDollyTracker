// backend/users/userService.js

import { queryDatabase, insertIntoDatabase, runQuery } from '../dbService'
import jwt from 'jsonwebtoken'
const secretKey = 'clave_secreta'

export const getAllUsers = async () => {
  return queryDatabase('SELECT * FROM users', [])
}

export const createUser = async (id, name, password, range) => {
  try {
    const existUserId = await queryDatabase('SELECT * FROM users WHERE id = ?', [id])
    if (existUserId.length > 0) {
      return { success: false, message: 'El usuario con este ID ya existe' }
    }

    const query = 'INSERT INTO users (id, name, password, range) VALUES (?, ?, ?, ?)'
    await insertIntoDatabase(query, [id, name, password, range])
    return { success: true }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, message: 'Error creando el usuario' }
  }
}

export const loginUser = async (name, password) => {
  const users = await queryDatabase('SELECT * FROM users WHERE name = ? AND password = ?', [
    name,
    password
  ])
  if (users.length > 0) {
    const user = users[0]
    const token = jwt.sign({ id: user.id, name: user.name, range: user.range }, secretKey, {
      expiresIn: '1h'
    })
    return { success: true, token, user }
  } else {
    return { success: false, message: 'Nombre de usuario o contraseña incorrectos' }
  }
}

export const SearchUserById = async (id) => {
  const user = await queryDatabase('SELECT * FROM users WHERE id = ?', [String(id)])
  if (user.length > 0) {
    return { success: true, user }
  } else {
    return { success: false }
  }
}

export const UserDelete = async (id) => {
  try {
    const result = await runQuery('DELETE FROM users WHERE id = ?', [id])
    if (result.changes > 0) {
      return { success: true, message: 'usuario eliminado' }
    } else {
      return { success: false, message: 'Usuario no encontrado' }
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    return { success: false, message: 'Error eliminando el usuario' }
  }
}

// Otras funciones CRUD para usuarios pueden ir aquí
