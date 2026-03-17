wixId: "adee66b5-66b4-4559-b15e-1e2c91b0f24d"
---
title: "Schema Markup Nedir? 2025'te Yapısal Veri Rehberi"
slug: "schema-markup-yapisal-veri-rehberi"
focusKeyword: "schema markup nedir"
seoTitle: "Schema Markup Nedir? 2025'te Yapısal Veri Rehberi | Blakfy"
metaDesc: "Schema markup nedir, nasıl uygulanır? Rich result istatistikleri, 2025'te kaldırılan schema türleri, AI arama optimizasyonu ve adım adım uygulama rehberi."
excerpt: "Tüm web sayfalarının yalnızca %30'u schema markup kullanıyor. Rich result'lar standart sonuçlara göre %58 daha fazla tıklama alıyor. Fırsatın büyüklüğü bu rakamda gizli."
categories: ["teknik-seo"]
tags: ["seo", "core-web-vitals"]
imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&h=900&fit=crop"
imageAlt: "Schema markup yapısal veri SEO teknik optimizasyon"
language: "tr"
status: "published"
---
Tüm web sayfalarının yalnızca %30'u schema markup kullanıyor. 62 milyondan fazla domain yapısal veri uygulamış ama bu rakam hâlâ web'in küçük bir azınlığı. Rich result alan sayfalar, standart sonuçlara göre %58 daha fazla tıklama alıyor. Ürün schema'sı olan e-ticaret sayfaları %74,1 CTR artışı yaşıyor. Bu veriler tek bir şeyi söylüyor: rakiplerin çoğu henüz schema uygulamadı — erken hareket etmek doğrudan rekabet avantajı.

## Schema Markup Nedir?

Schema markup, web sayfanızdaki içeriği arama motorlarının ve yapay zeka platformlarının anlayabileceği makine diline çeviren yapısal veridir. Schema.org sözlüğünü kullanır — Google, Bing, Yandex ve Yahoo'nun ortaklaşa geliştirdiği standart.

Örnek: Bir ürün sayfanızda fiyat bilgisi var. Google bu metni görüyor ama bunun bir ürün fiyatı mı, yoksa başka bir sayısal veri mi olduğunu her zaman kesin bilemez. Schema markup, "bu 299 TL rakamı bu ürünün fiyatıdır, stokta mevcut, marka şu" diye Google'a açıkça söylüyor. Sonuç: arama sonuçlarında fiyat, stok durumu ve yıldız puanı görünüyor.

JSON-LD formatı kullan. Google'ın tek önerdiği format bu. HTML'den bağımsız bir `<script>` bloğunda yer alıyor — sayfanın görsel yapısına dokunmadan ekleniyor, bakımı kolay.

## 2025 İstatistikleri: Schema Markup'ın SEO Etkisi

Soyut fayda değil, somut rakamlar:

- Rich result alan sayfalar **%58 CTR** alırken, standart sonuçlar **%41 CTR** alıyor
- Ürün + stok + puan schema kombinasyonu **+%74,1 CTR artışı**
- Article schema ile Top Stories'e giren sayfalar **+%178 daha fazla tıklama/gösterim**
- BreadcrumbList schema tarama bütçesi israfını **%19,3 azaltıyor**
- FAQPage schema olan sayfalar Google AI Overviews'da **3,2 kat daha fazla** görünüyor
- Schema markup olan sayfalar AI Overviews alıntılarında **3,1 kat daha yüksek** oran

**Gerçek marka verileri:** Nestlé, rich result'a giren sayfalarında %82 daha yüksek CTR raporladı. Rotten Tomatoes yapısal veri olan sayfalarda %25 CTR artışı gördü. Eventbrite, Event schema uygulamasından sonra trafiğini iki katına çıkardı.

## Sayfa Türüne Göre Hangi Schema Kullanılmalı?

Her sayfa türünün schema ihtiyacı farklı. Karışıklık olmadan şema seç:

**Ana sayfa:** `Organization` + `SiteLinksSearchBox`
- Organization: marka kimliği, iletişim, logo, sosyal profiller
- SiteLinksSearchBox: arama çubuğunu doğrudan SERP'e taşır

