// backend/users/userController.js

import { ipcMain } from 'electron'
import { getAllUsers, createUser, loginUser } from './userService'

export const registerUserIPCListeners = () => {
  ipcMain.handle('get-users', async () => {
    return getAllUsers()
  })

  ipcMain.handle('create-user', async (_, name, password) => {
    return createUser(name, password)
  })

  ipcMain.handle('login-user', async (_, name, password) => {
    return loginUser(name, password)
  })

  // Otras funciones IPC relacionadas con usuarios pueden ir aquí
}
