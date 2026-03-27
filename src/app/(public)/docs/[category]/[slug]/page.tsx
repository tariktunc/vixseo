import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Clock, BookOpen } from 'lucide-react'

import { docCategories, docArticles } from '@/lib/docs-data'
import { ReadingProgress } from '@/components/docs/reading-progress'
import { ArticleToc } from '@/components/docs/article-toc'
import { ArticleFeedback } from '@/components/docs/article-feedback'

import type { TocItem } from '@/components/docs/article-toc'

// Parse heading tags from HTML content and generate TOC items + inject IDs
function parseHeadings(html: string): { toc: TocItem[]; enrichedHtml: string } {
  const toc: TocItem[] = []
  let counter = 0

  const enrichedHtml = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, text: string) => {
      // Strip inner HTML tags for plain text
      const plainText = text.replace(/<[^>]*>/g, '').trim()
      const level = tag.toLowerCase() === 'h2' ? 2 : 3
      const id = `heading-${counter++}`

      toc.push({ id, text: plainText, level })

      return `<${tag}${attrs} id="${id}">${text}</${tag}>`
    }
  )

  return { toc, enrichedHtml }
}

export default async function ArticlePage(props: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categorySlug, slug } = await props.params

  const article = docArticles.find((a) => a.id === slug && a.categoryId === categorySlug)
  if (!article) return notFound()

  const category = docCategories.find((c) => c.id === categorySlug)

  // Find prev/next articles within the same category
  const categoryArticles = docArticles.filter((a) => a.categoryId === categorySlug)
  const currentIndex = categoryArticles.findIndex((a) => a.id === slug)
  const prevArticle = currentIndex > 0 ? categoryArticles[currentIndex - 1] : null
  const nextArticle = currentIndex < categoryArticles.length - 1 ? categoryArticles[currentIndex + 1] : null

  // Parse headings and enrich HTML with IDs
  const { toc, enrichedHtml } = parseHeadings(article.content)

  return (
    <>
      <ReadingProgress />

      <div className="flex gap-8">
        {/* Main article content */}
        <div className="flex-1 min-w-0 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/docs" className="hover:text-foreground transition-colors shrink-0">
              Dökümanlar
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
            <Link
              href={`/docs/${category?.id}`}
              className="hover:text-foreground transition-colors shrink-0"
            >
              {category?.title}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
            <span className="text-foreground shrink-0">{article.title}</span>
          </nav>

          {/* Article Header */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-[1.1]">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-8 border-b border-border/60">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-500" />
              {article.readTime} okuma süresi
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              {category?.title}
            </span>
          </div>

          {/* Article Content */}
          <div
            className="max-w-none
              [&>p]:text-base [&>p]:md:text-lg [&>p]:text-slate-700 dark:[&>p]:text-slate-300 [&>p]:mb-6 [&>p]:leading-relaxed
              [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-extrabold [&>h2]:text-foreground [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:tracking-tight [&>h2]:scroll-mt-24
              [&>h3]:text-lg [&>h3]:md:text-xl [&>h3]:font-bold [&>h3]:text-foreground [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:scroll-mt-24
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul]:text-slate-700 dark:[&>ul]:text-slate-300 [&>ul>li]:mb-2 [&>ul>li]:leading-relaxed
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol]:text-slate-700 dark:[&>ol]:text-slate-300 [&>ol>li]:mb-2 [&>ol>li]:leading-relaxed
              [&_a]:text-emerald-500 hover:[&_a]:text-emerald-400 [&_a]:underline [&_a]:underline-offset-2
              [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-500 [&>blockquote]:pl-5 [&>blockquote]:pr-4 [&>blockquote]:italic [&>blockquote]:text-slate-500 dark:[&>blockquote]:text-slate-400 [&>blockquote]:my-8 [&>blockquote]:bg-emerald-500/5 [&>blockquote]:py-3 [&>blockquote]:rounded-r-lg
              [&_strong]:text-foreground [&_strong]:font-bold
              [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-emerald-600 dark:[&_code]:text-emerald-400
              [&>pre]:bg-muted [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-8 [&>pre]:text-sm
              [&>hr]:my-10 [&>hr]:border-border/60
              [&>table]:w-full [&>table]:mb-8 [&>table]:border-collapse [&_th]:text-left [&_th]:p-3 [&_th]:border-b [&_th]:border-border [&_th]:font-semibold [&_td]:p-3 [&_td]:border-b [&_td]:border-border/50"
            dangerouslySetInnerHTML={{ __html: enrichedHtml }}
          />

          {/* Feedback */}
          <ArticleFeedback />

          {/* Prev / Next Navigation */}
          <nav className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                href={`/docs/${categorySlug}/${prevArticle.id}`}
                className="group flex flex-col p-5 rounded-xl border border-border bg-card hover:border-emerald-500/30 hover:bg-muted/50 transition-all"
              >
                <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3" />
                  Önceki Makale
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-500 transition-colors">
                  {prevArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle ? (
              <Link
                href={`/docs/${categorySlug}/${nextArticle.id}`}
                className="group flex flex-col items-end text-right p-5 rounded-xl border border-border bg-card hover:border-emerald-500/30 hover:bg-muted/50 transition-all"
              >
                <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  Sonraki Makale
                  <ChevronRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-500 transition-colors">
                  {nextArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>

        {/* Table of Contents sidebar */}
        <ArticleToc items={toc} />
      </div>
    </>
  )
}
