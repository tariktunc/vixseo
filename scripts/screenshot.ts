/**
 * Sayfa screenshot aracı — QA runner ve test için
 * Kullanım: npx tsx scripts/screenshot.ts <url> [output-path]
 * Örnek: npx tsx scripts/screenshot.ts http://localhost:3000/blakfy/analytics screenshots/analytics.png
 */
import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

async function main() {
  const url = process.argv[2]
  const outputPath = process.argv[3] || `screenshots/${Date.now()}.png`

  if (!url) {
    console.error('Kullanım: npx tsx scripts/screenshot.ts <url> [output-path]')
    process.exit(1)
  }

  // screenshots dizini yoksa oluştur
  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })

  // Clerk dev login cookie gerekebilir — public sayfalar için sorunsuz
  // Auth gereken sayfalar redirect olabilir
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

  // Sayfanın yüklenmesini bekle
  await new Promise((r) => setTimeout(r, 2000))

  await page.screenshot({ path: outputPath, fullPage: true })
  console.log(`Screenshot: ${path.resolve(outputPath)}`)
  console.log(`URL: ${url}`)
  console.log(`Sayfa başlığı: ${await page.title()}`)

  await browser.close()
  process.exit(0)
}

main().catch((err) => {
  console.error('Screenshot hatası:', err.message)
  process.exit(1)
})
