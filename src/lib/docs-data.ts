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

  // --- SEO BİLGİ BANKASI KATEGORİLERİ ---
  { id: 'seo-temelleri', title: 'SEO Temelleri', description: 'Arama motoru optimizasyonunun temel kavramları ve stratejileri.', icon: 'search' },
  { id: 'sem-reklam', title: 'SEM ve Ücretli Arama', description: 'Google Ads, teklif stratejileri ve reklam optimizasyonu.', icon: 'credit-card' },
  { id: 'ai-seo', title: 'AI Destekli SEO', description: 'Yapay zeka ile SEO süreçlerini otomatikleştirme ve iyileştirme.', icon: 'sparkles' },
  { id: 'geo', title: 'Generative Engine Optimization', description: 'AI arama motorları için içerik ve otorite optimizasyonu.', icon: 'globe' },
  { id: 'aeo', title: 'Answer Engine Optimization', description: 'Yanıt motorları, snippet ve sesli arama optimizasyonu.', icon: 'message-circle' },
  { id: 'web-optimizasyon', title: 'Web Sitesi Optimizasyon Programı', description: 'Profesyonel web sitesi optimizasyonu için 12 fazlı kapsamlı program.', icon: 'layers' },
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
  },

  // ===================================================================
  // SEO TEMELLERİ
  // ===================================================================
  {
    id: 'on-page-seo-nedir',
    categoryId: 'seo-temelleri',
    title: 'On-Page SEO: Sayfa İçi Optimizasyon Rehberi',
    description: 'Başlık etiketleri, meta açıklamalar, içerik yapısı ve dahili bağlantılar gibi sayfa içi SEO faktörlerinin kapsamlı rehberi.',
    readTime: '10 dk',
    content: `
      <p>On-Page SEO (Sayfa İçi SEO), bir web sayfasının arama motorlarında daha üst sıralarda yer alması için doğrudan sayfa üzerinde yapılan tüm optimizasyon çalışmalarını kapsar. Google'ın algoritması yüzlerce sinyali değerlendirirken, sayfa içi faktörler hâlâ en doğrudan kontrol edebildiğiniz ve en hızlı sonuç alabileceğiniz alanlardır.</p>

      <h2>Başlık Etiketi (Title Tag) Optimizasyonu</h2>
      <p>Başlık etiketi, bir sayfanın arama sonuçlarında görünen ilk ve en önemli metin parçasıdır. Google, başlık etiketini sayfanın konusunu anlamak için birincil sinyal olarak kullanır.</p>
      <ul>
        <li><strong>Karakter sınırı:</strong> Başlık etiketinizi 50-60 karakter arasında tutun. Daha uzun başlıklar arama sonuçlarında kesilir ve kullanıcı deneyimini olumsuz etkiler.</li>
        <li><strong>Hedef anahtar kelime:</strong> Ana anahtar kelimenizi başlığın mümkün olduğunca başına yerleştirin. "SEO Rehberi: Kapsamlı Kılavuz" ifadesi, "Kapsamlı Kılavuz: SEO Rehberi" ifadesinden daha etkilidir.</li>
        <li><strong>Benzersizlik:</strong> Her sayfanın kendine özgü bir başlık etiketi olmalıdır. Tekrarlanan başlıklar Google'ın sayfaları birbirinden ayırt etmesini zorlaştırır.</li>
        <li><strong>Marka adı:</strong> Başlığın sonuna " | Marka Adı" şeklinde eklemek tanınırlık açısından faydalıdır ancak zorunlu değildir.</li>
      </ul>

      <h2>Meta Açıklama (Meta Description)</h2>
      <p>Meta açıklama doğrudan sıralama faktörü olmasa da, arama sonuçlarında başlığın altında görünerek tıklama oranını (CTR) büyük ölçüde etkiler. İyi yazılmış bir meta açıklama, organik tıklama oranınızı %5-10 artırabilir.</p>
      <ul>
        <li>150-160 karakter arasında tutun.</li>
        <li>Hedef anahtar kelimeyi doğal bir şekilde kullanın — Google eşleşen kelimeleri <strong>kalın</strong> gösterir.</li>
        <li>Harekete geçirici bir ifade (CTA) ekleyin: "Şimdi öğrenin", "Adım adım keşfedin" gibi.</li>
        <li>Her sayfa için benzersiz bir meta açıklama yazın.</li>
      </ul>

      <h2>Başlık Hiyerarşisi (H1-H6)</h2>
      <p>Başlık etiketleri, içeriğinizin yapısal iskeletini oluşturur. Hem kullanıcılar hem de arama motorları için içeriği anlaşılır bölümlere ayırır.</p>
      <ol>
        <li><strong>H1 etiketi:</strong> Her sayfada yalnızca bir tane olmalıdır ve sayfanın ana konusunu yansıtmalıdır.</li>
        <li><strong>H2 etiketleri:</strong> Ana bölüm başlıkları olarak kullanılır. İçeriğin temel konularını ayırır.</li>
        <li><strong>H3-H6 etiketleri:</strong> Alt bölümler için kullanılır. Derin bir konu hiyerarşisi oluşturur.</li>
      </ol>
      <p>Başlık etiketlerinde anahtar kelime kullanımı önemlidir ancak doğallığı bozmadan yapılmalıdır. "H2: SEO Nedir" yerine "H2: SEO Nedir ve Neden Önemlidir?" şeklinde bilgilendirici bir yaklaşım tercih edin.</p>

      <h2>İçerik Optimizasyonu</h2>
      <p>İçerik, On-Page SEO'nun kalbidir. Google'ın 2024 Helpful Content güncellemesinden bu yana, kullanıcıya gerçek değer sunan, kapsamlı ve özgün içerikler ön plana çıkmaktadır.</p>
      <ul>
        <li><strong>Anahtar kelime yoğunluğu:</strong> Sabit bir oran hedeflemek yerine doğal bir dil kullanın. Eş anlamlılar ve ilgili terimler (LSI kelimeleri) ekleyin.</li>
        <li><strong>İçerik uzunluğu:</strong> Konu ne kadar karmaşıksa içerik o kadar uzun olmalıdır. Genel kılavuz olarak 1500+ kelime derinlikli konular için idealdir.</li>
        <li><strong>Okunabilirlik:</strong> Kısa paragraflar, madde işaretleri, görseller ve tablolar ile içeriği taranabilir hâle getirin.</li>
        <li><strong>E-E-A-T sinyalleri:</strong> Deneyim, uzmanlık, otorite ve güvenilirlik gösteren içerik unsurları ekleyin — yazar bilgisi, kaynaklar, güncellenme tarihi gibi.</li>
      </ul>

      <h2>Dahili Bağlantı (Internal Linking) Stratejisi</h2>
      <p>Dahili bağlantılar, sitenizin sayfaları arasında bağlam ve otorite akışı sağlar. İyi planlanmış bir dahili bağlantı yapısı hem kullanıcı deneyimini iyileştirir hem de Google'ın sitenizi daha verimli taramasına yardımcı olur.</p>
      <ul>
        <li>Her yeni içeriğe en az 3-5 dahili bağlantı ekleyin.</li>
        <li>Bağlantı metni (anchor text) açıklayıcı olsun — "buraya tıklayın" yerine "On-Page SEO rehberimiz" kullanın.</li>
        <li>En önemli sayfalarınıza (para sayfaları) daha fazla dahili bağlantı yönlendirin.</li>
      </ul>

      <h2>Görsel Optimizasyon</h2>
      <p>Görseller sayfa hızını doğrudan etkiler ve Google Görsel Arama'dan ek trafik sağlayabilir.</p>
      <ul>
        <li><strong>Alt etiketi:</strong> Her görsele açıklayıcı bir alt metin yazın. Anahtar kelimeyi doğal şekilde dahil edin.</li>
        <li><strong>Dosya boyutu:</strong> WebP formatı kullanın ve görselleri sıkıştırın. 100KB altı ideal hedeftir.</li>
        <li><strong>Dosya adı:</strong> <code>IMG_2847.jpg</code> yerine <code>on-page-seo-kontrol-listesi.webp</code> gibi açıklayıcı isimler verin.</li>
        <li><strong>Lazy loading:</strong> Ekranın altında kalan görseller için tembel yükleme uygulayın.</li>
      </ul>

      <h2>URL Yapısı</h2>
      <p>Temiz ve anlaşılır URL'ler hem kullanıcılar hem de arama motorları tarafından tercih edilir.</p>
      <ul>
        <li>Kısa tutun: <code>/on-page-seo-rehberi</code> yeterlidir.</li>
        <li>Türkçe karakter kullanmaktan kaçının: <code>ö → o</code>, <code>ü → u</code> dönüşümü yapın.</li>
        <li>Kelimeleri tire (-) ile ayırın, alt çizgi (_) kullanmayın.</li>
        <li>Gereksiz parametreleri kaldırın.</li>
      </ul>

      <blockquote><strong>Özet:</strong> On-Page SEO, tamamen sizin kontrolünüzde olan ve en hızlı sonuç veren optimizasyon alanıdır. Başlık etiketi, meta açıklama, başlık hiyerarşisi, içerik kalitesi, dahili bağlantılar, görsel optimizasyon ve URL yapısı — bu yedi temel alanı düzenli olarak denetleyin ve güncel tutun.</blockquote>
    `
  },
  {
    id: 'off-page-seo-nedir',
    categoryId: 'seo-temelleri',
    title: 'Off-Page SEO: Sayfa Dışı Optimizasyon Stratejileri',
    description: 'Backlink kazanımı, marka sinyalleri, sosyal medya etkisi ve dijital PR ile sitenizin otoritesini artırma yöntemleri.',
    readTime: '9 dk',
    content: `
      <p>Off-Page SEO, web sitenizin dışında gerçekleştirilen ve arama motorlarına sitenizin güvenilirliği, otoritesi ve popülaritesi hakkında sinyal gönderen tüm çalışmaları kapsar. Google'ın sıralama algoritmasının yaklaşık %50'sinin sayfa dışı faktörlere dayandığı tahmin edilmektedir.</p>

      <h2>Backlink (Geri Bağlantı) Temelleri</h2>
      <p>Backlink, başka bir web sitesinden sizin sitenize verilen bağlantıdır. Google bunu bir "güven oyu" olarak değerlendirir. Ancak her backlink eşit değildir — kalite, miktar kadar (hatta daha fazla) önemlidir.</p>
      <ul>
        <li><strong>Domain otoritesi:</strong> Yüksek otoriteye sahip sitelerden gelen bağlantılar çok daha değerlidir. Tek bir haber sitesinden gelen link, onlarca düşük kaliteli dizin bağlantısından üstündür.</li>
        <li><strong>İlgililik (Relevance):</strong> Bağlantı veren sitenin konusu sizin sitenizle alakalı olmalıdır. Bir SEO blogundan gelen link, bir yemek blogundan gelenden daha değerlidir (SEO içerikleri için).</li>
        <li><strong>Dofollow vs. Nofollow:</strong> Dofollow bağlantılar otorite aktarırken, nofollow bağlantılar aktarmaz. Ancak doğal bir profil her ikisini de içermelidir.</li>
        <li><strong>Çapa metni çeşitliliği:</strong> Tüm backlinklerin aynı çapa metnini kullanması Google'a yapay görünür. Marka adı, URL, genel ifadeler ve anahtar kelimeler dengeli dağılmalıdır.</li>
      </ul>

      <h2>Kaliteli Backlink Kazanma Stratejileri</h2>
      <h3>1. İçerik Pazarlaması</h3>
      <p>Doğal olarak bağlantı çeken içerikler üretmek en sürdürülebilir stratejidir. Araştırma raporları, infografikler, kapsamlı kılavuzlar ve orijinal veriler paylaşıldığında diğer siteler bunlara referans verir.</p>

      <h3>2. Kırık Bağlantı Taktiği (Broken Link Building)</h3>
      <p>Hedef sitedeki kırık (404 veren) bağlantıları tespit edin. Site sahibine ulaşarak kırık bağlantı yerine sizin ilgili içeriğinizi önerin. Bu taktik, karşı tarafa da değer sunduğu için kabul oranı yüksektir.</p>

      <h3>3. Misafir Yazarlık (Guest Posting)</h3>
      <p>Sektörünüzdeki saygın bloglara kaliteli misafir yazılar yazarak hem otorite hem de bağlantı kazanabilirsiniz. Önemli olan düşük kaliteli "makale çiftliklerine" değil, gerçek okuyucu kitlesine sahip sitelere yazmaktır.</p>

      <h3>4. Dijital PR ve Basın İlişkileri</h3>
      <p>Haber değeri taşıyan veriler, anketler veya sektörel raporlar yayınlayarak basın organlarının dikkatini çekin. HARO (Help A Reporter Out) gibi platformlar aracılığıyla gazetecilerin sorularına uzman yanıtlar verin.</p>

      <h2>Marka Sinyalleri</h2>
      <p>Google, "bağlantısız bahisler" (unlinked mentions) yani marka adınızın bağlantı olmadan geçtiği yerleri de değerlendirir. Markanız ne kadar çok çevrimiçi ortamda anılırsa, Google gözünde o kadar otoriter hâle gelirsiniz.</p>
      <ul>
        <li>Marka aramaları (branded searches) artarsa bu güçlü bir sinyal olur.</li>
        <li>Google Benim İşletmem (Google Business Profile) profilinizi eksiksiz doldurun.</li>
        <li>Sektörel dizinlere ve inceleme sitelerine kaydolun.</li>
      </ul>

      <h2>Sosyal Medya ve SEO İlişkisi</h2>
      <p>Sosyal medya paylaşımları doğrudan bir sıralama faktörü değildir, ancak dolaylı olarak büyük etki yaratır. Viral olan bir içerik, doğal olarak onlarca backlink kazanabilir. Sosyal medya aynı zamanda marka bilinirliğini artırarak marka aramalarını yükseltir.</p>

      <h2>Forum ve Topluluk Katılımı</h2>
      <p>Reddit, Quora, sektörel forumlar ve Slack/Discord toplulukları gibi platformlarda aktif olmak, hem doğrudan trafik hem de dolaylı SEO faydası sağlar. Ancak spam olarak algılanmamak için gerçek değer sunan yanıtlar verin.</p>

      <blockquote><strong>Uyarı:</strong> Satın alınan bağlantılar, PBN (Private Blog Network) ağları ve otomatik bağlantı oluşturma araçları Google'ın yönergelerine aykırıdır. Tespit edildiğinde siteniz ciddi ceza alabilir. Beyaz şapka (white hat) yöntemlerle organik büyümeye odaklanın.</blockquote>
    `
  },
  {
    id: 'teknik-seo-rehberi',
    categoryId: 'seo-temelleri',
    title: 'Teknik SEO: Site Hızı, Crawl ve İndeksleme',
    description: 'Sayfa hızı, taranabilirlik, indekslenme, yapısal veri ve mobil uyumluluk gibi teknik SEO konularının detaylı rehberi.',
    readTime: '11 dk',
    content: `
      <p>Teknik SEO, arama motorlarının sitenizi etkili bir şekilde taraması, anlaması ve dizine eklemesi için gereken teknik altyapı optimizasyonlarını kapsar. İçeriğiniz ne kadar mükemmel olursa olsun, teknik altyapınız sağlam değilse arama sonuçlarında istediğiniz yere ulaşamazsınız.</p>

      <h2>Site Hızı ve Core Web Vitals</h2>
      <p>Google, 2021'den itibaren Core Web Vitals metriklerini resmi sıralama faktörü olarak kullanmaktadır. Bu üç temel metrik kullanıcı deneyiminin en kritik noktalarını ölçer:</p>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> Sayfadaki en büyük içerik öğesinin yüklenme süresi. İdeal değer 2.5 saniyenin altıdır. Hero görseli, büyük metin bloğu veya video bu öğe olabilir.</li>
        <li><strong>INP (Interaction to Next Paint):</strong> Kullanıcı etkileşimlerine sayfanın ne kadar hızlı yanıt verdiğini ölçer. 200 milisaniyenin altı idealdir. JavaScript optimizasyonu bu metriği doğrudan etkiler.</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> Sayfa yüklenirken içeriğin beklenmedik şekilde kaymasını ölçer. 0.1 altı hedeflenmelidir. Boyutsuz görseller ve dinamik olarak eklenen reklamlar en yaygın sorun kaynaklarıdır.</li>
      </ul>

      <h3>Hız Optimizasyon Teknikleri</h3>
      <ol>
        <li><strong>Görsel sıkıştırma:</strong> WebP veya AVIF formatı kullanın. Boyutları CSS yerine HTML'de belirtin.</li>
        <li><strong>JavaScript erteleme:</strong> Kritik olmayan JavaScript dosyalarını <code>defer</code> veya <code>async</code> ile yükleyin.</li>
        <li><strong>CSS kritik yol:</strong> İlk ekranda görünen stil kurallarını satır içi (inline) olarak ekleyin, gerisini asenkron yükleyin.</li>
        <li><strong>CDN kullanımı:</strong> İçerik dağıtım ağı ile statik dosyaları kullanıcıya en yakın sunucudan sunun.</li>
        <li><strong>Önbellekleme:</strong> Tarayıcı ve sunucu tarafı önbellekleme ile tekrar eden ziyaretleri hızlandırın.</li>
      </ol>

      <h2>Taranabilirlik (Crawlability)</h2>
      <p>Arama motoru botlarının sitenizi etkili bir şekilde gezebilmesi, indekslemenin ön koşuludur.</p>

      <h3>robots.txt Dosyası</h3>
      <p><code>robots.txt</code> dosyası, arama motoru botlarına hangi sayfaları tarayıp taramayacaklarını söyler. Yanlış yapılandırılmış bir robots.txt dosyası, önemli sayfalarınızın indekslenmesini engelleyebilir.</p>
      <ul>
        <li>Admin panelleri, giriş sayfaları ve dahili arama sonuç sayfalarını engelleyin.</li>
        <li>CSS ve JavaScript dosyalarını engellemeyin — Google bunlara erişerek sayfanızı render eder.</li>
        <li>Sitemap dosyanızın yolunu robots.txt içinde belirtin.</li>
      </ul>

      <h3>Crawl Bütçesi</h3>
      <p>Google her siteye sınırlı bir tarama bütçesi ayırır. Büyük sitelerde bu bütçenin verimli kullanılması kritik önem taşır.</p>
      <ul>
        <li>Yinelenen (duplicate) içeriği canonical etiketlerle yönetin.</li>
        <li>Parametre bazlı URL'leri Google Search Console'dan bildirin.</li>
        <li>404 hataları ve yönlendirme zincirleri tarama bütçesini israf eder — düzenli olarak temizleyin.</li>
        <li>Dahili bağlantı yapınızı düz (flat) tutun — hiçbir önemli sayfa 3 tıktan fazla derinlikte olmasın.</li>
      </ul>

      <h2>İndeksleme (Indexing)</h2>
      <p>Bir sayfanın taranması, indeksleneceği anlamına gelmez. Google, kalitesiz veya tekrarlayan içeriği indekslemeyebilir.</p>
      <ul>
        <li><strong>Canonical etiketi:</strong> Her sayfanın kanonik URL'ini belirtin. Aynı içeriğin birden fazla URL'de erişilebilir olduğu durumlarda bu zorunludur.</li>
        <li><strong>Noindex etiketi:</strong> İndekslenmesini istemediğiniz sayfalara <code>&lt;meta name="robots" content="noindex"&gt;</code> ekleyin.</li>
        <li><strong>Sitemap.xml:</strong> Tüm önemli sayfalarınızı içeren bir XML sitemap oluşturun ve Google Search Console'a gönderin.</li>
        <li><strong>IndexNow:</strong> Yeni içerik yayınladığınızda anında indeksleme talep etmek için IndexNow protokolünü kullanabilirsiniz.</li>
      </ul>

      <h2>HTTPS ve Güvenlik</h2>
      <p>HTTPS, 2014'ten bu yana Google'ın resmi sıralama faktörüdür. SSL sertifikası olmayan siteler tarayıcılarda "Güvenli Değil" uyarısı gösterir ve kullanıcı güvenini kaybeder.</p>
      <ul>
        <li>Tüm HTTP trafiğini HTTPS'ye 301 ile yönlendirin.</li>
        <li>Karışık içerik (mixed content) uyarılarını giderin.</li>
        <li>SSL sertifikanızın geçerlilik süresini takip edin.</li>
      </ul>

      <h2>Mobil Uyumluluk</h2>
      <p>Google, "mobile-first indexing" politikası ile sitenizin mobil sürümünü birincil kaynak olarak kullanmaktadır. Masaüstünde harika görünen ancak mobilde sorun yaşayan bir site, sıralama kaybedecektir.</p>
      <ul>
        <li>Responsive tasarım kullanın — ayrı mobil site (m.domain.com) artık önerilmemektedir.</li>
        <li>Dokunmatik hedefler (butonlar, bağlantılar) en az 48x48 piksel olmalıdır.</li>
        <li>Metin boyutu en az 16 piksel olmalıdır.</li>
        <li>Yatay kaydırma olmamalıdır.</li>
      </ul>

      <h2>Yapısal Veri (Structured Data)</h2>
      <p>Schema.org işaretlemesi kullanarak sayfalarınızdaki içeriğin türünü arama motorlarına açıkça bildirirsiniz. Bu, zengin sonuçlar (rich results) olarak arama sonuçlarında öne çıkmanızı sağlar.</p>
      <ul>
        <li><strong>Article:</strong> Blog yazıları ve haberler için.</li>
        <li><strong>Product:</strong> E-ticaret ürünleri için fiyat, stok durumu, değerlendirme bilgileri.</li>
        <li><strong>FAQ:</strong> Sıkça sorulan sorular için — arama sonuçlarında genişletilmiş alan kaplar.</li>
        <li><strong>HowTo:</strong> Adım adım kılavuzlar için.</li>
        <li><strong>BreadcrumbList:</strong> Sayfa hiyerarşisini göstermek için.</li>
      </ul>

      <blockquote><strong>İpucu:</strong> Teknik SEO sorunlarını tespit etmek için Google Search Console'un "Kapsam" (Coverage) raporunu ve "Core Web Vitals" raporunu düzenli olarak kontrol edin. VixSEO panelinizdeki otomatik denetim aracı da bu kontrolleri sizin adınıza gerçekleştirir.</blockquote>
    `
  },
  {
    id: 'anahtar-kelime-arastirmasi',
    categoryId: 'seo-temelleri',
    title: 'Anahtar Kelime Araştırması: Kapsamlı Kılavuz',
    description: 'Doğru anahtar kelimeleri bulma, arama niyetini anlama, rekabet analizi ve kelime stratejisi oluşturma rehberi.',
    readTime: '10 dk',
    content: `
      <p>Anahtar kelime araştırması, SEO stratejisinin temel taşıdır. Hedef kitlenizin ne aradığını, hangi kelimeleri kullandığını ve bu aramaların arkasındaki niyeti anlamak, tüm içerik ve optimizasyon çalışmalarınızın yönünü belirler.</p>

      <h2>Arama Niyeti (Search Intent) Türleri</h2>
      <p>Her aramanın arkasında bir niyet vardır. Google, kullanıcı niyetini anlamaya büyük önem verir ve sonuçları buna göre şekillendirir. Anahtar kelime seçerken arama niyetini doğru tespit etmek kritiktir.</p>
      <ul>
        <li><strong>Bilgisel (Informational):</strong> Kullanıcı bilgi arıyor. "SEO nedir", "backlink nasıl alınır" gibi sorular. Blog yazıları ve kılavuzlarla karşılanır.</li>
        <li><strong>Yönelimsel (Navigational):</strong> Kullanıcı belirli bir siteye ulaşmak istiyor. "VixSEO giriş", "Google Search Console" gibi. Marka sayfaları hedeflenir.</li>
        <li><strong>Ticari Araştırma (Commercial Investigation):</strong> Kullanıcı satın alma öncesi araştırma yapıyor. "En iyi SEO araçları 2026", "Ahrefs vs Semrush" gibi. Karşılaştırma ve inceleme içerikleri idealdir.</li>
        <li><strong>İşlemsel (Transactional):</strong> Kullanıcı bir eylem gerçekleştirmek istiyor. "SEO aracı satın al", "VixSEO fiyat" gibi. Ürün ve fiyat sayfaları hedeflenir.</li>
      </ul>

      <h2>Anahtar Kelime Bulma Yöntemleri</h2>
      <h3>1. Beyin Fırtınası ve Çekirdek Kelimeler</h3>
      <p>İşletmenizin sunduğu ürün veya hizmetleri düşünerek "çekirdek kelimeler" (seed keywords) listesi oluşturun. Müşterilerinizin size nasıl ulaştığını, hangi soruları sorduğunu düşünün. Satış ekibiniz ve müşteri destek ekibiniz bu konuda zengin bir kaynak olabilir.</p>

      <h3>2. Rakip Analizi</h3>
      <p>Rakiplerinizin hangi anahtar kelimelerde sıralandığını incelemek, kaçırdığınız fırsatları ortaya çıkarır. Rakip analizi yaparken şunlara dikkat edin:</p>
      <ul>
        <li>Rakibin en çok trafik aldığı sayfalar hangi kelimelerde sıralanıyor?</li>
        <li>Sizin sıralanmadığınız ancak rakibin sıralandığı kelimeler neler? (Kelime boşluğu / keyword gap analizi)</li>
        <li>Rakibin içerik yapısı ve sayfa formatı nasıl?</li>
      </ul>

      <h3>3. Google'ın Kendi Araçları</h3>
      <p>Google, anahtar kelime araştırması için ücretsiz ve güçlü kaynaklar sunar:</p>
      <ul>
        <li><strong>Google Otomatik Tamamlama:</strong> Arama çubuğuna yazmaya başladığınızda önerilen tamamlamalar popüler aramaları yansıtır.</li>
        <li><strong>"İlgili aramalar" bölümü:</strong> Arama sonuçlarının altında gösterilen alternatif arama sorguları.</li>
        <li><strong>"İnsanlar ayrıca soruyor" (PAA):</strong> Konuyla ilgili sık sorulan sorular — içerik fikirleri için altın madeni.</li>
        <li><strong>Google Search Console:</strong> Sitenizin zaten gösterim aldığı ancak tıklama almadığı kelimeler, büyük fırsatları temsil eder.</li>
        <li><strong>Google Trends:</strong> Kelime popülaritesinin zaman içindeki değişimini ve mevsimsel trendleri gösterir.</li>
      </ul>

      <h2>Anahtar Kelime Değerlendirme Metrikleri</h2>
      <p>Bir anahtar kelimenin değerini belirlerken şu metrikleri birlikte değerlendirin:</p>
      <ol>
        <li><strong>Aylık arama hacmi:</strong> Kelimenin ayda kaç kez arandığı. Yüksek hacim daha fazla potansiyel trafik demektir ancak genellikle daha yüksek rekabetle gelir.</li>
        <li><strong>Anahtar kelime zorluğu (KD):</strong> İlk sayfada yer almanın ne kadar zor olduğunu gösteren metrik. Yeni siteler düşük KD'li kelimelerle başlamalıdır.</li>
        <li><strong>Tıklama potansiyeli:</strong> Bazı aramalarda Google, cevabı doğrudan sonuç sayfasında verir (sıfır tıklama aramaları). Bu tür kelimelerde organik tıklama potansiyeli düşüktür.</li>
        <li><strong>Ticari değer:</strong> Kelimenin dönüşüm (satış, lead) potansiyeli. "SEO aracı ücretsiz deneme" kelimesi "SEO nedir" kelimesinden ticari açıdan çok daha değerlidir.</li>
      </ol>

      <h2>Uzun Kuyruk (Long-Tail) Strateji</h2>
      <p>Uzun kuyruk anahtar kelimeler, daha spesifik ve genellikle 3+ kelimeden oluşan arama sorgularıdır. Tek başına düşük hacimli olsalar da toplamda tüm aramaların yaklaşık %70'ini oluştururlar.</p>
      <ul>
        <li><strong>Düşük rekabet:</strong> "SEO" kelimesinde sıralanmak neredeyse imkânsızken, "küçük işletmeler için yerel SEO rehberi" kelimesinde sıralanmak çok daha kolaydır.</li>
        <li><strong>Yüksek dönüşüm:</strong> Spesifik aramalar genellikle daha net bir niyet taşır ve dönüşüm oranı genel kelimelere göre 2-5 kat daha yüksektir.</li>
        <li><strong>İçerik çeşitliliği:</strong> Her uzun kuyruk kelime, ayrı bir blog yazısı veya SSS girişi için fırsat yaratır.</li>
      </ul>

      <h2>Anahtar Kelime Haritalama (Keyword Mapping)</h2>
      <p>Anahtar kelime araştırmasını tamamladıktan sonra, her kelimeyi sitenizin belirli bir sayfasına atamanız gerekir. Bu süreç "anahtar kelime haritalama" olarak bilinir.</p>
      <ul>
        <li>Her sayfaya bir birincil (primary) ve 2-3 ikincil (secondary) anahtar kelime atayın.</li>
        <li>Aynı kelimeyi birden fazla sayfada hedeflemeyin — bu "kanibalizasyon" sorununa yol açar.</li>
        <li>Sayfanın içerik türünü arama niyetiyle eşleştirin.</li>
      </ul>

      <blockquote><strong>Pratik İpucu:</strong> VixSEO'nun anahtar kelime takip paneli, GSC verilerinizi analiz ederek sıralanma fırsatı olan ancak henüz optimize etmediğiniz kelimeleri otomatik olarak önerir. Bu önerileri düzenli kontrol etmek, içerik stratejinizi sürekli güçlendirir.</blockquote>
    `
  },
  {
    id: 'icerik-stratejisi',
    categoryId: 'seo-temelleri',
    title: 'İçerik Stratejisi: SEO Uyumlu İçerik Üretimi',
    description: 'Arama motorları ve kullanıcılar için değerli içerik planlama, üretme ve optimize etme rehberi.',
    readTime: '9 dk',
    content: `
      <p>İçerik stratejisi, hangi konularda, ne zaman, hangi formatta ve hangi kanal için içerik üreteceğinizi belirleyen sistematik bir plandır. SEO uyumlu içerik stratejisi, arama motorlarından organik trafik çekmeyi hedeflerken kullanıcıya gerçek değer sunmayı ön planda tutar.</p>

      <h2>İçerik Stratejisi Oluşturma Adımları</h2>
      <h3>1. Hedef Kitle Analizi</h3>
      <p>İçerik üretmeden önce kimin için ürettiğinizi net olarak tanımlamanız gerekir. Alıcı persona (buyer persona) oluşturmak bu sürecin temelidir.</p>
      <ul>
        <li>Hedef kitlenizin demografik özellikleri neler?</li>
        <li>Hangi sorunları çözmeye çalışıyorlar?</li>
        <li>Bilgiye nasıl ulaşmayı tercih ediyorlar? (Video, blog, podcast, sosyal medya)</li>
        <li>Karar verme süreçlerinde hangi aşamadalar? (Farkındalık, değerlendirme, satın alma)</li>
      </ul>

      <h3>2. Konu Kümeleme (Topic Clustering)</h3>
      <p>Konu kümeleme, birbiriyle ilişkili içerikleri bir "pillar" (sütun) sayfa etrafında gruplandırma yöntemidir. Bu yaklaşım hem kullanıcı deneyimini iyileştirir hem de Google'ın sitenizin konu otoritesini anlamasına yardımcı olur.</p>
      <ul>
        <li><strong>Pillar içerik:</strong> Geniş bir konuyu kapsamlı şekilde ele alan uzun bir sayfa. Örnek: "SEO Rehberi: A'dan Z'ye Her Şey"</li>
        <li><strong>Küme içerikleri:</strong> Pillar konunun alt başlıklarını derinlemesine işleyen ayrı sayfalar. Örnek: "On-Page SEO", "Off-Page SEO", "Teknik SEO" vb.</li>
        <li><strong>Dahili bağlantılar:</strong> Küme içerikleri pillar sayfaya, pillar sayfa küme içeriklerine karşılıklı bağlantı verir.</li>
      </ul>

      <h3>3. İçerik Takvimi</h3>
      <p>Düzenli içerik üretimi Google'a sitenizin aktif ve güncel olduğu sinyalini verir. Bir içerik takvimi oluşturmak tutarlılığı sağlar.</p>
      <ul>
        <li>Haftalık veya iki haftalık yayın sıklığı belirleyin.</li>
        <li>Mevsimsel trendleri ve sektörel etkinlikleri takvime yansıtın.</li>
        <li>Her içerik için hedef anahtar kelime, içerik formatı ve yayın tarihini belirtin.</li>
      </ul>

      <h2>SEO Uyumlu İçerik Yazımı</h2>
      <h3>Başlık ve Giriş</h3>
      <p>Başlık, bir içeriğin tıklanıp tıklanmayacağını belirleyen en kritik unsurdur. İyi bir başlık:</p>
      <ul>
        <li>Merak uyandırır veya bir fayda vaat eder.</li>
        <li>Hedef anahtar kelimeyi doğal şekilde içerir.</li>
        <li>Spesifiktir — "SEO İpuçları" yerine "2026'da Uygulamanız Gereken 15 SEO Taktiği" daha etkilidir.</li>
      </ul>
      <p>Giriş paragrafı okuyucuyu hemen yakalaymalıdır. Bir istatistik, soru veya cesur bir iddia ile başlayarak okuyucunun devamını okumasını sağlayın.</p>

      <h3>İçerik Yapısı</h3>
      <p>Modern kullanıcılar içeriği okumaz, <em>tarar</em>. İçeriğinizi taranabilir hâle getirmek için:</p>
      <ol>
        <li>Kısa paragraflar kullanın (2-4 cümle).</li>
        <li>Alt başlıklarla (H2, H3) bölümlere ayırın.</li>
        <li>Madde işaretleri ve numaralı listelerden yararlanın.</li>
        <li>Önemli noktaları <strong>kalın</strong> veya <em>italik</em> ile vurgulayın.</li>
        <li>Görseller, tablolar ve infografikler ekleyin.</li>
        <li>Anahtar çıkarımları kutu (callout/blockquote) içinde özetleyin.</li>
      </ol>

      <h3>E-E-A-T Sinyalleri</h3>
      <p>Google'ın kalite değerlendirici kılavuzunda öne çıkan E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) sinyalleri, içeriğinizin güvenilirliğini artırır:</p>
      <ul>
        <li><strong>Deneyim:</strong> Konu hakkında birinci elden deneyiminizi paylaşın. Kişisel gözlemler, vaka çalışmaları, ekran görüntüleri.</li>
        <li><strong>Uzmanlık:</strong> Yazar biyografisi ekleyin. Eğitim, sertifika ve deneyim bilgileri belirtin.</li>
        <li><strong>Otorite:</strong> Güvenilir kaynaklara referans verin. Sektörel veriler ve araştırma sonuçlarını alıntılayın.</li>
        <li><strong>Güvenilirlik:</strong> İletişim bilgilerini açıkça gösterin. Gizlilik politikası ve kullanım şartları sayfaları oluşturun.</li>
      </ul>

      <h2>Mevcut İçeriği Güncelleme</h2>
      <p>Yeni içerik üretmek kadar, mevcut içerikleri güncel tutmak da önemlidir. Google, güncel içerikleri ödüllendirir. İçerik güncelleme stratejisi:</p>
      <ul>
        <li>GSC'de gösterim alan ancak tıklama almayan sayfaları belirleyin — başlık ve meta açıklamalarını iyileştirin.</li>
        <li>Sıralama kaybeden sayfaları tespit edin — içeriği genişletin, güncelleyin ve yeniden optimize edin.</li>
        <li>Eski istatistikleri ve referansları güncelleyin.</li>
        <li>Yeni alt başlıklar ve bölümler ekleyerek içeriği zenginleştirin.</li>
      </ul>

      <blockquote><strong>Özet:</strong> Başarılı bir içerik stratejisi, hedef kitle analizi, konu kümeleme, düzenli yayın takvimi, SEO uyumlu yazım ve sürekli güncelleme döngüsünden oluşur. İçerik üretirken her zaman "Bu içerik kullanıcı için gerçek bir değer sunuyor mu?" sorusunu sorun.</blockquote>
    `
  },

  // ===================================================================
  // SEM VE REKLAMCILIK
  // ===================================================================
  {
    id: 'google-ads-temelleri',
    categoryId: 'sem-reklam',
    title: 'Google Ads Temelleri: Başlangıç Rehberi',
    description: 'Google Ads hesap yapısı, kampanya türleri, hedefleme seçenekleri ve ilk kampanyanızı oluşturma adımları.',
    readTime: '10 dk',
    content: `
      <p>Google Ads (eski adıyla Google AdWords), dünyanın en büyük dijital reklam platformudur. Doğru yapılandırıldığında, hedef kitlenize tam aradıkları anda ulaşmanızı sağlar. Bu rehberde Google Ads'in temellerini, hesap yapısını ve ilk kampanyanızı nasıl oluşturacağınızı öğreneceksiniz.</p>

      <h2>Google Ads Nasıl Çalışır?</h2>
      <p>Google Ads, bir açık artırma (auction) sistemi üzerine kuruludur. Bir kullanıcı arama yaptığında, Google milisaniyeler içinde bir açık artırma gerçekleştirir ve hangi reklamların gösterileceğine karar verir. Bu karar yalnızca teklif tutarına değil, reklamın kalitesine ve kullanıcı deneyimine de bağlıdır.</p>
      <p>Temel formül şudur: <strong>Reklam Sırası = Teklif x Kalite Puanı x Reklam Uzantılarının Etkisi</strong></p>
      <p>Bu, düşük bütçeli bir reklamverenin yüksek kalite puanı ile daha yüksek teklif veren rakibini geçebileceği anlamına gelir.</p>

      <h2>Hesap Yapısı</h2>
      <p>Google Ads hesap yapısını doğru kurmak, kampanya yönetiminin ve optimizasyonun temelidir.</p>
      <ol>
        <li><strong>Hesap:</strong> E-posta adresi ve fatura bilgileriyle tanımlanan en üst düzey. Bir işletmenin genellikle tek bir hesabı olur.</li>
        <li><strong>Kampanya:</strong> Bütçe, hedefleme ve teklif stratejisinin belirlendiği düzey. Farklı ürünler veya hizmetler için ayrı kampanyalar oluşturun.</li>
        <li><strong>Reklam Grubu:</strong> Benzer anahtar kelimeleri ve reklamları gruplayan düzey. Her reklam grubunda 5-20 yakın ilişkili kelime olması önerilir.</li>
        <li><strong>Reklam:</strong> Kullanıcının gördüğü metin, görsel veya video. Her reklam grubunda en az 3 farklı reklam varyasyonu test edin.</li>
        <li><strong>Anahtar Kelime:</strong> Reklamınızın tetiklenmesini sağlayan arama terimleri.</li>
      </ol>

      <h2>Kampanya Türleri</h2>
      <h3>Arama Kampanyası (Search)</h3>
      <p>Kullanıcı Google'da arama yaptığında sonuçların üstünde veya altında gösterilen metin reklamları. En yüksek dönüşüm oranına sahip kampanya türüdür çünkü kullanıcı aktif olarak bir şey aramaktadır.</p>

      <h3>Görüntülü Reklam Ağı (Display)</h3>
      <p>Google'ın iş ortağı web sitelerinde (YouTube, haber siteleri, bloglar vb.) gösterilen banner ve görsel reklamlar. Marka bilinirliği ve yeniden pazarlama (remarketing) için etkilidir.</p>

      <h3>Alışveriş Kampanyası (Shopping)</h3>
      <p>E-ticaret ürünlerinin görseli, fiyatı ve mağaza adıyla birlikte gösterildiği reklamlar. Google Merchant Center hesabı gerektirir.</p>

      <h3>Video Kampanyası (YouTube)</h3>
      <p>YouTube'da ve video iş ortağı sitelerinde gösterilen video reklamlar. TrueView (atlanabilir) ve Bumper (6 saniye, atlanamaz) formatları mevcuttur.</p>

      <h3>Performance Max</h3>
      <p>Google'ın tüm reklam kanallarını (Arama, Görüntülü, YouTube, Gmail, Discover, Haritalar) tek bir kampanyada birleştiren AI destekli kampanya türü. Google'ın makine öğrenimi algoritması bütçenizi en iyi dönüşüm sağlayan kanallara otomatik dağıtır.</p>

      <h2>Anahtar Kelime Eşleme Türleri</h2>
      <p>Anahtar kelimelerinizin hangi aramalarda tetikleneceğini eşleme türleri belirler:</p>
      <ul>
        <li><strong>Geniş eşleme (Broad match):</strong> En geniş kapsam. "koşu ayakkabısı" kelimesi, "spor ayakkabı fiyatları" aramasında da tetiklenebilir. Dikkatli kullanılmalıdır.</li>
        <li><strong>Sıralı eşleme (Phrase match):</strong> Kelimenin anlamını koruyan aramalarda tetiklenir. "koşu ayakkabısı" → "en iyi koşu ayakkabısı önerileri" tetiklenir, "ayakkabı tamir" tetiklenmez.</li>
        <li><strong>Tam eşleme (Exact match):</strong> Yalnızca tam anahtar kelimeyle veya çok yakın varyantlarıyla tetiklenir. En dar kapsam, en yüksek kontrol.</li>
      </ul>

      <h2>Negatif Anahtar Kelimeler</h2>
      <p>Reklamınızın gösterilmesini istemediğiniz aramaları engelleyen kelimelerdir. Bütçenizi korumak için kritik önem taşır. Örneğin, premium bir ürün satıyorsanız "ücretsiz", "bedava", "indir" gibi kelimeleri negatif olarak eklemelisiniz.</p>

      <h2>İlk Kampanyanızı Oluşturma</h2>
      <ol>
        <li>Google Ads hesabınıza giriş yapın ve "Yeni Kampanya" butonuna tıklayın.</li>
        <li>Kampanya hedefinizi seçin (satış, lead, web sitesi trafiği vb.).</li>
        <li>Arama kampanyası türünü seçin (başlangıç için en uygunu).</li>
        <li>Günlük bütçenizi belirleyin — başlangıçta düşük tutun ve verilere göre artırın.</li>
        <li>Hedef konumunuzu ve dilini seçin.</li>
        <li>Reklam gruplarınızı ve anahtar kelimelerinizi ekleyin.</li>
        <li>En az 3 farklı reklam metni oluşturun.</li>
        <li>Reklam uzantılarını (sitelink, açıklama, telefon) ekleyin.</li>
        <li>Dönüşüm takibini kurun — bu adım ölçümsüz kampanya yürütmemek için zorunludur.</li>
      </ol>

      <blockquote><strong>Altın Kural:</strong> Dönüşüm takibi olmadan Google Ads kampanyası başlatmayın. Hangi kelimelerin, reklamların ve hedefleme seçeneklerinin gerçekten satış/lead getirdiğini bilmeden optimizasyon yapamazsınız.</blockquote>
    `
  },
  {
    id: 'teklif-stratejileri',
    categoryId: 'sem-reklam',
    title: 'Teklif Stratejileri: CPC, CPM ve Otomatik Teklifler',
    description: 'Manuel ve otomatik teklif stratejileri, bütçe optimizasyonu ve maliyet yönetimi rehberi.',
    readTime: '8 dk',
    content: `
      <p>Google Ads teklif stratejisi, kampanya başarınızı doğrudan etkileyen en önemli kararlardan biridir. Doğru strateji seçimi, aynı bütçeyle daha fazla dönüşüm almanızı veya daha düşük maliyetle aynı sonuçları elde etmenizi sağlar.</p>

      <h2>Temel Teklif Modelleri</h2>
      <h3>CPC (Cost Per Click — Tıklama Başına Maliyet)</h3>
      <p>Reklamınıza her tıklandığında ödeme yaparsınız. Arama kampanyaları için en yaygın modeldir. Avantajı, yalnızca sitenize gelen gerçek ziyaretçiler için ödeme yapmanızdır.</p>

      <h3>CPM (Cost Per Mille — Bin Gösterim Başına Maliyet)</h3>
      <p>Reklamınızın 1000 kez gösterilmesi için ödeme yaparsınız. Görüntülü reklam ağı ve video kampanyalarında kullanılır. Marka bilinirliği hedefleniyorsa uygundur.</p>

      <h3>CPA (Cost Per Acquisition — Edinim Başına Maliyet)</h3>
      <p>Her dönüşüm (satış, form doldurma, telefon araması vb.) için belirlediğiniz hedef maliyet üzerinden teklif verilir. Yeterli dönüşüm verisi toplandıktan sonra (en az 30-50 dönüşüm) en etkili modeldir.</p>

      <h2>Manuel Teklif Stratejileri</h2>
      <p>Manuel CPC stratejisinde her anahtar kelime için maksimum teklif tutarını siz belirlersiniz. Bu, tam kontrol sağlar ancak sürekli izleme ve ayarlama gerektirir.</p>
      <ul>
        <li><strong>Ne zaman kullanılmalı:</strong> Yeni hesaplarda, veri toplama aşamasında ve çok spesifik kontrol gerektiren durumlarda.</li>
        <li><strong>Avantaj:</strong> Her kelime için bireysel teklif kontrolü. Yüksek değerli kelimelere daha fazla yatırım yapabilirsiniz.</li>
        <li><strong>Dezavantaj:</strong> Zaman alıcıdır. Günün saatine, cihaza, konuma göre otomatik ayarlama yapamaz.</li>
      </ul>

      <h2>Otomatik (Smart Bidding) Stratejileri</h2>
      <p>Google'ın makine öğrenimi algoritmaları, her açık artırmada en uygun teklifi otomatik olarak belirler. Kullanıcının cihazı, konumu, günün saati, arama geçmişi gibi yüzlerce sinyali gerçek zamanlı olarak değerlendirir.</p>

      <h3>Hedef CPA (Target CPA)</h3>
      <p>Belirlediğiniz hedef edinim maliyetine ulaşmak için teklifleri otomatik ayarlar. Bazı tıklamalar hedefinizin üstünde, bazıları altında olacaktır, ancak ortalama hedefe yakınsayacaktır.</p>
      <ul>
        <li>En az 30 dönüşüm/ay ile başlayın.</li>
        <li>Başlangıçta mevcut CPA'nızı hedef olarak girin, sonra kademeli düşürün.</li>
      </ul>

      <h3>Hedef ROAS (Target Return on Ad Spend)</h3>
      <p>Reklam harcamasından elde etmek istediğiniz getiri oranını hedefler. E-ticaret siteleri için idealdir. Örneğin, %400 ROAS hedefi, harcanan her 1 TL için 4 TL gelir beklentisi demektir.</p>

      <h3>Dönüşümleri Maksimize Et (Maximize Conversions)</h3>
      <p>Belirlenen bütçe dahilinde mümkün olan en fazla dönüşümü almayı hedefler. CPA sınırı yoktur — Google bütçenizin tamamını harcayarak en fazla dönüşümü sağlamaya çalışır.</p>

      <h3>Tıklamaları Maksimize Et (Maximize Clicks)</h3>
      <p>Bütçe dahilinde en fazla tıklamayı almayı hedefler. Trafik odaklı kampanyalar ve veri toplama aşaması için uygundur. Dönüşüm kalitesini gözetmez.</p>

      <h2>Doğru Stratejiyi Seçme</h2>
      <p>Kampanyanızın yaşam döngüsüne göre strateji değişmelidir:</p>
      <ol>
        <li><strong>Başlangıç (0-30 gün):</strong> Manuel CPC veya Tıklamaları Maksimize Et ile veri toplayın.</li>
        <li><strong>Veri toplama (30-90 gün):</strong> Yeterli dönüşüm verisi toplandığında Hedef CPA'ya geçin.</li>
        <li><strong>Olgunluk (90+ gün):</strong> Hedef ROAS veya Dönüşümleri Maksimize Et ile ölçekleyin.</li>
      </ol>

      <h2>Bütçe Optimizasyonu İpuçları</h2>
      <ul>
        <li>Düşük performanslı anahtar kelimeleri duraklatın veya tekliflerini düşürün.</li>
        <li>Dönüşüm sağlamayan arama terimlerini negatif kelime olarak ekleyin.</li>
        <li>En iyi performans gösteren saat ve günlerde teklif ayarlaması yapın.</li>
        <li>Mobil ve masaüstü cihazlar için ayrı teklif ayarları belirleyin.</li>
        <li>Coğrafi performans verilerine göre bölgesel teklif ayarlaması yapın.</li>
      </ul>

      <blockquote><strong>İpucu:</strong> Otomatik teklif stratejilerine geçiş yaptıktan sonra en az 2 hafta algoritmaya öğrenme süresi tanıyın. Bu sürede büyük değişiklikler yapmaktan kaçının — algoritma her müdahalede öğrenme sürecini yeniden başlatır.</blockquote>
    `
  },
  {
    id: 'kalite-puani',
    categoryId: 'sem-reklam',
    title: 'Kalite Puanı: Reklam Performansını Artırma',
    description: 'Google Ads kalite puanını etkileyen faktörler ve puanınızı iyileştirme stratejileri.',
    readTime: '8 dk',
    content: `
      <p>Kalite Puanı (Quality Score), Google Ads'in reklamlarınızın ve anahtar kelimelerinizin kalitesini 1-10 arasında derecelendirdiği bir metriktir. Yüksek kalite puanı, daha düşük tıklama maliyeti ve daha iyi reklam pozisyonu anlamına gelir. Aynı teklifi veren iki reklamveren arasında kalite puanı yüksek olan, her zaman daha üst sırada gösterilir.</p>

      <h2>Kalite Puanının Bileşenleri</h2>
      <p>Google, kalite puanını üç ana bileşene göre hesaplar:</p>

      <h3>1. Beklenen Tıklama Oranı (Expected CTR)</h3>
      <p>Google, reklamınızın belirli bir arama sorgusunda ne kadar tıklama alacağını tahmin eder. Bu tahmin, reklamınızın geçmiş performansına ve pozisyondan bağımsız normalize edilmiş tıklama oranına dayanır.</p>
      <ul>
        <li><strong>İyileştirme:</strong> Reklamınızın anahtar kelimeyle doğrudan ilgili olmasını sağlayın. Anahtar kelimeyi reklam başlığında kullanın.</li>
        <li>Harekete geçirici ifadeler (CTA) ekleyin: "Hemen başvurun", "Ücretsiz deneyin".</li>
        <li>Rakiplerden farklılaşan benzersiz değer önerileri vurgulayın.</li>
      </ul>

      <h3>2. Reklam Alaka Düzeyi (Ad Relevance)</h3>
      <p>Reklamınızın, kullanıcının arama niyetiyle ne kadar örtüştüğünü ölçer. Kullanıcı "istanbul SEO ajansı" araması yapıyorsa, reklam metninde İstanbul ve SEO ajansı ifadelerinin geçmesi beklenir.</p>
      <ul>
        <li><strong>İyileştirme:</strong> Reklam gruplarını sıkı temalandırın — her grupta 5-15 yakın ilişkili kelime olsun.</li>
        <li>Her reklam grubu için özelleştirilmiş reklam metinleri yazın.</li>
        <li>Geniş kapsamlı reklam gruplarını daha spesifik gruplara bölün.</li>
      </ul>

      <h3>3. Açılış Sayfası Deneyimi (Landing Page Experience)</h3>
      <p>Kullanıcı reklamınıza tıkladıktan sonra ulaştığı sayfanın kalitesini değerlendirir. Google, sayfanın içeriği, yüklenme hızı, mobil uyumluluk ve kullanıcı deneyimini dikkate alır.</p>
      <ul>
        <li><strong>İçerik uyumu:</strong> Açılış sayfası, reklam metninde vaat ettiğiniz bilgiyi veya ürünü sunmalıdır.</li>
        <li><strong>Sayfa hızı:</strong> 3 saniyenin üzerinde yüklenen sayfalar düşük puan alır.</li>
        <li><strong>Mobil uyumluluk:</strong> Responsive tasarım zorunludur.</li>
        <li><strong>Güven unsurları:</strong> İletişim bilgileri, gizlilik politikası, SSL sertifikası.</li>
        <li><strong>Özgün içerik:</strong> Kopyala-yapıştır içerikler cezalandırılır.</li>
      </ul>

      <h2>Kalite Puanı Neden Önemlidir?</h2>
      <p>Kalite puanı, maliyet ve pozisyon üzerinde doğrudan etkiye sahiptir:</p>
      <ul>
        <li>Kalite puanı 10/10 olan bir anahtar kelime, 5/10 olan bir kelimeye göre yaklaşık <strong>%50 daha az</strong> tıklama maliyeti öder.</li>
        <li>Düşük kalite puanı (1-4), reklamınızın hiç gösterilmemesine bile yol açabilir.</li>
        <li>Yüksek kalite puanı, daha düşük teklifle daha üst sıralarda yer almanızı sağlar.</li>
      </ul>

      <h2>Kalite Puanını Artırma Stratejileri</h2>
      <ol>
        <li><strong>Hesap yapısını yeniden düzenleyin:</strong> Geniş reklam gruplarını daha küçük, tematik gruplara bölün. "SKAG" (Single Keyword Ad Group) yöntemi, her reklam grubunda tek bir anahtar kelime kullanarak maksimum alaka düzeyi sağlar.</li>
        <li><strong>Reklam metinlerini optimize edin:</strong> Her reklam grubunun anahtar kelimesini başlıkta ve açıklamada kullanın. En az 3 farklı varyasyon test edin.</li>
        <li><strong>Açılış sayfalarını özelleştirin:</strong> Mümkünse her reklam grubu için ayrı bir açılış sayfası oluşturun. Sayfanın H1 başlığı, anahtar kelimeyle eşleşmelidir.</li>
        <li><strong>Negatif kelimeler ekleyin:</strong> İlgisiz aramalarda gösterilmek CTR'yi düşürür ve kalite puanını olumsuz etkiler.</li>
        <li><strong>Reklam uzantılarını kullanın:</strong> Sitelink, açıklama uzantısı, telefon uzantısı gibi eklentiler CTR'yi artırarak kalite puanına katkıda bulunur.</li>
      </ol>

      <h2>Kalite Puanı İzleme ve Raporlama</h2>
      <p>Google Ads arayüzünde anahtar kelime düzeyinde kalite puanını ve üç bileşeninin durumunu ("ortalamanın üstünde", "ortalama", "ortalamanın altında") görebilirsiniz. Düzenli olarak kontrol ederek düşük puanlı kelimeleri tespit edin ve iyileştirme planı oluşturun.</p>

      <blockquote><strong>Pratik İpucu:</strong> Kalite puanı 6 ve altındaki anahtar kelimeleri öncelikli olarak optimize edin. 7-8 arası "iyi", 9-10 arası "mükemmel" kabul edilir. Her 1 puanlık artış, tıklama maliyetinizde %10-15 düşüş sağlayabilir.</blockquote>
    `
  },
  {
    id: 'reklam-metni-optimizasyonu',
    categoryId: 'sem-reklam',
    title: 'Reklam Metni Optimizasyonu: Tıklama Oranını Yükseltme',
    description: 'Etkili reklam metni yazma teknikleri, A/B test stratejileri ve dönüşüm odaklı metin formülleri.',
    readTime: '8 dk',
    content: `
      <p>Reklam metni, kullanıcının dikkatini çeken ve tıklamaya ikna eden en kritik unsurdur. Mükemmel bir anahtar kelime seçimi ve yüksek teklif bile kötü yazılmış bir reklam metnini telafi edemez. Bu rehberde etkili reklam metni yazma tekniklerini ve tıklama oranını (CTR) artırma stratejilerini öğreneceksiniz.</p>

      <h2>Google Ads Reklam Formatı</h2>
      <p>Duyarlı arama reklamları (Responsive Search Ads — RSA) Google Ads'in standart formatıdır. En fazla 15 başlık (her biri 30 karakter) ve 4 açıklama (her biri 90 karakter) girmenize izin verir. Google, bu öğelerin en iyi performans gösteren kombinasyonlarını otomatik olarak belirler.</p>

      <h3>Başlık Yazma Kuralları</h3>
      <ul>
        <li><strong>İlk 3 başlık kritiktir:</strong> Google genellikle ilk 3 başlığı gösterir. En güçlü mesajlarınızı buraya yerleştirin.</li>
        <li><strong>Anahtar kelime dahil edin:</strong> En az 2-3 başlıkta hedef anahtar kelimenizi kullanın. Dinamik anahtar kelime ekleme (DKI) özelliğini de değerlendirebilirsiniz.</li>
        <li><strong>Sayılar kullanın:</strong> "500+ Müşteri" veya "%30 İndirim" gibi sayısal ifadeler dikkat çeker.</li>
        <li><strong>Soru sorun:</strong> "SEO'nuzda Sorun mu Var?" gibi sorular merak uyandırır.</li>
        <li><strong>CTA ekleyin:</strong> "Hemen Başlayın", "Ücretsiz Deneyin", "Teklif Alın" gibi aksiyon çağrıları.</li>
      </ul>

      <h3>Açıklama Yazma Kuralları</h3>
      <ul>
        <li>İlk açıklamada değer önerinizi net olarak belirtin.</li>
        <li>Rakiplerden farklılaştığınız noktaları vurgulayın.</li>
        <li>Güven unsurları ekleyin: "10 Yıllık Deneyim", "1000+ Mutlu Müşteri", "Para İadesi Garantisi".</li>
        <li>Aciliyet hissi yaratın: "Sınırlı Süre", "Son 3 Gün", "Stoklar Tükenmeden".</li>
      </ul>

      <h2>Etkili Reklam Metni Formülleri</h2>
      <h3>PAS Formülü (Problem — Agitate — Solution)</h3>
      <p>Kullanıcının sorununu belirtin, sorunun etkisini vurgulayarak aciliyeti artırın ve çözümünüzü sunun.</p>
      <p><em>Örnek:</em> "SEO Sıralmanız Düşüyor mu? | Her Gün Trafik Kaybediyorsunuz | VixSEO ile Hemen Analiz Edin"</p>

      <h3>FAB Formülü (Feature — Advantage — Benefit)</h3>
      <p>Ürünün özelliğini, bu özelliğin sağladığı avantajı ve kullanıcıya olan faydasını sıralayın.</p>
      <p><em>Örnek:</em> "AI Destekli SEO Aracı | Otomatik Anahtar Kelime Takibi | Zamandan %70 Tasarruf Edin"</p>

      <h3>Sosyal Kanıt Formülü</h3>
      <p>Başkalarının deneyimlerini kullanarak güven oluşturun.</p>
      <p><em>Örnek:</em> "500+ Ajansın Tercihi | ⭐ 4.9/5 Müşteri Puanı | Ücretsiz 14 Gün Deneme"</p>

      <h2>A/B Test Stratejisi</h2>
      <p>Reklam metni optimizasyonu sürekli bir test ve iyileştirme sürecidir. Varsayımlarınızı verilerle doğrulamanız gerekir.</p>
      <ol>
        <li><strong>Tek değişken testi:</strong> Her seferinde yalnızca bir öğeyi değiştirin (başlık, CTA, değer önerisi). Birden fazla değişiklik yaparsanız hangi değişikliğin etkili olduğunu bilemezsiniz.</li>
        <li><strong>Yeterli veri toplayın:</strong> İstatistiksel anlamlılık için her varyasyon en az 100-200 tıklama almalıdır. Erken karar vermeyin.</li>
        <li><strong>Kazananı belirleyin:</strong> CTR, dönüşüm oranı ve dönüşüm başına maliyet metriklerini birlikte değerlendirin. Yüksek CTR ancak düşük dönüşüm oranı, yanlış beklenti yaratan bir reklam metnine işaret edebilir.</li>
        <li><strong>Döngüyü sürdürün:</strong> Kazanan varyasyon yeni kontrol grubu olur ve yeni bir test başlar. Optimizasyon hiçbir zaman bitmez.</li>
      </ol>

      <h2>Reklam Uzantıları ile CTR Artışı</h2>
      <p>Reklam uzantıları, reklamınıza ek bilgiler ekleyerek hem daha fazla alan kaplamasını hem de daha fazla tıklama almasını sağlar. Uzantılar CTR'yi ortalama %10-15 artırır.</p>
      <ul>
        <li><strong>Sitelink uzantıları:</strong> Sitenizin farklı sayfalarına doğrudan bağlantılar (Fiyatlandırma, İletişim, Blog vb.).</li>
        <li><strong>Açıklama uzantıları (Callout):</strong> Kısa faydalar: "Ücretsiz Kargo", "7/24 Destek", "30 Gün İade".</li>
        <li><strong>Yapısal snippet:</strong> Kategorize bilgiler: "Hizmetler: SEO, SEM, İçerik, Teknik Denetim".</li>
        <li><strong>Telefon uzantısı:</strong> Mobil kullanıcıların doğrudan arama yapmasını sağlar.</li>
        <li><strong>Fiyat uzantısı:</strong> Ürün veya hizmet fiyatlarını doğrudan reklamda gösterir.</li>
      </ul>

      <h2>Yaygın Hatalar</h2>
      <ul>
        <li>Tüm başlıklarda aynı mesajı tekrarlamak — çeşitlilik sağlayın.</li>
        <li>Rakipleri kötülemek — kendi avantajlarınızı vurgulayın.</li>
        <li>Açılış sayfasıyla uyumsuz vaatler vermek — bu hemen çıkma oranını artırır.</li>
        <li>Genel ifadeler kullanmak — "En iyi hizmet" yerine "Ortalama %40 trafik artışı" gibi spesifik olun.</li>
      </ul>

      <blockquote><strong>Özet:</strong> Etkili reklam metni, hedef anahtar kelimeyi içeren, net bir değer önerisi sunan, güven unsurları barındıran ve güçlü bir CTA ile biten metindir. Her zaman A/B test yapın ve kararlarınızı verilere dayandırın.</blockquote>
    `
  },

  // ===================================================================
  // AI DESTEKLİ SEO
  // ===================================================================
  {
    id: 'yapay-zeka-ile-seo',
    categoryId: 'ai-seo',
    title: 'Yapay Zeka ile SEO: Genel Bakış',
    description: 'AI teknolojilerinin SEO süreçlerine entegrasyonu, fırsatlar, zorluklar ve geleceğe yönelik trendler.',
    readTime: '9 dk',
    content: `
      <p>Yapay zeka (AI), arama motoru optimizasyonunun her aşamasını dönüştürmektedir. Google'ın kendi algoritmasından (RankBrain, BERT, MUM) SEO araçlarına, içerik üretiminden teknik denetimlere kadar AI, SEO profesyonellerinin çalışma şeklini kökten değiştirmektedir.</p>

      <h2>Google'ın AI Algoritmaları</h2>
      <p>Google, arama sonuçlarını iyileştirmek için birden fazla AI sistemi kullanmaktadır:</p>

      <h3>RankBrain</h3>
      <p>2015'te devreye giren RankBrain, Google'ın ilk makine öğrenimi tabanlı sıralama faktörüdür. Daha önce hiç yapılmamış aramaları anlamlandırmak için kullanılır. Google'ın belirttiğine göre, tüm aramaların yaklaşık %15'i daha önce hiç yapılmamış sorgulardır — RankBrain bu yeni sorguları bilinen kalıplarla eşleştirerek doğru sonuçları sunar.</p>

      <h3>BERT ve MUM</h3>
      <p>BERT (2019) ve MUM (2021), doğal dil işleme (NLP) modelleridir. Aramaların bağlamını, niyetini ve nüanslarını anlamak için kullanılırlar. MUM, BERT'ten 1000 kat daha güçlüdür ve 75 farklı dili anlayabilir, metin ve görsel arasında bağlantı kurabilir.</p>

      <h3>AI Overview (Search Generative Experience)</h3>
      <p>Google'ın 2024'te yaygınlaştırdığı AI Overview özelliği, arama sonuçlarının üstünde yapay zeka tarafından üretilen kapsamlı yanıtlar sunar. Bu, organik tıklama oranlarını bazı sorgu türlerinde düşürürken, kaynak olarak gösterilen sitelere yeni bir trafik kanalı açmaktadır.</p>

      <h2>SEO'da AI Kullanım Alanları</h2>
      <h3>Anahtar Kelime Araştırması</h3>
      <p>AI destekli araçlar, geleneksel anahtar kelime araştırmasını çok daha verimli hâle getirmektedir:</p>
      <ul>
        <li>Konu kümeleme ve ilişkili kelime gruplarını otomatik oluşturma.</li>
        <li>Arama niyetini otomatik sınıflandırma (bilgisel, ticari, işlemsel).</li>
        <li>Rakip kelime boşluğu analizini saniyeler içinde tamamlama.</li>
        <li>Trend tahminleri ile gelecekte popülerleşecek kelimeleri önceden tespit etme.</li>
      </ul>

      <h3>İçerik Optimizasyonu</h3>
      <p>AI, mevcut içeriklerin analiz edilmesi ve optimizasyon önerileri sunulması konusunda güçlü bir araçtır:</p>
      <ul>
        <li>Rakip içerik analizi — SERP'teki ilk 10 sonucu analiz ederek içerik boşluklarını tespit etme.</li>
        <li>Konu kapsam skoru — içeriğinizin konuyu ne kadar kapsamlı ele aldığını ölçme.</li>
        <li>Okunabilirlik ve yapısal iyileştirme önerileri.</li>
        <li>NLP optimizasyonu — Google'ın doğal dil anlama modellerine uygun içerik yapısı.</li>
      </ul>

      <h3>Teknik SEO Denetimi</h3>
      <p>AI, büyük sitelerde teknik SEO sorunlarını tespit etme ve önceliklendirme konusunda insan kapasitesinin çok ötesinde performans gösterir:</p>
      <ul>
        <li>Binlerce sayfayı saniyeler içinde tarayarak sorunları kategorize etme.</li>
        <li>İndeksleme sorunlarını tahmin etme ve önleme.</li>
        <li>Log dosya analizi ile tarama bütçesi optimizasyonu.</li>
        <li>Otomatik düzeltme önerileri ve önceliklendirme.</li>
      </ul>

      <h2>AI ile SEO'nun Geleceği</h2>
      <p>AI ve SEO'nun kesişim noktasında birçok gelişme beklenmektedir:</p>
      <ul>
        <li><strong>Kişiselleştirilmiş arama sonuçları:</strong> AI, kullanıcı davranışlarını daha iyi analiz ederek kişiye özel sonuçlar sunacak. Bu, SEO stratejilerinin segmentasyonu zorunlu kılacak.</li>
        <li><strong>Multimodal arama:</strong> Metin, görsel, ses ve video birlikte analiz edilecek. SEO yalnızca metin optimizasyonu olmaktan çıkıp çok modlu bir disipline dönüşecek.</li>
        <li><strong>Gerçek zamanlı optimizasyon:</strong> AI araçları, sıralama değişikliklerini anında tespit edip otomatik düzeltmeler önerecek.</li>
        <li><strong>Doğal dil sorgulama:</strong> Kullanıcılar arama motorlarıyla daha doğal, konuşma dilinde etkileşime girecek. İçeriklerin bu konuşma kalıplarına uyumlu olması gerekecek.</li>
      </ul>

      <h2>AI SEO Araçlarını Değerlendirme Kriterleri</h2>
      <p>Piyasada onlarca AI SEO aracı bulunmaktadır. Doğru aracı seçerken şunlara dikkat edin:</p>
      <ol>
        <li><strong>Veri kaynağı kalitesi:</strong> Araç, verilerini nereden çekiyor? Gerçek arama verileri mi yoksa tahminler mi?</li>
        <li><strong>Önerilerin açıklanabilirliği:</strong> AI neden bu öneriyi yapıyor? "Kara kutu" araçlardan kaçının.</li>
        <li><strong>Entegrasyon kapasitesi:</strong> Mevcut iş akışınıza ve araçlarınıza entegre olabiliyor mu?</li>
        <li><strong>İnsan kontrolü:</strong> Son kararı her zaman insan vermeli. AI önerilerini körü körüne uygulamayın.</li>
      </ol>

      <blockquote><strong>Önemli:</strong> AI, SEO profesyonellerinin yerini almayacak — ancak AI kullanan SEO profesyonelleri, kullanmayanlara göre çok daha verimli ve etkili olacak. AI'yı bir yardımcı araç olarak benimseyin, ancak stratejik kararları insan zekasıyla alın.</blockquote>
    `
  },
  {
    id: 'ai-icerik-uretimi',
    categoryId: 'ai-seo',
    title: 'AI İçerik Üretimi: Kaliteli ve SEO Uyumlu Yazılar',
    description: 'Yapay zeka ile içerik üretiminin doğru yöntemi, kalite kontrol ve Google uyumluluğu rehberi.',
    readTime: '9 dk',
    content: `
      <p>Yapay zeka ile içerik üretimi, SEO dünyasının en tartışmalı ve en hızlı gelişen konularından biridir. Google'ın resmi tutumu açıktır: "İçeriğin nasıl üretildiği değil, kalitesi önemlidir." Bu, AI ile üretilen içeriğin sıralanabileceği ancak belirli kalite standartlarını karşılaması gerektiği anlamına gelir.</p>

      <h2>Google'ın AI İçerik Politikası</h2>
      <p>Google, Şubat 2023'te yayımladığı kılavuzla AI içerik konusundaki tutumunu netleştirmiştir:</p>
      <ul>
        <li>AI ile üretilen içerik otomatik olarak cezalandırılmaz.</li>
        <li>İçerik kalitesi, üretim yönteminden bağımsız olarak değerlendirilir.</li>
        <li>Ancak, yalnızca sıralama manipülasyonu amacıyla toplu üretilen düşük kaliteli AI içerikler spam kabul edilir.</li>
        <li>E-E-A-T standartları AI içerikler için de geçerlidir.</li>
      </ul>

      <h3>Spam ve Kaliteli İçerik Ayrımı</h3>
      <p>Google'ın "Helpful Content" güncellemesi, AI ile üretilmiş olsun veya olmasın, kullanıcıya gerçek değer sunmayan içerikleri hedef alır. Şu sorulara "evet" yanıtı verebiliyorsanız içeriğiniz güvendedir:</p>
      <ol>
        <li>İçerik, gerçek bir konu uzmanlığı veya deneyimi yansıtıyor mu?</li>
        <li>Okuyucu, bu içeriği okuduktan sonra bir şey öğreniyor veya bir sorunu çözmesine yardımcı oluyor mu?</li>
        <li>İçerik, yalnızca arama motoru için değil, gerçek bir insan okuyucu için mi yazılmış?</li>
      </ol>

      <h2>AI İçerik Üretim İş Akışı</h2>
      <h3>Adım 1: Araştırma ve Planlama (İnsan)</h3>
      <p>AI'a ne üretmesini istediğinizi belirlemek en kritik adımdır. Anahtar kelime araştırması, arama niyeti analizi ve içerik planlaması insan tarafından yapılmalıdır.</p>
      <ul>
        <li>Hedef anahtar kelime ve ilişkili terimler belirleyin.</li>
        <li>SERP analizi yapın — rakiplerin ne sunduğunu anlayın.</li>
        <li>İçerik taslağı (outline) oluşturun — H2, H3 başlıklarını planlayın.</li>
        <li>Farklılaştırıcı unsurları belirleyin — ne ekstra değer sunacaksınız?</li>
      </ul>

      <h3>Adım 2: Taslak Oluşturma (AI + İnsan)</h3>
      <p>AI'ı detaylı talimatlarla (prompt) yönlendirerek ilk taslağı oluşturmasını sağlayın. Etkili bir prompt şunları içermelidir:</p>
      <ul>
        <li>Hedef kitle tanımı ve bilgi düzeyi.</li>
        <li>Yazı tonu ve stili (akademik, samimi, teknik vb.).</li>
        <li>İçerik yapısı ve alt başlıklar.</li>
        <li>Dahil edilmesi gereken spesifik bilgiler veya örnekler.</li>
        <li>Kelime sayısı ve format gereksinimleri.</li>
      </ul>

      <h3>Adım 3: İnsan Editöryal Süreci (İnsan)</h3>
      <p>AI taslağını ham malzeme olarak değerlendirin ve kapsamlı bir editöryal süreçten geçirin:</p>
      <ul>
        <li><strong>Doğruluk kontrolü:</strong> AI halüsinasyonları (yanlış bilgi) kontrol edin. İstatistikler, tarihler ve teknik bilgiler doğrulanmalıdır.</li>
        <li><strong>Özgünlük katma:</strong> Kişisel deneyimler, vaka çalışmaları, orijinal veriler ve uzman görüşleri ekleyin. Bu, E-E-A-T'ın "Deneyim" bileşenini karşılar.</li>
        <li><strong>Ses ve ton ayarlama:</strong> Markanızın sesine uygun hâle getirin. AI'ın genel tonunu kendi tarzınıza dönüştürün.</li>
        <li><strong>Yapısal iyileştirme:</strong> Akış, geçişler ve mantıksal tutarlılığı kontrol edin.</li>
        <li><strong>SEO optimizasyonu:</strong> Başlık etiketi, meta açıklama, başlık hiyerarşisi ve dahili bağlantıları ekleyin veya iyileştirin.</li>
      </ul>

      <h3>Adım 4: Kalite Kontrol (İnsan)</h3>
      <p>Son kontrolde şu kriterleri değerlendirin:</p>
      <ol>
        <li>İçerik, hedef anahtar kelimenin arama niyetini karşılıyor mu?</li>
        <li>Rakip içeriklerden daha kapsamlı veya daha değerli mi?</li>
        <li>Okunabilirlik uygun mu? (Kısa paragraflar, alt başlıklar, görseller)</li>
        <li>Gerçek bir insan tarafından yazılmış gibi okunuyor mu?</li>
        <li>Kullanıcıya somut bir değer sunuyor mu?</li>
      </ol>

      <h2>AI İçerik Üretiminde Yapılmaması Gerekenler</h2>
      <ul>
        <li><strong>Toplu üretim ve doğrudan yayınlama:</strong> AI çıktısını hiçbir insan müdahalesi olmadan yayınlamak en büyük risktir.</li>
        <li><strong>Aynı şablonla tekrarlayan içerikler:</strong> Google, kalıplaşmış AI içeriklerini tespit edebilir.</li>
        <li><strong>Kaynak doğrulaması yapmamak:</strong> AI'ın verdiği istatistikler ve referanslar yanlış olabilir.</li>
        <li><strong>Uzmanlık gerektiren konularda tamamen AI'a güvenmek:</strong> Tıp, hukuk, finans gibi YMYL (Your Money, Your Life) konularında insan uzman editörlüğü zorunludur.</li>
      </ul>

      <h2>AI İçerik Araçları ve Karşılaştırma</h2>
      <p>Piyasadaki AI içerik araçları farklı güçlü yönlere sahiptir:</p>
      <ul>
        <li><strong>Genel amaçlı LLM'ler:</strong> Claude, GPT-4 gibi modeller esneklik ve kalite sunar ancak SEO-spesifik özellikler barındırmaz.</li>
        <li><strong>SEO odaklı AI araçlar:</strong> Surfer AI, Jasper gibi araçlar anahtar kelime entegrasyonu ve SERP analizi sunar.</li>
        <li><strong>Hibrit yaklaşım:</strong> Genel amaçlı LLM ile taslak oluşturup, SEO aracıyla optimize etmek en etkili yöntemdir.</li>
      </ul>

      <blockquote><strong>Altın Kural:</strong> AI'yı "yazar" değil, "asistan" olarak kullanın. En iyi sonuçlar, insan uzmanlığı ve AI verimliliğinin birleşiminden doğar. Her zaman "Bu içerik, AI olmadan yazılsaydı aynı kalitede mi olurdu?" sorusunu sorun.</blockquote>
    `
  },
  {
    id: 'otomatik-seo-denetimi',
    categoryId: 'ai-seo',
    title: 'Otomatik SEO Denetimi: AI Tabanlı Site Analizi',
    description: 'Yapay zeka destekli SEO denetim araçları, otomatik sorun tespiti ve önceliklendirme stratejileri.',
    readTime: '8 dk',
    content: `
      <p>SEO denetimi (audit), bir web sitesinin arama motoru performansını etkileyen teknik, içerik ve off-page faktörlerinin kapsamlı analizidir. Geleneksel SEO denetimleri günler hatta haftalar sürebilirken, AI destekli araçlar bu süreci saatlere indirgemiş ve çok daha derinlemesine analiz yapabilir hâle gelmiştir.</p>

      <h2>Geleneksel vs. AI Destekli Denetim</h2>
      <p>Geleneksel SEO denetimi, bir uzmanın çeşitli araçlardan veri toplayıp manuel olarak analiz etmesini gerektirir. AI destekli denetim ise bu süreci otomatikleştirir ve insan kapasitesinin ötesinde örüntüler tespit eder.</p>
      <ul>
        <li><strong>Hız:</strong> 10.000 sayfalık bir siteyi geleneksel yöntemle denetlemek günler sürerken, AI ile saatler içinde tamamlanır.</li>
        <li><strong>Derinlik:</strong> AI, sayfa düzeyinde mikro sorunları bile tespit eder — eksik alt etiketleri, ince (thin) içerik, kanibalizasyon gibi.</li>
        <li><strong>Önceliklendirme:</strong> AI, sorunları etkilerine göre otomatik sıralayarak en yüksek ROI'ye sahip düzeltmeleri öne çıkarır.</li>
        <li><strong>Trend analizi:</strong> Zaman içindeki değişimleri izleyerek kötüleşen metrikleri erken tespit eder.</li>
      </ul>

      <h2>AI Denetim Kapsamı</h2>
      <h3>Teknik SEO Denetimi</h3>
      <p>AI tabanlı teknik denetim aşağıdaki alanları kapsar:</p>
      <ul>
        <li><strong>Taranabilirlik:</strong> Robots.txt analizi, sitemap doğrulama, tarama hataları, yönlendirme zincirleri ve döngüleri.</li>
        <li><strong>İndekslenme:</strong> İndeks durumu kontrolü, canonical etiket analizi, duplicate içerik tespiti.</li>
        <li><strong>Sayfa hızı:</strong> Core Web Vitals ölçümü (LCP, INP, CLS), render engelleme kaynakları, görsel optimizasyonu.</li>
        <li><strong>Mobil uyumluluk:</strong> Responsive tasarım kontrolü, dokunmatik hedef boyutları, viewport yapılandırması.</li>
        <li><strong>Güvenlik:</strong> HTTPS yapılandırması, karışık içerik (mixed content), HTTP güvenlik başlıkları.</li>
        <li><strong>Yapısal veri:</strong> Schema.org işaretlemesi doğrulama, hata ve uyarı tespiti.</li>
      </ul>

      <h3>İçerik Denetimi</h3>
      <p>AI, içerik kalitesini birden fazla boyutta analiz eder:</p>
      <ul>
        <li><strong>Anahtar kelime optimizasyonu:</strong> Her sayfanın hedef kelimesi için ne kadar optimize olduğu, kelime kullanım sıklığı ve dağılımı.</li>
        <li><strong>İçerik boşlukları:</strong> Rakiplerin kapsadığı ancak sizin sitenizde bulunmayan konu ve alt konular.</li>
        <li><strong>Kanibalizasyon:</strong> Birden fazla sayfanın aynı anahtar kelime için rekabet ettiği durumlar.</li>
        <li><strong>İnce içerik:</strong> Çok az metin içeren veya düşük kaliteli sayfalar.</li>
        <li><strong>Başlık ve meta etiketleri:</strong> Eksik, tekrarlayan veya optimize edilmemiş etiketler.</li>
      </ul>

      <h3>Bağlantı Profili Denetimi</h3>
      <p>AI, backlink profilinizi analiz ederek potansiyel riskleri ve fırsatları belirler:</p>
      <ul>
        <li>Toksik backlink tespiti — spam sitelerden gelen zararlı bağlantılar.</li>
        <li>Çapa metni dağılımı analizi — doğal görünüp görünmediği.</li>
        <li>Kaybedilen ve kazanılan backlink takibi.</li>
        <li>Rakip bağlantı fırsatları — rakibin sahip olup sizin sahip olmadığınız bağlantılar.</li>
      </ul>

      <h2>Denetim Sonrası Aksiyon Planı</h2>
      <p>Denetim sonuçlarını etkili bir aksiyon planına dönüştürmek, denetimin kendisi kadar önemlidir:</p>
      <ol>
        <li><strong>Kritik sorunlar (hemen):</strong> İndeksleme engelleri, 5xx hataları, güvenlik sorunları.</li>
        <li><strong>Yüksek etki (1-2 hafta):</strong> Core Web Vitals sorunları, duplicate içerik, canonical hataları.</li>
        <li><strong>Orta etki (1 ay):</strong> Meta etiket optimizasyonu, başlık hiyerarşisi düzeltmeleri, dahili bağlantı iyileştirme.</li>
        <li><strong>Uzun vadeli (sürekli):</strong> İçerik güncellemeleri, backlink kazanımı, yeni içerik üretimi.</li>
      </ol>

      <h2>Sürekli Denetim (Continuous Auditing)</h2>
      <p>AI'ın en büyük avantajı, tek seferlik denetim yerine sürekli izleme yapabilmesidir. VixSEO gibi platformlar, sitenizi düzenli aralıklarla otomatik tarayarak yeni sorunları anında tespit eder ve uyarı gönderir.</p>
      <ul>
        <li>Haftalık otomatik tarama ile yeni teknik sorunları erken yakalayın.</li>
        <li>Sıralama ve trafik değişimlerini AI ile ilişkilendirerek kök nedenleri hızla belirleyin.</li>
        <li>Rakip değişikliklerini izleyerek proaktif önlemler alın.</li>
      </ul>

      <blockquote><strong>Hatırlatma:</strong> AI denetim araçları güçlü yardımcılardır ancak sonuçları bir SEO uzmanının yorumlaması gerekir. AI, sorunları tespit eder; ancak iş önceliklerini, bütçe kısıtlarını ve stratejik hedefleri insan değerlendirir.</blockquote>
    `
  },
  {
    id: 'predictive-seo',
    categoryId: 'ai-seo',
    title: 'Predictive SEO: Tahmine Dayalı Optimizasyon',
    description: 'Makine öğrenimi ile arama trendlerini önceden tahmin etme, proaktif içerik stratejisi ve fırsat analizi.',
    readTime: '8 dk',
    content: `
      <p>Predictive SEO (Tahmine Dayalı SEO), geçmiş verileri ve makine öğrenimi algoritmalarını kullanarak gelecekteki arama trendlerini, sıralama değişikliklerini ve kullanıcı davranışlarını tahmin etme ve buna göre proaktif strateji oluşturma yaklaşımıdır. Reaktif SEO'nun aksine, olaylar gerçekleşmeden önce harekete geçmeyi amaçlar.</p>

      <h2>Predictive SEO Neden Önemlidir?</h2>
      <p>Geleneksel SEO, çoğunlukla reaktiftir: bir sıralama düşüşü yaşarsınız, sonra nedenini araştırırsınız. Trafik bir anahtar kelimede artarsa, sonra o kelime etrafında içerik üretirsiniz. Predictive SEO ise bu döngüyü tersine çevirir:</p>
      <ul>
        <li><strong>Mevsimsel trendler:</strong> Yaz tatili, okula dönüş, Kara Cuma gibi mevsimsel aramalar önceden tahmin edilerek içerik zamanında hazırlanır.</li>
        <li><strong>Yükselen konular:</strong> Henüz popüler olmayan ancak hızla büyüyen arama terimlerini erken tespit etmek, düşük rekabette yüksek sıralama fırsatı sunar.</li>
        <li><strong>Algoritma etkileri:</strong> Google algoritma güncellemelerinin sitenize olası etkilerini tahmin ederek önleyici tedbirler almak.</li>
        <li><strong>Rakip hareketleri:</strong> Rakiplerin stratejik yönelimlerini analiz ederek rekabet avantajı sağlamak.</li>
      </ul>

      <h2>Veri Kaynakları ve Analiz Yöntemleri</h2>
      <h3>Tarihsel Arama Verileri</h3>
      <p>Google Search Console, Google Trends ve üçüncü parti araçlardan elde edilen geçmiş arama verileri, tahminlerin temelini oluşturur:</p>
      <ul>
        <li><strong>Zaman serisi analizi:</strong> Aylık ve yıllık arama hacmi değişimlerini inceleyerek gelecek dönem tahminleri oluşturun.</li>
        <li><strong>Mevsimsellik tespiti:</strong> Hangi kelimelerin hangi aylarda zirve yaptığını belirleyerek içerik takvimini buna göre planlayın.</li>
        <li><strong>Trend eğrileri:</strong> Doğrusal büyüme, üssel büyüme veya düşüş trendlerini tespit edin.</li>
      </ul>

      <h3>Sosyal Dinleme ve Erken Sinyaller</h3>
      <p>Arama motorlarında popülerleşmeden önce konular genellikle sosyal medyada ve forumlarda konuşulmaya başlanır:</p>
      <ul>
        <li>Reddit, X (Twitter) ve LinkedIn'deki trend konular.</li>
        <li>Sektörel haber siteleri ve podcast'ler.</li>
        <li>Akademik yayınlar ve araştırma raporları.</li>
        <li>Patent başvuruları ve ürün duyuruları.</li>
      </ul>

      <h3>Rakip İzleme</h3>
      <p>Rakiplerin içerik stratejileri, yeni yayınladıkları sayfalar ve SEO yatırımları gelecekteki rekabet ortamını tahmin etmek için değerli sinyallerdir:</p>
      <ul>
        <li>Rakiplerin yeni oluşturduğu içerik kümeleri hangi konulara yöneliyor?</li>
        <li>Hangi anahtar kelimelerde agresif içerik üretiyorlar?</li>
        <li>Teknik altyapılarında ne gibi değişiklikler yapıyorlar?</li>
      </ul>

      <h2>Proaktif İçerik Stratejisi</h2>
      <p>Predictive SEO verilerini içerik stratejisine dönüştürmek için şu yaklaşımı uygulayın:</p>
      <ol>
        <li><strong>Erken içerik üretimi:</strong> Yükselen bir trend tespit ettiğinizde, rakiplerden önce o konuda kapsamlı içerik üretin. Google, bir konuda ilk ve en kapsamlı içeriği sunan siteyi otorite olarak değerlendirme eğilimindedir.</li>
        <li><strong>Mevsimsel içerik takvimi:</strong> Mevsimsel aramaların 2-3 ay öncesinden içerikleri yayınlayın ve Google'ın indeksleyip sıralamasına zaman tanıyın.</li>
        <li><strong>Senaryo planlaması:</strong> Farklı senaryolar için hazırlıklı olun. Bir algoritma güncellemesi belirli bir içerik türünü olumsuz etkilerse hangi alternatif stratejiyi uygulayacaksınız?</li>
        <li><strong>Dinamik önceliklendirme:</strong> Tahmin verilerine göre içerik üretim sırasını sürekli güncelleyin. Yükselen konulara öncelik verin.</li>
      </ol>

      <h2>Makine Öğrenimi Modelleri</h2>
      <p>Predictive SEO'da kullanılan başlıca makine öğrenimi yaklaşımları:</p>
      <ul>
        <li><strong>Regresyon modelleri:</strong> Geçmiş verilere dayalı sayısal tahminler — gelecek ayın tahmini arama hacmi, beklenen trafik miktarı.</li>
        <li><strong>Sınıflandırma modelleri:</strong> Bir sayfanın ilk sayfada yer alıp almayacağını tahmin etme, içerik kalite sınıflandırması.</li>
        <li><strong>Doğal dil işleme (NLP):</strong> İçerik analizi, arama niyeti sınıflandırması, konu modelleme.</li>
        <li><strong>Anomali tespiti:</strong> Beklenmedik trafik düşüşlerini veya sıralama değişikliklerini anında tespit etme.</li>
      </ul>

      <h2>Predictive SEO Uygulama Adımları</h2>
      <ol>
        <li>GSC ve analitik verilerinizi minimum 12 aylık bir geçmişle toplayın.</li>
        <li>Mevsimsel kalıpları ve uzun vadeli trendleri belirleyin.</li>
        <li>Yükselen ve düşen anahtar kelime gruplarını tespit edin.</li>
        <li>Rakip içerik ve backlink değişikliklerini izleyin.</li>
        <li>Bulgulara dayalı 3 aylık proaktif içerik planı oluşturun.</li>
        <li>Tahminlerin doğruluğunu ölçün ve modeli sürekli iyileştirin.</li>
      </ol>

      <blockquote><strong>Sonuç:</strong> Predictive SEO, veri bilimi ve SEO stratejisinin kesişim noktasıdır. Tam olarak doğru tahminler yapmak mümkün olmasa da, hazırlıklı olmak ve trendlerin önünde durmak, rakiplere karşı önemli bir avantaj sağlar. Verilerle konuşun, trendleri takip edin ve her zaman bir adım önde olun.</blockquote>
    `
  },

  // ===================================================================
  // GENERATIVE ENGINE OPTIMIZATION (GEO)
  // ===================================================================
  {
    id: 'geo-nedir',
    categoryId: 'geo',
    title: 'GEO Nedir? Generative Engine Optimization Rehberi',
    description: 'AI destekli arama motorları için optimizasyon stratejileri, GEO kavramı ve klasik SEO ile farkları.',
    readTime: '10 dk',
    content: `
      <p>Generative Engine Optimization (GEO), yapay zeka destekli arama motorları ve asistan sistemlerinin (Google AI Overview, Perplexity, ChatGPT Browse, Microsoft Copilot vb.) yanıtlarında içeriğinizin kaynak olarak referans gösterilmesi ve kullanılması için yapılan optimizasyon çalışmalarını kapsar. Klasik SEO'nun evrilmiş hâli olarak düşünülebilir.</p>

      <h2>GEO Neden Ortaya Çıktı?</h2>
      <p>Arama deneyimi temelden değişmektedir. Kullanıcılar artık 10 mavi bağlantı arasından seçmek yerine, AI asistanlardan doğrudan cevap almayı beklemektedir. Bu durum SEO'yu iki yönde etkilemektedir:</p>
      <ul>
        <li><strong>Sıfır tıklama arama artışı:</strong> AI tarafından oluşturulan yanıtlar, kullanıcının herhangi bir web sitesine tıklamadan bilgi edinmesini sağlar. Bu, bazı sorgu türlerinde organik trafiği düşürebilir.</li>
        <li><strong>Kaynak olarak görünme fırsatı:</strong> AI yanıtlarının altında referans olarak gösterilen siteler, yüksek kaliteli trafik ve otorite kazanır. Kaynak olarak gösterilmek, yeni tıklama kanalı hâline gelmiştir.</li>
      </ul>
      <p>GEO, bu yeni gerçekliğe uyum sağlamak için geliştirilmiş bir optimizasyon disiplinidir.</p>

      <h2>GEO ile SEO Arasındaki Farklar</h2>
      <p>GEO ve geleneksel SEO birbirini dışlamaz, tamamlar. Ancak bazı önemli farklar vardır:</p>
      <ul>
        <li><strong>Hedef:</strong> SEO arama sonuçlarında sıralama hedeflerken, GEO AI yanıtlarında kaynak olarak referans gösterilmeyi hedefler.</li>
        <li><strong>İçerik yapısı:</strong> SEO için anahtar kelime odaklı içerik yeterli olabilirken, GEO için kapsamlı, iyi yapılandırılmış ve doğrulanabilir bilgi gerekir.</li>
        <li><strong>Otorite sinyalleri:</strong> SEO'da backlink sayısı önemli iken, GEO'da içeriğin güvenilirliği, kaynakların doğrulanabilirliği ve uzmanlık sinyalleri ön plandadır.</li>
        <li><strong>Teknik gereksinimler:</strong> GEO, yapısal veri işaretlemesine (Schema.org) çok daha fazla önem verir çünkü AI modelleri yapılandırılmış veriyi daha kolay işler.</li>
      </ul>

      <h2>GEO Temel Stratejileri</h2>
      <h3>1. Kaynak Güvenilirliği (Citability)</h3>
      <p>AI modelleri, yanıtlarında referans gösterirken güvenilir kaynaklara öncelik verir. Sitenizin kaynak olarak değerlendirilmesi için:</p>
      <ul>
        <li>İçeriğinizde istatistikler, araştırma sonuçları ve doğrulanabilir veriler kullanın.</li>
        <li>Birincil kaynaklar sunun — orijinal araştırmalar, anketler, vaka çalışmaları.</li>
        <li>Yazar uzmanlığını açıkça belirtin — yazar sayfaları, kimlik bilgileri, LinkedIn profilleri.</li>
        <li>İçeriğinizin güncellenme tarihini belirtin ve düzenli olarak güncelleyin.</li>
      </ul>

      <h3>2. Kapsamlı ve Yapılandırılmış İçerik</h3>
      <p>AI modelleri, bir konuyu kapsamlı şekilde ele alan içerikleri kaynak olarak tercih eder:</p>
      <ul>
        <li>Konunun tüm alt başlıklarını kapsayın — yüzeysel içerikler referans gösterilmez.</li>
        <li>Net başlık hiyerarşisi kullanın (H2, H3, H4) — AI, yapılandırılmış içeriği daha iyi işler.</li>
        <li>Tanımlar, listeler ve adım adım talimatlar ekleyin — bunlar AI yanıtlarına doğrudan alıntılanabilir formattadır.</li>
        <li>Soru-cevap formatı kullanın — AI modelleri soruları yanıtlarken bu yapıyı kolayca entegre edebilir.</li>
      </ul>

      <h3>3. Tematik Otorite</h3>
      <p>AI modelleri, bir konuda kapsamlı içerik sunan siteleri o alanda otorite olarak değerlendirir:</p>
      <ul>
        <li>Konu kümeleri (topic clusters) oluşturun — bir ana konuyu birden fazla ilişkili sayfayla derinlemesine ele alın.</li>
        <li>Dahili bağlantılarla tüm ilişkili içerikleri birbirine bağlayın.</li>
        <li>Belirli bir nişte derinleşin — her konuda yüzeysel içerik yerine, uzmanlık alanınızda derin içerik üretin.</li>
      </ul>

      <h3>4. Multimodal İçerik</h3>
      <p>AI modelleri metin yanı sıra görsel, video ve tablo verilerini de işleyebilir:</p>
      <ul>
        <li>Bilgilendirici görseller, infografikler ve diyagramlar kullanın.</li>
        <li>Tablolarla verileri yapılandırılmış şekilde sunun.</li>
        <li>Video transkriptleri ekleyin.</li>
        <li>Her medya öğesini açıklayıcı alt metin ve başlıklarla etiketleyin.</li>
      </ul>

      <h2>GEO İçin Teknik Gereksinimler</h2>
      <ul>
        <li>Kapsamlı Schema.org işaretlemesi (Article, FAQ, HowTo, Organization).</li>
        <li>Hızlı ve erişilebilir sayfa (AI botları yavaş sayfaları atlar).</li>
        <li>Temiz HTML yapısı — semantik etiketler kullanın.</li>
        <li>robots.txt'de AI botlarını engellemeyin (GPTBot, Perplexitybot, ClaudeBot vb.).</li>
      </ul>

      <h2>GEO Performansını Ölçme</h2>
      <p>GEO performansını ölçmek henüz gelişmekte olan bir alandır, ancak şu metrikleri takip edebilirsiniz:</p>
      <ul>
        <li>Google AI Overview'da kaynak olarak gösterilme sıklığı.</li>
        <li>Perplexity, ChatGPT gibi platformlarda markanızın referans gösterilmesi.</li>
        <li>Referans trafiği — AI platformlarından gelen ziyaretçi sayısı.</li>
        <li>Marka arama hacmi değişimi — AI referansları marka bilinirliğini artırır.</li>
      </ul>

      <blockquote><strong>Sonuç:</strong> GEO, SEO'nun yerini almıyor, onu genişletiyor. Klasik SEO teknikleri hâlâ geçerli ve önemli, ancak AI arama çağında kaynak olarak referans gösterilmek ek bir optimizasyon katmanı gerektiriyor. Hem SEO hem GEO'ya yatırım yapan siteler, gelecekte en avantajlı konumda olacaktır.</blockquote>
    `
  },
  {
    id: 'ai-arama-motorlari-icin-optimizasyon',
    categoryId: 'geo',
    title: 'AI Arama Motorları İçin İçerik Optimizasyonu',
    description: 'Perplexity, Google AI Overview, ChatGPT ve diğer AI arama platformlarında görünürlüğü artırma stratejileri.',
    readTime: '9 dk',
    content: `
      <p>AI arama motorları — Google AI Overview, Perplexity, ChatGPT Browse, Microsoft Copilot ve You.com gibi platformlar — bilgi arama deneyimini yeniden şekillendirmektedir. Bu platformlar, geleneksel arama motorlarından farklı olarak içeriği doğrudan sentezler ve kaynaklarıyla birlikte sunar. İçeriğinizin bu platformlarda referans gösterilmesi için farklı bir optimizasyon yaklaşımı gerekir.</p>

      <h2>AI Arama Motorları Nasıl Çalışır?</h2>
      <p>Geleneksel arama motorları sayfaları sıralarken, AI arama motorları bilgiyi sentezler. Süreç şu şekilde işler:</p>
      <ol>
        <li><strong>Sorgu analizi:</strong> Kullanıcının sorusunun niyeti ve bağlamı analiz edilir.</li>
        <li><strong>Kaynak toplama:</strong> Web'den ilgili kaynaklar toplanır ve değerlendirilir.</li>
        <li><strong>Bilgi sentezi:</strong> Toplanan bilgiler birleştirilerek kapsamlı bir yanıt oluşturulur.</li>
        <li><strong>Kaynak atıfı:</strong> Kullanılan kaynaklar referans olarak gösterilir.</li>
      </ol>
      <p>Bu süreçte kaynak olarak seçilmek için içeriğinizin güvenilir, kapsamlı ve kolay işlenebilir olması gerekmektedir.</p>

      <h2>Platform Bazlı Optimizasyon</h2>
      <h3>Google AI Overview</h3>
      <p>Google'ın arama sonuçlarının üstünde gösterilen AI tarafından oluşturulmuş özet yanıtlardır. Geleneksel SEO ile en yakın ilişkiye sahip platformdur:</p>
      <ul>
        <li>Google'ın zaten indekslediği sayfalardan beslenir — teknik SEO temelleri aynen geçerlidir.</li>
        <li>Featured snippet'larda görünen içerikler AI Overview'da da kaynak olarak gösterilme eğilimindedir.</li>
        <li>Yapısal veri işaretlemesi AI Overview kaynak seçiminde avantaj sağlar.</li>
        <li>E-E-A-T sinyalleri özellikle YMYL konularında kritik önem taşır.</li>
      </ul>

      <h3>Perplexity</h3>
      <p>Perplexity, kaynakları açıkça gösteren ve her bilgi parçasını referanslarla destekleyen bir AI arama motorudur:</p>
      <ul>
        <li>Doğrudan alıntılanabilir, net bilgiler içeren içerikler tercih edilir.</li>
        <li>İstatistikler, tarihler ve spesifik veriler yüksek referans oranına sahiptir.</li>
        <li>Teknik doğruluk kritik önem taşır — yanlış bilgi içeren kaynaklar hızla filtrelenir.</li>
      </ul>

      <h3>ChatGPT Browse ve Microsoft Copilot</h3>
      <p>Bu platformlar Bing indeksini kullanır ve web'den gerçek zamanlı bilgi çeker:</p>
      <ul>
        <li>Bing SEO'su burada daha fazla önem kazanır — Bing Webmaster Tools kullanın.</li>
        <li>Hızlı yüklenen, temiz HTML yapısına sahip sayfalar tercih edilir.</li>
        <li>Kaynağın otoritesi ve güncelliği önemli faktörlerdir.</li>
      </ul>

      <h2>İçerik Optimizasyon İlkeleri</h2>
      <h3>1. Doğrudan Yanıtlar Sunun</h3>
      <p>AI arama motorları, sorulara doğrudan ve net yanıtlar veren kaynakları tercih eder:</p>
      <ul>
        <li>Her bölümün başında konunun özünü veren bir giriş cümlesi yazın.</li>
        <li>Karmaşık kavramları basit ve net tanımlarla açıklayın.</li>
        <li>"X nedir?" formatında soruları içeriğinizin alt başlıklarına dahil edin.</li>
        <li>Yanıtlarınızı somut verilerle destekleyin.</li>
      </ul>

      <h3>2. Bilgiyi Yapılandırın</h3>
      <p>AI modelleri yapılandırılmış bilgiyi daha kolay işler ve alıntılar:</p>
      <ul>
        <li>Madde işaretleri ve numaralı listeler kullanın.</li>
        <li>Karşılaştırma tabloları oluşturun.</li>
        <li>Anahtar terimleri kalın ile vurgulayın.</li>
        <li>Her bölümü açıklayıcı alt başlıklarla ayırın.</li>
      </ul>

      <h3>3. Birincil Kaynak Olun</h3>
      <p>AI modelleri, bilgiyi ilk sunan (birincil) kaynağa daha yüksek değer atfeder:</p>
      <ul>
        <li>Orijinal araştırma ve veri yayınlayın.</li>
        <li>Sektörel anketler düzenleyip sonuçlarını paylaşın.</li>
        <li>Vaka çalışmaları ve deneyimlerinizi belgeleyin.</li>
        <li>Benzersiz bakış açıları ve analizler sunun.</li>
      </ul>

      <h3>4. Güncelliği Koruyun</h3>
      <p>AI modelleri güncel bilgi sunan kaynakları tercih eder:</p>
      <ul>
        <li>İçeriklerinize son güncelleme tarihini ekleyin.</li>
        <li>Düzenli aralıklarla (3-6 ayda bir) içerikleri gözden geçirin ve güncelleyin.</li>
        <li>Eski istatistikleri ve bilgileri güncelleyin.</li>
        <li>Yeni gelişmeleri mevcut içeriklere dahil edin.</li>
      </ul>

      <h2>Teknik Optimizasyon</h2>
      <ul>
        <li><strong>AI botlarına erişim izni:</strong> robots.txt dosyanızda GPTBot, Perplexitybot, ClaudeBot ve diğer AI botlarını engellemeyin.</li>
        <li><strong>Hızlı yüklenme:</strong> AI tarayıcıları zaman kısıtlaması ile çalışır — yavaş sayfalar atlanabilir.</li>
        <li><strong>Temiz HTML:</strong> Semantik etiketler (article, section, aside, nav) kullanın.</li>
        <li><strong>Yapısal veri:</strong> Schema.org işaretlemesini kapsamlı uygulayın.</li>
        <li><strong>Canonical URL:</strong> İçeriğinizin tek bir kanonik kaynaktan sunulmasını sağlayın.</li>
      </ul>

      <h2>Ölçüm ve İzleme</h2>
      <p>AI arama motorlarından gelen trafiği ve referansları takip etmek için:</p>
      <ul>
        <li>Google Analytics'te AI platformlarından gelen referans trafiğini segmentleyin.</li>
        <li>Perplexity ve diğer platformlarda markanızı periyodik olarak aratarak referans gösterilme durumunu kontrol edin.</li>
        <li>AI Overview'da görünme sıklığınızı Search Console ve üçüncü parti araçlarla izleyin.</li>
      </ul>

      <blockquote><strong>Strateji Özeti:</strong> AI arama motorları için optimize etmek, aslında kaliteli SEO'nun en iyi uygulamalarını güçlendirmek demektir. Güvenilir, kapsamlı, iyi yapılandırılmış ve güncel içerik üretin. Birincil kaynak olmaya çalışın. Teknik altyapınızı AI tarayıcıları için optimize edin.</blockquote>
    `
  },
  {
    id: 'kaynak-gosterimi-ve-otorite',
    categoryId: 'geo',
    title: 'Kaynak Gösterimi ve Otorite İnşası',
    description: 'AI yanıtlarında kaynak olarak referans gösterilme stratejileri ve dijital otorite oluşturma yöntemleri.',
    readTime: '8 dk',
    content: `
      <p>AI arama motorlarının yanıtlarında kaynak olarak referans gösterilmek (citation), dijital görünürlüğün yeni para birimidir. Bir AI sistemi yanıtını oluştururken hangi kaynakları kullanacağını belirlerken, güvenilirlik, kapsam ve teknik erişilebilirlik gibi faktörleri değerlendirir. Bu rehberde AI referans mekanizmalarını ve otorite inşası stratejilerini ele alacağız.</p>

      <h2>AI Kaynak Seçim Kriterleri</h2>
      <p>AI modelleri, yanıtlarında referans gösterecekleri kaynakları seçerken birden fazla sinyal kullanır:</p>

      <h3>1. Bilgi Güvenilirliği</h3>
      <ul>
        <li><strong>Veri destekli içerik:</strong> İstatistikler, araştırma sonuçları ve doğrulanabilir veriler içeren sayfalar öncelik kazanır.</li>
        <li><strong>Kaynak şeffaflığı:</strong> İçeriğinizdeki bilgilerin nereden geldiğini belirtmek, AI'ın sizi güvenilir kaynak olarak değerlendirmesini sağlar.</li>
        <li><strong>Tutarlılık:</strong> Sitenizin farklı sayfalarındaki bilgilerin birbiriyle çelişmemesi önemlidir.</li>
        <li><strong>Doğruluk geçmişi:</strong> AI modelleri, geçmişte doğru bilgi sunan kaynakları zaman içinde daha güvenilir olarak değerlendirir.</li>
      </ul>

      <h3>2. Tematik Otorite</h3>
      <p>Belirli bir konuda derinlemesine ve kapsamlı içerik sunan siteler, o alanda otorite olarak kabul edilir. Tek bir sayfa yerine, bir konu etrafında çoklu sayfalardan oluşan bir kümenin varlığı kritik önem taşır.</p>
      <ul>
        <li>Konunuzu birden fazla açıdan ele alan sayfa kümeleri oluşturun.</li>
        <li>Ana konuyu (pillar) ve alt konuları (cluster) dahili bağlantılarla birbirine bağlayın.</li>
        <li>Sık sorulan soruları ayrı sayfalar veya bölümler olarak yanıtlayın.</li>
      </ul>

      <h3>3. İçerik Güncelliği</h3>
      <ul>
        <li>Son güncelleme tarihini HTML meta verisinde ve sayfa üzerinde belirtin.</li>
        <li>Düzenli güncellemeler yapın — ayda en az bir kez içerikleri gözden geçirin.</li>
        <li>Eski bilgileri kaldırın veya güncelleyin — modası geçmiş veriler güvenilirliği düşürür.</li>
      </ul>

      <h2>Otorite İnşası Stratejileri</h2>
      <h3>Orijinal Araştırma ve Veri Üretimi</h3>
      <p>AI modelleri birincil kaynakları ikincil kaynaklara tercih eder. Orijinal veri ve araştırma sunmak, referans gösterilme olasılığınızı dramatik şekilde artırır:</p>
      <ul>
        <li><strong>Sektörel anketler:</strong> Hedef kitleniz arasında yıllık anketler düzenleyip sonuçlarını detaylı raporlar halinde yayınlayın.</li>
        <li><strong>Veri analizi:</strong> Kendi platform verinizi anonimleştirerek sektörel trendleri ortaya çıkarın.</li>
        <li><strong>Benchmark çalışmaları:</strong> Sektörünüzde performans kıyaslama raporları hazırlayın.</li>
        <li><strong>Vaka çalışmaları:</strong> Gerçek sonuçları belgeleyen detaylı vaka çalışmaları yayınlayın.</li>
      </ul>

      <h3>Uzman Profili Oluşturma</h3>
      <p>AI modelleri, yazar otoritesini giderek daha fazla dikkate almaktadır. Uzman profili oluşturmak için:</p>
      <ul>
        <li>Yazar sayfaları oluşturun — her yazar için uzmanlık alanı, deneyim ve yayınları belirtin.</li>
        <li>Schema.org Person ve Author işaretlemesi kullanın.</li>
        <li>Yazarların LinkedIn, Google Scholar ve sektörel profillere sahip olmasını sağlayın.</li>
        <li>Sektörel etkinliklerde konuşmacı olun ve bu bilgileri yazar sayfanızda belirtin.</li>
      </ul>

      <h3>Çapraz Platform Otorite</h3>
      <p>AI modelleri, bir markanın veya uzmanın birden fazla güvenilir platformda varlığını değerlendirir:</p>
      <ul>
        <li>Sektörel yayınlarda misafir yazarlık yapın.</li>
        <li>Podcast'lere konuk olarak katılın.</li>
        <li>Akademik veya sektörel konferanslarda sunum yapın.</li>
        <li>Wikipedia'da referans gösterilebilecek düzeyde güvenilir içerik üretin.</li>
      </ul>

      <h2>Teknik Altyapı Gereksinimleri</h2>
      <p>Otorite sinyalleri ne kadar güçlü olursa olsun, teknik altyapı yetersizse AI tarayıcıları içeriğinize erişemez:</p>
      <ul>
        <li><strong>Hız:</strong> Sayfa yükleme süresi 2 saniyenin altında olmalıdır.</li>
        <li><strong>Erişilebilirlik:</strong> JavaScript render'a bağımlı içerikler AI botları tarafından okunamayabilir — sunucu tarafı render (SSR) tercih edin.</li>
        <li><strong>Yapısal veri:</strong> Article, Author, Organization, FAQ, HowTo gibi şemaları uygulayın.</li>
        <li><strong>Paywall ve giriş duvarı:</strong> AI botlarının içeriğe erişimini engelleyen paywall'lar referans gösterilme olasılığını sıfırlar.</li>
      </ul>

      <h2>Referans Gösterilme Kalıpları</h2>
      <p>AI modelleri genellikle şu türde içerikleri referans gösterir:</p>
      <ol>
        <li><strong>Tanımlayıcı içerikler:</strong> "X nedir?" sorusuna net yanıt veren sayfalar.</li>
        <li><strong>Listeleyici içerikler:</strong> "En iyi X araçları" gibi karşılaştırma ve liste sayfaları.</li>
        <li><strong>Adım adım kılavuzlar:</strong> "X nasıl yapılır?" sorusuna yanıt veren pratik rehberler.</li>
        <li><strong>Veri ve istatistik sayfaları:</strong> Spesifik sayısal veriler sunan kaynaklar.</li>
        <li><strong>Uzman görüşleri:</strong> Konuyla ilgili derinlemesine analiz ve yorum sunan içerikler.</li>
      </ol>

      <blockquote><strong>Sonuç:</strong> AI çağında otorite inşası, yalnızca backlink sayısıyla değil, bilgi kalitesi, uzmanlık derinliği ve çapraz platform tutarlılığı ile ölçülmektedir. Orijinal veri üretin, uzman profilleri oluşturun, teknik altyapınızı sağlam tutun ve içeriklerinizi sürekli güncelleyin.</blockquote>
    `
  },
  {
    id: 'yapisal-veri-ve-ai',
    categoryId: 'geo',
    title: 'Yapısal Veri İşaretlemesi ve AI Uyumu',
    description: 'Schema.org yapısal veri kullanımı, JSON-LD implementasyonu ve AI tarayıcılarının yapısal veriyi nasıl değerlendirdiği.',
    readTime: '9 dk',
    content: `
      <p>Yapısal veri (structured data), web sayfalarındaki içeriğin türünü, anlamını ve ilişkilerini arama motorlarına ve AI modellerine açıkça bildiren standartlaştırılmış bir işaretleme sistemidir. Schema.org sözlüğü ve JSON-LD formatı, yapısal veri implementasyonunun temelini oluşturur. AI arama çağında yapısal verinin önemi daha da artmıştır.</p>

      <h2>Yapısal Veri Neden Önemlidir?</h2>
      <p>Web sayfaları, insan gözüyle bakıldığında kolayca anlaşılır. Ancak arama motoru botları ve AI modelleri, sayfadaki bilgilerin türünü ve bağlamını anlamak için yardıma ihtiyaç duyar. Yapısal veri bu köprüyü kurar.</p>
      <ul>
        <li><strong>Zengin sonuçlar (Rich Results):</strong> Arama sonuçlarında yıldız puanları, fiyatlar, SSS genişletmeleri, tarif kartları gibi görsel zenginlikler sağlar.</li>
        <li><strong>AI anlam çıkarımı:</strong> AI modelleri yapısal veriyi doğrudan okuyarak içeriğin konusunu, yazarını, tarihini ve güvenilirliğini daha doğru değerlendirir.</li>
        <li><strong>Bilgi grafiği (Knowledge Graph):</strong> Google'ın bilgi grafiğine dahil olma şansı artar.</li>
        <li><strong>Sesli arama:</strong> Sesli asistanlar yapısal veriye sahip sayfalardan daha kolay bilgi çeker.</li>
      </ul>

      <h2>JSON-LD Formatı</h2>
      <p>JSON-LD (JavaScript Object Notation for Linked Data), Google'ın önerdiği yapısal veri formatıdır. HTML'e gömülü bir script etiketi içinde yer alır ve sayfanın görsel yapısını etkilemez:</p>
      <p>JSON-LD'nin avantajları:</p>
      <ul>
        <li>HTML yapısından bağımsızdır — sayfa tasarımını değiştirmez.</li>
        <li>Bakımı kolaydır — tüm yapısal veri tek bir yerde toplanır.</li>
        <li>Dinamik oluşturma imkânı — server-side rendering ile kolayca üretilir.</li>
        <li>Google tarafından tercih edilen formattır.</li>
      </ul>

      <h2>Temel Schema.org Tipleri</h2>
      <h3>Article / BlogPosting</h3>
      <p>Blog yazıları ve haber makaleleri için kullanılır. AI modelleri bu şemayı içeriğin türünü, yazarını ve yayın tarihini belirlemek için kullanır:</p>
      <ul>
        <li><code>headline</code> — makale başlığı</li>
        <li><code>author</code> — yazar bilgileri (Person şemasıyla)</li>
        <li><code>datePublished</code> ve <code>dateModified</code> — yayın ve güncelleme tarihi</li>
        <li><code>publisher</code> — yayıncı organizasyon bilgisi</li>
        <li><code>image</code> — makale görseli</li>
        <li><code>description</code> — makale açıklaması</li>
      </ul>

      <h3>FAQPage</h3>
      <p>Sıkça sorulan sorular sayfaları için kullanılır. Hem arama sonuçlarında genişletilmiş alan sağlar hem de AI modellerinin soru-cevap çiftlerini doğrudan kullanmasını kolaylaştırır:</p>
      <ul>
        <li>Her soru-cevap çifti <code>Question</code> ve <code>acceptedAnswer</code> olarak tanımlanır.</li>
        <li>AI Overview ve featured snippet'larda görünme olasılığını artırır.</li>
        <li>Sesli arama yanıtları için ideal bir veri kaynağıdır.</li>
      </ul>

      <h3>HowTo</h3>
      <p>Adım adım kılavuzlar için kullanılır. Her adım ayrı bir <code>HowToStep</code> olarak tanımlanır:</p>
      <ul>
        <li>Adım sırası, açıklaması ve görseli belirtilir.</li>
        <li>Toplam süre, maliyet ve gerekli malzemeler eklenebilir.</li>
        <li>Arama sonuçlarında adımlar doğrudan gösterilir.</li>
      </ul>

      <h3>Organization ve Person</h3>
      <p>Kuruluş ve kişi bilgileri için kullanılır. AI modelleri bu şemaları otorite değerlendirmesinde kullanır:</p>
      <ul>
        <li>Kuruluş adı, logo, iletişim bilgileri ve sosyal medya profilleri.</li>
        <li>Kişi adı, unvanı, uzmanlık alanları ve biyografisi.</li>
        <li><code>sameAs</code> özelliği ile LinkedIn, X ve diğer profillere bağlantı.</li>
      </ul>

      <h3>Product ve Review</h3>
      <p>E-ticaret siteleri için ürün ve değerlendirme bilgileri:</p>
      <ul>
        <li>Fiyat, stok durumu, marka ve kategori bilgileri.</li>
        <li>Toplu değerlendirme puanı (aggregateRating) ve bireysel yorumlar.</li>
        <li>Arama sonuçlarında fiyat ve yıldız gösterimi sağlar.</li>
      </ul>

      <h2>AI Tarayıcıları ve Yapısal Veri</h2>
      <p>AI arama motorlarının tarayıcıları, yapısal veriyi farklı şekillerde kullanır:</p>
      <ul>
        <li><strong>Bilgi doğrulama:</strong> AI, sayfa içeriğindeki bilgileri yapısal veriyle karşılaştırarak tutarlılığı doğrular.</li>
        <li><strong>Bağlam zenginleştirme:</strong> Author ve Organization şemaları, içeriğin arkasındaki uzmanlığı anlamak için kullanılır.</li>
        <li><strong>Zaman damgası:</strong> dateModified bilgisi, içeriğin güncelliğini belirlemede kritik rol oynar.</li>
        <li><strong>İlişki haritalaması:</strong> sameAs, isPartOf ve other ilişki özellikleri, AI'ın varlıklar arasındaki bağlantıları anlamasına yardımcı olur.</li>
      </ul>

      <h2>Implementasyon En İyi Uygulamaları</h2>
      <ol>
        <li><strong>Google Rich Results Test aracı</strong> ile yapısal verinizi doğrulayın.</li>
        <li><strong>Kapsamlı olun:</strong> Mümkün olan tüm özellikleri doldurun — boş bırakılan her alan kaçırılan bir fırsattır.</li>
        <li><strong>Tutarlılık sağlayın:</strong> Yapısal verideki bilgiler sayfa içeriğiyle eşleşmelidir.</li>
        <li><strong>İç içe şemalar kullanın:</strong> Article içinde Author, Author içinde Organization gibi iç içe yapılar zengin bağlam sunar.</li>
        <li><strong>Düzenli güncelleyin:</strong> dateModified bilgisini her güncelleme yapıldığında yenileyin.</li>
        <li><strong>Spam yapmayın:</strong> Sayfada var olmayan bilgileri yapısal veriye eklemeyin — bu manipülasyon olarak değerlendirilir.</li>
      </ol>

      <blockquote><strong>İpucu:</strong> Yapısal veri implementasyonu, GEO stratejisinin teknik temelidir. İçeriğiniz ne kadar kaliteli olursa olsun, AI modelleri yapısal veri olmadan içeriğinizin bağlamını tam olarak anlayamaz. Her yeni sayfa yayınladığınızda, uygun Schema.org işaretlemesini eklemeyi alışkanlık hâline getirin.</blockquote>
    `
  },

  // ===================================================================
  // ANSWER ENGINE OPTIMIZATION (AEO)
  // ===================================================================
  {
    id: 'aeo-nedir',
    categoryId: 'aeo',
    title: 'AEO Nedir? Answer Engine Optimization Rehberi',
    description: 'Yanıt motorları için optimizasyon kavramı, doğrudan yanıt stratejileri ve AEO ile SEO arasındaki ilişki.',
    readTime: '9 dk',
    content: `
      <p>Answer Engine Optimization (AEO — Yanıt Motoru Optimizasyonu), arama motorlarının ve sesli asistanların doğrudan yanıt olarak sunacağı içerik oluşturma ve optimize etme sürecidir. Google'ın Featured Snippet'ları, People Also Ask kutuları, Knowledge Panel'leri ve sesli asistan yanıtları AEO'nun hedef alanlarıdır.</p>

      <h2>AEO Neden Önemlidir?</h2>
      <p>Arama davranışları köklü bir dönüşüm geçirmektedir. Kullanıcılar artık arama motorlarına soru soruyor ve doğrudan yanıt bekliyorlar:</p>
      <ul>
        <li><strong>Soru bazlı aramalar artıyor:</strong> "Ne", "nasıl", "neden", "ne zaman" ile başlayan aramaların oranı her yıl artmaktadır.</li>
        <li><strong>Sesli arama yaygınlaşıyor:</strong> Akıllı hoparlörler ve sesli asistanlar, tek bir yanıt kaynağını kullanıcıya sesli olarak aktarır — ilk sonuçta olmak zorunludur.</li>
        <li><strong>Sıfır tıklama aramaları:</strong> Aramaların yaklaşık %60'ında kullanıcı hiçbir sonuca tıklamıyor. Featured Snippet veya doğrudan yanıt pozisyonunda olmak, bu tıklamasız ortamda bile marka görünürlüğü sağlar.</li>
        <li><strong>AI Overview entegrasyonu:</strong> Google'ın AI tarafından oluşturulan yanıtları, geleneksel Featured Snippet'ların genişletilmiş bir versiyonudur ve AEO stratejileri burada da geçerlidir.</li>
      </ul>

      <h2>AEO ve SEO İlişkisi</h2>
      <p>AEO, SEO'nun bir alt dalı veya uzantısı olarak düşünülebilir. Tüm SEO temelleri AEO için de geçerlidir, ancak AEO ek stratejiler gerektirir:</p>
      <ul>
        <li><strong>SEO:</strong> Arama sonuçlarında üst sıralarda yer almak — sıralama odaklı.</li>
        <li><strong>AEO:</strong> Doğrudan yanıt pozisyonunda sunulmak — yanıt odaklı.</li>
        <li>İyi bir SEO temeli olmadan AEO başarısı mümkün değildir — önce sıralanmalısınız, sonra yanıt pozisyonunu hedefleyebilirsiniz.</li>
      </ul>

      <h2>AEO İçerik Stratejileri</h2>
      <h3>1. Soru Bazlı İçerik Yapısı</h3>
      <p>İçeriğinizi sorular etrafında yapılandırın. Kullanıcıların gerçekten sorduğu soruları tespit edin ve her birini alt başlık olarak kullanın:</p>
      <ul>
        <li>Google'ın "İnsanlar ayrıca soruyor" (PAA) kutusundaki soruları inceleyin.</li>
        <li>Google Otomatik Tamamlama önerilerini kullanın.</li>
        <li>Answer The Public gibi araçlarla soru varyasyonlarını keşfedin.</li>
        <li>Müşteri destek ekibinizden en sık sorulan soruları derleyin.</li>
      </ul>

      <h3>2. Doğrudan Yanıt Formatı</h3>
      <p>Google Featured Snippet'ları üç ana formatta görünür — içeriğinizi bu formatlara uygun şekilde yapılandırın:</p>
      <ul>
        <li><strong>Paragraf snippet:</strong> Bir soruyu 40-60 kelimelik kısa, net bir paragrafla yanıtlayın. Soruyu alt başlık olarak, yanıtı hemen altındaki paragraf olarak yazın.</li>
        <li><strong>Liste snippet:</strong> Adım adım süreçleri veya öğe listelerini numaralı veya madde işaretli liste formatında sunun.</li>
        <li><strong>Tablo snippet:</strong> Karşılaştırma verileri, fiyatlandırma veya istatistikleri tablo formatında gösterin.</li>
      </ul>

      <h3>3. Kısa ve Uzun Yanıt Dengesesi</h3>
      <p>Etkili AEO içeriği hem kısa doğrudan yanıt hem de derinlemesine detaylı bilgi sunar:</p>
      <ul>
        <li>Her bölümün başında soruyu 1-2 cümleyle kısaca yanıtlayın — bu, Featured Snippet'a çekilecek bölümdür.</li>
        <li>Ardından konuyu detaylandırın — alt başlıklar, örnekler, veriler ve derinlemesine açıklamalar ekleyin.</li>
        <li>Bu "ters piramit" yapısı, hem snippet pozisyonunu hem de sayfa otoritesini güçlendirir.</li>
      </ul>

      <h2>Featured Snippet Kazanma Taktikleri</h2>
      <ol>
        <li><strong>Mevcut snippet'ları analiz edin:</strong> Hedef kelimeleriniz için şu anda hangi sayfaların snippet pozisyonunda olduğunu inceleyin. Formatlarını ve içerik yapılarını anlayın.</li>
        <li><strong>İlk sayfada yer alın:</strong> Google, Featured Snippet'ları genellikle ilk sayfadaki sonuçlardan seçer. Önce organik sıralamayı iyileştirin.</li>
        <li><strong>Soruyu birebir yanıtlayın:</strong> Soruyu H2 veya H3 başlığı olarak kullanın ve hemen altında net bir yanıt verin.</li>
        <li><strong>Yapısal veri ekleyin:</strong> FAQPage ve HowTo şemaları, snippet seçilme olasılığını artırır.</li>
        <li><strong>İçeriği güncel tutun:</strong> Google, güncel içerikleri snippet pozisyonunda tercih eder.</li>
      </ol>

      <h2>People Also Ask (PAA) Optimizasyonu</h2>
      <p>People Also Ask kutusu, ilgili soruları genişletilebilir bir formatta gösterir ve çok büyük bir görünürlük alanı sunar:</p>
      <ul>
        <li>Hedef kelimeleriniz için PAA sorularını derleyin.</li>
        <li>Bu soruları içeriğinize H2/H3 alt başlıkları olarak dahil edin.</li>
        <li>Her soruyu kısa bir paragrafla yanıtlayın (40-60 kelime).</li>
        <li>Bir SSS bölümü oluşturarak birden fazla PAA sorusunu tek sayfada karşılayın.</li>
      </ul>

      <blockquote><strong>Özet:</strong> AEO, arama motorlarının "yanıt kutusu" pozisyonunda yer almayı hedefleyen bir stratejidir. Soru bazlı içerik yapısı, doğrudan yanıt formatı, yapısal veri işaretlemesi ve düzenli güncelleme ile Featured Snippet ve PAA pozisyonlarını kazanabilirsiniz. Sesli arama çağında AEO, SEO stratejinizin vazgeçilmez bir parçası olmalıdır.</blockquote>
    `
  },
  {
    id: 'one-cikan-snippet-optimizasyonu',
    categoryId: 'aeo',
    title: 'Öne Çıkan Snippet Optimizasyonu',
    description: 'Google Featured Snippet pozisyonunu kazanma stratejileri, içerik formatları ve pratik optimizasyon teknikleri.',
    readTime: '8 dk',
    content: `
      <p>Öne Çıkan Snippet (Featured Snippet), Google arama sonuçlarında organik listenin üstünde, "Position Zero" olarak bilinen konumda gösterilen özel bir bilgi kutusudur. Tıklama oranını dramatik şekilde artıran bu pozisyon, SEO dünyasının en değerli gayrimenkulüdür.</p>

      <h2>Öne Çıkan Snippet Türleri</h2>
      <h3>Paragraf Snippet</h3>
      <p>En yaygın snippet türüdür (tüm snippet'ların yaklaşık %70'i). Genellikle "nedir", "neden" ve "nasıl" ile başlayan tanımlayıcı sorulara yanıt olarak görünür. Google, sayfadan 40-60 kelimelik bir paragrafı otomatik olarak çeker.</p>
      <p><strong>Optimize etme yöntemi:</strong> Hedef soruyu H2/H3 başlığı olarak kullanın. Hemen altındaki paragrafta soruyu doğrudan, kısa ve net bir şekilde yanıtlayın. Aktif cümleler kullanın, tanımla başlayın.</p>

      <h3>Liste Snippet</h3>
      <p>Numaralı (sıralı) veya madde işaretli (sırasız) listeler olarak gösterilir. Adım adım süreçler, sıralama listeleri ve öğe koleksiyonları için kullanılır.</p>
      <ul>
        <li><strong>Numaralı liste:</strong> "Nasıl yapılır" sorularında kullanılır. Tarif adımları, kurulum süreçleri gibi sıralı işlemler.</li>
        <li><strong>Madde işaretli liste:</strong> "En iyi X", "X türleri", "X özellikleri" gibi sıralamanın önemli olmadığı listeler.</li>
      </ul>
      <p><strong>Optimize etme yöntemi:</strong> HTML'de gerçek liste etiketleri (ol, ul, li) kullanın. Her madde kısa ve açıklayıcı olsun. 5-8 öğelik listeler ideal uzunluktadır.</p>

      <h3>Tablo Snippet</h3>
      <p>Karşılaştırma verileri, fiyatlandırma tabloları, istatistikler ve spesifikasyonlar için gösterilir. Google, HTML tablo etiketlerinden (table, tr, td, th) veri çeker.</p>
      <p><strong>Optimize etme yöntemi:</strong> Temiz HTML tablo yapısı kullanın. Başlık satırını th etiketleriyle belirtin. Verileri anlaşılır ve tutarlı formatta sunun.</p>

      <h3>Video Snippet</h3>
      <p>"Nasıl yapılır" sorgularında YouTube videolarından alınan kısa kliplerdir. Video içeriğinize zaman damgaları (timestamp) eklemek bu snippet'ı kazanma şansınızı artırır.</p>

      <h2>Snippet Kazanma Stratejisi</h2>
      <h3>Hedef Belirleme</h3>
      <ol>
        <li><strong>Mevcut fırsatları tespit edin:</strong> İlk sayfada sıralandığınız ancak snippet pozisyonunun başka bir siteye ait olduğu kelimeleri bulun — bunlar en hızlı kazanım fırsatlarıdır.</li>
        <li><strong>Snippet'sız sorgular:</strong> Henüz snippet gösterilmeyen sorgularda ilk sonuç olmak, Google snippet eklediğinde otomatik avantaj sağlar.</li>
        <li><strong>Rakip snippet analizi:</strong> Rakiplerin kazandığı snippet'ları inceleyin. İçerik formatını, uzunluğunu ve yapısını anlayın.</li>
      </ol>

      <h3>İçerik Yapılandırma</h3>
      <p>Snippet kazanmak için içerik yapınızı özelleştirmeniz gerekir:</p>
      <ul>
        <li><strong>Soru-Yanıt kalıbı:</strong> Hedef soruyu alt başlık olarak kullanın, hemen altında kısa ve doğrudan yanıt verin, ardından detaylandırın.</li>
        <li><strong>Tanım formatı:</strong> "[Konu] [fiil ile başlayan tanım]" kalıbını kullanın. Örnek: "SEO, web sitelerinin arama motorlarında daha üst sıralarda yer alması için yapılan optimizasyon çalışmalarıdır."</li>
        <li><strong>Karşılaştırma tabloları:</strong> İki veya daha fazla şeyi karşılaştırırken HTML tablosu kullanın.</li>
        <li><strong>Ters piramit:</strong> Önce özeti verin, sonra detayları açıklayın — gazeteciliğin ters piramit modelini uygulayın.</li>
      </ul>

      <h2>Snippet İçerik Uzunluğu Rehberi</h2>
      <ul>
        <li><strong>Paragraf snippet:</strong> 40-60 kelime (250-350 karakter). Çok kısa yanıtlar yetersiz bilgi verir, çok uzun yanıtlar kesilir.</li>
        <li><strong>Liste snippet:</strong> 5-8 madde, her madde 1-2 satır. Daha uzun listeler "Daha fazla öğe göster" ile gösterilir.</li>
        <li><strong>Tablo snippet:</strong> 3-5 sütun, 4-8 satır. Büyük tablolar kırpılır.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <ul>
        <li><strong>Semantik HTML:</strong> h2, h3, p, ol, ul, li, table, th, td etiketlerini doğru kullanın.</li>
        <li><strong>Sayfa hızı:</strong> Yavaş yüklenen sayfalar snippet pozisyonunu kaybeder.</li>
        <li><strong>Mobil uyumluluk:</strong> Snippet seçimi mobil sürüme göre yapılır.</li>
        <li><strong>HTTPS:</strong> Güvenli bağlantı snippet seçiminde avantaj sağlar.</li>
        <li><strong>Schema.org:</strong> FAQPage ve HowTo şemaları snippet seçilme olasılığını artırır.</li>
      </ul>

      <h2>Snippet Pozisyonunu Koruma</h2>
      <p>Snippet kazanmak yetmez, korumak da önemlidir:</p>
      <ul>
        <li>İçeriğinizi düzenli olarak güncelleyin — rakipler sürekli optimize ediyor.</li>
        <li>Yanıtınızın doğruluğunu ve güncelliğini kontrol edin.</li>
        <li>Sayfanızın teknik performansını sürekli izleyin.</li>
        <li>Kullanıcı davranış metriklerini (CTR, hemen çıkma oranı) takip edin.</li>
      </ul>

      <blockquote><strong>Pratik İpucu:</strong> Snippet kazanmak için içeriğinizin tamamını yeniden yazmaya gerek yoktur. Mevcut içeriğinize hedef soruyu H2 başlığı olarak ekleyin, hemen altına 40-60 kelimelik doğrudan bir yanıt paragrafı yazın ve yapısal veri işaretlemesi ekleyin. Bu basit üç adım, snippet kazanma olasılığınızı büyük ölçüde artırır.</blockquote>
    `
  },
  {
    id: 'sesli-arama-optimizasyonu',
    categoryId: 'aeo',
    title: 'Sesli Arama Optimizasyonu: Siri, Alexa, Google Assistant',
    description: 'Sesli arama davranışları, konuşma dili optimizasyonu ve sesli asistanlarda görünürlük stratejileri.',
    readTime: '9 dk',
    content: `
      <p>Sesli arama (voice search), akıllı telefonlar, akıllı hoparlörler ve araç içi sistemler aracılığıyla ses komutuyla yapılan aramaları kapsar. Google Assistant, Amazon Alexa, Apple Siri ve Microsoft Cortana gibi sesli asistanlar, kullanıcılara doğrudan sesli yanıt vererek arama deneyimini temelden değiştirmektedir.</p>

      <h2>Sesli Arama Neden Farklıdır?</h2>
      <p>Sesli aramalar, metin tabanlı aramalardan birçok açıdan farklılık gösterir. Bu farklılıkları anlamak, doğru optimizasyon stratejisi oluşturmanın temelidir:</p>
      <ul>
        <li><strong>Konuşma dili:</strong> Metin araması "istanbul hava durumu" iken sesli arama "İstanbul'da bugün hava nasıl olacak?" şeklindedir. Sesli aramalar daha doğal ve konuşma diline yakındır.</li>
        <li><strong>Daha uzun sorgular:</strong> Sesli aramalar ortalama 6-10 kelime içerirken, metin aramaları genellikle 2-4 kelimedir.</li>
        <li><strong>Soru formatı:</strong> Sesli aramaların büyük çoğunluğu soru formatındadır — "ne", "nasıl", "nerede", "ne zaman" gibi soru kelimeleriyle başlar.</li>
        <li><strong>Yerel niyet:</strong> Sesli aramaların yaklaşık %50'si yerel amaçlıdır — "yakınımdaki restoran", "en yakın eczane" gibi.</li>
        <li><strong>Tek yanıt beklentisi:</strong> Ekranlı cihazlarda birden fazla sonuç gösterilirken, akıllı hoparlörler genellikle tek bir yanıt okur. Bu, "birinci" olmayı zorunlu kılar.</li>
      </ul>

      <h2>Sesli Arama İçerik Optimizasyonu</h2>
      <h3>1. Konuşma Dili ile Yazın</h3>
      <p>Sesli aramalara yanıt verecek içeriği, konuşma dilinde yazmalısınız:</p>
      <ul>
        <li>Akademik veya aşırı resmi dil yerine doğal konuşma tonu kullanın.</li>
        <li>Kısa ve basit cümleler tercih edin — sesli yanıtlar karmaşık cümlelerde teklenir.</li>
        <li>Soru-cevap formatı kullanın — soruyu alt başlık, yanıtı paragraf olarak yapılandırın.</li>
        <li>İlk cümlede doğrudan yanıt verin, detayları sonra ekleyin.</li>
      </ul>

      <h3>2. Uzun Kuyruk Anahtar Kelimeler</h3>
      <p>Sesli aramalar doğal dilde ve uzun olduğu için, uzun kuyruk anahtar kelimeler sesli arama optimizasyonunun temelini oluşturur:</p>
      <ul>
        <li>"SEO" yerine "küçük işletmeler için en etkili SEO stratejileri nelerdir" gibi doğal sorguları hedefleyin.</li>
        <li>Soru kelimeleriyle başlayan uzun kuyruk kelimeler öncelikli olmalıdır.</li>
        <li>Her uzun kuyruk kelime için ayrı bir SSS girişi veya bölüm oluşturun.</li>
      </ul>

      <h3>3. Featured Snippet Hedefleme</h3>
      <p>Sesli asistanlar, yanıtlarını büyük ölçüde Featured Snippet'lardan çeker. Bu nedenle AEO ve sesli arama optimizasyonu doğrudan bağlantılıdır:</p>
      <ul>
        <li>Paragraf snippet'ları sesli yanıtlar için ideal formattır — 29 kelimelik ortalama yanıt uzunluğu hedefleyin.</li>
        <li>9. sınıf seviyesinde okunabilirlik — karmaşık terimlerden kaçının veya kısa açıklamalar ekleyin.</li>
        <li>Soruyu doğrudan yanıtlayan, bağımsız olarak anlaşılabilir cümleler kullanın.</li>
      </ul>

      <h2>Yerel Sesli Arama Optimizasyonu</h2>
      <p>Sesli aramaların yarısından fazlası yerel amaçlı olduğu için, yerel SEO sesli arama başarısının kritik bir bileşenidir:</p>
      <ul>
        <li><strong>Google Business Profile:</strong> İşletme profilinizi eksiksiz doldurun — isim, adres, telefon, çalışma saatleri, kategori.</li>
        <li><strong>NAP tutarlılığı:</strong> İsim (Name), Adres (Address) ve Telefon (Phone) bilgileriniz tüm çevrimiçi platformlarda tutarlı olmalıdır.</li>
        <li><strong>Yerel anahtar kelimeler:</strong> "İstanbul'da SEO hizmeti" gibi konum bazlı kelimeleri içeriğinize dahil edin.</li>
        <li><strong>Müşteri yorumları:</strong> Olumlu Google yorumları yerel sesli arama sıralamalarını doğrudan etkiler.</li>
        <li><strong>LocalBusiness şeması:</strong> Schema.org LocalBusiness işaretlemesi kullanarak işletme bilgilerinizi yapılandırın.</li>
      </ul>

      <h2>Teknik Optimizasyon</h2>
      <h3>Sayfa Hızı</h3>
      <p>Sesli arama yanıtları için seçilen sayfaların ortalama yüklenme süresi 4.6 saniyedir (genel ortalama 8.8 saniye). Hızlı sayfalar sesli arama sonuçlarında büyük avantaja sahiptir:</p>
      <ul>
        <li>Core Web Vitals metriklerini optimize edin.</li>
        <li>Görsel boyutlarını küçültün ve lazy loading uygulayın.</li>
        <li>JavaScript render süresini minimize edin.</li>
      </ul>

      <h3>HTTPS</h3>
      <p>Sesli arama sonuçlarının %70'inden fazlası HTTPS sayfalardan gelir. SSL sertifikası sesli arama optimizasyonu için temel bir gerekliliktir.</p>

      <h3>Yapısal Veri</h3>
      <p>Sesli asistanlar yapısal veriyi yanıt oluşturmak için aktif olarak kullanır:</p>
      <ul>
        <li>FAQPage şeması — soru-cevap çiftlerini yapılandırın.</li>
        <li>HowTo şeması — adım adım kılavuzları yapılandırın.</li>
        <li>Speakable şeması — sesli olarak okunmaya uygun bölümleri belirtin (Google News yayıncıları için).</li>
      </ul>

      <h2>SSS (FAQ) Sayfası Oluşturma</h2>
      <p>SSS sayfaları sesli arama optimizasyonunun en güçlü araçlarından biridir. Etkili bir SSS sayfası için:</p>
      <ol>
        <li>Gerçek müşteri sorularını toplayın — müşteri hizmetleri kayıtları en iyi kaynaktır.</li>
        <li>Her soruyu doğal konuşma dilinde yazın.</li>
        <li>Yanıtları 1-3 cümle ile kısa tutun — sesli asistanlar uzun yanıtları kırpar.</li>
        <li>FAQPage yapısal veri şemasını uygulayın.</li>
        <li>Yanıtlarda spesifik ve doğrulanabilir bilgiler verin.</li>
      </ol>

      <blockquote><strong>Geleceğe Bakış:</strong> Sesli arama teknolojisi hızla gelişmektedir. Çok turlu konuşma (multi-turn conversation), bağlam hatırlama ve kişiselleştirilmiş yanıtlar yakın gelecekte standart hâle gelecektir. Şimdiden sesli arama optimizasyonuna yatırım yapmak, geleceğin arama ortamında rekabet avantajı sağlayacaktır.</blockquote>
    `
  },
  {
    id: 'faq-schema-ve-seo',
    categoryId: 'aeo',
    title: 'FAQ Schema ve SEO: Yapısal Veri ile Görünürlük',
    description: 'FAQ Schema implementasyonu, arama sonuçlarında genişletilmiş görünüm ve SEO etkisi rehberi.',
    readTime: '8 dk',
    content: `
      <p>FAQ Schema (FAQPage yapısal veri işaretlemesi), web sayfalarındaki sıkça sorulan sorular bölümünü arama motorlarına yapılandırılmış bir formatta bildiren Schema.org standardıdır. Doğru uygulandığında arama sonuçlarında genişletilmiş alan sağlar, tıklama oranını artırır ve sesli arama yanıtlarında kaynak olarak seçilme olasılığını yükseltir.</p>

      <h2>FAQ Schema Nedir ve Nasıl Çalışır?</h2>
      <p>FAQ Schema, sayfanızdaki soru-cevap çiftlerini Google'ın anlayacağı yapılandırılmış bir formatta işaretlemenizi sağlar. Google bu işaretlemeyi tanıdığında, arama sonuçlarında soruları genişletilebilir (accordion) formatta gösterebilir.</p>
      <p>Her FAQPage işaretlemesi şu bileşenlerden oluşur:</p>
      <ul>
        <li><code>@type: "FAQPage"</code> — sayfanın SSS içerdiğini belirtir.</li>
        <li><code>mainEntity</code> — soru-cevap çiftlerinin listesi.</li>
        <li>Her soru bir <code>Question</code> nesnesi olarak tanımlanır.</li>
        <li>Her yanıt bir <code>acceptedAnswer</code> nesnesi olarak tanımlanır.</li>
      </ul>

      <h2>FAQ Schema'nın SEO Faydaları</h2>
      <h3>1. Genişletilmiş Arama Sonuçları</h3>
      <p>FAQ Schema uygulandığında, arama sonuçlarınızın altında sorular genişletilebilir formatta gösterilir. Bu, arama sonuçlarında çok daha fazla alan kaplamanızı sağlar:</p>
      <ul>
        <li>Normal bir arama sonucu yaklaşık 3-4 satır kaplarken, FAQ zengin sonucu 10+ satır kaplayabilir.</li>
        <li>Daha fazla alan, daha fazla dikkat çeker ve tıklama oranını ortalama %15-25 artırır.</li>
        <li>Rakipleri görsel olarak aşağı iter ve sayfanın geri kalanındaki sonuçların görünürlüğünü azaltır.</li>
      </ul>

      <h3>2. Artan Tıklama Oranı (CTR)</h3>
      <p>FAQ zengin sonuçları, kullanıcının sorusuna doğrudan yanıt vererek tıklama motivasyonunu artırır. Kullanıcı, sorusunun yanıtının bu sayfada olduğunu görerek tıklama olasılığını yükseltir.</p>

      <h3>3. Sesli Arama Uyumluluğu</h3>
      <p>Sesli asistanlar, FAQ Schema ile işaretlenmiş soru-cevap çiftlerini doğrudan sesli yanıt olarak kullanabilir. Bu, sesli arama görünürlüğünüzü büyük ölçüde artırır.</p>

      <h3>4. AI Overview Kaynak Olma</h3>
      <p>Google AI Overview, yapılandırılmış soru-cevap verilerini yanıt oluştururken kaynak olarak kullanabilir. FAQ Schema, AI sistemlerinin içeriğinizi daha kolay işlemesini sağlar.</p>

      <h2>FAQ Schema Uygulama Kuralları</h2>
      <h3>Google'ın Gereksinimleri</h3>
      <ul>
        <li>Sorular ve yanıtlar sayfada görünür şekilde yer almalıdır — gizli veya yalnızca yapısal veride bulunan içerik kabul edilmez.</li>
        <li>Yanıtlar reklam veya tanıtım amacıyla kullanılmamalıdır.</li>
        <li>Her soru tek bir yanıta sahip olmalıdır.</li>
        <li>Yanıtlar doğru ve güncel bilgi içermelidir.</li>
        <li>Müstehcen, şiddet içeren veya yasadışı içerik barındırmamalıdır.</li>
      </ul>

      <h3>En İyi Uygulamalar</h3>
      <ol>
        <li><strong>Gerçek soruları kullanın:</strong> Yapay veya zoraki sorular yerine, kullanıcıların gerçekten sorduğu soruları kullanın. Google'ın PAA kutusu ve müşteri destek kayıtları iyi kaynaklardır.</li>
        <li><strong>Yanıtları kısa ve öz tutun:</strong> Her yanıt 1-3 paragraf (50-200 kelime) olmalıdır. Çok uzun yanıtlar arama sonuçlarında kırpılır.</li>
        <li><strong>Yanıtlarda bağlantı kullanın:</strong> Yanıtlar içinde sitenizin ilgili sayfalarına bağlantılar ekleyebilirsiniz — bu dahili bağlantı fırsatı sunar.</li>
        <li><strong>Sayfa başına 5-10 soru:</strong> Çok fazla soru eklemek (20+), Google'ın zengin sonucu göstermemesine neden olabilir.</li>
        <li><strong>Sayfanın konusuyla ilgili sorular:</strong> SSS'ler sayfanın ana konusuyla doğrudan ilgili olmalıdır.</li>
      </ol>

      <h2>FAQ Sayfası İçerik Stratejisi</h2>
      <h3>Soru Kaynakları</h3>
      <p>Etkili bir SSS bölümü oluşturmak için soruları doğru kaynaklardan toplamanız gerekir:</p>
      <ul>
        <li><strong>Google PAA:</strong> Hedef kelimeleriniz için "İnsanlar ayrıca soruyor" kutusundaki soruları derleyin.</li>
        <li><strong>Google Otomatik Tamamlama:</strong> Hedef kelimeyi yazmaya başladığınızda önerilen soru formatındaki tamamlamalar.</li>
        <li><strong>Müşteri destek kayıtları:</strong> En sık sorulan müşteri soruları, gerçek kullanıcı ihtiyaçlarını yansıtır.</li>
        <li><strong>Forum ve topluluklar:</strong> Reddit, Quora ve sektörel forumlardan toparlanan yaygın sorular.</li>
        <li><strong>Search Console:</strong> Sitenizin gösterim aldığı soru formatındaki arama sorguları.</li>
      </ul>

      <h3>Yanıt Yazma İlkeleri</h3>
      <ul>
        <li>İlk cümlede soruyu doğrudan yanıtlayın — "Evet, ...", "Hayır, ...", "X, şu anlama gelir..." gibi.</li>
        <li>Ardından kısa bir açıklama veya bağlam ekleyin.</li>
        <li>Teknik terimleri basit dille açıklayın.</li>
        <li>Mümkünse somut örnekler veya sayısal veriler ekleyin.</li>
        <li>İlgili sayfalara dahili bağlantılar yerleştirin.</li>
      </ul>

      <h2>FAQ Schema ile AEO Bağlantısı</h2>
      <p>FAQ Schema, AEO (Answer Engine Optimization) stratejisinin en güçlü teknik araçlarından biridir:</p>
      <ul>
        <li>Soru-cevap formatı, Featured Snippet kazanma olasılığını artırır.</li>
        <li>Sesli asistanlar FAQ Schema verilerini doğrudan okuyabilir.</li>
        <li>AI arama motorları yapılandırılmış soru-cevap çiftlerini kolayca sentezler.</li>
        <li>PAA kutusunda görünme şansı yükselir.</li>
      </ul>

      <h2>Performans Ölçümü</h2>
      <p>FAQ Schema'nın etkisini ölçmek için şu metrikleri takip edin:</p>
      <ul>
        <li><strong>Search Console "Arama görünümü" raporu:</strong> FAQ zengin sonuçlarının gösterim ve tıklama verilerini gösterir.</li>
        <li><strong>CTR değişimi:</strong> FAQ Schema eklenmeden önceki ve sonraki tıklama oranlarını karşılaştırın.</li>
        <li><strong>Gösterim artışı:</strong> Zengin sonuçlar daha fazla sorgu için gösterilme şansı yaratır.</li>
        <li><strong>Rich Results Test:</strong> Google'ın test aracıyla FAQ Schema'nızın doğru uygulanıp uygulanmadığını düzenli kontrol edin.</li>
      </ul>

      <blockquote><strong>Sonuç:</strong> FAQ Schema, uygulaması kolay ancak etkisi büyük bir SEO ve AEO aracıdır. Gerçek kullanıcı sorularını toplayın, kısa ve doğrudan yanıtlar yazın, JSON-LD formatında yapısal veri ekleyin ve performansı düzenli olarak izleyin. Arama sonuçlarında genişletilmiş görünüm, artan tıklama oranı ve sesli arama uyumluluğu ile organik performansınızı güçlendirin.</blockquote>
    `
  },

  // --- WEB SİTESİ OPTİMİZASYON PROGRAMI (12 FAZ) ---
  {
    id: 'faz-1-temel-kimlik',
    categoryId: 'web-optimizasyon',
    title: 'Faz 1: Temel Kimlik — Site Türü, Hedef Kitle ve Marka Rehberi',
    description: 'Web sitenizin temel kimliğini oluşturun: site türü, hedef kitle analizi, marka rehberi ve ton of voice belirleme.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>Bir web sitesinin başarılı olması, teknik altyapıdan önce <strong>kim olduğunu ve kime hitap ettiğini</strong> bilmesine bağlıdır. Site türü belirlenmeden yapılan tasarım, kodlama ve SEO çalışmaları temelsiz bir bina gibidir — er ya da geç çöker.</p>
      <p>Hedef kitle analizi yapılmadan oluşturulan içerikler, dönüşüm oranlarını düşürür ve reklam bütçesini israf eder. Araştırmalar, doğru persona tanımı yapan markaların <strong>dönüşüm oranını %73'e kadar artırabildiğini</strong> gösteriyor.</p>
      <p>Marka rehberi (brand guideline) olmadan çalışan ekipler, tutarsız görseller, farklı ton ve mesajlar üretir. Bu durum kullanıcı güvenini zedeler ve profesyonel algıyı yok eder.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>Site türü belirleme:</strong> E-ticaret, kurumsal, blog, SaaS, portfolyo, haber portalı veya hibrit model — her biri farklı bilgi mimarisi, navigasyon yapısı ve dönüşüm hunisi gerektirir. Yanlış kategoride başlamak, ilerideki tüm fazları baltalayacaktır.</li>
        <li><strong>Persona oluşturma:</strong> Yaş, cinsiyet, gelir düzeyi, eğitim seviyesi, ilgi alanları, sorunları (pain points), satın alma motivasyonları ve dijital davranış kalıpları gibi en az 8 farklı boyutta minimum 3 ayrı persona tanımlayın.</li>
        <li><strong>Çok dilli yapı kararı:</strong> Hedef pazarınız uluslararasıysa <code>hreflang</code> yapısı, subdomain/subdirectory tercihi, çeviri iş akışı ve yerelleştirme (localization) stratejisi baştan planlanmalıdır. Sonradan eklenen çok dilli yapılar ciddi teknik borç yaratır.</li>
        <li><strong>Marka stil rehberi:</strong> Logo kullanım kuralları (minimum boyut, boşluk alanı, yasaklı kullanımlar), birincil/ikincil/vurgu renk paleti (HEX, RGB, HSL değerleri), tipografi ailesi, ikon stili ve fotoğraf/illüstrasyon tarzı belgelenmelidir.</li>
        <li><strong>Ton of voice:</strong> Markanın iletişim dili (resmi/samimi/teknik/eğlenceli), yasaklı kelimeler, hitap şekli (sen/siz), sektörel jargon kullanım seviyesi ve sosyal medya ile web sitesi arasındaki ton farkları tanımlanmalıdır.</li>
        <li><strong>İçerik stratejisi temeli:</strong> Blog, bilgi bankası, vaka çalışması, video içerik veya podcast — hangi içerik formatları kullanılacak, yayın takvimi ne olacak, içerik üretim ekibi kimlerden oluşacak planlanmalıdır.</li>
        <li><strong>Rekabet analizi:</strong> En az 5 doğrudan rakibin site türü, hedef kitle, marka dili ve içerik stratejisi analiz edilmeli, farklılaşma noktaları belirlenmelidir.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p>Temel kimlik çalışması, teknik implementasyona dönüştüğünde aşağıdaki yapıları oluşturmanız gerekir:</p>
      <p><strong>Design Tokens dosyası (JSON formatında):</strong></p>
      <code>
{
  "color": {
    "primary": { "value": "#0F2447" },
    "secondary": { "value": "#1a3a6b" },
    "accent": { "value": "#10b981" },
    "neutral": {
      "50": { "value": "#f8fafc" },
      "900": { "value": "#0f172a" }
    }
  },
  "typography": {
    "fontFamily": { "heading": "Inter", "body": "Inter" },
    "fontSize": { "xs": "0.75rem", "sm": "0.875rem", "base": "1rem", "lg": "1.125rem", "xl": "1.25rem" }
  },
  "spacing": {
    "unit": "0.25rem",
    "scale": [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]
  }
}
      </code>
      <p><strong>Sitemap yapısı planlaması:</strong> Ana sayfa, hakkımızda, hizmetler, blog, iletişim gibi sayfaların hiyerarşik yapısı ağaç diyagramı ile planlanmalı, URL yapısı (flat vs nested) kararı verilmelidir.</p>
      <p><strong>Çok dilli yapı için Next.js konfigürasyonu:</strong></p>
      <code>
// next.config.ts
const config = {
  i18n: {
    locales: ['tr', 'en', 'de'],
    defaultLocale: 'tr',
    localeDetection: true,
  }
}
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>Site türünü belirsiz bırakmak:</strong> "Hem e-ticaret hem blog hem portfolyo olsun" demek, hiçbirini iyi yapamamak demektir. Öncelikli türü belirleyin, diğerlerini destekleyici olarak konumlandırın.</li>
        <li><strong>Persona çalışmasını atlamak:</strong> "Herkes bizim müşterimiz" düşüncesi en tehlikeli tuzaktır. Herkese hitap etmeye çalışan site, hiç kimseye hitap edemez.</li>
        <li><strong>Marka rehberini dokümante etmemek:</strong> Tasarımcının kafasındaki renkler ile yazılımcının kullandığı renkler farklı olursa, site genelinde görsel tutarsızlık kaçınılmazdır.</li>
        <li><strong>Çok dilli yapıyı sonradan eklemeye çalışmak:</strong> URL yapısı, meta tag'ler, sitemap ve içerik yönetimi baştan planlanmazsa, sonradan yapılan entegrasyon 3-5 kat daha maliyetli olur.</li>
        <li><strong>Rakip analizi yapmamak:</strong> Pazardaki konumunuzu bilmeden farklılaşamazsınız. Rakiplerinizin güçlü yönlerini bilmeden kendi stratejinizi oluşturamazsınız.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>Persona oluştururken gerçek müşteri verileri kullanın — Google Analytics demografik verileri, müşteri anketleri ve satış ekibi geri bildirimleri altın değerindedir.</li>
        <li>Marka rehberinizi Figma veya Notion gibi paylaşılabilir bir platformda yayınlayın, böylece tüm ekip güncel versiyona erişebilir.</li>
        <li>Ton of voice rehberinize gerçek örnekler ekleyin: "Böyle yazın" ve "Böyle yazmayın" formatında en az 10 örnek verin.</li>
        <li>Site türü kararını verirken Google Trends ve Ahrefs ile arama hacmi analizi yapın — kullanıcıların gerçekten ne aradığını veriye dayalı olarak belirleyin.</li>
        <li>Çok dilli planlama yapıyorsanız, çeviri belleği (translation memory) yazılımı kullanmaya baştan başlayın — tekrarlı içerikler otomatik çevrilir ve maliyet %40'a kadar düşer.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin temel kimlik ve marka stratejisi optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-2-yasal-uyumluluk',
    categoryId: 'web-optimizasyon',
    title: 'Faz 2: Yasal Uyumluluk — Cookie Consent, GDPR/KVKK ve Consent Mode v2',
    description: 'GDPR, KVKK ve CCPA uyumluluğu, cookie consent yönetimi ve Google Consent Mode v2 implementasyonu.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>Dijital gizlilik düzenlemeleri artık bir tercih değil, <strong>zorunluluktur</strong>. GDPR kapsamında veri ihlali yapan şirketlere yıllık cirosunun %4'üne kadar ceza kesilebilir — bu, büyük şirketler için milyarlarca euroya karşılık gelir. Türkiye'de KVKK benzer yaptırımlar öngörmektedir.</p>
      <p>Google, Mart 2024 itibarıyla Avrupa Ekonomik Alanı (AEA) trafiği için <strong>Consent Mode v2</strong> kullanımını zorunlu hale getirdi. Bu modu uygulamayan siteler, Google Ads dönüşüm verilerini kaybeder ve remarketing listeleri boşalır.</p>
      <p>Cookie consent uygulaması sadece hukuki değil, <strong>kullanıcı güveni</strong> açısından da kritiktir. Araştırmalar, şeffaf veri politikası uygulayan sitelerin dönüşüm oranlarının %12 daha yüksek olduğunu göstermektedir.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>Cookie envanteri çıkarma:</strong> Sitede kullanılan tüm çerezleri (birinci parti, üçüncü parti) tespit edin. Her çerez için isim, amaç, süre, sağlayıcı ve kategori (zorunlu, analitik, pazarlama, tercih) bilgilerini belgeleyin.</li>
        <li><strong>Cookie banner tasarımı:</strong> İlk ziyarette beliren, tüm kategorileri açıkça gösteren, "Tümünü Kabul Et", "Tümünü Reddet" ve "Tercihlerimi Yönet" seçeneklerini sunan banner implementasyonu. Banner kapatmak onay sayılmaz.</li>
        <li><strong>GDPR uyumluluğu:</strong> Veri işleme temeli (lawful basis), veri minimizasyonu, saklama süreleri, veri silme hakkı (right to erasure), veri taşınabilirliği ve DPO (Data Protection Officer) ataması kontrolü.</li>
        <li><strong>KVKK aydınlatma metni:</strong> Veri sorumlusu bilgileri, işlenen veri kategorileri, işleme amaçları, aktarım yapılacak taraflar, saklama süreleri ve ilgili kişi hakları içeren Türkçe aydınlatma metni hazırlanması.</li>
        <li><strong>CCPA compliance:</strong> Kaliforniya'daki kullanıcılar için "Do Not Sell My Personal Information" linki, opt-out mekanizması ve privacy policy güncellemesi.</li>
        <li><strong>Google Consent Mode v2:</strong> <code>ad_storage</code>, <code>analytics_storage</code>, <code>ad_user_data</code> ve <code>ad_personalization</code> consent türlerinin GTM üzerinden doğru yapılandırılması.</li>
        <li><strong>Yasal sayfa şablonları:</strong> Gizlilik Politikası, Çerez Politikası, Kullanım Koşulları, KVKK Aydınlatma Metni ve Açık Rıza Metni sayfalarının oluşturulması.</li>
        <li><strong>Consent log kayıtları:</strong> Kullanıcıların verdiği onayların tarih, saat, IP ve onay detaylarıyla birlikte kaydedilmesi — hukuki ispat için zorunlu.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>Google Consent Mode v2 implementasyonu (GTM Data Layer):</strong></p>
      <code>
// Consent Mode v2 varsayılan ayarlar
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});

