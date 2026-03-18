/**
 * seed.ts — Başlangıç işletmelerini DB'ye ekler
 *
 * Kullanım:
 *   npx tsx src/db/seed.ts
 */

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { businesses } from './schema'
import 'dotenv/config'

const SEED_DATA = [
  {
    name: 'blakfy',
    domain: 'blakfy.com',
    siteId: '7a2f84ce-61de-4785-b61d-e81718514e0a',
    memberId: '4efb86b2-aee1-4927-ab61-48cb8c35f128',
    language: 'tr',
    searchConsoleUrl: 'https://www.blakfy.com/',
  },
  {
    name: 'ibrahiminyeri',
    domain: 'ibrahiminyeri.com',
    siteId: 'a471328e-719b-4aad-b0bb-dd3e5f4f3015',
    memberId: '51894242-999d-442a-a76b-7848dc97388e',
    language: 'tr',
    searchConsoleUrl: 'https://www.ibrahiminyeri.com/',
  },
]

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL env değişkeni bulunamadı')
    process.exit(1)
  }

  const sql = neon(process.env.DATABASE_URL)
  const db = drizzle(sql)

  console.log('Seed başlıyor...\n')

  for (const data of SEED_DATA) {
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
