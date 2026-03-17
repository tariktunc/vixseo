wixId: "ae68c530-56bb-4131-bc44-7f1e57552a78"
---
title: "CDN Nedir? Türkiye'de Site Hızı Optimizasyonu Rehberi 2025"
slug: "cdn-site-hizi-optimizasyonu"
focusKeyword: "cdn nedir site hızı"
seoTitle: "CDN Nedir? Türkiye'de Site Hızı Optimizasyonu Rehberi 2025 | Blakfy"
metaDesc: "CDN nedir, nasıl çalışır? Türkiye'de PoP noktası olan 14 CDN karşılaştırması, Cloudflare kurulum adımları, görsel ve kod optimizasyon kontrol listesi."
excerpt: "Türk sitelerinin büyük çoğunluğu yurt dışı sunucuda barındırılıyor. İstanbul'dan Frankfurt'a 2.200 km mesafe gecikmeyi artırıyor. CDN bu sorunu çözüyor."
categories: ["teknik-seo"]
tags: ["seo", "core-web-vitals"]
imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=900&fit=crop"
imageAlt: "CDN içerik dağıtım ağı sunucu hız optimizasyonu"
language: "tr"
status: "published"
---
Mobil kullanıcıların %53'ü 3 saniyeden uzun süren siteleri terk ediyor. 1 saniyelik gecikme dönüşüm oranını %7 düşürüyor — Amazon için bu rakam yıllık milyarlarca dolara karşılık geliyor. Türkiye'deki sitelerin büyük çoğunluğu Almanya, Hollanda veya ABD sunucularında barındırılıyor. İstanbul'dan Frankfurt'a mesafe 2.200 km — bu fiziksel mesafe her istekte gecikme olarak geri dönüyor. CDN (Content Delivery Network) bu sorunu çözüyor: içeriği kullanıcının yakınındaki sunuculardan sunarak latency'yi ortadan kaldırıyor.

## Site Hızının SEO ve İş Sonuçlarına Etkisi

Rakamlar tartışmayı bitiriyor:

- Yükleme süresi 1'den 5 saniyeye çıkınca bounce rate **%90 artıyor**
- 1 saniyede yüklenen sayfalar 5 saniyede yüklenenlerden **3 kat daha fazla dönüşüm** üretiyor
- Mobil e-ticaret siteleri yavaş yükleme nedeniyle alışveriş yapanların **%30–60'ını** kaybediyor
- Tüketicilerin **%82'si** yavaş sitelerin marka güvenini zedelediğini söylüyor
- Tüketicilerin **%45'i** yavaş siteye bir daha dönmeyeceğini belirtiyor
- Ziyaretçilerin **%73'ü** ödeme sayfası yavaş yüklenirse siteyi terk ediyor

**SEO boyutu:** Web sitesi hızı 2018'den beri resmi Google sıralama faktörü. 2,5 saniyeden hızlı yüklenen sayfalar Google'ın ilk 20 sonucunda görünme eğiliminde. Dünya genelinde sitelerin yalnızca %38'i Core Web Vitals testini geçiyor.

**CDN'e özgü etkiler:** CDN kullanan siteler gecikmeyi %60'a kadar azaltabiliyor, ortalama yüklenme sürelerini %50 iyileştiriyor. CDN kullanan sitelerin bounce rate'i kullanmayanlara kıyasla %15 daha düşük. Dünya genelinde sitelerin %48'i hâlâ CDN kullanmıyor — erken hareket avantaj.

## CDN Nasıl Çalışır?

CDN, statik içerikleri (görseller, CSS, JavaScript, videolar) dünyanın farklı noktalarındaki sunucularda (PoP — Point of Presence) önbelleğe alır. Kullanıcı siteyi ziyaret ettiğinde içerik ana kaynak sunucu yerine coğrafi açıdan en yakın CDN sunucusundan sunulur.

**Türkiye örneği:** Sitenin kaynak sunucusu Frankfurt'ta. İstanbul'daki bir ziyaretçi sitenizi açtığında HTML sunucudan geliyor ama görseller, CSS ve JS dosyaları İstanbul'daki CDN PoP'undan geliyor. Fiziksel mesafe azaldığında latency düşüyor.