// Kullanıcı onay verdikten sonra
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'analytics_storage': 'granted'
});
      </code>
      <p><strong>Cookie banner CMP (Consent Management Platform) entegrasyonu:</strong> Cookiebot, OneTrust veya özel çözüm — seçilen CMP'nin GTM ile entegrasyonu, consent callback'lerinin doğru tetiklenmesi ve A/B test altyapısı kurulmalıdır.</p>
      <p><strong>Server-side consent kontrolü:</strong></p>
      <code>
// Sunucu tarafında consent durumu kontrolü
function hasConsent(category: string): boolean {
  const cookies = parseCookies(request.headers.cookie)
  const consent = JSON.parse(cookies['cookie_consent'] || '{}')
  return consent[category] === true
}

// Analytics script'ini sadece onay varsa yükle
if (hasConsent('analytics')) {
  loadGoogleAnalytics()
}
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>Onay alınmadan çerez yüklemek:</strong> Banner gösterilmeden Google Analytics veya Facebook Pixel'in çalışması GDPR/KVKK ihlalidir. Script'ler consent callback'i beklemeli.</li>
        <li><strong>Sadece "Kabul Et" butonu koymak:</strong> "Reddet" seçeneği olmayan veya görünmesi zor olan banner'lar yasal gereklilikları karşılamaz ve dark pattern sayılır.</li>
        <li><strong>Consent Mode v2'yi atlayıp sadece banner eklemek:</strong> Banner tek başına yetmez — GTM'deki consent sinyalleri doğru yapılandırılmazsa Google Ads dönüşüm kaybı yaşanır.</li>
        <li><strong>Çerez politikası sayfasını güncellememek:</strong> Yeni bir üçüncü parti araç eklendiğinde çerez politikası otomatik güncellenmez — manuel takip gerekir.</li>
        <li><strong>Onay kayıtlarını tutmamak:</strong> GDPR denetiminde "kullanıcı onay verdi" demek yetmez, bunu kanıtlayacak zaman damgalı kayıtlarınız olmalıdır.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>Cookie banner'ın kabul oranını artırmak için A/B test yapın — banner konumu, renkleri ve metin tonunu optimize ederek %15-25 daha yüksek consent oranı elde edebilirsiniz.</li>
        <li>Consent Mode v2'nin "Advanced" modunu kullanarak, onay verilmese bile Google'ın cookieless ping göndermesine izin verin — bu, dönüşüm modellemesi için kritik veri sağlar.</li>
        <li>KVKK aydınlatma metninizi bir avukatla birlikte hazırlayın ve yılda en az 2 kez güncelleyin.</li>
        <li>Cookiebot gibi otomatik tarama yapan CMP'ler kullanarak çerez envanterinizi güncel tutun — yeni eklenen her widget/script otomatik tespit edilir.</li>
        <li>IAB TCF 2.2 framework'ünü destekleyen bir CMP seçin — Avrupa'daki reklam ağları TCF uyumluluğu talep etmektedir.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin yasal uyumluluk ve cookie consent optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-3-erisilebilirlik',
    categoryId: 'web-optimizasyon',
    title: 'Faz 3: Erişilebilirlik — WCAG Standartları ve a11y Gereksinimleri',
    description: 'WCAG 2.1 AA/AAA uyumluluğu, ARIA rolleri, klavye navigasyonu ve screen reader desteği.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>Dünya nüfusunun yaklaşık <strong>%16'sı</strong> (1.3 milyar kişi) bir engelle yaşamaktadır. Erişilebilir olmayan web siteleri bu devasa kullanıcı kitlesini dışlar — bu hem etik hem de ticari bir kayıptır.</p>
      <p>ABD'de ADA (Americans with Disabilities Act) kapsamında erişilebilirlik davaları yılda <strong>4.000'i aşmış</strong> durumda. Avrupa'da European Accessibility Act (EAA) 2025'te yürürlüğe girdi. Türkiye'de de 5378 sayılı Engelliler Kanunu dijital erişilebilirlik gereksinimleri içermektedir.</p>
      <p>SEO açısından bakıldığında, erişilebilir siteler genellikle daha iyi yapılandırılmış, semantik HTML kullanan sitelerdir — bu da arama motorlarının içeriği daha iyi anlamasını sağlar. Google, Core Web Vitals değerlendirmesinde erişilebilirlik sinyallerini dolaylı olarak dikkate alır.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>Semantik HTML kullanımı:</strong> <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code> elementlerinin doğru kullanımı. Div-soup yerine anlamlı HTML yapısı.</li>
        <li><strong>Başlık hiyerarşisi:</strong> H1'den H6'ya kırılmayan, mantıklı bir başlık ağacı. Her sayfada tek H1, alt bölümler H2, alt-alt bölümler H3 şeklinde devam etmeli — seviye atlanmamalı.</li>
        <li><strong>Renk kontrastı:</strong> WCAG AA standardına göre normal metin için minimum 4.5:1, büyük metin için 3:1 kontrast oranı. AAA için normal metin 7:1, büyük metin 4.5:1. Sadece renge dayalı bilgi iletimi yapılmamalı.</li>
        <li><strong>Klavye navigasyonu:</strong> Tüm interaktif elementlere (butonlar, linkler, formlar, modaller) sadece klavye ile erişilebilmeli. Tab sırası mantıklı olmalı, focus trap doğru çalışmalı, skip-to-content linki bulunmalı.</li>
        <li><strong>ARIA rolleri ve etiketleri:</strong> <code>aria-label</code>, <code>aria-describedby</code>, <code>aria-expanded</code>, <code>aria-hidden</code>, <code>role</code> attribute'larının doğru ve tutarlı kullanımı. ARIA'yı gereksiz yere kullanmayın — önce native HTML deneyin.</li>
        <li><strong>Görsel alternatifler:</strong> Tüm <code>&lt;img&gt;</code> elementlerinde anlamlı <code>alt</code> metni. Dekoratif görsellerde <code>alt=""</code> (boş). Karmaşık görseller (infografik, grafik) için uzun açıklama (<code>aria-describedby</code>).</li>
        <li><strong>Form erişilebilirliği:</strong> Her input'a <code>&lt;label&gt;</code> bağlantısı, hata mesajlarının <code>aria-live</code> ile duyurulması, zorunlu alanların <code>aria-required</code> ile işaretlenmesi, fieldset/legend kullanımı.</li>
        <li><strong>Screen reader testi:</strong> NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android) ile gerçek cihazda test. Otomatik araçlar (axe, Lighthouse) sorunların sadece %30-40'ını yakalar.</li>
        <li><strong>Animasyon ve hareket:</strong> <code>prefers-reduced-motion</code> media query desteği. Otomatik oynayan video/animasyonlarda durdurma kontrolü. Yanıp sönen içerik sınırlaması (saniyede 3'ten fazla yanıp sönme epilepsi tetikleyebilir).</li>
        <li><strong>Focus yönetimi:</strong> Özel bileşenlerde (modal, dropdown, tab panel) focus'un doğru yönetilmesi, focus ring'in görünür olması, <code>:focus-visible</code> kullanımı.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>Skip-to-content linki:</strong></p>
      <code>
&lt;a href="#main-content" class="skip-link"&gt;
  İçeriğe geç
&lt;/a&gt;

/* CSS */
.skip-link {
  position: absolute;
  left: -9999px;
  z-index: 999;
  padding: 1rem;
  background: #0F2447;
  color: white;
}
.skip-link:focus {
  left: 50%;
  transform: translateX(-50%);
  top: 0;
}
      </code>
      <p><strong>Prefers-reduced-motion desteği:</strong></p>
      <code>
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
      </code>
      <p><strong>ARIA live region (dinamik içerik bildirimi):</strong></p>
      <code>
&lt;div aria-live="polite" aria-atomic="true" class="sr-only"&gt;
  {/* Dinamik hata/başarı mesajları buraya inject edilir */}
&lt;/div&gt;
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>ARIA'yı aşırı kullanmak:</strong> Native HTML elementleri zaten erişilebilirlik bilgisi taşır. <code>&lt;button&gt;</code> yerine <code>&lt;div role="button"&gt;</code> yazmak gereksizdir ve genellikle daha kötü sonuç verir.</li>
        <li><strong>Sadece otomatik araçlara güvenmek:</strong> Lighthouse ve axe harika araçlardır ancak klavye navigasyonu, mantıksal okuma sırası ve bağlamsal alt metin kalitesini değerlendiremezler.</li>
        <li><strong>Renk kontrastını göz ardı etmek:</strong> Açık gri metin trendy görünebilir ama düşük kontrastlı metin tüm kullanıcılar için okunabilirliği azaltır, engelli kullanıcılar için ise imkansız hale getirir.</li>
        <li><strong>Focus ring'i gizlemek:</strong> <code>outline: none</code> yazmak klavye kullanıcılarını karanlıkta bırakır. Görsel olarak şık bir focus stili tasarlayın, ama asla kaldırmayın.</li>
        <li><strong>Alt metinlerde "resim" yazmak:</strong> Screen reader zaten bunun bir resim olduğunu söyler. "Logo resmi" yerine "VixSEO şirket logosu" gibi açıklayıcı bir metin kullanın.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>Erişilebilirlik testini geliştirme sürecinin başında entegre edin — CI/CD pipeline'ınıza axe-core ekleyerek her PR'da otomatik erişilebilirlik kontrolü yapın.</li>
        <li>Haftada bir "klavye günü" yapın — mouse'u bırakın ve sitenizi sadece klavye ile kullanmaya çalışın. Sorunları hemen fark edeceksiniz.</li>
        <li>Gerçek engelli kullanıcılarla usability testi yapın — hiçbir otomatik araç veya simülasyon gerçek kullanıcı deneyiminin yerini tutamaz.</li>
        <li>WCAG 2.2 güncellemelerini takip edin — "Focus Not Obscured" ve "Dragging Movements" gibi yeni kriterler eklendi.</li>
        <li>Erişilebilirlik beyannamesi (accessibility statement) yayınlayın — bu hem şeffaflık gösterir hem de yasal uyumluluk kanıtı olarak işe yarar.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin erişilebilirlik ve WCAG uyumluluk optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-4-tema-gorsel',
    categoryId: 'web-optimizasyon',
    title: 'Faz 4: Tema ve Görsel Tasarım — Design Tokens ve CSS Variables',
    description: 'Design token sistemi, CSS custom properties, light/dark tema ve tutarlı görsel kimlik oluşturma.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>Bir web sitesinin görsel tasarımı, kullanıcının ilk <strong>50 milisaniyede</strong> oluşturduğu izlenimi belirler. Stanford Üniversitesi araştırmasına göre kullanıcıların %75'i bir şirketin güvenilirliğini web sitesinin tasarımına bakarak değerlendirmektedir.</p>
      <p>Design token sistemi olmadan çalışan bir ekip, her yeni sayfa veya bileşende farklı renkler, fontlar ve spacing değerleri kullanır. Bu tutarsızlık zamanla "Frankenstein tasarım" olarak bilinen görsel karmaşaya dönüşür ve kullanıcı güvenini zedeler.</p>
      <p>Dark mode artık bir lüks değil, bir beklentidir. Kullanıcıların <strong>%82'si</strong> dark mode seçeneği olan uygulamaları tercih etmektedir. Sistem temasına otomatik uyum (system preference), modern web sitelerinin olmazsa olmazıdır.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>Renk paleti tanımlama:</strong> Birincil (primary), ikincil (secondary), vurgu (accent), nötr (neutral), başarı (success), uyarı (warning), tehlike (danger) ve bilgi (info) renkleri — her biri için 50-950 arasında shade scale oluşturulmalıdır.</li>
        <li><strong>Tipografi sistemi:</strong> Başlık (heading) ve gövde (body) font ailesi, type scale (xs'den 4xl'e), satır yüksekliği (line-height), harf aralığı (letter-spacing) ve font-weight değerlerinin tutarlı tanımlanması.</li>
        <li><strong>Spacing sistemi:</strong> 4px veya 8px grid tabanlı spacing scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64). Padding, margin ve gap değerlerinin bu scale'den seçilmesi.</li>
        <li><strong>CSS Custom Properties tanımlama:</strong> Tüm design token'ların <code>:root</code> ve <code>[data-theme="dark"]</code> scope'larında CSS variable olarak tanımlanması.</li>
        <li><strong>Light/Dark/System tema toggle:</strong> Üç modlu tema değiştirici: light, dark ve system (işletim sistemi tercihine uyum). Tema seçiminin localStorage'da saklanması ve sayfa yenilenmesinde korunması.</li>
        <li><strong>Border radius sistemi:</strong> none, sm, md, lg, xl, 2xl, full değerlerinin tutarlı tanımlanması. Bileşenler arası görsel tutarlılık için merkezi radius token'ları.</li>
        <li><strong>Shadow sistemi:</strong> xs, sm, md, lg, xl shadow değerleri. Dark mode'da shadow'ların border veya glow efektine dönüştürülmesi (karanlık üzerinde shadow görünmez).</li>
        <li><strong>Breakpoint sistemi:</strong> sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px) responsive breakpoint'leri ve her breakpoint için layout değişiklikleri planı.</li>
        <li><strong>Animasyon ve transition token'ları:</strong> Duration (fast: 150ms, normal: 300ms, slow: 500ms) ve easing (ease-in-out, spring) değerlerinin standardize edilmesi.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>CSS Custom Properties ile tema sistemi:</strong></p>
      <code>
