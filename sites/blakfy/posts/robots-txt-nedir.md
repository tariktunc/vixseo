wixId: "bfd60617-be88-4a33-b759-dcd1bacde7ba"
description: "Robots.txt dosyası SEO için neden önemlidir? Doğru kullanım rehberi, örnekler ve uzman görüşleriyle robots.txt’nin arama motorları üzerindeki etkisini keşfedin."
---
title: "robots.txt Nedir? SEO İçin Doğru Kullanım Kılavuzu"
slug: "robots-txt-nedir"
focusKeyword: "robots.txt nedir"
seoTitle: "Robots.txt Nedir? SEO İçin Doğru Kullanım Kılavuzu (2025)"

excerpt: "Robots.txt, arama motoru botlarına sitenizin hangi bölümlerini tarayabileceğini söyleyen metin dosyasıdır. Yanlış yapılandırma tüm sitenizin Google'dan kaybolmasına yol açabilir."
categories: [seo]
tags: ["seo", "teknik-seo"]
imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=900&fit=crop"
imageAlt: "Robots.txt teknik SEO yapılandırma kodu"
language: "tr"
status: "published"
---
Robots.txt, web sitenizin kök dizininde yer alan düz metin dosyasıdır. Arama motoru botlarına (Googlebot, Bingbot, vb.) sitenizin hangi bölümlerini tarayıp tarayamayacaklarını söyler. Doğru yapılandırılmış bir robots.txt, tarama bütçenizi korumanıza ve hassas sayfaların indekslenmesini engellemenize yardımcı olur. Yanlış yapılandırılmış bir robots.txt ise tüm sitenizi arama motorlarından silmenize neden olabilir.

## Robots.txt Nasıl Çalışır?

Googlebot bir siteyi taramak istediğinde ilk olarak `https://siteniz.com/robots.txt` adresine bakar. Buradaki direktifleri okur ve buna göre hareket eder.

**Önemli:** robots.txt bir tavsiyedir, zorunluluk değil. Kötü niyetli botlar robots.txt'i yok sayar. Bu nedenle hassas içerik için robots.txt yetmez — `noindex` etiketi veya şifre koruması gerekir.

**Robots.txt'in Etkisi:**
- Sayfanın **taranmasını** engeller
- Taranmasına izin verir ama indeksleme kararı Google'dadır
- Bir sayfa robots.txt ile engellenmişse Google onu indeksleyemez

**Kritik ayrım:** robots.txt taramayı engeller ama indekslemeden farklıdır. Eğer başka bir sayfadan engellenen sayfaya link varsa, Google bu sayfa URL'sini "görür" ve arama sonuçlarında URL'yi başlıksız/açıklamasız gösterebilir. Sayfayı tamamen gizlemek için hem robots.txt hem de `noindex` kullanılması gerekir.

## Robots.txt Sözdizimi

Temel yapı iki direktiften oluşur:

```
User-agent: [bot adı veya *]
Disallow: [engellenen yol]
Allow: [izin verilen yol]
```

### User-agent

Direktifin hangi bot için geçerli olduğunu belirtir.

```
User-agent: *           # Tüm botlar için
User-agent: Googlebot   # Yalnızca Googlebot için
User-agent: Bingbot     # Yalnızca Bingbot için
User-agent: GPTBot      # ChatGPT tarama botu için
```

### Disallow

Botun tarayamayacağı yolu belirtir.

```
Disallow: /admin/        # /admin/ ve altındaki her şeyi engeller
Disallow: /private.html  # Yalnızca bu dosyayı engeller
Disallow: /              # Tüm siteyi engeller (DİKKAT!)
Disallow:                # Hiçbir şeyi engellemez (boş = izinli)
```

### Allow

Disallow kuralının istisnasını belirtir. Disallow'dan daha spesifik bir yolu izin vermek için kullanılır.

```
User-agent: Googlebot
Disallow: /klasor/
Allow: /klasor/acik-sayfa.html
```

Bu örnekte Googlebot `/klasor/` altındaki her şeyi tarayamaz, ama `/klasor/acik-sayfa.html` istisnası vardır.

### Sitemap Direktifi

Robots.txt içinde XML site haritanızın konumunu belirtebilirsiniz:

```
Sitemap: https://siteniz.com/sitemap.xml
```

Bu isteğe bağlıdır ama iyi bir uygulama olarak önerilir.

### Crawl-delay

Bazı botların istekler arasında beklemesi için kullanılır. Google bu direktifi resmi olarak desteklemiyor ama Bing ve bazı diğer botlar destekler.

```
User-agent: Bingbot
Crawl-delay: 5
```

## Örnek Robots.txt Dosyaları

### Temel Örnek (Çoğu Site)

```
User-agent: *
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /login/
Disallow: /sepet/
Disallow: /hesabim/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://siteniz.com/sitemap.xml
```

### E-ticaret Sitesi

```
User-agent: *
Disallow: /sepet/
Disallow: /odeme/
Disallow: /hesabim/
Disallow: /favorilerim/
Disallow: /arama?
Disallow: /urun?sort=
Disallow: /urun?filter=

Sitemap: https://siteniz.com/sitemap.xml
Sitemap: https://siteniz.com/sitemap-urunler.xml
```

### Yapay Zeka Botlarını Engelleme

Eğer içeriğinizin AI modelleri tarafından eğitim için kullanılmasını istemiyorsanız:

```
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: *
Disallow: /admin/
```

### Tüm Siteyi Açma

