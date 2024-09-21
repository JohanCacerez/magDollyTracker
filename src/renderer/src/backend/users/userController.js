// backend/users/userController.js

import { ipcMain } from 'electron'
import { getAllUsers, createUser, loginUser, SearchUserById, UserDelete } from './userService'
import { insertMany } from '../dbService'

export const registerUserIPCListeners = () => {
  ipcMain.handle('get-users', async () => {
    return getAllUsers()
  })

  ipcMain.handle('create-user', async (_, id, name, password, range) => {
    return createUser(id, name, password, range)
  })

  ipcMain.handle('login-user', async (_, name, password) => {
    return loginUser(name, password)
  })

  ipcMain.handle('search-user-by-id', async (_, id) => {
    const result = await SearchUserById(id)
    return result
  })

  ipcMain.handle('user-delete', async (_, id) => {
    return UserDelete(id)
  })
  //pasar a utilidades
  ipcMain.handle('insert', async (_, magazines) => {
    return insertMany(magazines)
  })

  // Otras funciones IPC relacionadas con usuarios pueden ir aquí
}
