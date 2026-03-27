import { docCategories, docArticles } from '@/lib/docs-data'
import { DocsSidebar } from '@/components/docs/docs-sidebar'

export const metadata = { title: 'Dokumantasyon | VixSEO' }

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        <DocsSidebar
          categories={docCategories}
          articles={docArticles.map(a => ({ id: a.id, categoryId: a.categoryId, title: a.title }))}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
