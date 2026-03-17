wixId: "b514a339-51fc-4056-9a4e-030a279fd6f2"
---
title: "WordPress SEO Rehberi 2025: Teknik Kurulumdan İçerik Stratejisine"
slug: "wordpress-seo-rehberi"
focusKeyword: "wordpress seo rehberi"
seoTitle: "WordPress SEO Rehberi 2025: Teknik Kurulumdan İçerik Stratejisine | Blakfy"
metaDesc: "WordPress SEO 2025 rehberi: Yoast vs Rank Math karşılaştırması, Core Web Vitals düzeltmeleri, teknik SEO kontrol listesi ve Türkiye'ye özel ipuçları."
excerpt: "WordPress tüm web sitelerinin %43,5'ini destekliyor. Ama kurulum doğru yapılmazsa bu güç çalışmıyor. Teknik hatalardan içerik stratejisine tam rehber."
categories: ["teknik-seo"]
tags: ["seo", "wordpress"]
imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&h=900&fit=crop"
imageAlt: "WordPress SEO blog yazısı masaüstü çalışma"
language: "tr"
status: "published"
---
WordPress, tüm web sitelerinin %43,5'ini destekliyor — CMS pazarının %62,7'si. Her gün 10.000'den fazla yeni WordPress sitesi kuruluyor. Ama bu yaygınlık bir yanılgıya yol açıyor: "WordPress kullanıyorum, SEO otomatik gelir." Gelmiyor. WordPress sana SEO için zemin hazırlıyor; doğru kurulum ve strateji olmadan o zemin boşa gidiyor. Bu rehberde teknik hatalardan plugin seçimine, Core Web Vitals'tan içerik stratejisine kadar 2025 güncel verileriyle anlatıyoruz.

## WordPress Neden SEO İçin Güçlü Bir Temel?

WordPress'in SEO avantajı tek bir şeyden kaynaklanıyor: esneklik. Başlık etiketleri, meta açıklamalar, URL yapısı, şema işaretlemesi, XML site haritası — bunların hepsini kontrol edebiliyorsun. Hazır platformlarda (Wix, Squarespace) bu kontrolün önemli kısmı sende değil.

Ama bu esneklik aynı zamanda risk. Yanlış kurulum WordPress'i SEO için en güçlü araç olmaktan çıkarıp en büyük engele dönüştürebilir. Türkiye'deki WordPress sitelerinde gördüğümüz en büyük sorun teknik hataların aylarca fark edilmemesi — arama motoru görünürlüğü kapatılmış, robots.txt yanlış yapılandırılmış, permalink eski sistemde kalmış.

## Plugin Seçimi: Yoast SEO mi, Rank Math mı?

Bu sorunun cevabı deneyim seviyene ve ihtiyacına göre değişiyor.

### Yoast SEO

926 milyon indirme, 5 milyonun üzerinde aktif kurulum, 4,8 puan. WordPress'in en köklü SEO plugini. 2024-2025'te AI özellikleri ekledi: başlık ve meta açıklama üretimi, anahtar kelime dağılımı optimizasyonu, içerik özetleme.

2025'e özgü bir özelliği öne çıkıyor: LLMs.txt yönetimi. ChatGPT, Perplexity ve Google AI gibi yapay zeka tarayıcılarının siteni nasıl okuyacağını yönetmeni sağlıyor — GEO (Generative Engine Optimization) için kritik.

Ücretsiz planda tek odak anahtar kelime. Basit yapıya sahip, yeni başlayanlar için öğrenme eğrisi düşük.

### Rank Math

170 milyon indirme, aktif büyüyen topluluk. Ücretsiz planda 5 odak anahtar kelime, 16'dan fazla şema türü, Google Search Console entegrasyonu — Yoast'ta bunların çoğu premium. 404 monitörü, yönlendirme yöneticisi ve anlık indeksleme (Google + Bing Indexing API) ücretsiz geliyor.

İleri düzey kullanıcılar için Rank Math daha güçlü araçlar sunuyor. Modüler yapısı sayesinde kullanmadığın özellikleri kapatabiliyorsun — bu site hızı açısından önemli.

