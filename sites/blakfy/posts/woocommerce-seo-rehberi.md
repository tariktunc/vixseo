wixId: "fed82ff4-3299-4aaf-838d-4ce9f02c739c"
---
title: "WooCommerce SEO Rehberi 2025: E-Ticaret Mağazanı Google'da Öne Çıkar"
slug: "woocommerce-seo-rehberi"
focusKeyword: "woocommerce seo rehberi"
seoTitle: "WooCommerce SEO Rehberi 2025: E-Ticaret Mağazanı Google'da Öne Çıkar | Blakfy"
metaDesc: "WooCommerce SEO 2025 rehberi: ürün sayfası optimizasyonu, tekrar içerik sorunları, schema markup, plugin karşılaştırması ve Türkiye verileri."
excerpt: "Türkiye'de yaklaşık 48.000 site WooCommerce kullanıyor. Ama doğru SEO kurulumu olmadan bu gücün çoğu boşa gidiyor. Teknik hatalardan içerik stratejisine tam rehber."
categories: ["e-ticaret"]
tags: ["seo", "woocommerce", "e-ticaret"]
imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&h=900&fit=crop"
imageAlt: "WooCommerce e-ticaret mağaza SEO optimizasyonu"
language: "tr"
status: "published"
---
WooCommerce, küresel e-ticaret mağazalarının %33,4'ünü destekliyor — 4,5 milyonun üzerinde aktif mağaza. Türkiye'de ise yaklaşık 48.000 site WooCommerce kullanıyor. Bu rakam Shopify'ın Türkiye kurulum sayısının 12 katından fazla. Ama yaygınlık başarıyı garantilemiyor. WooCommerce'in WordPress altyapısının sağladığı esneklik, doğru kullanılmadığında düzinelerce teknik SEO sorununa dönüşebiliyor. Bu rehberde Türkiye'deki WooCommerce mağazalarının en sık yaptığı hataları ve çözümlerini anlatıyoruz.

## WooCommerce Neden SEO İçin Güçlü Bir Platform?

WooCommerce'in Shopify'a karşı en büyük avantajı kontrol. URL yapısı, site haritası, schema, robots.txt — bunların hepsini özelleştirebiliyorsun. Shopify, URL'lere zorunlu `/products/` ve `/collections/` önekleri ekliyor, site haritasını kilitliyor. WooCommerce'de bu sınırlamalar yok.

İkinci avantaj: yerel WordPress blog altyapısı. İçerik pazarlaması için WooCommerce + WordPress kombinasyonu Shopify'dan çok daha güçlü. Blog yazıları ürün sayfalarını destekliyor, kategori sayfalarına trafik çekiyor. Bu entegrasyon Shopify'da kırık.

Ama bu güç sorumluluk getiriyor. Doğru yapılandırılmamış bir WooCommerce mağazası yüzlerce tekrar içerik sayfası, binlerce gereksiz URL ve ağır plugin yükü üretiyor.

## WooCommerce'e Özgü 5 Kritik Teknik SEO Sorunu

### 1. Faceted Navigation Tekrar İçeriği

WooCommerce'in filtreleme sistemi her kombinasyon için ayrı URL üretiyor: `?renk=kirmizi&beden=M`, `?renk=mavi&beden=L` gibi. Birkaç özellik kategorisi bile yüzlerce tekrar sayfaya dönüşebilir. Google bu sayfaları tarayıp indeksleyince asıl içeriklere giden crawl bütçesi daralıyor.

Çözüm: Bu URL'leri `noindex` ile işaretle veya canonical tag ile ana kategori sayfasına yönlendir. Rank Math ve Yoast bu ayarı kategoriler bazında yapmanı sağlıyor.

### 2. `/product-category/` URL Öneki

WooCommerce'in varsayılan kategori URL yapısı şöyle: `domain.com/product-category/elektronik/`. Bu önek hem gereksiz URL derinliği ekliyor hem de kullanıcıya bilgi taşımıyor. `domain.com/elektronik/` çok daha temiz.

Rank Math'ın WooCommerce ayarlarından bu öneki tek tıkla kaldırabilirsin. Değişiklik yaparken mevcut URL'ler için 301 yönlendirme kur.

### 3. Tema Kaynaklı Schema Çakışması

"SEO dostu" diye pazarlanan birçok WooCommerce teması kendi schema markup kodunu direkt tema dosyalarına gömiyor. Plugin tabanlı schema ile çakıştığında Google Search Console'da geçersiz schema hataları dolup taşıyor. Temalar plugin'lere göre çok daha yavaş güncelleniyor — schema standartları değiştiğinde çakışmalar çıkıyor.

Kural: schema yönetimini yalnızca SEO plugin'ine bırak. Tema tabanlı schema varsa devre dışı bırak.

### 4. XML Site Haritası Kirliliği

Etiket sayfaları, boş kategori sayfaları ve filtre kombinasyonları site haritasını dolduruyor. Google düşük değerli URL'lerle dolu site haritalarını görünce sitenin genel kalitesini düşük algılıyor.

