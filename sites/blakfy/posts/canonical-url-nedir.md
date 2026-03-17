wixId: "deecf2f5-ef12-4b16-ac2a-3302b1401af8"
---
title: "Canonical URL Nedir? Duplicate Content Sorunu Nasıl Çözülür?"
slug: "canonical-url-nedir"
focusKeyword: "canonical url nedir"
seoTitle: "Canonical URL Nedir? Duplicate Content Çözümü 2025 | Blakfy"
metaDesc: "Canonical URL nedir, nasıl eklenir ve duplicate content sorunları nasıl çözülür? Rel=canonical etiketi, self-referential canonical ve yaygın hatalar."
excerpt: "Canonical URL, birden fazla URL'de erişilebilen aynı içerik için Google'a 'asıl sayfa budur' demenin teknik yoludur. Yanlış kullanım SEO değerini böler."
categories: ["teknik-seo"]
tags: ["seo", "teknik-seo"]
imageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1600&h=900&fit=crop"
imageAlt: "Canonical URL duplicate content teknik SEO"
language: "tr"
status: "published"
---
Bir web sayfası aynı içerikle birden fazla URL üzerinden erişilebilirse, Google hangi URL'yi indeksleyeceğini ve sıralamada göstereceğini belirlemek zorunda kalır. Bu karar sürecine "canonicalization" denir. Siz bu kararı etkileyemezseniz, Google backlink değerini farklı URL'ler arasında böler ve istediğiniz URL yerine başka bir versiyonu öne çıkarabilir. `rel="canonical"` etiketi, Google'a hangi URL'nin "asıl" olduğunu söylemenin standart yoludur.

## Duplicate Content Nasıl Oluşur?

Farkında olmadan aynı içerik birden fazla URL'de yaşayabilir:

**HTTP/HTTPS varyantları:**
- `http://example.com/sayfa/`
- `https://example.com/sayfa/`

**WWW/WWW olmayan varyantlar:**
- `https://example.com/sayfa/`
- `https://www.example.com/sayfa/`

**Trailing slash farkı:**
- `https://example.com/sayfa/`
- `https://example.com/sayfa`

**URL parametreleri:**
- `https://example.com/urunler/?sort=fiyat`
- `https://example.com/urunler/?sort=populer`
- `https://example.com/urunler/?renk=kirmizi`

**Büyük/küçük harf farkı:**
- `https://example.com/Sayfa/`
- `https://example.com/sayfa/`

**Yazdırma/mobil versiyonlar:**
- `https://example.com/makale/`
- `https://example.com/makale/?print=1`
- `https://m.example.com/makale/`

**Paginated sayfalar:**
- `https://example.com/kategori/`
- `https://example.com/kategori/page/2/`

## rel="canonical" Etiketi Nasıl Eklenir?

### HTML `<head>` Etiketi

Canonical etiketi, sayfa `<head>` bölümüne eklenir:

```html
<head>
  <link rel="canonical" href="https://www.example.com/asil-sayfa/" />
</head>
```

Bu etiket Google'a şunu söyler: "Bu sayfa farklı URL'lerden erişilebilir, ama asıl URL budur."

### HTTP Header

Server taraflı canonical göndermek de mümkündür — özellikle PDF gibi HTML olmayan dosyalar için:

```
Link: <https://example.com/asil-sayfa/>; rel="canonical"
```

### Sitemap Yöntemi

Sitemap'te yalnızca canonical URL'leri listelemek de bir sinyal göndermek demektir — ama `rel="canonical"` kadar güçlü değildir.

## Self-Referential Canonical

Her sayfa kendi URL'sine canonical işaret edebilir. Bu "self-referential canonical" olarak adlandırılır ve en iyi pratik kabul edilir:

```html
<!-- https://example.com/blog/makale/ sayfasında -->
<link rel="canonical" href="https://example.com/blog/makale/" />
```

Self-referential canonical şunu söyler: "Bu sayfanın başka kopyası yok, asıl URL burası." Bu, URL parametrelerinden gelen kopyaları otomatik olarak asıl URL'ye yönlendirir.

## Cross-Domain Canonical

Aynı içeriği birden fazla sitede yayınlıyorsanız (örneğin bir basın bülteni birden fazla haber sitesinde yer alıyorsa), ikincil siteler asıl kaynağa canonical işaret edebilir:

```html
<!-- ikincil-site.com'daki kopyada -->
<link rel="canonical" href="https://asil-kaynak.com/makale/" />
```

Bu yöntem dış siteye SEO değeri aktarır — dikkatli kullanın. Sadece gerçekten başka siteden alınmış içerik için kullanılmalıdır.

## WordPress'te Canonical Etiketi

### Yoast SEO

Yoast SEO her sayfaya otomatik olarak self-referential canonical ekler. Sayfa düzenleyicide "Yoast SEO" paneline gidin → "Gelişmiş" sekmesi → "Canonical URL" kutusundan özel canonical belirleyebilirsiniz.

### Rank Math

Rank Math da otomatik canonical ekler. Her yazıda "Gelişmiş" sekmesinden canonical URL'yi değiştirebilirsiniz.

### Manuel Ekleme

Eklenti kullanmıyorsanız `functions.php`'e ekleyebilirsiniz — ama eklenti kullanmak çok daha güvenli ve önerilir.

## E-ticaret Sitelerinde Canonical Kullanımı

E-ticaret siteleri, URL parametreleri yüzünden duplicate content sorunuyla en sık karşılaşan sitelerdir.

