wixId: "d9703bc2-948f-47a5-a758-6e0aa4259f5e"
---
title: "INP Optimizasyonu: Interaction to Next Paint Rehberi"
slug: "inp-optimizasyonu"
focusKeyword: "inp optimizasyonu"
seoTitle: "INP Optimizasyonu: Interaction to Next Paint Rehberi 2025 | Blakfy"
metaDesc: "INP nedir, nasıl ölçülür ve iyileştirilir? Core Web Vitals'ın en yeni metriği INP için JavaScript optimizasyonu, long task azaltma ve pratik çözümler."
excerpt: "INP (Interaction to Next Paint), 2024'te FID'in yerini aldı ve Core Web Vitals'ın en zorlu metriği oldu. Kullanıcı tıklamasından sonra ekranın ne kadar hızlı güncelleneceğini ölçer."
categories: ["teknik-seo"]
tags: ["seo", "core-web-vitals", "javascript"]
imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&h=900&fit=crop"
imageAlt: "INP optimizasyon Core Web Vitals JavaScript performans"
language: "tr"
status: "published"
---
Mart 2024'te Google, FID (First Input Delay) metriğini INP (Interaction to Next Paint) ile değiştirdi. INP, kullanıcı ile sayfa arasındaki tüm etkileşimlerin tepki süresini ölçüyor — sadece ilk tıklamayı değil. Bu, çok daha kapsamlı ve gerçekçi bir ölçüm. Bu rehber, INP'yi anlamak ve optimize etmek için gereken her şeyi kapsıyor.

## INP Nedir?

INP, kullanıcının bir sayfayla etkileşimi (tıklama, dokunma, klavye tuşu) ile sayfanın görsel güncellenmesi (next paint) arasındaki süreyi ölçer.

**Ölçüm birimi:** Milisaniye (ms)

**Eşik değerleri:**
- ✅ **İyi:** ≤200ms
- ⚠️ **İyileştirme Gerekiyor:** 201-500ms
- ❌ **Kötü:** >500ms

**FID'den farkı:**
- FID: Yalnızca ilk etkileşim + gecikme süresi
- INP: Tüm etkileşimler + tam tepki süresi (görsel güncelleme dahil)

INP çok daha kapsamlı ve genellikle daha düşük skora yol açıyor.

## INP'yi Ölçme

### Chrome DevTools

1. DevTools → Performance sekmesi
2. Sayfayla etkileşim kurarken kayıt alın
3. "Interactions" track'inde gecikmeleri görün

### Google PageSpeed Insights

Alan (Field) verisi: Gerçek kullanıcı INP deneyimi (CrUX verisi)
Lab verisi: Lighthouse simülasyonu (INP için sınırlı)

**Dikkat:** INP, özellikle alan verisiyle anlamlı. Lab ortamında tam olarak ölçmek zordur.

### Chrome User Experience Report (CrUX)

GSC → Core Web Vitals raporu. Alan verisi, gerçek Chrome kullanıcılarından geliyor.

## INP Sorunlarının Kökleri

### Long Tasks (Uzun Görevler)

JavaScript'te 50ms'yi aşan görevler "Long Task" sayılır. Uzun görev çalışırken ana thread meşguldür — kullanıcı tıklasa bile sayfa tepki veremez.

**Tespit:** DevTools → Performance → "Long Tasks" turuncu renkte işaretlenir.

**Yaygın kaynaklar:**
- Ağır event handler fonksiyonları
- Büyük senkron JavaScript işlemleri
- Third-party script'ler (analitik, reklam, chat widget)
- DOM manipülasyonu

### Render Blocking JavaScript

Sayfa yüklenirken render'ı bloke eden JavaScript, etkileşim süresi başlamadan önce gecikmeye yol açar.

### Third-Party Scripts

Google Analytics, Facebook Pixel, chat widget'ları, reklam kodları — bunlar genellikle INP'yi olumsuz etkiler.

## INP Optimizasyon Teknikleri

### 1. Long Task'leri Parçalama

Uzun bir JavaScript görevini küçük parçalara bölmek main thread'i serbest bırakır:

