// backend/users/userService.js

import { queryDatabase, insertIntoDatabase } from '../dbService'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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
    const hashedPassword = await bcrypt.hash(password, 10)

    const query = 'INSERT INTO users (id, name, password, range) VALUES (?, ?, ?, ?)'
    await insertIntoDatabase(query, [id, name, hashedPassword, range])
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

// Otras funciones CRUD para usuarios pueden ir aquí
