wixId: "4a9c82a3-e85f-4863-b021-79eaf88e28da"
---
title: "LCP ve CLS Optimizasyonu: Core Web Vitals Rehberi 2025"
slug: "lcp-cls-core-web-vitals-optimizasyonu"
focusKeyword: "core web vitals optimizasyonu"
seoTitle: "LCP ve CLS Optimizasyonu: Core Web Vitals Rehberi 2025 | Blakfy"
metaDesc: "LCP nedir, CLS nedir? Core Web Vitals eşik değerleri, en yaygın hatalar, adım adım optimizasyon teknikleri ve gerçek vaka çalışmalarıyla 2025 rehberi."
excerpt: "Web sitelerinin %53'ü Core Web Vitals testini hâlâ geçemiyor. 1 saniyelik gecikme dönüşümleri %7 düşürüyor. LCP ve CLS optimizasyonu teknik SEO'nun en yüksek getirili alanı."
categories: ["teknik-seo"]
tags: ["seo", "core-web-vitals"]
imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop"
imageAlt: "Core Web Vitals LCP CLS performans optimizasyon grafik"
language: "tr"
status: "published"
---
Web sitelerinin %53'ü Core Web Vitals testini geçemiyor. 1 saniyelik yükleme gecikme dönüşüm oranını %7 düşürüyor; 3 saniyeye çıkınca hemen çıkma oranı %32 artıyor. Swappie, LCP ve CLS'i optimize ederek mobil gelirini %42 artırdı. Rakuten, CLS değeri düşük kullanıcı grubunda %53,37 daha fazla gelir raporladı. Bu rakamlar soyut teknik metrikler değil — doğrudan gelir etkisi. Bu rehberde 2025'te LCP ve CLS'nin nasıl optimize edileceğini veri ve somut örneklerle ele alıyoruz.

## Core Web Vitals Nedir ve Neden Önemli?

Core Web Vitals, Google'ın sayfa deneyimi sinyalleri içindeki performans ölçütleri. Sıralama ağırlığı %10–15 olarak tahmin ediliyor. İki sayfa içerik kalitesi açısından eşit olduğunda daha iyi CWV skoru olan sıralamada öne geçiyor.

Google Mart 2024 core güncellemesi: zayıf CWV puanı olan siteler %20–40 trafik kaybetti; iyileştiren siteler %15–30 kazandı.

Üç ana metrik:

| Metrik | İyi | İyileştirme Gerekli | Kötü | Ölçtüğü Şey |
|---|---|---|---|---|
| **LCP** | ≤ 2,5 saniye | 2,5–4,0 saniye | > 4,0 saniye | Ana içeriğin yüklenme hızı |
| **CLS** | ≤ 0,10 | 0,10–0,25 | > 0,25 | Görsel kararlılık (içerik kayması) |
| **INP** | ≤ 200 ms | 200–500 ms | > 500 ms | Etkileşim yanıt hızı |

Google bu eşikleri 75. persentil ile değerlendiriyor: gerçek ziyaretçi oturumlarının en az %75'i "İyi" sınırında olmalı.

## LCP (Largest Contentful Paint) Optimizasyonu

### LCP Nedir?

Sayfanın görünür alanındaki en büyük içerik öğesinin yüklenme süresi. Kullanıcının "sayfa yüklendi" hissettiği an bu metrikle ölçülüyor. LCP öğesi çoğunlukla bir görsel, video kapak görseli veya büyük bir metin bloğu.

LCP öğelerinin %73'ü görsel. Bu, görsel optimizasyonunun tek en yüksek etkili iyileştirme alanı olduğu anlamına geliyor.

### LCP'nin 4 Alt Bileşeni

| Bileşen | Optimal LCP'deki Pay | Ölçtüğü Şey |
|---|---|---|
| TTFB (İlk Byte Süresi) | ~%40 | Sunucu yanıt süresi |
| Kaynak Yükleme Gecikmesi | < %10 | HTML ayrıştırma ile indirme başlangıcı arası boşluk |
| Kaynak Yükleme Süresi | ~%40 | Gerçek dosya indirme süresi |
| Öğe Render Gecikmesi | < %10 | İndirme tamamı ile ekrana çizim arası boşluk |