**Dinamik içerik:** CDN öncelikle statik içerik için tasarlanmış. Ürün sayfaları, kullanıcıya özel içerikler ve sepet/ödeme sayfaları genellikle cache'lenmez — bu sayfalar yine kaynak sunucudan gelir. CDN burada da TTFB'yi azaltıyor çünkü en yakın edge sunucusu kaynak sunucuya en hızlı bağlantıyı kuruyor.

## Türkiye'deki Durum

Türkiye sabit internet hızında dünya 101. sırasında (Ocak 2025, Ookla). Mobil internet sıralaması 58. — görece iyi ama küresel liderlerden uzakta. Mobil gecikme 23 ms, sabit internet 8 ms.

Pek çok Türk KOBİ ve e-ticaret sitesi Almanya veya Hollanda sunucusunda barındırılıyor — maliyet ve yaygınlık nedeniyle. Bu sunuculara olan mesafe gecikmeyi artırıyor. Çözüm: İstanbul'da PoP noktası bulunan CDN kullanmak.

Türkiye'nin Avrupa ve Asya arasında köprü konumunda olması CDN altyapısı açısından stratejik. AWS CloudFront Şubat 2024'te İstanbul'da yeni edge lokasyonu açtı — bu Türk kullanıcılar için %30'a kadar gecikme iyileştirmesi anlamına geliyor.

## Türkiye'de PoP Noktası Olan CDN'ler

CDN Planet verilerine göre Türkiye'de PoP'u olan 14 CDN sağlayıcısı:

| CDN Sağlayıcısı | Türkiye PoP Sayısı | Şehirler |
|---|---|---|
| Medianova | 3 | İstanbul, Ankara, Antalya |
| EdgeNext | 3 | İstanbul, Ankara, İzmir |
| BytePlus | 2 | İstanbul, Ankara |
| CDNetworks | 2 | İstanbul, Ankara |
| Cloudflare | 2 | İstanbul, İzmir |
| Bunny CDN | 1 | İstanbul |
| AWS CloudFront | 1 | İstanbul (Şub 2024) |
| CacheFly | 1 | İstanbul |
| CDN77 | 1 | İstanbul |
| Gcore | 1 | İstanbul |

Türkiye'de **3 PoP** noktasıyla Medianova ve EdgeNext en geniş yerel kapsama sahip. Cloudflare'in hem İstanbul hem İzmir PoP'u var.

## Ana CDN'lerin Karşılaştırması

| Kriter | Cloudflare | Bunny CDN | AWS CloudFront |
|---|---|---|---|
| Global PoP | 285+ şehir | ~120 PoP | Geniş AWS ağı |
| Türkiye PoP | İstanbul + İzmir | İstanbul | İstanbul |
| Ortalama gecikme | ~28 ms | ~24 ms | Değişken |
| Ücretsiz plan | **Evet (tam temel özellik)** | Hayır | Hayır |
| Ücretli başlangıç | $20/ay | GB başına ~$0,01 | Çok boyutlu |
| DDoS / WAF koruması | Tam kapsamlı | Temel | Enterprise |
| WordPress plugin | Resmi eklenti | WP Rocket entegrasyonu | Manuel |
| Kurulum zorluğu | Nameserver değişikliği | CNAME — basit | En karmaşık |

### Medianova (Türkiye Yerel Seçenek)

Türkiye, Orta Doğu ve Afrika'nın en büyük CDN sağlayıcısı olduğunu açıklıyor. İstanbul, Ankara ve Antalya'da 3 PoP — Türkiye'de en geniş yerel kapsama. Büyük Türk medya kuruluşları ve yüksek trafikli e-ticaret siteleri için tercih edilen seçenek. Türkçe yerel destek avantajı.

## Hangi CDN'i Seçmeli?

| Site Türü | Önerilen CDN | Neden |
|---|---|---|
| Kişisel blog / küçük site | Cloudflare Ücretsiz Plan | Sıfır maliyet, DDoS dahil |
| Büyüyen e-ticaret / WooCommerce | Bunny CDN | GB başına öngörülebilir maliyet |
| Kurumsal / yüksek trafik Türk sitesi | Medianova veya Cloudflare Pro | Yerel Türkiye PoP, yerel destek |
| AWS altyapısı kullananlar | CloudFront + İstanbul edge | Mevcut AWS ekosistemi |