**Problem:** Bir ürün birden fazla kategori altında listeleniyor:
- `https://example.com/erkek-giyim/tshirt/kirmizi-polo/`
- `https://example.com/polo-tisortler/kirmizi-polo/`

**Çözüm:** Her iki sayfada da aynı canonical URL belirleyin:
```html
<link rel="canonical" href="https://example.com/erkek-giyim/tshirt/kirmizi-polo/" />
```

**Filtre URL'leri:** Renk, beden, sıralama parametreleri yüzünden oluşan URL'lerde canonical ana kategori sayfasına işaret etmeli:
```html
<!-- https://example.com/urunler/?renk=kirmizi&sort=fiyat sayfasında -->
<link rel="canonical" href="https://example.com/urunler/" />
```

## Canonical mi, 301 Yönlendirme mi?

Bu iki yöntem sık karıştırılır:

| | Canonical | 301 Yönlendirme |
|---|---|---|
| **Kullanım** | Aynı içerik, birden fazla URL | Kalıcı URL değişikliği |
| **Erişim** | Her iki URL de erişilebilir | Eski URL yeni URL'ye yönlenir |
| **Güç** | Sinyal (ipucu) | Güçlü sinyal |
| **Ne zaman** | Parametreli URL'ler, duplicate versiyonlar | Site taşıma, URL yapısı değişikliği |

**Kural:** URL'ye kullanıcının erişmesi gerekmiyorsa 301. İki URL'ye de erişim kalması gerekiyorsa canonical.

## Google'ın Canonical Kararı

Önemli bir ayrım: `rel="canonical"` bir direktif değil, bir sinyal/ipucudur. Google bazen belirlediğiniz canonical'ı görmezden gelerek başka bir URL'yi seçer. Bu genellikle şu durumlarda olur:

- Belirlediğiniz canonical URL teknik sorunlar içeriyor (çok yavaş, engellenmiş)
- İçerik arasında önemli farklılıklar var
- Backlink profili farklı URL'yi işaret ediyor
- Hreflang sinyalleriyle çelişiyor

GSC → Kapsam raporunda "Canonical — Google tarafından seçildi, gönderilenden farklı" uyarısı bunu gösterir.

## Canonical Etiket Hataları

### Hata 1: Yönlendirilen URL'ye Canonical

```html
<!-- YANLIŞ: Bu URL 301 ile başka yere yönleniyor -->
<link rel="canonical" href="https://example.com/eski-sayfa/" />
```

Canonical her zaman nihai, canlı URL'yi işaret etmeli.

### Hata 2: Noindex + Canonical Çelişkisi

Bir sayfada hem `noindex` hem de canonical koyarsanız, Google kafa karışıklığı yaşar. Eğer sayfayı indekslenmesini istemiyorsanız canonical gereksiz; canonical belirtiyorsanız noindex çelişkili.

### Hata 3: Her Sayfaya Aynı Canonical

```html
<!-- YANLIŞ: Her sayfada ana sayfaya canonical -->
<link rel="canonical" href="https://example.com/" />
```

Bu, tüm içeriğinizin ana sayfa içeriğinin kopyası olduğunu söyler.

### Hata 4: Relative URL Kullanımı

```html
<!-- YANLIŞ: Relative URL -->
<link rel="canonical" href="/sayfa/" />

<!-- DOĞRU: Absolute URL -->
<link rel="canonical" href="https://example.com/sayfa/" />
```

Canonical her zaman tam (absolute) URL olmalı.

### Hata 5: Birden Fazla Canonical Etiketi

Bir sayfada iki canonical etiketi varsa, Google ikisini de görmezden gelebilir. Yalnızca tek canonical etiketi olmalı.

## Canonical Durumunu Kontrol Etme

**Google Search Console:** URL İnceleme Aracı'nda "Sayfanın canonical URL'si" bölümüne bakın. "Google tarafından seçilen canonical" ile "kullanıcı tarafından belirtilen canonical" aynı olmalı.

**Screaming Frog:** Site taramasında "Canonical" kolonunu inceleyebilir, self-canonical eksik sayfaları bulabilirsiniz.

**Tarayıcı Geliştirici Araçları:** Herhangi bir sayfada F12 → Elements → `<head>` → `<link rel="canonical">` etiketini doğrudan görebilirsiniz.

## Sık Sorulan Sorular

### Canonical etiketi olmayan sayfalar için ne olur?

Google kendi canonical kararını verir. Çoğu zaman doğru seçer ama kontrolü siz değil Google yapar. Özellikle URL parametresi yoğun sitelerde beklenmedik sayfalar canonical seçilebilir.

### İki farklı sayfa birbirine canonical işaret ederse ne olur?

Google bir döngü algılar ve her iki canonical'ı da iptal ederek kendi kararını verir. Canonical işaret her zaman tek yönlü olmalı.

### Canonical ile hreflang birlikte kullanılabilir mi?

Evet — ve genellikle birlikte kullanılır. Canonical sayfanın "asıl versiyonunu" belirtir, hreflang ise farklı diller/bölgeler arasındaki ilişkiyi tanımlar. Hreflang URL'leri her zaman kendi kendine canonical olmalıdır.

### Sosyal medya paylaşımlarında hangi URL görünür?

Open Graph etiketleri (`og:url`) sosyal medya için canonical URL'yi belirtir. Bu, `rel="canonical"` ile aynı URL olmalıdır.

## Kaynakça

- Google Arama Merkezi: Canonical URL'yi Birleştir — developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google: Rel=Canonical — support.google.com
- Moz: Duplicate Content — moz.com/learn/seo/duplicate-content
- Yoast: Canonical URLs Explained — yoast.com