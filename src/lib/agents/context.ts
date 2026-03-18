import * as fs from 'fs/promises'
import * as path from 'path'

const SITES_DIR = path.resolve(process.cwd(), '..', 'sites')

async function readFileOrEmpty(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf-8')
  } catch {
    return ''
  }
}

async function readJsonOrEmpty(filePath: string): Promise<unknown[]> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch {
    return []
  }
}

export async function loadBrandContext(businessName: string): Promise<string> {
  const siteDir = path.join(SITES_DIR, businessName)
  return readFileOrEmpty(path.join(siteDir, 'brand.md'))
}

export async function loadCategories(businessName: string): Promise<string[]> {
  const siteDir = path.join(SITES_DIR, businessName)
  const data = await readJsonOrEmpty(path.join(siteDir, 'categories.json'))
  // categories.json: [{ slug: "seo", name: "SEO" }, ...]
  return (data as Array<{ slug?: string }>).map((c) => c.slug).filter(Boolean) as string[]
}

export async function loadTags(businessName: string): Promise<string[]> {
  const siteDir = path.join(SITES_DIR, businessName)
  const data = await readJsonOrEmpty(path.join(siteDir, 'tags.json'))
  return (data as Array<{ slug?: string }>).map((t) => t.slug).filter(Boolean) as string[]
}

export async function loadConfig(businessName: string): Promise<Record<string, unknown>> {
  const siteDir = path.join(SITES_DIR, businessName)
  try {
    const content = await fs.readFile(path.join(siteDir, 'config.json'), 'utf-8')
    return JSON.parse(content)
  } catch {
    return {}
  }
}

export async function loadFullContext(businessName: string) {
  const [brandContext, categories, tags, config] = await Promise.all([
    loadBrandContext(businessName),
    loadCategories(businessName),
    loadTags(businessName),
    loadConfig(businessName),
  ])

  return { brandContext, categories, tags, config }
}
