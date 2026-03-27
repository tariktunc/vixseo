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

type ServiceFaqItem = {
  question: string
  answer: string
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
  faq: ServiceFaqItem[]
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
  // =========================================================================
  // Phase 1 — Temel Kimlik
  // =========================================================================
  {
    id: 'service-01',
    slug: 'temel-kimlik',
    phaseNumber: 1,
    title: 'Temel Kimlik — Site Turu, Hedef Kitle ve Marka Rehberi',
    shortTitle: 'Temel Kimlik',
    shortDescription:
      'Markanizin dijital kimligini olusturun. Hedef kitlenizi taniyin, tutarli bir marka dili gelistirin ve rakiplerinizden ayrisin.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>Temel Kimlik calismasi, web sitenizin stratejik temelini olusturan kapsamli bir analiz ve planlama surecidir. Bir bina nasil saglamtemeller uzerine yukselmek zorundaysa, dijital varliginiz da net bir kimlik uzerine insa edilmelidir. Bu fazda sitenizin turunu (e-ticaret, blog, SaaS, kurumsal, portfoy) belirliyor, hedef kitlenizi derinlemesine analiz ediyor ve markanizin dijital dili, gorunumu ve iletisim stratejisini sekillendiriyoruz.</p>
<p>Bir e-ticaret sitesi ile bir B2B SaaS platformunun bilgi mimarisi, navigasyon yapisi, CTA stratejisi ve icerik tonu birbirinden tamamen farklidir. Yanlis site turu varsayimiyla yapilan tasarim ve SEO calismalari, temelsiz bir bina gibi er ya da gec coker. Arastirmalar, hedef kitlesini dogru tanimlayan markalarin donusum oranini %73'e kadar artirabildigini gosteriyor.</p>
<p>Bu hizmet kapsaminda persona canvas'lar olusturuyor, marka ses tonunuzu belirliyoruz, rakip analizleriyle farklilasma noktalarinizi ortaya cikariyor ve cok dilli strateji planliyoruz. Tum bunlari, ekibinizin gunluk islerinde referans alabilecegi somut dokumanlara donusturuyoruz.</p>

<h2>Neden Temel Kimlik Calismasi Kritik?</h2>
<p>Google'in E-E-A-T (Deneyim, Uzmanlik, Otorite, Guvenilirlik) sinyalleri, arama siralamasinda giderek daha fazla agirlik kazaniyor. Net bir marka kimligine sahip olmayan siteler, bu sinyalleri uretmekte zorlanir. Bununla birlikte:</p>
<ul>
<li>Tutarli marka deneyimi sunan sirketler, gelirlerini ortalama %23 artiriyor (Lucidpress arastirmasi)</li>
<li>Tuketicilerin %81'i satin alma oncesinde markaya guven duymasi gerektigini belirtiyor</li>
<li>Kisisellestirilmis icerik sunan markalar, genel icerik sunanlara gore 5-8 kat daha fazla ROI elde ediyor</li>
<li>Yanlis hedef kitleye yonelik reklam harcamalari, butcenin ortalama %40'inin israf edilmesine neden oluyor</li>
</ul>
<p>Kimlik calismasi yapilmadan baslanan projeler, genellikle 3-6 ay sonra "sifirdan baslama" noktasina geri doner. Bu da hem zaman hem maliyet kaybi demektir.</p>

<h2>Detayli Calisma Kapsami</h2>

<h3>Site Turu Analizi ve Bilgi Mimarisi</h3>
<p>Her site turu kendine ozgu bir bilgi mimarisi gerektirir. E-ticaret siteleri urun kategorileri, filtreler ve sepet akislarina ihtiyac duyarken, SaaS platformlari ozellik sayfalari, fiyatlandirma tablolari ve onboarding akislarina odaklanir. Siteninizin amacina en uygun yapiyi belirler, sayfa hiyerarsisini planlar ve kullanici yolculugu haritasini cikariz.</p>

<h3>Persona Olusturma ve Hedef Kitle Analizi</h3>
<p>En az 3 detayli persona olusturuyoruz. Her persona icin demografik bilgiler, davranis kaliplari, aci noktalari (pain points), motivasyonlar, tercih ettigi iletisim kanallari ve karar verme sureci belirlenir. Persona canvas yontemiyle her bir ideal musterinizin profilini cikariyoruz. Bu personalar, icerik stratejisinden reklam hedeflemesine kadar tum kararlarin temelini olusturur.</p>

<h3>Marka Stil Rehberi (Brand Guide)</h3>
<p>Logo kullanim kurallari, renk paleti (primer, sekonder, aksesibiilte uyumlu), tipografi skalasi (heading, body, caption), ikonografi stili, fotograf/gorsel tonu ve bosluk sistemi gibi tum gorsel elemanlari iceren kapsamli bir stil rehberi hazirliyoruz. Bu rehber, tasarimcilarinizin ve gelistiricilerinizin tutarli bir cikti uretmesini saglar.</p>

<h3>Ton of Voice ve Iletisim Dili</h3>
<p>Markaniz nasil konusuyor? Resmi mi, samimi mi? Teknik mi, sade mi? Mizahi mi, ciddi mi? Iletisim dilinizi belirliyor, ornek cumle kaliplari olusturuyor ve "yapilacaklar/yapilmayacaklar" listesi hazirliyoruz. Bu rehber, blog yazarinizdan sosyal medya yoneticinize kadar herkesin ayni dili konusmasini saglar.</p>

<h3>Rekabet Analizi</h3>
<p>En az 5 dogrudan rakibinizi analiz ediyoruz: site yapisi, icerik stratejisi, SEO performansi, sosyal medya varligi, marka konumlandirmasi ve farklilasma stratejileri. SWOT analizi ile guclui ve zayif yonlerinizi belirliyor, farklilasma firsatlarini ortaya cikariyoruz.</p>

<h3>Cok Dilli Strateji</h3>
<p>Uluslararasi hedef kitleniz varsa, dil bazli icerik stratejisi, hreflang planlamasi, kulturel adaptasyon ve yerellestirilme (localization) yol haritasi olusturuyoruz. Hangi pazarlara oncelik verilecegi, cevirilerin nasil yonetilecegi ve URL yapisinin nasil kurulacagi gibi kritik kararlari bu asamada aliyoruz.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>Herkese hitap etmeye calismak:</strong> "Hedef kitlemiz herkes" diyen markalar, aslinda kimseye hitap edemez. Spesifik personalar belirlemek, mesajinizi keskinlestirir ve donusum oranini arttirir.</li>
<li><strong>Rakip taklidi:</strong> Rakibinizin site yapisini kopyalamak, sizin ozgun degerinizi gomler. Rakip analizi, farklilasmak icin yapilir, taklit icin degil.</li>
<li><strong>Marka rehberi olmadan tasarim:</strong> Her tasarimcinin farkli renk ve font kullanmasi, marka algisini zedeler. Tutarlilik icin dokumante edilmis bir rehber sart.</li>
<li><strong>Iletisim dilini dokumante etmemek:</strong> Bir blog yazisi samimi, bir urun sayfasi askeri bir dilde yazildiginda kullanici kafasi karisti. Ton of voice rehberi bu sorunu ortadan kaldirir.</li>
<li><strong>Kulturel farklari gormezden gelmek:</strong> Cok dilli sitelerde kelime kelime ceviri yapmak yerine, her pazar icin kulturel adaptasyon yapmak gerekir.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<p>Temel kimlik calismasi tamamlandiginda asagidaki somut iyilesmeler gozlemlenir:</p>
<ul>
<li>Tum kanallarda (web, sosyal medya, e-posta) %100 marka tutarliligi</li>
<li>Icerik uretim hizinda 3 kata kadar artis (cunku yazi tonu ve konu secimi nettir)</li>
<li>Reklam harcamalarinda %20-40 tasarruf (dogru hedef kitle, daha az israf)</li>
<li>Donusum oraninda %30-73 iyilesme (kisisellestirilmis mesajlar)</li>
<li>Marka bilinirliginde olculebilir artis (tutarli gorsel kimlik sayesinde)</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>Persona olusturma, rekabet analizi ve marka stratejisi, uzmanlk gerektiren disiplinlerdir. Kendi basiniza yaptiginizda genellikle varsayimlara dayanirsiniz; profesyonel bir ekip ise veri odakli yaklasimla calisir. Yanlis persona tanimi, aylar suren icerik ve reklam calismalarinin bosa gitmesine neden olabilir. Bir marka rehberi olmadan baslayan projeler, ilerleyen asamalarda tutarsizlik sorunlariyla karsilasir ve geri donup duzeltmek, ilk seferde dogru yapmaktan cok daha maliyetlidir. Biz bu calismayi onlarca proje deneyimiyle, kanitlanmis frameworkler kullanarak yapiyor ve size somut, uygulanabilir ciktilar sunuyoruz.</p>
</article>`,
    icon: 'fingerprint',
    features: [
      'Site turu analizi ve bilgi mimarisi planlamasi',
      'Minimum 3 detayli persona olusturma (persona canvas)',
      'Marka stil rehberi (logo, renk paleti, tipografi, ikonografi)',
      'Ton of voice ve iletisim dili belirleme',
      'Cok dilli strateji ve yerellestirme plani',
      'Rekabet analizi (en az 5 rakip, SWOT dahil)',
      'Icerik stratejisi temeli ve yayin takvimi',
      'Kullanici yolculugu haritasi (user journey map)',
      'Marka farklilastirma stratejisi',
      'Design tokens baslangic seti (JSON)',
    ],
    deliverables: [
      'Marka Kimlik Dokumani (Brand Book)',
      'Hedef Kitle ve Persona Raporu (3+ persona)',
      'Ton of Voice Rehberi',
      'Dil Stratejisi Plani',
      'Rekabet Analizi Raporu (SWOT dahil)',
      'Design Tokens Dosyasi (JSON)',
      'Kullanici Yolculugu Haritasi',
      'Icerik Stratejisi Taslagi',
      'Site Turu ve Bilgi Mimarisi Dokumani',
      'Farklilasma Stratejisi Ozeti',
    ],
    process: [
      { step: 1, title: 'Kesif Gorusmesi', description: 'Isletmenizi, hedeflerinizi, mevcut marka algisini ve sektorunuzu derinlemesine anliyoruz. Stakeholder mulakatlari yapiyoruz.' },
      { step: 2, title: 'Pazar ve Rakip Analizi', description: 'En az 5 rakibin site yapisi, icerik stratejisi ve marka konumlandirmasini analiz ediyor, SWOT cikariyoruz.' },
      { step: 3, title: 'Persona ve Hedef Kitle', description: 'Veri odakli persona canvas\'lar olusturuyor, kullanici yolculugu haritalarini ciziyoruz.' },
      { step: 4, title: 'Marka Stratejisi', description: 'Marka kimligi, ton of voice, gorsel standartlar ve farklilasma stratejisini sekillendiriyoruz.' },
      { step: 5, title: 'Dokumantasyon', description: 'Tum bulgulari detayli raporlar, rehberler ve uygulanabilir dokumanlara donusturuyoruz.' },
      { step: 6, title: 'Sunum ve Devir', description: 'Sonuclari ekibinize sunuyor, sorulari yanitliyor ve uygulama rehberligi sagliyoruz.' },
    ],
    metrics: [
      { label: 'Marka Tutarliligi', value: '%100', description: 'Tum kanallarda tutarli marka deneyimi sagllanir.' },
      { label: 'Icerik Uretim Hizi', value: '3x', description: 'Net marka rehberi sayesinde icerik uretimi 3 kat hizlanir.' },
      { label: 'Donusum Artisi', value: '%73\'e kadar', description: 'Dogru persona tanimi ile donusum oraninda belirgin artis.' },
      { label: 'Reklam Tasarrufu', value: '%20-40', description: 'Dogru hedefleme ile reklam butcesinde tasarruf.' },
      { label: 'Marka Bilinirlik Artisi', value: '%35', description: 'Tutarli kimlik ile marka hatilanma oraninda artis.' },
    ],
    relatedServices: ['yasal-uyumluluk', 'tema-gorsel', 'seo'],
    faq: [
      { question: 'Marka kimlik calismasi ne kadar surer?', answer: 'Kapsamli bir marka kimlik calismasi ortalama 2-3 hafta surer. Bu sure icerisinde kesif gorusmesi, rakip analizi, persona olusturma, stil rehberi hazirlama ve dokumantasyon asamalari yer alir.' },
      { question: 'Persona nedir ve neden onemlidir?', answer: 'Persona, ideal musterinizin yari-kurgusal bir temsilidir. Demografik bilgiler, davranis kaliplari, aci noktalari ve motivasyonlari icerir. Dogru persona tanimi, icerik stratejisinden reklam hedeflemesine kadar tum pazarlama kararlarinin temelini olusturur.' },
      { question: 'Mevcut marka kimligim varsa sifirdan mi baslanir?', answer: 'Hayir. Mevcut marka varliklarinizi analiz eder, guclui yonleri korur ve eksik alanlari tamamlariz. Amacimiz mevcut kimligi yikmak degil, guclendirmek ve tutarli hale getirmektir.' },
      { question: 'Kucuk isletmeler icin de gerekli mi?', answer: 'Ozellikle kucuk isletmeler icin kritiktir. Sinirli butceyle calisirken her bir liralik yatirimin dogru kitleye ulasmasini saglamak, buyuk isletmelere gore cok daha onemlidir.' },
      { question: 'Ton of voice rehberi ne ise yarar?', answer: 'Ton of voice rehberi, markanizin her kanalda nasil konusacagini tanimlar. Blog yazarinizdan mussteri hizmetleri temsilcinize kadar herkes ayni dili kullanir. Bu tutarlilik, marka guvenilirligini arttirir.' },
      { question: 'Rekabet analizi hangi metrikleri kapsar?', answer: 'Site yapisi, icerik stratejisi, SEO performansi (anahtar kelime siralamalari, domain otoritesi), sosyal medya varligi, kullanici deneyimi ve marka konumlandirmasi gibi metrikleri kapsar. SWOT analizi ile ozetlenir.' },
      { question: 'Cok dilli strateji neden ayri planlanir?', answer: 'Her pazarin kulturel dinamikleri, arama davranislari ve rekabet yapisi farklidir. Kelime kelime ceviri yerine kulturel adaptasyon gerekir. URL yapisi, hreflang etiketleri ve icerik onceliklendirmesi de teknik planlama gerektirir.' },
      { question: 'Bu calismanin ciktilari hangi formatta teslim edilir?', answer: 'Marka rehberi PDF ve interaktif web formati, design tokens JSON dosyasi, persona kartlari gorsel format, rakip analizi tablo ve grafik formatinda teslim edilir. Tum dosyalar ekibinizin kolayca kullanabilecegi formatlarda hazirlanir.' },
      { question: 'Marka kimlik calismasi olmadan SEO yapilabilir mi?', answer: 'Teknik olarak evet, ancak etkili olmaz. SEO icerik stratejisi, hedef kitle tanimi ve marka sesi olmadan yapilan calisma, tutarsiz ve donusum orani dusuk sonuclar uretir. Temel kimlik, diger tum fazlarin verimliligini arttirir.' },
      { question: 'Design tokens nedir?', answer: 'Design tokens, renk, tipografi, bosluk ve golge gibi tasarim degerlerini merkezi bir JSON dosyasinda tutan bir sistemdir. Gelistiriciler ve tasarimcilar bu tokenlari kullanarak tutarli bir gorsel deneyim uretir. Faz 4 (Tema & Gorsel) ile tam entegrasyon saglanir.' },
    ],
  },

  // =========================================================================
  // Phase 2 — Yasal Uyumluluk
  // =========================================================================
  {
    id: 'service-02',
    slug: 'yasal-uyumluluk',
    phaseNumber: 2,
    title: 'Yasal Uyumluluk — GDPR, KVKK, CCPA ve Consent Mode v2',
    shortTitle: 'Yasal Uyumluluk',
    shortDescription:
      'Sitenizi yasal risklere karsi koruyun. GDPR, KVKK ve CCPA uyumu ile ceza riskini sifirlayin, kullanici guvenini artirin.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>Yasal uyumluluk hizmeti, web sitenizin GDPR (Avrupa), KVKK (Turkiye), CCPA (Kaliforniya) ve diger veri koruma duzenlemelerine tam uyumunu saglayan kapsamli bir teknik ve hukuki calismadir. Cerez yonetimi, kullanici rizasi, veri isleme politikalari ve Google Consent Mode v2 implementasyonunu icerir.</p>
<p>2024 yilinda GDPR kapsaminda kesilen toplam ceza miktari 4.5 milyar Euro'yu asmistir. Turkiye'de KVKK kapsaminda sirketlere milyonlarca TL ceza kesilmektedir. Bu cezalar sadece buyuk sirketleri degil, kucuk ve orta olcekli isletmeleri de hedef almaktadir. Bir cookie banner'i olmayan veya yanlis yapilandirilmis bir consent mekanizmasi kullanan her site, potansiyel bir ceza riskidir.</p>
<p>Google, Mart 2024'ten itibaren Consent Mode v2 kullanmayan sitelerin reklam donusum verilerini kaybedecegini acikladi. Bu, reklam veren her isletme icin kritik bir degisikliktir. Biz bu gecisin sorunsuz yapilmasini sagliyoruz.</p>

<h2>Neden Yasal Uyumluluk Kritik?</h2>
<p>Dijital gizlilik duzenlemeleri artik bir tercih degil, zorunluluktur. Uyumsuzlugun bedeli agirdir:</p>
<ul>
<li>GDPR cezasi: Yillik cironun %4'une kadar veya 20 milyon Euro (hangisi buyukse)</li>
<li>KVKK cezasi: 2024 yilinda ust sinir 9.4 milyon TL'ye yukseltildi</li>
<li>CCPA cezasi: Ihlal basina 7.500 USD'ye kadar</li>
<li>Google, Consent Mode v2 olmayan sitelerin reklam donusum verisini kisitliyor</li>
<li>Tuketicilerin %79'u verilerini korumayan markalardan alisveris yapmayi birakiyor</li>
</ul>
<p>Yasal uyumluluk sadece ceza riskini ortadan kaldirmaz, ayni zamanda kullanici guvenini arttirir. "Bu site verilerimi koruyor" algisi, donusum oranini dogrudan etkiler.</p>

<h2>Detayli Calisma Kapsami</h2>

<h3>Cookie Envanteri ve Kategorilendirme</h3>
<p>Sitenizdeki tum cerezleri tespit ediyor ve kategorilendiriyoruz: Zorunlu (Strictly Necessary), Analitik (Analytics), Islevsel (Functional) ve Pazarlama (Marketing). Her cerezin amaci, suresi, saglayicisi ve kategorisi dokumante edilir. Bu envanter, cookie banner'indasaki kategori secimlerinin temelini olusturur.</p>

<h3>Cookie Consent Banner Implementasyonu</h3>
<p>Kullanicinin cerez tercihlerini granular olarak yonetmesine olanak taniyan, GDPR/KVKK uyumlu bir consent banner kuruyoruz. Banner ozellikleri: kategori bazli onay/red, kolay degistirilebilir tercihler, "Tumu kabul et" / "Tumu reddet" / "Tercihleri yonet" secenekleri, ilk ziyarette otomatik gosterim, consent log kaydi.</p>

<h3>Google Consent Mode v2 Teknik Kurulumu</h3>
<p>Consent Mode v2, Google Tag Manager (GTM) ile entegre calisir ve kullanicinin cerez tercihine gore Google etiketlerinin davranisini kontrol eder. Iki temel sinyal vardir: <code>ad_storage</code> (reklam cerezleri) ve <code>analytics_storage</code> (analitik cerezleri). Bunlara ek olarak <code>ad_user_data</code> ve <code>ad_personalization</code> sinyalleri de v2 ile zorunlu hale gelmistir. GTM container'inizda bu sinyallerin dogru yapilandirilmasini, varsayilan (default) ve guncellenmis (update) komutlarinin dogru zamanda atesenmesini sagliyoruz.</p>

<h3>Yasal Sayfa Sablonlari</h3>
<p>Hukuki gereksinmilere uygun yasal sayfalar hazirliyoruz: Gizlilik Politikasi, Cerez Politikasi, Kullanim Kosullari, KVKK Aydinlatma Metni ve Kisisel Verilerin Korunmasi Basvuru Formu. Bu sayfalar, isletmenize ozel iceriklerle doldurulur ve duzenli guncelleme takvimi belirlenir.</p>

<h3>IAB TCF 2.2 Framework Destegi</h3>
<p>Programatik reklam kullanan siteler icin IAB Transparency and Consent Framework (TCF) 2.2 uyumunu sagliyoruz. Bu framework, reklam ekosistemdeki tum taraflarin (yayinci, reklam agi, DSP) kullanici rizasini standart bir sekilde paylasmasina olanak tanir.</p>

<h3>Consent Log ve Denetim Izi</h3>
<p>Kullanicilarin verdigi izinlerin tarih, saat ve kapsamiyla birlikte kaydedilmesini sagliyoruz. Bu kayitlar, olasi bir denetim veya yasal surecte "kullanici riza verdi" ispati icin kritiktir. GDPR "hesap verebilirlik" (accountability) ilkesinin temel gereksinimdir.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>Cookie wall kullanmak:</strong> "Cerezleri kabul etmeden siteye giremezsiniz" yaklasimi GDPR'a aykiridir. Kullanicinin secim hakki olmalidir.</li>
<li><strong>On-isaretli (pre-ticked) kutucuklar:</strong> GDPR'a gore onay kutuculari varsayilan olarak isaretli olamaz. Kullanici aktif olarak onay vermeli.</li>
<li><strong>Consent Mode v2 olmadan reklam vermek:</strong> Google, Consent Mode v2 kullanmayan sitelerde donusum modellemeyi devre disi birakir. Bu, reklam optimizasyonunuzu ciddi sekilde zayiflatir.</li>
<li><strong>Yasal sayfalari kopyala-yapistir yapmak:</strong> Baska bir sitenin gizlilik politikasini kopyalamak, isletmenize ozel veri isleme sureclerini yansitmaz ve yasal olarak gecersizdir.</li>
<li><strong>Consent kaydi tutmamak:</strong> Kullanicinin ne zaman, hangi kategorilere riza verdigini kaydetmemek, denetim durumunda ispat yukunu karsilayamazsaniz ciddi sorun yaratir.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<p>Yasal uyumluluk calismasi tamamlandiginda:</p>
<ul>
<li>GDPR, KVKK ve CCPA gereksinimlerinin %100'u karsilanir</li>
<li>Yasal yaptirim ve ceza riski tamamen ortadan kalkar</li>
<li>Optimize edilmis consent banner ile %85+ kullanici onay orani elde edilir</li>
<li>Google Consent Mode v2 sayesinde reklam donusum verileri tam olarak korunur</li>
<li>Kullanici guveni artar, bu da donusum oranina pozitif etki yapar</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>Yasal uyumluluk, hem teknik hem hukuki bilgi gerektiren cok katmanli bir konudur. Cookie banner kurmak kolay gorunur, ancak Consent Mode v2'nin GTM ile dogru entegrasyonu, IAB TCF 2.2 uyumu, consent log altyapisi ve yasal metinlerin dogrulugu uzmanlk gerektirir. Yanlis yapilandirma, hem yasal risk hem de reklam veri kaybi anlamina gelir. Biz bu alanlarda yuzlerce site icin calisma yapmis deneyimli bir ekibiz; sitenizi tek seferde dogru sekilde uyumlu hale getiriyoruz.</p>
</article>`,
    icon: 'shield-check',
    features: [
      'GDPR/KVKK/CCPA tam uyumluluk denetimi',
      'Cookie envanteri cikarma ve kategorilendirme',
      'Cookie consent banner implementasyonu',
      'Google Consent Mode v2 yapilandirmasi',
      'Yasal sayfa sablonlari (gizlilik, cerez, kullanim kosullari)',
      'Consent log kayit sistemi',
      'IAB TCF 2.2 framework destegi',
      'Veri isleme envanter dokumantasyonu',
      'Ucuncu parti cerez analizi ve risk degerlendirmesi',
      'Duzenleme degisiklik takibi ve guncelleme plani',
    ],
    deliverables: [
      'Cookie Envanteri ve Kategori Raporu',
      'Cookie Politikasi Dokumani',
      'KVKK Aydinlatma Metni',
      'Gizlilik Politikasi (GDPR Uyumlu)',
      'Consent Banner Implementasyonu',
      'Yasal Sayfalar (5 adet)',
      'Consent Mode v2 GTM Yapilandirmasi',
      'IAB TCF 2.2 Entegrasyonu',
      'Consent Log Altyapisi',
      'Uyumluluk Kontrol Listesi',
    ],
    process: [
      { step: 1, title: 'Denetim', description: 'Mevcut cerez kullanimi, ucuncu parti entegrasyonlar ve yasal durum analiz edilir. Cookie tarama araclariyla tam envanter cikarilir.' },
      { step: 2, title: 'Hukuki Degerlendirme', description: 'GDPR, KVKK ve CCPA gereksinimleri isletmenize ozel olarak degerlendirirlir ve eksikler belirlenir.' },
      { step: 3, title: 'Teknik Planlama', description: 'Consent banner, Consent Mode v2 ve IAB TCF entegrasyonunun teknik plani hazirlanir.' },
      { step: 4, title: 'Uygulama', description: 'Cookie banner, consent mode, yasal sayfalar ve consent log sistemi kurulur ve yapilandirilir.' },
      { step: 5, title: 'Test ve Dogrulama', description: 'Tum uyumluluk gereksinimleri farkli senaryolarda test edilir, Google Tag Assistant ile dogrulanir.' },
      { step: 6, title: 'Dokumantasyon ve Egitim', description: 'Uyumluluk dokumantasyonu tamamlanir, ekibinize yonetim paneli egitimi verilir.' },
    ],
    metrics: [
      { label: 'Yasal Uyum', value: '%100', description: 'GDPR, KVKK ve CCPA gereksinimlerinin tamami karsilanir.' },
      { label: 'Ceza Riski', value: '0', description: 'Yasal yaptirim ve ceza riski tamamen ortadan kalkar.' },
      { label: 'Consent Orani', value: '%85+', description: 'Optimize edilmis banner ile yuksek kullanici onay orani.' },
      { label: 'Reklam Veri Koruma', value: '%100', description: 'Consent Mode v2 ile donusum verileri tam korunur.' },
      { label: 'Denetim Hazirlik', value: 'Tam', description: 'Consent loglari ve dokumanlarla denetim surecine hazir.' },
    ],
    relatedServices: ['temel-kimlik', 'sem', 'guvenlik'],
    faq: [
      { question: 'GDPR ve KVKK arasindaki fark nedir?', answer: 'GDPR Avrupa Birligi\'nin veri koruma duzenlemesi, KVKK ise Turkiye\'nin benzer yasal cercevesidir. Temel ilkeler benzer olsa da ceza miktarlari, veri sorumlusu kayit gereksinimleri ve basvuru surecleri farklilik gosterir. Her iki duzenelemeye de ayri ayri uyum saglanmalidir.' },
      { question: 'Consent Mode v2 nedir ve neden zorunlu?', answer: 'Consent Mode v2, Google\'in cerez tercihlerine gore etiket davranisini kontrol eden bir mekanizmadir. Mart 2024\'ten itibaren, bu mod olmadan Google Ads donusum modelleme ozelligi calismaz. Yani reklam verimlilginiz ciddi olcude duser.' },
      { question: 'Cookie banner olmadan site yayinda kalabilir mi?', answer: 'Teknik olarak evet, ancak yasal olarak ceza riskiyle karsi karsiya kalirsiniz. AB vatandaslarina hizmet veren her site GDPR\'a, Turkiye\'deki kullanicilar icin KVKK\'ya tabidir.' },
      { question: 'Cookie kategorileri nasil belirlenir?', answer: 'Cerezler dort kategoride siniflandirilir: Zorunlu (site calismasai icin gerekli), Analitik (kullanim verisi toplayan), Islevsel (tercihleri hatirlayan) ve Pazarlama (reklam hedefleme). Her cerez tek tek incelenerek dogru kategoriye atanir.' },
      { question: 'Consent log nedir ve neden gerekli?', answer: 'Consent log, kullanicinin cerez tercihlerini ne zaman ve nasil yaptiginin kaydidir. GDPR\'in "hesap verebilirlik" ilkesi geregi, denetim durumunda riza aldginizi ispatlamaniz gerekir. Bu log olmadan ispat yukunu karsilayamazsiniz.' },
      { question: 'IAB TCF 2.2 her site icin gerekli mi?', answer: 'Programatik reklam (Google AdSense, header bidding vb.) kullanan siteler icin gereklidir. Reklam almayan veya sadece dogrudan reklam anlasmalari olan siteler icin zorunlu degildir, ancak gelecekte reklam planiyorsaniz simdiden kurmaniz onerilir.' },
      { question: 'Yasal sayfalar ne siklikla guncellenmelidir?', answer: 'En az yilda bir kez, ayrica her buyuk yasal degisiklikte ve isletmenizin veri isleme sureclerinde degisiklik oldugunda guncellenmelidir. Biz guncelleme takvimi olusturuyor ve degisiklikleri takip ediyoruz.' },
      { question: 'Mevcut cookie banner\'im varsa sifirdan mi kurulur?', answer: 'Mevcut cozumunuzu analiz eder, eksikleri belirler ve gerekliyse yenisiyle degistiririz. Eger mevcut banner temel gereksinimleri karsiliyorsa, sadece iyilestirme ve Consent Mode v2 entegrasyonu yapilir.' },
    ],
  },

  // =========================================================================
  // Phase 3 — Erisilebilirlik
  // =========================================================================
  {
    id: 'service-03',
    slug: 'erisilebilirlik',
    phaseNumber: 3,
    title: 'Erisilebilirlik — WCAG Standartlari ve a11y Optimizasyonu',
    shortTitle: 'Erisilebilirlik',
    shortDescription:
      'Web sitenizi herkes icin erisilebilir hale getirin. WCAG 2.1 AA uyumu ile potansiyel musteri kitlenizi %15 genisletin.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>Web erisilebilirligi (a11y), sitenizin engelli bireyler dahil tum kullanicilar tarafindan etkin bir sekilde kullanilabilmesini saglayan uygulama ve standartlar butunudur. Bu hizmet kapsaminda WCAG 2.1 AA seviyesine tam uyum sagliyoruz: semantik HTML yapisi, ARIA rolleri ve etiketleri, klavye navigasyonu, renk kontrasti, screen reader uyumu ve hareket hassasiyeti yonetimi.</p>
<p>Dunya nufusunun yaklasik %16'si (1.3 milyar kisi) bir engelle yasamaktadir. Bu kitle, gecici engelleri (kirilan kol), durumsal engelleri (gunes altinda ekran okuma) ve yaslilik kaynakli zorlklari da kapsadiginda cok daha buyur. Erisilebilir olmayan bir site, bu devasa kullanici kitlesini tamamen dislar.</p>
<p>Hukuki acidan, ABD'de ADA (Americans with Disabilities Act) kapsaminda web erisilebilirlik davalari yilda 4.000'i asmistir. Avrupa'da European Accessibility Act 2025'te yururluge girecek ve dijital hizmetlerde erisilebilirlik zorunlu olacaktir. Turkiye'de de 5378 sayili Engelliler Hakkinda Kanun dijital erisilebilirlik gereksinimlerini kapsamaktadir.</p>

<h2>Neden Erisilebilirlik Kritik?</h2>
<p>Erisilebilirlik sadece etik bir sorumluluk degil, ayni zamanda is sonuclarina dogrudan etki eden bir faktordr:</p>
<ul>
<li>Engelli bireylerin kuresel harcama gucu yillik 8 trilyon dolardan fazladir</li>
<li>Erisilebilir siteler arama motorlari tarafindan daha iyi anlasilir, yani SEO performansi artar</li>
<li>Semantik HTML ve ARIA etiketleri, Google'in icerik anlamasini kolaylastirir</li>
<li>ABD'de erisilebilirlik davalari yillik %12 artmaktadir</li>
<li>Erisilebilir tasarim, tum kullanicilarin deneyimini iyilestirir (curb-cut etkisi)</li>
</ul>

<h2>Detayli Calisma Kapsami</h2>

<h3>Semantik HTML Yapilandirmasi</h3>
<p>Dogru HTML elementlerinin dogru yerlerde kullanilmasi, erisilebilirligin temelidir. <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code> gibi landmark elementleri, screen reader kullanicilarinin sayfada hizli gezinmesini saglar. Baslik hiyerarsisi (h1-h6) dogru siralamayla kullanilir. Listeler, tablolar ve formlar semantik olarak yapilandirilir.</p>

<h3>ARIA Rolleri ve Etiketleri</h3>
<p>ARIA (Accessible Rich Internet Applications) rolleri, HTML elementlerine ek anlam katarak yardimci teknolojilerin onlari dogru yorumlamasini saglar. Ornegin: <code>role="navigation"</code> bir gezinme bolgesini tanimlar, <code>aria-label</code> gorsel olmayan bir aciklama ekler, <code>aria-expanded</code> bir akordenonun acik/kapali durumunu bildirir. Ancak ARIA'nin asiri veya yanlis kullanilmasi, erisilebilirligi iyilestirmek yerine bozar. "ARIA'nin ilk kurali: ARIA kullanma" prensibiyle — yani yerel HTML elemanlari yeterliyse ARIA eklenmemelidir.</p>

<h3>Klavye Navigasyonu ve Focus Yonetimi</h3>
<p>Tum interaktif elementler (butonlar, linkler, formlar, modaller) klavyeyle erisilebilir olmalidir. Tab sirasi mantiksal bir akisi takip etmeli, focus gorunur olmali (focus ring), modal acildiginda focus modal icerisinde tutulmali (focus trap) ve kapandiginda tetikleyici elemana geri donmelidir. Skip link ile kullanicilar tekrarlayan navigasyonu atlayarak dogrudan ana icerge gidebilmelidir.</p>

<h3>Renk Kontrasti Analizi</h3>
<p>WCAG 2.1 AA, normal metin icin minimum 4.5:1, buyuk metin icin minimum 3:1 kontrast orani gerektirir. Tum metin-arka plan kombinasyonlarini analiz ediyor, yetersiz kontrast olanlarini tespit ediyor ve AA standardini karsilayan alternatif renkleri oneriyoruz. Ayrica renk korlugu simulasyonu ile icerigini sadece renkle ileten elementleri belirliyoruz.</p>

<h3>Screen Reader Uyumluluk Testleri</h3>
<p>NVDA (Windows), VoiceOver (macOS/iOS) ve TalkBack (Android) gibi populer screen reader'larla siteyi test ediyoruz. Her sayfanin iceriginin dogru sirayla, anlamli bir sekilde okunup okunmadigini, gorsellerin alt metinlerinin yeterli olup olmadigini ve interaktif elemanlarin dogru duyurulup duyurulmadigini dogruluyoruz.</p>

<h3>Hareket Hassasiyeti (prefers-reduced-motion)</h3>
<p>Vestibular bozukluklari olan kullanicilar icin animasyonlar sorun yaratabilir. <code>prefers-reduced-motion</code> medya sorgusunu kullanarak, bu tercihi belirten kullanicilar icin animasyonlari azaltiyor veya devre disi birakiyoruz. Parallax efektleri, otomatik kayan carousel'lar ve agresif gecis animasyonlari kontrol altina alinir.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>Sadece otomatik test araclarina guvenme:</strong> Lighthouse, axe ve WAVE gibi araclar WCAG ihlallerinin sadece %30-40'ini tespit edebilir. Manuel test ve screen reader kontrolu zorunludur.</li>
<li><strong>Gorsellerde alt metin eksikligi:</strong> Her gorsel bir alt metin (alt attribute) icermelidir. Dekoratif gorseller <code>alt=""</code> ile isaretlenmelidir. "image.jpg" gibi dosya adi alt metin degildir.</li>
<li><strong>Focus ring'i kaldirmak:</strong> <code>outline: none</code> CSS kurali, klavye kullanicilarinin nerede olduklarini gormelerini engeller. Goruntusu begenilmiyorsa, markaniza uygun bir custom focus stili tanimlanmalidir.</li>
<li><strong>Rengi tek bilgi tasiyici olarak kullanmak:</strong> "Kirmizi alanlar hatalidi" gibi sadece renge dayali bilgi, renk korleri tarafindan anlasilamaz. Ikon, metin veya desen gibi ek gostergeler kullanilmalidir.</li>
<li><strong>ARIA'yi asiri veya yanlis kullanmak:</strong> Her elemente role ve aria-label eklemek, screen reader deneyimini daha kotu hale getirir. "No ARIA is better than bad ARIA."</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<ul>
<li>WCAG 2.1 AA seviyesine %100 uyum</li>
<li>Engelli kullanicilara acilarak potansiyel kitlede %15 genisleme</li>
<li>Erisilebilirlik dava riski sifira indirilir</li>
<li>SEO performansinda olculebilir iyilesme (semantik HTML + ARIA)</li>
<li>Tum kullanicilar icin daha iyi deneyim (curb-cut etkisi)</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>Erisilebilirlik, WCAG spesifikasyonunun derinlemesine anlasilmasini gerektiren teknik bir alandir. Otomatik araclar soranlarin sadece ucunu gosterir; gercek uyum, manuel test, screen reader deneyimi ve ARIA uzmanligiyla saglanir. Yanlis ARIA kullanimi erisilebilirligi iyilestirmek yerine bozar. Bir profesyonel ekip, hem teknik implementasyonu yapar hem de ekibinizi egiterek surekli uyum saglanmasini garanti eder.</p>
</article>`,
    icon: 'accessibility',
    features: [
      'WCAG 2.1 AA seviyesi tam uyumluluk',
      'ARIA rolleri ve etiketleri optimizasyonu',
      'Klavye navigasyonu ve focus yonetimi',
      'Screen reader uyumluluk testleri (NVDA, VoiceOver)',
      'Renk kontrasti analizi ve duzeltmesi (4.5:1 / 3:1)',
      'Semantik HTML yapilandirmasi',
      'prefers-reduced-motion destegi',
      'Skip link implementasyonu',
      'Form erisilebilirlik optimizasyonu',
      'Gorsel alt metin (alt text) audit ve iyilestirme',
    ],
    deliverables: [
      'a11y Audit Raporu (Otomatik + Manuel)',
      'Erisilebilirlik Duzeltme Plani (Oncelikli)',
      'WCAG Uyumluluk Test Raporu',
      'Screen Reader Test Sonuclari',
      'Erisilebilirlik Rehberi (Gelistirici Icin)',
      'Renk Kontrasti Analiz Raporu',
      'ARIA Kullanim Kilavuzu',
      'Klavye Navigasyon Test Matrisi',
      'Erisilebilirlik Bakim Plani',
      'Egitim Dokumani (Icerik Uretcileri Icin)',
    ],
    process: [
      { step: 1, title: 'Otomatik Audit', description: 'axe, Lighthouse ve WAVE ile tum sayfalarin otomatik taramasi yapilir, temel ihlaller tespit edilir.' },
      { step: 2, title: 'Manuel Audit', description: 'Klavye navigasyonu, screen reader testi ve gorsel inceleme ile otomatik araclarin yakalayamadigi sorunlar belirlenir.' },
      { step: 3, title: 'Onceliklendirme', description: 'Bulunan sorunlar WCAG basari kriteri ve kullanici etkisine gore onceliklendirilir (kritik/yuksek/orta/dusuk).' },
      { step: 4, title: 'Duzeltme', description: 'Semantik HTML, ARIA, focus yonetimi, kontrast ve alt metin duzeltmeleri tek tek uygulanir.' },
      { step: 5, title: 'Dogrulama Testi', description: 'Tum duzeltmeler screen reader ve klavye ile gercek cihazlarda test edilir, regresyon kontrolu yapilir.' },
      { step: 6, title: 'Egitim ve Devir', description: 'Ekibinize erisilebilirlik best practice egitimi verilir, bakim plani olusturulur.' },
    ],
    metrics: [
      { label: 'WCAG AA Uyum', value: '%100', description: 'Tum WCAG 2.1 AA kriterlerini karsilayan site.' },
      { label: 'Erisim Genislemesi', value: '%15', description: 'Engelli kullaniculara acilarak potansiyel kitle buyur.' },
      { label: 'Dava Riski', value: '0', description: 'Erisilebilirlik davasi riski ortadan kalkar.' },
      { label: 'Lighthouse a11y Skoru', value: '95+', description: 'Lighthouse erisilebilirlik skorunda 95 uzerinde deger.' },
      { label: 'SEO Katki', value: '+%10', description: 'Semantik HTML iyilestirmesiyle organik trafikte artis.' },
    ],
    relatedServices: ['ux-temelleri', 'tema-gorsel', 'yasal-uyumluluk'],
    faq: [
      { question: 'WCAG AA ve AAA arasindaki fark nedir?', answer: 'AA seviyesi cogu site icin hedeflenen standarttir ve temel erisilebilirlik gereksinimlerini kapsar. AAA ise en yuksek seviyedir ve ek gereksinimler icerir (ornegin 7:1 kontrast orani). Cogu web sitesi icin AA seviyesi yeterli ve gercekci bir hedeftir.' },
      { question: 'Erisilebilirlik SEO\'yu nasil etkiler?', answer: 'Semantik HTML, dogru baslik hiyerarsisi, alt metinler ve ARIA etiketleri, arama motorlarinin icerigisi daha iyi anlamasini saglar. Google, erisilebilir siteleri olumlu degerlendirmektedir. Ayrica Core Web Vitals skorlari da genellikle iyilesir.' },
      { question: 'Otomatik araclar yeterli mi?', answer: 'Hayir. Lighthouse, axe ve WAVE gibi otomatik araclar WCAG ihlallerinin sadece %30-40\'ini tespit edebilir. Manuel klavye testi, screen reader kontrolu ve gorsel inceleme zorunludur. Otomatik araclar baslangic noktasidir, son nokta degil.' },
      { question: 'Screen reader testi nasil yapilir?', answer: 'NVDA (ucretsiz, Windows), VoiceOver (dahili, macOS/iOS) ve TalkBack (dahili, Android) ile siteyi bastan sona gezerek test ederiz. Her sayfa elementinin dogru sirayla okunup okunmadigi, interaktif elemanlarin dogru duyurlup duyurulmadigi kontrol edilir.' },
      { question: 'Erisilebilirlik mevcut tasarimi bozar mi?', answer: 'Hayir. Profesyonel erisilebilirlik calismasi, mevcut tasarimi koruyarak iyilestirmeler yapar. Renk kontrasti ayarlamalari bile marka paletinize uygun alternatiflerle yapilir. Erisilebilirlik, gorsel tasarimin dusmani degil, tamamlayicisidir.' },
      { question: 'Focus ring nedir ve neden onemlidir?', answer: 'Focus ring, klavyeyle gezinirken hangi elementin aktif oldugunu gosteren gorsel gostergedir. Bunu kaldirmak, klavye kullanicilarinin sayfada kaybolmasina neden olur. Markaniza uygun sekilde stilize edilebilir, ancak kaldirilmamalidir.' },
      { question: 'ARIA ne zaman kullanilmali?', answer: 'ARIA, yerel HTML elementlerinin yetersiz kaldigi durumlarda kullanilir. Ornegin: custom tab, acordeon veya modal bilesenlerinde. Yerel HTML (button, input, select gibi) yeterliyse ARIA eklenmemeli — yanlis ARIA, ARIA\'nin olmamindan daha kotudur.' },
      { question: 'Erisilebilirlik calismasi tek seferlik mi?', answer: 'Ilk kapsamli calisma tek seferliktir, ancak surekli bakim gerektirir. Yeni icerik, yeni ozellik veya tasarim degisiklikleri erisilebilirlik sorunlari yaratabilir. Duzeli audit (3-6 ayda bir) ve gelistirici egitimi ile surekli uyum saglanir.' },
    ],
  },

  // =========================================================================
  // Phase 4 — Tema & Gorsel
  // =========================================================================
  {
    id: 'service-04',
    slug: 'tema-gorsel',
    phaseNumber: 4,
    title: 'Tema & Gorsel Sistem — Design Tokens, Renk Paleti ve Tipografi',
    shortTitle: 'Tema & Gorsel',
    shortDescription:
      'Profesyonel bir gorsel sistem kurun. Design tokens, tutarli renk paleti ve tipografi ile gelistirme surenizi %60 kisaltin.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>Tema & Gorsel Sistem hizmeti, web sitenizin tum gorsel degerlerini (renk, tipografi, bosluk, golge, border-radius, animasyon) merkezi bir sistemle yoneten kapsamli bir tasarim muhendisligi calismaidir. Bu sisteme "Design Tokens" denir ve modern web gelistirmenin temel tasidir.</p>
<p>CSS custom properties (CSS variables) uzerine kurulu bu sistem, tek bir deger degisikligiyle tum sitenin gorunumunu guncellemenizi saglar. Light, dark ve system tema destegi, responsive tipografi skalasi, tutarli bosluk sistemi ve komponent bazli stiller bu calismanin ciktilaridir.</p>
<p>Design token sistemine sahip ekipler, UI gelistirmede ortalama %60 daha hizlidir. Cunku her komponent icin renk, font ve bosluk kararlarini sifirdan almak yerine, onceden tanimlanmis tokenlari kullanirlar. Bu da hem hizi arttirir hem de tasarim tutarliligini garanti eder.</p>

<h2>Neden Gorsel Sistem Kritik?</h2>
<p>Tutarsiz gorsel deneyim, marka algisini zayiflatir ve kullanicilarda guvensizlik yaratir:</p>
<ul>
<li>Tasarim tutarsizligi olan sitelerde bounce rate %40 daha yuksektir</li>
<li>Design system kullanan ekipler, kullanmayanlara gore %47 daha hizli urun cikarir (InVision arastirmasi)</li>
<li>Renk paleti 60-30-10 kuralina uygun sitelerde gorsel hiyerarsi ve okunabilirlik belirgin sekilde artar</li>
<li>Dark mode destegi sunan siteler, kullanici memnuniyetinde %25 artis goruyor</li>
<li>Tutarli tipografi skalasi, icerik okunabilirligini %35 arttirir</li>
</ul>

<h2>Detayli Calisma Kapsami</h2>

<h3>CSS Custom Properties Sistemi</h3>
<p>Tum gorsel degerleri CSS custom properties olarak tanimliyoruz. Ornegin: <code>--color-primary: #10b981</code>, <code>--font-heading: 'Inter', sans-serif</code>, <code>--spacing-4: 1rem</code>. Bu degiskenler <code>:root</code> seviyesinde tanimlanir ve <code>[data-theme="dark"]</code> gibi secicilerle tema bazli override edilir. Sonuc: tek bir yerde degisiklik, tum sitede guncelleme.</p>

<h3>Design Token Yapisi</h3>
<p>Tokenlari uc katmanda organize ediyoruz: (1) Global tokens — en temel degerler (renk skalaari, font aileleri), (2) Alias tokens — anlamsal isimler (color-primary, color-danger, font-heading), (3) Component tokens — bilesene ozel degerler (button-bg, card-border). Bu katmanli yapi, token sisteminin olceklenebilir olmasini saglar.</p>

<h3>Light / Dark / System Tema Gecisi</h3>
<p>Uc tema modunu destekliyoruz: Light (acik), Dark (koyu) ve System (isletim sistemi tercihine uyum). <code>prefers-color-scheme</code> medya sorgusu ile sistem temasini algiliyoruz. Tema tercihi <code>localStorage</code>'da saklanir, sayfa yenilemesinde korunur. Gecis animasyonu yumusak ve performansli sekilde gerceklestirilir — FOUC (Flash of Unstyled Content) onlenir.</p>

<h3>Renk Paleti Olusturma (60-30-10 Kurali)</h3>
<p>Profesyonel renk paleti 60-30-10 kuraliyla olusturulur: %60 dominant renk (arka plan), %30 sekonder renk (kartlar, butonlar), %10 aksan renk (CTA, vurgular). Her renk icin erisilebilirlik kontrastlari dogrulanir. Light ve dark modlar icin ayri paletler olusturulur. Renk skalasi 50-950 arasi tonlarla genis bir yelpaze sunar.</p>

<h3>Tipografi Skalasi</h3>
<p>Modular scale (ornegin 1.25 orani) ile basliktan body'ye, caption'dan label'a tutarli bir tipografi skalasi olusturuyoruz. Font optimizasyonu icin subset, preload ve <code>font-display: swap</code> uyguluyoruz. Responsive tipografi icin <code>clamp()</code> fonksiyonu ile viewportla orantili boyutlandirma sagliyoruz.</p>

<h3>Spacing ve Layout Sistemi</h3>
<p>4px veya 8px tabana dayali tutarli bir bosluk sistemi (spacing scale) olusturuyoruz. Grid sistemi 12-kolon yapida, responsive breakpointler mobile-first yaklasimla (sm, md, lg, xl, 2xl) tanimliyoruz. Kartlar, formlar ve listeler icin tekrar kullanilabilir layout paternleri olusturuyoruz.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>Hard-coded renk degerleri:</strong> <code>color: #10b981</code> yerine <code>color: var(--color-primary)</code> kullanilmalidir. Aksi halde tema degisikligi imkansizlasir.</li>
<li><strong>Tailwind @apply suistimali:</strong> Tailwind CSS 4'te <code>@apply</code> kullanimi onerilmez. CSS variable syntax tercih edilmelidir.</li>
<li><strong>Dark mode'da kontrast goz ardi:</strong> Light modda calisan renk kombinasyonlari dark modda yetersiz kontrast oranina dusebilir. Her iki mod icin ayri kontrast testleri yapilmalidir.</li>
<li><strong>Font dosyalarini optimize etmemek:</strong> 500KB'lik bir font dosyasi, sayfa yukleme hizini ciddi sekilde etkiler. Subset, WOFF2 format ve preload ile optimize edilmelidir.</li>
<li><strong>Z-index kaosu:</strong> Plansiz z-index degerleri (z-index: 9999!) overlay catismarina neden olur. Token sisteminde z-index skalasi tanimlanmalidir.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<ul>
<li>UI gelistirme hizinda %60 artis</li>
<li>Tum sayfalarda birebir tutarli gorsel deneyim</li>
<li>Aninda tema gecisi (sayfa yenilemesi gerektirmez)</li>
<li>Font optimizasyonu ile sayfa yukleme hizinda iyilesme</li>
<li>Gelistirici deneyiminde (DX) belirgin iyilesme</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>Design token sistemi kurmak, hem tasarim hem gelistirme uzmanligi gerektiren disiplinler arasi bir calismadir. Yanlis yapilandirilmis token sistemi, zaman icerisinde bakimi imkansiz bir karmasikliga donuser. Profesyonel bir ekip, olceklenebilir, performansli ve bakimi kolay bir sistem kurar; ekibinizi egitir ve surekli tutarlilik saglanmasini garanti eder.</p>
</article>`,
    icon: 'palette',
    features: [
      'Design tokens sistemi (renk, tipografi, bosluk, golge)',
      'CSS custom properties ile dinamik tema',
      'Light / Dark / System tema destegi',
      'Renk paleti olusturma ve kontrast dogrulama',
      'Tipografi skalasi ve font optimizasyonu',
      'Responsive tasarim grid sistemi',
      'Komponent bazli stil rehberi',
      'Spacing ve layout token skalasi',
      'Z-index ve elevation token sistemi',
      'Animasyon ve gecis token tanimlari',
    ],
    deliverables: [
      'Design System Dokumani',
      'CSS Token Dosyasi (variables)',
      'Tema Degistirme Komponenti',
      'Tipografi ve Renk Rehberi',
      'Responsive Grid Sablonlari',
      'Light/Dark Mod Token Setleri',
      'Komponent Stil Referans Sayfasi',
      'Font Optimizasyon Raporu',
      'Spacing Scale Dokumani',
      'Gorsel QA Kontrol Listesi',
    ],
    process: [
      { step: 1, title: 'Gorsel Analiz', description: 'Mevcut gorsel yapi, marka kimligi ve tutarlilik durumu incelenir, eksikler belirlenir.' },
      { step: 2, title: 'Token Mimarisi', description: 'Global, alias ve component token katmanlari tasarlanir, renk skalasi ve tipografi olcegi olusturulur.' },
      { step: 3, title: 'Tema Tasarimi', description: 'Light ve dark tema paletleri olusturulur, kontrast dogrulma yapilir, 60-30-10 kurali uygulanir.' },
      { step: 4, title: 'CSS Implementasyonu', description: 'CSS variables, tema gecis mekanizmasi ve responsive tipografi kodu yazilir.' },
      { step: 5, title: 'Entegrasyon', description: 'Tum sayfa ve komponentlere token sistemi entegre edilir, hard-coded degerler kaldirilir.' },
      { step: 6, title: 'QA ve Dokumantasyon', description: 'Gorsel regresyon testleri yapilir, design system dokumantasyonu tamamlanir.' },
    ],
    metrics: [
      { label: 'Gelistirme Hizi', value: '%60', description: 'Token sistemi sayesinde UI gelistirme %60 hizlanir.' },
      { label: 'Tasarim Tutarliligi', value: '%100', description: 'Tum sayfalarda birebir tutarli gorsel deneyim.' },
      { label: 'Tema Degisim Suresi', value: '<1sn', description: 'Aninda tema gecisi, sayfa yenilemesi gerektirmez.' },
      { label: 'Font Boyut Azalmasi', value: '%70', description: 'Subset ve WOFF2 ile font dosya boyutu %70 azalir.' },
      { label: 'Gelistirici Memnuniyeti', value: '%90+', description: 'Net token sistemi ile gelistirci deneyimi iyilesir.' },
    ],
    relatedServices: ['temel-kimlik', 'erisilebilirlik', 'ux-temelleri'],
    faq: [
      { question: 'Design token nedir?', answer: 'Design token, renk, tipografi, bosluk gibi tasarim degerlerinin merkezi olarak tanimlandigi ve kod genelinde kullanildigi bir sistemdir. Ornegin: --color-primary: #10b981. Bu sayede tek bir yerde degisiklik, tum sitede guncelleme saglar.' },
      { question: 'CSS variables ile Tailwind birlikte kullanilabilir mi?', answer: 'Evet, ideal kullanim da budur. Tailwind CSS 4, CSS variables ile dogal olarak calisir. Token degerleri CSS variable olarak tanimlanir, Tailwind class\'lari bu degiskenleri referans eder. Bu kombinasyon, hem hizli gelistirme hem de merkezi kontrol saglar.' },
      { question: 'Dark mode nasil calisir?', answer: 'Tema tercihi isletim sistemi ayarindan (prefers-color-scheme) okunur ve localStorage\'da saklanir. HTML root elementine data-theme attribute\'u eklenir. CSS variables bu attribute\'a gore farkli degerler alir. Gecis animasyonu ile yumusak bir tema degisimi saglanir.' },
      { question: '60-30-10 renk kurali nedir?', answer: 'Ic mimari ve modadan gelen bu kural, gorsel hiyerarsi yaratmak icin kullanilir: %60 dominant renk (genellikle arka plan), %30 sekonder renk (kartlar, butonlar), %10 aksan renk (CTA, vurgular). Bu denge, goz yormayan ve profesyonel bir gorunum saglar.' },
      { question: 'Font optimizasyonu neden onemli?', answer: 'Optimize edilmemis font dosyalari 200-500KB boyutunda olabilir ve sayfa yuklenme hizini ciddi sekilde etkiler. Subset (sadece gerekli karakterleri icerme), WOFF2 formati ve font-display: swap ile font boyutu %70\'e kadar azaltilabilir.' },
      { question: 'Responsive tipografi nasil saglanir?', answer: 'CSS clamp() fonksiyonu ile viewport genisligine gore otomatik olceklenen tipografi boyutlari tanimlanir. Ornegin: font-size: clamp(1rem, 2vw, 1.5rem). Bu sayede mobilde kucuk, masaustunde buyuk boyut otomatik uygulanir.' },
      { question: 'Mevcut tasarimimi tamamen degistirmek zorunda miyim?', answer: 'Hayir. Mevcut gorsel kimliginizi koruyarak token sistemine gecis yapiyoruz. Renkler, fontlar ve genel gorunum ayni kalir, sadece yonetim sekli merkezilestir. Zaman icerisinde ufak iyilestirmeler onerilebilir.' },
      { question: 'Token sistemi bakim gerektirir mi?', answer: 'Token sistemi kurulduktan sonra bakimi cok kolaydir. Yeni komponent eklendiginde mevcut tokenlari kullanirsiniz. Marka yenilemesi durumunda sadece token degerlerini guncellersiniz. Sistem, bakimi kolaylastirmak icin tasarlanmistir.' },
    ],
  },

  // =========================================================================
  // Phase 5 — SEO
  // =========================================================================
  {
    id: 'service-05',
    slug: 'seo',
    phaseNumber: 5,
    title: 'SEO — Teknik SEO, Meta Etiketler ve Core Web Vitals',
    shortTitle: 'SEO',
    shortDescription:
      'Arama motorlarinda ust siralara cikin. Teknik SEO, meta etiketler, JSON-LD ve Core Web Vitals optimizasyonu ile organik trafiginizi %40 artirin.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>SEO (Search Engine Optimization) hizmeti, web sitenizin arama motorlari tarafindan en iyi sekilde anlasilmasi, indekslenmesi ve siralamasini saglayan kapsamli bir teknik ve stratejik calismadir. Bu fazda meta tag optimizasyonu, JSON-LD yapilandirilmis veri, XML sitemap, canonical URL yonetimi, hreflang cok dilli etiketler, robots.txt yapilandirmasi ve Core Web Vitals iyilestirmeleri gerceklestiriyoruz.</p>
<p>Organik arama, web sitelerinin ortalama %53'unden fazla trafigin kaynagidir (BrightEdge arastirmasi). Google'in algoritmasi yilda 4.000'den fazla kez guncellenir; bu da surekli adaptasyon gerektiren dinamik bir alan oldugu anlamina gelir. Ancak teknik altyapi saglamsa, algoritma degisikliklerinden en az etkilenen siz olursunuz.</p>
<p>Teknik SEO, icerik SEO'sunun temelidir. En iyi icerik bile, teknik sorunlar varsa (yavas yukleme, indeksleme engelleri, duplicate content) arama motorlarinda gorulecek sekilde siralananamaz.</p>

<h2>Neden SEO Kritik?</h2>
<p>Organik arama, surdurulebilir dijital buyumenin en guclu kanalidir:</p>
<ul>
<li>Organik arama sonuclarina tiklama orani (CTR), ilk siradaki sonuc icin ortalama %27.6'dir (Backlinko)</li>
<li>Ilk sayfadaki sonuclar, toplam tiklarin %91.5'ini alir</li>
<li>Organik trafigin donusum orani, ucretli trafige gore ortalama 5.6 kat daha yuksektir</li>
<li>Core Web Vitals, Google'in siralama faktoleri arasinda yer almaktadir</li>
<li>JSON-LD ile zenginlestirilmis sonuclar, standart sonuclara gore %58 daha yuksek CTR elde eder</li>
</ul>

<h2>Detayli Calisma Kapsami</h2>

<h3>Title Tag Optimizasyonu</h3>
<p>Title tag, hem arama sonuclarinda goruntulenen baslik hem de en onemli on-page SEO sinyalidir. Her sayfa icin 50-60 karakter arasinda, hedef anahtar kelimeyi basta iceren, benzersiz ve tiklamaya tesvik eden title taglari yaziyoruz. Marka ismi genellikle sonda pipe (|) veya tire (-) ile eklenir.</p>

<h3>Meta Description Optimizasyonu</h3>
<p>Meta description dogrudan bir siralama faktoru olmasa da, CTR'yi dogrudan etkiler. 150-160 karakter arasinda, hedef anahtar kelimeyi dogal sekilde iceren, CTA (call-to-action) ile biten aciklamalar yaziyoruz. Her sayfa icin benzersiz meta description olusturulur.</p>

<h3>JSON-LD Yapilandirilmis Veri (Schema.org)</h3>
<p>Google'in icerigizi anlamsini en iyi sagladigimiz arac JSON-LD'dir. Sitenize uygun schema turleri ekliyoruz: <code>Organization</code> (kurum bilgileri), <code>WebSite</code> (site capi arama kutusu), <code>BreadcrumbList</code> (navigasyon yolu), <code>Product</code> (urun bilgileri), <code>FAQ</code> (sik sorulan sorular), <code>Article</code> (blog yazilari), <code>LocalBusiness</code> (yerel isletme). Bu markuplar, arama sonuclarinda zengin snippet'ler (yildiz puani, fiyat, SSS) gosterilmesini saglar.</p>

<h3>XML Sitemap ve Robots.txt</h3>
<p>XML sitemap, arama motorlarina sitenizin tum onemli sayfalarini listeler ve indeksleme oncelligini belirtir. Dinamik sitemap olusturma, oncelik (priority) ve degisiklik sikligi (changefreq) yapilandirmasi yapiyoruz. Robots.txt ile hangi sayfalarin taranacagini ve hangilerinin dislanacagini kontrol ediyoruz. Admin paneli, test sayfaalri ve duplicate icerikler dislanir.</p>

<h3>Canonical URL ve Duplicate Content Yonetimi</h3>
<p>Ayni iceriginin birden fazla URL'de gorunmesi (URL parametreleri, www/non-www, HTTP/HTTPS), duplicate content sorununa neden olur. Canonical tag ile her icerik icin "asil" URL'yi belirliyoruz. Pagination, filtre sayfalari ve parametre bazli URL'ler icin strateji olusturuyoruz.</p>

<h3>Core Web Vitals (LCP, INP, CLS)</h3>
<p>Google'in kullanici deneyimi metrikleri olan Core Web Vitals, siralama faktoru olarak kullanilmaktadir: LCP (Largest Contentful Paint) &lt; 2.5 saniye, INP (Interaction to Next Paint) &lt; 200ms, CLS (Cumulative Layout Shift) &lt; 0.1. Bu metrikleri olcuyor, darbogazlari tespit ediyor ve optimizasyon uyguluyoruz.</p>

<h3>Hreflang Cok Dilli Etiketleme</h3>
<p>Cok dilli veya cok bolgelii siteler icin hreflang etiketleri, Google'a her sayfanin hangi dil ve bolge icin oldugunu bildirir. Dogru hreflang yapilandirmasi, yanlis dilde gosterilen sonuclari onler ve her pazardaki organik performansi arttirir.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>Keyword stuffing:</strong> Anahtar kelimeyi title, description ve icerikte asiri tekrarlamak, spam algisi yaratir ve ceza riski olusturur. Dogal dil kullanimi esastir.</li>
<li><strong>Duplicate title tag:</strong> Birden fazla sayfanin ayni title tag'a sahip olmasi, Google'in hangi sayfayi siralamasi gerektigini karistirmesina neden olur.</li>
<li><strong>Schema markup hatalari:</strong> Gecersiz veya eksik JSON-LD, Google Search Console'da hata olusturur ve zengin sonuclar gosterilmez. Google'in Rich Results Test araci ile dogrulama zorunludur.</li>
<li><strong>Crawl budget israfi:</strong> Gereksiz sayfalarin (admin, test, parametre kombinasyonlari) taranmasina izin vermek, onemli sayfalarin taranma sikligini azaltir.</li>
<li><strong>Mobile uyumsuzluk:</strong> Google mobile-first indexing kullanir. Mobilde duzgun calismayan siteler, masaustu performansindan bagimsiz olarak cezalandirilir.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<ul>
<li>3-6 ay icerisinde organik trafikte %40 artis</li>
<li>Hedef anahtar kelimelerde ilk sayfa (Top 10) siralamasi</li>
<li>Lighthouse SEO skoru 95+</li>
<li>Core Web Vitals tum sayfalarad "Iyi" (Good) seviyesi</li>
<li>Zengin arama sonuclari (rich snippets) ile CTR artisi</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>SEO, surekli degisen kurallar, teknik derinlik ve stratejik dusunce gerektiren bir disiplindir. Google'in algoritmasi yilda 4.000+ kez guncellenir ve her guncelleme farkli sinyalleri onceliklendirir. JSON-LD markuplarin dogru implementasyonu, canonical strateji, hreflang yapilandirmasi ve CWV optimizasyonu teknik uzmlanlik gerektirir. Yanlis yapilan SEO calismasi, siralamallari dusurme riski tasir. Profesyonel bir ekip, guncel best practice'leri takip eder ve sitenizi surekli olarak optimize eder.</p>
</article>`,
    icon: 'search',
    features: [
      'Kapsamli teknik SEO denetimi (100+ kontrol noktasi)',
      'Meta tag optimizasyonu (title, description, OG, Twitter Card)',
      'JSON-LD yapilandirilmis veri (Schema.org — 7+ schema turu)',
      'XML Sitemap olusturma ve optimizasyonu',
      'Canonical URL ve duplicate content yonetimi',
      'Core Web Vitals (LCP, INP, CLS) optimizasyonu',
      'Hreflang cok dilli etiketleme',
      'Robots.txt yapilandirmasi ve crawl budget optimizasyonu',
      'Internal linking strateji ve implementasyonu',
      'Mobile-first indexing uyumluluk kontrolu',
    ],
    deliverables: [
      'SEO Audit Raporu (100+ kontrol noktasi)',
      'Meta Tag Sablonlari (tum sayfa turleri icin)',
      'Schema Markup Implementasyonu (JSON-LD)',
      'XML Sitemap Yapilandirmasi',
      'Core Web Vitals Optimizasyon Raporu',
      'Canonical URL Strateji Dokumani',
      'Robots.txt Yapilandirmasi',
      'Hreflang Implementasyon Plani',
      'Internal Link Haritasi',
      'Aylik SEO Performans Rapor Sablonu',
    ],
    process: [
      { step: 1, title: 'Teknik Denetim', description: 'Sitenin mevcut SEO durumu 100+ kontrol noktasinda analiz edilir, kritik sorunlar tespit edilir.' },
      { step: 2, title: 'Anahtar Kelime Arastirmasi', description: 'Hedef anahtar kelimeler, arama hacimleri ve rekabet seviyeleri belirlenir, icerik stratejisi olusturulur.' },
      { step: 3, title: 'On-Page Optimizasyon', description: 'Meta taglar, baslik yapisi, ic linkler ve icerik optimizasyonu tum sayfalara uygulanir.' },
      { step: 4, title: 'Schema Markup', description: 'JSON-LD yapilandirilmis veri eklenir, Rich Results Test ile dogrulanir.' },
      { step: 5, title: 'Teknik Iyilestirmeler', description: 'Core Web Vitals, crawl budget, canonical ve sitemap optimizasyonlari yapilir.' },
      { step: 6, title: 'Izleme ve Raporlama', description: 'Google Search Console ve GA4 ile siralama/trafik degisimleri duzenli olarak raporlanir.' },
    ],
    metrics: [
      { label: 'Organik Trafik Artisi', value: '%40', description: 'Ortalama 3-6 ay icerisinde organik trafikte %40 artis.' },
      { label: 'Arama Siralamasi', value: 'Top 10', description: 'Hedef anahtar kelimelerde ilk sayfa siralamasi.' },
      { label: 'Teknik SEO Skoru', value: '95+', description: 'Lighthouse ve Search Console\'da 95+ teknik skor.' },
      { label: 'Rich Snippet CTR', value: '+%58', description: 'JSON-LD ile zenginlestirilmis sonuclarda CTR artisi.' },
      { label: 'CWV Durumu', value: 'Iyi', description: 'Tum Core Web Vitals metrikleri "Iyi" seviyesinde.' },
    ],
    relatedServices: ['geo', 'aio-llmo', 'analitik-performans'],
    faq: [
      { question: 'SEO sonuclari ne kadar surede gorulur?', answer: 'Teknik SEO iyilestirmeleri 2-4 haftada indekslenmeye baslar. Organik trafik artisi genellikle 3-6 ay icinde belirgin hale gelir. Rekabetci anahtar kelimelerde 6-12 ay surebilir. SEO, maraton gibidir — tutarli calisma uzun vadede buyuk sonuclar getirir.' },
      { question: 'JSON-LD nedir ve neden onemlidir?', answer: 'JSON-LD, sayfanizin icerigini arama motorlarina yapili veri olarak anlatan bir formattir. Ornegin bir urun sayfasindaki fiyat, stok durumu ve yorum puani JSON-LD ile isaretlenir. Google bu veriyi kullanarak zengin sonuclar (yildizlar, fiyat, SSS) gosterir ve CTR artar.' },
      { question: 'Core Web Vitals nedir?', answer: 'Google\'in kullanici deneyimini olcen uc temel metriktir: LCP (sayfa yukleme hizi, hedef <2.5sn), INP (etkilesim yanitlama suresi, hedef <200ms), CLS (gorsel kayma, hedef <0.1). Bu metrikler siralama faktoru olarak kullanilir.' },
      { question: 'Canonical URL neden gerekli?', answer: 'Ayni icerik birden fazla URL\'de gorunebilir (parametreler, www/non-www, pagination). Canonical tag, Google\'a "bu iceriginn asil URL\'si budur" der ve duplicate content cezasini onler.' },
      { question: 'Hreflang ne ise yarar?', answer: 'Cok dilli veya cok bolgeli siteler icin hreflang etiketi, Google\'a her sayfanin hangi dil/bolge icin oldugunu bildirir. Dogru yapilandirma, Turkce arayan kullanicinin Turkce sayfanizi, Ingilizce arayanin Ingilizce sayfanizi gormesini saglar.' },
      { question: 'XML sitemap ne siklikla guncellenmelidir?', answer: 'Dinamik sitemap kullaniyorsaniz otomatik guncellenir. Statik sitemap icin her yeni icerik eklendiginde guncellenmeli ve Google Search Console\'a bildirilmelidir. Biz dinamik sitemap oneriyoruz.' },
      { question: 'SEO ve SEM arasindaki fark nedir?', answer: 'SEO organik (ucretsiz) arama siralamasini optimize eder, SEM ise ucretli reklamlari (Google Ads) ve donusum takibini kapsar. Ikisi birbirini tamamlar: SEO uzun vadeli surdurulebilir trafik, SEM ise aninda gorunurluk saglar.' },
      { question: 'Keyword stuffing cezasi nedir?', answer: 'Anahtar kelimeyi yapay sekilde asiri tekrarlamak, Google tarafindan spam olarak algilanir. Manuel ceza (manual action) veya algoritmik dususle sonuclanabilir. Dogal, kullanici odakli icerik yazimi esastir.' },
    ],
  },

  // =========================================================================
  // Phase 6 — SEM
  // =========================================================================
  {
    id: 'service-06',
    slug: 'sem',
    phaseNumber: 6,
    title: 'SEM — GTM, GA4, Conversion Tracking ve Reklam Pikselleri',
    shortTitle: 'SEM',
    shortDescription:
      'Reklam yatiriminizin karsiligini alin. GTM, GA4, conversion tracking ve heatmap ile donusum oraninizi %25 artirin.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>SEM (Search Engine Marketing) hizmeti, dijital reklam yatirimlarinizin etkinligini maksimize eden teknik altyapi ve analitik sistem kurulumunu kapsar. Google Tag Manager (GTM) kurulumu, GA4 gelismis olay takibi, Google Ads ve Meta Pixel conversion tracking, UTM strateji ve heatmap/session recording entegrasyonunu iceirir.</p>
<p>"Olcemediginiz seyi optimize edemezsiniz" — dijital reklamciligini temel prensibi budur. Dogru yapilandirilmis bir olcum altyapisi olmadan reklam harcamaniz, karanlakta ok atamaya benzer. Bu fazda tum olcum noktalarini kuruyor, verilerin dogrulugunu sagliyor ve reklam butcenizin her kurusunun izlenebilir olmasini garanti ediyoruz.</p>
<p>Google Ads kullanan isletmelerin %60'indan fazlasi, conversion tracking'i yanlis veya eksik yapilandirmistir. Bu durum, reklam algoritmalarinin yanlis optimize etmesine ve butcenin israf edilmesine yol acar.</p>

<h2>Neden SEM Altyapisi Kritik?</h2>
<ul>
<li>Dogru conversion tracking ile reklam ROAS (Return on Ad Spend) ortalama %30 artar</li>
<li>GA4 enhanced measurement ile kullanici davranislari %95 dogrulukla izlenir</li>
<li>Heatmap verisi ile sayfa layout optimizasyonlari donusum oranini %15-25 arttirir</li>
<li>UTM parametreleri ile her reklam kanalinin gercek performansi izole edilir</li>
<li>Cross-domain tracking ile cok siteli isletmelerin kullanici yolculugu uctan uca gorulur</li>
</ul>

<h2>Detayli Calisma Kapsami</h2>

<h3>Google Tag Manager (GTM) Kurulumu</h3>
<p>GTM, sitenize kod degisikligi yapmadan etiket (tag) eklemenizi saglayan bir konteyner sistemidir. GTM container kurulumu, veri katmani (dataLayer) yapilandirmasi, tetikleyici (trigger) ve degisken (variable) tanimlari yapiyoruz. GTM ile GA4, Google Ads, Meta Pixel ve diger ucuncu parti etiketleri tek bir noktadan yonetirsiniz. Debug modu ile tum etiketlerin dogru ateslendigini dogruluyoruz.</p>

<h3>GA4 Gelismis Olay Takibi</h3>
<p>GA4, Google Analytics'in yeni nesil versiyonudur ve event-based bir modelle calisir. Varsayilan olaylara ek olarak ozel olaylar (custom events) tanimliyoruz: form gonderimi, buton tiklama, scroll derinligi, video izleme, dosya indirme, sepete ekleme, odeme tamamlama. Enhanced Ecommerce icin urun goruntuleme, sepet islemleri ve satin alma funnel'lari kuruyoruz.</p>

<h3>Google Ads Conversion Pixel</h3>
<p>Google Ads'in donusum takibi icin conversion pixel kurulumu ve yapilandirmasi yapiyoruz. Birincil donusumler (satin alma, form gonderimi) ve ikincil donusumler (sayfa goruntulerme, sepete ekleme) ayri ayri tanimlanir. Enhanced conversions ile daha dogruu donusum atributiasyonu saglanir. Consent Mode v2 ile entegrasyon kurulur.</p>

<h3>Meta (Facebook) Pixel Kurulumu</h3>
<p>Facebook/Instagram reklamlari icin Meta Pixel kurulumu, standart olaylar (ViewContent, AddToCart, Purchase) ve ozel donusum olaylari tanimlanir. Conversions API (server-side tracking) ile tarayici tabanli pikselin sinirlamalari asilir. iOS 14+ gizlilik degisikliklerine uyumlu yapilandirma yapilir.</p>

<h3>UTM Parametre Stratejisi</h3>
<p>UTM parametreleri (source, medium, campaign, content, term), her trafik kaynaginin performansini izole etmenizi saglar. Standart bir isimlendirme konvansiyonu olusturuyor, URL builder sablonlari hazirliyoruz ve ekibinizi dogru UTM kullanimi konusunda egitiyoruz. Tutarsiz UTM kullanimi, analitik verilerin kirlenmesine neden olur.</p>

<h3>Heatmap ve Session Recording</h3>
<p>Hotjar veya Microsoft Clarity entegrasyonu ile kullanicilarin sayfa uzerindeki davranislarini gorsel olarak analiz ediyoruz: tiklanma haritasi, kaydirma derinligi, fare hareketi ve form etkilesimi. Session recording ile gercek kullanici oturumlarini izleyerek problem alanlarini tespit ediyoruz.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>Conversion tag'i her sayfaya koymak:</strong> Donusum etiketi sadece donusum sayfasinda (tesekkur sayfasi) ateslenmelidir. Her sayfaya koymak, yanlsi donusum verisi uretir.</li>
<li><strong>GTM debug modunu atlmak:</strong> Etiketlerin dogru ateslenip ateslendigini dogrulamadan yayina almak, haftalarca yanlis veri toplamaniza neden olabilir.</li>
<li><strong>UTM tutarsizligi:</strong> "facebook" vs "Facebook" vs "fb" gibi tutarsiz isimlendirme, analizde veri kirliligi yaratir. Standart konvansiyon sarttir.</li>
<li><strong>Enhanced conversions kullanmamak:</strong> Tarayici gizlilik kisitlamalari nedeniyle standart piksel verileri eksilmektedir. Enhanced conversions ve server-side tracking ile veri kaybi azaltilir.</li>
<li><strong>GA4 olaylarini plansiz tanimlamak:</strong> "button_click_1", "click_here" gibi anlamsiz olay isimleri, analiz yapmaya calistiginizda veri kaosuna neden olur. Olculebilir bir isimlendirme plani olusturulmalidir.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<ul>
<li>Donusum oraninda %25 iyilesme</li>
<li>Reklam maliyetinde %30 dusus (optimize targeting)</li>
<li>Conversion ve event verilerinde %99 dogruluk orani</li>
<li>Tum reklam kanallarinin ROI'sinin izole olcumu</li>
<li>Kullanici davransi icgoruleriyle sayfa optimizasyonu</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>GTM, GA4, conversion tracking ve heatmap sistemlerinin dogru kurulumu, veri katmani anlayisi, tetikleyici mantigi ve platform ozel gereksinimleri hakkinda derin teknik bilgi gerektirir. Yanlis yapilandirma, haftalarca veya aylarca yanlis veri toplanmasina, reklam butcesinin israf edilmesine ve yanlis is kararlarain alinmasina neden olur. Profesyonel bir ekip, tum bu sistemleri ilk seferde dogru kurar, debug eder ve dogrular.</p>
</article>`,
    icon: 'target',
    features: [
      'Google Tag Manager (GTM) kurulumu ve yapilandirmasi',
      'GA4 gelismis olay takibi ve custom events',
      'Google Ads conversion pixel entegrasyonu',
      'Meta (Facebook) Pixel kurulumu ve Conversions API',
      'UTM parametreleri stratejisi ve sablonlari',
      'Heatmap ve session recording entegrasyonu (Hotjar/Clarity)',
      'Cross-domain tracking yapilandirmasi',
      'Enhanced Ecommerce funnel kurulumu',
      'Enhanced conversions implementasyonu',
      'DataLayer yapilandirmasi ve olay planlama',
    ],
    deliverables: [
      'GTM Container Yapilandirmasi',
      'GA4 Event Tracking Plani',
      'Conversion Tracking Kurulumu (Google Ads + Meta)',
      'UTM Stratejisi Dokumani ve URL Builder',
      'Heatmap Analiz Raporu',
      'Reklam Pikseli Test Raporu',
      'DataLayer Spesifikasyonu',
      'Enhanced Ecommerce Funnel Raporu',
      'Cross-Domain Tracking Yapilandirmasi',
      'Olay Isimlendirme Konvansiyon Dokumani',
    ],
    process: [
      { step: 1, title: 'Gereksinim Analizi', description: 'Donusum hedefleri, izleme gereksinimleri ve mevcut reklam platformlari belirlenir, olay plani olusturulur.' },
      { step: 2, title: 'GTM ve DataLayer Kurulumu', description: 'GTM container olusturulur, dataLayer yapilandirmasi yapilir, temel degiskenler tanimlanir.' },
      { step: 3, title: 'Etiket Entegrasyonu', description: 'GA4, Google Ads, Meta Pixel ve heatmap etiketleri GTM uzerinden entegre edilir.' },
      { step: 4, title: 'Debug ve Dogrulama', description: 'GTM debug modu, Google Tag Assistant ve platform debugging araclari ile tum etiketler dogrulanir.' },
      { step: 5, title: 'UTM ve Raporlama', description: 'UTM konvansiyonu olusturulur, GA4 dashboardlari yapilandirilir, donusum hunileri kurulur.' },
      { step: 6, title: 'Optimizasyon', description: 'Ilk 2 haftalik veriler analiz edilir, ince ayarlar yapilir, heatmap icgoruleri raporlanir.' },
    ],
    metrics: [
      { label: 'Donusum Artisi', value: '%25', description: 'Dogru takip ile donusum oraninda %25 iyilesme.' },
      { label: 'Reklam Maliyeti Dususu', value: '%30', description: 'Optimize targeting ile reklam maliyetinde %30 dusus.' },
      { label: 'Veri Dogrulugu', value: '%99', description: 'Conversion ve event verilerinde %99 dogruluk orani.' },
      { label: 'ROAS Artisi', value: '%30+', description: 'Dogru attribution ile reklam getiri oraninda artis.' },
      { label: 'Veri Kaybi Azalmasi', value: '<%5', description: 'Enhanced conversions ile veri kaybi %5 altina iner.' },
    ],
    relatedServices: ['seo', 'yasal-uyumluluk', 'analitik-performans'],
    faq: [
      { question: 'GTM nedir ve neden gerekli?', answer: 'Google Tag Manager, sitenize kod degisikligi yapmadan analitik ve reklam etiketleri eklemenizi saglayan bir yonetim platformudur. Gelistiriciye bagimlilik azalir, etiketler tek noktadan yonetilir ve her degisiklik versiyon kontroluyle takip edilir.' },
      { question: 'GA4 ile Universal Analytics arasindaki fark nedir?', answer: 'GA4, oturum (session) bazli degil olay (event) bazli bir modelle calisir. Her etkilesim bir olay olarak kaydedilir. Daha esnek, gizlilik odakli ve platformlar arasi (web + uygulama) olcum yapar. Universal Analytics Temmuz 2024\'te kullanim disi kalmistir.' },
      { question: 'Conversion tracking neden bu kadar onemli?', answer: 'Google Ads ve Meta gibi platformlar, conversion verisini kullanarak reklamlari optimize eder. Yanlis veya eksik conversion tracking, algoritmanin yanlis kitlelere ve zamanlarda reklam gostermesine ve butcenizin israf edilmesine neden olur.' },
      { question: 'UTM parametresi nedir?', answer: 'UTM (Urchin Tracking Module) parametreleri, URL\'ye eklenen izleme kodlaridir: source (kaynak), medium (kanal), campaign (kampanya), content (icerik), term (anahtar kelime). GA4\'te her trafik kaynaginin performansini ayri ayri gormenizi saglar.' },
      { question: 'Heatmap ne ise yarar?', answer: 'Heatmap, kullanicilarin sayfanizda nereye tikladigini, ne kadar kaydirdigini ve hangi alanlara baktifini gorsel olarak gosterir. Bu veriler, CTA butonlarin konumu, icerik yerlesimi ve form tasarimi gibi kararlari veriyle destekler.' },
      { question: 'Enhanced conversions nedir?', answer: 'Tarayici gizlilik kisitlamalari (3rd-party cookie engelleme, iOS ATT) nedeniyle standart conversion pikseli veri kaybeder. Enhanced conversions, kullanici verisini hashleyerek (sifreleyerek) Google\'a gonderir ve conversion eslestirme dogrulugunu arttirir.' },
      { question: 'Server-side tracking ne zaman gereklidir?', answer: 'Yuksek trafikli siteler, e-ticaret platformlari ve iOS kullaniciclarinin onemli oldugu isletmeler icin server-side tracking onerilir. Tarayici tabanli pikselerin kisitlamalarini asar ve daha dogruu veri toplar.' },
      { question: 'Mevcut GTM kurulumum var, sifirdan mi baslanir?', answer: 'Mevcut yapilandirmanizi audit eder, eksik ve hatali etiketleri tespit eder ve gerekli iyilestirmeleri yapariz. Isleyen etiketler korunur, eksikler eklenir, hatalili duzeltilir.' },
    ],
  },

  // =========================================================================
  // Phase 7 — GEO
  // =========================================================================
  {
    id: 'service-07',
    slug: 'geo',
    phaseNumber: 7,
    title: 'GEO — Generative Engine Optimization ve AI Arama Gorunurlugu',
    shortTitle: 'GEO',
    shortDescription:
      'AI arama motorlarinda gorunur olun. llms.txt, AI-friendly icerik ve FAQ/HowTo schema ile yeni bir trafik kanali acin.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>GEO (Generative Engine Optimization), yapay zeka destekli arama motorlarinda (ChatGPT Search, Google AI Overviews, Perplexity, Bing Copilot, Gemini) gorunur olmanizi saglayan yeni nesil bir optimizasyon disiplinidir. Geleneksel SEO'nun otesinde, AI motorlarinin iceriginizi dogru anlamasi, ozetlemesi ve kullanicilara referans olarak gostermesi icin ozel stratejiler uygulanir.</p>
<p>2025 itibariyle arama sorgularinin %30'undan fazlasi AI destekli yanitlar icermektedir. Google'in AI Overviews ozelligi, arama sonuclarinin en ustunde yapay zeka tarafindan uretilmis ozetler gostermektedir. Bu devrim, geleneksel "10 mavi link" modelini kokuneden degistirmektedir.</p>
<p>Bu fazda llms.txt dosyasi olusturma, AI-friendly icerik yapilandirmasi, FAQ ve HowTo schema markup implementasyonu ile sitenizi AI arama cagina hazirliyoruz. Erken adapte olan markalar, bu yeni trafik kanalinin en buyuk kazananlari olacaktir.</p>

<h2>Neden GEO Kritik?</h2>
<ul>
<li>2025'te arama sorgularinin %30+'i AI destekli yanitlar icerir</li>
<li>Google AI Overviews, arama sonuclarinin goruntulenme modelini kokunden degistiriyor</li>
<li>Perplexity aylik 100 milyon+ arama isliyor ve hizla buyuyor</li>
<li>ChatGPT Search ozelligi ile OpenAI dogrudan arama pazarina girdi</li>
<li>AI kaynak olarak gosterdigi sitelere gelen trafik, geleneksel organik trafikten %40 daha yuksek donusum oranina sahip</li>
</ul>

<h2>Detayli Calisma Kapsami</h2>

<h3>llms.txt Dosyasi</h3>
<p><code>llms.txt</code>, web sitenizin kokunde yer alan ve AI modellere sitenizin ne hakkinda oldugunu, hangi sayfalarin onemli oldugunu ve nasil referans gosterilmesini istediginizi bildiren bir dosyadir. robots.txt'nin AI versiyonu olarak dusunulebilir. Ornek bir llms.txt dosyasi:</p>
<blockquote>
<code># Sirket Adi<br/>
## Hakkinda<br/>
Bir cumlelik aciklama<br/>
## Onemli Sayfalar<br/>
- /urunler: Tum urunlerimiz<br/>
- /blog: Sektor icgoruleri<br/>
## Iletisim<br/>
info@sirket.com</code>
</blockquote>
<p>Bu dosya, AI modellerinin sitenizi daha iyi anlamasini ve daha dogruu referanslar uretmesini saglar.</p>

<h3>AI-Friendly Icerik Yapisi</h3>
<p>AI motorlari, iyi yapilandirilmis icerikleri tercih eder. Kisa ve net cumleler (ortalama 15-20 kelime), acik basliklar (H2, H3), entity mention (sirket, urun, kisi isimleri), dogrudan yanitlar (ilk paragrafta ozet), liste ve numaralandirma, ve net tanimlamalar ("X, Y'dir" formati) kullanilan icerikler AI tarafindan daha kolay anlasilir ve referans gosterilir.</p>

<h3>FAQ Schema Markup</h3>
<p>FAQPage schema, sayfanizakdi sik sorulan sorulari yapilandirilmis veri olarak isaretler. Google bu veriyi arama sonuclarinda dogrudan gosterebilir (soru-cevap genisletme). AI motorlari da FAQ schema'yi icerik kaynaklarini anlamak icin kullanir. Her sayfa icin sayfainin icerigiyle ilgili 5-10 gercek soru ve net yanitlar hazirliyoruz.</p>

<h3>HowTo Schema Markup</h3>
<p>Adim adim rehberler ve nasil yapilir icerikleri icin HowTo schema markup ekliyoruz. Bu markup, Google'da gorsel adim adim gosterim saglar ve AI motorlarinin prosedural bilgiyi dogru anlamasina yardimci olur. Her adim basligi, aciklamasi ve varsa gorseli ile isaretlenir.</p>

<h3>AI Arama Motoru Gorunurluk Analizi</h3>
<p>Markanizin ChatGPT, Perplexity, Gemini ve Bing Copilot'ta nasil gosterildigini analiz ediyoruz. Hangi sorgularda referans gosterildiginizi, rakiplerinizin AI gorunurlugunu ve icerik bosluklarini tespit ediyoruz. Bu analiz, GEO stratejisinin yol haritasini olusturur.</p>

<h3>Knowledge Panel Optimizasyonu</h3>
<p>Google Knowledge Panel ve AI motorlarinon bilgi grafiginde (knowledge graph) markanizin dogru ve zengin sekilde temsil edilmesini sagliyoruz. Wikipedia, Wikidata, Google My Business ve yapilandirilmis veri ile knowledge graph sinyallerini guclediriyoruz.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>GEO'yu SEO'nun alternatifi sanmak:</strong> GEO, SEO'nun yerini almaz, tamamlar. Saglamm bir SEO temeli olmadan GEO etkisi sinirli kalir.</li>
<li><strong>llms.txt'yi ihmal etmek:</strong> Bu dosya henuz yeni ve cogu site kullanmiyor. Erken adapte etmek, rekabet avantaji saglar.</li>
<li><strong>AI motorlarini test etmemek:</strong> Markanizi duzenlii olarak ChatGPT, Perplexity gibi platformlarda aratarak nasil gosterildiginizi kontrol etmelisiniz.</li>
<li><strong>Jargonlu ve karisik icerik:</strong> AI motorlari, sade ve net icerikleri tercih eder. Uzun, karisik cumleler ve belirsiz ifadeler AI tarafindan atlanir.</li>
<li><strong>Tek seferlik calisma yapmak:</strong> AI aramalari hizla evrilmektedir. Duzenli icerik guncellemesi ve gorunurluk takibi sart.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<ul>
<li>Baslica AI arama motorlarinda markaniz referans gosterilir</li>
<li>AI aramalarindan gelen yeni bir trafik kanali acilir (%20 ek trafik)</li>
<li>Schema markup ile zengin sonuc gorunurlugu 5 kat artar</li>
<li>Knowledge panel gorunurlugu ve dogrrulugu iyilesir</li>
<li>Rakiplere kiyasla AI gorunurlugunde belirgin avantaj</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>GEO, hizla gelisen ve henuz standartlari oturmamis bir alandir. AI motorlarinin nasil calistigini, hangi sinyalleri onceliklendigini ve icerik yapisinin nasil optimize edilecegini anlamak, derinlemesine arastirma ve deneyim gerektirir. llms.txt formati, AI-friendly icerik stratejisi ve schema markup implementasyonu teknik uzmanlk ister. Biz bu alandaa surekli arastirma yapiyor, en guncel best practice'leri takip ediyor ve sitenizi AI arama devriimine en erken ve en etkili sekilde hazirliyoruz.</p>
</article>`,
    icon: 'globe',
    features: [
      'llms.txt dosyasi olusturma ve optimizasyonu',
      'AI-friendly icerik yapilandirmasi',
      'FAQ Schema markup implementasyonu',
      'HowTo Schema markup implementasyonu',
      'AI arama motoru gorunurluk analizi',
      'Yapilandirilmis veri zenginlestirme',
      'Knowledge panel optimizasyonu',
      'Entity mention stratejisi',
      'AI arama trend takibi ve raporlama',
      'Icerik format optimizasyonu (liste, tablo, ozet)',
    ],
    deliverables: [
      'llms.txt Dosyasi',
      'AI-Optimized Icerik Sablonu',
      'FAQ/HowTo Schema Markup Seti',
      'AI Gorunurluk Raporu',
      'Icerik Optimizasyon Rehberi',
      'Knowledge Panel Strateji Dokumani',
      'Entity Mapping Dokumani',
      'AI Arama Rakip Analizi',
      'Icerik Format Kilavuzu',
      'Aylik AI Gorunurluk Takip Raporu',
    ],
    process: [
      { step: 1, title: 'AI Gorunurluk Analizi', description: 'Markanizin ChatGPT, Perplexity, Gemini ve Bing Copilot\'ta nasil gosterildigi analiz edilir.' },
      { step: 2, title: 'Rakip ve Trend Analizi', description: 'Rakiplerinizin AI gorunurlugu ve sektor trendleri incelenir, firsatlar belirlenir.' },
      { step: 3, title: 'Strateji Olusturma', description: 'llms.txt, schema markup ve icerik optimizasyonu icin kapsamli strateji planlanir.' },
      { step: 4, title: 'Teknik Uygulama', description: 'llms.txt dosyasi, FAQ/HowTo schema ve yapilandirilmis veri eklenir.' },
      { step: 5, title: 'Icerik Optimizasyonu', description: 'Mevcut icerikler AI-friendly formata donusturulur, yeni icerik sablonlari olusturulur.' },
      { step: 6, title: 'Izleme ve Iterasyon', description: 'AI gorunurlugu duzenli takip edilir, stratejiler sonuclara gore guncellenir.' },
    ],
    metrics: [
      { label: 'AI Gorunurlugu', value: 'Aktif', description: 'Baslica AI arama motorlarinda markaniz referans gosterilir.' },
      { label: 'Yeni Trafik Kanali', value: '%20', description: 'AI aramalarindan gelen yeni bir trafik kanali acilir.' },
      { label: 'Featured Snippet', value: '5x', description: 'Schema markup ile zengin sonuc gorunurlugu 5 kat artar.' },
      { label: 'Icerik Anlasalma Skoru', value: '%90+', description: 'AI motorlarinin icerigizi dogru anladigi dogrulanir.' },
      { label: 'Knowledge Panel', value: 'Aktif', description: 'Marka knowledge panel gorunurlugu saglanir.' },
    ],
    relatedServices: ['seo', 'aio-llmo', 'analitik-performans'],
    faq: [
      { question: 'GEO ve SEO arasindaki fark nedir?', answer: 'SEO, geleneksel arama motorlarinda (Google, Bing) siralama optimizasyonu yapar. GEO ise AI destekli arama motorlarinda (ChatGPT, Perplexity, Google AI Overviews) gorunurluk optimizasyonudur. Ikisi birbirini tamamlar; GEO, SEO\'nun uzerine insa edilir.' },
      { question: 'llms.txt nedir ve nasil calisir?', answer: 'llms.txt, sitenizin kok dizininde yer alan ve AI modellere siteniz hakkinda bilgi veren bir dosyadir. Sitenizin ne hakkinda oldugunu, onemli sayfalari ve iletisim bilgilerini Markdown formatinda icerir. robots.txt\'nin AI versiyonu olarak dusunebilirsiniz.' },
      { question: 'AI arama motorlari gercekten onemli mi?', answer: 'Evet. 2025 itibariyle arama sorgularinin %30+\'i AI destekli yanitlar iceriyor. Google AI Overviews, ChatGPT Search ve Perplexity hizla buyuyor. Bu trendi erken yakalayan markalar ciddi rekabet avantaji elde edecektir.' },
      { question: 'Hangi AI arama motorlari icin optimize edilir?', answer: 'Google AI Overviews, ChatGPT Search, Perplexity, Bing Copilot, Gemini ve Claude gibi baslica AI platformlari icin optimize ediyoruz. Her platformun farkli oncelikleri vardir ancak temel prensipler ortaktir.' },
      { question: 'FAQ schema sadece SSS sayfalari icin mi?', answer: 'Hayir. Her sayfaya o sayfanin icerigiyle ilgili SSS eklenebilir. Urun sayfasinda urunle ilgili sorular, hizmet sayfasinda hizmetle ilgili sorular eklenir. Bu, hem SEO hem GEO icin degerlidir.' },
      { question: 'GEO sonuclari ne kadar surede gorulur?', answer: 'AI motorlarinin icerigi indekslemesi SEO\'ya gore daha hizli olabilir. llms.txt ve schema markup ekledikten sonra 2-4 hafta icerisinde AI gorunurlugunde degisiklik gozlemlenebilir. Ancak tutarli icerik uretimi ile uzun vadeli buyume saglanir.' },
      { question: 'AI-friendly icerik nasil yazilir?', answer: 'Kisa cumleler (15-20 kelime), acik basliklar, dogrudan yanitlar (ilk paragrafta ozet), listeler, entity mention (sirket/kisi/urun isimleri) ve net tanimlar kullanilir. "X, Y\'dir" formati AI motorlari tarafindan kolayca islenir.' },
      { question: 'Mevcut iceriklerimi degistirmem gerekir mi?', answer: 'Tamamen degistirmek gerekmez. Mevcut iceriklerinizi AI-friendly formata optimize ederiz: baslik yapisi duzeltilir, ozet paragraflar eklenir, entity mention zenginlestirilir ve FAQ bolumu eklenir.' },
    ],
  },

  // =========================================================================
  // Phase 8 — AIO/LLMO
  // =========================================================================
  {
    id: 'service-08',
    slug: 'aio-llmo',
    phaseNumber: 8,
    title: 'AIO/LLMO — AI Bot Yonetimi, Entity Markup ve Knowledge Graph',
    shortTitle: 'AIO/LLMO',
    shortDescription:
      'AI motorlarinda referans olun. Bot yonetimi, entity markup ve knowledge graph stratejisi ile marka otoritenizi guclendirin.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>AIO (AI Optimization) ve LLMO (Large Language Model Optimization), yapay zeka motorlarinin sitenizi nasil taradigini, icerigizi nasil kullandigini ve markanizi nasil temsil ettigini kontrol etmenizi saglayan stratejik bir hizmettir. Bu faz, GEO'nun (Faz 7) bir ust katmanidir: AI botlarina erism kontrolu, entity markup ile marka tanimlama ve knowledge graph stratejisi ile sektorde otorite konumlandirmasi icerir.</p>
<p>GPTBot (OpenAI), ClaudeBot (Anthropic), Google-Extended (Google AI) ve PerplexityBot gibi yapay zeka botlari surekli web'i tariyarak icerik topluyor. Bu botlarin hangi iceriklere erisecegi, hangilerini dislaycacginiz ve markanizin bu motorlarda nasil temsil edilecegi kritik stratejik kararlardir.</p>
<p>E-E-A-T (Deneyim, Uzmanlik, Otorite, Guvenilirlik) sinyalleri, hem Google hem de AI motorlarinin icerik kalitesini degerlendirmede kullandigi temel kriterlerdir. Bu fazda bu sinyalleri guclenddiriyoruz.</p>

<h2>Neden AIO/LLMO Kritik?</h2>
<ul>
<li>AI botlari her gun milyarlarca web sayfasini tariyarak egitim verisi topluyor</li>
<li>AI motorlarinda kaynak olarak gosterilen markalar, %300 daha yuksek guvenilirlik algisi kazaniyor</li>
<li>robots.txt'de AI bot kurallari olmayan siteler, icerikleri uzerinde kontrol kaybi yasiyorlar</li>
<li>Entity markup kullanan siteler, knowledge graph'ta %2.5 kat daha fazla gorunuyor</li>
<li>E-E-A-T sinyalleri guclu olan icerikler, AI yanitllarinda 4 kat daha fazla referans gosteriyor</li>
</ul>

<h2>Detayli Calisma Kapsami</h2>

<h3>AI Bot Yonetimi (robots.txt)</h3>
<p>robots.txt dosyasinda AI botlarina ozel kurallar tanimlanir. Ornek yapilandirma:</p>
<blockquote>
<code>User-agent: GPTBot<br/>
Allow: /blog/<br/>
Disallow: /admin/<br/>
Disallow: /api/<br/>
<br/>
User-agent: ClaudeBot<br/>
Allow: /<br/>
Disallow: /private/<br/>
<br/>
User-agent: Google-Extended<br/>
Allow: /</code>
</blockquote>
<p>Hangi botlara izin verip hangilerini engelleyeceginiz, icerik stratejinize ve is modelinize bagli bir karaardir. Biz bu karari birlikte alir ve yapilandirmmayi gerceklestiririz.</p>

<h3>Entity Markup (Schema.org)</h3>
<p>Entity markup, markanizi, kisiilerinizi, urunlerinizi ve hizmetlerinizi arama motorlari ve AI modelleri icin benzersiz "varliklar" (entities) olarak tanimlar. Organization, Person, Product, Service, Brand gibi schema turleri ile entity ilisskilerini kuruyoruz. Bu, AI motorlarinin "VixSEO bir SEO sirketidir" gibi bilgileri kesin olarak anlamasini saglar.</p>

<h3>Knowledge Graph Stratejisi</h3>
<p>Google Knowledge Graph ve AI motorlartinin bilgi grafikleri, varliklar arasindaki iliskileri modeller. Markanizin bu grafiklerde guclui bir sekilde temsil edilmesi icin Wikipedia/Wikidata kayitlari, schema markup, tutarli NAP (Name, Address, Phone) bilgileri, sosyal profil baglantilari ve otorite kaynaklari baglamtigurulur.</p>

<h3>E-E-A-T Sinyalleri Guclendirme</h3>
<p>Google'in E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) sinyalleri: Yazar profilleri (biyografi, uzmanlik alani, sosyal profiller), kaynakca ve referanslar, guncelleme tarihleri, iletisim ve seffaflik bilgileri, musteri yorumlari ve vaka calismalari ile guclendirilir. AI motorlari da bu sinyalleri kullanarak icerik guvenilirligini degerlendirir.</p>

<h3>AI Egitim Verisi Kontrolu</h3>
<p>Icerigizin AI modellerinin egitim verisinde nasil kullanildigini kontrol etmek icin stratejiler uyguluyoruz. TDMRep (Text and Data Mining Reservation Protocol) bildirimleri, robots.txt kurallari ve site politikalariyla icerikleriniz uzerindeki hakkinizi koruyoruz.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>Tum AI botlarini engellemek:</strong> AI motorlarinda gorunnmek istiyorsaniz, botlara erisim vermelisiniz. Tamamen engellemek, AI gorunurlugunu sifirlar.</li>
<li><strong>Entity markup'i ihmal etmek:</strong> Schema markup olmadan AI motorlari markanizi dogru taniyamaz ve yanlis bilgiler uretebilir.</li>
<li><strong>E-E-A-T sinyallerini goz ardi etmek:</strong> Yazar bilgisi olmayan, kaynak gostermeyen icerikler hem Google hem AI motorlarinda dusuk guvenilirlik algisi yaratir.</li>
<li><strong>Knowledge graph'i pasif birakmak:</strong> Wikidata kaydi, tutarli NAP bilgileri ve sosyal profil baglantilari olmadan knowledge graph'ta gorunmek zordu.</li>
<li><strong>Tek seferlik yapilandirma:</strong> AI ekosistemi hizla degisiyor. Bot listeleri, politikalar ve stratejiler duzenli olarak guncellenmelidir.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<ul>
<li>AI motorlarinda markaniz kaynak olarak gosterilir</li>
<li>Knowledge graph'ta guclui marka temsili saglanir</li>
<li>AI botlari uzerinde tam kontrol elde edilir</li>
<li>E-E-A-T sinyalleri ile otorite algisi gucllenir</li>
<li>Rakiplere kiyasla AI referanslarinda avantaj</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>AI bot yonetimi, entity markup ve knowledge graph stratejisi, yapay zeka motorlarinin calisma mekanizmalarini derinlemesine anlmayi gerektiren uzmanlk alanlaridir. Yanlis bot yapilandirmasi icerik kontrolunu kaybettirir, eksik entity markup ise yanlis AI referanslarina yol acar. Profesyonel bir ekip, bu karmasik ekosistemi anlar, dogru stratejileri uygular ve surekli degisen AI yapisina uyum saglar.</p>
</article>`,
    icon: 'bot',
    features: [
      'AI bot yonetimi (GPTBot, ClaudeBot, Google-Extended, PerplexityBot)',
      'robots.txt AI ozel kurallari',
      'Entity markup ve Organization schema',
      'Knowledge graph strateji plani',
      'E-E-A-T sinyalleri guclendirme',
      'AI egitim verisi kontrolu (TDMRep)',
      'Person ve Product schema implementasyonu',
      'Marka otorite profili olusturma',
      'Wikidata ve Wikipedia strateji',
      'AI referans izleme ve raporlama',
    ],
    deliverables: [
      'robots.txt AI Bot Kurallari',
      'Entity Schema Implementasyonu (Organization, Person, Product)',
      'Knowledge Graph Strateji Dokumani',
      'AI Bot Izleme Raporu',
      'Marka Otorite Plani',
      'E-E-A-T Guclendirme Checklist',
      'TDMRep Yapilandirmasi',
      'Wikidata Kayit Kilavuzu',
      'AI Referans Takip Raporu',
      'Bot Trafik Analiz Raporu',
    ],
    process: [
      { step: 1, title: 'Bot Trafik Analizi', description: 'Mevcut AI bot trafigi, tarama sikligi ve indeksleme durumu analiz edilir.' },
      { step: 2, title: 'Strateji Belirleme', description: 'Bot izin/engel politikasi, entity stratejisi ve knowledge graph yol haritasi olusturulur.' },
      { step: 3, title: 'Teknik Uygulama', description: 'robots.txt kurallari, entity schema markup ve TDMRep yapilandirmasi uygulanir.' },
      { step: 4, title: 'E-E-A-T Iyilestirme', description: 'Yazar profilleri, kaynak referanslari ve guvenilirlik sinyalleri guclendirilir.' },
      { step: 5, title: 'Knowledge Graph Calismasi', description: 'Wikidata, sosyal profiller ve NAP tutarliligi ile knowledge graph sinyalleri olusturulur.' },
      { step: 6, title: 'Izleme ve Raporlama', description: 'AI motorlarindaki referanslar, bot trafigi ve entity gorunurlugu duzenli takip edilir.' },
    ],
    metrics: [
      { label: 'AI Referans', value: 'Aktif', description: 'AI motorlarinda markaniz kaynak olarak gosterilir.' },
      { label: 'Marka Otoritesi', value: '2x', description: 'Knowledge graph sayesinde otorite algisi 2 kat guclenir.' },
      { label: 'Bot Kontrolu', value: '%100', description: 'AI botlari uzerinde tam kontrol saglanir.' },
      { label: 'E-E-A-T Skoru', value: 'Guclu', description: 'Tum E-E-A-T sinyalleri optimize edilir.' },
      { label: 'Entity Gorunurlugu', value: '2.5x', description: 'Entity markup ile knowledge graph gorunurlugu artar.' },
    ],
    relatedServices: ['geo', 'seo', 'guvenlik'],
    faq: [
      { question: 'AIO ve LLMO arasindaki fark nedir?', answer: 'AIO (AI Optimization) genel olarak yapay zeka optimizasyonunu kapsar. LLMO (Large Language Model Optimization) ise spesifik olarak buyuk dil modelleri (ChatGPT, Claude, Gemini) icin optimize etmeyi ifade eder. Pratikte ikisi birlikte uygulanir.' },
      { question: 'AI botlarini neden engellemeliyim?', answer: 'Her zaman engellemek gerekmez. Ancak ozel icerikler (premium icerik, API dokumanlar, admin sayfalari) AI egitim verisinde kullanilmamalidir. Secici izin/engel politikasi ile kontrol saglanir.' },
      { question: 'Knowledge graph\'a nasil girilir?', answer: 'Tutarli entity markup (Organization, Person schema), Wikidata kaydi, Wikipedia sayfasi (varsa), sosyal profil baglantilari, Google My Business ve otorite kaynakllarindaki referanslar knowledge graph sinyallerini guclendirir.' },
      { question: 'E-E-A-T nedir?', answer: 'Experience (Deneyim), Expertise (Uzmanlik), Authoritativeness (Otorite), Trustworthiness (Guvenilirlik) — Google\'in icerik kalitesini degerlendirmek icin kullandigi temel kriterlerdir. AI motorlari da bu sinyalleri referans seciminde kullanir.' },
      { question: 'GPTBot\'u engellesem ChatGPT\'de gorunmez miyim?', answer: 'GPTBot\'u engellemek, OpenAI\'in gelecekteki egitim verisinde icerigizi kullanmasini onler. Ancak hali hazirda egitilmis modeldeki bilgileri etkilemez. ChatGPT Search icin ise tarama erisimi gereklidir.' },
      { question: 'Entity markup ne kadar etkili?', answer: 'Entity markup kullanan siteler, knowledge graph\'ta 2.5 kat daha fazla gorunur. AI motorlari yapilandirilmis veriyi dogrudan kullandigi icin, dogru entity tanivlama AI referanslarinda kritik onem tasir.' },
      { question: 'TDMRep nedir?', answer: 'Text and Data Mining Reservation Protocol, icerik sahiplerinin AI egitim verisi kullanimini kontrol etmesini saglayan bir standarttir. HTTP headerlari veya meta etiketleri ile icerik kullanim izinlerinizi belirlersiniz.' },
      { question: 'Bu calisma GEO (Faz 7) ile nasil iliskili?', answer: 'GEO, AI arama gorunurlugu icin icerik optimizasyonu yapar. AIO/LLMO ise bir ust katmanda bot kontrolu, entity tanimlama ve otorite guclendirme yapar. Ikisi birlikte AI ekosisteminde kapsamli bir varlik saglar.' },
    ],
  },

  // =========================================================================
  // Phase 9 — Analitik & Performans
  // =========================================================================
  {
    id: 'service-09',
    slug: 'analitik-performans',
    phaseNumber: 9,
    title: 'Analitik & Performans — GA4 Dashboard, CWV ve Sayfa Hizi',
    shortTitle: 'Analitik & Performans',
    shortDescription:
      'Sitenizin performansini zirveye tasiyin. GA4 ozel dashboard, Core Web Vitals optimizasyonu ve %50 sayfa hizi artisi.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>Analitik & Performans hizmeti, web sitenizin hizini, kullanici deneyimini ve olculebilirligini zirveye tasiyan kapsamli bir optimizasyon calismaidir. GA4 ozel event takibi, conversion funnel analizi, Core Web Vitals (LCP, INP, CLS) optimizasyonu, gorsel/font/JavaScript optimizasyonu ve sunucu performans iyilestirmelerini icerir.</p>
<p>Hiz, modern web'in en kritik metrgidir. Google arastirmasina gore sayfa yukleme suresi 1 saniyeden 3 saniyeye ciktiginda bounce rate %32, 5 saniyeye ciktiginda %90 artar. Her 100ms'lik hiz iyilestirmesi, e-ticaret sitelerinde donusum oranini %1 arttirir (Deloitte arastirmasi). Core Web Vitals, Google'in siralama faktoru olarak dogrudan kullanilmaktadir.</p>
<p>Bu fazda "olcemeyen optimize edemez" prensibiyle hem performans metriklerini olcum altina aliyor hem de somut iyilestirmeler uyguluyoruz.</p>

<h2>Neden Performans Kritik?</h2>
<ul>
<li>Sayfa yukleme suresi 1sn'den 3sn'ye ciktiginda bounce rate %32 artar (Google)</li>
<li>Her 100ms hiz iyilestirmesi, donusum oranini %1 arttirir (Deloitte)</li>
<li>Core Web Vitals, Google siralama faktorudur</li>
<li>Mobil kullanicilarin %53'u 3 saniyeden uzun yuklenen siteleri terk eder</li>
<li>Performansli siteler reklam kalite puanini arttirir, CPC'yi dusurur</li>
</ul>

<h2>Detayli Calisma Kapsami</h2>

<h3>GA4 Custom Events ve Conversion Funnels</h3>
<p>GA4'te is hedeflerinize ozel olaylar (events) tanimlayarak kullanici davranislarini granular sekilde takip ediyoruz. Exploration raporlari ile ozel funnel analizleri olusturuyor, kullanicilarin nerede kayboldugunuzu tespit ediyoruz. Path exploration ile kullanici yolculugunu goruntuliyoruz. Cohort analizi ile kullanici segmentlerinin davranislarini zaman icinde izliyoruz.</p>

<h3>Core Web Vitals Optimizasyonu</h3>
<p>Uc temel metrik uzerinde calisiyoruz:</p>
<ul>
<li><strong>LCP (Largest Contentful Paint) &lt; 2.5 saniye:</strong> Sayfanin ana iceriginin yuklenme suresi. Hero gorsel optimizasyonu, sunucu yanit suresi, render-blocking kaynaklarin eliminasyonu ile iyilestiirilir.</li>
<li><strong>INP (Interaction to Next Paint) &lt; 200ms:</strong> Kullanicinin etkilesimine verilen yanit suresi. JavaScript optimizasyonu, main thread bloklama azaltma, web worker kullanimi ile iyilestirilir.</li>
<li><strong>CLS (Cumulative Layout Shift) &lt; 0.1:</strong> Gorsel kayma orani. Gorsel boyut tanimlama, font yukleme stratejisi, dinamik icerik alanlari icin alan ayirma ile duzeltilir.</li>
</ul>

<h3>Gorsel Optimizasyonu</h3>
<p>Web sitelerinde sayfa boyutunun ortalama %50'sini gorseller olusturur. WebP/AVIF format donusumu, responsive gorseller (<code>srcset</code> ve <code>sizes</code>), lazy loading (ekran disindaki gorsellerin geciktirilmsi), gorsel CDN kullanimi ve gorsel sikiostirma (kayipsiz/kayipli) ile gorsel boyutunu %70-80 azaltiyoruz.</p>

<h3>Font Optimizasyonu</h3>
<p>Font dosyalari genellikle gereksiz yere buyuktur. Font subsetting (sadece kullanilan karakterleri icerme), WOFF2 format, <code>font-display: swap</code> (metin gorunurlugu onceliklendirme), preload ile kritik fontlarin erken yuklenmesi ve font fallback stratejisi ile font kaynaakli performans sorunlarini ortadan kaldiriyoruz.</p>

<h3>JavaScript Optimizasyonu</h3>
<p>Bundle analizi ile gereksiz buyuk paketleri tespit ediyoruz. Code splitting ile sayfaya ozel kod yukleme, tree shaking ile kullanilmayan kodun cikarilmasi, dynamic import ile lazy loading ve web worker ile agir hesaplamalarin ana thread'den ayrilmasi uyguluyoruz. Bundle boyutunu ortalama %40 azaltiyoruz.</p>

<h3>CDN ve Caching Stratejisi</h3>
<p>Statik varliklar (gorseller, CSS, JS) icin CDN yapilandirmasi, tarayici cache politikasi (Cache-Control headerlari), service worker ile offline destek ve sunucu tarafli caching (edge caching) stratejisi olusturuyoruz.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>Gorsellere boyut tanimlamamak:</strong> <code>width</code> ve <code>height</code> attribute'lari olmayan gorseller CLS sorununa neden olur. Tarayici gorselin boyutunu bilemediginden sayfa kayar.</li>
<li><strong>Render-blocking CSS/JS:</strong> Critical CSS ayirmadan tum stil dosyasini yuklmek, ilk boyama (First Paint) suresini uzatir. Critical CSS inline edilmeli, gerisi defer/async ile yuklenmelidir.</li>
<li><strong>Uguncu parti script kaosuyuu:</strong> Kontrolsuz eklenen chat widget'lari, analitik araclari ve reklam scriptleri birbirini bloklar. GTM ile yonetilmeli ve onceliklenndirilmelidir.</li>
<li><strong>Sadece Lighthouse skoruna odaklanmak:</strong> Lab verileri (Lighthouse) ile saha verileri (CrUX) farkli olabilir. Gercek kullanici verileri (RUM) ile dogrulama yapilmalidir.</li>
<li><strong>Font dosyasini optimize etmemek:</strong> 500KB'lik bir font dosyasi, LCP'yi tek basina bozabilir. Subset, WOFF2 ve preload zorunludur.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<ul>
<li>LCP 2.5 saniyenin altina duser</li>
<li>INP 200ms altina optimize edilir</li>
<li>CLS 0.1 altina duser</li>
<li>Genel sayfa yukleme hizinda %50 iyilesme</li>
<li>Bundle boyutunda %40 azalma</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>Performans optimizasyonu, darbogazlari tespit etmek icin derin teknik analiz gerektiren cok katmanli bir suerecctir. Gorsel, font, JavaScript, CSS, sunucu yanit suresi ve ucuncu parti scriptler birbirleriyle etkilesir. Bir alandaki iyilestirme, baska bir alanda regresyon yaratabilir. Profesyonel bir ekip, tum bu katmanlari birlikte analiz eder, onceliklendirir ve bir butun olarak optimize eder.</p>
</article>`,
    icon: 'gauge',
    features: [
      'GA4 custom event yapilandirmasi ve conversion funnel',
      'Core Web Vitals (LCP, CLS, INP) optimizasyonu',
      'Gorsel optimizasyonu (WebP/AVIF, lazy loading, srcset)',
      'Font optimizasyonu (subset, preload, swap)',
      'JavaScript bundle analizi ve code splitting',
      'CDN ve caching stratejisi',
      'Performans butcesi tanimlama',
      'Ucuncu parti script yonetimi ve onceliklendirme',
      'Critical CSS cikarma ve inline uygulama',
      'Real User Monitoring (RUM) kurulumu',
    ],
    deliverables: [
      'GA4 Ozel Dashboard ve Funnel Raporu',
      'Performans Audit Raporu (Before/After)',
      'Core Web Vitals Optimizasyon Plani',
      'Bundle Analiz Raporu',
      'Performans Butcesi Dokumani',
      'Gorsel Optimizasyon Raporu',
      'Font Optimizasyon Raporu',
      'CDN ve Cache Strateji Dokumani',
      'Ucuncu Parti Script Envanteri',
      'Aylik Performans Izleme Rapor Sablonu',
    ],
    process: [
      { step: 1, title: 'Performans Olcumu', description: 'Lighthouse, WebPageTest ve CrUX ile mevcut performans metrikleri detayli olarak olculur.' },
      { step: 2, title: 'Darbogaz Analizi', description: 'LCP, INP ve CLS sorunlarinin kook nedenleri tespit edilir, bundle ve network analizi yapilir.' },
      { step: 3, title: 'Gorsel ve Font Optimizasyonu', description: 'Gorseller WebP/AVIF\'e donusturulur, fontlar subset edilir, lazy loading uygulanir.' },
      { step: 4, title: 'Kod Optimizasyonu', description: 'JS bundle code splitting, tree shaking, critical CSS cikarma ve async yukleme uygulanir.' },
      { step: 5, title: 'Sunucu ve CDN', description: 'CDN yapilandirmasi, cache politikasi ve sunucu yanit suresi optimizasyonu yapilir.' },
      { step: 6, title: 'Izleme ve Raporlama', description: 'RUM kurulur, GA4 dashboard yapilandirilir, performans surekli izlenir.' },
    ],
    metrics: [
      { label: 'LCP', value: '<2.5sn', description: 'Largest Contentful Paint 2.5 saniyenin altina duser.' },
      { label: 'INP', value: '<200ms', description: 'Interaction to Next Paint 200ms altina optimize edilir.' },
      { label: 'CLS', value: '<0.1', description: 'Cumulative Layout Shift 0.1 altina duser.' },
      { label: 'Sayfa Hizi Artisi', value: '%50', description: 'Genel sayfa yukleme hizinda %50 iyilesme saglanir.' },
      { label: 'Bundle Boyut Azalmasi', value: '%40', description: 'JavaScript bundle boyutunda %40 azalma.' },
    ],
    relatedServices: ['seo', 'sem', 'ux-temelleri'],
    faq: [
      { question: 'Core Web Vitals neden bu kadar onemli?', answer: 'Core Web Vitals, Google\'in siralama algoritmassinda dogrudan kullanilan kullanici deneyimi metrikleridir. "Iyi" seviyesindeki siteler, siralamal avantaji elde eder. Ayrica kullanici memnuniyeti ve donusum oranini dogrudan etkiler.' },
      { question: 'LCP nasil iyilestirilir?', answer: 'Sunucu yanit suresini azaltma (TTFB), render-blocking kaynaklari eliminasyonu, hero gorsel optimizasyonu (boyut, format, preload), critical CSS inline etme ve CDN kullanimi LCP\'yi iyilestiren temel tekniklerdir.' },
      { question: 'WebP ve AVIF arasindaki fark nedir?', answer: 'Her ikisi de modern gorsel formatlaridir. WebP, JPEG\'e gore %30 daha kucuktur ve genis tarayici destegine sahiptir. AVIF, WebP\'den de %20 daha kucuktur ancak tarayici destegi daha sinirlidir. Biz her iki formati fallback ile birlikte kullaniyoruz.' },
      { question: 'Lazy loading ne demek?', answer: 'Lazy loading, kullanicinin goruntumedigi iceriklerin (ekran disindaki gorseller, videolar) sayfa yuklendikce degil, kullanici o bolgeye kaydirdikca yuklenmesini saglar. Bu, ilk sayfa yukleme hizini onemli olcude iyilestirir.' },
      { question: 'Performans butcesi nedir?', answer: 'Performans butcesi, sitenizin kabul edilebilir performans sinirlarini tanimlar. Ornegin: "Toplam JS boyutu 300KB\'yi asmayacak", "LCP 2.5 saniyeyi gecmeyecek". Bu buthce, gelistirme surecinde performans regresyonlarini onler.' },
      { question: 'Lab verileri ve saha verileri farkli mi?', answer: 'Evet. Lab verileri (Lighthouse) kontrollii ortamda olculur. Saha verileri (CrUX, RUM) gercek kullanicilardan gelir ve farkli cihaz, ag ve lokasyonlari yansitir. Her ikisi de onemlidir, ancak Google siralama icin saha verilerini kullanir.' },
      { question: 'Ucuncu parti scriptler performansi ne kadar etkiler?', answer: 'Cok buyuk etkiler. Chat widget\'lari, analitik araclari, reklam scriptleri ve sosyal medya eklentileri toplam sayfa boyutunun %30-50\'sine kadar cikvabilir. GTM ile kontrolluu yukleme ve onceliklendirme zorunludur.' },
      { question: 'Performans optimizasyonu SEO\'yu etkiler mi?', answer: 'Evet, dogrudan. Core Web Vitals bir siralama faktorudur. Ayrica hizli siteler daha dusuk bounce rate, daha yuksek session suresi ve daha fazla sayfa goruntuuleme saglar — bunlarin hepsi dolaylu siralama sinyalleridir.' },
    ],
  },

  // =========================================================================
  // Phase 10 — Guvenlik
  // =========================================================================
  {
    id: 'service-10',
    slug: 'guvenlik',
    phaseNumber: 10,
    title: 'Guvenlik — CSP, HSTS, Security Headers ve Sizma Testi',
    shortTitle: 'Guvenlik',
    shortDescription:
      'Sitenizi siber tehditlere karsi zirhlayinn. Security headers, XSS/CSRF korumasi ve sizma testi ile A+ guvenlik notu alin.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>Web guvenlik hizmeti, sitenizi siber saldirilara karsi koruyan cok katmanli bir savunma sistemi kurulmasini kapsar. Content-Security-Policy (CSP), HTTP Strict Transport Security (HSTS), X-Frame-Options, Permissions-Policy gibi guvenlik basliklarinin yapilandirilmasi, XSS ve CSRF korumasi, rate limiting, input sanitization ve bagimsiz sizma testi (penetration test) icerir.</p>
<p>Siber saldirilar her yil %38 artmaktadir (Check Point arastirmasi). Kucuk ve orta olcekli isletmelerin %43'u siber saldiri hedefi olmakta ve bunlarin %60'i saldiridan sonraki 6 ay icinde kapanmaktadir. Bir guvenlik ihlali, sadece teknik hasaar degil, marka itibar kaybi, musteri guven erimesi ve yasal yaptirimlara yol acar.</p>
<p>Bu fazda sitenizi bilinen tum yaygim saldirilara karsi zirhliyoruz ve bagimsiz bir sizma testi ile guvenliginizi dogruluyoruz.</p>

<h2>Neden Guvenlik Kritik?</h2>
<ul>
<li>Siber saldirilar yillik %38 artis gosteriyor</li>
<li>Kucuk isletmelerin %43'u siber saldiri hedefi oluyor</li>
<li>Bir veri ihlalinin ortalama maliyeti 4.45 milyon dolar (IBM arastirmasi)</li>
<li>Tuketicilerin %86'si veri ihlali yasayan sirketlerle is yapamaktan kacinir</li>
<li>Google, guvensiz siteleri (HTTP, mixed content) arama sonuclarinda cezalandirir</li>
</ul>

<h2>Detayli Calisma Kapsami</h2>

<h3>Content-Security-Policy (CSP)</h3>
<p>CSP, sayfanizda hangi kaynaklarin yuklenebilecegini kontrol eden en guclu guvenlik basligidir. Script-src, style-src, img-src, connect-src gibi direktiflerle her kaynak turunun nereden yuklenebilecegini tanimliyoruz. Dogru CSP, XSS saldirilarinan en etkili savunmasidir. Ornek:</p>
<blockquote>
<code>Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:</code>
</blockquote>
<p>CSP yapilandirilmasi dikkatli yapilmalidir — cok kislitlayici bir politika sitenin islevselligini bozabilir. Biz report-only modda baslayip, hatalari temizledikten sonra enforcement moduna geciyoruz.</p>

<h3>HSTS (HTTP Strict Transport Security)</h3>
<p>HSTS, tarayicilara sitenize her zaman HTTPS uzerinden baglanmaclari talimatini verir. SSL stripping saldirilarini onler. <code>max-age</code>, <code>includeSubDomains</code> ve <code>preload</code> parametreleriyle yapilandirilir. HSTS preload listesine kayit ile tarayicillar sitenize HTTP denemesi bile yapmaz.</p>

<h3>Diger Guvenlik Basliklari</h3>
<p><code>X-Frame-Options: DENY</code> clickjacking saldirilarini onler. <code>X-Content-Type-Options: nosniff</code> MIME type sniffing'i engeller. <code>Permissions-Policy</code> tarayici API erisimleerini (kamera, mikrofon, geolocation) kontrol eder. <code>Referrer-Policy</code> referrer bilgisi sizintisini onler. Tum bu basliklar birlikte A+ guvenlik notu elde etmenizi saglar.</p>

<h3>XSS ve CSRF Korumasi</h3>
<p>XSS (Cross-Site Scripting): Kullanici girdilerinin sanitize edilmesi, CSP ile inline script engelleme, HttpOnly cookie kullanimi. CSRF (Cross-Site Request Forgery): CSRF token implementasyonu, SameSite cookie attribute, origin dogrulama. Her iki saldiri turu icin cok katmanli savunma uyguluyoruz.</p>

<h3>Rate Limiting ve DDoS Korumasi</h3>
<p>API endpoint'leri ve form submission'lari icin rate limiting kuruyoruz. Login denemelerinde progresif gecikme (progressive delay) uyguluyoruz. DDoS korumasi icin CDN seviyesinde (Cloudflare, Vercel) onlemler yapilandiriyoruz.</p>

<h3>Sizma Testi (Penetration Test)</h3>
<p>Tum guvenlik onlemleri uygulandiktan sonra, bagimsiz bir sizma testi ile sitenizin guvenligini dogruluyoruz. OWASP Top 10 kategorilerinde testler yapilir: injection, broken authentication, sensitive data exposure, security misconfiguration ve diger yaygiin zafiyetler kontrol edilir.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>HTTPS'i yeterli sanmak:</strong> SSL sertifikasi tek basina guvenlik degildir. Security headers, input validation ve sizma testi olmadan site hala savunmasizdir.</li>
<li><strong>CSP'yi atlmak:</strong> "Cok karisik" diye CSP yapilandirmamaak, en guclu savunma katmanindan vazgecmek demektir. Report-only modda baslayarak kademeli gecis yapilabilir.</li>
<li><strong>Tum cerezleri HttpOnly yapmamak:</strong> Session cerezleri HttpOnly ve Secure flag'lari ile korunmalidlir. Aksi halde XSS ile cerez calinti mumkundur.</li>
<li><strong>Input validation'i client-side'da yapmak:</strong> Client-side validasyon kullanici deneyimi icindir. Guvenlik icin server-side validation zorunludur — client-side bypass edilebilir.</li>
<li><strong>Guvenlik testini ihmal etmek:</strong> "Biz onlem aldik" yetmez. Bagimsiz sizma testi ile tum onlemlerin etkililgi dogrulanmalidir.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<ul>
<li>SecurityHeaders.com ve Mozilla Observatory'de A+ derece</li>
<li>Bilinen tum guvenlik aciklari kapatilir</li>
<li>Yayginn saldiri turlerine karsi %99.9 koruma</li>
<li>OWASP Top 10 zafiyetlerine karsi savunma</li>
<li>Bagimsiz sizma testi onay raporu</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>Web guvenligi, surekli gelisen tehditllerle mücadele gerektiren uzmanlk alanidir. CSP yapilandirmasi sitenin islevselligini bozmadan yapilmalidir. Rate limiting cok siki olursa normal kullanicilari etkiler, cok gevsek olursa islevi kalmaz. Sizma testi, saldirgan perspektifinden dusunmeyi gerektirir. Profesyonel bir guvenlik ekibi, tum bu dengeleri saaglr ve sitenizi gercek tehditlere karsi korur.</p>
</article>`,
    icon: 'lock',
    features: [
      'Content Security Policy (CSP) yapilandirmasi',
      'HSTS (HTTP Strict Transport Security) ve preload',
      'X-Frame-Options ve X-Content-Type-Options',
      'Rate limiting ve DDoS korumasi',
      'XSS ve CSRF korumasi',
      'SQL Injection onleme kontrolleri',
      'Guvenlik basliklari (security headers) optimizasyonu',
      'Cookie guvenlik flag\'lari (HttpOnly, Secure, SameSite)',
      'Permissions-Policy ve Referrer-Policy',
      'Bagimsiz sizma testi (OWASP Top 10)',
    ],
    deliverables: [
      'Security Headers Yapilandirmasi',
      'Guvenlik Audit Raporu',
      'Sizma Testi (Penetrasyon) Raporu',
      'Guvenlik Politikasi Dokumani',
      'Zafiyet Duzeltme Plani',
      'CSP Policy Dokumani',
      'Rate Limiting Yapilandirmasi',
      'Cookie Guvenlik Raporu',
      'OWASP Top 10 Kontrol Listesi',
      'Guvenlik Bakim ve Izleme Plani',
    ],
    process: [
      { step: 1, title: 'Guvenlik Taramasi', description: 'Otomatik ve manuel guvenlik taramasi yapilir, mevcut zafiyetler ve eksik basliklar tespit edilir.' },
      { step: 2, title: 'Risk Degerlendirmesi', description: 'Bulunan zafiyetler risk seviyesine (kritik/yuksek/orta/dusuk) gore siniflandirilir ve onceliklendirilir.' },
      { step: 3, title: 'Header Yapilandirmasi', description: 'CSP (report-only ile baslayarak), HSTS, X-Frame-Options ve diger guvenlik basliklari yapilandirilir.' },
      { step: 4, title: 'Koruma Katmanlari', description: 'XSS/CSRF korumasi, rate limiting, input sanitization ve cookie guvenlik flaglari uygulanir.' },
      { step: 5, title: 'Sizma Testi', description: 'OWASP Top 10 kategorilerinde bagimsiz sizma testi gerceklestirilir, bulgular raporlanir.' },
      { step: 6, title: 'Dogrulama ve Devir', description: 'Tum onlemler SecurityHeaders.com ve Observatory ile dogrulanir, bakim plani olusturulur.' },
    ],
    metrics: [
      { label: 'Guvenlik Notu', value: 'A+', description: 'SecurityHeaders.com ve Mozilla Observatory\'de A+ derece.' },
      { label: 'Guvenlik Acigi', value: '0', description: 'Bilinen tum guvenlik aciklari kapatilir.' },
      { label: 'Saldiri Direnci', value: '%99.9', description: 'Yaygin saldiri turlerine karsi %99.9 koruma.' },
      { label: 'OWASP Uyum', value: 'Top 10', description: 'OWASP Top 10 tum kategorilerinde koruma saglanir.' },
      { label: 'Sizma Testi', value: 'Basarili', description: 'Bagimsiz sizma testinden basariyla gecis.' },
    ],
    relatedServices: ['yasal-uyumluluk', 'aio-llmo', 'analitik-performans'],
    faq: [
      { question: 'CSP nedir ve neden onemlidir?', answer: 'Content-Security-Policy, sayfanizda hangi kaynaklarin yuklenebilecegini kontrol eden HTTP basligidir. XSS saldirilarinin en etkili savunmasidir. Hangi alan adlarinden script, stil, gorsel ve font yuklenebilecegini belirler.' },
      { question: 'HSTS preload ne demek?', answer: 'HSTS preload, sitenizin tarayicilara gommulu listesine eklenmesidir. Bu sayede tarayici, kullanici ilk kez bile ziyaret etse HTTPS kullanir. SSL stripping saldirilarini tamamen onler.' },
      { question: 'Security headers testi nasil yapilir?', answer: 'securityheaders.com veya Mozilla Observatory (observatory.mozilla.org) sitelerinde URL\'nizi girerek aninda test edebilirsiniz. A+ notu, tum guvenlik basliklarinin dogru yapillandirildigini gosterir.' },
      { question: 'XSS ve CSRF arasindaki fark nedir?', answer: 'XSS (Cross-Site Scripting): Saldirgann sitenize zararli script enjekte etmesidir. CSRF (Cross-Site Request Forgery): Kullanicinin farkinda olmadan istenmeyen islemler (para transferi, sifre degisikligi) yaptrilmasidir. Ikisi farkli saldiri turleridir ve farkli savunmalar gerektirir.' },
      { question: 'Rate limiting kullanicilari etkiler mi?', answer: 'Dogru yapilandirilmis rate limiting normal kullanicilari etkilemez. Ornegin: Login icin 5 deneme/dakika, API icin 100 istek/dakika gibi makul sinirlar belirlenir. Siniri asan istekler gecici olarak engellenir.' },
      { question: 'Sizma testi ne siklikla yapilmalidir?', answer: 'Yilda en az bir kez ve buyuk degisikliklerden (yeni ozellik, altyapi degisikligi) sonra yapilmalidir. Surekli guvenlik izleme (continuous security monitoring) ile aradaki donemde de koruma saglanir.' },
      { question: 'SSL sertifikasi yeterli degil mi?', answer: 'SSL/TLS sadece veri aktarimini sifireler. XSS, CSRF, clickjacking, MIME sniffing gibi saldirilara karsi koruma saglamaz. SSL, guvenligin ilk adamidir ama tek basina yetersizdir.' },
      { question: 'Mevcut sitemdeki guvenlik aciklari nasil tespit edilir?', answer: 'Otomatik tarama araclari (OWASP ZAP, Burp Suite), security header tesleri ve manuel kod incelemesi ile tespit edilerek raporlanir. Sizma testi ile gercek saldiri senaryolari simule edilir.' },
    ],
  },

  // =========================================================================
  // Phase 11 — UX Temelleri
  // =========================================================================
  {
    id: 'service-11',
    slug: 'ux-temelleri',
    phaseNumber: 11,
    title: 'UX Temelleri — Hata Sayfalari, Loading States ve Form Validasyon',
    shortTitle: 'UX Temelleri',
    shortDescription:
      'Kullanici deneyimini mukemmellestirin. Hata sayfalari, loading states, breadcrumb ve form validasyon ile bounce rate\'i %35 dusurun.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>UX Temelleri hizmeti, kullanicilarin web sitenizle her etkilesim noktasinda olumlu bir deneyim yasamasini saglayan temel kullanici deneyimi bilesennlerinin tasarlanmasi ve gelistirilmesini kapsar. Profesyonel hata sayfalari, anlamli loading skeleton'lar, breadcrumb navigasyonu, akilli form validasyonu, responsive tasarim optimizasyonu ve micro-interaction'lar bu calismanin icindedir.</p>
<p>Nielsen Norman Group arastirmasina gore, kullanicilarin %88'i kotu bir deneyimden sonra bir web sitesine geri donmuyor. Hata sayfalarinda yardimci olmayan mesajlar, yukleme sirasinda bos ekranlar, karisik formlar ve mobilde bozuk gorunum — bu "kucuk" sorunlar biriktiginde devasa kullanici kaybi yaratir.</p>
<p>Bu fazda tum bu detaylari profesyonelce ele aliyor, kullanicilarinin sitenizdee gecirdigi sureyi artiriyor, hayal kirykligilni azaltiyor ve donusum oranini yukseltiyoruz.</p>

<h2>Neden UX Temelleri Kritik?</h2>
<ul>
<li>Kullanicilarin %88'i kotu deneyimden sonra siteye geri donmuyor (NNGroup)</li>
<li>Her 1 dolar UX yatirimi, 100 dolar getiri sagliyoor (Forrester)</li>
<li>Akilli form validasyonu, form tamamlama oranini %22 arttirir</li>
<li>Loading skeleton kullanan siteler, bos ekrana gore %15 daha dusuk bounce rate goruyor</li>
<li>Breadcrumb navigasyonu, kullanicilaarin sitede %20 daha uzun kalmassini sagliyor</li>
</ul>

<h2>Detayli Calisma Kapsami</h2>

<h3>Profesyonel 404 ve 500 Hata Sayfalari</h3>
<p>Varsayilan tarayici hata sayfalari, kullaniciyi tamamen kaybeder. Profesyonel bir 404 sayfasi sunlari icermelidir: net ve samimi hata mesaji ("Aradiginiz sayfa bulunamadi"), arama kutusu, populer sayfa linkleri, ana sayfaya donus butonu ve markaniza uygun tasarim. 500 sayfasi ise kullaniciyi bilgilendirmeli ("Bir sorun olustu, ekibimiz calisiiyor") ve alternatif iletisim kanallarini sunmalidir.</p>

<h3>Loading States ve Skeleton Bilesenleri</h3>
<p>Veri yuklenirken bos bir ekran gostermek yerine, iceriginn yapisini taklit eden skeleton (iskelet) bilesenleri kullanmak, algllanan bekleme suresini %30 azaltir. Her sayfa tipi icin ozel skeleton tasarliypuruz: tablo skeletonu, kart skeletonu, form skeletonu, liste skeletonu. Ayrica spinner, progress bar ve icerik placeholder kullanim senaryolarini tanimliyoruz.</p>

<h3>Breadcrumb Navigasyonu</h3>
<p>Breadcrumb (ekmek kirintisi) navigasyonu, kullanicinin sitedeki konumunu gosterir ve ust sayfalara hizla donme imkani sunar. SEO icin de degerlidir: Google, breadcrumb'lari arama sonuclarinda gosterebilir. BreadcrumbList schema markup ile birlikte uygulanir. Ornek: Ana Sayfa > Hizmetler > SEO Optimizasyonu</p>

<h3>Akilli Form Validasyonu</h3>
<p>Inline (real-time) form validasyonu, kullanicinin hatasini aninda goremesini saglar — form gonderiminden sonra degil. Her alan icin: gerektilgilnde aninda hata mesaji (kirmizi border + hata metni), basarili doldurulldugunda onay (yesil check), net ve yardimci hata mesajlari ("E-posta adresi gecersiz" yerine "Lutfen gecerli bir e-posta adresi girin, ornek: ad@domain.com"). Formda progress indicator ve autofill/autocomplete destegi de eklenir.</p>

<h3>Responsive Tasarim Optimizasyonu</h3>
<p>Mobile-first yaklasimla tum sayfalarin farkli ekran boyutlarinda mukemmel gorunmesini sagliyoruz. Breakpoint'ler: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px). Touch-friendly hedef boyutlari (minimum 44x44px), mobilde gizlenen/gosterilen elementler ve responsive gorsel/tipografi stratejisi uygulanir.</p>

<h3>Micro-Interaction ve Geri Bildirim</h3>
<p>Buton hover/active/disabled durumlari, form basarili gonderim animasyonu, toast bildirimler (sonner), scroll-to-top butonu, back-to-top smooth scroll, tooltip ve popover kullanimi, focus visible gostergeleri — tum bu mikro etkilesimler, sitenin "canli" ve "profesyonel" hissettirmesini saglar.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>Hata sayfasini tasarlamamak:</strong> Varsayilan tarayici 404 sayfasi, kullaniciyi tamamen kaybettirir. Her 404 sayfasi, kullaniciyi siteye geri kazanmak icin bir firsattir.</li>
<li><strong>Bos yukleme ekrani gostermek:</strong> Veri yuklenirken tamamen bos beyaz ekran, kullanicida "site bozuldu" algisi yaratir. Skeleton bilesenleri bu sorunu coezer.</li>
<li><strong>Form hatalarini sadece gonderim sonrasi gostermek:</strong> 10 alanli bir formu doldurup gonderdikten sonra "3 hata var" mesaji gormek hayal kirikligi yaratir. Real-time validasyon zorunludur.</li>
<li><strong>Mobili sonradan dusunmek:</strong> Trafigin %60+'i mobilden gelir. Mobile-first yaklasim, tasarim surecinin basindan beri uygulanmalidir.</li>
<li><strong>Toast/bildirim tutarsizligi:</strong> Farkli sayfalarda farkli bildirim stili kullanmak, profesyonellik algisini zedeler. Tutarli bir bildirim sistemi kurulmalidir.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<ul>
<li>Bounce rate'de %35 azalma</li>
<li>Session suresinde %20 artis</li>
<li>Form tamamlama oraninda %90 ustu</li>
<li>404 sayfasindan site icine geri donus oraninda %60+ artis</li>
<li>Mobil kullanici memnuniyetinde belirgin iyilesme</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>UX detaylari "basit" gorunur ancak dogru uygulanmasi tasarim, gelistirme ve kullanici psikolojisi bilgisi gerektirir. Bir skeleton bileseni gorsel olarak dogru olmalidir ama performansi da olumsuz etkillememelidir. Form validasyonu hem islevsel hem erisilebilir olmalidir. Responsive tasarim yuzlerce cihaz-tarayici kombinasyonunda test edilmelidir. Profesyonel bir ekip, tum bu detaylari bir arada ve tutarli sekilde uygular.</p>
</article>`,
    icon: 'layout',
    features: [
      'Profesyonel 404 ve 500 hata sayfalari',
      'Loading states ve skeleton bilesenleri',
      'Breadcrumb navigasyonu (Schema markup dahil)',
      'Akilli form validasyonu (real-time, inline)',
      'Responsive tasarim optimizasyonu (mobile-first)',
      'Micro-interaction ve geri bildirim animasyonlari',
      'Tutarli bosluk ve hiyerarsi sistemi',
      'Toast bildirim sistemi (sonner)',
      'Scroll-to-top ve smooth scroll',
      'Touch-friendly hedef boyutlari (44x44px)',
    ],
    deliverables: [
      'UX Audit Raporu',
      'Profesyonel Hata Sayfalari (404, 500)',
      'Loading Skeleton Bilesenn Seti',
      'Form Validasyon Sablonlari',
      'Responsive Test Raporu (tum breakpointler)',
      'UX Iyilestirme Rehberi',
      'Breadcrumb Implementasyonu + Schema',
      'Micro-Interaction Kilavuzu',
      'Bildirim Sistemi Standartlari',
      'Mobil UX Kontrol Listesi',
    ],
    process: [
      { step: 1, title: 'UX Audit', description: 'Kullanici yolculugu ve mevcut UX sorunlari analiz edilir, kullanici test verileri incelenir.' },
      { step: 2, title: 'Onceliklendirme', description: 'UX sorunlari kullanici etkisi ve is degeri bazinda onceliklendirilir.' },
      { step: 3, title: 'Tasarim', description: 'Hata sayfalari, skeleton bilesenleri, form sablonlari ve micro-interaction\'lar tasarlanir.' },
      { step: 4, title: 'Gelistirme', description: 'Tum UX iyilestirmeleri gelistirilir, responsive testler yapilir.' },
      { step: 5, title: 'Kullanici Testi', description: 'Gercek kullanicilarla test edilerek geri bildirim toplanir, ince ayarlar yapilir.' },
      { step: 6, title: 'Dokumantasyon', description: 'UX standartlari dokumante edilir, ekibinize rehberlik saglannir.' },
    ],
    metrics: [
      { label: 'Bounce Rate Dususu', value: '%35', description: 'Kullanici deneyimi iyilestirmesi ile bounce rate %35 azalir.' },
      { label: 'Session Suresi Artisi', value: '%20', description: 'Kullanicilar sitede %20 daha uzun vakit gecirir.' },
      { label: 'Form Tamamlama', value: '%90+', description: 'Akilli validasyon ile form tamamlama orani %90 uzerine cikar.' },
      { label: '404 Geri Donus', value: '%60+', description: 'Profesyonel 404 sayfasindan site icine geri donus orani.' },
      { label: 'Mobil Memnuniyet', value: '%85+', description: 'Responsive optimizasyon ile mobil kullanici memnuniyeti.' },
    ],
    relatedServices: ['tema-gorsel', 'erisilebilirlik', 'analitik-performans'],
    faq: [
      { question: '404 hata sayfasi neden onemli?', answer: 'Kullanicilar gecersiz URL\'lere ulastiginda (kirik link, yanlis yazim, silinen sayfa) 404 sayfasini gorur. Profesyonel bir 404 sayfasi, kullaniciyi siteye geri kazanir. Arama kutusu, populer sayfa linkleri ve ana sayfaya donus butonu ile kaybi minimize eder.' },
      { question: 'Skeleton loading nedir?', answer: 'Skeleton (iskelet) loading, veri yuklenirken iceriginn yapisini taklit eden gri placeholder bilesenleridir. Kullaniciya "icerik geliyor" mesajini verir ve algilanan bekleme suresini %30 azaltir. Bos beyaz ekrandan cok daha iyi bir deneyim sunar.' },
      { question: 'Inline form validasyonu nasil calisir?', answer: 'Kullanici bir form alanini doldururken veya alandan ayrildiginda (blur), aninda dogrulama yapilir. Hatali alanlarda kirmizi border ve aciklayici hata mesaji, dogru alanlarda yesil onay gosterilir. Kullanici hatalarrini aninda gorur ve duzeltir.' },
      { question: 'Breadcrumb SEO\'yu nasil etkiler?', answer: 'BreadcrumbList schema markup ile Google, arama sonuclarinda sayfa URL\'si yerine breadcrumb yolunu gosterebilir (Ana Sayfa > Hizmetler > SEO). Bu, kullanici icin daha anlamli bir gorunum sunar ve CTR\'yi arttirir.' },
      { question: 'Mobile-first tasarim ne demek?', answer: 'Once mobil deneyim tasarlanir, sonra tablet ve masaustune genisletilir. Trafigin %60+\'i mobilden gelir. Mobile-first yaklasim, mobil kullanicilarin oncelikli oldugunu kabul eder ve responsive tasarimin temelin olusturur.' },
      { question: 'Micro-interaction nedir?', answer: 'Buton hover efekti, form gonderim animasyonu, toggle switch hareketi gibi kucuk gorsel geri bildirimlerdir. Tek baslarina onemsiz gorunseler de, topluca sitenin "profesyonel ve canli" hissettirmesini saglar.' },
      { question: 'Toast bildirimleri ne ise yarar?', answer: 'Toast, kullaniciya kisa sureli geri bildirim mesajlari gosteren kucuk bildirim kutularidir. "Kaydedildi", "Hata olustu", "Kopyalandi" gibi mesajlar icin kullanilir. Sonner gibi kutuphanelerle tutarli ve animasyonlu bildirimler saglanir.' },
      { question: 'UX calismasi mevcut tasarimi degistirir mi?', answer: 'Mevcut tasarimin gorsel kimligini korur, eksik UX elemanlarini ekler ve sorunlu noktalari duzeltir. Radikal bir tasarim degisikligi degil, mevcut deneyimin profesyonellestirilmesidir.' },
    ],
  },

  // =========================================================================
  // Phase 12 — Sosyal & Iletisim
  // =========================================================================
  {
    id: 'service-12',
    slug: 'sosyal-iletisim',
    phaseNumber: 12,
    title: 'Sosyal & Iletisim — OG Image, Social Cards, Paylasim ve Canli Destek',
    shortTitle: 'Sosyal & Iletisim',
    shortDescription:
      'Sosyal medya varliginizi guclendirin. OG image, social cards, paylasim butonlari ve canli destek ile etkilesimi %45 artirin.',
    longDescription: `<article>
<h2>Bu Hizmet Nedir?</h2>
<p>Sosyal & Iletisim hizmeti, web sitenizin sosyal medya platformlarindaki gorunumunu, paylasim potansiyelini ve kullanici iletisim kanallarini optimize eden kapsamli bir calismadir. Dinamik OG image generator, platform bazli social card optimizasyonu, akilli paylasim butonlari, profesyonel iletisim formu ve canli destek widget entegrasyonunu icerir.</p>
<p>Iceriginniz sosyal medyada paylasildiginda ilk izlenim, OG (Open Graph) image ve meta bilgileriyle olusur. Gorselsiz veya genel bir gorsel ile paylasilan icerik, profesyonel bir OG image ile paylasilan icerge kiyasla %80 daha az tiklama alir. Bu fazda, her paylaimin goersel olarak etkileyici ve platform kurallarinda uyumlu olmasini sagliyoruz.</p>
<p>Ayni zamanda kullanicilarinizin sizinle kolayca iletisime gecmesini saglamak — profesyonel iletisim formu, canli destek ve sosyal medya entegrasyonu — musteriy kazanma ve elde tutma icin kritiktir.</p>

<h2>Neden Sosyal & Iletisim Kritik?</h2>
<ul>
<li>OG image'li paylasimlar, gorselsiz olanlara gore %80 daha fazla tiklama aliyor</li>
<li>Sosyal medya paylassinlari, en guclu organik buyume kanallari arasinda</li>
<li>Tuketicilerin %42'si canli destek sunan sitelerde alisverisi tamamliyor (Kayako)</li>
<li>Profesyonel iletisim formu, e-posta adresini acik birakmmaya gore %3x daha fazla basvuru getiriyor</li>
<li>Twitter Card ile yapilan paylasimlar, standrart linklere gore %40 daha fazla etkilesim aliyor</li>
</ul>

<h2>Detayli Calisma Kapsami</h2>

<h3>Dinamik OG Image Generator</h3>
<p>Her sayfa icin otomatik olarak ozel OG image ureten bir sistem kuruyoruz. Sayfa basliggi, marka logosu, arka plan ve aksan renkleri dinamik olarak birlestirilerek 1200x630px boyutunda profesyonel gorseller uretilir. Next.js'in <code>ImageResponse</code> API'si veya benzeri araclarla sunucu tarafinda real-time olusturulur. Blog yazilari, urun sayfalari ve hizmet sayfalari icin farkli sablonllar tanimlanir.</p>

<h3>Platform Bazli Social Card Optimizasyonu</h3>
<p>Her sosyal medya platformunun farkli gorsel boyut ve format gereksinimleri vardir:</p>
<ul>
<li><strong>Facebook/LinkedIn:</strong> og:image (1200x630px), og:title (60-90 karakter), og:description (155-200 karakter)</li>
<li><strong>Twitter:</strong> twitter:card (summary_large_image), twitter:image (min 300x157px)</li>
<li><strong>WhatsApp/Telegram:</strong> og:image ve og:description onizleme icin kullanilir</li>
<li><strong>Pinterest:</strong> 2:3 oran (1000x1500px) dik gorsel tercih edilir</li>
</ul>
<p>Her platform icin meta taglari optimize ediliyor, onizleme testleri yapiliyor ve debugging araclariyla dogrulanyior.</p>

<h3>Akilli Paylasim Butonlari</h3>
<p>Web Share API destegi olan cihazlarda native paylasim dialogu, desteklemeyen cihazlarda ozel paylasim butonlari gosteriyoruz. Butonlar: Facebook, Twitter/X, LinkedIn, WhatsApp, Telegram, E-posta ve link kopyalama. Her buton, platformuna ozel paylasim URL'si olusturur ve UTM parametreleri ile izlenebilirlik saglar. Kayan (floating) veya icerik altinda sabit konumlandirma secenekleri sunulur.</p>

<h3>Profesyonel Iletisim Formu</h3>
<p>Spam korumalii, erisilebilir ve kullanici dostu bir iletisim formu gelistiriyoruz. Ozellikler: honeypot alanlar (bot tespiti icin gorunmez alanlar), rate limiting (flood korumasi), real-time validasyon, dosya yukleme destegi, basarili gonderim animasyonu ve e-posta bildirimi. reCAPTCHA veya hCaptcha tercih edilebilir ancak kullanici deneyimini olumsuz etkilemeyecek sekilde uygulanir.</p>

<h3>Canli Destek Widget Entegrasyonu</h3>
<p>Crisp, Tawk.to, Intercom veya benzeri canli destek araclariyla kullanicillarinizin aninda yardim almasini sagliyoruz. Widget yapilandirmasi: calisma saatleri (aktif/pasif mod), otomatik karsilama mesaji, departman yonlendirmesi, mobil uyumlu gorunum ve performans optimizasyonu (lazy loading ile widget yukleme).</p>

<h3>E-posta Bulten Abonelik Sistemi</h3>
<p>Mailchimp, ConvertKit veya Resend gibi platformlaarla entegre, cift onaylii (double opt-in) e-posta abonelik sistemi kuruyoruz. Abonelik formu: newsletter pop-up zamanlama stratejisi, exit-intent tetikleyici, minimal form (sadece e-posta), GDPR uyumlu onay kutucugu.</p>

<h2>Sik Yapilan Hatalar</h2>
<ol>
<li><strong>OG image tanimlamammak:</strong> Gorselsiz sosyal paylasimlar, tiklama oranini %80 dusurur. Her sayfanin OG image'i olmalidir.</li>
<li><strong>Tek boyut gorsel kullanmak:</strong> Facebook ve Twitter farkli gorsel boyutlari gerektirir. Tek gorsel, bazi platformlarda kesilir veya bozuk gorunur.</li>
<li><strong>Spam filtresiz iletisim formu:</strong> Honeypot veya CAPTCHA olmayan formlar, gunluk yuzlerce spam e-posta alir ve gercek basvurular kaybolur.</li>
<li><strong>Canli destek widget'ini optimize etmemek:</strong> Chat widget'i eager loading (aninda yukleme) ile eklendiginde sayfa performansini ciddi sekilde etkiler. Lazy loading zorunludur.</li>
<li><strong>Sosyal medya meta taglarini test etmemek:</strong> Facebook Sharing Debugger ve Twitter Card Validator ile test edilmeyen meta taglar, onizlemede beklenmedik sorunlar yaratir.</li>
</ol>

<h2>Beklenen Sonuclar ve Metrikler</h2>
<ul>
<li>Sosyal medya paylasimlarinda %45 artis</li>
<li>Iletisim basvurularinda %30 artis</li>
<li>Sosyal paylasim tiklama orani 2 katina cikar</li>
<li>Canli destek ile musteri memnuniyetinde artis</li>
<li>E-posta abone listesinde organik buyume</li>
</ul>

<h2>Neden Profesyonel Destek Gerekli?</h2>
<p>OG image generator kurulumu, platform bazli meta tag optimizasyonu, spam korumaali form gelistirme ve canli destek entegrasyonu farkli teknik beceriler gerektiren disiplinler arasi bir calismadir. Her platformun kendi kurallari, boyutlari ve sinirlamalari vardir. Profesyonel bir ekip, tum platformlarda tutarli ve etkileyici bir gorunum saglar, iletisim kanallarini guvenlii bir sekilde kurar ve performansi olumsuz etkilemeycek entegrasyonlar yapar.</p>
</article>`,
    icon: 'share-2',
    features: [
      'Dinamik OG image generator',
      'Platform bazli social card optimizasyonu (FB, Twitter, LinkedIn, WhatsApp)',
      'Akilli paylasim butonlari (native share API + fallback)',
      'Profesyonel iletisim formu (honeypot spam korumaali)',
      'Canli destek (chat) widget entegrasyonu',
      'Social media meta tag optimizasyonu',
      'E-posta bulten abonelik sistemi',
      'Sosyal medya onizleme debugging',
      'UTM entegreli paylasim linkleri',
      'Exit-intent pop-up stratejisi',
    ],
    deliverables: [
      'OG Image Sablon Sistemi',
      'Social Media Meta Tag Seti',
      'Iletisim Formu Komponenti',
      'Canli Destek Widget Entegrasyonu',
      'Paylasim Butonlari Seti',
      'E-posta Abonelik Formu',
      'Platform Onizleme Test Raporu',
      'Social Media Kit (boyut rehberi)',
      'UTM Paylasim Sablon Seti',
      'Spam Korluma Yapilandirmasi',
    ],
    process: [
      { step: 1, title: 'Strateji ve Analiz', description: 'Sosyal medya hedefleri, platform oncelikleri ve iletisim gereksinimleri belirlenir, rakip sosyal gorunumleri incelenir.' },
      { step: 2, title: 'OG Image Tasarimi', description: 'OG image sablonlari tasarlanir, dinamik generator sistemi kurulur, tum sayfalar icin test edilir.' },
      { step: 3, title: 'Meta Tag ve Social Card', description: 'Platform bazli meta taglar optimize edilir, Facebook Debugger ve Twitter Validator ile dogrulanir.' },
      { step: 4, title: 'Iletisim ve Destek', description: 'Iletisim formu (spam korumaali), canli destek widget\'i ve paylasim butonlari gelistirilir.' },
      { step: 5, title: 'Abonelik ve Entegrasyon', description: 'E-posta abonelik sistemi kurulur, sosyal medya widget\'lari entegre edilir.' },
      { step: 6, title: 'Platform Testleri', description: 'Tum platformlarda paylasim onizlemeleri test edilir, debugging yapilir, son optimizasyonlar uygulanir.' },
    ],
    metrics: [
      { label: 'Sosyal Paylasim Artisi', value: '%45', description: 'OG image ve paylasim butonlari ile paylasimlar %45 artar.' },
      { label: 'Iletisim Artisi', value: '%30', description: 'Profesyonel form ve chat ile iletisim basvurulari %30 artar.' },
      { label: 'Tiklama Orani', value: '2x', description: 'Optimized social cards ile paylasim tiklama orani 2 katina cikar.' },
      { label: 'Spam Engelleme', value: '%99', description: 'Honeypot ve rate limiting ile spam %99 engellenir.' },
      { label: 'Widget Performans Etkisi', value: '<100ms', description: 'Lazy loading ile chat widget performans etkisi minimize edilir.' },
    ],
    relatedServices: ['seo', 'sem', 'ux-temelleri'],
    faq: [
      { question: 'OG image nedir?', answer: 'Open Graph image, sayfaniz sosyal medyada paylasildiginda gosterilen gorseldir. 1200x630px boyutunda, sayfa basligini ve markanizi yansitan profesyonel bir gorsel, tiklama oranini dramatik sekilde arttirir.' },
      { question: 'Dinamik OG image nasil calisir?', answer: 'Sunucu tarafinda, sayfa basligii, logo ve renk paleti kullanilarak her sayfa icin otomatik gorsel uretilir. Blog yazilari, urun sayfalari ve hizmet sayfalari icin farkli sablonlar kullanilir. Manual gorsel olusturma gereksinimi ortadan kalkar.' },
      { question: 'Hangi sosyal medya platformlari icin optimize edilir?', answer: 'Facebook, Twitter/X, LinkedIn, WhatsApp, Telegram ve Pinterest icin optimize ediyoruz. Her platformun farkli gorsel boyut ve meta tag gereksinimleri vardir; tum platformlarda mukemmel onizleme saglanir.' },
      { question: 'Honeypot spam korumasi nedir?', answer: 'Formda bot\'lar icin gorunur ancak gercek kullanicilar icin gorunmez bir alan eklenir. Bot\'lar tum alanlari doldurdugu icin honeypot alani dolu gelen gonderimler otomatik olarak reddedilir. Kullanici deneyimini hic etkilemez.' },
      { question: 'Canli destek widget\'i performansi etkiler mi?', answer: 'Evet, eager loading ile eklenen chat widget\'lari sayfa boyutunu 200-500KB artirabilir. Biz lazy loading ile widget\'i kullanicii etkilesime gectiginde veya belirli bir sure sonra yukliyor, performans etkisini minimize ediyoruz.' },
      { question: 'Web Share API nedir?', answer: 'Tarayicinin yerel paylasim dialogunu acan bir JavaScript API\'sidir. Mobilde kullanicini telefonunda yukluu tum uygulamalari (WhatsApp, SMS, e-posta vb.) gosterir. Desteklenmeyen tarayicilarda ozel paylasim butonlarina fallback yapilir.' },
      { question: 'Social media debugging nasil yapilir?', answer: 'Facebook Sharing Debugger, Twitter Card Validator ve LinkedIn Post Inspector araclariyla meta taglarin dogru okunup okunmadigini, gorsellerin dogru boyutlaa gosterilip gosterilmedigini ve onizlemenin beklenen gibi gorunupp gorunmedigini test ederiz.' },
      { question: 'E-posta abonelik sistemi GDPR uyumlu mu?', answer: 'Evet. Cift onayli (double opt-in) sistem kuruluyor: kullanici abone olduktan sonra e-posta ile onay llinki alir. Ayrica acik riza onay kutucugu, abonelik iptal linki ve veri isleme bilgilendirmesi eklenir.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const SERVICES_FAQ: ServiceFaq[] = [
  {
    question: 'Optimizasyon programi ne kadar surer?',
    answer:
      'Projenizin kapsamina bagli olarak ortalama 4-8 hafta surer. Tek fazli projeler 1 haftada tamamlanabilirken, 12 fazli tam program genellikle 8-12 haftada teslim edilir.',
  },
  {
    question: 'Tek bir faz satin alabilir miyim?',
    answer:
      'Evet, her faz bagimsiz olarak satin alinabilir. Ihtiyaciniza gore tek bir faz veya birden fazla fazi birlikte secebilirsiniz. Paket alimlaarda ozel indirimler uygulanir.',
  },
  {
    question: 'Mevcut sitemde degisiklik yapilir mi?',
    answer:
      'Evet, mevcut sitenizin yapisi korunarak optimizasyonlar uygulanir. Hicbir islevsellik kaybi yasanmaz; aksine mevcut yapi guclendirilir ve iyilestirilir.',
  },
  {
    question: 'Hangi platformlari destekliyorsunuz?',
    answer:
      'Wix, WordPress, Next.js, Shopify, custom kodlanmis siteler ve daha fazlasi. Platform fark etmeksizin web standartlarina uygun her siteye hizmet veriyoruz.',
  },
  {
    question: 'Garanti var mi?',
    answer:
      '30 gun memnuniyet garantisi sunuyoruz. Belirlenen hedeflere ulasilamazsa, ek ucret almadan duzeltme calismasi yapiyoruz.',
  },
  {
    question: 'Raporlama nasil yapiliyor?',
    answer:
      'Haftalik ilerleme raporu, faz sonu detayli analiz raporu ve canli dashboard erisimi sunuyoruz. Tum metrikler seffaf ve olculebilir sekilde raporlanir.',
  },
  {
    question: 'Destek suresi nedir?',
    answer:
      'Her faz tamamlandiktan sonra 3 ay ucretsiz teknik destek sagliyoruz. Bu surede sorularinizi yanitlar, kucuk duzeltmeleri ucretsiz yapariz.',
  },
  {
    question: 'Odeme nasil yapiliyor?',
    answer:
      'Faz bazli veya paket odemeler kabul ediyoruz. Kredi karti, banka havalesi ve taksitli odeme secenekleri mevcuttur. Buyuk projeler icin ozel odeme plani olusturulabilir.',
  },
  {
    question: 'Ekibiniz kimlerden olusuyor?',
    answer:
      'SEO uzmanlari, full-stack gelistiriciler, UI/UX tasarimcilari ve dijital pazarlama stratejistlerinden olusan multidisipliner bir ekibiz. Her faz kendi alaninda uzman kisiler tarafindan yurutulur.',
  },
  {
    question: 'Baslamak icin ne gerekiyor?',
    answer:
      'Sadece ucretsiz bir danismanlik gorusmesi yeterli. Sitenizi analiz eder, ihtiyaclarinizi belirler ve size ozel bir optimizasyon plani sunariz. Herhangi bir taahhut gerektirmez.',
  },
]

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export const SERVICES_STATS: ServiceStat[] = [
  { label: 'Tamamlanan Proje', value: '150', suffix: '+' },
  { label: 'Musteri Memnuniyeti', value: '98', suffix: '%' },
  { label: 'Ortalama Trafik Artisi', value: '40', suffix: '%' },
  { label: 'Ortalama Hiz Iyilesmesi', value: '55', suffix: '%' },
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