Site haritasına yalnızca ürün, kategori ve yüksek değerli blog sayfalarını dahil et. Etiket arşivleri, yazar sayfaları ve filtre URL'lerini dışarıda bırak.

### 5. Sayfa Hızı Sorunları

WooCommerce mağazalarında hız sorununun birinci nedeni hosting seçimi. Ucuz paylaşımlı hosting, ürün görsellerinin yoğun olduğu sayfalarda TTFB (Time to First Byte) değerini 600 ms'nin üzerine çıkarıyor. Bu hem kullanıcı deneyimini hem sıralamayı direkt etkiliyor.

3 saniyelik yükleme 1 saniyeye kıyasla bounce rate'i %32 artırıyor. 5 saniyede %90 artış. Türkiye'de e-ticaret trafiğinin %53,66'sı mobilden geliyor — mobil hız daha da kritik.

Minimum gereksinimler: yönetimli WordPress hosting veya VPS, Cloudflare CDN, WP Rocket önbellek, WebP görseller.

## Ürün Sayfası Optimizasyonu

Ürün sayfası WooCommerce SEO'sunun kalbi. Her ürün sayfası için:

**URL:** Kısa, anahtar kelime içeren, stop word barındırmayan. `domain.com/kirmizi-deri-ceket/` değil `domain.com/kirmizi-deri-kadin-ceket/`.

**Başlık (SEO title):** Odak anahtar kelimeyi ilk 50 karaktere al. 60 karakteri geçme.

**Meta açıklama:** 105-160 karakter, anahtar kelime içermeli, eylem çağrısı barındırmalı.

**Ürün açıklaması:** Minimum 200 kelime ve mutlaka benzersiz. Üretici açıklamasını kopyalamak site genelinde tekrar içerik sorununa yol açıyor — onlarca başka site aynı metni kullanıyorsa Google seni öne çıkarmaz.

**Görseller:** En az 4 ürün görseli, her birine açıklayıcı dosya adı ve alt text. `IMG_001.jpg` değil `kirmizi-deri-kadin-ceket-on-yuz.jpg`.

**Yorumlar:** WooCommerce yorum sistemini aktif tut. Yorumlar hem kullanıcı güveni hem aggregate rating schema için veri kaynağı.

**İlgili ürünler:** Hem kullanıcı deneyimi hem iç linkleme için değerli. Stok takibini tut — satılan ürünlerin sayfalarını kaldırmak yerine benzer ürünlere yönlendir.

## Kategori Sayfası Optimizasyonu

Kategori sayfaları WooCommerce mağazalarında en çok ihmal edilen alan. Google bu sayfaları ticari niyetin yüksek olduğu sayfalar olarak değerlendiriyor.

Sadece ürün gridi gösteren kategori sayfaları Google için ince içerik sayılıyor. Her kategoriye kısa ama alakalı bir giriş metni ekle: kategoriyi tanıt, öne çıkan özellikleri belirt, sık aranan anahtar kelimeleri doğal biçimde kullan.

Mantıklı hiyerarşi kur: `Elektronik > Telefon > Akıllı Telefon`. Çok fazla alt kategori oluşturmak yerine geniş kategoriler oluşturup filtrelemeyle yönetmek daha temiz bir crawl yapısı sağlıyor.

100'den az ürünlü kategori sayfaları genellikle ince içerik riski taşıyor — bu durumda noindex değerlendirilebilir.

## WooCommerce Schema Markup

WooCommerce ürün sayfaları için en kritik schema türleri:

**Product schema:** Fiyat, stok durumu, marka, SKU, GTIN Google arama sonuçlarında görünüyor. Envanter sekmesini düzgün doldur — SKU, barkod numarası ve stok durumu schema için veri kaynağı.

**AggregateRating schema:** Müşteri yorumları yıldız derecelendirmesi olarak arama sonuçlarında görünüyor. Gerçek yorumlar şartıyla organik tıklama oranını %5-7 artırabiliyor.

**BreadcrumbList schema:** Navigasyon yolu arama sonuçlarında gösteriliyor. Hem kullanıcı deneyimi hem sıralama sinyali.

Rank Math, WooCommerce ürün verilerini schema alanlarına otomatik çekiyor — genel ayarlar > WooCommerce bölümünden marka alanını tanımla. Önemli: mağaza arşiv sayfalarında ve kategori sayfalarında schema'yı devre dışı bırak — Google tek sayfada çoklu schema istiyor.

Schema doğrulama için: Google Rich Results Test (`search.google.com/test/rich-results`).

## Plugin Karşılaştırması

| Plugin | Avantaj | Ücret | WooCommerce Desteği |
|---|---|---|---|
| Rank Math | Ücretsiz planda güçlü, otomatik product schema | Ücretsiz / Pro $7,99/ay | Çok iyi, ayrı WooCommerce ayarları |
| Yoast SEO | En köklü, geniş topluluk | Premium $118,80/yıl + WooCommerce ek $178,80/yıl | İyi, ayrı WooCommerce eklentisi gerekiyor |
| AIOSEO | Kolay kullanım, temiz arayüz | Temel $49,60/yıl | İyi |
| SEOPress | Hafif, ajanslar için | Pro $49/yıl (1 site) | İyi |

