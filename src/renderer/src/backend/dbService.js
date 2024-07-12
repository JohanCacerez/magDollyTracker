import { join } from 'path'
import Database from 'better-sqlite3'
import { app } from 'electron'

const dbPath = join(app.getPath('userData'), 'database.sqlite')
const db = Database(dbPath)

export const initializeDatabase = () => {
  db.exec('PRAGMA foreign_keys = ON')

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      password TEXT,
      range TEXT,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS magazines (
      id INTEGER PRIMARY KEY,
      name TEXT,
      size TEXT,
      status TEXT,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS dollies (
      id INTEGER PRIMARY KEY,
      name TEXT,
      status TEXT,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS maintenance_magazines (
      id INTEGER PRIMARY KEY,
      id_magazine INTEGER,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status TEXT,
      id_user INTEGER,
      comments TEXT,
      FOREIGN KEY (id_magazine) REFERENCES magazines(id),
      FOREIGN KEY (id_user) REFERENCES users(id)
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS maintenance_dollies (
      id INTEGER PRIMARY KEY,
      id_dollie INTEGER,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status TEXT,
      id_user INTEGER,
      comments TEXT,
      FOREIGN KEY (id_dollie) REFERENCES dollies(id),
      FOREIGN KEY (id_user) REFERENCES users(id)
    )
  `)
}

export const queryDatabase = (query, params) => {
  const stmt = db.prepare(query)
  return stmt.all(params)
}

export const insertIntoDatabase = (query, params) => {
  const stmt = db.prepare(query)
  const result = stmt.run(params)
  return { id: result.lastInsertRowid }
}