## Cloudflare Kurulum Adımları (Ücretsiz Plan)

1. cloudflare.com'da hesap aç, e-posta doğrulamasını tamamla
2. "Add a site" ile domain adını gir, ücretsiz planı seç
3. Cloudflare mevcut DNS kayıtlarını otomatik tarar — kayıtları gözden geçir ve doğrula
4. Domain kayıt firmanın (GoDaddy, İsimtescil, Natro vb.) panelinden nameserver'ları Cloudflare tarafından verilen nameserver'larla değiştir
5. SSL/TLS bölümünden modu **"Full (strict)"** olarak ayarla
6. Speed → Optimization → **Auto Minify** (JS, CSS, HTML) etkinleştir
7. Speed → Optimization → **Brotli Compression** etkinleştir
8. Caching → **Cache Level: Standard** olarak ayarla
9. Doğrulama: Chrome DevTools → Network → herhangi bir JS/CSS dosyasına tıkla → Response Headers'da `cf-cache-status: HIT` görünüyorsa kurulum tamamdır

**Kritik hata:** Cloudflare paneline domain ekleyip nameserver değişikliğini yapmamak. Bu adım atlandığında Cloudflare'in CDN ve DDoS koruması devreye girmiyor.

## Hız Optimizasyon Kontrol Listesi (CDN Ötesi)

### Görsel Optimizasyonu

