// Tool data for VixSEO free SEO tools

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ToolStatus = 'active' | 'coming-soon'

type ToolItem = {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  icon: string
  status: ToolStatus
  href: string
}

type ToolFaq = {
  question: string
  answer: string
}

// ---------------------------------------------------------------------------
// Tool Definitions
// ---------------------------------------------------------------------------

export const TOOLS: ToolItem[] = [
  {
    slug: 'kelime-sayaci',
    title: 'Kelime Sayacı',
    shortDescription:
      'Metninizi yapıştırın, kelime, karakter, cümle ve paragraf sayısını anında öğrenin.',
    longDescription:
      'Kelime Sayacı aracımız ile blog yazılarınızın, meta açıklamalarınızın ve sosyal medya paylaşımlarınızın uzunluğunu kolayca kontrol edin. Karakter, kelime, cümle ve paragraf sayısını gerçek zamanlı olarak görüntüleyin. SEO uyumlu içerik üretimi için ideal uzunluk önerilerini de aracın içinde bulabilirsiniz.',
    icon: 'type',
    status: 'active',
    href: '/araclar/kelime-sayaci',
  },
  {
    slug: 'seo-analiz',
    title: 'SEO Analiz',
    shortDescription:
      'Web sitenizin SEO performansını analiz edin, eksikleri tespit edin.',
    longDescription:
      'SEO Analiz aracımız web sitenizin teknik SEO durumunu, sayfa hızını, meta etiketlerini ve mobil uyumluluğunu detaylı şekilde inceler. Tespit edilen sorunlar ve iyileştirme önerileri ile sitenizin arama motorlarındaki görünürlüğünü artırın. Raporu anında görüntüleyin, dışa aktarın veya ekibinizle paylaşın.',
    icon: 'scan-search',
    status: 'active',
    href: '/araclar/seo-analiz',
  },
  {
    slug: 'sira-bulucu',
    title: 'Sıra Bulucu',
    shortDescription:
      'Sayfanızın anahtar kelime optimizasyonunu analiz edin. Title, H1, description ve içerik yoğunluğunu kontrol edin.',
    longDescription:
      'Sıra Bulucu aracı ile hedeflediğiniz anahtar kelimelerde sayfanızın ne kadar iyi optimize edildiğini öğrenin. Title, H1, meta description, URL yapısı ve anahtar kelime yoğunluğunu analiz ederek iyileştirme önerileri alın.',
    icon: 'trophy',
    status: 'active',
    href: '/araclar/sira-bulucu',
  },
  {
    slug: 'serp-onizleme',
    title: 'SERP Önizleme',
    shortDescription:
      'Google arama sonuçlarında nasıl görüneceğinizi önizleyin. Title ve description\'ınızı optimize edin.',
    longDescription:
      'SERP Önizleme aracı ile sayfanızın Google arama sonuçlarında nasıl görüneceğini gerçek zamanlı olarak önizleyin. Title, meta description ve URL\'nizi optimize ederek tıklama oranınızı artırın. Masaüstü ve mobil görünüm arasında geçiş yaparak her iki platformda da mükemmel sonuç elde edin.',
    icon: 'eye',
    status: 'active',
    href: '/araclar/serp-onizleme',
  },
  {
    slug: 'carbon-eslestiricisi',
    title: 'Carbon Eşleştirici',
    shortDescription:
      'Google\'ın indekslediği sayfalarınızı cache üzerinden kontrol edin ve eşleştirme sorunlarını tespit edin.',
    longDescription:
      'Carbon Eşleştirici aracı ile Google\'ın sayfanızı nasıl indekslediğini ve cache\'lediğini kontrol edin. Canonical URL, indekslenen URL ve mobil URL arasındaki uyumsuzlukları tespit ederek indeksleme sorunlarını önleyin. Google cache üzerinden sayfanızın en son ne zaman tarandığını öğrenin.',
    icon: 'git-compare',
    status: 'active',
    href: '/araclar/carbon-eslestiricisi',
  },
  {
    slug: 'mfi-denetleyici',
    title: 'MFI Denetleyici',
    shortDescription:
      'Mobile-First Indexing uyumluluğunu denetleyin. Mobil ve masaüstü versiyonlarınızı karşılaştırın.',
    longDescription:
      'MFI Denetleyici aracı ile web sitenizin Mobile-First Indexing uyumluluğunu kontrol edin. Mobil ve masaüstü versiyonlarınız arasındaki içerik farklılıklarını tespit edin. Google\'ın mobil öncelikli indeksleme gereksinimlerine uygunluğunuzu değerlendirin ve iyileştirme önerileri alın.',
    icon: 'smartphone',
    status: 'active',
    href: '/araclar/mfi-denetleyici',
  },
  {
    slug: 'seo-sheets',
    title: 'SEO Sheets',
    shortDescription:
      'Google Sheets ile SEO verilerinizi yönetin. Hazır formüller ve şablonlar indirin.',
    longDescription:
      'SEO Sheets aracı ile Google Sheets üzerinde SEO verilerinizi profesyonelce yönetin. Hazır formüller, otomatik raporlama şablonları ve veri görselleştirme araçları ile SEO çalışmalarınızı organize edin. Anahtar kelime takibi, sıralama raporları ve teknik SEO denetimi için özel şablonları ücretsiz indirin.',
    icon: 'table',
    status: 'active',
    href: '/araclar/seo-sheets',
  },
  {
    slug: 'chrome-eklentileri',
    title: 'SEO Chrome Eklentileri',
    shortDescription:
      'SEO çalışmalarınızı hızlandıracak en iyi Chrome uzantılarının küratörlü listesi.',
    longDescription:
      'SEO Chrome Eklentileri sayfasında, SEO profesyonelleri için özenle seçilmiş en iyi Chrome uzantılarını keşfedin. Her eklentinin ne işe yaradığını, artılarını ve eksilerini detaylı şekilde inceleyin. Teknik SEO, içerik analizi, backlink kontrolü ve daha fazlası için doğru araçları bulun.',
    icon: 'puzzle',
    status: 'active',
    href: '/araclar/chrome-eklentileri',
  },
  {
    slug: 'seo-browser',
    title: 'SEO Browser',
    shortDescription:
      'Web sayfalarını arama motoru gözüyle görüntüleyin. Meta taglar, başlıklar, yapısal veri ve HTTP headerları.',
    longDescription:
      'SEO Browser aracı ile web sayfalarını arama motorlarının gördüğü şekilde görüntüleyin. Meta etiketler, başlık hiyerarşisi, yapılandırılmış veri, görseller, bağlantılar ve HTTP headerları gibi teknik detayları tek bir ekrandan inceleyin.',
    icon: 'globe',
    status: 'active',
    href: '/araclar/seo-browser',
  },
]