### 2025 LCP İstatistikleri

- Global mobil sayfaların %62'si iyi LCP skoru alıyor (2022'de bu oran %44'tü)
- Mobil LCP 75. persentil: **764 ms** — masaüstü **380 ms**. Mobil 2 kat daha yavaş
- LCP görselini önbelleğe alan sayfalar ortalama 364 ms'de yükleniyor — %100 "İyi" skoru
- Mobil sitelerin %16'sı yanlışlıkla LCP görselini lazy-load ediyor (kolay düzeltilir, yüksek etki)

### LCP Düzeltme: Görsel Optimizasyonu (Beklenen İyileşme: %40–60)

**WebP veya AVIF formatına geç.** JPEG ve PNG'ye kıyasla %25–50 daha küçük dosya boyutu, aynı görsel kalite.

**`fetchpriority="high"` ekle.** Hero görselinin veya LCP öğesinin HTML'ine bu attribute'u eklemek tarayıcıya "bunu önce yükle" mesajı veriyor.

```html
<img src="hero.webp" width="1200" height="600"
     fetchpriority="high" alt="...">
```

**LCP görselini asla lazy-load etme.** `loading="lazy"` LCP görseline eklenirse görsel geç yükleniyor ve skor mahvoluyor. LCP öğesi için `loading="eager"` veya attribute'u tamamen bırak.

**Preload ile erken yükle:**
```html
<link rel="preload" as="image" href="hero.webp" fetchpriority="high">
```

WordPress kullananlar için: WP Rocket, ShortPixel veya Imagify otomatik WebP dönüşümü yapıyor.

### LCP Düzeltme: TTFB İyileştirmesi

TTFB 600 ms'nin üzerindeyse sunucu yanıtı LCP'nin önünde engel. Çözümler:

- CDN kur (en yakın edge sunucusundan içerik sun)
- Sunucu taraflı önbellekleme etkinleştir (full-page cache, Redis)
- HTTP/2 veya HTTP/3 protokolüne geç
- Yönlendirme zincirlerini kaldır
- Veritabanı sorguları ve sunucu işleme süresini optimize et

### LCP Düzeltme: Render-Blocking Kaynaklar

Render-blocking CSS ve JavaScript LCP'yi geciktiriyor:

- Kritik CSS'i `<head>` içinde inline'a al
- Kritik olmayan JavaScript'i `defer` veya `async` ile yükle
- Uzun görevleri (>50 ms) küçük parçalara böl

### LCP Düzeltme: Font Optimizasyonu

Google Fonts dışarıdan yüklendiğinde DNS sorgusu LCP'yi geciktirebilir:

- Google Fonts'u self-host et
- Kritik fontları preload et
- `font-display: optional` değerini `swap` yerine dene — render'ı bloke etmiyor

## CLS (Cumulative Layout Shift) Optimizasyonu

### CLS Nedir?

Sayfa yüklenirken içerik öğelerinin beklenmedik şekilde hareket etmesi. Okunmak üzere olan bir metni tıklamak yerine ani kaymayla bir reklama ya da yanlış butona tıklamak — CLS bunu ölçüyor.

CLS formülü: **Etki Alanı Oranı × Mesafe Oranı**

Pratikte 0,05–0,08 arası değer iyi bir hedef. 0,10 geçme eşiği.

### CLS İstatistikleri

- Web sayfalarının %72'si iyi CLS skoru alıyor; %11'i "Kötü" aralığında
- Mobil sayfaların %66'sında boyutlandırılmamış en az bir görsel var
- Mobil sayfaların %39'unda composited olmayan animasyonlar CLS'e katkıda bulunuyor

### CLS Düzeltme: Görsel Boyutları (Beklenen İyileşme: %60–80)

CLS sorunlarının yaklaşık %60'ı boyutsuz görsellerden kaynaklanıyor. Tarayıcı görsel boyutunu bilmediğinde, görsel yüklenince etrafındaki içerik kayıyor.

**Yanlış:**
```html
<img src="urun.jpg" alt="Ürün">
```

**Doğru:**
```html
<img src="urun.jpg" width="800" height="600" alt="Ürün">
```

Responsive tasarım için CSS ile birleştir:
```css
img {
  height: auto;
  width: 100%;
}
```

