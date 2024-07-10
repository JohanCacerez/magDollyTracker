// backend/users/userService.js

import { queryDatabase, insertIntoDatabase } from '../dbService'

export const getAllUsers = async () => {
  return queryDatabase('SELECT * FROM users', [])
}

export const createUser = async (name) => {
  return insertIntoDatabase('INSERT INTO users (name) VALUES (?)', [name])
}

// Otras funciones CRUD para usuarios pueden ir aquí
