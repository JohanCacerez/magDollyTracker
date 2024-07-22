import { ipcMain } from 'electron'
import { registerMagazine, searchMagazineById, updateMagazine } from './magazinesService'

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
  ipcMain.handle(
    'register-magazine',
    async (_, id, size, damaged, observationDamage, screwsCount, comment, status, id_user) => {
      return registerMagazine(
        id,
        size,
        damaged,
        observationDamage,
        screwsCount,
        comment,
        status,
        id_user
      )
    }
  )
}
