wixId: "e5e52bb6-c6ee-4247-99ca-f7449c44fb61"
---
title: "XML Sitemap Rehberi 2025: Oluşturma, Optimizasyon ve Gönderme"
slug: "xml-sitemap-rehberi"
focusKeyword: "xml sitemap rehberi"
seoTitle: "XML Sitemap Rehberi 2025: Oluşturma ve Gönderme | Blakfy"
metaDesc: "XML sitemap nedir, nasıl oluşturulur ve Google Search Console'a nasıl gönderilir? Sitemap türleri, boyut limitleri ve yaygın hatalar için tam rehber."
excerpt: "XML sitemap, Google'a sitenizin içerik haritasını sunar. Doğru yapılandırılmış bir sitemap, özellikle büyük ve yeni sitelerde tarama ve indeksleme hızını artırır."
categories: ["teknik-seo"]
tags: ["seo", "teknik-seo", "google-search-console"]
imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop"
imageAlt: "XML sitemap teknik SEO site haritası"
language: "tr"
status: "published"
---
XML sitemap, web sitenizin URL'lerini ve bu URL'ler hakkındaki meta verileri listeleyen standart formatta bir dosyadır. Arama motorlarına sitenizin içeriğini keşfetmelerinde yardımcı olur. Özellikle büyük siteler, yeni siteler veya iç bağlantı yapısı zayıf siteler için kritik öneme sahiptir.

## XML Sitemap Neden Önemlidir?

**Tarama verimliliği:** Googlebot, sitenizi iç bağlantıları takip ederek keşfeder. Eğer bazı sayfalar iç linklerle iyi bağlanmamışsa, Googlebot bu sayfaları asla bulamayabilir. Sitemap bu boşluğu kapatır.

**İndeksleme hızı:** Yeni yayınladığınız içerikleri sitemap aracılığıyla Google'a bildirirseniz, tarama sırası hızlanır.

**Meta veri paylaşımı:** `lastmod` (son güncelleme tarihi) etiketi Google'a içeriğin ne zaman değiştiğini söyler. Bu, güncellenen içeriklerin daha hızlı yeniden taranmasını sağlar.

**Büyük siteler için zorunlu:** 10.000+ URL'ye sahip bir sitede sitemap olmadan Googlebot tüm sayfaları keşfedemez.

## XML Sitemap Formatı

### Temel Yapı

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/sayfa/</loc>
    <lastmod>2025-03-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/blog/makale/</loc>
    <lastmod>2025-03-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

### Etiket Açıklamaları

**`<loc>` (Zorunlu):** Sayfanın tam URL'si. Her URL benzersiz olmalı ve sitenizin gerçek canonical URL'si olmalıdır.

**`<lastmod>` (Önerilen):** Son değişiklik tarihi. ISO 8601 formatında: `YYYY-MM-DD` veya `YYYY-MM-DDThh:mm:ssTZD`. Google bu değere çok güvenmez çünkü pek çok site her güncelleme yayınlamadan bu değeri değiştiriyor. Ama gerçekçi şekilde kullanıldığında faydalıdır.

**`<changefreq>` (İsteğe bağlı):** Tavsiye edilen tarama sıklığı. Google bu değeri yalnızca ipucu olarak kullanır. Değerler: `always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`.

**`<priority>` (İsteğe bağlı):** 0.0 ile 1.0 arasında öncelik değeri. Google bu değeri de yalnızca ipucu olarak kabul eder. Her şeyi 1.0 yapmanın bir anlamı yok — görece önceliklendirme için kullanın.

## Sitemap Türleri

### URL Sitemap (Standart)

En yaygın kullanılan türdür. Tüm web sayfalarını listeler.

### Görsel Sitemap