// ---------------------------------------------------------------------------
// General FAQ
// ---------------------------------------------------------------------------

export const TOOLS_GENERAL_FAQ: ToolFaq[] = [
  {
    question: 'Araçlar ücretsiz mi?',
    answer:
      'Evet, tüm SEO araçlarımız tamamen ücretsizdir. Herhangi bir ödeme bilgisi veya kredi kartı gerektirmeden kullanabilirsiniz.',
  },
  {
    question: 'Araçları kullanmak için hesap açmam gerekiyor mu?',
    answer:
      'Hayır, araçlarımızı kullanmak için hesap oluşturmanıza gerek yoktur. Doğrudan sayfayı ziyaret ederek araçları kullanmaya başlayabilirsiniz.',
  },
  {
    question: 'Verilerim güvende mi?',
    answer:
      'Kesinlikle. Araçlarımıza girdiğiniz veriler sunucularımızda saklanmaz. Tüm işlemler tarayıcınızda gerçekleşir ve oturum kapandığında veriler otomatik olarak silinir.',
  },
  {
    question: 'Araçları mobil cihazdan kullanabilir miyim?',
    answer:
      'Evet, tüm araçlarımız mobil uyumlu olarak tasarlanmıştır. Telefon veya tabletten sorunsuz bir şekilde kullanabilirsiniz.',
  },
  {
    question: 'Sonuçları dışa aktarabilir miyim?',
    answer:
      'Evet, analiz sonuçlarınızı kopyalayabilir veya desteklenen formatlarda dışa aktarabilirsiniz. Her aracın detay sayfasında dışa aktarma seçenekleri mevcuttur.',
  },
  {
    question: 'Yeni araçlar eklenecek mi?',
    answer:
      'Evet, sürekli olarak yeni SEO araçları geliştiriyoruz. "Yakında" etiketi ile işaretlenen araçlar geliştirme aşamasındadır ve en kısa sürede kullanıma sunulacaktır.',
  },
]

// ---------------------------------------------------------------------------
// SERP Preview FAQ
// ---------------------------------------------------------------------------