```
User-agent: *
Disallow:
```

Boş `Disallow:` hiçbir şeyi engellemez — tüm site taranabilir.

## WordPress'te Robots.txt

WordPress sitelerde robots.txt iki şekilde yönetilir:

**Yoast SEO veya Rank Math:** Yönetim → Araçlar → Dosya Düzenleyici üzerinden robots.txt'i düzenleyebilirsiniz. Eklenti otomatik olarak bazı kurallar ekler.

**Fiziksel dosya:** Sunucunuzda `/public_html/robots.txt` dosyasını doğrudan düzenleyin. Fiziksel dosya varsa WordPress sanal robots.txt'i devre dışı kalır.

**Varsayılan WordPress robots.txt:**
```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
```

## Robots.txt Doğrulama

### Google Search Console Tester

Google Search Console'da "Eski Araçlar" → "robots.txt Tester" üzerinden robots.txt'inizi test edebilirsiniz. Belirli bir URL'nin engeli alıp almadığını kontrol eder.

### Manuel Kontrol

Tarayıcınızda `https://siteniz.com/robots.txt` adresine gidin — dosya orada mı, içerik doğru mu?

### Çevrimiçi Araçlar

- Google'ın robots.txt Tester (GSC içinde)
- Screaming Frog — Site taraması sırasında robots.txt'i parse eder

## Yaygın Robots.txt Hataları

### Hata 1: Tüm Siteyi Engelleme

```
# YANLIŞ — Tüm site engelleniyor
User-agent: *
Disallow: /
```

Geliştirme veya test ortamında kullanılan bu yapı, üretim ortamına yanlışlıkla kopyalanırsa tüm site Google'dan kaybolur. GSC bu durumu uyarı olarak gösterir.

### Hata 2: CSS ve JS Dosyalarını Engelleme

```
# YANLIŞ
User-agent: *
Disallow: /wp-includes/
Disallow: /wp-content/themes/
```

Google, sayfaları render ederken CSS ve JavaScript dosyalarına ihtiyaç duyar. Bu dosyaları engellerseniz, Google sayfanın nasıl göründüğünü doğru anlayamaz ve mobile-first indexing ile rendering sorunları yaşar.

### Hata 3: Dinamik URL Parametrelerini Yanlış Engelleme

```
# YANLIŞ — ? karakteri URL'de değil path'te beklendiği gibi çalışmaz
User-agent: *
Disallow: /?page=
```

Doğru kullanım:
```
User-agent: *
Disallow: /arama?
```

Bu `?` ile başlayan tüm query string'leri o path için engeller.

### Hata 4: Noindex Yerine Disallow Kullanmak

Bazıları Google'ın belirli sayfaları indekslemesini engellemek için robots.txt Disallow kullanır. Ama Disallow yalnızca taramayı engeller — sayfa zaten indekslendiyse veya başka sitelerden link alıyorsa URL arama sonuçlarında görünmeye devam edebilir.

Sayfayı indeks dışı bırakmak için `<meta name="robots" content="noindex">` etiketini kullanın.

## Robots.txt ile Tarama Bütçesi Optimizasyonu

Büyük sitelerde Googlebot sınırlı bir tarama bütçesiyle çalışır. Değersiz sayfaları robots.txt ile engelleyerek bütçeyi önemli sayfalara yönlendirebilirsiniz.

**Engellenebilecek URL türleri:**
- Arama sonuç sayfaları (`/arama?q=`)
- Filtre ve sıralama URL'leri (`?sort=fiyat&order=asc`)
- Kullanıcıya özel sayfalar (hesabım, sipariş takip)
- Tekrar eden içerik (yazıcı dostu sürüm vb.)
- UTM parametreli URL'ler

## Sık Sorulan Sorular

### Robots.txt yoksa ne olur?

Eğer robots.txt dosyası yoksa, botlar 404 alır ve tüm siteyi taranabilir kabul eder. Bu bir sorun değil — robots.txt zorunlu değildir.

### Robots.txt değişikliklerinin etkisi ne kadar sürer?

Google robots.txt'i genellikle 24 saat içinde yeniden tarar. Ama eski kural altında taranmış sayfalar indekste kalmaya devam edebilir. İndeksten kaldırma için noindex veya 410 kullanın.

### Robots.txt ile gizli dosyaları koruyabilir miyim?

Hayır. Robots.txt dosyası herkese açık okunabilir. Hassas dizinleri robots.txt ile "gizlemek" güvenlik önlemi sayılmaz — aksine, kötü niyetli kişilere gizlemek istediğiniz yolları göstermiş olabilirsiniz. Gerçek koruma için şifre ve sunucu düzeyinde erişim kontrolü kullanın.

### Bir sayfayı robots.txt ile engelledim ama hâlâ indekste görünüyor, neden?

Başka bir siteden bu sayfaya backlink geliyorsa, Google URL'yi "görür" ve indekse alabilir — ama ziyaret edemediği için başlık ve açıklama çıkaramaz. Sayfayı tamamen indeksten çıkarmak için robots.txt + noindex birlikte kullanın veya sadece noindex yeterlidir.

## Kaynakça

- Google Arama Merkezi: robots.txt Spesifikasyonu — developers.google.com/search/docs/crawling-indexing/robots/intro
- Google: Robots Exclusion Protocol — developers.google.com
- Yoast SEO: Robots.txt Guide — yoast.com
- Moz: Robots.txt — moz.com/learn/seo/robotstxt