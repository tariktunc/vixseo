export const metadata = { title: 'Kullanım Şartları | VixSEO' }

export default function TermsOfUsePage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-12">
          Kullanım Şartları
        </h1>
        <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground space-y-8">
          <p className="text-lg">Kabul Edilen Kurallar ve Sorumluluklar</p>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Hizmet Kapsamı</h2>
            <p>VixSEO bir yazılım hizmeti platformudur (SaaS). Sistemi kullanarak, sunulan özelliklerin &quot;olduğu gibi&quot; sağlandığını ve performans limitlerinin seçilen plana (Başlangıç, Pro, Ajans) bağlı olduğunu peşinen kabul etmiş sayılırsınız.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. İptal ve İade Hakları</h2>
            <p>Abonelikler kullanıcı paneli üzerinden istenildiği zaman iptal edilebilir. Kullanılmayan aylara ilişkin kısmı iade yapılmaz. İptal sonrası planınız fatura döneminin sonuna kadar devam eder.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