:root {
  --color-primary: #0F2447;
  --color-primary-light: #1a3a6b;
  --color-accent: #10b981;
  --color-bg: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.4);
}
      </code>
      <p><strong>Tema toggle implementasyonu (JavaScript):</strong></p>
      <code>
type Theme = 'light' | 'dark' | 'system'

function setTheme(theme: Theme) {
  localStorage.setItem('theme', theme)
  const resolved = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme
  document.documentElement.setAttribute('data-theme', resolved)
}

// Sistem tercihi değiştiğinde otomatik güncelleme
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'system') {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
    }
  })
      </code>
      <p><strong>Font yükleme stratejisi:</strong></p>
      <code>
/* next/font ile optimal font yükleme */
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap', // FOUT tercih edilir, FOIT değil
  variable: '--font-inter',
})
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>Hardcoded renk değerleri kullanmak:</strong> <code>color: #0F2447</code> yerine <code>color: var(--color-primary)</code> kullanılmazsa, tema değişikliğinde yüzlerce dosya güncellenmek zorunda kalır.</li>
        <li><strong>Dark mode'u düşünmeden tasarlamak:</strong> Light mode'da harika görünen tasarım, dark mode'da okunaksız olabilir. Her renk seçiminin iki tema için de test edilmesi gerekir.</li>
        <li><strong>Spacing'de tutarsızlık:</strong> Bir yerde 12px, başka yerde 13px, bir diğerinde 15px kullanmak piksel mükemmelliği bozar. Scale'den çıkmayın.</li>
        <li><strong>Font subsetting yapmamak:</strong> Google Fonts'tan tüm karakter setini yüklemek sayfa performansını düşürür. Sadece kullandığınız dillerin karakter setlerini yükleyin.</li>
        <li><strong>Tema flash'ı (FOUC):</strong> Sayfa yüklenirken önce light, sonra dark tema görünmesi. HTML head'de inline script ile tema tercihi okunarak engellenmelidir.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>Design token'larınızı JSON formatında tutun ve Figma, CSS, Tailwind ve mobil platformlar için otomatik dönüştürücü (Style Dictionary gibi) kullanın — tek kaynak, çoklu çıktı.</li>
        <li>Renk kontrastını otomatik kontrol eden bir linting kuralı ekleyin — erişilebilirlik ve tema tutarlılığı aynı anda sağlanır.</li>
        <li>Dark mode'da pure black (#000) kullanmayın — #0f172a gibi koyu lacivert tonları göz yorgunluğunu azaltır ve daha şık görünür.</li>
        <li>CSS Custom Properties'i Tailwind CSS 4 ile birlikte kullanın — <code>theme()</code> fonksiyonu ile token'lar doğrudan utility class'lara bağlanır.</li>
        <li>Tema tercihi analitiğini takip edin — kullanıcılarınızın kaçta kaçı dark mode kullanıyor? Bu veri, tasarım önceliklerinizi belirler.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin tema ve görsel tasarım optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-5-seo',
    categoryId: 'web-optimizasyon',
    title: 'Faz 5: SEO — Meta Tags, JSON-LD, Sitemap ve Core Web Vitals',
    description: 'Kapsamlı SEO optimizasyonu: meta etiketler, yapısal veri, XML sitemap, robots.txt ve Core Web Vitals hedefleri.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>Organik arama, web sitelerinin ortalama <strong>%53'lük</strong> trafiğini oluşturur. SEO temelleri doğru atılmadan yapılan içerik ve reklam yatırımları, delik kovaya su taşımak gibidir. Google, günde <strong>8.5 milyar</strong> arama işlemi gerçekleştirir — bu pastadan pay almak ancak teknik SEO altyapısı sağlam sitelerle mümkündür.</p>
      <p>Core Web Vitals (CWV), Google'ın sıralama algoritmasında doğrudan etki eden bir faktördür. LCP, FID (artık INP) ve CLS metrikleri "iyi" eşiğini karşılamayan siteler, sıralama kaybına uğrar. E-ticaret sitelerinde CWV iyileştirmesi <strong>dönüşüm oranını %15-20</strong> artırabilir.</p>
      <p>Yapısal veri (JSON-LD) kullanan sayfalar, arama sonuçlarında zengin snippet'ler (yıldız, fiyat, SSS, nasıl yapılır) ile görünür — bu da <strong>tıklama oranını (CTR) %25-35</strong> artırır.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>Title tag optimizasyonu:</strong> Her sayfa için benzersiz, 50-60 karakter arası, birincil anahtar kelimeyi içeren, tıklanmaya teşvik eden başlık. Marka adı "|" ile sona eklenebilir.</li>
        <li><strong>Meta description:</strong> Her sayfa için benzersiz, 150-160 karakter, CTA içeren, hedef anahtar kelimeyi doğal şekilde barındıran açıklama.</li>
        <li><strong>Open Graph meta etiketleri:</strong> <code>og:title</code>, <code>og:description</code>, <code>og:image</code> (1200x630px), <code>og:url</code>, <code>og:type</code>, <code>og:locale</code> etiketlerinin her sayfa için doğru tanımlanması.</li>
        <li><strong>Twitter Card meta etiketleri:</strong> <code>twitter:card</code> (summary_large_image), <code>twitter:title</code>, <code>twitter:description</code>, <code>twitter:image</code> etiketleri.</li>
        <li><strong>Canonical URL:</strong> Her sayfada <code>&lt;link rel="canonical"&gt;</code> etiketi. Yinelenen içerik sorunlarını önlemek için parametre varyasyonlarında doğru canonical belirtimi.</li>
        <li><strong>Hreflang etiketleri:</strong> Çok dilli siteler için her dil/ülke kombinasyonunda karşılıklı hreflang referansları ve x-default tanımı.</li>
        <li><strong>JSON-LD yapısal veri:</strong> Organization, WebSite, BreadcrumbList, Article, Product, FAQ, HowTo, LocalBusiness — sayfa türüne göre uygun şema tiplerinin uygulanması.</li>
        <li><strong>XML Sitemap:</strong> Tüm indekslenebilir sayfaları içeren, 50.000 URL veya 50MB sınırını aşmayan, lastmod değerleri güncel, hreflang referansları dahil sitemap dosyası.</li>
        <li><strong>Robots.txt:</strong> Taranmasını istemediğiniz sayfa ve dizinlerin engellenmesi, sitemap URL referansı ve crawl-delay ayarı (gerekirse).</li>
        <li><strong>Core Web Vitals hedefleri:</strong> LCP < 2.5s, INP < 200ms, CLS < 0.1 — her metrik için ölçüm, analiz ve optimizasyon planı.</li>
        <li><strong>Görsel optimizasyonu:</strong> WebP/AVIF formatı, responsive images (<code>srcset</code>), lazy loading, width/height belirtimi (CLS önleme), CDN üzerinden serve.</li>
        <li><strong>Internal linking stratejisi:</strong> İçerik hub'ları (topic clusters), anchor text optimizasyonu ve orphan page tespiti.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>Next.js metadata API ile SEO:</strong></p>
      <code>
