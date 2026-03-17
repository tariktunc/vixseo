wixId: "b02f2fa6-a0c5-4725-9acf-cecd3331c8c6"
---
title: "Pagination SEO: Sayfalama Optimizasyonu Rehberi"
slug: "pagination-seo"
focusKeyword: "pagination seo"
seoTitle: "Pagination SEO: Sayfalama Optimizasyonu Rehberi 2025 | Blakfy"
metaDesc: "Sayfalama (pagination) SEO'ya nasıl etkiler? rel=next/prev kaldırılması, canonical kullanımı, infinite scroll alternatifi ve e-ticaret sayfalama için rehber."
excerpt: "Bir blog 200. sayfasının veya kategori listenizin 50. sayfasının SEO değeri var mı? Sayfalama yönetimi, büyük sitelerde tarama bütçesi ve indeksleme için kritik bir konudur."
categories: ["teknik-seo"]
tags: ["seo", "e-ticaret", "google-search-console"]
imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop"
imageAlt: "Pagination SEO sayfalama teknik optimizasyon"
language: "tr"
status: "published"
---
Sayfalama (pagination), büyük içerik veya ürün listelerini birden fazla sayfaya bölen yapıdır. Blog arşivi, ürün kategorisi, arama sonuçları — bunların tümünde sayfalama var. Yanlış yönetilirse tarama bütçesi israfı, içerik dağılımı ve sıralama sorunları yaratır. Bu rehber pagination SEO'yu baştan sona ele alıyor.

## Sayfalama Türleri

**Numaralı sayfalama:** Sayfa 1, 2, 3, 4...
```
siteniz.com/blog/
siteniz.com/blog/page/2/
siteniz.com/blog/page/3/
```

**Yüklemeye devam et (Load More):** Kullanıcı butona tıklar, içerikler eklenir. URL değişmeyebilir.

**Sonsuz kaydırma (Infinite Scroll):** Sayfa altına ulaşınca otomatik yükleme. Sosyal medya akışlarında yaygın.

**Önceki/Sonraki navigasyon:** Blog yazılarında bir önceki/sonraki.

## Sayfalama SEO Sorunları

### Duplicate Content Riski

Sayfa 1 ile Sayfa 2 benzer içerik içerebilir (örn. aynı kategori sayfası, farklı sıralama). Google bunu duplicate content olarak değerlendirebilir.

### Tarama Bütçesi İsrafı

Blog'unuzun 500. sayfası veya kategoriyi 30. sayfası gerçek bir kullanıcı trafiği almaz ama Googlebot ziyaret eder. Bu tarama bütçesini boşa harcar.

### Bölünmüş Link Gücü

Bir kategorinin 1. sayfası backlink alırken 2-50. sayfalar değersiz kalır.

### Orphan Sayfa Problemi

Çok derin sayfalar iç bağlantıdan kopuk olabilir.

## Google'ın Pagination Yaklaşımı

Google, 2019'da **rel="prev" / rel="next"** etiketlerini artık kullanmadığını açıkladı. Bu etiketler Google'ı sayfa serisi hakkında bilgilendirmek için kullanılıyordu, artık görmezden geliniyor.

**Güncel Google yaklaşımı:**
- Googlebot sayfalama URL'lerini bağımsız sayfalar olarak değerlendiriyor
- "Sayfalama zinciri" algısı artık yok

Bu, sayfalama yönetiminin daha stratejik olması gerektiği anlamına geliyor.

## Sayfalama Stratejileri

### 1. Her Sayfa için Canonical

Sayfa 1'e canonical vermek yerine her sayfa kendisi canonical:

```html
<!-- Sayfa 1 -->
<link rel="canonical" href="https://siteniz.com/blog/">

<!-- Sayfa 2 -->
<link rel="canonical" href="https://siteniz.com/blog/page/2/">
```