export const SERP_PREVIEW_FAQ: ToolFaq[] = [
  {
    question: 'SERP önizleme nedir?',
    answer:
      'SERP (Search Engine Results Page) önizleme, web sayfanızın Google arama sonuçlarında nasıl görüneceğini simüle eden bir araçtır. Title, meta description ve URL\'nizin gerçek arama sonuçlarındaki görünümünü önceden kontrol etmenizi sağlar.',
  },
  {
    question: 'Title etiketi kaç karakter olmalı?',
    answer:
      'Google genellikle 50-60 karakter arasındaki title etiketlerini tam olarak gösterir. 60 karakterin üzerindeki başlıklar kesilir ve sonuna "..." eklenir. En iyi sonuç için 50-60 karakter aralığını hedefleyin.',
  },
  {
    question: 'Meta description kaç karakter olmalı?',
    answer:
      'Meta description için ideal uzunluk 150-160 karakter arasıdır. Google bazen 160 karakterden fazlasını gösterebilir ancak çoğu durumda bu sınırda keser. Önemli bilgileri ilk 150 karaktere yerleştirin.',
  },
  {
    question: 'Title etiketinde anahtar kelimeyi nereye koymalıyım?',
    answer:
      'Anahtar kelimenizi title etiketinin başına yerleştirin. Arama motorları ve kullanıcılar başlığın başındaki kelimelere daha fazla önem verir. Marka adını ise genellikle sona "|" veya "—" ayracıyla ekleyebilirsiniz.',
  },
  {
    question: 'URL yapısı SEO\'yu etkiler mi?',
    answer:
      'Evet, URL yapısı SEO\'yu doğrudan etkiler. Kısa, anlaşılır ve anahtar kelime içeren URL\'ler hem arama motorları hem de kullanıcılar tarafından tercih edilir. Tire (-) ile ayırma kullanın, alt çizgi (_) kullanmaktan kaçının.',
  },
  {
    question: 'Masaüstü ve mobil SERP sonuçları farklı mı?',
    answer:
      'Evet, masaüstü ve mobil SERP sonuçları farklı görünür. Mobil cihazlarda ekran daha dar olduğu için title ve description daha kısa kesilir. Aracımızdaki mobil önizleme özelliği ile her iki görünümü de kontrol edebilirsiniz.',
  },
  {
    question: 'Bu araç ücretsiz mi?',
    answer:
      'Evet, SERP Önizleme aracımız tamamen ücretsizdir. Hesap oluşturmanıza gerek yoktur ve tüm işlemler tarayıcınızda gerçekleşir. Verileriniz sunucuya gönderilmez.',
  },
  {
    question: 'SERP önizleme ile tıklama oranımı artırabilir miyim?',
    answer:
      'Kesinlikle. SERP sonuçlarındaki görünümünüzü optimize ederek tıklama oranınızı (CTR) önemli ölçüde artırabilirsiniz. Dikkat çekici bir title, açıklayıcı bir description ve temiz bir URL yapısı kullanıcıların sitenize tıklamasını teşvik eder.',
  },
]

// ---------------------------------------------------------------------------
// Carbon Matcher FAQ
// ---------------------------------------------------------------------------

export const CARBON_MATCHER_FAQ: ToolFaq[] = [
  {
    question: 'Carbon eşleştirme nedir?',
    answer:
      'Carbon eşleştirme, Google\'ın indekslediği (cache\'lediği) sayfa sürümü ile sitenizde yayınlanan güncel sürüm arasındaki tutarlılığı kontrol etme işlemidir. Uyumsuzluklar indeksleme sorunlarına ve sıralama düşüşlerine yol açabilir.',
  },
  {
    question: 'Google cache nedir?',
    answer:
      'Google cache, Google\'ın web sayfanızı en son taradığında kaydettiği kopyasıdır. Bu kopya, Google\'ın sayfanızı nasıl gördüğünü ve indekslediğini anlamak için önemli bir referans noktasıdır.',
  },
  {
    question: 'Canonical URL neden önemli?',
    answer:
      'Canonical URL, bir sayfanın tercih edilen (birincil) URL\'sini belirtir. Aynı içeriğin birden fazla URL\'den erişilebilir olduğu durumlarda, canonical etiketi Google\'a hangi sürümü indekslemesi gerektiğini söyler. Yanlış canonical ayarı indeksleme sorunlarına neden olabilir.',
  },
  {
    question: 'Mobile URL ve desktop URL neden farklı olabilir?',
    answer:
      'Bazı siteler mobil ve masaüstü kullanıcılarına farklı URL\'ler sunar (örn. m.ornek.com vs www.ornek.com). Bu durumda her iki sürümün tutarlı olması ve doğru alternate/canonical etiketlerinin kullanılması gerekir.',
  },
  {
    question: 'Cache uyumsuzluğu sıralamayı etkiler mi?',
    answer:
      'Evet, Google\'ın cache\'lediği sürüm ile güncel sayfa arasındaki büyük farklılıklar sıralamayı olumsuz etkileyebilir. Özellikle içerik değişiklikleri, yönlendirmeler veya canonical sorunları indeksleme problemlerine yol açabilir.',
  },
  {
    question: 'Sayfam Google cache\'de görünmüyorsa ne yapmalıyım?',
    answer:
      'Sayfanızın Google cache\'de görünmemesi, henüz indekslenmediği veya noindex etiketi taşıdığı anlamına gelebilir. Google Search Console üzerinden indeksleme durumunu kontrol edin ve gerekirse yeniden taranmasını talep edin.',
  },
  {
    question: 'Bu araç ücretsiz mi?',
    answer:
      'Evet, Carbon Eşleştirici aracımız tamamen ücretsizdir. Herhangi bir hesap oluşturmanıza gerek yoktur. URL\'nizi girerek hemen kontrol etmeye başlayabilirsiniz.',
  },
  {
    question: 'Carbon eşleştirme kontrolünü ne sıklıkla yapmalıyım?',
    answer:
      'Önemli içerik değişiklikleri, site migrasyonu veya teknik güncellemeler sonrasında mutlaka kontrol yapmanız önerilir. Düzenli olarak ayda bir kez kontrol etmek, olası indeksleme sorunlarını erken tespit etmenize yardımcı olur.',
  },
]

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function getAllTools(): ToolItem[] {
  return TOOLS
}

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find((tool) => tool.slug === slug)
}
