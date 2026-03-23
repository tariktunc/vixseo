import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Clock } from 'lucide-react'
import { docCategories, docArticles } from '@/lib/docs-data'

export default async function ArticlePage(props: { params: Promise<{ category: string, slug: string }> }) {
  const { category: categorySlug, slug } = await props.params
  
  const article = docArticles.find(a => a.id === slug && a.categoryId === categorySlug)
  if (!article) return notFound()
  
  const category = docCategories.find(c => c.id === categorySlug)

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/docs" className="hover:text-foreground transition-colors shrink-0">Dökümanlar</Link>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
        <Link href={`/docs/${category?.id}`} className="hover:text-foreground transition-colors shrink-0">{category?.title}</Link>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
        <span className="text-foreground shrink-0">{article.title}</span>
      </nav>

      {/* Article Header */}
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-[1.1]">
        {article.title}
      </h1>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-8 border-b border-border/60">
        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-500" /> {article.readTime} okuma süresi</span>
      </div>

      {/* Article Content */}
      <div 
        className="max-w-none 
          [&>p]:text-lg [&>p]:text-slate-700 dark:[&>p]:text-slate-300 [&>p]:mb-6 [&>p]:leading-relaxed
          [&>h2]:text-3xl [&>h2]:font-extrabold [&>h2]:text-foreground [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:tracking-tight
          [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mt-10 [&>h3]:mb-4
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul]:text-slate-700 dark:[&>ul]:text-slate-300 [&>ul>li]:mb-2
          [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol]:text-slate-700 dark:[&>ol]:text-slate-300 [&>ol>li]:mb-2
          [&_a]:text-emerald-500 hover:[&_a]:text-emerald-400 [&_a]:underline
          [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-500 [&>blockquote]:my-8 [&>blockquote]:bg-emerald-500/5 [&>blockquote]:py-2 [&>blockquote]:rounded-r-lg
          [&_strong]:text-foreground [&_strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
    </div>
  )
}
