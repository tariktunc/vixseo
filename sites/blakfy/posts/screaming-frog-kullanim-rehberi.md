wixId: "4e02e6a8-b4bb-4e09-87b9-6eb0df3ef5f6"
---
title: "Screaming Frog Kullanımı: Site Tarama ve SEO Denetim Rehberi"
slug: "screaming-frog-kullanim-rehberi"
focusKeyword: "screaming frog kullanımı"
seoTitle: "Screaming Frog Kullanım Rehberi 2025: SEO Site Tarama | Blakfy"
metaDesc: "Screaming Frog SEO Spider nasıl kullanılır? Site tarama, kırık bağlantı, duplicate content, meta etiket ve yönlendirme analizi için adım adım rehber."
excerpt: "Screaming Frog, web sitenizi Googlebot gibi tarayarak teknik SEO sorunlarını tespit eden masaüstü uygulamasıdır. Ücretsiz sürümü 500 URL tarayabilir."
categories: ["google-araclari"]
tags: ["seo", "teknik-seo", "screaming-frog"]
imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1600&h=900&fit=crop"
imageAlt: "Screaming Frog SEO site tarama teknik analiz"
language: "tr"
status: "published"
---
Screaming Frog SEO Spider, web sitenizi arama motoru botlarına benzer şekilde tarayarak teknik SEO sorunlarını tespit eden masaüstü uygulamasıdır. İngiltere merkezli Screaming Frog şirketinin geliştirdiği araç, SEO profesyonellerinin vazgeçilmez parçası haline geldi. Ücretsiz sürüm 500 URL tarayabilir; lisanslı sürüm (~£259/yıl) sınırsız tarama ve gelişmiş özellikler sunar.

## Neden Screaming Frog?

**Google Search Console'dan farkı:** GSC Google'ın gördüğü verileri gösterir. Screaming Frog ise sitenizi anlık ve kapsamlı biçimde tarayarak her sayfanın teknik durumunu gösterir.

**Temel kullanım alanları:**
- Kırık bağlantıları (404) tespit etme
- Redirect zincirleri ve döngüleri bulma
- Duplicate (yinelenen) başlık ve meta açıklama tespiti
- Eksik veya çok uzun/kısa meta etiketleri
- Görsel alt text eksiklikleri
- Canonical URL kontrolü
- Sayfa hızı analizi
- Yapılandırılmış veri kontrolü

## Kurulum

screaming-frog.co.uk/seo-spider adresinden Windows, Mac ve Linux versiyonlarını indirin. Kurulum standart uygulama kurulumu gibi.

**Sistem gereksinimleri:** Java Runtime ortamı gerektirir (uygulama kendi içinde dahil eder). Büyük siteler (10.000+ URL) için en az 4GB RAM önerilir.

## İlk Tarama

Uygulamayı açın → Üst kısımdaki URL alanına sitenizi girin → "Start" tuşuna basın.

**Konfigürasyon önerileri (tarama başlamadan):**

Configuration → Spider:
- "Crawl all subdomains" — kapatın (yalnızca ana domain)
- "Follow redirects" — açık bırakın
- "Crawl linked XML sitemaps" — açın (sitemap'teki URL'leri de tara)

Configuration → Robots.txt:
- "Respect robots.txt" — SEO audit için kapatabilirsiniz (tüm sayfaları görmek için)

**Tarama hızı:** Configuration → Speed → Threads ve Max URL/s değerini ayarlayın. Üretim sunucusu için düşük değer (2-3 thread, 5-10 URL/s) kullanın — sunucu yükünü düşürür.

## Ana Sekmeler ve Raporlar

### Internal (İç Sayfalar) Sekmesi

Tüm iç URL'lerin listesi. En temel ve kapsamlı görünüm.

**Önemli kolonlar:**
- Status Code: 200 (iyi), 301 (yönlendirme), 404 (kırık), 5xx (sunucu hatası)
- Title: Her sayfanın başlığı
- Meta Description: Her sayfanın meta açıklaması
- H1: Ana başlık
- Word Count: Kelime sayısı
- Indexability: İndekslenebilir mi?
- Canonical: Canonical URL

### Response Codes Filtreleme

Sol kenar çubuğundan "Response Codes" → İstediğiniz kodu seçin:

**4xx (Client Errors):** 404 dönen URL'ler — kırık sayfa veya bağlantı.

**3xx (Redirects):** Yönlendirilen URL'ler — zincir veya döngü var mı?

**2xx (Success):** Başarılı sayfa — içerik kalitesi sorunları buradan analiz edilir.

### Page Titles Sekmesi

Sol kenar çubuğundan "Page Titles":

