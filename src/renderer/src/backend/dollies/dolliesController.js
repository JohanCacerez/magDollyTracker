import { ipcMain } from 'electron'
import {
  registerDollie,
  updateDollie,
  searchDollyById,
  getExpiredDollies,
  getAboutToExpireDollies,
  getGoodConditionDollies
} from './dolliesService'

export const DollieIPCListeners = () => {
  ipcMain.handle(
    'register-dollie',
    async (_, id, damaged, observationDamage, screwsCount, comment, status, id_user) => {
      return registerDollie(id, damaged, observationDamage, screwsCount, comment, status, id_user)
    }
  )
  ipcMain.handle(
    'update-dollie',
    async (_, id, damage, observation_damage, screws_count, comment, status, id_user) => {
      return updateDollie(id, damage, observation_damage, screws_count, comment, status, id_user)
    }
  )
  ipcMain.handle('search-dolly-by-id', async (_, id) => {
    return searchDollyById(id)
  })
  ipcMain.handle('get-expired-dollies', async (_) => {
    return getExpiredDollies()
  })
  ipcMain.handle('get-about-expired-dollies', async (_) => {
    return getAboutToExpireDollies()
  })
  ipcMain.handle('get-good-dollies', async (_) => {
    return getGoodConditionDollies()
  })
}
