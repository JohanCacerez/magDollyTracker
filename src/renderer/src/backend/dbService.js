// dbService.js

import { join } from 'path'
import { Database } from 'sqlite3'
import { app } from 'electron'

const dbPath = join(app.getPath('userData'), 'database.sqlite')
console.log(dbPath)
const db = new Database(dbPath)

export const initializeDatabase = () => {
  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON')
    db.run(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, password TEXT, range TEXT, create_at DEFAULT CURRENT_TIMESTAMP )'
    )
    db.run(
      'CREATE TABLE IF NOT EXISTS magazines (id INTEGER PRIMARY KEY, name TEXT, size TEXT, status TEXT, create_at DEFAULT CURRENT_TIMESTAMP )'
    )
    db.run(
      'CREATE TABLE IF NOT EXISTS dollies (id INTEGER PRIMARY KEY, name TEXT, status TEXT, create_at DEFAULT CURRENT_TIMESTAMP )'
    )
    db.run(
      'CREATE TABLE IF NOT EXISTS maintenance_magazines (id INTEGER PRIMARY KEY, id_magazine INTEGER, create_at DEFAULT CURRENT_TIMESTAMP, status TEXT, id_user INTEGER, comments TEXT, FOREIGN KEY (id_magazine) REFERENCES magazines(id), FOREIGN KEY (id_user) REFERENCES users(id) )'
    )
    db.run(
      'CREATE TABLE IF NOT EXISTS maintenance_dollies (id INTEGER PRIMARY KEY, id_dollie INTEGER, create_at DEFAULT CURRENT_TIMESTAMP, status TEXT, id_user INTEGER, comments TEXT, FOREIGN KEY (id_dollie) REFERENCES dollies(id), FOREIGN KEY (id_user) REFERENCES users(id) )'
    )
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
