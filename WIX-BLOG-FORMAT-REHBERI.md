# Wix Blog API — İçerik Format ve Gönderme Rehberi

**Son güncelleme:** 2026-03-17
**Referans:** `wix/api-reference.md`, `wix/publish-checklist.md`

---

## 1. GÖNDERME AKIŞI (publish.js)

```
posts/{slug}.md (status: ready)
    ↓
POST /blog/v3/draft-posts       → draft oluştur, wixId al
    ↓
PATCH seoSlug                   → URL slug set et
    ↓
PATCH seoData                   → SEO title, meta desc, og tags, keywords
    ↓ (görsel varsa)
POST /site-media/v1/files/import → görsel yükle (3sn bekle)
PATCH media                     → görseli draft'a ekle
    ↓
Wix panelinden → Yayınla
```

> `seoData` ve `media` **aynı PATCH isteğinde gönderilemez** — ayrı yapılmalı.

---

## 2. FRONTMATTER ZORUNLU ALANLARI

```yaml
title: "Yazı Başlığı"
description: "150-160 karakter SEO meta açıklaması"   # metaDesc değil!
slug: "url-slug-tire-ile"                              # Türkçe karakter yok
seoTitle: "Anahtar Kelime | İbrahimin Yeri"
categories: [et-mangal]                                # categories.json'dan slug
tags: [bakacak-kofte, bolu-dagi]                       # tags.json'dan slug
status: ready
language: tr
excerpt: "1-2 cümle özet"
imageUrl: "https://..."                                # Pexels/Unsplash ücretsiz URL
imageAlt: "Görsel açıklaması keyword içermeli"
```

**Slug kuralı:** Türkçe karakterleri dönüştür:
`ş→s, ç→c, ğ→g, ı→i, ö→o, ü→u` — boşluk yerine tire.

---

## 3. KATEGORİ VE TAG KURALLARI

- `categories` ve `tags` değerleri **mutlaka** `categories.json` ve `tags.json`'daki slug'lardan seçilmeli
- Var olmayan slug sessizce yok sayılır — hata vermez, ID boş kalır
- Yeni kategori/tag oluşturmak için Wix panelini kullan (API ile oluşturmak duplicate riskine girer)
- Wix aynı label'ı iki kez oluşturursa slug'a `-1`, `-2` ekler → duplicate sorunu

---

## 4. RİCHCONTENT NODE YAPILARI

### Paragraf
```json
{
  "type": "PARAGRAPH", "id": "",
  "nodes": [{ "type": "TEXT", "id": "", "textData": { "text": "Metin", "decorations": [] } }],
  "paragraphData": { "textStyle": { "textAlignment": "AUTO" }, "indentation": 0 }
}
```

### H2 Başlık
```json
{
  "type": "HEADING", "id": "",
  "nodes": [{ "type": "TEXT", "id": "", "textData": { "text": "Başlık", "decorations": [] } }],
  "headingData": { "level": 2, "textStyle": { "textAlignment": "AUTO" }, "indentation": 0 }
}
```

### H3 Başlık
```json
{ "headingData": { "level": 3, ... } }
```

### ⭐ Boşluk (Spacer) — KRİTİK
```json
{
  "type": "PARAGRAPH", "id": "",
  "nodes": [{ "type": "TEXT", "id": "", "textData": { "text": "\u2800", "decorations": [] } }],
  "paragraphData": { "textStyle": { "textAlignment": "AUTO" }, "indentation": 0 }
}
```
> `\u2800` = Braille Boşluk. Sadece `""` çalışmaz, Wix siler.

### Bullet List
```json
{
  "type": "BULLETED_LIST", "id": "",
  "nodes": [{
    "type": "LIST_ITEM", "id": "",
    "nodes": [{ "type": "PARAGRAPH", "id": "", "nodes": [TEXT_NODE], "paragraphData": {...} }]
  }]
}
```

### Bold Metin (decoration)
```json
{ "type": "TEXT", "id": "", "textData": { "text": "Kalın", "decorations": [{ "type": "BOLD", "fontWeightValue": 700 }] } }
```

---

## 5. BOŞLUK KURALLARI

| Nerede | Kural |
|--------|-------|
| H2 başlığından **önce** | 1 spacer (ilk H2 hariç) |
| H2 başlığından **sonra** | 1 spacer |
| H3 başlığından **sonra** | 1 spacer |
| Liste **sonrasında** | 1 spacer |
| Paragraflar arası | Spacer gerekmez |

---

## 6. SEO DATA YAPISI (PATCH)

```json
{
  "draftPost": {
    "seoData": {
      "tags": [
        { "type": "title", "children": "SEO Başlık | Site", "custom": false, "disabled": false },
        { "type": "meta", "props": { "name": "description", "content": "150-160 karakter" }, "children": "", "custom": false, "disabled": false },
        { "type": "meta", "props": { "name": "keywords", "content": "kw1, kw2, kw3" }, "children": "", "custom": false, "disabled": false },
        { "type": "meta", "props": { "property": "og:title", "content": "SEO Başlık | Site" }, "children": "", "custom": false, "disabled": false },
        { "type": "meta", "props": { "property": "og:description", "content": "..." }, "children": "", "custom": false, "disabled": false },
        { "type": "meta", "props": { "property": "og:image", "content": "https://static.wixstatic.com/..." }, "children": "", "custom": false, "disabled": false }
      ],
      "settings": {
        "preventAutoRedirect": false,
        "keywords": [
          { "term": "odak anahtar kelime", "isMain": true },
          { "term": "destekleyici keyword", "isMain": false }
        ]
      }
    }
  },
  "fieldMask": { "paths": ["seoData"] }
}
```

---

## 7. GÖRSEL İMPORT AKIŞI

```
1. POST /site-media/v1/files/import
   { url, displayName, mimeType: "image/jpeg", mediaType: "IMAGE", parentFolderId: "media-root" }
   → fileId döner, operationStatus: "PENDING"

2. 3 saniye bekle (PENDING → READY)

3. PATCH /blog/v3/draft-posts/{id}
   { draftPost: { media: { wixMedia: { image: { id: fileId, altText } }, displayed: true, custom: true, altText } },
     fieldMask: { paths: ["media"] } }
```

**Uyarılar:**
- `displayName` import sonrası değiştirilemez
- `labels` (AI etiketler) custom string kabul etmez
- Görsel media PATCH'i seoData ile birlikte gönderilemez

---

## 8. SIKÇA YAPILAN HATALAR

| Hata | Sebep | Çözüm |
|------|-------|-------|
| slug kaydedilmez | CREATE'de slug çalışmaz | PATCH ile `seoSlug` set et |
| meta description boş | `meta.metaDesc` okunuyor | `meta.description` kullan |
| seoData 400 hatası | `media` ile birlikte | Ayrı PATCH gönder |
| Kategori atandı ama kayıt yok | categories.json'da slug yok | Slug'u kontrol et, WARN'a bak |
| Duplicate kategori/tag | Aynı label tekrar oluştu | Wix panelinden yönet, API ile oluşturma |
| Boş paragraf görünmüyor | `""` text | `\u2800` Braille Boşluk kullan |
| POST 400 "Missing post owner" | `memberId` eksik | config.json'dan oku |
