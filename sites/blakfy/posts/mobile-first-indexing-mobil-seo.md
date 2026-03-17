wixId: "7f1b938e-85f8-40a7-9943-a7d63ce75eae"
---
title: "Mobile-First Indexing: Mobil SEO Rehberi 2025"
slug: "mobile-first-indexing-mobil-seo"
focusKeyword: "mobile first indexing mobil seo"
seoTitle: "Mobile-First Indexing ve Mobil SEO Rehberi 2025 | Blakfy"
metaDesc: "Mobile-first indexing nedir, siteniz hazır mı? Responsive design, mobil hız, viewport ayarları ve mobil kullanılabilirlik testleri için kapsamlı rehber."
excerpt: "Google 2019'dan itibaren siteleri masaüstü yerine mobil versiyonlarına göre indeksliyor. Mobil uyumsuz siteler hem sıralama hem tarama açısından ciddi dezavantajla karşılaşıyor."
categories: ["teknik-seo"]
tags: ["seo", "teknik-seo", "mobil-uyumluluk"]
imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&h=900&fit=crop"
imageAlt: "Mobile-first indexing mobil SEO optimizasyon"
language: "tr"
status: "published"
---
Google, 2023 yılında tüm yeni web siteleri için mobile-first indexing'i zorunlu hale getirdi. Bu, Google'ın sitenizi indekslemek ve sıralamak için masaüstü versiyonunuz yerine mobil versiyonunuzu baz aldığı anlamına gelir. Türkiye'de internet trafiğinin yaklaşık %70'i mobil cihazlardan gelir. Mobil kullanıcı deneyimi artık bir seçenek değil, zorunluluktur.

## Mobile-First Indexing Nedir?

Geleneksel olarak Google, web sitelerini masaüstü versiyonlarına göre tarar ve indekslerdi. Mobile-first indexing ile bu sıra tersine döndü:

1. Googlebot, siteyi **mobil versiyonu** üzerinden tarar
2. Mobil versiyondaki içerik indekslenir
3. Sıralama, mobil içerik ve deneyim baz alınarak hesaplanır

**Eğer mobil versiyonunuzda:**
- Masaüstü versiyonuna kıyasla eksik içerik varsa → o içerik indekslenmez
- Resimler veya videolar gizliyse → görsel içerik indekslenmez
- Yapılandırılmış veri eksikse → rich snippet'lar çalışmayabilir

**Siteniz Mobile-First Indexing için hazır mı?**

GSC → Ayarlar → Tarama → "Sitenizdeki Sayfalar" bölümünde "Googlebot Mobile Smartphone" yazıyorsa siteniz mobile-first indexing kapsamındadır.

## Responsive Design: Temel Zorunluluk

Mobil uyumluluk için en sağlıklı yaklaşım **responsive design**dır. Tek URL ve tek içerik — CSS medya sorguları aracılığıyla farklı ekran boyutlarına uyum sağlar.

### Viewport Meta Etiketi

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Bu etiketi `<head>` içine eklemeden hiçbir responsive çalışma işe yaramaz. Google bu etiketi görmediğinde sayfayı mobil uyumsuz kabul eder.

### CSS Medya Sorguları

```css
/* Masaüstü (varsayılan) */
.container {
  max-width: 1200px;
  padding: 0 40px;
}

/* Tablet */
@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
}

/* Mobil */
@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .grid-3-col {
    grid-template-columns: 1fr; /* 3 sütundan 1 sütuna */
  }
}
```

### Mobil Menü

Masaüstü navigasyonu mobilde büyük sorunlara yol açar. Hamburger menü veya drawer navigasyon kullanın:

- Dokunma hedefleri en az 44×44px olmalı
- Menü öğeleri arasında yeterli boşluk bırakın
- Kaydırmalı menü yerine açılır panel tercih edin

## Mobil Sayfa Hızı

Google'ın PageSpeed raporu masaüstü ve mobil için ayrı ayrı puan verir. Mobil puanlar genellikle masaüstünden çok daha düşüktür — ve artık daha kritiktir.

### Türkiye Mobil Bağlantı Koşulları

Türkiye'de hâlâ 4G bağlantının baskın olduğu ve pek çok bölgede 3G kullanıldığı düşünüldüğünde, 2-3 saniyelik yükleme süresi hedeflenmeli. Google'ın 5G hızı simülasyonundan önce gerçek 4G hızında test edin.

### Kritik Mobil Hız Metrikleri

**LCP (Largest Contentful Paint):** 2,5 saniyenin altı. Mobil bağlantıda hero görsel veya büyük başlık LCP'yi belirler.

**CLS (Cumulative Layout Shift):** 0,1'in altı. Mobil klavye açıldığında veya reklamlar yüklendiğinde layout kaymaları yaşanır.

**INP (Interaction to Next Paint):** 200ms altı. Mobil dokunma etkileşimleri masaüstü tıklamalarından daha yavaş işlenir.

### Mobil Hız Optimizasyonu

**Görselleri optimize edin:**
```html
<!-- Mobil için küçük, masaüstü için büyük görsel -->
<picture>
  <source media="(max-width: 768px)" srcset="gorsel-mobile.webp" type="image/webp">
  <source media="(max-width: 768px)" srcset="gorsel-mobile.jpg">
  <img src="gorsel-desktop.jpg" alt="Açıklama" loading="lazy">
</picture>
```

**Font yüklemeyi optimize edin:**
```css
/* Sistem fontu önce göster, web fontu yüklenince değiştir */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Web fontu için font-display: swap */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
}
```

**Kritik CSS inline ekle:**
Sayfa üstü (above-the-fold) içerik için kritik CSS'i `<style>` etiketiyle inline ekleyin. Diğer CSS'i asenkron yükleyin.