// app/layout.tsx — Global metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: { default: 'Site Adı', template: '%s | Site Adı' },
  description: 'Varsayılan açıklama.',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Site Adı',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}
      </code>
      <p><strong>JSON-LD yapısal veri (Organization + WebSite):</strong></p>
      <code>
&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Şirket Adı",
      "url": "https://example.com",
      "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" },
      "sameAs": ["https://twitter.com/...", "https://linkedin.com/..."]
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com",
      "name": "Site Adı",
      "publisher": { "@id": "https://example.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://example.com/ara?q={search_term}",
        "query-input": "required name=search_term"
      }
    }
  ]
}
&lt;/script&gt;
      </code>
      <p><strong>BreadcrumbList JSON-LD:</strong></p>
      <code>
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://example.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://example.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Yazı Başlığı" }
  ]
}
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>Tüm sayfalarda aynı title ve description kullanmak:</strong> Her sayfa benzersiz meta etiketlere sahip olmalıdır — aksi halde Google hangisini indeksleyeceğini bilemez ve "duplicate content" uyarısı verir.</li>
        <li><strong>JSON-LD'yi yanlış uygulamak:</strong> Schema Markup Validator'da hata veren yapısal veri, Google tarafından görmezden gelinir. Her değişiklikte test edin.</li>
        <li><strong>Sitemap'i güncellememek:</strong> Yeni sayfalar eklendiğinde sitemap otomatik güncellenmezse, Google bu sayfaları geç keşfeder.</li>
        <li><strong>CLS'i göz ardı etmek:</strong> Reklam alanları, geç yüklenen görseller ve dinamik eklenen içerikler layout shift yaratır. Her elemana sabit boyut verin.</li>
        <li><strong>Robots.txt ile önemli sayfaları engellemek:</strong> CSS/JS dosyalarını veya önemli sayfa türlerini engellemek, Google'ın sitenizi doğru render etmesini engeller.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>SEO meta etiketlerini otomatik oluşturan bir şablon sistemi kurun — her yeni sayfa için manuel yazım hem yavaş hem hata eğilimlidir.</li>
        <li>JSON-LD'yi merkezi bir utility fonksiyonla üretin — böylece şema güncellemelerinde tek noktadan değişiklik yapabilirsiniz.</li>
        <li>Core Web Vitals'ı gerçek kullanıcı verileriyle (CrUX) izleyin, sadece lab verilerine güvenmeyin — Lighthouse puanı ile saha verisi farklı olabilir.</li>
        <li>Internal link audit'i aylık yapın — link equity'nin doğru dağılmasını sağlayın ve orphan page'leri ortadan kaldırın.</li>
        <li>Image CDN (Cloudinary, imgix) kullanarak görselleri otomatik olarak en uygun format ve boyutta sunun — manuel dönüşüm gereksinimini ortadan kaldırır.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin SEO ve Core Web Vitals optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-6-sem',
    categoryId: 'web-optimizasyon',
    title: 'Faz 6: SEM — GTM, Conversion Tracking ve UTM Yönetimi',
    description: 'Google Tag Manager kurulumu, GA4 event tracking, dönüşüm pikselleri ve UTM parametreleri ile kampanya izleme.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>Dijital pazarlama harcamaları ölçülemediğinde, bütçenizin <strong>yarısının boşa gittiğini bilirsiniz ama hangi yarısı olduğunu bilemezsiniz</strong>. SEM (Search Engine Marketing) altyapısı, her kuruşun nereye gittiğini ve ne getirdiğini gösterir.</p>
      <p>Google Tag Manager (GTM) olmadan tag yönetimi, her değişiklikte geliştirici müdahalesi gerektirir — bu da haftalık gecikmeler ve yüksek maliyet demektir. GTM ile pazarlama ekibi, teknik ekip bağımsız olarak dakikalar içinde tag ekleyip güncelleyebilir.</p>
      <p>UTM parametreleri doğru yapılandırılmadığında, GA4'te kampanya performansları birbirine karışır. "Direct" veya "Unassigned" trafik oranı %30'u aştığında, attribution modeliniz güvenilmez hale gelir ve yanlış kararlar alırsınız.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>GTM container kurulumu:</strong> Web ve server-side GTM container'larının oluşturulması, snippet'lerin head ve body'ye doğru yerleştirilmesi, preview/debug modunun test edilmesi.</li>
        <li><strong>GA4 property ve data stream:</strong> GA4 property oluşturma, web data stream bağlantısı, enhanced measurement etkinleştirme, data retention ayarları (14 ay) ve Google Signals aktivasyonu.</li>
        <li><strong>Custom event tracking:</strong> Form gönderimi, buton tıklamaları, scroll derinliği, video izleme, dosya indirme, outbound link tıklamaları için özel event'ler tanımlama.</li>
        <li><strong>Conversion tracking:</strong> Google Ads dönüşüm etiketi, Meta (Facebook) Pixel, LinkedIn Insight Tag, Twitter Pixel — her platformun dönüşüm pikselinin GTM üzerinden yönetilmesi.</li>
        <li><strong>E-ticaret tracking:</strong> GA4 e-commerce event'leri (view_item, add_to_cart, begin_checkout, purchase), product/item parametreleri ve dönüşüm değeri raporlaması.</li>
        <li><strong>UTM parametreleri standartı:</strong> <code>utm_source</code>, <code>utm_medium</code>, <code>utm_campaign</code>, <code>utm_term</code>, <code>utm_content</code> için isimlendirme kuralları, UTM builder aracı ve team-wide standart.</li>
        <li><strong>Cross-domain tracking:</strong> Birden fazla domain kullanılıyorsa (ana site + landing page + e-ticaret) kullanıcı oturumunun kesintisiz takibi.</li>
        <li><strong>Heatmap ve oturum kaydı:</strong> Hotjar veya Microsoft Clarity kurulumu, heatmap analizi, session recording, funnel analizi ve kullanıcı davranış görselleştirmesi.</li>
        <li><strong>Data Layer standardizasyonu:</strong> GTM Data Layer'a push edilen verilerin yapısı, isimlendirmesi ve doğruluğunun belgelenmesi.</li>
        <li><strong>Tag firing kuralları:</strong> Her tag için trigger, exception ve firing priority'nin tanımlanması. Sayfa yüklenme performansını olumsuz etkilememek için tag yükleme sırası optimizasyonu.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>Data Layer push (form gönderimi örneği):</strong></p>
      <code>
