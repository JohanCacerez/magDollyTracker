// backend/users/userService.js

import { queryDatabase, insertIntoDatabase } from '../dbService'

export const getAllUsers = async () => {
  return queryDatabase('SELECT * FROM users', [])
}

export const createUser = async (name) => {
  return insertIntoDatabase('INSERT INTO users (name) VALUES (?)', [name])
}

export const loginUser = async (name, password) => {
  const users = await queryDatabase('SELECT * FROM users WHERE name = ? AND password = ?', [
    name,
    password
  ])
  if (users.length > 0) {
    return { success: true, users: users[0] }
  } else {
    return { success: false, message: 'Nombre de usuario o contraseña incorrectos' }
  }
}

// Otras funciones CRUD para usuarios pueden ir aquí