## Mobil Kullanılabilirlik Hataları

### Dokunma Öğeleri Çok Yakın

Mobil ekranda küçük bağlantılar veya butonlar parmakla tıklanması güç olduğundan kullanıcılar yanlışlıkla başka öğelere tıklar.

**Minimum boyut:** 48×48px (Google önerisi). Öğeler arasında en az 8px boşluk.

```css
.button {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 24px;
}

.nav-link {
  padding: 12px 8px; /* Dokunma alanını genişlet */
}
```

### Metni Okumak için Yakınlaştırma Gerekiyor

Font boyutu 16px'in altında olursa iOS ve Android otomatik yakınlaştırır. Bu, CLS puanını bozar.

```css
body {
  font-size: 16px; /* Minimum */
  line-height: 1.6;
}

/* Mobilde 14px bile kullanılabilir ama 16px ideal */
@media (max-width: 480px) {
  body { font-size: 16px; }
  h1 { font-size: 24px; }
  h2 { font-size: 20px; }
}
```

### Görünüm Alanından Taşan İçerik

Sabit genişlikte (fixed-width) elementler mobilde yatay kaydırmaya neden olur.

```css
/* Sorunlu */
.container { width: 1200px; }

/* Doğru */
.container {
  width: 100%;
  max-width: 1200px;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  height: auto;
}
```

### Üçüncü Taraf İçerikleri (Reklamlar, Embedler)

Banner reklamlar ve iframe içerikler (YouTube, Twitter embed) responsive davranmayabilir.

YouTube embed için:
```html
<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube.com/embed/VIDEO_ID"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>
```

## Mobil Uyumluluk Testi Araçları

**Google PageSpeed Insights:** Mobil ve masaüstü Core Web Vitals verileri. Spesifik iyileştirme önerileri sunar.

**Google'ın Mobil Uyumluluk Testi:** search.google.com/test/mobile-friendly — Sitenizin mobil uyumlu olup olmadığını anında test eder.

**Google Search Console → Mobil Kullanılabilirlik:** Sitenizde mobil kullanılabilirlik hatası olan sayfaları listeler.

**Chrome DevTools → Device Toolbar (F12):** Farklı cihaz çözünürlüklerinde sayfayı simüle eder. iPhone SE, iPhone 14, Samsung Galaxy gibi gerçek cihaz boyutlarını seçebilirsiniz.

**BrowserStack veya Sauce Labs:** Gerçek cihaz üzerinde test (ücretli).

## Masaüstü ve Mobil İçerik Tutarlılığı

Mobile-first indexing altında en kritik kural: **Mobil ve masaüstü versiyonları aynı içeriğe sahip olmalı.**

**Kontrol edin:**
- Mobilde gizlenen metin blokları var mı? (CSS `display:none`)
- Görüntü optimizasyonu için mobilde bazı resimler kaldırıldı mı?
- Yapılandırılmış veri yalnızca masaüstünde mi ekleniyor?
- Hreflang etiketleri her iki versiyonda da mevcut mu?
- Canonical etiket mobil ve masaüstünde aynı URL'yi mi gösteriyor?

**CSS ile gizleme sorunları:**
```css
/* Google bunu okumaz — ama indeksler mi? Belirsiz */
.desktop-only { display: none; }

@media (min-width: 768px) {
  .desktop-only { display: block; }
}
```

Kritik SEO içeriğini mobilde CSS ile gizlemekten kaçının.

## Dinamik Sunum (Ayrı Mobil Site)

Bazı eski siteler `m.example.com` adresinde ayrı mobil site kullanır. Bu yaklaşım hâlâ çalışabilir ama zorunlu kurallar var:

- Canonical etiket: Mobil sayfa masaüstü sayfasına canonical işaret etmeli
- `rel="alternate"` ve `rel="canonical"` doğru çift yönlü kurulmalı
- İçerik her iki versiyonda aynı olmalı

Bu yaklaşım yönetimi karmaşıklaştırdığından, yeni projeler için responsive design önerilir.

## Sık Sorulan Sorular

### Masaüstü trafiğim mobil trafikten fazla, yine de mobile-first indexing geçerliyken sorun var mı?

Evet — Google, sitenizi artık mobil versiyonuyla indeksliyor. Masaüstü kullanıcı oranınız ne olursa olsun, sitenizin mobil versiyonu Google'ın değerlendirdiği versiyondur.

### WordPress sitem mobil uyumlu mu?

WordPress tema seçiminize bağlı. Astra, GeneratePress, Kadence gibi modern temalar varsayılan olarak responsive'dir. Ama eski temalar sorun çıkarabilir. Google'ın Mobil Uyumluluk Testi ile kontrol edin.

### Sitenin mobil versiyonu yoksa ne olur?

Google sitenizi masaüstü versiyonuyla tarar ama mobil uyumsuz olarak değerlendirerek sıralamada dezavantaj uygular. Mobil kullanılabilirlik hataları GSC'de rapor edilir.

### AMP hâlâ gerekli mi?

Hayır — Google 2023'te AMP'ı sıralama faktörü olmaktan çıkardı. Standart responsive web tasarımı ve iyi Core Web Vitals skorları yeterlidir.

## Kaynakça

- Google Arama Merkezi: Mobile-First Indexing — developers.google.com/search/docs/crawling-indexing/mobile/mobile-first-indexing
- Google: Mobil Kullanılabilirlik Testi — search.google.com/test/mobile-friendly
- Web.dev: Responsive Web Design — web.dev/responsive-web-design-basics
- Google PageSpeed Insights — pagespeed.web.dev