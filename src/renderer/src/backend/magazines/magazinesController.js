import { ipcMain } from 'electron'
import {
  registerMagazine,
  searchMagazineById,
  updateMagazine,
  getExpiredMagazines,
  getAboutToExpireMagazines,
  getGoodConditionMagazines,
  getAuditedMagazines,
  markMagazineAsAudited
} from './magazinesService'

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
  ipcMain.handle('get-expired-magazines', async (_) => {
    return getExpiredMagazines()
  })
  ipcMain.handle('get-about-to-expired-magazines', async (_) => {
    return getAboutToExpireMagazines()
  })
  ipcMain.handle('get-good-magazines', async (_) => {
    return getGoodConditionMagazines()
  })
  ipcMain.handle('get-audited-magazines', async (_) => {
    return getAuditedMagazines()
  })
  ipcMain.handle('mark-magazine-as-audited', async (_, id) => {
    return markMagazineAsAudited(id)
  })
}
