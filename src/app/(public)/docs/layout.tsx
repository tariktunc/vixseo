import Link from 'next/link'
import { Sparkles, BookOpen, Star, CreditCard, AlertCircle, Wrench, Rocket } from 'lucide-react'
import { docCategories, docArticles } from '@/lib/docs-data'

export const metadata = { title: 'Dökümantasyon | VixSEO' }

const iconMap: Record<string, any> = {
  'rocket': Rocket,
  'star': Star,
  'credit-card': CreditCard,
  'wrench': Wrench,
  'BookOpen': BookOpen,
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 border-r border-border/50 p-4 lg:p-6 overflow-y-auto hidden md:block" style={{ height: 'calc(100vh - 6rem)' }}>
          <div className="sticky top-24 space-y-8">
            <Link href="/docs" className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-emerald-500 transition-colors">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              Bilgi Bankası
            </Link>
            {docCategories.map(category => {
              const Icon = iconMap[category.icon] || BookOpen
              const categoryArticles = docArticles.filter(a => a.categoryId === category.id)
              return (
                <div key={category.id} className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-500" />
                    {category.title}
                  </h4>
                  <ul className="space-y-2 border-l border-border/50 ml-2 pl-4">
                    {categoryArticles.map(article => (
                      <li key={article.id}>
                        <Link 
                          href={`/docs/${category.id}/${article.id}`} 
                          className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors block py-0.5"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
