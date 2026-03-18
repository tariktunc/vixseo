import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@/db/schema'

function createDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL env değişkeni bulunamadı')
  }
  const sql = neon(process.env.DATABASE_URL)
  return drizzle(sql, { schema })
}

// Lazy singleton — sadece çağrıldığında bağlantı kurar
let _db: ReturnType<typeof createDb> | null = null

export function getDb() {
  if (!_db) _db = createDb()
  return _db
}

// Backward compat
export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_, prop) {
    return (getDb() as any)[prop]
  },
})
