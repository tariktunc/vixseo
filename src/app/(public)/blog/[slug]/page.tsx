import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Calendar, Clock } from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

export default async function BlogReadingPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  
  const article = blogPosts.find(a => a.slug === slug)
  if (!article) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 overflow-hidden relative">
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

      {/* Hero Header Area */}
      <div className="relative w-full min-h-[600px] xl:min-h-[700px] flex flex-col justify-end pt-32 pb-16">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/80 to-black/40" />
        </div>
        
        {/* Content Layer */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 lg:px-8 flex flex-col justify-end mt-auto">
          <div className="mb-6 inline-block">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-sm">
              <ChevronLeft className="w-4 h-4" />
              Blog'a Dön
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-slate-300 text-sm md:text-base border-t border-white/10 pt-8">
            <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-emerald-500" /> {article.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" /> {article.readTime} okuma süresi</span>
          </div>
        </div>
      </div>

      {/* Markdown Content Area */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <article 
          className="max-w-none prose-lg md:prose-xl 
            [&>p]:text-xl [&>p]:text-slate-300 [&>p]:mb-10 [&>p]:leading-[1.8]
            [&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-extrabold [&>h2]:text-white [&>h2]:mt-20 [&>h2]:mb-8 [&>h2]:tracking-tight
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-12 [&>h3]:mb-6
            [&>ul]:list-none [&>ul]:pl-0 [&>ul]:mb-10 [&>ul]:space-y-4
            [&>ul>li]:relative [&>ul>li]:pl-8 [&>ul>li]:text-xl [&>ul>li]:text-slate-300 [&>ul>li]:leading-relaxed
            [&>ul>li::before]:content-[''] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-3 [&>ul>li::before]:w-3 [&>ul>li::before]:h-3 [&>ul>li::before]:bg-emerald-500 [&>ul>li::before]:rounded-full [&>ul>li::before]:shadow-[0_0_10px_rgba(16,185,129,0.5)]
            [&>ol]:list-decimal [&>ol]:pl-8 [&>ol]:mb-10 [&>ol]:text-xl [&>ol]:text-slate-300 [&>ol>li]:mb-4 [&>ol>li]:leading-relaxed
            [&>ol>li::marker]:text-emerald-500 [&>ol>li::marker]:font-bold
            [&_a]:text-emerald-400 hover:[&_a]:text-emerald-300 [&_a]:underline [&_a]:decoration-emerald-500/50 [&_a]:underline-offset-4
            [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-slate-400 [&>blockquote]:my-12 [&>blockquote]:bg-emerald-500/5 [&>blockquote]:py-6 [&>blockquote]:pr-6 [&>blockquote]:rounded-r-2xl
            [&_strong]:text-white [&_strong]:font-extrabold
            [&_code]:bg-[#162B4D] [&_code]:text-emerald-300 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-md [&_code]:text-base [&_code]:border [&_code]:border-white/10"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col items-center text-center">
          <div className="text-emerald-500 font-bold tracking-widest uppercase mb-4 text-sm">Makaleyi Beğendiniz Mi?</div>
          <h2 className="text-3xl font-bold text-white mb-6">Tüm Bu Süreçleri Otomatize Edin</h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl">VixSEO ile buradaki teknik adımların tamamına saatler harcamak yerine, akıllı Headless altyapısı sayesinde dakikalar içinde sitenizi iyileştirin.</p>
          <Link 
            href="/sign-up"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-10 py-5 text-lg rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105"
          >
            14 Gün Ücretsiz Deneyin
          </Link>
        </div>
      </div>
    </div>
  )
}