- Tüm görselleri **WebP veya AVIF** formatına dönüştür (JPEG/PNG'ye kıyasla %25–35 boyut küçültme)
- `loading="lazy"` ile lazy loading uygula — sayfa yükleme süresi %30 azalır
- Her görsel için genişlik ve yükseklik attribute'u tanımla (CLS sorununu önler)
- LCP görselini **asla** lazy-load etme; `fetchpriority="high"` ekle
- Responsive görseller için `srcset` ve `sizes` attribute'u kullan

### Sunucu ve Altyapı

- CDN kur (İstanbul PoP'u olan sağlayıcı seç)
- Paylaşımlı hostingden VPS veya bulut sunucuya geç
- **GZIP veya Brotli sıkıştırma** etkinleştir (metin dosyalarında %70–80 boyut azaltma)
- PHP OPcache etkinleştir
- Veritabanı sorgularını optimize et; eski log ve geçici verileri temizle

### Önbellekleme

- Browser caching için `Cache-Control` header'larını ayarla
- Sunucu taraflı önbellekleme uygula (Redis veya Memcached)
- Statik sayfalar için full-page cache kur
- WordPress WooCommerce sitelerinde sepet, ödeme ve hesap sayfalarını CDN cache'inden dışla

### Kod Optimizasyonu

- HTML, CSS ve JavaScript'i **minify** et (dosya boyutunda %20–40 azalma)
- Kritik olmayan JavaScript'i `defer` veya `async` yükle
- Render-blocking kaynakları `<head>` bölümünden kaldır
- Kullanılmayan CSS'i temizle

### Üçüncü Taraf Scriptler

- Tüm harici scriptleri denetle, kullanılmayanları kaldır
- Tüm takip araçlarını **Google Tag Manager** üzerinden konsolide et
- Zorunlu harici scriptlere `async` / `defer` ekle
- Kullanılmayan sosyal medya widget'larını kaldır

## Türk Sitelerinin Yaşadığı Yaygın Hız Sorunları

**1. Yanlış sunucu konumu:** Türk kullanıcılara hitap eden site Almanya/Hollanda/ABD'de barındırılıyor. Fiziksel mesafeden kaynaklanan gereksiz gecikme.

**2. Paylaşımlı hosting kaynak kıtlığı:** Çok fazla site aynı sunucu kaynaklarını paylaşıyor — yüksek TTFB.

**3. CDN kullanmama:** Dünya ortalaması zaten %48 CDN'siz. Türk sitelerinde bu oran daha yüksek.

**4. Optimize edilmemiş görseller:** Görseller ortalama sayfa ağırlığının %78'ini oluşturuyor. Büyük JPEG dosyaları.

**5. Aşırı plugin yükü:** WordPress sitelerinde gereksiz veya çakışan eklentiler ciddi performans kaybı yaratıyor.

**6. Yanlış Cloudflare yapılandırması:** Cloudflare'e domain ekleyip nameserver değişikliğini yapmamak — CDN etkinleşmiyor.

**7. Font optimizasyonu eksikliği:** Optimize edilmeden yüklenen özel fontlar render-blocking yaratıyor.

## Ölçüm Araçları

| Araç | Ücretsiz | Öne Çıkan Özellik |
|---|---|---|
| Google PageSpeed Insights | Evet | Resmi CWV skoru; gerçek kullanıcı + lab verisi |
| GTmetrix | Kısmen | Waterfall analizi; Frankfurt lokasyonu Türkiye için uygun |
| Google Search Console | Evet | Domain geneli CWV raporu; sorunlu sayfaları listeler |
| WebPageTest | Evet | 40+ lokasyon; İstanbul seçilebilir |
| Pingdom | Kısmen | Coğrafi lokasyon bazlı test |
| Lighthouse (Chrome DevTools) | Evet | Performans, SEO, erişilebilirlik bir arada |

**Neden GTmetrix test lokasyonu önemli:** Varsayılan lokasyon Vancouver'dan test yapıyor. Türkiye için Frankfurt veya Londra seç. WebPageTest'te doğrudan İstanbul lokasyonu mevcut.

## Core Web Vitals Hedef Değerleri

| Metrik | Hedef | Ölçtüğü Şey |
|---|---|---|
| LCP | < 2,5 saniye | Ana içeriğin yüklenme hızı |
| CLS | < 0,10 | Görsel kararlılık |
| INP | < 200 ms | Etkileşim yanıt hızı |
| TTFB | < 0,8 saniye | Sunucu yanıt hızı |
| PageSpeed Skoru | 90+ | Genel performans |

## Sık Sorulan Sorular

### CDN ücretli olmak zorunda mı?

Cloudflare'in ücretsiz planı küçük ve orta ölçekli Türk siteler için yeterli. Blog ve içerik siteleri ücretsiz planda tüm temel özelliklerden faydalanabilir.

### CDN kurulumundan sonra ne kadar hızlanma beklenir?

Ortalama %27–50 gecikme azalması ve %15 daha düşük bounce rate beklenir. AWS CloudFront İstanbul edge için Türkiye'de %30'a kadar gecikme iyileştirmesi AWS tarafından açıklandı.

### Türkiye'deki kullanıcılar için en önemli CDN kriteri nedir?

İstanbul'da yerel PoP noktası bulunan CDN seçmek. 14 sağlayıcının tamamı İstanbul'da mevcut. Medianova, Cloudflare ve EdgeNext Türkiye'de birden fazla PoP'a sahip tek seçenekler.

### WordPress'e CDN nasıl entegre edilir?

Cloudflare için resmi "Cloudflare" WordPress eklentisi — en kolay kurulum. Bunny CDN için "BunnyCDN" eklentisi veya WP Rocket'ın CDN modülü.

### Hostingim zaten hızlıysa CDN'e hâlâ ihtiyacım var mı?

Evet. CDN hosting kalitesinin yerini almaz, tamamlar. Kaynak sunucu ne kadar hızlı olursa olsun, İstanbul'dan Frankfurt'a 2.200 km mesafe nedeniyle latency oluşur. CDN bu mesafe sorununu ortadan kaldırır.

### Hangi araçla başlamalıyım?

Google PageSpeed Insights (pagespeed.web.dev) — ücretsiz, anlık sonuç, resmi CWV skoru. Daha derin analiz için GTmetrix veya WebPageTest.

## Kaynakça

- CDN Planet: Turkey CDN — 14 Content Delivery Networks — cdnplanet.com
- AWS: New Edge Location in Türkiye — aws.amazon.com
- Medianova: Largest CDN of Turkey, Middle East and Africa — medianova.com
- DCHost: Cloudflare vs BunnyCDN vs CloudFront — dchost.com
- Log.com.tr: Türkiye Ocak 2025 İnternet Hızları — log.com.tr
- Marketing LTB: Website Speed Statistics 2025 — marketingltb.com
- Natro: Sitenizin Yavaş Olmasının 12 Nedeni — natro.com
- Google Search Central: Understanding Core Web Vitals — developers.google.com