Sayfa 2'den Sayfa 1'e canonical vermek (eskiden yaygın bir uygulama) artık önerilmiyor — sayfa 2 içeriği tamamen farklı URL'lerde, bu bir canonical hata olur.

### 2. Robots.txt ile Derin Sayfa Engelleme

Düşük değerli derin sayfaları taratan engelleyin:

```
# 5. sayfadan sonrasını engelle
User-agent: Googlebot
Disallow: /blog/page/5
Disallow: /blog/page/6
...
```

Ya da daha pratik yöntem: dinamik robots meta tag.

```html
<!-- 5. sayfadan sonrası -->
<meta name="robots" content="noindex, follow">
```

"Follow" kalmalı — Googlebot sayfayı indekslemese de sayfa üzerindeki linkleri takip edebilmeli.

### 3. Sayfalama Sayfalarını Optimize Etme

Önemli sayfalama URL'leri (özellikle ilk birkaç sayfa) optimize edilmeli:

**Sayfa başlığı farklılaştırma:**
- Sayfa 1: "SEO Blog Yazıları | Blakfy"
- Sayfa 2: "SEO Blog Yazıları — Sayfa 2 | Blakfy"

**Açıklama:** Her sayfa için benzersiz meta açıklama.

### 4. Sonsuz Kaydırma (Infinite Scroll) Yönetimi

Infinite scroll SEO için sorunlu: Googlebot tıklamadan kaydıramaz.

**Çözüm:** Her "yüklenen" içerik grubuna benzersiz URL verin. Kullanıcı kaydırdıkça URL değişsin:

```
/blog/ → /blog/ (sayfa 1)
(kaydırma) → /blog/#page-2 veya /blog/?page=2
```

URL güncellemesi JavaScript History API ile yapılır. Bu şekilde Googlebot her "sayfa" için ayrı URL görebilir.

### 5. E-ticaret Kategori Sayfalama

E-ticaret sitelerinde sayfalama en kritik:

**Önerilen yaklaşım:**
- Sayfa 1-5: İndekslenebilir, optimize edilmiş
- Sayfa 6+: `noindex, follow`
- Tüm ürünlere ulaşmayı sağlayacak internal link yapısı

**Filtreleme ve sayfalama çakışması:**
`/category/?renk=siyah&sayfa=3` gibi parametreli URL'ler:
- Canonical ile ana kategori sayfasına yönlendirin
- Ya da robots.txt ile Googlebot'u engelleyin

## Pagination ve Core Web Vitals

**Load More butonu:** Her tıklamada yeni içerik yüklemek CLS sorununa yol açabilir — mevcut içerik kayar.

**Infinite Scroll:** Sayfa büyüdükçe DOM ağırlığı artar — LCP ve FID/INP etkilenebilir.

**Sayfa başında pagination menüsü:** Mobilde çok yer kaplayan büyük sayfa numarası menüsü kullanıcı deneyimini olumsuz etkiler.

## Sık Sorulan Sorular

### Sayfa 2'den itibaren noindex versem ne olur?

Sayfa 2+ arama sonuçlarında görünmez ama Googlebot follow ile içeriklere ulaşmaya devam edebilir. Bu genellikle tercih edilen yaklaşım.

### Infinite scroll blog/e-ticaret için iyi mi?

Kullanıcı deneyimi için bazen tercih edilir ama SEO için doğru URL yönetimi yapılmazsa sorunlu. Numaralı sayfalama SEO açısından daha yönetilebilir.

### Tüm sayfalama URL'lerini sitemap'e eklemeli miyim?

Hayır. Sadece ilk birkaç sayfayı (veya indekslenmesini istediğiniz sayfaları) sitemap'e ekleyin.

## Kaynakça

- Google: Pagination — developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Ahrefs: Pagination SEO Guide — ahrefs.com/blog
- Moz: Pagination and SEO — moz.com/blog
- Google Search Central Blog — developers.google.com/search/blog
