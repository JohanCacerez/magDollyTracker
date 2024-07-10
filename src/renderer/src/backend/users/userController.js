// backend/users/userController.js

import { ipcMain } from 'electron'
import { getAllUsers, createUser } from './userService'

export const registerUserIPCListeners = () => {
  ipcMain.handle('get-users', async () => {
    return getAllUsers()
  })

  ipcMain.handle('create-user', async (_, name) => {
    return createUser(name)
  })

  // Otras funciones IPC relacionadas con usuarios pueden ir aquí
}