// Form submit event'i
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'form_submit',
  form_name: 'contact_form',
  form_location: 'footer',
  user_type: 'new_visitor'
});

// E-commerce purchase event
window.dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T-12345',
    value: 299.90,
    currency: 'TRY',
    items: [{
      item_id: 'SKU-001',
      item_name: 'SEO Danışmanlık Paketi',
      price: 299.90,
      quantity: 1
    }]
  }
});
      </code>
      <p><strong>UTM isimlendirme standartı:</strong></p>
      <code>
// UTM Yapı Standardı
utm_source   = platform adı (google, facebook, linkedin, newsletter)
utm_medium   = kanal türü (cpc, cpm, email, social, referral)
utm_campaign = kampanya adı (2024-q1-spring-sale, brand-awareness)
utm_term     = anahtar kelime (sadece paid search için)
utm_content  = varyasyon (banner-a, cta-red, hero-video)

// Örnek
https://example.com/landing?utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=2024-q1-seo-paket&amp;utm_content=headline-a
      </code>
      <p><strong>Server-side GTM avantajları:</strong> Birinci parti cookie kullanımı (ITP/ETP bypass), azaltılmış client-side JavaScript, veri zenginleştirme ve PII filtreleme imkanı.</p>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>GTM'de versiyon yayınlamamak:</strong> Preview modunda test edip "Publish" butonuna basmayı unutmak — tag'ler canlıda çalışmaz ve veri kaybı yaşanır.</li>
        <li><strong>Duplicate tag firing:</strong> Aynı event'in birden fazla kez tetiklenmesi (özellikle SPA navigasyonlarında) — dönüşüm raporları şişer ve güvenilmez hale gelir.</li>
        <li><strong>UTM parametrelerinde tutarsızlık:</strong> "Google" vs "google" vs "GOOGLE" — GA4'te bunlar 3 farklı kaynak olarak görünür. Lowercase standartı zorunlu.</li>
        <li><strong>Consent Mode ile tag'leri senkronize etmemek:</strong> Kullanıcı çerez onayı vermeden analytics/marketing tag'lerinin çalışması hem yasal risk hem veri kalitesi sorunudur.</li>
        <li><strong>Çok fazla tag yüklemek:</strong> Her istek için 30+ tag tetiklemek sayfa performansını ciddi şekilde düşürür. Gerçekten ihtiyaç duyulan tag'leri belirleyin ve geri kalanını temizleyin.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>GTM workspace'lerini kullanarak pazarlama ve geliştirme ekiplerinin aynı container üzerinde çakışmadan çalışmasını sağlayın.</li>
        <li>GA4 DebugView'ı her yeni event implementasyonunda kullanın — gerçek zamanlı olarak event parametrelerinin doğruluğunu kontrol edin.</li>
        <li>Server-side GTM'e geçiş planlayın — tarayıcı tabanlı tracking bloklamaları (ad blockers, ITP) artık trafiğin %30-40'ını gizliyor.</li>
        <li>Aylık "tag audit" yapın — kullanılmayan, bozuk veya duplicate tag'leri tespit edip temizleyin. GTM Tag Assistant ile tag sağlık raporu alın.</li>
        <li>UTM builder'ı Google Sheets'te oluşturun ve tüm ekiple paylaşın — merkezi kontrol, tutarlı isimlendirme ve kampanya arşivi sağlar.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin SEM altyapısı ve dönüşüm takip optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-7-geo',
    categoryId: 'web-optimizasyon',
    title: 'Faz 7: GEO — llms.txt, AI-Friendly İçerik ve Schema Markup',
    description: 'Generative Engine Optimization: llms.txt dosyası, AI dostu içerik yapısı ve genişletilmiş şema markup uygulamaları.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>AI arama motorları (ChatGPT Search, Google AI Overviews, Perplexity, Claude) geleneksel arama davranışını kökten değiştiriyor. Gartner tahminlerine göre 2026'ya kadar geleneksel arama trafiğinin <strong>%25'i</strong> AI arama motorlarına kayacak.</p>
      <p>GEO (Generative Engine Optimization), web sitenizin AI sistemleri tarafından <strong>kaynak olarak referans gösterilmesini</strong> sağlayan yeni bir optimizasyon disiplinidir. Geleneksel SEO ile birlikte çalışır ama farklı kuralları vardır.</p>
      <p>AI motorları yapılandırılmış, açık ve otoriter içerikleri tercih eder. Karmaşık, belirsiz veya kaynak göstermeyen içerikler AI tarafından atlanır. <code>llms.txt</code> dosyası, AI botlarına sitenizin haritasını ve bağlamını sunan yeni bir standarttır.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>llms.txt dosyası oluşturma:</strong> Site kök dizinine yerleştirilen, sitenin amacını, içerik yapısını, önemli sayfaları ve iletişim bilgilerini AI botlarına açıklayan metin dosyası. Markdown formatında, 2000 kelimeyi aşmayan, net ve yapılandırılmış.</li>
        <li><strong>AI-friendly içerik yapısı:</strong> Her sayfada net başlık hiyerarşisi, ilk paragrafta ana fikrin özeti, sorulara doğrudan yanıt veren format, kaynaklı istatistikler ve kısa cümleler.</li>
        <li><strong>FAQPage Schema:</strong> Gerçek kullanıcı sorularını içeren, kısa ve doğrudan yanıtlar sunan FAQ yapısal verisi. Her soru-cevap çifti bağımsız olarak anlamlı olmalı.</li>
        <li><strong>HowTo Schema:</strong> Adım adım talimatlar içeren içerikler için HowTo yapısal verisi — her adımda açıklama, görsel (isteğe bağlı) ve tahmini süre.</li>
        <li><strong>Entity tanımlama:</strong> Sitenizde bahsedilen kişiler, organizasyonlar, ürünler ve kavramlar için açık tanımlamalar. AI motorları entity ilişkilerini anlamaya çalışır.</li>
        <li><strong>Kaynak otoritesi sinyalleri:</strong> Yazar biyografileri (E-E-A-T), referans linkleri, güncelleme tarihleri, uzman alıntıları ve veri kaynakları gösterimi.</li>
        <li><strong>Çok formatlı içerik:</strong> Aynı bilgiyi metin, tablo, liste ve görsel olarak sunma — AI motorları farklı formatlardan bilgi çıkarmada daha başarılıdır.</li>
        <li><strong>Kanonik bilgi mimarisi:</strong> Her konu için bir "pillar page" ve bağlı "cluster pages" yapısı. AI motorları hub-spoke modeli ile bilgi ağını daha iyi anlar.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>llms.txt dosya yapısı:</strong></p>
      <code>