Bütçe kısıtlıysa: Rank Math ücretsiz plan WooCommerce ihtiyaçlarının %90'ını karşılıyor. Kurumsal veya büyük mağazalar için Yoast Premium + WooCommerce eklentisi en test edilmiş çözüm.

## WooCommerce vs Shopify: SEO Açısından Hangisi?

| Kriter | WooCommerce | Shopify |
|---|---|---|
| URL özelleştirme | Tam kontrol | Kısıtlı (zorunlu önekler) |
| Site haritası kontrolü | Tam | Kilitli, otomatik |
| İçerik/blog | Güçlü WordPress entegrasyonu | Temel, sınırlı |
| Sayfa hızı (varsayılan) | Hosting'e bağlı | Shopify CDN ~309ms ortalama |
| Teknik SEO esnekliği | Maksimum | Platform kısıtlı |
| Bakım yükü | Yüksek (hosting, güvenlik, güncellemeler) | Düşük (yönetimli platform) |

Türkiye'de WooCommerce ~48.000 kurulum, Shopify ~3.750 kurulum. Yerel teknik destek, Türkçe kaynak ve entegrasyon ekosistemi WooCommerce'de çok daha güçlü.

SEO kontrolü istiyorsan ve WordPress'e yatırım yapabiliyorsan: WooCommerce. Teknik yük istemiyorsan ve hız öncelikliyse: Shopify.

## Sık Yapılan 5 Hata

**1. Üretici açıklamasını kopyalamak:** En yaygın ve en zararlı hata. Yüzlerce ürün sayfası aynı metni paylaşıyor. Her ürün için benzersiz metin şart.

**2. Kategori sayfalarını ihmal etmek:** Sadece ürün gridi = ince içerik. Giriş metni ekle, anahtar kelime hedefle.

**3. Etiket taşkınlığı:** Her ürün özelliği için etiket oluşturmak binlerce düşük değerli URL üretiyor. Etiketleri ürün kategorisi olarak kullanma.

**4. Hosting seçimi hatası:** Ucuz paylaşımlı hosting WooCommerce performansının birinci düşmanı. VPS veya yönetimli WordPress hosting zorunlu.

**5. 404 hataları biriktirmek:** Ürün silmeleri ve URL değişiklikleri 301 yönlendirmesiz yapılıyor. Birikmiş link değeri kaybolup gidiyor. Üç ayda bir 404 taraması yap.

## Sık Sorulan Sorular

### WooCommerce mağazam neden Google'da çıkmıyor?

En yaygın nedenler: tekrar içerik (üretici açıklamaları), ince kategori sayfaları, yavaş sayfa yükleme, indeksleme engelleyen robots.txt veya noindex ayarı. Google Search Console'da kapsam raporunu kontrol et.

### WooCommerce için Yoast mı Rank Math mı?

Bütçe kısıtlıysa Rank Math ücretsiz plan daha güçlü seçenek. İkisi de WooCommerce için iyi çalışıyor. İkisini aynı anda kullanma.

### Ürün açıklaması kaç kelime olmalı?

Minimum 200 kelime, tercihen 300-500 kelime. Uzunluktan önemli olan benzersizlik ve kullanıcıya fayda. Anahtar kelime yoğunluğunu %1-1,5 arasında tut.

### Kategori sayfaları noindex mi yapılmalı?

100'den az ürün içeren ve giriş metni eklenmemiş kategoriler ince içerik riski taşıyor. Ya optimize et (giriş metni + dahili linkler) ya da noindex yap.

### WooCommerce schema markup nasıl kurulur?

Rank Math veya Yoast SEO plugin'ini kur, WooCommerce entegrasyon ayarlarından product schema'yı aktif et. Envanter sekmesinde SKU ve stok durumunu doldur. Google Rich Results Test ile doğrula.

### WooCommerce hız optimizasyonu için ne gerekiyor?

Yönetimli hosting veya VPS + Cloudflare CDN + WP Rocket + görselleri WebP formatına dönüştürmek. Bu dört adım çoğu WooCommerce sitesinde LCP'yi 2,5 saniyenin altına çekiyor.

## Kaynakça

- StoreLeads: WooCommerce Market Share 2025 — storeleads.app
- WPFactory: WooCommerce Statistics 2025 — wpfactory.com
- GurmeHub: E-Commerce Platforms in Turkey — gurmehub.com
- Semrush: WooCommerce SEO Complete Guide — semrush.com
- Rank Math: WooCommerce SEO Definitive Guide — rankmath.com
- Elegant Themes: Best WooCommerce SEO Plugins 2025 — elegantthemes.com
- Prisham: Shopify vs WooCommerce SEO 2025 — prisham.com
- Google: Core Web Vitals Business Impact — web.dev
