export type DocCategory = {
  id: string
  title: string
  description: string
  icon: string // matches lucide-react names roughly
}

export type DocArticle = {
  id: string
  categoryId: string
  title: string
  description: string
  readTime: string
  content: string // HTML format
}

export const docCategories: DocCategory[] = [
  { id: 'getting-started', title: 'Kurulum ve Başlangıç', description: 'Sisteme ilk adımlar, API entegrasyonu.', icon: 'rocket' },
  { id: 'features', title: 'Özellikler ve Kullanım', description: 'Anahtar kelime takibi, toplu blog ve SEO araçları.', icon: 'star' },
  { id: 'billing', title: 'Hesap ve Fatura', description: 'Abonelik planları ve yönetim işlemleri.', icon: 'credit-card' },
  { id: 'troubleshooting', title: 'Sorun Giderme', description: 'Hata çözümleri ve senkronizasyon kontrolleri.', icon: 'wrench' },
]

export const docArticles: DocArticle[] = [
  // --- KURULUM VE BAŞLANGIÇ ---
  {
    id: 'wix-entegrasyonu',
    categoryId: 'getting-started',
    title: 'Wix Sitenizi VixSEO\'ya Bağlama',
    description: 'Wix API anahtarınızı oluşturarak sitenizi paneline nasıl tanıtabileceğinizi öğrenin.',
    readTime: '4 dk',
    content: `
      <p>VixSEO'nun gücünden tam olarak faydalanabilmeniz için Wix sitenizi sistemimize API aracılığıyla bağlamanız gerekir. Merak etmeyin, bu işlem 30 saniyeden kısa sürer.</p>
      <h2>API Anahtarını Oluşturma</h2>
      <ol>
        <li>Wix Studio veya standart Wix kontrol panelinize giriş yapın.</li>
        <li>Ayarlar (Settings) > Özelleştirilmiş Uygulamalar bölümüne gidin.</li>
        <li>"Yeni API Anahtarı Oluştur" butonuna tıklayıp VixSEO için <strong>"Sadece Okuma (Read-Only) / Analytics"</strong> yetkilerini seçin (Eğer Toplu Blog Yöneticisini kullanacaksanız Yazma yetkisi de vermeniz gerekecektir).</li>
      </ol>
      <h2>Panale Eklenme</h2>
      <p>Oluşturduğunuz 64 karakterli API anahtarını kopyalayın. VixSEO kontrol panelinizdeki <strong>Sitelerim</strong> bölümüne gelerek "Yeni Site Ekle" butonuna basın ve API anahtarınızı yapıştırın.</p>
      <blockquote><strong>Önemli:</strong> API anahtarınızı üçüncü şahıslarla asla paylaşmayın. Hata durumunda hemen iptal ederek yeni bir tane üretebilirsiniz.</blockquote>
    `
  },
  {
    id: 'search-console-baglantisi',
    categoryId: 'getting-started',
    title: 'Google Search Console Bağlantısı',
    description: 'Sitenizin arama performansını görebilmek için Google entegrasyonu.',
    readTime: '3 dk',
    content: `
      <p>Google Search Console (GSC) sitemizin SEO performansını Google gözünden ölçmemizi sağlar. VixSEO, GSC verilerini çekerek size çok daha kullanıcı dostu bir arayüzde sunar.</p>
      <h2>OAuth2 ile Google Yetkilendirmesi</h2>
      <ul>
        <li>Dashboard'da <strong>GSC Bağlantısı</strong> sekmesine tıklayın.</li>
        <li>Açılan pencerede GSC hesabınızın bağlı olduğu Google e-posta adresiniz ile giriş yapın.</li>
        <li>"VixSEO arama raporlarınızı okumak istiyor" iznine <strong>İzin Ver</strong> diyerek işlemi tamamlayın.</li>
      </ul>
      <p>Erişim verdiğiniz an, sitenize ait Tıklamalar, Gösterimler ve Ortalama Sıra verileri panelinizde 16 aylık geriye dönük olacak şekilde senkronize edilmeye başlayacaktır.</p>
    `
  },
  {
    id: 'ilk-seo-denetimi',
    categoryId: 'getting-started',
    title: 'İlk SEO Denetimi (Audit) Nasıl Yapılır?',
    description: 'Sitenize ilk defa bir teknik sağlık taraması yaptırma adımları.',
    readTime: '2 dk',
    content: `
      <h2>SEO Denetimi Neden Önemli?</h2>
      <p>Bazen eksik H1 başlıkları veya hatalı canonical etiketleri sitenizin sıralamasını fark etmeden mahvedebilir. VixSEO bu noktaları sizin için otomatik tarar.</p>
      <p>Sisteme giriş yaptıktan sonra <strong>SEO Denetimi</strong> sayfasına gidin ve sitenizi seçip <code>Taramayı Başlat</code> butonuna basın. Site büyüklüğüne bağlı olarak işlem birkaç dakika sürebilir. Tamamlandığında "Kritik Hatalar", "Uyarılar" ve "Başarılı" olarak kategorize edilmiş detaylı bir liste ile karşılaşacaksınız.</p>
    `
  },

  // --- ÖZELLİKLER ---
  {
    id: 'anahtar-kelime-takibi',
    categoryId: 'features',
    title: 'Anahtar Kelime Takibi (Rank Tracking)',
    description: 'Önemli kelimelerinizde günlük pozisyon takibi nasıl aktifleştirilir?',
    readTime: '3 dk',
    content: `
      <p>Gerçek başarıyı doğru ölçümleyebilmeniz için sadece GSC değil, anlık kelime takibi de önemlidir.</p>
      <h2>Kelimeleri Eklemek</h2>
      <ol>
        <li><strong>Anahtar Kelimelerim</strong> paneline girin.</li>
        <li>Sağ üstteki "Yeni Kelime Ekle" formunu kullanarak hedeflenen arama sorgularını alt alta yazın.</li>
        <li>Bölgeyi seçip Kaydet'e basın. Eklediğiniz an itibarıyla 24 saatte bir düzenli olarak rakipleriniz ve sizin sitenizin serp pozisyonları görselleştirilecektir.</li>
      </ol>
      <p>Bir anahtar kelime sayfa birdenin altına düştüğünde sistem otomatik olarak size bir uyarı e-postası atacaktır (bildirimleri kapatmadığınız sürece).</p>
    `
  },
  {
    id: 'toplu-blog-yonetimi',
    categoryId: 'features',
    title: 'Toplu Blog Yöneticisi Nasıl Kullanılır?',
    description: 'Birden fazla Wix sitesine tek bir panodan optimize edilmiş makale gönderme rehberi.',
    readTime: '5 dk',
    content: `
      <h2>Mass Publishing ile Zaman Kazanın</h2>
      <p>Birden çok proje / işletme yöneten ajanslar ve freelancerlar için en büyük çile her bir Wix sitesine ayrı ayrı girip blog taslağı oluşturmaktır. VixSEO'nun toplu yöneticisi bunu tek bir alana taşır.</p>
      <p>Blog Yöneticisi sayfasına erişin. Gelişmiş zengin metin düzenleyicisinde makalenizi kaleme alın veya dışarıdan yapıştırın. Sağ taraftaki <strong>Uygulanacak Siteler</strong> listesinden birden fazla Wix sitesini işaretleyin. "Meta tagleri otomatik uyarla" opsiyonu seçili kalırsa her site için meta kelimeleri otomatik optimize edilir.</p>
      <p><code>Gönder / Taslak Olarak Kaydet</code> seçenekleriyle işlemi dakikalar içinde tamamlayabilirsiniz.</p>
    `
  },
  {
    id: 'sitemap-yonlendirmeler',
    categoryId: 'features',
    title: '301 Yönlendirmeleri ve Sitemap İşlemleri',
    description: 'Ölü linklerin kurtarılması ve dinamik sitemap ping işlemleri.',
    readTime: '3 dk',
    content: `
      <h2>Kırık Linkler Sıralama Kaybettirir</h2>
      <p>VixSEO, sitenizdeki 404 sayfalarını GSC bağlantınız aracılığıyla otomatik tespit eder ve "Önerilen Yönlendirmeler" paneline yansıtır.</p>
      <p>Tek bir tuşla eski kırık URL'inizi mevcut aktif bir sayfaya veya anasayfaya <strong>301 Kalıcı Yönlendirmesi</strong> ile aktarabilirsiniz. İşlem anında Wix tarafında tetiklenecektir.</p>
      <p>Yönlendirme yaptıktan sonra sitemap'in Google botlarına ping (bildirim) yapılması arka planda asenkron olarak tamamlanır.</p>
    `
  },

  // --- HESAP VE FATURALANDIRMA ---
  {
    id: 'plan-yukseltme',
    categoryId: 'billing',
    title: 'Pro veya Ajans Paketine Yükselme',
    description: 'Limitler dolduğunda paketleri nasıl upgrade edeceğiniz.',
    readTime: '2 dk',
    content: `
      <p>Eğer "Anahtar Kelime Limiti" veya "Site Ekleme Limiti" engeline takıldıysanız, planınızı yükseltmeniz gerekmektedir.</p>
      <p><strong>Hesabım > Fatura & Planlar</strong> dizinine giderek "Plan Değiştir" butonuna tıklayın. Ajans pakedi ile size özel atanan tahsis edilmiş (Dedicated) sunucu kaynaklarına sahip olabilir ve limitsiz site yönetimini aktif edebilirsiniz.</p>
      <p>Tutarlar aradaki gün bazlı (prorated) fark hesaplanarak tahsil edilecektir.</p>
    `
  },
  {
    id: 'iptal-ve-iade',
    categoryId: 'billing',
    title: 'Abonelik İptali ve İade Süreçleri',
    description: 'Sistemden ayrılmaya karar verdiğinizde süreç nasıl işler?',
    readTime: '2 dk',
    content: `
      <h2>Üyelik İptali</h2>
      <p>Herhangi bir nedenle aboneliğinizi durdurmak isterseniz <strong>Hesabım</strong> bölümünden tek tıkla otomatik ödemelerinizi iptal edebilirsiniz. Hesabınız, fatura döngüsünün son gününe kadar VixSEO Pro özelliklerini kullanmaya devam edecektir.</p>
      <h2>İade Süreci</h2>
      <p>Sistem kaynaklarının sunucu tarafında anlık rezerve edilmesi nedeniyle geriye dönük kısmi iade yapılmaz. Sorunlar için lütfen destek ekibine bağlanmaktan çekinmeyin.</p>
    `
  },

  // --- SORUN GİDERME ---
  {
    id: 'senkronizasyon-hatalari',
    categoryId: 'troubleshooting',
    title: 'Bozuk veya Gecikmeli Veri Senkronizasyonu',
    description: 'GSC veya Wix istatistikleriniz güncel gözükmüyorsa ne yapmalısınız?',
    readTime: '3 dk',
    content: `
      <h2>Google Api Limitleri (Quotas)</h2>
      <p>Google tarafındaki "Daily Retrieval Quota" sınırına ulaştıysanız (bu genelde 1 milyon+ aylık sayfa gösterimi olan dev sitelerde olur), yeni verilerin sisteme yansıması 24 saati bulabilir.</p>
      <h2>Manuel Yenileme</h2>
      <p>Eğer verilerin takıldığını düşünüyorsanız, panelde sağ üstteki <code>Yenile</code> butonuna basarak API bağlantısını zorlayabilirsiniz (Force Sync).</p>
      <p>Hala sorun varsa, bağlantı jetonu (OAuth Refresh Token) süresinin dolou dolmadığını kontrol etmek için GSC bağlantınızı panelden kaldırıp tekrar ekleyin.</p>
    `
  },
  {
    id: 'api-kopmalari',
    categoryId: 'troubleshooting',
    title: 'API Anahtarı Geçersiz (401 Unauthorized)',
    description: 'Wix anahtarının patlaması durumunda yetkileri güncelleme adımları.',
    readTime: '2 dk',
    content: `
      <p>Hata Kodunuz <strong>401 Unauthorized</strong> ise, VixSEO'nun Wix tarafındaki API anahtarı artık geçerli değildir.</p>
      <p>Bunun 3 temel nedeni vardır:</p>
      <ul>
        <li>Yetkisi olan yönetici hesabı API'yi Wix panelinden yanlışlıkla sildi.</li>
        <li>API anahtarı 1 yıllık yaşam süresini (TTL) doldurdu.</li>
        <li>Wix şifrenizi değiştirdiğiniz için sistem bağlı anahtarları güvenlik amacyıla kapattı.</li>
      </ul>
      <p>Çözüm: Yeni bir anahtar üreterek <strong>Hesabım > Entegrasyonlar</strong> sekmesinden eskisiyle yer değiştirmenizdir.</p>
    `
  }
]