**Blog yazısı:** `Article` + `Author` + `BreadcrumbList`
- Article: başlık, yayın tarihi, yazar, yayıncı
- Author: yazar biyografisi ve profil bağlantısı — E-E-A-T için kritik
- BreadcrumbList: navigasyon yolunu SERP'te gösterir

**Ürün sayfası:** `Product` + `Offer` + `AggregateRating`
- Product: ürün adı, açıklama, görsel, marka, SKU, GTIN
- Offer: fiyat, para birimi, stok durumu, geçerlilik tarihi
- AggregateRating: yıldız puanı ve yorum sayısı — SERP'te görünür

**FAQ bölümü olan sayfa:** `FAQPage`
- Soru-cevap formatı AI aramalar için değerli

**Etkinlik sayfası:** `Event`
- Tarih, lokasyon, bilet bilgisi Google arama sonuçlarında görünür

**Video içerik:** `VideoObject`
- Video carousel'da görünürlük, indeksleme hızı 4,2 kat artıyor

**Yerel işletme:** `LocalBusiness`
- Google Haritalar ve yerel pakette görünürlük için kritik

## 2025'te Kaldırılan Schema Türleri

Önemli güncelleme: Google 2025'te bazı schema türlerini emekliye aldı. Bunları kod içinde bırakmak Search Console hatasına yol açıyor.

**Artık desteklenmeyen veya kısıtlanan türler:**
- **FAQPage rich results** — Yalnızca hükümet ve sağlık siteleri için rich result gösteriliyor. Diğer siteler için görsel çıktı yok ama AI faydası devam ediyor
- **HowTo rich results** — Artık yalnızca masaüstünde gösteriliyor, mobilde kaldırıldı
- **Speakable Schema** — Resmi olarak deprecated
- **Practice Problems, Nutrition Facts, Nearby Offers** — Kaldırıldı

Bu türleri kullanan sayfaları güncelle. Deprecated markup Search Console'da hata üretmeye devam ediyor.

## Adım Adım Uygulama

### Adım 1: JSON-LD Kodu Yaz

