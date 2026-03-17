wixId: "102cbcb7-2975-4357-a437-d80b178441d4"
---
title: "301 vs 302 Redirect: Fark Nedir ve SEO'da Doğru Kullanım"
slug: "301-vs-302-redirect"
focusKeyword: "301 vs 302 redirect"
seoTitle: "301 vs 302 Redirect: SEO'da Doğru Kullanım Rehberi 2025 | Blakfy"
metaDesc: "301 kalıcı yönlendirme ile 302 geçici yönlendirme arasındaki fark nedir? SEO değeri aktarımı, link juice ve yaygın yönlendirme hataları için rehber."
excerpt: "301 yönlendirme link juice'u tamamen aktarırken, 302 geçici sinyal verir ve SEO değeri belirsizleşir. Yanlış seçim sıralama kaybına yol açabilir."
categories: ["teknik-seo"]
tags: ["seo", "teknik-seo"]
imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1600&h=900&fit=crop"
imageAlt: "301 302 redirect yönlendirme teknik SEO"
language: "tr"
status: "published"
---
HTTP yönlendirmeleri, bir URL'nin başka bir URL'ye yönlendirildiğini tarayıcılara ve arama motorlarına bildiren sunucu yanıtlarıdır. SEO açısından en kritik olanları 301 (kalıcı) ve 302 (geçici) yönlendirmelerdir. Hangisini kullandığınız, link değerinin aktarılıp aktarılmadığını doğrudan etkiler.

## HTTP Yönlendirme Nedir?

Bir kullanıcı veya bot bir URL'ye istek gönderdiğinde, sunucu birkaç farklı yanıt verebilir:

- **200 OK:** Sayfa bulundu, içerik sunuluyor
- **301 Moved Permanently:** Sayfa kalıcı olarak başka URL'ye taşındı
- **302 Found (Temporary Redirect):** Sayfa geçici olarak başka URL'de
- **307 Temporary Redirect:** 302'ye benzer ama HTTP metodunu korur
- **308 Permanent Redirect:** 301'e benzer ama HTTP metodunu korur
- **404 Not Found:** Sayfa bulunamadı
- **410 Gone:** Sayfa kalıcı olarak silindi

## 301 Kalıcı Yönlendirme

**Anlattığı şey:** "Bu sayfa kalıcı olarak yeni adrese taşındı. Lütfen tüm referanslarınızı güncelleyin."

**SEO etkisi:** 301 yönlendirme, orijinal URL'nin sahip olduğu SEO değerini (link juice, PageRank sinyalleri) büyük ölçüde yeni URL'ye aktarır. Google, 301 yönlendirmelerden geçen link juice'u tam veya neredeyse tam olarak aktarır.

**Tarayıcı davranışı:** İlk ziyaretten sonra tarayıcı yeni URL'yi önbelleğe alır. Kullanıcı tekrar eski URL'yi girdiğinde, sunucuya istek göndermeden direkt yeni URL'ye gider.

**Ne zaman kullanılır:**
- Site taşıma (eski domain → yeni domain)
- URL yapısı değişikliği (www'lu → www'suz)
- HTTP → HTTPS geçişi
- Sayfa kalıcı olarak silindi ve içerik başka URL'de devam ediyor
- Alan adı konsolidasyonu (birden fazla domain → tek domain)

## 302 Geçici Yönlendirme

**Anlattığı şey:** "Bu sayfa şu an bu adreste, ama yakında eski adresine dönecek."

**SEO etkisi:** Google, 302 yönlendirmelerden geçen link juice'u tam olarak aktarmaz. Arama motorları orijinal URL'yi hâlâ "gerçek" sayfa olarak kabul eder. Backlink değeri ikiye bölünür veya belirsizleşir.

**Tarayıcı davranışı:** Tarayıcı her seferinde orijinal URL'ye gider, sunucu her seferinde yönlendirme bilgisi gönderir. Önbelleğe almaz.

**Ne zaman kullanılır:**
- A/B testi (geçici süreyle alternatif sayfa test ediliyor)
- Bakım modu (site geçici kapalı, alt sayfa için)
- Sezonluk kampanya (belirli tarihler arası yönlendirme)
- Kullanıcıya özel yönlendirmeler (coğrafi, login durumu)