### Hangisini Seçmelisin?

- **Yeni başlıyorsan veya basit bir site yönetiyorsan:** Yoast SEO. Arayüz daha sade.
- **Çok sayfalı site, e-ticaret veya ileri SEO çalışması yapıyorsan:** Rank Math. Ücretsiz planda daha fazlasını sunuyor.
- **İkisini birlikte kullanma** — çakışıyor, performansı düşürüyor.

## Teknik SEO: Önce Bu 8 Ayarı Kontrol Et

### 1. Arama Motoru Görünürlüğü

Settings > Reading > "Arama motorlarının siteyi indekslemesini engelle" kutusu — bu kutunun işaretsiz olduğundan emin ol. Geliştirme aşamasında işaretlenen bu seçenek yayında açık bırakılıyor. Türkiye'deki sitelerde sık karşılaştığımız hata bu.

### 2. Kalıcı Bağlantı (Permalink) Yapısı

Settings > Permalinks > "Yazı adı" seç: `domain.com/yazinin-basligi/`

Varsayılan `?p=123` yapısı SEO için tamamen yetersiz. Bu değişikliği yaparken mevcut URL'lerin 301 yönlendirmesini kur — aksi hâlde eski bağlantılar 404 hatası verir.

### 3. robots.txt Yapılandırması

**Yaygın hata:** wp-content klasörünü robots.txt'te engellemek. Bu klasörde CSS, JavaScript ve görseller var. Engellediğinde Google sayfanı doğru render edemiyor, kalite sinyalleri düşüyor.

Doğru yaklaşım: sadece hassas dizinleri engelle (`/wp-admin/`, `/wp-includes/`), wp-content'i açık bırak.

### 4. SSL Sertifikası (HTTPS)

Google, HTTPS'yi 2014'ten beri sıralama sinyali olarak kullanıyor. HTTP siteler Chrome'da "Güvenli Değil" uyarısı alıyor. Bugün SSL olmayan site kabul edilemez. Really Simple SSL plugini kurulumu kolaylaştırıyor.

### 5. XML Site Haritası

Yoast veya Rank Math otomatik oluşturuyor: `domain.com/sitemap_index.xml`. Bunu Google Search Console'a gönder. Yüksek kaliteli sayfaları dahil et, düşük değerli sayfaları (etiket, kategori arşivleri, 404 sayfaları) dışarıda bırak.

### 6. Etiket ve Kategori Sayfaları

WordPress'in etiket ve kategori arşiv sayfaları çoğu durumda düşük değerli içerik üretiyor. Bunları noindex yapmazsan Google botları bu sayfalarda zaman harcıyor, asıl içeriklerine yönelmesi gereken crawl bütçesi boşa gidiyor.

İstisna: Gerçekten iyi optimize edilmiş, içeriği zengin kategori sayfaları indekslenebilir.

### 7. PHP Sürümü

Yoast ve WordPress, PHP 8.0+ öneriyor. Eski PHP sürümleri hem güvenlik açığı hem de performans kaybı. Hosting kontrol panelinden PHP sürümünü kontrol et.

### 8. llms.txt Dosyası (2025 Yeniliği)

AI arama motorları (ChatGPT, Perplexity, Google AI Overviews) sitenizi taradığında ne bulacaklarını yönetmek için llms.txt dosyası ekliyorsun. Yoast SEO ve AIOSEO bu dosyayı otomatik oluşturabiliyor. GEO (Generative Engine Optimization) açısından 2025'te kritik bir adım.

## Core Web Vitals: 2025 Güncel Eşik Değerleri

Google'ın Core Web Vitals sistemi Mart 2024'te önemli bir güncelleme aldı: FID (First Input Delay) kaldırıldı, yerine INP (Interaction to Next Paint) geldi.

### Mevcut Üç Metrik

**LCP (Largest Contentful Paint) — En Büyük İçeriğin Yüklenmesi**
- İyi: 2,5 saniye altı
- Geliştirilmeli: 2,5-4 saniye
- Kötü: 4 saniyenin üstü