# Site Adı

## Hakkında
Bu site [kısa açıklama]. Ana odak alanlarımız: [konu 1], [konu 2], [konu 3].

## Önemli Sayfalar
- /hakkimizda — Şirket bilgileri ve ekip
- /hizmetler — Sunulan hizmetlerin detayları
- /blog — Sektörel makaleler ve rehberler
- /iletisim — İletişim bilgileri ve form

## İçerik Yapısı
Blog yazıları [konu alanı] hakkında detaylı rehberler içerir.
Her yazı [yazar adı] tarafından yazılır ve [sıklık] güncellenir.

## İletişim
- Web: https://example.com
- E-posta: info@example.com
      </code>
      <p><strong>FAQPage JSON-LD:</strong></p>
      <code>
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "SEO nedir ve neden önemlidir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO, web sitenizin arama motorlarında üst sıralarda görünmesini sağlayan optimizasyon sürecidir. Organik trafik, toplam web trafiğinin %53'ünü oluşturur."
      }
    }
  ]
}
      </code>
      <p><strong>HowTo JSON-LD:</strong></p>
      <code>
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Web Sitesi SEO Denetimi Nasıl Yapılır",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "TRY", "value": "0" },
  "totalTime": "PT30M",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Site taraması başlatın", "text": "SEO aracınızla sitenizin tamamını tarayın." },
    { "@type": "HowToStep", "position": 2, "name": "Kritik hataları inceleyin", "text": "404 hataları, eksik meta etiketler ve kırık bağlantıları önceliklendirin." }
  ]
}
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>AI optimizasyonu için SEO'yu ihmal etmek:</strong> GEO, SEO'nun yerine değil, tamamlayıcısıdır. Geleneksel SEO temeli olmadan GEO tek başına sonuç vermez.</li>
        <li><strong>llms.txt dosyasını aşırı uzun yazmak:</strong> AI botları kısa, öz ve yapılandırılmış bilgiyi tercih eder. 10.000 kelimelik bir llms.txt okunmaz — 1000-2000 kelime yeterlidir.</li>
        <li><strong>İçerikte kaynak göstermemek:</strong> AI motorları otorite değerlendirmesinde kaynaklı, veri destekli içerikleri önceliklendirir. "Araştırmalara göre" yerine spesifik kaynak belirtin.</li>
        <li><strong>Sadece soru-cevap formatına takılmak:</strong> FAQ Schema önemlidir ama AI motorları tablo, liste, karşılaştırma ve adım-adım formatları da kullanır. İçerik formatınızı çeşitlendirin.</li>
        <li><strong>Entity ilişkilerini tanımlamamak:</strong> "CEO'muz" yerine "CEO'muz Ahmet Yılmaz" demek, AI'ın entity graph'ı oluşturmasına yardımcı olur.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>Perplexity ve ChatGPT'de markanızı veya hizmetlerinizi düzenli olarak aratın — AI motorlarında nasıl temsil edildiğinizi izleyin ve içeriğinizi buna göre optimize edin.</li>
        <li>Her makaleye "TL;DR" (özet) bölümü ekleyin — AI motorları bu özet paragrafları snippet olarak kullanma eğilimindedir.</li>
        <li>İçeriğinize "Son Güncelleme: [tarih]" ekleyin — AI motorları güncellik sinyallerini değerlendirir.</li>
        <li>Aynı konuyu farklı derinlik seviyelerinde işleyin — "X nedir?" (başlangıç), "X nasıl yapılır?" (orta), "X advanced stratejileri" (uzman) formatlı içerik piramidi oluşturun.</li>
        <li>Rakiplerinizin AI arama sonuçlarındaki görünürlüğünü analiz edin — hangi içerik formatı ve yapıları referans gösteriliyor, buna göre stratejinizi şekillendirin.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin GEO ve AI arama motoru optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-8-aio-llmo',
    categoryId: 'web-optimizasyon',
    title: 'Faz 8: AIO/LLMO — AI Bot Yönetimi ve Entity Markup',
    description: 'AI bot erişim kontrolü (GPTBot, ClaudeBot), entity markup optimizasyonu ve knowledge graph stratejisi.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>AI dil modelleri (LLM'ler) web sitenizi eğitim verisi olarak kullanabilir veya gerçek zamanlı olarak tarayabilir. Bu, hem bir <strong>fırsat</strong> hem de bir <strong>risk</strong>tir. Fırsat: AI motorlarında kaynak olarak referans gösterilmek. Risk: İçeriğinizin izinsiz kullanılması ve telif hakkı ihlali.</p>
      <p>AIO (AI Optimization) ve LLMO (Large Language Model Optimization), web sitenizin AI sistemleri tarafından nasıl tüketildiğini kontrol etmenizi sağlar. <code>robots.txt</code> ile hangi AI botlarının sitenizi tarayabileceğini belirlerken, entity markup ile AI'ın içeriğinizi <strong>doğru anlamasını</strong> garanti edersiniz.</p>
      <p>Knowledge graph optimizasyonu yapılmayan siteler, AI motorlarında yanlış veya eksik temsil edilir. Bir müşteriniz ChatGPT'ye şirketinizi sorduğunda yanlış bilgi alması, itibar kaybına yol açar.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>AI bot envanteri:</strong> GPTBot (OpenAI), ClaudeBot/anthropic-ai (Anthropic), Bingbot/BingPreview (Microsoft/Copilot), Google-Extended (Gemini), PerplexityBot, Applebot-Extended (Apple Intelligence) — tüm aktif AI botlarının listesi ve crawl davranışları.</li>
        <li><strong>robots.txt AI kuralları:</strong> Hangi AI botlarına izin verilecek, hangileri engellenecek kararı. İzin verilenler için crawl-delay ayarı. Hassas içerik dizinlerinin (müşteri verileri, ücretli içerik) engellenmesi.</li>
        <li><strong>Meta robots AI direktifleri:</strong> Sayfa bazında <code>noai</code>, <code>noimageai</code> meta tag'leri ile ince ayar kontrolü. Bazı sayfaları AI taramasına açarken hassas sayfaları kapatma.</li>
        <li><strong>Organization entity markup:</strong> Şirket adı, kuruluş tarihi, kurucular, adres, logo, sosyal medya profilleri, sektör bilgisi — tüm organizasyon bilgilerinin yapısal veri olarak tanımlanması.</li>
        <li><strong>Person entity markup:</strong> Şirket liderleri, içerik yazarları ve uzmanlar için <code>Person</code> şeması — isim, unvan, resim, sosyal profiller, uzmanlık alanları.</li>
        <li><strong>Product/Service entity markup:</strong> Ürün ve hizmetler için detaylı şema — ad, açıklama, fiyat, müsaitlik, değerlendirme, marka ilişkisi.</li>
        <li><strong>SameAs ilişkileri:</strong> Web sitesi, Wikipedia/Wikidata sayfası, LinkedIn, Twitter, Crunchbase gibi platform profillerinin <code>sameAs</code> ile bağlanması — AI motorlarının entity'yi doğru eşleştirmesi için kritik.</li>
        <li><strong>Knowledge panel optimizasyonu:</strong> Google Knowledge Panel'de temsil edilmek için Google Business Profile, Wikidata girişi ve tutarlı NAP (Name, Address, Phone) bilgisi.</li>
        <li><strong>İçerik lisanslama sinyalleri:</strong> Creative Commons veya özel lisans bilgisi, <code>copyrightHolder</code> ve <code>license</code> şema property'leri ile içerik haklarının belirtilmesi.</li>
        <li><strong>AI tarama analizi:</strong> Server loglarında AI bot ziyaretlerinin izlenmesi — hangi botlar, hangi sıklıkta, hangi sayfaları tarıyor? Bu veri, strateji kararlarını yönlendirir.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>robots.txt AI bot yönetimi:</strong></p>
      <code>
