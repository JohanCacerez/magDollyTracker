import { ipcMain } from 'electron'
import { maintenanceMagazine, searchMagazineById, updateMagazine } from './magazinesService'

export const magazineIPCListeners = () => {
  ipcMain.handle('search-magazine-by-id', async (_, id) => {
    return searchMagazineById(id)
  })
  ipcMain.handle(
    'update-magazine',
    async (_, id, damage, observation_damage, screws_count, comment, status, idUser) => {
      return updateMagazine(id, damage, observation_damage, screws_count, comment, status, idUser)
    }
  )
}
