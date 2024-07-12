// backend/users/userService.js

import { queryDatabase, insertIntoDatabase } from '../dbService'
import jwt from 'jsonwebtoken'

const secretKey = 'clave_secreta'

export const getAllUsers = async () => {
  return queryDatabase('SELECT * FROM users', [])
}

export const createUser = async (name, password) => {
  return insertIntoDatabase('INSERT INTO users (name, password) VALUES (?, ?)', [name, password])
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

// Otras funciones CRUD para usuarios pueden ir aquí
