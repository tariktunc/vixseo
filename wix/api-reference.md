# Wix Blog API v3 — Tam Referans

**Base URL:** `https://www.wixapis.com`
**Auth header:** `Authorization: {apiKey}`
**Site header:** `wix-site-id: {siteId}`

---

## KRİTİK KURALLAR

- `categoryIds`: Sadece **mevcut** kategoriler eklenir. Var olmayan ID gönderilirse hata vermez, sessizce yok sayılır.
- `tagIds`: Aynı kural. Önce `tags.json` kontrol et, yoksa API'den çek.
- **Slug:** `slug` alanı CREATE'de çalışmaz → `seoSlug` kullan (PATCH ile).
- **seoDescription:** `meta.metaDesc` değil `meta.description` okunmalı (publish.js düzeltmesi).
- **SEO keywords:** `{ term: 'keyword', isMain: true/false }` formatında nesne dizisi.
- **seoData + media:** Aynı PATCH isteğinde gönderilemez → ayrı PATCH yapılmalı.
- **Maksimum post boyutu:** 400 KB
- **Maksimum kategori/post:** 10

---

## DRAFT POSTS

### POST /blog/v3/draft-posts — Taslak oluştur

**Zorunlu:** `memberId` (3. parti app için)

```json
{
  "draftPost": {
    "title": "string",
    "richContent": { "nodes": [] },
    "excerpt": "string",
    "memberId": "string",
    "language": "tr",
    "slug": "string",          // ⚠️ Çalışmaz — seoSlug PATCH ile set et
    "categoryIds": ["string"], // Sadece mevcut ID'ler eklenir
    "tagIds": ["string"],
    "seoDescription": "string",
    "media": {
      "wixMedia": { "image": { "id": "string", "altText": "string" } },
      "displayed": true,
      "custom": true,
      "altText": "string"
    },
    "seoData": {
      "tags": [
        { "type": "title", "children": "SEO Başlık", "custom": false, "disabled": false },
        { "type": "meta", "props": { "name": "description", "content": "..." }, "children": "", "custom": false, "disabled": false },
        { "type": "meta", "props": { "name": "keywords", "content": "kw1, kw2" }, "children": "", "custom": false, "disabled": false },
        { "type": "meta", "props": { "property": "og:title", "content": "..." }, "children": "", "custom": false, "disabled": false },
        { "type": "meta", "props": { "property": "og:description", "content": "..." }, "children": "", "custom": false, "disabled": false },
        { "type": "meta", "props": { "property": "og:image", "content": "https://..." }, "children": "", "custom": false, "disabled": false }
      ],
      "settings": {
        "preventAutoRedirect": false,
        "keywords": [
          { "term": "odak anahtar kelime", "isMain": true },
          { "term": "destekleyici keyword", "isMain": false }
        ]
      }
    }
  }
}
```

**Response:**
```json
{ "draftPost": { "id": "...", "status": "UNPUBLISHED", ... } }
```

---

### PATCH /blog/v3/draft-posts/{id} — Taslak güncelle

**ÖNEMLİ:** `fieldMask` ile hangi alanın güncelleneceğini belirt.
`seoData` ve `media` **aynı PATCH'te gönderilemez** — hata verir.

```json
{
  "draftPost": { "seoSlug": "url-slug-buraya" },
  "fieldMask": { "paths": ["seoSlug"] }
}
```

**Çalışan fieldMask path'leri:**
- `seoSlug` ✅
- `seoData` ✅
- `media` ✅ (seoData ile birlikte değil)
- `tagIds` ✅
- `categoryIds` ✅
- `title` ✅
- `excerpt` ✅

---

### POST /blog/v3/draft-posts/{id}/publish — Taslağı yayınla

```json
{}  // boş body
```

**Response:** `{ "post": { "id": "...", "status": "PUBLISHED", "slug": "...", ... } }`

---

### GET /blog/v3/draft-posts/{id} — Taslak getir

---

### POST /blog/v3/draft-posts/{id}/get-or-create — Yayınlı post için draft aç

Yayınlanmış bir postu düzenlemek için draft kopyası oluşturur.

---

## POSTS

### POST /blog/v3/posts/query — Post listele/filtrele

```json
{
  "query": {
    "filter": {
      "categoryIds": { "$hasSome": ["catId"] },
      "tagIds": { "$hasSome": ["tagId"] }
    },
    "paging": { "limit": 50, "offset": 0 },
    "sort": [{ "fieldName": "firstPublishedDate", "order": "DESC" }]
  },
  "fieldsets": ["SEO", "CONTENT", "OWNER"]
}
```

**Fieldset değerleri:**
- `SEO` → seoData, seoDescription alanlarını döner
- `CONTENT` → richContent gövdesini döner
- `OWNER` → memberId alanını döner
- Belirtilmezse → minimal veri döner

---

### GET /blog/v3/posts/{id} — Post getir

---

## KATEGORİLER

### POST /blog/v3/categories/query

```json
{ "paging": { "limit": 100 } }
```

### DELETE /blog/v3/categories/{categoryId}

- `{}` body gönderme
- 200 {} → başarılı
- Silinince o kategorideki tüm postlardan kaldırılır
- **Silmeden önce post migrasyon yap**

---

## TAG'LER

### POST /blog/v3/tags/query

```json
{ "paging": { "limit": 100 } }
```

### POST /blog/v3/tags — Tag oluştur

```json
{ "label": "Etiket Adı" }
```

**Response:** `{ "tag": { "id": "...", "label": "...", "slug": "..." } }`
- Slug otomatik üretilir (label'dan)
- Aynı label tekrar gönderilirse Wix slug'a `-1`, `-2` suffix ekler → duplicate oluşur

### PATCH /blog/v3/tags/{tagId} — Tag güncelle

**ÖNEMLİ:** `fieldMask` zorunlu.

```json
{
  "tag": {
    "seoData": {
      "tags": [
        { "type": "title", "children": "SEO Başlık | Marka", "custom": false, "disabled": false },
        { "type": "meta", "props": { "name": "description", "content": "150-160 karakter meta açıklama" }, "children": "", "custom": false, "disabled": false }
      ]
    }
  },
  "fieldMask": { "paths": ["seoData"] }
}
```

**Güncellenebilir fieldMask path'leri:**
- `seoData` ✅
- `label` ✅

**Pattern notu:** Kategori güncellemesiyle birebir aynı yapı:
- Kategori → `PATCH /blog/v3/categories/{id}` + body wrapper: `"category": {}`
- Etiket   → `PATCH /blog/v3/tags/{id}`        + body wrapper: `"tag": {}`

### DELETE /blog/v3/tags/{tagId}

- Silince tüm postlardan kaldırılır
- **Silmeden önce post migrasyon yap**

---

## MEDIA

### POST /site-media/v1/files/import — Görsel import et

```json
{
  "url": "https://...",
  "displayName": "dosyaadi.jpg",
  "mimeType": "image/jpeg",
  "mediaType": "IMAGE",
  "parentFolderId": "media-root"
}
```

**Response:** `{ "file": { "id": "...", "url": "https://static.wixstatic.com/...", "operationStatus": "PENDING" } }`
**Uyarı:** `displayName` import sonrası **değiştirilemez** (read-only).
**Bekle:** import sonrası 3 saniye bekle (PENDING → READY geçişi için).

### PATCH /site-media/v1/files/{fileId} — Dosya güncelle

- `displayName` → read-only, değiştirilemez
- `labels` → sadece Wix AI etiket formatı kabul eder, custom string reddedilir
- `private` → yazılabilir
- `parentFolderId` → yazılabilir (klasöre taşı)
