# Wix API Bilgi Tabanı

Bu klasör, Wix Blog API çalışmaları sırasında öğrenilen bilgileri içerir.

## Dosyalar

| Dosya | İçerik |
|-------|--------|
| `api-reference.md` | Endpoint'ler, istek/yanıt yapıları, kritik kurallar |
| `publish-checklist.md` | Her yayın öncesi kontrol listesi |
| `duplicate-cleanup-log.md` | 2026-03-17 temizlik kaydı (11 silinmiş duplikat) |

## Hızlı Özet — Kritik Bilgiler

### slug CREATE'de çalışmaz
`POST /blog/v3/draft-posts` ile slug göndersen de kaydedilmez.
Çözüm: `PATCH` ile `seoSlug` alanını ayrıca set et.

### seoData + media aynı PATCH'te gönderilemez
400 hatası döner. İkisi ayrı PATCH isteği olmalı.

### meta description alanı
`meta.description` → `seoDescription` (publish.js'de düzeltildi)
Eski hatalı: `meta.metaDesc`

### Kategori/Tag duplicate önleme
- categories.json ve tags.json'ı güncel tut
- Yeni slug eklenmeden önce API'den kontrol et
- Wix aynı label'ı tekrar oluşturunca `-1`, `-2` ekler

### SEO keywords formatı
```json
{ "term": "anahtar kelime", "isMain": true }
```
String dizi değil, nesne dizisi.
