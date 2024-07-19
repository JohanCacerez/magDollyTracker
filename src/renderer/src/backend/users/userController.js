// backend/users/userController.js

import { ipcMain } from 'electron'
import { getAllUsers, createUser, loginUser, SearchUserById, UserDelete } from './userService'

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
    return SearchUserById(id)
  })

  ipcMain.handle('user-delete', async (_, id) => {
    return UserDelete(id)
  })

  // Otras funciones IPC relacionadas con usuarios pueden ir aquí
}