**INP (Interaction to Next Paint) — Etkileşim Süresi**
- İyi: 200 milisaniye altı
- Geliştirilmeli: 200-500 ms
- Kötü: 500 ms üstü

**CLS (Cumulative Layout Shift) — Kümülatif Düzen Kayması**
- İyi: 0,1 altı
- Geliştirilmeli: 0,1-0,25
- Kötü: 0,25 üstü

INP, FID'den çok daha kapsamlı: tek bir tıklama değil, sayfadaki tüm etkileşimlerin ortalama yanıt süresini ölçüyor. JavaScript ağır temalar ve aşırı plugin yükü olan WordPress siteleri bu metrikte ciddi sorun yaşıyor.

## WordPress Hız Optimizasyonu

Hedef: 2 saniyenin altında yükleme. Google'ın kendi araştırmasına göre mobil sayfa yükleme süresi 1 saniyeden 3 saniyeye çıktığında zıplama oranı %32 artıyor.

### Önbellek (Caching)

**WP Rocket** (ücretli, yıllık ~59$) en kapsamlı çözüm. Sayfa önbelleği, tarayıcı önbelleği, GZIP sıkıştırma, lazy load, veritabanı temizleme tek pakette. Türk WordPress kullanıcıları arasında en çok önerilen performans plugini.

Ücretsiz alternatif: WP Super Cache veya LiteSpeed Cache (LiteSpeed sunucu kullanıyorsan).

### CDN (İçerik Dağıtım Ağı)

Sunucun Hollanda veya ABD'deyse İstanbul'dan her istek okyanus aşıyor. CDN, statik dosyaları (görseller, CSS, JS) kullanıcıya en yakın sunucudan sunuyor. Cloudflare'in ücretsiz planı çoğu site için yeterli başlangıç noktası.

### Görsel Optimizasyon

Görselleri **WebP formatına** dönüştür — JPG'ye göre %25-35 daha küçük dosya boyutu. Smush veya ShortPixel plugini bunu otomatize ediyor.

Lazy loading uygula: ekranın dışındaki görseller sayfa ilk yüklendiğinde indirilmez, sadece görüntü alanına yaklaştıkça yüklenir. WordPress 5.5'ten itibaren native destekli.

LCP görseli için özel durum: sayfanın en büyük görüntü elementini (genellikle hero görseli) lazy loading dışında tut, `fetchpriority="high"` ekle.

### JavaScript ve CSS Temizliği

Her plugin kendi JS ve CSS dosyalarını tüm sayfalara yüklüyor. 15 plugin aktifse, ana sayfanda hiç işlevi olmayan 10 plugin'in dosyaları da yükleniyor. WP Rocket ve Rank Math, sayfa bazlı script yönetimi yapabilmeni sağlıyor.

## Şema İşaretlemesi (Schema Markup)

Şema, Google'a içeriğinin ne olduğunu makine dilinde söylüyor. FAQ şeması arama sonuçlarında accordion genişliyor, HowTo şeması adım adım talimatları zengin sonuçlara dönüştürüyor.

Rank Math, ücretsiz planda 16'dan fazla şema türünü destekliyor: Article, FAQ, HowTo, Product, LocalBusiness, Recipe, Event ve diğerleri. Yoast'ta çoğu premium.

2025'te şema önemi artıyor: Google AI Overviews, yapılandırılmış verileri okuyarak özetler oluşturuyor. Şema olmadan AI arama sonuçlarında yer alma şansın düşük.

## Güvenlik ve SEO İlişkisi

WPScan verilerine göre WordPress'te 71.362'den fazla bilinen güvenlik açığı var. Bunların %48,5'i plugin kaynaklı. Güvenlik açığı SEO'yu nasıl etkiler?

Saldırıya uğrayan siteler spam sayfalarla dolduruluyor, zararlı yönlendirmeler kuruluyor, Google kara listeye alıyor. Kara listeye alınan sitenin geri dönüşü aylarca sürüyor.

