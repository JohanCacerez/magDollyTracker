// dbService.js

import { join } from 'path'
import { Database } from 'sqlite3'
import { app } from 'electron'

const dbPath = join(app.getPath('userData'), 'database.sqlite')
const db = new Database(dbPath)

export const initializeDatabase = () => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
  })
}

export const queryDatabase = async (query, params) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

export const insertIntoDatabase = async (query, params) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({ id: this.lastID })
      }
    })
  })
}