# AI Bot Kuralları
User-agent: GPTBot
Allow: /blog/
Allow: /hizmetler/
Disallow: /api/
Disallow: /dashboard/
Crawl-delay: 2

User-agent: ClaudeBot
Allow: /blog/
Allow: /hizmetler/
Disallow: /api/
Disallow: /dashboard/
Crawl-delay: 2

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /blog/
Disallow: /premium-icerik/

# Tüm AI botlarını engellemek isterseniz:
# User-agent: GPTBot
# Disallow: /
      </code>
      <p><strong>Kapsamlı Organization entity markup:</strong></p>
      <code>
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://example.com/#organization",
  "name": "Şirket Adı",
  "alternateName": "Şirket Kısa Adı",
  "url": "https://example.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://example.com/logo.png",
    "width": 600,
    "height": 60
  },
  "foundingDate": "2020-01-01",
  "founder": {
    "@type": "Person",
    "name": "Kurucu Adı",
    "jobTitle": "CEO"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "İstanbul",
    "addressCountry": "TR"
  },
  "sameAs": [
    "https://www.linkedin.com/company/...",
    "https://twitter.com/...",
    "https://www.wikidata.org/wiki/Q..."
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-xxx-xxx-xxxx",
    "contactType": "customer service",
    "availableLanguage": ["Turkish", "English"]
  }
}
      </code>
      <p><strong>Meta robots AI direktifleri:</strong></p>
      <code>
&lt;!-- AI taramasını bu sayfada engelle --&gt;
&lt;meta name="robots" content="noai, noimageai"&gt;

&lt;!-- Sadece görsel kullanımını engelle --&gt;
&lt;meta name="robots" content="noimageai"&gt;
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>Tüm AI botlarını körü körüne engellemek:</strong> AI arama motorlarındaki görünürlüğünüzü tamamen kaybedersiniz. Stratejik izin/engelleme kararı verin — blog ve hizmet sayfalarını açın, hassas verileri kapatın.</li>
        <li><strong>Entity bilgilerinde tutarsızlık:</strong> Web sitesinde "ABC Teknoloji", LinkedIn'de "ABC Tech", Google Business'ta "ABC Teknoloji Ltd." — bu tutarsızlık AI'ın entity eşleştirmesini zorlaştırır.</li>
        <li><strong>sameAs ilişkilerini eksik bırakmak:</strong> Organization şemasında sameAs olmadan, AI motorları şirketinizi Wikipedia/Wikidata entity'siyle eşleştiremez.</li>
        <li><strong>AI bot loglarını izlememek:</strong> Hangi botların sitenizi ne sıklıkla taradığını bilmeden strateji oluşturmak kör uçuştur.</li>
        <li><strong>Ücretli içeriği AI'a açmak:</strong> Premium/paywall içeriğinizi AI botlarına açarsanız, kullanıcılar AI'dan ücretsiz ulaşır — gelir modeliniz çöker.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>AI bot trafiğini ayrı bir analytics segmentinde izleyin — bu trafiğin hacmi ve trendleri, GEO/AIO stratejinizin başarısını ölçer.</li>
        <li>Wikidata'da şirketiniz için bir giriş oluşturun — bu, AI motorlarının entity graph'ında yerinizi sağlamlaştırır.</li>
        <li>Rakiplerinizin robots.txt dosyasını inceleyin — AI botlarına nasıl yaklaştıklarını öğrenin ve stratejinizi buna göre konumlandırın.</li>
        <li>Mevsimsel olarak AI bot kurallarınızı gözden geçirin — yeni botlar eklenir, mevcut botların davranışları değişir. Dinamik bir yönetim gereklidir.</li>
        <li>İçerik lisanslama stratejinizi belirleyin — AI şirketleriyle lisans anlaşmaları gelecekte önemli bir gelir kaynağı olabilir.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin AI bot yönetimi ve entity markup optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-9-analitik-performans',
    categoryId: 'web-optimizasyon',
    title: 'Faz 9: Analitik ve Performans — GA4, CWV ve Optimizasyon',
    description: 'GA4 ileri düzey konfigürasyon, Core Web Vitals hedefleri, görsel optimizasyonu ve performans izleme stratejisi.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>Peter Drucker'ın ünlü sözü dijital dünyada da geçerlidir: <strong>"Ölçemediğinizi yönetemezsiniz."</strong> Web sitenizin analitik altyapısı, tüm dijital stratejinin beynidir. Doğru veri toplamadan alınan her karar, tahminden ibarettir.</p>
      <p>Google, Core Web Vitals'ı sıralama faktörü olarak kullanmaktadır. LCP'si 2.5 saniyenin üzerinde olan sayfalar, rakiplerine karşı sıralama dezavantajına düşer. Amazon'un araştırmasına göre sayfa yüklenme süresindeki <strong>her 100ms gecikme, satışları %1 azaltır</strong>.</p>
      <p>GA4, Universal Analytics'ten tamamen farklı bir veri modeli kullanır. Event-based model, doğru yapılandırılmadığında anlamsız veri yığını oluşturur. Öte yandan, doğru kurulduğunda kullanıcı yolculuğunun her adımını kristal netliğinde görmenizi sağlar.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>GA4 custom events tanımlama:</strong> İş hedeflerine özel event'ler — newsletter aboneliği, form gönderimi, ürün detay görüntüleme, checkout adımları, video izleme tamamlama. Her event için anlamlı parametreler.</li>
        <li><strong>Conversion funnel kurulumu:</strong> Kullanıcı yolculuğunun kritik adımlarını funnel olarak tanımlama — landing page → ürün sayfası → sepet → checkout → satın alma. Her adımdaki kayıp oranının izlenmesi.</li>
        <li><strong>Custom dimensions ve metrics:</strong> Kullanıcı segmentasyonu için özel boyutlar (üyelik tipi, sektör, şehir) ve metrikler (lifetime value, engagement score) tanımlama.</li>
        <li><strong>GA4 audiences:</strong> Yeniden pazarlama ve analiz için hedef kitle segmentleri — son 7 günde sepet terk edenler, 3+ sayfa görüntüleyenler, belirli ürün kategorisini inceleyenler.</li>
        <li><strong>Core Web Vitals izleme:</strong> LCP < 2.5s, INP < 200ms, CLS < 0.1 hedefleri. Hem lab (Lighthouse, WebPageTest) hem saha (CrUX, web-vitals kütüphanesi) verilerinin takibi.</li>
        <li><strong>Görsel optimizasyonu:</strong> WebP/AVIF dönüşümü, responsive images (srcset + sizes), lazy loading (native veya Intersection Observer), blur placeholder, width/height belirtimi.</li>
        <li><strong>Font optimizasyonu:</strong> Font subsetting (sadece kullanılan karakterler), <code>font-display: swap</code>, preload critical fonts, variable fonts kullanımı.</li>
        <li><strong>JavaScript bundle optimizasyonu:</strong> Code splitting, tree shaking, dynamic import, third-party script lazy loading, bundle analyzer ile gereksiz dependency tespiti.</li>
        <li><strong>Caching stratejisi:</strong> Browser cache (Cache-Control headers), CDN cache, service worker cache, stale-while-revalidate pattern — her kaynak türü için uygun caching politikası.</li>
        <li><strong>Performance budget:</strong> Toplam sayfa boyutu (< 1.5MB), JavaScript boyutu (< 300KB), LCP target, Time to Interactive target — her metrik için bütçe belirleme ve CI'da kontrol.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>Web Vitals kütüphanesi ile CWV izleme:</strong></p>
      <code>
