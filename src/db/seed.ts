/**
 * seed.ts — Başlangıç işletmelerini DB'ye ekler
 *
 * Kullanım:
 *   npx tsx src/db/seed.ts
 */

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { businesses } from './schema'
import { DEFAULT_BUSINESSES } from './default-businesses'
import { config } from 'dotenv'
config({ path: '.env.local' })
config()

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL env değişkeni bulunamadı')
    process.exit(1)
  }

  const sql = neon(process.env.DATABASE_URL)
  const db = drizzle(sql)

  console.log('Seed başlıyor...\n')

  for (const data of DEFAULT_BUSINESSES) {
    try {
      const [created] = await db
        .insert(businesses)
        .values(data)
        .onConflictDoNothing()
        .returning()

      if (created) {
        console.log(`  ✅ ${data.domain} eklendi (${created.id})`)
      } else {
        console.log(`  ⏭  ${data.domain} zaten mevcut`)
      }
    } catch (err) {
      console.error(`  ❌ ${data.domain}:`, (err as Error).message)
    }
  }

  console.log('\nSeed tamamlandı.')
}

seed()
