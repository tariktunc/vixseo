import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChevronRight,
  BookOpen,
  FileText,
  Rocket,
  Star,
  CreditCard,
  Wrench,
  Search,
  Sparkles,
  Globe,
  MessageCircle,
} from 'lucide-react'
import { docCategories, docArticles } from '@/lib/docs-data'
import { CategoryArticleList } from '@/components/docs/category-article-list'

// Icon map matching docs-data.ts category.icon values
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'rocket': Rocket,
  'star': Star,
  'credit-card': CreditCard,
  'wrench': Wrench,
  'search': Search,
  'sparkles': Sparkles,
  'globe': Globe,
  'message-circle': MessageCircle,
}

// Knowledge base category IDs (SEO bilgi bankasi)
const KNOWLEDGE_BASE_IDS = new Set([
  'seo-temelleri',
  'sem-reklam',
  'ai-seo',
  'geo',
  'aeo',
])

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function parseReadTimeMinutes(readTime: string): number {
  const match = readTime.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 5
}

function getArticleLevel(index: number, total: number): 'beginner' | 'intermediate' | 'advanced' {
  if (total <= 1) return 'beginner'
  const ratio = index / (total - 1)
  if (ratio < 0.34) return 'beginner'
  if (ratio < 0.67) return 'intermediate'
  return 'advanced'
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await props.params
  const category = docCategories.find(c => c.id === categorySlug)

  if (!category) return notFound()

  const articles = docArticles.filter(a => a.categoryId === category.id)
  const isKnowledgeBase = KNOWLEDGE_BASE_IDS.has(category.id)
  const CategoryIcon = iconMap[category.icon] || BookOpen

  // Prepare article data for client component
  const articleItems = articles.map((article, index) => {
    const plainText = stripHtml(article.content)
    const excerpt = plainText.length > 150 ? plainText.slice(0, 150) + '...' : plainText
    return {
      id: article.id,
      categoryId: article.categoryId,
      title: article.title,
      description: article.description,
      readTime: article.readTime,
      excerpt,
      level: getArticleLevel(index, articles.length),
      readTimeMinutes: parseReadTimeMinutes(article.readTime),
      originalIndex: index,
    }
  })

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground transition-colors">
          Dökümanlar
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground">{category.title}</span>
      </nav>

      {/* Category hero section */}
      <div className="mb-10 border-b border-border pb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
            <CategoryIcon className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">
              {category.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
          <span className="inline-flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-lg border border-border">
            <FileText className="w-4 h-4 text-emerald-500" />
            {articles.length} makale
          </span>
          {isKnowledgeBase && (
            <span className="inline-flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-lg border border-border">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              SEO Bilgi Bankası
            </span>
          )}
        </div>
      </div>

      {/* Articles list with sorting */}
      <CategoryArticleList
        articles={articleItems}
        categorySlug={category.id}
        isKnowledgeBase={isKnowledgeBase}
      />
    </div>
  )
}