- Tüm tema ve pluginleri güncel tut
- Kullanmadığın pluginleri sil (devre dışı bırakmak yetmez)
- Wordfence veya Sucuri güvenlik plugini kur
- Yönetici giriş URL'sini değiştir

## Sık Yapılan 5 Hata

### 1. robots.txt'te wp-content Engellemek

Google CSS ve JS dosyalarını göremezse sayfanı render edemez. Kalite değerlendirmesi düşer, sıralama etkisini aşağı çeker.

### 2. Çok Fazla Plugin

Her plugin potansiyel güvenlik açığı ve performans yükü. "Bu plugini kullansam zararlı olmaz" diye başlayan alışkanlık 30-40 pluginle biter. 10-15 iyi seçilmiş plugin çok daha iyi.

### 3. Anahtar Kelime Yamyamlığı (Keyword Cannibalization)

Aynı konuda birden fazla yazı yazmak trafik ve otoriteyi parçalıyor. Google hangi sayfayı öne çıkaracağını bilemez. Yoast bu durumu "stale cornerstone" olarak işaretliyor. Çözüm: benzer içerikleri birleştir veya birini kanonize et.

### 4. Kategori Sayfalarını Optimize Etmemek

Kategori sayfaları WordPress'in en çok ihmal edilen SEO fırsatlarından biri. Başlık, meta açıklama, kategori tanımı — bunları boş bırakmak trafik kaybı demek. Ya optimize et ya da noindex yap.

### 5. Güncelleme Ihmal Etmek

PHP, tema, plugin güncellemeleri ertelendikçe güvenlik açıkları birikir. Aylık rutin bakım (güncellemeler + yedek + hız testi) zorunlu.

## Sık Sorulan Sorular

### Yoast SEO ücretsiz sürüm yeterli mi?

Çoğu site için yeterli. Temel SEO ihtiyaçlarını karşılıyor. Çok odak anahtar kelime, gelişmiş şema veya yönlendirme yönetimi gerekiyorsa Rank Math ücretsiz daha iyi bir seçenek.

### WordPress site haritası nereye gönderilir?

Google Search Console'da "Site haritaları" bölümüne `sitemap_index.xml` girerek gönderilir. Bing Webmaster Tools'a da aynı işlemi yap.

### Core Web Vitals skoru nasıl kontrol edilir?

Google Search Console > Deneyim > Core Web Vitals. Detay için PageSpeed Insights (pagespeed.web.dev) ve GTmetrix kullan.

### INP skorum yüksek, ne yapmalıyım?

Büyük JavaScript dosyalarını geciktir, event handler'ları optimize et, üçüncü taraf scriptleri (canlı destek widget'ları, reklam kodları) lazy load ile yükle.

### WordPress'te şema işaretlemesi nasıl eklenir?

Rank Math, her yazıda şema türü seçmeni sağlıyor. FAQ bölümü için Yoast FAQ bloğu veya Rank Math'ın FAQ şemasını kullan.

### Türkiye'de hangi hosting WordPress için önerilir?

CDN olmayan paylaşımlı hostingde hız sorunları kaçınılmaz. Yönetimli WordPress hosting (Kinsta, WP Engine) veya kaliteli VPS tercih et. Cloudflare CDN eklemek çoğu durumda ücretsiz büyük fark yaratıyor.

## Kaynakça

- W3Techs: Web Technology Surveys — WordPress Usage Statistics 2024 — w3techs.com
- Colorlib: WordPress Statistics 2025 — colorlib.com
- WordPress.org: Yoast SEO Plugin Page — wordpress.org/plugins/wordpress-seo
- WordPress.org: Rank Math Plugin Page — wordpress.org/plugins/seo-by-rank-math
- Google: Core Web Vitals — web.dev/vitals
- WPScan: WordPress Vulnerability Statistics — wpscan.com
- Semrush: WordPress SEO Checklist 2024 — semrush.com
- Yoast: AI Features & llms.txt Support 2025 — yoast.com
- Kinsta: WordPress Statistics 2024 — kinsta.com
- Google: PageSpeed Insights Documentation — developers.google.com