Organization schema örneği:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Firma Adı",
  "url": "https://www.firmaadi.com",
  "logo": "https://www.firmaadi.com/logo.png",
  "sameAs": [
    "https://www.instagram.com/firmaadi",
    "https://www.linkedin.com/company/firmaadi"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-xxx-xxx-xxxx",
    "contactType": "customer service"
  }
}
</script>
```

Article schema için zorunlu alanlar: `headline` (maks. 110 karakter), `image` (min. 1200px genişlik), `datePublished` (ISO 8601 formatında), `author`, `publisher`.

Product schema için zorunlu alanlar: `name`, `image`, `description`, `brand`, `offers` (fiyat + stok durumu) ve `aggregateRating` ya da `review`.

### Adım 2: WordPress Plugin ile Otomatize Et

Rank Math, WooCommerce ve blog sayfaları için otomatik schema oluşturuyor. Yoast SEO de temel schema üretiyor. İkisini aynı anda kullanma — çakışan markup üretiyor.

Önemli: Plugin otomatik temel markup üretiyor ama `sameAs`, `author` profil bağlantıları ve marka GTIN gibi alanlara manuel müdahale gerekiyor.

### Adım 3: Test Et

**Google Rich Results Test** (`search.google.com/test/rich-results`) — sayfanın hangi rich result türlerine uygun olduğunu önizle.

**Schema Markup Validator** (`validator.schema.org`) — JSON-LD sözdizimini doğrula.

**Google Search Console** — Enhancements bölümü canlı hataları ve uyarıları takip et. Schema uygulamasından sonra düzenli kontrol et.

### Adım 4: Sonuçları İzle

Google'ın rich result göstermesi 1-4 hafta sürebiliyor. CTR değişimini Search Console'daki Arama Sonuçları raporuyla takip et. Rich result'a giren sayfaların CTR'ı artıyorsa schema doğru çalışıyor.

## Schema Markup ve AI Aramaları

2025'te schema'nın önemi yeni bir boyut kazandı. Google ve Microsoft, SMX 2025 konferansında schema markup'ın yapay zeka özellikleri için doğrudan kullanıldığını açıkça doğruladı.

FAQPage schema olan sayfalar Google AI Overviews'da 3,2 kat daha fazla görünüyor. Alıntılanan sayfaların %61'inde 3 veya daha fazla schema türü mevcut. Article + FAQ kombinasyonu AI özetleri için en güçlü sinyal.

Türkiye için önemli: Türkiye ChatGPT kullanımında global ortalamanın ~10 puan üzerinde. ChatGPT'nin schema okuma yöntemi özetleme kalitesini direkt etkiliyor — düzgün yapılandırılmış içerik alıntılanma şansını artırıyor.

`SameAs` property'si özellikle değerli: Organization schema'da Wikipedia, Wikidata ve sosyal medya profillerine bağlantı vererek Google Knowledge Graph'a kayıt yaptırıyorsun. Organization schema olan siteler Knowledge Panel kazanmada 3,7 kat daha başarılı.

## Sık Yapılan 5 Hata

**1. Gizli içeriği işaretlemek:** Schema yalnızca kullanıcının gördüğü içeriği yansıtmalı. Gizli veya yanlış bilgi içeren schema doğrudan Google cezası alır.

**2. Zorunlu alanları eksik bırakmak:** Product schema'da `name` ve (`review` VEYA `aggregateRating` VEYA `offers`) zorunlu. Eksik alan rich result'ı engeller.

**3. Çift markup:** İki farklı plugin veya tema + plugin kombinasyonu aynı anda schema üretince çakışma oluyor. Tek kaynaktan yönet.

**4. Deprecated schema bırakmak:** 2025'te kaldırılan türler Search Console hatası ve sayfa şişmesi üretiyor.

**5. İçerik güncellenince schema güncellememek:** Eski fiyat veya tarih bilgisi rich result kaybına neden oluyor. İçerik güncellemelerinde schema'yı da kontrol et.

## Sık Sorulan Sorular

### Schema markup sıralamayı doğrudan etkiler mi?

Doğrudan sıralama faktörü değil. Ama CTR artışı, AI arama görünürlüğü ve zengin snippet'ler dolaylı olarak sıralamayı etkiliyor. E-ticaret için dönüşüm oranına direkt etkisi var.

### JSON-LD mı, Microdata mı kullanmalıyım?

JSON-LD. Google'ın tek önerdiği format bu. Microdata hata oranı yüksek, bakımı güç. Eğer hâlâ Microdata kullanıyorsan JSON-LD'ye geçmeye öncelik ver.

### FAQ schema hâlâ değerli mi?

Rich result çıktısı kısıtlandı ama AI arama değeri devam ediyor. FAQPage schema olan sayfalar AI Overviews'da 3,2 kat daha fazla görünüyor. Gerçek SSS bölümleri olan sayfalar için uygulamaya devam et.

### Schema markup uyguladıktan ne kadar sürede rich result görünür?

1-4 hafta. Google'ın sayfayı yeniden crawl etmesi ve schema'yı işlemesi gerekiyor. Sitemap gönderimi ve URL İnceleme aracı ile crawl'u hızlandırabilirsin.

### E-ticaret siteleri için en kritik schema hangisi?

Product + Offer + AggregateRating kombinasyonu. Fiyat, stok ve yıldız puanı arama sonuçlarında görünmek satın alma kararını SERP'te başlatıyor.

## Kaynakça

- Amra & Elma: Top Schema Markup Statistics 2025 — amraandelma.com
- KeyStar Agency: Schema SEO Statistics 2024-2025 — keystaragency.com
- Schema App: What 2025 Revealed About AI Search and Schema Markup — schemaapp.com
- Google Search Central: FAQPage Structured Data — developers.google.com
- Google Search Central Blog: Changes to HowTo and FAQ Rich Results — developers.google.com
- Backlinko: Schema Markup Guide — backlinko.com
- Engage Coders: Google Retires 7 Structured Data Features — engagecoders.com
- Icecube Digital: How Schema Markup Boosts SEO in 2025 — icecubedigital.com
