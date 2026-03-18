# Wix CMS Data API — Erişim Rehberi

## Genel Bilgi

Wix Data v2 API, Wix sitesindeki CMS koleksiyonlarına (Data Collections) programatik erişim sağlar.
Blog API'den **farklıdır** — blog yazıları için değil, Wix'in veritabanı koleksiyonları içindir.

**Base URL:** `https://www.wixapis.com/wix-data/v2`

---

## Kimlik Doğrulama

Her istekte iki header zorunlu:

```
Authorization: <WIX_API_KEY>
wix-site-id: <SITE_ID>
```

- `WIX_API_KEY` → `.env` dosyasından okunur
- `SITE_ID` → `sites/{site}/config.json` içindeki `siteId` alanı

---

## 1. Koleksiyonları Listele

```
GET https://www.wixapis.com/wix-data/v2/collections
```

Body gerekmez.

### Yanıt yapısı

```json
{
  "collections": [
    {
      "id": "news",
      "displayName": "Teknoloji Haberleri",
      "fields": [...],
      "type": "..."
    }
  ]
}
```

| Alan | Açıklama |
|------|----------|
| `id` | Sorgu yaparken kullanılacak koleksiyon ID'si |
| `displayName` | Wix panelindeki görünen ad |
| `fields` | Koleksiyonun alanları (alan sayısı için `fields.length`) |

### Blakfy koleksiyonları (Mart 2026)

| Görünen Ad | ID | Alan Sayısı |
|---|---|---|
| Categories | `Blog/Categories` | 11 |
| Posts | `Blog/Posts` | 28 |
| Tags | `Blog/Tags` | 7 |
| Schedule | `Bookings/Schedule` | 5 |
| Services | `Bookings/Services` | 19 |
| Staff | `Bookings/Staff` | 3 |
| Projeler | `Import1` | 12 |
| Coupons | `Marketing/Coupons` | 23 |
| Badges | `Members/Badges` | 11 |
| FullData | `Members/FullData` | 21 |
| PrivateMembersData | `Members/PrivateMembersData` | 15 |
| PublicData | `Members/PublicData` | 10 |
| Plans | `PaidPlans/Plans` | 17 |
| Seo | `Seo` | 15 |
| Sozlesmeler | `Sozlesmeler` | 10 |
| Collections | `Stores/Collections` | 5 |
| InventoryItems | `Stores/InventoryItems` | 6 |
| Orders | `Stores/Orders` | 23 |
| Products | `Stores/Products` | 35 |
| Variants | `Stores/Variants` | 12 |
| Temalar | `Temalar` | 16 |
| icerikler | `icerikler` | 14 |
| Teknoloji Haberleri | `news` | 13 |

---

## 2. Koleksiyon Item'larını Sorgula

```
POST https://www.wixapis.com/wix-data/v2/items/query
```

### Request body

```json
{
  "dataCollectionId": "news",
  "paging": {
    "limit": 50,
    "offset": 0
  },
  "returnTotalCount": true
}
```

> ⚠️ **Kritik:** Alan adı `collectionId` değil, `dataCollectionId`'dir.
> ⚠️ **Kritik:** `paging` üst seviyede olmalı, `query` objesinin içinde değil.

### Yanıt yapısı

```json
{
  "dataItems": [
    {
      "id": "e24bc9b9-...",
      "dataCollectionId": "news",
      "data": {
        "_createdDate": { "$date": "2025-11-22T..." },
        "_updatedDate": { "$date": "2026-01-12T..." },
        "title_fld": "Başlık",
        "slug": "url-slug",
        "seoDescription": "...",
        "richcontent": { "nodes": [...] }
      }
    }
  ],
  "totalCount": 146,
  "pagingMetadata": {
    "count": 50,
    "offset": 0,
    "total": 146
  }
}
```

> ⚠️ **Kritik:** Gerçek veriler `dataItems[].data` içinde, `dataItems[]` içinde değil.
> ⚠️ **Kritik:** Tarih alanları `{ "$date": "ISO string" }` formatındadır — `new Date(v.$date)` ile parse edilir.

### Sayfalama

```json
{ "paging": { "limit": 50, "offset": 50 } }
```

`offset` artırılarak tüm sayfalara ulaşılır.

---

## 3. Item Oluştur (CREATE)

```
POST https://www.wixapis.com/wix-data/v2/items
```

### Request body

```json
{
  "dataCollectionId": "news",
  "item": {
    "data": {
      "title_fld": "Başlık",
      "slug": "url-slug",
      "description_fld": "<p>Kısa HTML özet</p>",
      "seoDescription": "150 karakter meta açıklama",
      "richcontent": { "nodes": [...] }
    }
  }
}
```

> ⚠️ `id` alanı verilmez — Wix otomatik oluşturur.
> ⚠️ `richcontent` isteğe bağlı; içerik yoksa alanı atla.

### Yanıt yapısı

```json
{
  "dataItem": {
    "id": "yeni-wix-uuid",
    "dataCollectionId": "news",
    "data": { ... }
  }
}
```

---

## 4. Item Güncelle (UPDATE)

```
PUT https://www.wixapis.com/wix-data/v2/items/{id}
```

### Request body

```json
{
  "dataCollectionId": "news",
  "item": {
    "id": "mevcut-wix-uuid",
    "data": {
      "title_fld": "Güncellenmiş Başlık",
      "slug": "url-slug",
      "description_fld": "<p>Güncellenmiş özet</p>",
      "seoDescription": "Güncellenmiş meta açıklama",
      "richcontent": { "nodes": [...] }
    }
  }
}
```

> ⚠️ `id` zorunlu — eksikse 400 hatası alınır.
> ⚠️ Tüm `data` alanları gönderilmeli (partial update değil, tam replace).

### Yanıt yapısı

```json
{
  "dataItem": {
    "id": "wix-uuid",
    "dataCollectionId": "news",
    "data": { ... }
  }
}
```

---

## Hazır Script (Genişletilmiş)

```bash
# Tüm koleksiyonları listele
node sites/blakfy/scripts/cms.js

# Koleksiyon item'larını getir (ilk 50)
node sites/blakfy/scripts/cms.js --collection news

# news koleksiyonu local durumu
node sites/blakfy/scripts/cms.js --status

# Wix'ten çek, local güncelle (sadece Wix'te değişiklik olduğunda)
node sites/blakfy/scripts/cms.js --pull

# Yeni/değişmiş item'ları Wix'e gönder (önizle)
node sites/blakfy/scripts/cms.js --sync --dry-run

# Yeni/değişmiş item'ları Wix'e gönder
node sites/blakfy/scripts/cms.js --sync
```

---

## Karşılaşılan Hatalar

| Hata | Sebep | Çözüm |
|------|-------|-------|
| `403` | `.env` yerine `wix-credentials.json` placeholder'ı okundu | `dotenv` ile `.env`'den `WIX_API_KEY` oku |
| `400 WDE0001: Collection name must be a string` | Body'de `collectionId` kullanıldı | `dataCollectionId` kullan |
| `totalCount: 146` ama `items: []` | `items` alanı beklendi | Yanıtta alan adı `dataItems`'dır |
| Tarihler `[object Object]` | Tarih `{ "$date": "..." }` formatında | `new Date(v.$date).toLocaleString()` ile çöz |