## 301 vs 302: SEO Karşılaştırması

| | 301 Kalıcı | 302 Geçici |
|---|---|---|
| **Link juice aktarımı** | Tam (%100'e yakın) | Kısmi veya yok |
| **İndeksleme kararı** | Yeni URL indekslenir | Eski URL indekste kalır |
| **Tarayıcı önbelleği** | Uzun süreli | Kısa süreli |
| **Kullanım amacı** | Kalıcı değişiklik | Geçici değişiklik |
| **SEO riski** | Düşük (doğru kullanılırsa) | Uzun süre kullanılırsa yüksek |

## 307 ve 308 Yönlendirmeleri

Modern HTTP/2 ile birlikte iki ek yönlendirme türü önem kazandı:

**307 Temporary Redirect:** 302'nin modern eşdeğeri. Farkı: POST isteği 307'den geçerken de POST olarak kalır. 302'de tarayıcılar genellikle POST'u GET'e dönüştürür.

**308 Permanent Redirect:** 301'in modern eşdeğeri. POST metodunu korur.

SEO açısından 301 = 308, 302 = 307 davranışı gösterir. Çoğu durumda 301 ve 302 yeterlidir.

## Yönlendirme Nasıl Oluşturulur?

### Apache (.htaccess)

```apache
# 301 yönlendirme — tek URL
Redirect 301 /eski-sayfa/ https://example.com/yeni-sayfa/

# 301 yönlendirme — alan adı değişikliği
RewriteEngine On
RewriteCond %{HTTP_HOST} ^eskidomain\.com$ [NC]
RewriteRule ^(.*)$ https://yenidomain.com/$1 [R=301,L]

# HTTP → HTTPS yönlendirme
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# 302 yönlendirme
Redirect 302 /gecici-sayfa/ https://example.com/hedef/
```

### Nginx

```nginx
# 301 yönlendirme
server {
    return 301 https://example.com$request_uri;
}

# Belirli URL 301 yönlendirme
location = /eski-sayfa/ {
    return 301 https://example.com/yeni-sayfa/;
}

# 302 yönlendirme
location = /gecici/ {
    return 302 https://example.com/hedef/;
}
```

### WordPress

**Yoast SEO Premium** ve **Rank Math Pro** dahili yönlendirme yöneticisi sunar. Kodlama gerekmez.

**Redirection eklentisi** (ücretsiz): En popüler WordPress yönlendirme eklentisi. 301, 302, 307, 410 destekler.

`.htaccess` ile manuel ekleme de mümkündür (Apache sunucularda).

### Cloudflare Page Rules

Cloudflare kullananlar için DNS düzeyinde yönlendirme kuralları oluşturulabilir — sunucu yapılandırmasına gerek kalmaz.

## Yönlendirme Zincirlerinden Kaçının

Yönlendirme zinciri, bir URL'nin başka bir URL'ye yönlendirilmesi ve o URL'nin de başka bir URL'ye yönlendirilmesidir:

```
A → B → C → D
```

**Neden sorun?**
- Her yönlendirme atlamasında hafif link juice kaybı olur
- Sayfa yükleme süresi uzar
- Crawl bütçesi verimsiz kullanılır
- Kullanıcı deneyimi bozulur

**Çözüm:** Her zaman direkt yönlendirme yapın:
```
A → D (direkt)
B → D (direkt)
C → D (direkt)
```

Mevcut zincirlerinizi Screaming Frog veya Ahrefs ile tespit edin ve düzeltin.

## Site Taşıma Süreci

Tüm site farklı bir domain'e taşınıyorsa:

**1. Yeni siteyi hazırla:** Tüm sayfaları yeni domain'de oluştur, içerik testini tamamla.

**2. DNS ve SSL:** Yeni domain için SSL sertifikasını kur.

**3. Tüm URL'ler için 301:** Her eski URL → yeni URL için bireysel 301 yönlendirme ekle. Toplu yönlendirme için CSV tabanlı yönlendirme yöneticileri kullanın.

**4. GSC'de alan taşıma:** Google Search Console → Eski mülk → Ayarlar → Alan Değişikliği aracını kullanın. Bu Google'a geçişi resmi olarak bildirir.

**5. Backlink güncellemesi:** Önemli backlink kaynaklarına ulaşarak URL'yi güncellemelerini isteyin.

**6. İzleme:** Taşıma sonrası 3-6 ay boyunca trafik ve sıralama verilerini yakından izleyin.

## Yaygın Yönlendirme Hataları

### Hata 1: 302 Kullanması Gereken Yerde 301 Kullanmak (veya Tersi)

A/B testi için 301 kullanırsanız, test bittiğinde eski URL'ye dönmek istediğinizde Google önbelleği güncellemeyi çok yavaş yapar. 302 kullanın.

Site taşıma için 302 kullanırsanız, Google eski URL'yi indekste tutar ve yeni URL'ye link juice aktarmaz. 301 kullanın.

### Hata 2: Yönlendirme Döngüsü

```
A → B → A  (sonsuz döngü)
```

Tarayıcılar ve botlar bu döngüyü belli sayıda deneme sonrası terk eder. Sunucu yapılandırmasını dikkatli yapın.

### Hata 3: İndeks Sayfalarını Silmeden Yönlendirme

Sayfayı silerek yerine 404 bırakmak ve backlink değerini kaybetmek. Her silinen sayfa için uygun bir hedef URL'ye 301 yönlendirme ekleyin.

### Hata 4: HTTP → HTTPS Yönlendirmeyi Unutmak

`http://example.com` ve `https://example.com` hâlâ ayrı URL'ler olarak çalışıyorsa, Google ikisini de ayrı site olarak görebilir. Tüm HTTP trafiğini HTTPS'e 301 ile yönlendirin.

### Hata 5: www ve www olmayan Versiyonları Birleştirmemek

`example.com` ve `www.example.com` iki farklı site olarak algılanır. Birini diğerine 301 ile yönlendirin ve tüm referanslarınızda tutarlı tek bir URL kullanın.

## Yönlendirmeleri Kontrol Etme Araçları

**Redirect Checker (Çevrimiçi):** redirectcheck.com veya httpstatus.io — URL'nin hangi statü kodunu döndürdüğünü ve yönlendirme zincirini görürsünüz.

**Screaming Frog:** Site taraması sırasında tüm yönlendirmeleri, zincirlerini ve döngülerini raporlar.

**Google Search Console → Kapsam Raporu:** 301 ile yönlendirilen sayfalar "Hariç tutuldu — Yönlendirme URL'si" olarak görünür.

**curl komutu:**
```bash
curl -I -L https://example.com/eski-sayfa/
```
Tüm yönlendirme zincirini header seviyesinde gösterir.

## Sık Sorulan Sorular

### 301 yönlendirme link juice'un ne kadarını aktarır?

Google, 301'den geçen link juice'u neredeyse tam aktarır. Eski tahminler %85-99 aktarım olduğunu söylüyordu; Google bugün bu oranı tam olarak belirtmez ama önemli bir kayıp olmadığını ifade eder.

### 302 yönlendirme ne kadar süre kullanılabilir?

Kısa vadeli kullanım (2-4 hafta) sorun yaratmaz. Ama 302'yi uzun süre (aylarca) kullanırsanız, Google bunu kalıcı olarak yorumlayarak davranış değiştirebilir. Uzun süre gerekiyorsa 301'e geçin.

### Yönlendirme eklemek sayfa hızını etkiler mi?

Evet — her yönlendirme bir ek HTTP isteği demektir. Tek yönlendirme yaklaşık 100-300ms ekler. Zincirler bu süreyi katlayarak artırır. Bu yüzden doğrudan yönlendirme yapmak önemlidir.

### Eski URL'yi backlink'le birlikte silerek 404 bırakırsam ne olur?

404 dönen sayfalara gelen tüm backlink değeri kaybolur. Mümkünse her zaman uygun bir URL'ye 301 yönlendirme ekleyin. Gerçekten içerik yoksa ve içerik kalıcı silindiyse 410 (Gone) kullanabilirsiniz.

## Kaynakça

- Google Arama Merkezi: Yönlendirmeler ve SEO — developers.google.com/search/docs/crawling-indexing/301-redirects
- Google: HTTP 301 ve 302 — support.google.com
- Moz: HTTP Status Codes — moz.com/learn/seo/redirection
- Ahrefs: 301 vs 302 Redirects — ahrefs.com/blog