```javascript
// Kötü: Büyük tek görev
function processItems(items) {
  for (const item of items) {
    heavyProcess(item); // Her döngü uzun sürebilir
  }
}

// İyi: Parçalara bölme (chunking)
async function processItems(items) {
  for (const item of items) {
    heavyProcess(item);
    await new Promise(resolve => setTimeout(resolve, 0)); // Main thread'e nefes
  }
}
```

**scheduler.yield():** Modern tarayıcılarda daha verimli yol:
```javascript
async function processItems(items) {
  for (const item of items) {
    heavyProcess(item);
    if (navigator.scheduling?.isInputPending()) {
      await scheduler.yield();
    }
  }
}
```

### 2. Debounce ve Throttle

Sık tetiklenen event'ler (scroll, resize, input) her tetiklemede ağır işlem yapmamalı:

```javascript
// Debounce: Belirli süre sonra yalnızca bir kez çalıştır
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Kullanım:
const handleSearch = debounce(searchFunction, 300);
searchInput.addEventListener('input', handleSearch);
```

### 3. Gereksiz Render'ı Önleme (React/Vue)

JavaScript framework'lerinde gereksiz component re-render INP'yi olumsuz etkiler:

**React:** `React.memo`, `useMemo`, `useCallback`
**Vue:** Computed properties, `v-memo`

### 4. Third-Party Script Yönetimi

Third-party script'leri geciktirerek veya async yükleyerek main thread yükünü azaltın:

```html
<!-- Senkron (kötü) -->
<script src="analytics.js"></script>

<!-- Async (iyi) -->
<script async src="analytics.js"></script>

<!-- Defer (DOM'dan sonra) -->
<script defer src="non-critical.js"></script>
```

**Kritik olmayan widget'lar:** Chat, popup, sosyal butonlar → kullanıcı etkileşimi sırasında lazily yükleyin.

### 5. CSS Animasyon Optimizasyonu

JavaScript yerine CSS animasyonu tercih edin:

```css
/* Kötü: JS ile animasyon */

/* İyi: CSS transform ve opacity (GPU hızlandırma) */
.animated {
  transition: transform 0.3s ease;
  will-change: transform;
}
```

`will-change: transform` element'i GPU layer'ına taşır — CPU bağımsız animasyon.

### 6. Input Delay Azaltma

Kullanıcı tıkladığında JavaScript hemen çalışabilmeli:

- Uzun task'leri main thread'den Web Worker'a taşıyın
- Event listener'ları passive olarak işaretleyin (scroll event'leri için özellikle)

```javascript
// Passive event listener
window.addEventListener('scroll', handler, { passive: true });
```

## INP ve Site Türleri

**E-ticaret:** Sepete ekle butonu, filtreler, arama — bu etkileşimler INP'yi doğrudan etkiler.

**Haber siteleri:** Reklam yoğun sayfalar INP'yi zorlar.

**SPA (Single Page Application):** İstemci tarafı rendering INP açısından riskli — büyük JS bundle'lar uzun task yaratır.

**Statik siteler:** Genellikle iyi INP — az JavaScript, az etkileşim.

## Sık Sorulan Sorular

### INP sıralamaları etkiliyor mu?

Evet — Core Web Vitals (CWV) Google sıralama faktörü. Kötü INP puanı sıralamayı olumsuz etkileyebilir, özellikle yakın rakiplerle karşılaştırıldığında.

### INP ne kadar hızlı iyileştirilebilir?

JavaScript optimizasyonu dakikalar-saatler içinde başlayabilir ama sonuçların Google'a yansıması 4-6 hafta alabilir.

### Third-party script kaldırmak mümkün değilse ne yapmalı?

Script'leri lazy load edin, async yapın ve mümkünse etkileşim dışında çalıştırın.

## Kaynakça

- web.dev: INP — web.dev/inp
- Chrome DevTools: Performance Analysis — developer.chrome.com/docs/devtools
- Google: Core Web Vitals — web.dev/vitals
- Philip Walton: Optimize INP — philipwalton.com