**Missing:** Başlık etiket eksik sayfalar
**Duplicate:** Aynı başlıkla birden fazla sayfa
**Over 60 Characters:** 60 karakteri geçen başlıklar (Google'da kesilir)
**Below 30 Characters:** 30 karakterin altında başlıklar (çok kısa)

### Meta Description Sekmesi

Sol kenar çubuğundan "Meta Description":

**Missing:** Meta açıklama eksik sayfalar
**Duplicate:** Aynı meta açıklama
**Over 155 Characters:** Çok uzun (Google keser)
**Below 70 Characters:** Çok kısa

### H1 Sekmesi

**Missing:** H1 etiketi eksik
**Duplicate:** Birden fazla sayfada aynı H1
**Multiple:** Bir sayfada birden fazla H1

### Images Sekmesi

**Missing Alt Text:** Alt text eksik görseller
**Alt Text Over 100 Characters:** Çok uzun alt text
**Over [Boyut] KB:** Büyük dosyalar (performans sorunu)

## Kırık Bağlantı Analizi

Tarama tamamlandıktan sonra:

1. "Response Codes" → "4xx" seçin
2. Sağ altta "Inlinks" sekmesine tıklayın → Bu 404 URL'ye nereden link verildiğini gösterir
3. Export ile listeyi dışa aktarın

Bu liste, düzeltmeniz gereken iç bağlantıları gösterir.

**Toplu düzeltme:** 404 URL'lere gelen linkleri yeni (doğru) URL ile güncelleyin ya da 301 yönlendirme ekleyin.

## Redirect Analizi

Tarama sırasında "Response Codes" → "3xx":

**Redirect chains:** URL A → B → C → D gibi zincirler. Bunları direkt A → D yapın.

**Redirect loops:** A → B → A sonsuz döngü. Sunucu yapılandırmasında düzeltin.

**Internal links to redirects:** İç bağlantılarda 301 URL'ler var mı? Direkt hedef URL'ye yönlendirin.

## Duplicate Content Analizi

### Duplicate Page Titles

"Page Titles" → "Duplicate" — Aynı başlığa sahip sayfalar. Her sayfanın benzersiz, ilgili başlığı olmalı.

### Exact Duplicate Pages

Tam içerik kopyası olan sayfalar. "Exact Duplicate" filter veya "Analytics" sekmesiyle bulunabilir.

### Near Duplicate

İçeriği çok benzer ama tam kopya olmayan sayfalar. "Near Duplicate" filtresi Pro versiyonda.

## Meta Robots ve Canonical Kontrol

"Page Titles" sekmesinde "Indexability" kolonunu inceleyin:

**Indexable:** Normal, indekslenebilir
**Non-Indexable:** Noindex etiketi veya canonical sorunuyla indekslenemiyor

**Canonical kontrolü:**

"Canonicals" sekmesi:
- Non-Canonical Pages: Canonical farklı URL işaret eden sayfalar
- Missing: Canonical etiketi eksik sayfalar

## Sitemap Entegrasyonu

Configuration → Crawl Linked XML Sitemaps aktifken, sitemap'teki URL'ler de taranır.

**Fayda:** Sitemap'te listelenmiş ama iç bağlantılarla ulaşılamayan "orphan" sayfaları bulabilirsiniz.

Tarama bitti → Sol kenar çubuğu → "Sitemaps" — Sitemap URL'sini içe aktararak, sitemap'te olup sitede olmayan URL'leri bulabilirsiniz.

## Dışa Aktarma (Export)

Her sekme ve filtre için veriyi CSV olarak dışa aktarabilirsiniz.

**En kullanışlı exportlar:**
- Tüm iç URL'ler: Internal → Export
- 404 URL'ler: 4xx filter → Export
- Duplicate başlıklar: Page Titles → Duplicate → Export
- Eksik alt textler: Images → Missing Alt Text → Export

Bu CSV dosyaları müşteriyle veya ekiple paylaşmak için standart SEO raporu formatı olarak kullanılır.

## Log Dosyası Analizi (Log File Analyser)

Screaming Frog'un ayrı bir uygulaması olan "Log File Analyser", sunucu log dosyalarını analiz eder.

**Ne gösterir:** Googlebot sitenizi gerçekte ne zaman, hangi URL'leri ziyaret etti? Crawl budget analizi için en doğru veri kaynağı.

**Kullanım:** Hosting sağlayıcınızdan sunucu log dosyasını alın → Log File Analyser'a yükleyin.

## Sık Kullanılan Kısayollar

- **Ctrl+F:** Belirli URL ara
- **Sağ tık → Scrape Similar:** Belirli bir sayfadan veri kazı
- **Bulk Export:** Reports menüsünden toplu rapor

## Screaming Frog vs Ahrefs Site Audit

| | Screaming Frog | Ahrefs Site Audit |
|---|---|---|
| **Çalışma yeri** | Masaüstü uygulama | Bulut (web) |
| **Ücret** | £259/yıl (lisanslı) | Ahrefs planına dahil |
| **Hız** | Çok hızlı (lokal) | Orta |
| **Derinlik** | Çok detaylı | Detaylı |
| **Log analizi** | Evet (ayrı uygulama) | Hayır |
| **JavaScript render** | Evet (konfigürasyon gerekir) | Evet |

## Sık Sorulan Sorular

### Screaming Frog ücretsiz sürümü yeterli mi?

500 URL'nin altındaki siteler için ücretsiz sürüm yeterlidir. Daha büyük siteler için lisans gerekir.

### Tarama sırasında site yavaşlar mı?

Agresif tarama ayarı (çok sayıda thread, yüksek URL/s) sunucu yükünü artırabilir. Üretim ortamında düşük hız ayarı kullanın veya gece saatlerinde tarayın.

### JavaScript ile oluşturulan içerik taranabilir mi?

Configuration → Spider → "Crawl JavaScript" → JavaScript rendering desteğini etkinleştirin. Bu özellik Pro versiyonda çalışır ve ek zaman alır.

### Screaming Frog verilerini Looker Studio'ya aktarabilir miyim?

Evet — CSV export alıp Looker Studio'ya veri kaynağı olarak ekleyebilirsiniz. Ayrıca Screaming Frog'un GSC, GA4 ve PageSpeed Insights API entegrasyonları da var.

## Kaynakça

- Screaming Frog Kullanım Kılavuzu — screaming-frog.co.uk/seo-spider/user-guide
- Screaming Frog YouTube Kanalı — youtube.com/screamingfrog
- Ahrefs: Screaming Frog Tutorial — ahrefs.com/blog/screaming-frog-seo-spider
- Search Engine Journal: Screaming Frog Review — searchenginejournal.com