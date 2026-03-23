import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { docCategories, docArticles } from '@/lib/docs-data'

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await props.params
  const category = docCategories.find(c => c.id === categorySlug)
  
  if (!category) return notFound()

  const articles = docArticles.filter(a => a.categoryId === category.id)

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/docs" className="hover:text-foreground transition-colors">Dökümanlar</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground">{category.title}</span>
      </nav>

      <div className="mb-10 border-b border-border pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3">{category.title}</h1>
        <p className="text-lg text-muted-foreground">{category.description}</p>
      </div>
      
      <div className="space-y-4">
        {articles.map(article => (
          <Link 
            key={article.id} 
            href={`/docs/${category.id}/${article.id}`}
            className="block p-6 bg-card border border-border rounded-xl hover:bg-muted/50 hover:border-emerald-500/20 transition-all group shadow-sm hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-emerald-500 transition-colors">{article.title}</h2>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{article.description}</p>
            <div className="flex items-center text-xs text-slate-500 gap-4">
              <span className="bg-background px-2 py-1 rounded-md border border-border">⏱️ {article.readTime}</span>
              <span className="flex items-center text-emerald-500 font-medium">Bu rehberi oku <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
