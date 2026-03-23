export const metadata = { title: 'Gizlilik Politikası | VixSEO' }

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-12">
          Gizlilik Politikası
        </h1>
        <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground space-y-8">
          <p className="text-lg">
            Son Güncelleme: 1 Ocak 2026
          </p>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Toplanan Veriler</h2>
            <p>VixSEO, kullanıcılara daha iyi hizmet verebilmek için üyelik sürecinde e-posta adresiniz, isminiz ve site analizleriniz (Google Search Console vb. erişimler ile) gibi temel bilgileri depolar. Şifreleriniz Clerk üzerinden şifrelenmektedir ve doğrudan veritabanımızda açık olarak tutulmaz.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Verilerin Kullanımı</h2>
            <p>Topladığımız SEO metrikleri yalnızca size panel üzerinde rapor sunmak, trend analizi yapmak ve sitenizin potansiyelini artırmak amacıyla işlenir. Kesinlikle 3. şahıs veya kurumlarla satılmaz / paylaşılmaz.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Çerezler (Cookies)</h2>
            <p>Sistemimiz, oturumunuzu açık tutmak, doğrulama adımlarını geçmek ve arayüz seçeneklerinizi (gece/gündüz modu vb.) hatırlamak için varsayılan çerezlere (cookies) ihtiyaç duymaktadır. Uygulamamızı kullanarak bu teknik çerezlere izin vermiş olursunuz.</p>
          </section>
          {/* Add more sections as per actual legal requirement */}
          <p className="text-sm border-t border-border pt-8 mt-12">Bu gizlilik politikası taslak amaçlıdır ve yasal bir beyan yerine geçmez. Lütfen yayına almadan önce avukatınıza danışın.</p>
        </div>
      </div>
    </div>
  )
}
