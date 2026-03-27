// Service data for VixSEO 12-Phase Web Site Optimization Program

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ServiceProcess = {
  step: number
  title: string
  description: string
}

type ServiceMetric = {
  label: string
  value: string
  description: string
}

type ServiceItem = {
  id: string
  slug: string
  phaseNumber: number
  title: string
  shortTitle: string
  shortDescription: string
  longDescription: string
  icon: string
  features: string[]
  deliverables: string[]
  process: ServiceProcess[]
  metrics: ServiceMetric[]
  relatedServices: string[]
}

type ServiceFaq = {
  question: string
  answer: string
}

type ServiceStat = {
  label: string
  value: string
  suffix?: string
}

// ---------------------------------------------------------------------------
// 12-Phase Service Definitions
// ---------------------------------------------------------------------------

export const SERVICES: ServiceItem[] = [
  // Phase 1 — Temel Kimlik
  {
    id: 'service-01',
    slug: 'temel-kimlik',
    phaseNumber: 1,
    title: 'Temel Kimlik — Site Türü, Hedef Kitle ve Marka Rehberi',
    shortTitle: 'Temel Kimlik',
    shortDescription:
      'Markanızın dijital kimliğini oluşturun. Hedef kitlenizi tanıyın, tutarlı bir marka dili geliştirin ve rakiplerinizden ayrışın.',
    longDescription:
      'Web sitenizin başarısı, teknik altyapıdan önce kim olduğunuzu ve kime hitap ettiğinizi bilmesine bağlıdır. Site türü belirlenmeden yapılan tasarım, kodlama ve SEO çalışmaları temelsiz bir bina gibidir. Bu fazda markanızın temel kimliğini oluşturuyoruz: site türü analizi, hedef kitle persona çalışması, marka stil rehberi, ton of voice belirleme ve çok dilli strateji planlaması. Doğru persona tanımı yapan markalar dönüşüm oranını %73\'e kadar artırabiliyor.',
    icon: 'fingerprint',
    features: [
      'Site türü analizi ve bilgi mimarisi planlaması',
      'Minimum 3 detaylı persona oluşturma',
      'Marka stil rehberi (logo, renk paleti, tipografi)',
      'Ton of voice ve iletişim dili belirleme',
      'Çok dilli strateji ve yerelleştirme planı',
      'Rekabet analizi (en az 5 rakip)',
      'İçerik stratejisi temeli ve yayın takvimi',
    ],
    deliverables: [
      'Marka Kimlik Dokümanı',
      'Hedef Kitle ve Persona Raporu',
      'Dil Stratejisi Planı',
      'Rekabet Analizi Raporu',
      'Design Tokens Dosyası (JSON)',
    ],
    process: [
      { step: 1, title: 'Keşif', description: 'Mevcut durumunuzu, hedeflerinizi ve sektörünüzü analiz ediyoruz.' },
      { step: 2, title: 'Analiz', description: 'Rakip analizi, hedef kitle araştırması ve pazar konumlandırması yapıyoruz.' },
      { step: 3, title: 'Strateji', description: 'Marka kimliği, ton of voice ve içerik stratejisini şekillendiriyoruz.' },
      { step: 4, title: 'Dokümantasyon', description: 'Tüm bulguları detaylı raporlar ve rehberlerle teslim ediyoruz.' },
    ],
    metrics: [
      { label: 'Marka Tutarlılığı', value: '%100', description: 'Tüm kanallarda tutarlı marka deneyimi sağlanır.' },
      { label: 'İçerik Üretim Hızı', value: '3x', description: 'Net marka rehberi sayesinde içerik üretimi 3 kat hızlanır.' },
      { label: 'Dönüşüm Artışı', value: '%73\'e kadar', description: 'Doğru persona tanımı ile dönüşüm oranında belirgin artış.' },
    ],
    relatedServices: ['yasal-uyumluluk', 'tema-gorsel', 'seo'],
  },

  // Phase 2 — Yasal Uyumluluk
  {
    id: 'service-02',
    slug: 'yasal-uyumluluk',
    phaseNumber: 2,
    title: 'Yasal Uyumluluk — GDPR, KVKK, CCPA ve Consent Mode v2',
    shortTitle: 'Yasal Uyumluluk',
    shortDescription:
      'Sitenizi yasal risklere karşı koruyun. GDPR, KVKK ve CCPA uyumu ile ceza riskini sıfırlayın, kullanıcı güvenini artırın.',
    longDescription:
      'Dijital gizlilik düzenlemeleri artık bir tercih değil, zorunluluktur. GDPR kapsamında veri ihlali yapan şirketlere yıllık cirosunun %4\'üne kadar ceza kesilebilir. Google, Consent Mode v2 kullanımını zorunlu hale getirdi; bu modu uygulamayan siteler reklam dönüşüm verilerini kaybeder. Bu fazda cookie consent yönetimi, yasal sayfa şablonları ve Google Consent Mode v2 implementasyonunu eksiksiz kuruyoruz.',
    icon: 'shield-check',
    features: [
      'GDPR/KVKK/CCPA tam uyumluluk denetimi',
      'Cookie envanteri çıkarma ve kategorilendirme',
      'Cookie consent banner implementasyonu',
      'Google Consent Mode v2 yapılandırması',
      'Yasal sayfa şablonları (gizlilik, çerez, kullanım koşulları)',
      'Consent log kayıt sistemi',
      'IAB TCF 2.2 framework desteği',
    ],
    deliverables: [
      'Cookie Politikası Dokümanı',
      'KVKK Aydınlatma Metni',
      'Consent Banner Implementasyonu',
      'Yasal Sayfalar (5 adet)',
      'Consent Mode v2 GTM Yapılandırması',
    ],
    process: [
      { step: 1, title: 'Denetim', description: 'Mevcut çerez kullanımı ve yasal durum analiz edilir.' },
      { step: 2, title: 'Planlama', description: 'Gerekli yasal metinler ve teknik çözümler planlanır.' },
      { step: 3, title: 'Uygulama', description: 'Cookie banner, consent mode ve yasal sayfalar kurulur.' },
      { step: 4, title: 'Doğrulama', description: 'Tüm uyumluluk gereksinimleri test edilir ve onaylanır.' },
    ],
    metrics: [
      { label: 'Yasal Uyum', value: '%100', description: 'GDPR, KVKK ve CCPA gereksinimlerinin tamamı karşılanır.' },
      { label: 'Ceza Riski', value: '0', description: 'Yasal yaptırım ve ceza riski tamamen ortadan kalkar.' },
      { label: 'Consent Oranı', value: '%85+', description: 'Optimize edilmiş banner ile yüksek kullanıcı onay oranı.' },
    ],
    relatedServices: ['temel-kimlik', 'sem', 'guvenlik'],
  },

  // Phase 3 — Erişilebilirlik
  {
    id: 'service-03',
    slug: 'erisilebilirlik',
    phaseNumber: 3,
    title: 'Erişilebilirlik — WCAG Standartları ve a11y Optimizasyonu',
    shortTitle: 'Erişilebilirlik',
    shortDescription:
      'Web sitenizi herkes için erişilebilir hale getirin. WCAG 2.1 AA uyumu ile potansiyel müşteri kitlenizi %15 genişletin.',
    longDescription:
      'Dünya nüfusunun yaklaşık %16\'sı bir engelle yaşamaktadır. Erişilebilir olmayan web siteleri bu devasa kullanıcı kitlesini dışlar. ABD\'de erişilebilirlik davaları yılda 4.000\'i aşmıştır. Bu fazda semantik HTML, ARIA rolleri, klavye navigasyonu, renk kontrastı ve screen reader uyumluluğunu sağlıyoruz. Erişilebilir siteler aynı zamanda SEO açısından da daha iyi performans gösterir.',
    icon: 'accessibility',
    features: [
      'WCAG 2.1 AA seviyesi tam uyumluluk',
      'ARIA rolleri ve etiketleri optimizasyonu',
      'Klavye navigasyonu ve focus yönetimi',
      'Screen reader uyumluluk testleri',
      'Renk kontrastı analizi ve düzeltmesi',
      'Semantik HTML yapılandırması',
      'prefers-reduced-motion desteği',
    ],
    deliverables: [
      'a11y Audit Raporu',
      'Erişilebilirlik Düzeltme Planı',
      'WCAG Uyumluluk Test Raporu',
      'Screen Reader Test Sonuçları',
      'Erişilebilirlik Rehberi',
    ],
    process: [
      { step: 1, title: 'Audit', description: 'Otomatik ve manuel erişilebilirlik denetimi yapılır.' },
      { step: 2, title: 'Önceliklendirme', description: 'Bulunan sorunlar etkiye göre sıralanır.' },
      { step: 3, title: 'Düzeltme', description: 'WCAG AA gereksinimleri tek tek uygulanır.' },
      { step: 4, title: 'Test', description: 'Screen reader ve klavye ile gerçek cihaz testleri yapılır.' },
    ],
    metrics: [
      { label: 'WCAG AA Uyum', value: '%100', description: 'Tüm WCAG 2.1 AA kriterlerini karşılayan site.' },
      { label: 'Erişim Genişlemesi', value: '%15', description: 'Engelli kullanıcılara açılarak potansiyel kitle büyür.' },
      { label: 'Dava Riski', value: '0', description: 'Erişilebilirlik davası riski ortadan kalkar.' },
    ],
    relatedServices: ['ux-temelleri', 'tema-gorsel', 'yasal-uyumluluk'],
  },

  // Phase 4 — Tema & Görsel
  {
    id: 'service-04',
    slug: 'tema-gorsel',
    phaseNumber: 4,
    title: 'Tema & Görsel Sistem — Design Tokens, Renk Paleti ve Tipografi',
    shortTitle: 'Tema & Görsel',
    shortDescription:
      'Profesyonel bir görsel sistem kurun. Design tokens, tutarlı renk paleti ve tipografi ile geliştirme sürenizi %60 kısaltın.',
    longDescription:
      'Tutarlı bir görsel sistem, kullanıcı deneyiminin temelidir. Design tokens ile renk, tipografi, boşluk ve gölge değerlerini merkezi olarak yönetirsiniz. Light/dark/system tema desteği, CSS variables ile dinamik tema değişimi ve responsive tipografi sistemi kuruyoruz. Sonuç: daha hızlı geliştirme, daha tutarlı tasarım ve daha profesyonel marka algısı.',
    icon: 'palette',
    features: [
      'Design tokens sistemi (renk, tipografi, boşluk)',
      'CSS custom properties ile dinamik tema',
      'Light / Dark / System tema desteği',
      'Renk paleti oluşturma ve kontrast doğrulama',
      'Tipografi skalası ve font optimizasyonu',
      'Responsive tasarım grid sistemi',
      'Komponent bazlı stil rehberi',
    ],
    deliverables: [
      'Design System Dokümanı',
      'CSS Token Dosyası (variables)',
      'Tema Değiştirme Komponenti',
      'Tipografi ve Renk Rehberi',
      'Responsive Grid Şablonları',
    ],
    process: [
      { step: 1, title: 'Analiz', description: 'Mevcut görsel yapı ve marka kimliği incelenir.' },
      { step: 2, title: 'Tasarım', description: 'Token sistemi, renk paleti ve tipografi skalası oluşturulur.' },
      { step: 3, title: 'Uygulama', description: 'CSS variables, tema desteği ve komponentler geliştirilir.' },
      { step: 4, title: 'Entegrasyon', description: 'Tüm sayfalara tema sistemi entegre edilir ve test edilir.' },
    ],
    metrics: [
      { label: 'Geliştirme Hızı', value: '%60', description: 'Token sistemi sayesinde UI geliştirme %60 hızlanır.' },
      { label: 'Tasarım Tutarlılığı', value: '%100', description: 'Tüm sayfalarda birebir tutarlı görsel deneyim.' },
      { label: 'Tema Değişim Süresi', value: '<1sn', description: 'Anında tema geçişi, sayfa yenilemesi gerektirmez.' },
    ],
    relatedServices: ['temel-kimlik', 'erisilebilirlik', 'ux-temelleri'],
  },

  // Phase 5 — SEO
  {
    id: 'service-05',
    slug: 'seo',
    phaseNumber: 5,
    title: 'SEO — Teknik SEO, Meta Etiketler ve Core Web Vitals',
    shortTitle: 'SEO',
    shortDescription:
      'Arama motorlarında üst sıralara çıkın. Teknik SEO, meta etiketler, JSON-LD ve Core Web Vitals optimizasyonu ile organik trafiğinizi %40 artırın.',
    longDescription:
      'Organik arama trafiği, sürdürülebilir büyümenin anahtarıdır. Bu fazda sitenizin arama motorları tarafından en iyi şekilde anlaşılmasını sağlıyoruz: meta tag optimizasyonu, JSON-LD yapılandırılmış veri, XML sitemap, canonical URL yönetimi, hreflang çok dilli etiketler ve Core Web Vitals iyileştirmeleri. Google\'ın algoritması her yıl binlerce kez güncellenir; biz sitenizi geleceğe hazır hale getiriyoruz.',
    icon: 'search',
    features: [
      'Kapsamlı teknik SEO denetimi',
      'Meta tag optimizasyonu (title, description, OG)',
      'JSON-LD yapılandırılmış veri (Schema.org)',
      'XML Sitemap oluşturma ve optimizasyonu',
      'Canonical URL ve duplicate content yönetimi',
      'Core Web Vitals (LCP, FID, CLS) optimizasyonu',
      'Hreflang çok dilli etiketleme',
    ],
    deliverables: [
      'SEO Audit Raporu (100+ kontrol noktası)',
      'Meta Tag Şablonları',
      'Schema Markup Implementasyonu',
      'XML Sitemap Yapılandırması',
      'Core Web Vitals Optimizasyon Raporu',
    ],
    process: [
      { step: 1, title: 'Denetim', description: 'Sitenin mevcut SEO durumu 100+ kontrol noktasında analiz edilir.' },
      { step: 2, title: 'Strateji', description: 'Anahtar kelime araştırması ve optimizasyon planı oluşturulur.' },
      { step: 3, title: 'Uygulama', description: 'Meta taglar, schema markup ve teknik düzeltmeler yapılır.' },
      { step: 4, title: 'İzleme', description: 'Sıralama ve trafik değişimleri düzenli olarak raporlanır.' },
    ],
    metrics: [
      { label: 'Organik Trafik Artışı', value: '%40', description: 'Ortalama 3-6 ay içinde organik trafikte %40 artış.' },
      { label: 'Arama Sıralaması', value: 'Top 10', description: 'Hedef anahtar kelimelerde ilk sayfa sıralaması.' },
      { label: 'Teknik SEO Skoru', value: '95+', description: 'Lighthouse ve Search Console\'da 95+ teknik skor.' },
    ],
    relatedServices: ['geo', 'aio-llmo', 'analitik-performans'],
  },

  // Phase 6 — SEM
  {
    id: 'service-06',
    slug: 'sem',
    phaseNumber: 6,
    title: 'SEM — GTM, GA4, Conversion Tracking ve Reklam Pikselleri',
    shortTitle: 'SEM',
    shortDescription:
      'Reklam yatırımınızın karşılığını alın. GTM, GA4, conversion tracking ve heatmap ile dönüşüm oranınızı %25 artırın.',
    longDescription:
      'Dijital reklamcılıkta ölçemediğiniz şeyi optimize edemezsiniz. Bu fazda Google Tag Manager kurulumu, GA4 yapılandırması, Google Ads ve Meta Pixel entegrasyonu, UTM stratejisi ve heatmap analizi kuruyoruz. Doğru dönüşüm takibi ile reklam harcamalarınızı optimize eder, dönüşüm oranınızı artırır ve gereksiz maliyetleri kesersiniz.',
    icon: 'target',
    features: [
      'Google Tag Manager (GTM) kurulumu ve yapılandırması',
      'GA4 gelişmiş olay takibi',
      'Google Ads conversion pixel entegrasyonu',
      'Meta (Facebook) Pixel kurulumu',
      'UTM parametreleri stratejisi ve şablonları',
      'Heatmap ve session recording entegrasyonu',
      'Cross-domain tracking yapılandırması',
    ],
    deliverables: [
      'GTM Container Yapılandırması',
      'Conversion Tracking Kurulumu',
      'UTM Stratejisi Dokümanı',
      'Heatmap Analiz Raporu',
      'Reklam Pikseli Test Raporu',
    ],
    process: [
      { step: 1, title: 'Planlama', description: 'Dönüşüm hedefleri ve izleme gereksinimleri belirlenir.' },
      { step: 2, title: 'Kurulum', description: 'GTM, GA4, reklam pikselleri ve heatmap araçları entegre edilir.' },
      { step: 3, title: 'Test', description: 'Tüm eventler ve dönüşümler doğruluk testi ile onaylanır.' },
      { step: 4, title: 'Optimizasyon', description: 'İlk veriler analiz edilerek ince ayarlar yapılır.' },
    ],
    metrics: [
      { label: 'Dönüşüm Artışı', value: '%25', description: 'Doğru takip ile dönüşüm oranında %25 iyileşme.' },
      { label: 'Reklam Maliyeti Düşüşü', value: '%30', description: 'Optimize targeting ile reklam maliyetinde %30 düşüş.' },
      { label: 'Veri Doğruluğu', value: '%99', description: 'Conversion ve event verilerinde %99 doğruluk oranı.' },
    ],
    relatedServices: ['seo', 'yasal-uyumluluk', 'analitik-performans'],
  },

  // Phase 7 — GEO
  {
    id: 'service-07',
    slug: 'geo',
    phaseNumber: 7,
    title: 'GEO — Generative Engine Optimization ve AI Arama Görünürlüğü',
    shortTitle: 'GEO',
    shortDescription:
      'AI arama motorlarında görünür olun. llms.txt, AI-friendly içerik ve FAQ/HowTo schema ile yeni bir trafik kanalı açın.',
    longDescription:
      'ChatGPT, Google SGE, Perplexity ve Bing Copilot gibi yapay zeka arama motorları hızla yaygınlaşıyor. Geleneksel SEO\'nun ötesinde, bu AI motorlarının içeriğinizi doğru anlaması ve referans göstermesi kritik. Bu fazda llms.txt dosyası, AI-friendly içerik yapısı, FAQ ve HowTo schema markup implementasyonu ile sitenizi AI arama çağına hazırlıyoruz.',
    icon: 'globe',
    features: [
      'llms.txt dosyası oluşturma ve optimizasyonu',
      'AI-friendly içerik yapılandırması',
      'FAQ Schema markup implementasyonu',
      'HowTo Schema markup implementasyonu',
      'AI arama motoru görünürlük analizi',
      'Yapılandırılmış veri zenginleştirme',
      'Knowledge panel optimizasyonu',
    ],
    deliverables: [
      'llms.txt Dosyası',
      'AI-Optimized İçerik Şablonu',
      'FAQ/HowTo Schema Markup Seti',
      'AI Görünürlük Raporu',
      'İçerik Optimizasyon Rehberi',
    ],
    process: [
      { step: 1, title: 'Analiz', description: 'Mevcut AI arama görünürlüğünüz ve rakipleriniz analiz edilir.' },
      { step: 2, title: 'Strateji', description: 'AI motorlarına özel içerik ve teknik strateji oluşturulur.' },
      { step: 3, title: 'Uygulama', description: 'llms.txt, schema markup ve içerik optimizasyonları yapılır.' },
      { step: 4, title: 'İzleme', description: 'AI aramalardaki görünürlük düzenli olarak takip edilir.' },
    ],
    metrics: [
      { label: 'AI Görünürlüğü', value: 'Aktif', description: 'Başlıca AI arama motorlarında markanız referans gösterilir.' },
      { label: 'Yeni Trafik Kanalı', value: '%20', description: 'AI aramalarından gelen yeni bir trafik kanalı açılır.' },
      { label: 'Featured Snippet', value: '5x', description: 'Schema markup ile zengin sonuç görünürlüğü 5 kat artar.' },
    ],
    relatedServices: ['seo', 'aio-llmo', 'analitik-performans'],
  },

  // Phase 8 — AIO/LLMO
  {
    id: 'service-08',
    slug: 'aio-llmo',
    phaseNumber: 8,
    title: 'AIO/LLMO — AI Bot Yönetimi, Entity Markup ve Knowledge Graph',
    shortTitle: 'AIO/LLMO',
    shortDescription:
      'AI motorlarında referans olun. Bot yönetimi, entity markup ve knowledge graph stratejisi ile marka otoritenizi güçlendirin.',
    longDescription:
      'Yapay zeka motorları sitenizi taramaya başladı: GPTBot, ClaudeBot, Google-Extended gibi botlar içeriğinizi eğitim verisi olarak kullanıyor. Bu fazda hangi AI botlarına izin verip hangilerini engelleyeceğinizi yönetiyoruz. Entity markup ile markanızın, ürünlerinizin ve hizmetlerinizin yapay zeka motorları tarafından doğru tanınmasını sağlıyoruz. Knowledge graph stratejisi ile sektörünüzde otorite konumuna yükselmenizi hedefliyoruz.',
    icon: 'bot',
    features: [
      'AI bot yönetimi (GPTBot, ClaudeBot, Google-Extended)',
      'robots.txt AI özel kuralları',
      'Entity markup ve Organization schema',
      'Knowledge graph strateji planı',
      'Marka otoritesi güçlendirme',
      'AI eğitim verisi kontrolü',
      'Yapılandırılmış veri zenginleştirme',
    ],
    deliverables: [
      'robots.txt AI Bot Kuralları',
      'Entity Schema Implementasyonu',
      'Knowledge Graph Strateji Dokümanı',
      'AI Bot İzleme Raporu',
      'Marka Otorite Planı',
    ],
    process: [
      { step: 1, title: 'Keşif', description: 'Mevcut bot trafiği ve AI indeksleme durumu analiz edilir.' },
      { step: 2, title: 'Strateji', description: 'Bot izin/engel politikası ve entity stratejisi oluşturulur.' },
      { step: 3, title: 'Uygulama', description: 'robots.txt kuralları, entity markup ve schema eklenir.' },
      { step: 4, title: 'İzleme', description: 'AI motorlarındaki referanslar ve bot trafiği takip edilir.' },
    ],
    metrics: [
      { label: 'AI Referans', value: 'Aktif', description: 'AI motorlarında markanız kaynak olarak gösterilir.' },
      { label: 'Marka Otoritesi', value: '2x', description: 'Knowledge graph sayesinde otorite algısı 2 kat güçlenir.' },
      { label: 'Bot Kontrolü', value: '%100', description: 'AI botları üzerinde tam kontrol sağlanır.' },
    ],
    relatedServices: ['geo', 'seo', 'guvenlik'],
  },

  // Phase 9 — Analitik & Performans
  {
    id: 'service-09',
    slug: 'analitik-performans',
    phaseNumber: 9,
    title: 'Analitik & Performans — GA4 Dashboard, CWV ve Sayfa Hızı',
    shortTitle: 'Analitik & Performans',
    shortDescription:
      'Sitenizin performansını zirveye taşıyın. GA4 özel dashboard, Core Web Vitals optimizasyonu ve %50 sayfa hızı artışı.',
    longDescription:
      'Hız, kullanıcı deneyiminin ve SEO\'nun en kritik bileşenidir. Google araştırmasına göre sayfa yükleme süresi 1 saniyeden 3 saniyeye çıktığında bounce rate %32 artar. Bu fazda GA4 özel event takibi, Core Web Vitals (LCP, CLS, INP) optimizasyonu, görsel/font/JavaScript optimizasyonu ve kapsamlı performans iyileştirmesi yapıyoruz. Sonuç: daha hızlı site, daha yüksek sıralama, daha fazla dönüşüm.',
    icon: 'gauge',
    features: [
      'GA4 custom event yapılandırması',
      'Core Web Vitals (LCP, CLS, INP) optimizasyonu',
      'Görsel optimizasyonu (WebP/AVIF, lazy loading)',
      'Font optimizasyonu (subset, preload, swap)',
      'JavaScript bundle analizi ve code splitting',
      'CDN ve caching stratejisi',
      'Performans bütçesi tanımlama',
    ],
    deliverables: [
      'GA4 Özel Dashboard',
      'Performans Audit Raporu',
      'Core Web Vitals Optimizasyon Planı',
      'Bundle Analiz Raporu',
      'Performans Bütçesi Dokümanı',
    ],
    process: [
      { step: 1, title: 'Ölçüm', description: 'Mevcut performans metrikleri detaylı olarak ölçülür.' },
      { step: 2, title: 'Analiz', description: 'Darboğazlar tespit edilir ve önceliklendirilir.' },
      { step: 3, title: 'Optimizasyon', description: 'Görsel, font, JS ve sunucu optimizasyonları uygulanır.' },
      { step: 4, title: 'İzleme', description: 'GA4 dashboard ile performans sürekli izlenir.' },
    ],
    metrics: [
      { label: 'LCP', value: '<2.5sn', description: 'Largest Contentful Paint 2.5 saniyenin altına düşer.' },
      { label: 'CLS', value: '<0.1', description: 'Cumulative Layout Shift 0.1 altına optimize edilir.' },
      { label: 'Sayfa Hızı Artışı', value: '%50', description: 'Genel sayfa yükleme hızında %50 iyileşme sağlanır.' },
    ],
    relatedServices: ['seo', 'sem', 'ux-temelleri'],
  },

  // Phase 10 — Güvenlik
  {
    id: 'service-10',
    slug: 'guvenlik',
    phaseNumber: 10,
    title: 'Güvenlik — CSP, HSTS, Security Headers ve Sızma Testi',
    shortTitle: 'Güvenlik',
    shortDescription:
      'Sitenizi siber tehditlere karşı zırhlayın. Security headers, XSS/CSRF koruması ve sızma testi ile A+ güvenlik notu alın.',
    longDescription:
      'Siber saldırılar her yıl %38 artıyor ve küçük-orta işletmelerin %43\'ü hedef oluyor. Güvenlik açıkları müşteri güvenini yok eder ve yasal sorumluluk doğurur. Bu fazda CSP (Content Security Policy), HSTS, X-Frame-Options gibi güvenlik başlıklarını yapılandırıyor, rate limiting, XSS ve CSRF korumalarını aktifleştiriyoruz. Sızma testi ile sitenizin güvenliğini bağımsız olarak doğruluyoruz.',
    icon: 'lock',
    features: [
      'Content Security Policy (CSP) yapılandırması',
      'HSTS (HTTP Strict Transport Security)',
      'X-Frame-Options ve X-Content-Type-Options',
      'Rate limiting ve DDoS koruması',
      'XSS ve CSRF koruması',
      'SQL Injection önleme kontrolleri',
      'Güvenlik başlıkları (security headers) optimizasyonu',
    ],
    deliverables: [
      'Security Headers Yapılandırması',
      'Güvenlik Audit Raporu',
      'Sızma Testi (Penetrasyon) Raporu',
      'Güvenlik Politikası Dokümanı',
      'Zafiyet Düzeltme Planı',
    ],
    process: [
      { step: 1, title: 'Tarama', description: 'Otomatik ve manuel güvenlik taraması yapılır.' },
      { step: 2, title: 'Değerlendirme', description: 'Bulunan zafiyetler risk seviyesine göre sınıflandırılır.' },
      { step: 3, title: 'Koruma', description: 'Security headers, rate limiting ve koruma katmanları eklenir.' },
      { step: 4, title: 'Doğrulama', description: 'Sızma testi ile tüm önlemler bağımsız olarak test edilir.' },
    ],
    metrics: [
      { label: 'Güvenlik Notu', value: 'A+', description: 'SecurityHeaders.com ve Mozilla Observatory\'de A+ derece.' },
      { label: 'Güvenlik Açığı', value: '0', description: 'Bilinen tüm güvenlik açıkları kapatılır.' },
      { label: 'Saldırı Direnci', value: '%99.9', description: 'Yaygın saldırı türlerine karşı %99.9 koruma.' },
    ],
    relatedServices: ['yasal-uyumluluk', 'aio-llmo', 'analitik-performans'],
  },

  // Phase 11 — UX Temelleri
  {
    id: 'service-11',
    slug: 'ux-temelleri',
    phaseNumber: 11,
    title: 'UX Temelleri — Hata Sayfaları, Loading States ve Form Validasyon',
    shortTitle: 'UX Temelleri',
    shortDescription:
      'Kullanıcı deneyimini mükemmelleştirin. Hata sayfaları, loading states, breadcrumb ve form validasyon ile bounce rate\'i %35 düşürün.',
    longDescription:
      'İyi bir kullanıcı deneyimi, her detayda kendini gösterir. Profesyonel 404 ve 500 hata sayfaları, anlamlı loading skeleton\'lar, breadcrumb navigasyonu, akıllı form validasyonu ve tutarlı responsive tasarım — tüm bu "küçük" detaylar toplandığında devasa bir etki yaratır. Bu fazda kullanıcılarınızın sitenizde geçirdiği süreyi artırır, hayal kırıklığını azaltır ve dönüşüm oranını yükseltiriz.',
    icon: 'layout',
    features: [
      'Profesyonel 404 ve 500 hata sayfaları',
      'Loading states ve skeleton bileşenleri',
      'Breadcrumb navigasyonu',
      'Akıllı form validasyonu (real-time)',
      'Responsive tasarım optimizasyonu',
      'Micro-interaction ve geri bildirim',
      'Tutarlı boşluk ve hiyerarşi sistemi',
    ],
    deliverables: [
      'UX Audit Raporu',
      'Profesyonel Hata Sayfaları',
      'Form Validasyon Şablonları',
      'Responsive Test Raporu',
      'UX İyileştirme Rehberi',
    ],
    process: [
      { step: 1, title: 'UX Audit', description: 'Kullanıcı yolculuğu ve mevcut UX sorunları analiz edilir.' },
      { step: 2, title: 'Tasarım', description: 'Hata sayfaları, loading states ve form şablonları tasarlanır.' },
      { step: 3, title: 'Geliştirme', description: 'Tüm UX iyileştirmeleri geliştirilir ve entegre edilir.' },
      { step: 4, title: 'Kullanıcı Testi', description: 'Gerçek kullanıcılarla test edilerek ince ayar yapılır.' },
    ],
    metrics: [
      { label: 'Bounce Rate Düşüşü', value: '%35', description: 'Kullanıcı deneyimi iyileştirmesi ile bounce rate %35 azalır.' },
      { label: 'Session Süresi Artışı', value: '%20', description: 'Kullanıcılar sitede %20 daha uzun vakit geçirir.' },
      { label: 'Form Tamamlama', value: '%90+', description: 'Akıllı validasyon ile form tamamlama oranı %90 üzerine çıkar.' },
    ],
    relatedServices: ['tema-gorsel', 'erisilebilirlik', 'analitik-performans'],
  },

  // Phase 12 — Sosyal & İletişim
  {
    id: 'service-12',
    slug: 'sosyal-iletisim',
    phaseNumber: 12,
    title: 'Sosyal & İletişim — OG Image, Social Cards, Paylaşım ve Canlı Destek',
    shortTitle: 'Sosyal & İletişim',
    shortDescription:
      'Sosyal medya varlığınızı güçlendirin. OG image, social cards, paylaşım butonları ve canlı destek ile etkileşimi %45 artırın.',
    longDescription:
      'Sosyal medya paylaşımları, en güçlü organik büyüme kanallarından biridir. Profesyonel OG image\'ler paylaşım tıklama oranını dramatik şekilde artırır. Bu fazda dinamik OG image generator, platform bazlı social card optimizasyonu, akıllı paylaşım butonları, profesyonel iletişim formu ve canlı destek widget\'ı kuruyoruz. Kullanıcılarınızın sizi kolayca bulması, iletişime geçmesi ve içeriğinizi paylaşması artık çok kolay.',
    icon: 'share-2',
    features: [
      'Dinamik OG image generator',
      'Platform bazlı social card optimizasyonu',
      'Akıllı paylaşım butonları (native share API)',
      'Profesyonel iletişim formu (spam korumalı)',
      'Canlı destek (chat) widget entegrasyonu',
      'Social media meta tag optimizasyonu',
      'E-posta bülten abonelik sistemi',
    ],
    deliverables: [
      'OG Image Şablon Sistemi',
      'Social Media Kit',
      'İletişim Formu Komponenti',
      'Canlı Destek Widget Entegrasyonu',
      'Paylaşım Butonları Seti',
    ],
    process: [
      { step: 1, title: 'Strateji', description: 'Sosyal medya hedefleri ve iletişim gereksinimleri belirlenir.' },
      { step: 2, title: 'Tasarım', description: 'OG image şablonları ve social card tasarımları oluşturulur.' },
      { step: 3, title: 'Geliştirme', description: 'Paylaşım butonları, formlar ve chat widget geliştirilir.' },
      { step: 4, title: 'Test', description: 'Tüm platformlarda paylaşım önizlemeleri test edilir.' },
    ],
    metrics: [
      { label: 'Sosyal Paylaşım Artışı', value: '%45', description: 'OG image ve paylaşım butonları ile paylaşımlar %45 artar.' },
      { label: 'İletişim Artışı', value: '%30', description: 'Profesyonel form ve chat ile iletişim başvuruları %30 artar.' },
      { label: 'Tıklama Oranı', value: '2x', description: 'Optimized social cards ile paylaşım tıklama oranı 2 katına çıkar.' },
    ],
    relatedServices: ['seo', 'sem', 'ux-temelleri'],
  },
]

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const SERVICES_FAQ: ServiceFaq[] = [
  {
    question: 'Optimizasyon programı ne kadar sürer?',
    answer:
      'Projenizin kapsamına bağlı olarak ortalama 4-8 hafta sürer. Tek fazlı projeler 1 haftada tamamlanabilirken, 12 fazlı tam program genellikle 8-12 haftada teslim edilir.',
  },
  {
    question: 'Tek bir faz satın alabilir miyim?',
    answer:
      'Evet, her faz bağımsız olarak satın alınabilir. İhtiyacınıza göre tek bir faz veya birden fazla fazı birlikte seçebilirsiniz. Paket alımlarda özel indirimler uygulanır.',
  },
  {
    question: 'Mevcut sitemde değişiklik yapılır mı?',
    answer:
      'Evet, mevcut sitenizin yapısı korunarak optimizasyonlar uygulanır. Hiçbir işlevsellik kaybı yaşanmaz; aksine mevcut yapı güçlendirilir ve iyileştirilir.',
  },
  {
    question: 'Hangi platformları destekliyorsunuz?',
    answer:
      'Wix, WordPress, Next.js, Shopify, custom kodlanmış siteler ve daha fazlası. Platform fark etmeksizin web standartlarına uygun her siteye hizmet veriyoruz.',
  },
  {
    question: 'Garanti var mı?',
    answer:
      '30 gün memnuniyet garantisi sunuyoruz. Belirlenen hedeflere ulaşılamazsa, ek ücret almadan düzeltme çalışması yapıyoruz.',
  },
  {
    question: 'Raporlama nasıl yapılıyor?',
    answer:
      'Haftalık ilerleme raporu, faz sonu detaylı analiz raporu ve canlı dashboard erişimi sunuyoruz. Tüm metrikler şeffaf ve ölçülebilir şekilde raporlanır.',
  },
  {
    question: 'Destek süresi nedir?',
    answer:
      'Her faz tamamlandıktan sonra 3 ay ücretsiz teknik destek sağlıyoruz. Bu sürede sorularınızı yanıtlar, küçük düzeltmeleri ücretsiz yaparız.',
  },
  {
    question: 'Ödeme nasıl yapılıyor?',
    answer:
      'Faz bazlı veya paket ödemeler kabul ediyoruz. Kredi kartı, banka havalesi ve taksitli ödeme seçenekleri mevcuttur. Büyük projeler için özel ödeme planı oluşturulabilir.',
  },
  {
    question: 'Ekibiniz kimlerden oluşuyor?',
    answer:
      'SEO uzmanları, full-stack geliştiriciler, UI/UX tasarımcıları ve dijital pazarlama stratejistlerinden oluşan multidisipliner bir ekibiz. Her faz kendi alanında uzman kişiler tarafından yürütülür.',
  },
  {
    question: 'Başlamak için ne gerekiyor?',
    answer:
      'Sadece ücretsiz bir danışmanlık görüşmesi yeterli. Sitenizi analiz eder, ihtiyaçlarınızı belirler ve size özel bir optimizasyon planı sunarız. Herhangi bir taahhüt gerektirmez.',
  },
]

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export const SERVICES_STATS: ServiceStat[] = [
  { label: 'Tamamlanan Proje', value: '150', suffix: '+' },
  { label: 'Müşteri Memnuniyeti', value: '98', suffix: '%' },
  { label: 'Ortalama Trafik Artışı', value: '40', suffix: '%' },
  { label: 'Ortalama Hız İyileşmesi', value: '55', suffix: '%' },
]

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((service) => service.slug === slug)
}

export function getAllServices(): ServiceItem[] {
  return SERVICES
}

export function getRelatedServices(slug: string): ServiceItem[] {
  const service = getServiceBySlug(slug)
  if (!service) return []
  return service.relatedServices
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((s): s is ServiceItem => s !== undefined)
}