Video ve iframe için `aspect-ratio` kullan:
```css
.video-container {
  aspect-ratio: 16 / 9;
}
```

### CLS Düzeltme: Font Kaynaklı Kayma (Beklenen İyileşme: %40–70)

Font yüklenene kadar sistem fontu görünüyor, asıl font yüklenince metin kaynıyor. Bunu engellemek için fallback fontun ölçülerini asıl fontta ayarla:

```css
@font-face {
  font-family: "MyFont-Fallback";
  src: local("Arial");
  size-adjust: 105%;
  ascent-override: 95%;
  descent-override: normal;
  line-gap-override: normal;
}
```

`font-display: swap` ile birleştir ve kritik fontları preload et.

### CLS Düzeltme: Reklam ve Dinamik İçerik (Beklenen İyileşme: %50–90)

Reklam birimleri yüklenene kadar sayfada yer kaplamıyorsa, yüklenince içerik aşağı itiyor. Çözüm: reklam container'larına minimum yükseklik tanımla:

```css
.reklam-alani {
  min-height: 250px;
}
```

AJAX ile enjekte edilen içerik için placeholder kullan. İçerik yüklenince placeholder'ın yerini alır, çevresi kaymaz.

### CLS Düzeltme: CSS Animasyonları

`top`, `left`, `width`, `height` ile yapılan animasyonlar layout yeniden hesaplama tetikler — CLS'e katkıda bulunur.

**Yanlış:**
```css
.element { animation: kaydır 0.3s; }
@keyframes kaydır { to { top: 100px; } }
```

**Doğru:**
```css
.element { animation: kaydır 0.3s; }
@keyframes kaydır { to { transform: translateY(100px); } }
```

`transform` ve `opacity` composited özellikleri — layout yeniden hesaplama tetiklemiyor.

### CLS Düzeltme: YouTube ve Sosyal Medya Embed'leri

Harici widget'lar yüklenince boyutu belli olmadığından kayma yaratıyor. Çözüm: sabit boyutlu container içine al ve facade tekniği kullan — kullanıcı tıklayana kadar hafif bir placeholder göster, asıl iframe'i tıklama sonrası yükle.

## Ölçüm ve İzleme Araçları

| Araç | Veri Tipi | Temel Özellik |
|---|---|---|
| Google PageSpeed Insights | Alan + Lab | Ücretsiz; CrUX gerçek kullanıcı verisi + Lighthouse test |
| Google Search Console | Alan (CrUX) | Domain geneli CWV raporu; 28 günlük yuvarlanan pencere |
| Chrome DevTools | Lab | Waterfall analizi, LCP öğesi tespiti |
| WebPageTest | Lab | Gelişmiş waterfall, filmstrip görünümü, çok lokasyonlu test |
| Lighthouse CLI | Lab | CI/CD pipeline entegrasyonu |
| CLS Visualizer (Chrome Eklentisi) | Lab | Kayma bölgelerini görsel olarak işaretliyor |

**Alan verisi vs. lab verisi:** Alan verisi (CrUX), Chrome kullanıcılarının gerçek deneyimi — Google sıralamada bunu kullanıyor. Lab verisi (Lighthouse) hata ayıklama için iyi ama Google'ın gerçekte kullandığı veri değil.

**Türkiye için GTmetrix testi:** Test lokasyonu olarak Frankfurt veya Londra seç — Türkiye'ye coğrafi açıdan en yakın sonucu veriyor. WebPageTest'te doğrudan İstanbul lokasyonu seçilebiliyor.

## Gerçek Vaka Çalışmaları

**Swappie (Yenilenmiş telefon — Finlandiya):**
- LCP: %55 iyileşme
- CLS: %91 iyileşme
- Sonuç: **+%42 mobil gelir**

**Rakuten 24 (Düşük CLS kullanıcı kohortu):**
- Sonuç: **+%53,37 gelir**, **+%33,13 dönüşüm oranı**

**Vodafone:**
- LCP: %31 iyileşme
- Sonuç: **+%8 satış**

**Pinterest:**
- LCP: 1 saniye iyileşme
- Sonuç: algılanan bekleme süresi -%40, SEO trafiği +%15, üyelik dönüşümü +%15