Sayfalarınızdaki görselleri Google Görseller için ayrıca listeler.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://example.com/urun/siyah-canta/</loc>
    <image:image>
      <image:loc>https://example.com/gorseller/canta-siyah.jpg</image:loc>
      <image:title>Siyah Deri Çanta</image:title>
      <image:caption>El yapımı siyah deri omuz çantası</image:caption>
    </image:image>
  </url>
</urlset>
```

### Video Sitemap

Video içerikleri için Google'a ek meta veri sağlar.

### Haber Sitemap

Google Haberler'e dahil olmak isteyen haber siteleri için. Yalnızca son 2 günde yayınlanan haberler eklenmeli.

### Sitemap İndeks Dosyası

50.000'den fazla URL veya 50 MB'tan büyük sitemap için birden fazla sitemap dosyasını birleştiren indeks dosyası kullanılır.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-sayfalar.xml</loc>
    <lastmod>2025-03-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-bloglar.xml</loc>
    <lastmod>2025-03-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-urunler.xml</loc>
    <lastmod>2025-03-15</lastmod>
  </sitemap>
</sitemapindex>
```

## Sitemap Boyut Limitleri

- Tek bir sitemap dosyasında maksimum **50.000 URL**
- Maksimum dosya boyutu **50 MB** (sıkıştırılmamış)
- Bu limiti aşıyorsanız sitemap indeks dosyası kullanın

## Platform Bazlı Sitemap Oluşturma

### WordPress

**Yoast SEO:** Otomatik olarak `https://siteniz.com/sitemap_index.xml` adresinde sitemap oluşturur. Ayarlar → SEO → Genel → Özellikler → XML Site Haritaları etkin olmalı.

**Rank Math:** Sitemap modülünü etkinleştirin — `https://siteniz.com/sitemap_index.xml` üretir.

**Yapılandırma önerileri:**
- Yazar arşivlerini sitemap dışında bırakın (genellikle ince içerik)
- Etiket arşivlerini dışarıda bırakın (çok sayıda küçük sayfa)
- Taslak ve özel post türlerini dışarıda bırakın

### Wix

Wix, sitemap'i otomatik olarak yönetir. `https://siteniz.wixsite.com/sitemap.xml` adresinde bulunur. Wix premium planında özel domain'de aktif olur.

### Shopify

Otomatik sitemap: `https://siteniz.com/sitemap.xml`. Ürünler, koleksiyonlar, blog yazıları ve sayfalar ayrı grup haritaları olarak oluşturulur.

### Manuel Oluşturma

Küçük statik siteler için online araçlar:
- XML Sitemap Generator (xml-sitemaps.com)
- Screaming Frog — büyük siteler için site tarayarak sitemap üretir

## Google Search Console'a Sitemap Gönderme

1. GSC'ye giriş yapın
2. Sol menüden "İndeks" → "Site Haritaları" tıklayın
3. "Yeni site haritası ekle" kutusuna URL girin: `sitemap.xml` (sadece son kısım)
4. "Gönder" butonuna tıklayın

**Doğrulama:** Gönderimden sonra "Durum" sütununda "Başarıyla işlendi" yazmalı. "Keşfedilen URL'ler" sayısı sitemap'inizdeki URL sayısına yakın olmalı.

**Birden fazla sitemap:** Her sitemap dosyasını ayrı ayrı ekleyebilirsiniz. Sitemap indeks dosyası kullanıyorsanız yalnızca indeks dosyasını ekleyin.

## Hangi Sayfalar Sitemapa Eklenmeli?

**Eklenmesi gerekenler:**
- Ana sayfa
- Tüm kategori/koleksiyon sayfaları
- Tüm blog yazıları ve ürün sayfaları
- Hakkımızda, İletişim, Hizmetler gibi önemli sayfalar

**Eklenmemesi gerekenler:**
- Noindex etiketi olan sayfalar
- Yönlendirilen (301/302) URL'ler — sadece hedef URL'yi ekleyin
- Duplicate/canonical olmayan sayfalar
- Kullanıcıya özel sayfalar (sepet, hesabım, sipariş)
- Arama sonuç sayfaları ve filtre URL'leri
- Yazıcı dostu sürümler