import { onLCP, onINP, onCLS } from 'web-vitals';

function sendToAnalytics(metric: { name: string; value: number; id: string }) {
  // GA4'e gönder
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
      </code>
      <p><strong>Next.js Image optimizasyonu:</strong></p>
      <code>
import Image from 'next/image';

&lt;Image
  src="/hero-banner.jpg"
  alt="Ana sayfa banner görseli"
  width={1200}
  height={630}
  priority  // LCP görseli için
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
/&gt;
      </code>
      <p><strong>Performance budget (Lighthouse CI):</strong></p>
      <code>
// lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-byte-weight": ["warn", { "maxNumericValue": 1500000 }]
      }
    }
  }
}
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>GA4 enhanced measurement'a güvenmek:</strong> Otomatik event tracking çoğu durumda yetersizdir — scroll depth sadece %90'da tetiklenir, outbound click parametreleri eksik olabilir. Custom event'lerle zenginleştirin.</li>
        <li><strong>Lab ve saha verilerini karıştırmak:</strong> Lighthouse 100 puanı, gerçek kullanıcıların deneyimini garanti etmez. CrUX verileri gerçeği yansıtır — her ikisini de izleyin.</li>
        <li><strong>Lazy loading'i LCP görseline uygulamak:</strong> Above-the-fold görsellere lazy loading eklemek LCP'yi kötüleştirir. <code>priority</code> attribute kullanın.</li>
        <li><strong>Third-party script'leri kontrolsüz yüklemek:</strong> Chat widget, analytics, remarketing pikselleri — her biri sayfa performansını etkiler. Toplam etkiyi ölçün ve gereksiz olanları kaldırın.</li>
        <li><strong>CLS sorunlarını göz ardı etmek:</strong> Geç yüklenen reklam alanları, font-display swap ile font değişimi, dinamik içerik eklenmesi — tümü layout shift yaratır ve kullanıcı deneyimini bozar.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>GA4 Explorations'ı (keşif raporları) kullanarak funnel analizi, path exploration ve segment overlap raporları oluşturun — standart raporların ötesine geçin.</li>
        <li>Real User Monitoring (RUM) araçları ile gerçek kullanıcı deneyimini izleyin — SpeedCurve, Sentry Performance veya web-vitals kütüphanesi ile her sayfa yüklemesinin CWV metriklerini toplayın.</li>
        <li>Performance budgets'ı CI/CD pipeline'ına entegre edin — Lighthouse CI ile her PR'da performans regresyonu otomatik tespit edilsin.</li>
        <li>CDN (Cloudflare, Vercel Edge) kullanarak statik asset'leri kullanıcıya en yakın sunucudan serve edin — TTFB'yi %50-70 azaltabilirsiniz.</li>
        <li>Ayda bir "performance sprint" yapın — biriken performans borçlarını temizleyin, bundle boyutunu analiz edin ve eski dependency'leri güncelleyin.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin analitik altyapısı ve performans optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-10-guvenlik',
    categoryId: 'web-optimizasyon',
    title: 'Faz 10: Güvenlik — Security Headers, Auth ve Rate Limiting',
    description: 'Web sitesi güvenlik katmanları: HTTP security headers, kimlik doğrulama, rate limiting ve XSS/CSRF koruması.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>Her <strong>39 saniyede</strong> bir siber saldırı gerçekleşiyor. IBM'in 2024 raporuna göre bir veri ihlalinin ortalama maliyeti <strong>4.88 milyon dolar</strong>. KOBİ'lerin %60'ı bir siber saldırıdan sonra 6 ay içinde kapanıyor. Web sitesi güvenliği artık IT departmanının değil, iş sürekliliğinin konusudur.</p>
      <p>Google, HTTPS kullanımını sıralama faktörü olarak değerlendirmektedir. Ancak SSL sertifikası tek başına güvenlik sağlamaz. HTTP security headers, XSS koruması, CSRF token'ları ve rate limiting gibi katmanlı güvenlik önlemleri zorunludur.</p>
      <p>OWASP Top 10 listesindeki yaygın güvenlik açıkları — injection, broken authentication, XSS, CSRF — hala web uygulamalarının büyük çoğunluğunda bulunmaktadır. Proaktif güvenlik, reaktif müdahaleden her zaman daha ucuzdur.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>Content-Security-Policy (CSP):</strong> Hangi kaynakların yüklenmesine izin verileceğini belirleyen detaylı politika — script-src, style-src, img-src, font-src, connect-src, frame-src direktifleri. Report-only modunda test edip production'da enforce edin.</li>
        <li><strong>X-Frame-Options / frame-ancestors:</strong> Clickjacking saldırılarına karşı koruma — <code>DENY</code> veya <code>SAMEORIGIN</code> ayarı. CSP frame-ancestors ile eşdeğer modern koruma.</li>
        <li><strong>Strict-Transport-Security (HSTS):</strong> Tüm iletişimin HTTPS üzerinden gerçekleşmesini zorunlu kılan header — minimum 1 yıl max-age, includeSubDomains ve preload direktifleri.</li>
        <li><strong>X-Content-Type-Options:</strong> MIME type sniffing saldırılarını engelleyen <code>nosniff</code> değeri.</li>
        <li><strong>Referrer-Policy:</strong> Referrer bilgisinin ne kadarının paylaşılacağını kontrol eden politika — <code>strict-origin-when-cross-origin</code> önerilen değer.</li>
        <li><strong>Permissions-Policy:</strong> Kamera, mikrofon, geolocation, payment gibi tarayıcı özelliklerine erişimi kontrol eden politika.</li>
        <li><strong>Rate limiting:</strong> API endpoint'leri ve form submission'lar için istek sınırlaması — brute force, DDoS ve abuse koruması. IP tabanlı ve kullanıcı tabanlı limitler.</li>
        <li><strong>Authentication güvenliği:</strong> Güçlü şifre politikası, MFA (Multi-Factor Authentication), session yönetimi, token rotation, brute force koruması.</li>
        <li><strong>XSS koruması:</strong> Input sanitization, output encoding, CSP nonce/hash kullanımı, DOM-based XSS tespiti. React/Next.js varsayılan olarak XSS koruması sağlar ama <code>dangerouslySetInnerHTML</code> dikkat gerektirir.</li>
        <li><strong>CSRF koruması:</strong> State-changing isteklerde CSRF token zorunluluğu, SameSite cookie attribute, Origin/Referer header kontrolü.</li>
        <li><strong>Dependency güvenliği:</strong> <code>npm audit</code> ile düzenli güvenlik taraması, Dependabot/Snyk ile otomatik güvenlik güncellemesi, supply chain saldırı koruması.</li>
        <li><strong>Error handling:</strong> Production'da detaylı hata mesajları göstermeme (stack trace sızıntısı), özel hata sayfaları (404, 500), error logging (Sentry gibi).</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>Security headers konfigürasyonu (Next.js):</strong></p>
      <code>
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'nonce-{NONCE}' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com",
      "frame-ancestors 'none'",
    ].join('; ')
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
];
      </code>
      <p><strong>Rate limiting (basit implementasyon):</strong></p>
      <code>
// In-memory rate limiter (production'da Redis kullanın)
const rateLimitMap = new Map&lt;string, { count: number; resetTime: number }&gt;();

function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) return false;
  record.count++;
  return true;
}

// Kullanım: 15 dakikada max 100 istek
if (!rateLimit(clientIP, 100, 15 * 60 * 1000)) {
  return new Response('Too Many Requests', { status: 429 });
}
      </code>
      <p><strong>CSRF token implementasyonu:</strong></p>
      <code>
import { randomBytes } from 'crypto';

function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

// Token'ı cookie'ye set et (httpOnly: false — JS okumalı)
// Her POST/PUT/DELETE isteğinde header'dan token'ı al ve cookie ile karşılaştır
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>CSP'yi production'da test etmeden deploy etmek:</strong> Yanlış yapılandırılmış CSP, sitenin tamamen çalışmamasına neden olabilir. Önce <code>Content-Security-Policy-Report-Only</code> ile test edin.</li>
        <li><strong>Rate limiting'i sadece login'e uygulamak:</strong> API endpoint'leri, form gönderim sayfaları ve arama fonksiyonu da abuse edilebilir — tüm kritik endpoint'lere rate limiting ekleyin.</li>
        <li><strong>npm audit uyarılarını göz ardı etmek:</strong> "Zaten çalışıyor" yaklaşımı, bilinen güvenlik açıklarını kasıtlı olarak göz ardı etmektir. Düzenli güncelleme disiplini şarttır.</li>
        <li><strong>HTTPS'i yeterli görmek:</strong> SSL/TLS sertifikası transit güvenliğini sağlar ama uygulama katmanı güvenliğini garanti etmez. HSTS, CSP ve diğer header'lar ek katmanlar gerektirir.</li>
        <li><strong>Error mesajlarında bilgi sızdırmak:</strong> "Kullanıcı bulunamadı" vs "Şifre yanlış" — saldırgana kullanıcı adının geçerli olduğunu söyler. Genel hata mesajı kullanın.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>SecurityHeaders.com ve Mozilla Observatory ile sitenizin güvenlik başlık puanını düzenli kontrol edin — A+ hedefleyin.</li>
        <li>Web Application Firewall (WAF) kullanın — Cloudflare, AWS WAF gibi servisler SQL injection ve XSS saldırılarını edge'de bloklar.</li>
        <li>Penetrasyon testi (pentest) yılda en az 1 kez yaptırın — otomatik tarayıcıların bulamadığı mantıksal açıkları uzman göz bulur.</li>
        <li>Subresource Integrity (SRI) kullanarak CDN'den yüklenen script'lerin bütünlüğünü doğrulayın — CDN kompromize edilse bile zararlı kod çalışmaz.</li>
        <li>Bug bounty programı başlatmayı değerlendirin — HackerOne gibi platformlar üzerinden güvenlik araştırmacılarının açıkları bildirmesini teşvik edin.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin güvenlik altyapısı ve koruma optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-11-ux-temelleri',
    categoryId: 'web-optimizasyon',
    title: 'Faz 11: UX Temelleri — Zorunlu Sayfalar ve Global Bileşenler',
    description: 'Kullanıcı deneyimi temelleri: hata sayfaları, loading states, breadcrumb, search, responsive tasarım ve form doğrulama.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>Kullanıcı deneyimi (UX), web sitenizin <strong>ticari başarısını doğrudan belirler</strong>. Forrester Research'e göre iyi UX tasarımı, dönüşüm oranlarını <strong>%400'e kadar</strong> artırabilir. Her 1 dolarlık UX yatırımı, ortalama 100 dolarlık getiri sağlar.</p>
      <p>Kullanıcıların <strong>%88'i</strong> kötü bir deneyimden sonra siteye geri dönmez. İlk izlenim her şeydir — yavaş yüklenen sayfalar, kafa karıştırıcı navigasyon, eksik hata sayfaları ve tutarsız form davranışları kullanıcıları rakiplerinize yönlendirir.</p>
      <p>404 hata sayfası, arama fonksiyonu, breadcrumb navigasyonu ve loading state'ler gibi "sıkıcı" görünen bileşenler aslında kullanıcı yolculuğunun <strong>kritik temas noktalarıdır</strong>. Bu noktaların ihmal edilmesi, sitenin profesyonel algısını yok eder.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>404 hata sayfası:</strong> Kullanıcı dostu, markayla uyumlu, ana sayfaya yönlendiren, popüler sayfaları gösteren ve site içi arama sunan özel 404 sayfası. "Sayfa bulunamadı" mesajı yetmez — kullanıcıyı kaybetmeyin.</li>
        <li><strong>500 hata sayfası:</strong> Sunucu hatası durumunda kullanıcıya bilgi veren, teknik detay göstermeyen, destek iletişim bilgisi sunan ve otomatik yeniden deneme önerisinde bulunan özel sayfa.</li>
        <li><strong>Loading states ve skeleton'lar:</strong> Her asenkron veri yüklemesinde loading skeleton, shimmer efekti veya spinner gösterimi. Boş ekran asla gösterilmemeli — kullanıcı "sayfa çalışıyor" sinyali almalı.</li>
        <li><strong>Breadcrumb navigasyonu:</strong> Tüm alt sayfalarda konum gösteren breadcrumb. SEO için JSON-LD BreadcrumbList şeması. Mobilde kısaltılmış gösterim (son 2-3 seviye).</li>
        <li><strong>Site içi arama:</strong> Arama kutusu, otomatik tamamlama (autocomplete), arama önerileri, sonuçsuz durum yönetimi, arama analitiği (ne arıyorlar?) ve filtreleme seçenekleri.</li>
        <li><strong>Responsive breakpoint'ler:</strong> Mobile-first yaklaşım, 5 breakpoint (sm, md, lg, xl, 2xl), her breakpoint için layout plan, touch target boyutu (minimum 44x44px), thumb zone optimizasyonu.</li>
        <li><strong>Form validation:</strong> Inline validation (anlık geri bildirim), Türkçe hata mesajları, erişilebilir hata gösterimi (<code>aria-invalid</code>, <code>aria-describedby</code>), submit engelleme ve başarı geri bildirimi.</li>
        <li><strong>Toast notifications:</strong> Başarı, hata, uyarı ve bilgi toast'ları. Otomatik kapanma süresi (5-8 saniye), manuel kapatma butonu, erişilebilirlik (<code>aria-live</code>). Birden fazla toast yönetimi (stack).</li>
        <li><strong>Empty states:</strong> Veri yokken gösterilen anlamlı mesajlar — "Henüz blog yazınız yok" + aksiyon butonu ("İlk yazınızı oluşturun"). Boş tablo, boş liste ve boş dashboard için ayrı tasarımlar.</li>
        <li><strong>Scroll behavior:</strong> Smooth scroll, back-to-top butonu (uzun sayfalarda), infinite scroll veya pagination tercihi, scroll position korunması (navigasyon sonrası).</li>
        <li><strong>Dark mode uyumluluğu:</strong> Tüm bileşenlerin light ve dark mode'da doğru görünümü — gölgeler, kenarlıklar, hover state'ler ve disabled state'lerin her iki temada test edilmesi.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>404 sayfası (Next.js):</strong></p>
      <code>
// app/not-found.tsx
export default function NotFound() {
  return (
    &lt;div className="flex flex-col items-center justify-center min-h-[60vh] text-center"&gt;
      &lt;h1 className="text-6xl font-bold text-primary"&gt;404&lt;/h1&gt;
      &lt;p className="mt-4 text-xl text-muted-foreground"&gt;
        Aradığınız sayfa bulunamadı
      &lt;/p&gt;
      &lt;div className="mt-8 flex gap-4"&gt;
        &lt;a href="/" className="btn-primary"&gt;Ana Sayfaya Dön&lt;/a&gt;
        &lt;a href="/iletisim" className="btn-secondary"&gt;Destek Alın&lt;/a&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  )
}
      </code>
      <p><strong>Loading skeleton pattern:</strong></p>
      <code>
// components/skeleton-card.tsx
function SkeletonCard() {
  return (
    &lt;div className="rounded-lg border p-4 space-y-3"&gt;
      &lt;div className="h-4 w-3/4 bg-muted animate-pulse rounded" /&gt;
      &lt;div className="h-3 w-full bg-muted animate-pulse rounded" /&gt;
      &lt;div className="h-3 w-5/6 bg-muted animate-pulse rounded" /&gt;
      &lt;div className="flex gap-2 mt-4"&gt;
        &lt;div className="h-8 w-20 bg-muted animate-pulse rounded" /&gt;
        &lt;div className="h-8 w-20 bg-muted animate-pulse rounded" /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  )
}
      </code>
      <p><strong>Form validation (Türkçe hata mesajları):</strong></p>
      <code>
const validationMessages = {
  required: 'Bu alan zorunludur',
  email: 'Geçerli bir e-posta adresi girin',
  minLength: (min: number) => \`En az \${min} karakter girilmelidir\`,
  maxLength: (max: number) => \`En fazla \${max} karakter girilebilir\`,
  pattern: 'Geçerli bir değer girin',
  phone: 'Geçerli bir telefon numarası girin (05XX XXX XX XX)',
};
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>Varsayılan 404 sayfası kullanmak:</strong> Next.js'in varsayılan hata sayfası profesyonel bir izlenim bırakmaz. Özel, markayla uyumlu hata sayfaları tasarlayın.</li>
        <li><strong>Loading state'i atlayıp boş sayfa göstermek:</strong> Veri yüklenirken beyaz ekran görmek, kullanıcıya "sayfa bozuldu" izlenimi verir. Her asenkron işlemde skeleton veya spinner gösterin.</li>
        <li><strong>Form hatalarını sadece submit'te göstermek:</strong> Kullanıcı 10 alanı doldurduktan sonra "3. alan hatalı" demek kötü UX'tir. Inline validation ile anlık geri bildirim verin.</li>
        <li><strong>Mobilde touch target'ı küçük bırakmak:</strong> 32px butonlar masaüstünde çalışır ama mobilde tıklanamaz. Minimum 44x44px touch target zorunludur (WCAG 2.5.8).</li>
        <li><strong>Toast'ları ekranın altına yerleştirmek:</strong> Mobilde klavye açıkken alt toast görünmez. Ekranın üstünde veya sağ üstte konumlandırın.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>404 sayfanıza Google Analytics event'i ekleyin — hangi URL'lere geliniyor, nereden yönlendiriliyorlar? Bu veri, kırık link ve yönlendirme eksiklerini tespit etmenizi sağlar.</li>
        <li>Skeleton loading'i gerçek veri yapısına uygun tasarlayın — genel bir shimmer yerine, kart, tablo satırı ve form alanlarının iskeletlerini gösterin. Bu, "perceived performance"ı artırır.</li>
        <li>Arama analitiğini düzenli inceleyin — kullanıcılar ne arıyor ama bulamıyor? Bu, içerik stratejiniz ve navigasyon yapınız için altın değerinde bir veri kaynağıdır.</li>
        <li>Form completion rate'i ölçün — formun hangi alanında kullanıcılar terk ediyor? Bu veriye göre form akışını optimize edin, gereksiz alanları kaldırın.</li>
        <li>Responsive tasarımı gerçek cihazlarda test edin — Chrome DevTools simülasyonu yetersizdir. BrowserStack veya gerçek cihazlarla test edin.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin UX temelleri ve kullanıcı deneyimi optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  },
  {
    id: 'faz-12-sosyal-iletisim',
    categoryId: 'web-optimizasyon',
    title: 'Faz 12: Sosyal ve İletişim — OG Images, Paylaşım ve İletişim Kanalları',
    description: 'Sosyal medya optimizasyonu: OG image generator, paylaşım önizlemeleri, iletişim formu ve canlı destek entegrasyonu.',
    readTime: '8 dk',
    content: `
      <h2>Neden Önemli?</h2>
      <p>Web sitenizin sosyal medyada nasıl göründüğü, paylaşım oranlarını ve marka algısını doğrudan etkiler. Open Graph meta etiketleri olmayan bir link paylaşıldığında, başlıksız ve görselsiz bir kutu görünür — bu da <strong>tıklama oranını %70'e kadar düşürür</strong>.</p>
      <p>İletişim kanallarının çeşitliliği ve erişilebilirliği, potansiyel müşterilerin <strong>güvenini ve dönüşüm oranlarını</strong> artırır. HubSpot araştırmasına göre canlı chat sunan siteler, sunmayanlara kıyasla <strong>%20 daha yüksek dönüşüm</strong> oranına sahiptir.</p>
      <p>Her platform (Twitter/X, LinkedIn, Facebook, WhatsApp, Telegram) farklı önizleme formatları ve boyut gereksinimleri kullanır. Tek bir OG image tüm platformlarda optimal görünmez — platform-spesifik optimizasyon gerekir.</p>

      <h2>Kontrol Listesi</h2>
      <ul>
        <li><strong>OG Image tasarımı:</strong> 1200x630px temel boyut, marka renkleri ve logosu, okunabilir başlık metni (büyük font), kategori/tarih bilgisi. Her sayfa türü için şablon (blog, ürün, hizmet, ana sayfa).</li>
        <li><strong>OG Image generator:</strong> Dinamik OG image oluşturma sistemi — her blog yazısı ve sayfa için otomatik, başlık ve görsel içeren OG image üretimi. Next.js <code>ImageResponse</code> API veya Satori kütüphanesi.</li>
        <li><strong>Twitter Card optimizasyonu:</strong> <code>summary_large_image</code> card tipi, 2:1 en-boy oranı (1200x600px), Twitter'a özel başlık ve açıklama uzunluğu optimizasyonu.</li>
        <li><strong>LinkedIn preview:</strong> 1200x627px görsel, 150 karakterlik açıklama, şirket adı ve yazar bilgisi. LinkedIn Inspector ile önizleme testi.</li>
        <li><strong>WhatsApp ve Telegram paylaşım:</strong> Bu platformlar OG meta etiketlerini kullanır ancak cache agresiftir. Cache temizleme stratejisi (URL parametresi ile bypass) planlanmalıdır.</li>
        <li><strong>İletişim formu:</strong> İsim, e-posta, telefon (isteğe bağlı), konu, mesaj alanları. Spam koruması (honeypot + reCAPTCHA v3), otomatik yanıt e-postası, CRM entegrasyonu.</li>
        <li><strong>Canlı destek entegrasyonu:</strong> Tawk.to, Intercom, Crisp veya WhatsApp Business chat widget'ı. Çalışma saatleri dışında otomatik mesaj, bot yanıtları ve insan temsilciye yönlendirme.</li>
        <li><strong>Sosyal paylaşım butonları:</strong> Blog yazıları ve ürün sayfalarında sosyal paylaşım butonları — Facebook, Twitter/X, LinkedIn, WhatsApp, Telegram, link kopyalama. Native share API desteği (mobilde).</li>
        <li><strong>Schema markup (ContactPoint):</strong> Telefon, e-posta, çalışma saatleri ve dil bilgisi içeren ContactPoint yapısal verisi.</li>
        <li><strong>E-posta imza şablonu:</strong> Marka tutarlılığı için standart e-posta imzası — isim, unvan, telefon, web sitesi, sosyal medya linkleri ve logo.</li>
        <li><strong>QR kod entegrasyonu:</strong> İletişim sayfası, kartvizit ve basılı materyaller için web sitesi URL'si ve vCard QR kodları.</li>
      </ul>

      <h2>Teknik Gereksinimler</h2>
      <p><strong>Next.js dinamik OG Image (ImageResponse API):</strong></p>
      <code>
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'VixSEO';

  return new ImageResponse(
    (
      &lt;div style={{
        background: 'linear-gradient(135deg, #0F2447 0%, #1a3a6b 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
      }}&gt;
        &lt;div style={{ color: '#10b981', fontSize: 24, marginBottom: 16 }}&gt;
          VixSEO Blog
        &lt;/div&gt;
        &lt;div style={{ color: 'white', fontSize: 48, fontWeight: 700, lineHeight: 1.2 }}&gt;
          {title}
        &lt;/div&gt;
      &lt;/div&gt;
    ),
    { width: 1200, height: 630 }
  );
}
      </code>
      <p><strong>Sosyal meta etiketleri (tam set):</strong></p>
      <code>
&lt;!-- Open Graph --&gt;
&lt;meta property="og:type" content="article" /&gt;
&lt;meta property="og:title" content="Sayfa Başlığı" /&gt;
&lt;meta property="og:description" content="Sayfa açıklaması..." /&gt;
&lt;meta property="og:image" content="https://example.com/api/og?title=..." /&gt;
&lt;meta property="og:image:width" content="1200" /&gt;
&lt;meta property="og:image:height" content="630" /&gt;
&lt;meta property="og:url" content="https://example.com/sayfa" /&gt;
&lt;meta property="og:locale" content="tr_TR" /&gt;

&lt;!-- Twitter Card --&gt;
&lt;meta name="twitter:card" content="summary_large_image" /&gt;
&lt;meta name="twitter:site" content="@vixseo" /&gt;
&lt;meta name="twitter:title" content="Sayfa Başlığı" /&gt;
&lt;meta name="twitter:description" content="Sayfa açıklaması..." /&gt;
&lt;meta name="twitter:image" content="https://example.com/api/og?title=..." /&gt;
      </code>
      <p><strong>İletişim formu spam koruması (honeypot + reCAPTCHA):</strong></p>
      <code>
// Honeypot alanı (botlar doldurur, insanlar görmez)
&lt;div style="position: absolute; left: -9999px;"&gt;
  &lt;input type="text" name="website" tabIndex={-1} autoComplete="off" /&gt;
&lt;/div&gt;

// Server-side kontrol
if (formData.website) {
  // Bot tespit edildi — sessizce başarı döndür
  return NextResponse.json({ success: true });
}

// reCAPTCHA v3 doğrulama
const recaptchaResponse = await fetch(
  \`https://www.google.com/recaptcha/api/siteverify?secret=\${RECAPTCHA_SECRET}&amp;response=\${token}\`
);
const { success, score } = await recaptchaResponse.json();
if (!success || score &lt; 0.5) {
  return NextResponse.json({ error: 'Doğrulama başarısız' }, { status: 400 });
}
      </code>

      <h2>Sık Yapılan Hatalar</h2>
      <ol>
        <li><strong>OG image oluşturmamak:</strong> Görselsiz paylaşım, sosyal medyada görünmezlik demektir. Her sayfa için en az varsayılan bir OG image olmalıdır.</li>
        <li><strong>Platform cache'ini hesaplamamak:</strong> Facebook, LinkedIn ve WhatsApp OG meta verilerini cache'ler. İçerik güncellendiğinde cache temizlenmezse eski bilgiler görünmeye devam eder.</li>
        <li><strong>İletişim formuna spam koruması eklememek:</strong> Korumasız form, günde yüzlerce spam mesajla dolar. Honeypot + reCAPTCHA kombinasyonu en etkili çözümdür.</li>
        <li><strong>Canlı destek widget'ını her sayfada göstermek:</strong> Blog okuyucusuna agresif chat popup'ı kötü UX'tir. Hizmet ve fiyat sayfalarında aktif, blog'da pasif (sadece ikon) olarak konfigüre edin.</li>
        <li><strong>Sosyal paylaşım butonlarını sayfanın altına gizlemek:</strong> Kullanıcılar paylaşım butonlarını göremezse kullanmaz. Sabit (sticky) sidebar veya yazı başlığının altına yerleştirin.</li>
      </ol>

      <h2>Profesyonel İpuçları</h2>
      <ul>
        <li>OG image'ları A/B test edin — farklı başlık stili, renk ve görsel kullanarak hangi varyasyonun daha yüksek CTR getirdiğini ölçün.</li>
        <li>Facebook Sharing Debugger, Twitter Card Validator ve LinkedIn Post Inspector araçlarını düzenli kullanın — her platform güncellemesinden sonra önizlemelerin hala doğru çalıştığını doğrulayın.</li>
        <li>İletişim formundan gelen mesajları otomatik olarak CRM'e (HubSpot, Salesforce) aktarın — lead kayıplarını önleyin ve takip sürecini otomatikleştirin.</li>
        <li>WhatsApp Business API entegrasyonu ile destek taleplerini otomatik kategorize edin ve ekibe atayın — yanıt süresini %60 azaltabilirsiniz.</li>
        <li>Native Web Share API'yi mobil kullanıcılar için etkinleştirin — kullanıcılar cihazlarının kendi paylaşım menüsünü kullanabilir, bu da daha doğal bir deneyim sunar.</li>
      </ul>

      <div style="margin-top:2rem;padding:1.5rem;border-radius:12px;background:linear-gradient(135deg,#0F2447 0%,#1a3a6b 100%);border:1px solid rgba(16,185,129,0.3);">
        <h3 style="color:#10b981;margin-bottom:0.5rem;">Bu İşleri Profesyonel Ekibimize Bırakın</h3>
        <p style="color:#cbd5e1;">Web sitenizin sosyal medya ve iletişim kanalları optimizasyonunu uzman ekibimizle hızlı ve hatasız tamamlayın. VixSEO olarak her adımı sizin için planlıyoruz.</p>
        <p style="margin-top:1rem;"><a href="/iletisim" style="display:inline-block;padding:0.75rem 1.5rem;background:#10b981;color:white;border-radius:8px;text-decoration:none;font-weight:600;">Ücretsiz Danışmanlık Alın →</a></p>
      </div>
    `
  }
]
