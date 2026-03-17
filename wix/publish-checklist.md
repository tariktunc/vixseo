# Blog Post Yayın Kontrol Listesi

Her yayın öncesi bu adımları takip et.

---

## 1. Frontmatter Zorunlu Alanlar

```yaml
title: "Yazı Başlığı"           # Zorunlu
description: "150-160 karakter"  # meta description için (metaDesc değil!)
slug: "url-slug-tire-ile"        # Türkçe karakter yok
seoTitle: "SEO Başlık | Site Adı"
categories: [kategori-slug]      # categories.json'dan kontrol et
tags: []                         # tags.json'dan kontrol et
status: ready
language: tr
excerpt: "Kısa açıklama"
```

---

## 2. Kategori ve Tag Doğrulama

**Problem:** publish.js categories.json'dan slug→ID çözümler.
Slug yoksa sessizce atlanır, hata vermez!

**Kontrol:**
```bash
# categories.json güncelle
node sites/ibrahiminyeri/scripts/fetch-categories.js

# tags.json güncelle
node sites/ibrahiminyeri/scripts/fetch-tags.js
```

**Kural:** Her publish öncesi categories.json ve tags.json güncel olmalı.

---

## 3. Sıralı İşlem Adımları (publish.js sonrası)

publish.js tek seferde her şeyi göndermez. Aşağıdaki alanlar ayrıca PATCH gerektirir:

| Alan | Durum | PATCH gerekli mi? |
|------|-------|-------------------|
| title | ✅ CREATE'de | Hayır |
| richContent | ✅ CREATE'de | Hayır |
| categoryIds | ✅ CREATE'de | Hayır |
| tagIds | ✅ CREATE'de | Hayır |
| excerpt | ✅ CREATE'de | Hayır |
| **seoSlug** | ❌ CREATE'de çalışmaz | **EVET** |
| **seoData** (title/desc/og/keywords) | Kısmen | **EVET** |
| **media.altText** | ❌ ayrı PATCH | **EVET** |
| **keywords (isMain)** | ❌ ayrı format | **EVET** |

---

## 4. SEO Kontrol Listesi

- [ ] `description` 150-160 karakter arası
- [ ] `slug` Türkçe karakter içermiyor (ş→s, ç→c, ğ→g, ı→i, ö→o, ü→u)
- [ ] `seoTitle` = "Anahtar Kelime | Site Adı" formatında
- [ ] Primary keyword title'da ve ilk paragrafta geçiyor
- [ ] `seoSlug` PATCH ile set edildi
- [ ] `seoData.settings.keywords[0].isMain = true`
- [ ] `og:image` Wix CDN URL'i ile dolu
- [ ] `media.altText` keyword içeriyor

---

## 5. Görsel Kontrol

- [ ] Pexels/Unsplash'tan ücretsiz lisanslı görsel kullan
- [ ] Wix Media'ya import et: `POST /site-media/v1/files/import`
- [ ] 3 saniye bekle (PENDING→READY)
- [ ] `altText` keyword içeren Türkçe açıklama yaz
- [ ] Blog post media node'una ekle (ayrı PATCH)

---

## 6. Duplicate Önleme Kuralları

**Kategori duplicate:**
- Wix, aynı label'ı iki kez oluşturunca `et-mangal`, `et-mangal-1`, `et-mangal-2` gibi slug'lar üretir
- categories.json'daki slug'ları API'deki gerçek slug'larla eşleştir
- Şüpheliyse `POST /blog/v3/categories/query` ile kontrol et

**Tag duplicate:**
- tags.json boş bırakma. Kullanılacak tag'leri API'den çek, kaydet.
- Var olan tag'in ID'sini kullan, yeni oluşturma

---

## 7. publish.js Sonrası PATCH Script

```javascript
// post-publish-patch.js — yayın sonrası SEO tamamlama
// node scripts/post-publish-patch.js {draftPostId} {slug}

const draftId = process.argv[2];
const slug = process.argv[3];

// 1. seoSlug set
await patch(draftId, { draftPost: { seoSlug: slug }, fieldMask: { paths: ['seoSlug'] } });

// 2. seoData (title + meta desc + og tags + keywords)
await patch(draftId, { draftPost: { seoData: { ... } }, fieldMask: { paths: ['seoData'] } });

// 3. media altText (seoData'dan AYRI patch)
await patch(draftId, { draftPost: { media: { ... } }, fieldMask: { paths: ['media'] } });
```