## Yaygın Sitemap Hataları

### Hata 1: Canonical Olmayan URL'leri Ekleme

Sitemap'teki her URL, sitenin canonical URL'si olmalıdır. Eğer `http://example.com/sayfa/` ile `https://www.example.com/sayfa/` her ikisi de aynı içeriği gösteriyorsa, yalnızca canonical olanı ekleyin.

### Hata 2: Noindex Sayfaları Sitemapa Eklemek

Noindex etiketi koyduğunuz sayfaları sitemap'e eklemek çelişkili sinyal verir. Google bu sayfaları taramak için kaynak harcayacak ama indeksleyemeyecek.

### Hata 3: Sitemap URL'sini robots.txt ile Engellemek

```
# YANLIŞ
User-agent: *
Disallow: /sitemap.xml
```

Sitemap'inizi kendiniz engellemeyin — Google erişemez.

### Hata 4: Gereksiz URL Şişirmesi

Sitemap'e binlerce anlamsız filtre URL'si eklemek tarama bütçesini boşa harcar. Kaliteli, indekslenmesi gereken sayfalara odaklanın.

### Hata 5: lastmod Değerini Güncellememek

CMS'iniz her sayfa güncellemesinde `lastmod` değerini otomatik güncellemiyorsa, Google eski tarihe bakarak sayfayı yeniden taramaya öncelik vermeyebilir.

## Sitemap ve Tarama Bütçesi

Büyük e-ticaret sitelerinde (100.000+ URL) sitemap yönetimi kritiktir:

**Ayrı sitemap dosyaları:** Ürünler, kategoriler, blog yazıları için ayrı sitemap dosyaları oluşturun. GSC'de her birinin performansını ayrı izleyebilirsiniz.

**Öncelik segmentasyonu:** Yüksek dönüşüm sağlayan ürün sayfalarını içeren sitemap'e `priority: 1.0`, arşiv sayfalarına `priority: 0.3` verin.

**Günlük güncelleme:** Çok sayıda yeni ürün veya içerik ekliyorsanız, sitemap'in günlük otomatik güncellenmesi gerekir.

## Sık Sorulan Sorular

### Sitemap olmadan Google beni indeksler mi?

Evet — Google, iç bağlantıları ve dış backlink'leri takip ederek sitenizi bulur. Ama sitemap bu süreci hızlandırır ve derin sayfalara erişimi kolaylaştırır.

### Kaç tane sitemap gönderebilirim?

GSC'ye gönderebileceğiniz sitemap sayısında pratik bir sınır yoktur. Ama her sitemap dosyası 50.000 URL limitine tabidir.

### Sitemap'i ne sıklıkla güncellemeli?

İçerik yayınlama sıklığınıza göre değişir. Blog sitelerinde her yeni yazı yayınlandığında sitemap otomatik güncellenmeli. E-ticaret sitelerinde her ürün ekleme/kaldırma işleminde.

### HTML sitemap ile XML sitemap farkı nedir?

HTML sitemap kullanıcılar içindir — sitenin navigasyonunu gösterir. XML sitemap arama motorları içindir — makine okunabilir format. Her ikisini de bulundurmak iyi bir uygulamadır.

### Sitemap'i GSC'ye göndermeden de çalışır mı?

Evet — sitemap'i `robots.txt` dosyasında belirterek de Google'ın bulmasını sağlayabilirsiniz. Ama GSC üzerinden göndermek daha hızlı ve raporlama sağlar.

## Kaynakça

- Google Arama Merkezi: Sitemap Hakkında Bilgi Edinin — developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Sitemaps.org Protokolü — sitemaps.org
- Yoast SEO: XML Sitemap Guide — yoast.com
- Google Search Central: Video Sitemaps — developers.google.com