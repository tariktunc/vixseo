wixId: "421c2dac-cccc-4c53-bbe0-430baf5c2173"
---
title: "Crawl Bütçesi Nedir? Büyük Siteler için Optimizasyon Rehberi"
slug: "crawl-butcesi-optimizasyonu"
focusKeyword: "crawl bütçesi optimizasyonu"
seoTitle: "Crawl Bütçesi Nedir? Optimizasyon Rehberi 2025 | Blakfy"
metaDesc: "Crawl bütçesi nedir, nasıl yönetilir? Googlebot tarama kapasitesi, crawl demand, orphan pages ve tarama bütçesi optimizasyon teknikleri."
excerpt: "Crawl bütçesi, Google'ın belirli bir sürede sitenizde tarayabileceği maksimum sayfa sayısıdır. Büyük siteler için yanlış yönetim, önemli sayfaların taranmamasına yol açar."
categories: ["teknik-seo"]
tags: ["seo", "teknik-seo"]
imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&h=900&fit=crop"
imageAlt: "Crawl bütçesi optimizasyon teknik SEO"
language: "tr"
status: "published"
---
Crawl bütçesi (tarama bütçesi), Googlebot'un belirli bir süre içinde bir web sitesini taramak için harcayabileceği kapasite ve bu kapasiteye karşı sitenizin talep ettiği tarama kaynağı arasındaki denge olarak tanımlanır. Küçük ve orta ölçekli siteler için genellikle bir sorun oluşturmaz. Ama 10.000 URL'yi aşan büyük siteler, e-ticaret platformları ve ölçeklenebilir içerik üretimi yapan siteler için crawl bütçesi kritik bir SEO faktörüdür.

## Crawl Bütçesi Nasıl Belirlenir?

Google'ın bir site için tahsis ettiği tarama bütçesi iki faktörün kesişiminde oluşur:

**Crawl Capacity Limit (Tarama Kapasitesi Limiti):** Googlebot, sitenizin sunucusunu aşırı yüklememek için aynı anda gönderebileceği istek sayısını sınırlar. Sunucu yanıt süresi yavaşladığında Googlebot daha az agresif tarar. Hızlı ve stabil sunucular daha fazla tarama kapasitesi alır.

**Crawl Demand (Tarama Talebi):** Google'ın sitenizin belirli URL'lerini ne kadar taramak istediğini etkileyen faktörler:
- Sitenin genel popülaritesi ve otorite seviyesi
- İçeriğin güncelliği (çok güncellenen siteler daha sık taranır)
- Yeni URL'lerin keşfedilmesi

Bu iki faktörün birleşimi sitenizin günlük tarana URL sayısını belirler.

## Crawl Bütçesi Kimler için Önemli?

Google'ın resmi açıklamasına göre crawl bütçesi aşağıdaki siteler için önemlidir:

- **100.000+ URL'ye sahip büyük siteler**
- Sık içerik güncelleyen ve yeni URL üreten siteler (haber siteleri)
- URL parametreleri nedeniyle çok sayıda varyant URL üreten siteler
- Zayıf iç bağlantı yapısı olan büyük siteler
- Yavaş sayfa hızına sahip siteler

10.000 URL'nin altındaki siteler için crawl bütçesi genellikle sorun oluşturmaz — Google bu tür siteleri birkaç günde bir kapsamlı biçimde tarayabilir.

## Crawl Bütçesini Boşa Harcayan URL Türleri

Crawl bütçenizin büyük bölümü değersiz URL'lerin taranmasına giderse, önemli sayfalar taranmayı bekler.

**Faceted navigation URL'leri:** E-ticaret sitelerinde filtre kombinasyonları binlerce URL üretir:
```
/urunler/?renk=kirmizi&beden=M&siralama=fiyat-artan
/urunler/?renk=mavi&beden=L&siralama=populer
```
Her kombinasyon ayrı URL sayılır — milyonlarca URL üretilebilir.

**URL parametreleri:** Sıralama, oturum ID'si, UTM parametreleri:
```
/sayfa/?utm_source=google&utm_medium=cpc
/sayfa/?session_id=abc123
/sayfa/?sort=price&order=asc
```

**Sayfalama URL'leri:** Uzun kategori sayfalarında `/sayfa-2/`, `/sayfa-3/` vb.

**Duplicate sayfalar:** Canonical URL olmaksızın birden fazla versiyon erişilebilen sayfalar.

**Kırık bağlantı hedefleri:** 404 dönen URL'ler Googlebot tarafından tekrar tekrar denenir.

**Yönlendirme zincirleri:** A → B → C → D şeklinde uzun zincirler her taramada ek istek tüketir.

## Crawl Bütçesini Optimize Etme Yöntemleri

### 1. robots.txt ile Değersiz URL'leri Engelle

```
User-agent: *
Disallow: /sepet/
Disallow: /arama?
Disallow: /hesabim/
Disallow: /urunler?sort=
Disallow: /urunler?filter=
```

Dikkat: robots.txt yalnızca taramayı engeller, indekslemeyi değil. Zaten indekslenmiş sayfalar indekste kalmaya devam eder.

### 2. Canonical URL Kullan

Parametre varyantları için canonical etiketi ana URL'ye işaret etmeli:
```html
<!-- /urunler/?sort=fiyat sayfasında -->
<link rel="canonical" href="https://example.com/urunler/" />
```