**Anonim e-ticaret ürün sayfası:**
- LCP: 4,2 saniye → 1,8 saniye (%57 iyileşme)
- Sonuç: dönüşüm oranı +%23, hemen çıkma oranı -%31, gelir +%18 (3 ay içinde)

## Türkiye Bağlamı

Türkiye mobil internet kullanımında yüksek — yaklaşık %75 mobil trafik. Mobil LCP masaüstüne kıyasla 2 kat daha yavaş. Bu, Türk siteler için CWV optimizasyonunun global ortalamadan daha kritik olduğu anlamına geliyor.

Türkiye sabit internet sıralamasında 101. sırada (Ocak 2025 Ookla verisi). Yavaş bağlantılarda her milisaniye kayıp daha görünür. Cloudflare ve AWS CloudFront'un İstanbul PoP noktaları var — CDN kullanmak TTFB'yi doğrudan düşürüyor.

## Adım Adım Başlangıç Rehberi

**1. Ölç:** Google PageSpeed Insights ile başla — ücretsiz, anında sonuç, resmi CWV skorunu gösteriyor.

**2. Etkilenen sayfaları bul:** Google Search Console → Core Web Vitals raporu → sorunlu URL'leri listele.

**3. LCP önce:** Görselleri WebP'ye dönüştür, LCP görselinden `loading="lazy"` kaldır, `fetchpriority="high"` ekle.

**4. CLS sonra:** Tüm görsellere `width` ve `height` attribute'u ekle. Reklam alanlarına `min-height` tanımla.

**5. TTFB için CDN:** İstanbul PoP noktası olan CDN kur (Cloudflare ücretsiz başlangıç için yeterli).

**6. Tekrar ölç:** İyileştirmeler GSC'de 28 günlük CrUX döngüsüyle yansıyor — 2–4 hafta bekle.

## Sık Sorulan Sorular

### LCP ve CLS gerçekten Google sıralamasını etkiliyor mu?

Evet. Sıralama sinyali ağırlığı %10–15 olarak tahmin ediliyor. Mart 2024 güncellemesinde zayıf CWV siteler %20–40 trafik kaybetti.

### LCP'nin tek en büyük nedeni nedir?

Optimize edilmemiş görseller. LCP öğelerinin %73'ü görsel. WebP/AVIF dönüşümü + `fetchpriority="high"` + LCP görselinde lazy-loading'i kaldırmak büyük çoğunlukla sorunu çözüyor.

### CLS 0 olabilir mi?

Pratikte çok zor — sadece tamamen statik siteler için gerçekçi. Dinamik içerik, reklam ve font kullanan siteler için 0,05–0,08 iyi hedef. Geçme eşiği 0,10.

### WordPress'te CLS'i hızlıca nasıl düzeltirim?

Adım 1: Tüm görsellere `width` ve `height` attribute'u ekle. Adım 2: Google Fonts'u self-host et. Adım 3: Reklam container'larına `min-height` ekle. WP Rocket bu adımların bir kısmını otomatize ediyor.

### INP nedir, FID ile farkı ne?

INP (Interaction to Next Paint) Mart 2024'te FID'in (First Input Delay) yerini aldı. FID yalnızca ilk etkileşimi ölçüyordu; INP sayfadaki tüm tıklama ve klavye etkileşimlerine bakıyor. Eşik: ≤200 ms iyi.

### Optimizasyon sonrası ne kadar sürede sonuç görürüm?

Google Search Console CWV raporu 28 günlük CrUX verisiyle güncelleniyor. Çoğu iyileştirme 2–4 hafta içinde raporda görünür.

## Kaynakça

- web.dev: Largest Contentful Paint (LCP) — web.dev
- web.dev: Cumulative Layout Shift (CLS) — web.dev
- corewebvitals.io: LCP ve CLS rehberleri — corewebvitals.io
- Google Search Central: Core Web Vitals and Google Search — developers.google.com
- NitroPack: Most Important Core Web Vitals Metrics 2025 — nitropack.io
- DebugBear: How to Fix CLS Issues — debugbear.com
- Chrome for Developers: Layout Shift Culprits — developer.chrome.com
- Backlinko: Core Web Vitals Hub — backlinko.com
