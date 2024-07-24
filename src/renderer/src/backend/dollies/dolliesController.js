import { ipcMain } from 'electron'
import { registerDollie } from './dolliesService'

export const DollieIPCListeners = () => {
  ipcMain.handle(
    'register-dollie',
    async (_, id, damaged, observationDamage, screwsCount, comment, status, id_user) => {
      return registerDollie(id, damaged, observationDamage, screwsCount, comment, status, id_user)
    }
  )
}