### 3. Google Search Console'da URL Parametrelerini Yönet

GSC → Eski Araçlar → URL Parametreleri bölümünde hangi parametrelerin taranmayacağını belirtebilirsiniz.

### 4. XML Sitemap'i Optimize Et

Sitemap'e yalnızca indekslenmesi gereken, kaliteli içerikli URL'leri ekleyin. Noindex sayfaları, parametre URL'lerini ve yönlendirilen URL'leri sitemap'ten çıkarın.

### 5. İç Bağlantı Yapısını Güçlendir

Önemli sayfaların iç bağlantı alması, Googlebot'un bu sayfalara öncelik vermesini sağlar.

### 6. Sayfa Hızını Artır

Hızlı yüklenen sayfalar, Googlebot'un aynı sürede daha fazla sayfa taramasına olanak tanır. Sunucu yanıt süresi 200ms'nin altında olmalı.

### 7. 404 ve Yönlendirme Sorunlarını Temizle

Kırık URL'ler ve uzun yönlendirme zincirleri crawl bütçesi tüketir. Screaming Frog ile düzenli denetim yapın.

## Crawl Bütçesi Durumunu İzleme

### Google Search Console — Kapsam Raporu

Hangi URL'lerin tarandığını ve hangilerinin sorun yaşadığını gösterir. "Keşfedildi — şu an sıraya alındı" sayısı yüksekse, bu sayfalar taranmayı bekliyor demektir.

### Google Search Console — URL İnceleme

Belirli bir sayfanın son tarama tarihini kontrol edin. Kritik sayfalar ne zaman son tarandı?

### Log Dosyası Analizi

Sunucu log dosyaları, Googlebot'un sitenize tam olarak ne zaman, hangi URL'leri taradığını gösterir. Bu en doğrudan crawl bütçesi analizidir.

Log'da aranacaklar:
```
Googlebot/2.1 → Her satır bir Googlebot ziyareti
Yanıt süreleri → Yavaş URL'ler tarama kapasitesini tüketir
404 ve 301 yanıtları → Temizlenmesi gereken URL'ler
Sık tekrar eden parametre URL'leri → Engellenmesi gerekenler
```

**Araçlar:** Screaming Frog Log File Analyser, Botify, Lumar (eski adıyla DeepCrawl)

## E-ticaret Siteleri için Crawl Bütçesi Stratejisi

Trendyol veya kendi e-ticaret sitenizi işletiyorsanız:

**Ürün filtreleri:** Faceted navigation en büyük crawl bütçesi kaynağıdır. Seçenekler:
- `rel="nofollow"` filtre bağlantılarına ekle
- Canonical ile ana kategori sayfasına işaret et
- JavaScript ile filtreleme yap (URL değişmez)
- robots.txt ile parametre URL'lerini engelle

**Stok dışı ürünler:** Yüzlerce veya binlerce stokta olmayan ürün sayfası var mı? Bu sayfaları noindex yapın veya ana kategoriye canonical işaret ettirin.

**Paginated kategoriler:** 50 sayfalık bir kategori arşivinde son sayfalardaki ürünler hiç taranmayabilir. İlk sayfaları iç bağlantıyla güçlendirin.

## Crawl Bütçesi ile İlgili Yanlış Bilinenler

**Yanlış: Her site için crawl bütçesi kritiktir**
Doğrusu: 10.000 URL'nin altındaki sitelerde Google genellikle her şeyi zamanında tarar. Küçük siteler için bütçe optimizasyonu zaman kaybıdır.

**Yanlış: robots.txt ile engellenen sayfalar indeksten çıkar**
Doğrusu: robots.txt taramayı engeller ama indeksi değil. Sayfa zaten indekslendiyse arama sonuçlarında kalmaya devam eder.

**Yanlış: Daha fazla sitemap = daha fazla tarama**
Doğrusu: Sitemap'e çok sayıda değersiz URL eklemek tarama bütçesini tüketir. Az ama kaliteli URL içeren sitemap daha iyidir.

## Sık Sorulan Sorular

### Crawl bütçemi nasıl artırabilirim?

Doğrudan artırma mümkün değil. Sunucu hızını artırmak, site otoritesini güçlendirmek ve gereksiz URL'leri azaltmak dolaylı olarak etkiler. Google, güçlü ve hızlı siteleri daha agresif tarar.

### Googlebot ne kadar sıklıkla siteleri tarar?

Yüksek otorite ve sık güncellenen siteler günde birden fazla kez taranabilir. Küçük ve az güncellenen siteler haftada bir veya iki haftada bir taranabilir.

### Crawl bütçesi sorunum var mı nasıl anlarım?

GSC Kapsam raporunda çok sayıda "Keşfedildi — şu an sıraya alındı" URL varsa işaret var demektir. Ayrıca önemli yeni sayfaların indekslenmesi normalden yavaşsa da crawl bütçesi sorununa işaret eder.

## Kaynakça

- Google Arama Merkezi: Büyük Siteler için Tarama Yönetimi — developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget
- Google Search Central Blog: Crawl Budget Made for Googlebot — developers.google.com/search/blog
- Screaming Frog: Log File Analyser — screaming-frog.co.uk
- Botify: Crawl Budget Guide — botify.com