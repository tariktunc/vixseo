# VixSEO — Çok Siteli SEO & İçerik Yönetim Sistemi

---

## GİRDİ YORUMLAMA — PROMPT MÜHENDİSLİĞİ KATMANI

Her kullanıcı mesajını önce bu katmandan geçir. Kullanıcı doğal dilde, kısa veya belirsiz yazabilir — senin görevin bunu yapılandırılmış bir göreve dönüştürmek ve çalıştırmak.

### Yorumlama Adımları

**1. Niyeti Tanı**
Mesajı okuyunca şu sorulara cevap ver (içsel olarak, kullanıcıya sorma):
- Hangi site? (ibrahiminyeri, blakfy, bilinmiyor → sor)
- Hangi eylem? (yaz, gönder, düzelt, listele, analiz et, ekle...)
- Hangi konu/hedef? (açık mı, yoksa çıkarım mı gerekiyor?)
- Bağlam eksik mi? (evet → en makul varsayımı yap, sonunda belirt)

**2. Göreve Dönüştür**
Niyeti şu formata çevir (içsel yapı, her seferinde gösterme — sadece yoğun/kritik durumlarda göster):

```
EYLEM   : [yaz / gönder / düzelt / analiz et / ...]
SİTE    : [site adı]
KONU    : [başlık veya özet]
BAĞLAM  : [brand.md + categories.json + tags.json okunacak mı?]
KISITLAR: [tone, kelime sayısı, format...]
```

**3. Çalıştır**
Görevi çalıştır. Varsayım yaptıysan yanıtın sonunda kısaca belirt:
> *"[konu]'yu [eylem] olarak yorumladım."*

### Yorumlama Örnekleri

| Kullanıcı yazar | Yorumlanan görev |
|----------------|-----------------|
| `ibrahiminyerine tarif yazdır` | Site: ibrahiminyeri, Eylem: blog yaz, Konu: tarif → brand.md'den kategori çek |
| `şu yazıyı gönder` | Son hazırlanan posts/ yazısını publish.js ile Wix'e gönder |
| `bakacak hakkında bir şeyler yaz` | Site: ibrahiminyeri (tek bilinen), Konu: Bakacak Mevkii, blog yazısı |
| `blakfy için 3 yazı üret` | topics.md'den öncelikli 3 konu al, sırayla yaz ve onaya sun |
| `düzelt başlık daha çarpıcı olsun` | Son sunulan taslağın title + seoTitle alanlarını güçlendir |

### Ne Zaman Soru Sor

Sadece şu durumlarda kullanıcıya sor (gereksiz soru sorma):
- Site belirlenemiyorsa VE birden fazla site aktifse
- "gönder" dendi ama onaylanmış yazı yoksa
- Açıkça çelişkili talimatlar varsa

---

## GENEL BAKIŞ

Bu sistem, Wix platformundaki **birden fazla işletme sitesi** için SEO yönetimi, blog üretimi ve CMS içeriği sağlar. Next.js dashboard (src/) üzerinden Google Search Console, Google Ads, Wix Blog CRUD, sitemap, redirect ve audit işlevleri web arayüzünden yönetilir. Siteler `sites/` klasörüne eklenerek sisteme dahil edilir.

**Repo:** `git@github.com:tariktunc/vixseo.git` (private)

---

## PROJE HİYERARŞİSİ

```
vixseo/                              ← Repo root
├── src/                             ← Next.js app (TypeScript)
│   ├── app/                         ← App Router (pages + API routes)
│   │   ├── (dashboard)/[business]/  ← İşletme sayfaları (analytics, posts, audit...)
│   │   └── api/[business]/          ← Backend API endpoint'leri
│   ├── lib/                         ← İş mantığı modülleri
│   │   ├── wix.ts                   ← Wix API client
│   │   ├── blog.ts                  ← Wix Blog CRUD
│   │   ├── publisher.ts             ← Wix'e post yayınlama pipeline
│   │   ├── search-console.ts        ← Google Search Console API
│   │   ├── keywords.ts              ← Google Ads Keyword Planner
│   │   ├── sitemap.ts               ← Sitemap fetch/parse/cache
│   │   ├── redirects.ts             ← 301 redirect yönetimi
│   │   ├── audit.ts                 ← SEO audit (Wix vs kontrol)
│   │   ├── sync.ts                  ← Wix → DB senkronizasyon
│   │   ├── markdown-to-wix.ts       ← Markdown → Wix RichContent
│   │   └── auth.ts                  ← Clerk auth + RBAC
│   ├── components/                  ← UI bileşenleri (shadcn/ui)
│   ├── hooks/                       ← React Query hook'ları
│   ├── db/                          ← Drizzle ORM schema + seed
│   └── types/                       ← TypeScript tip tanımları
│
├── sites/                           ← Her işletme buraya eklenir
│   ├── _template/                   ← Yeni site şablonu
│   │   ├── brand.md
│   │   ├── config.json
│   │   ├── topics.md
│   │   └── scripts/
│   │       ├── categories.json
│   │       └── tags.json
│   │
│   ├── blakfy/                      ← blakfy.com
│   ├── ibrahiminyeri/               ← ibrahiminyeri.com
│   └── {yeni-site}/                 ← Eklenen her yeni site aynı yapıya uyar
│
├── wix/                             ← Wix API bilgi tabanı (global)
│   ├── README.md
│   ├── api-reference.md
│   └── publish-checklist.md
│
├── CLAUDE.md                        ← Bu dosya — global sistem kuralları
├── WIX-BLOG-FORMAT-REHBERI.md       ← Wix RichContent format referansı
├── package.json                     ← Next.js + bağımlılıklar
└── .env.local                       ← API credentials (gitignore'da)
```

---

## SİTE KLASÖRÜ YAPISI (Her site için)

```
sites/{site-adi}/
├── brand.md           ← Marka kimliği, ton, konu alanları, iç bağlantılar  ⭐ ZORUNLU
├── config.json        ← siteId, memberId, domain                            ⭐ ZORUNLU
├── topics.md          ← İçerik planı (bekleyen / tamamlanan)                ⭐ ZORUNLU
├── SITE-MAP-ANALIZ.md ← Site haritası (isteğe bağlı)
├── posts/             ← Hazırlanan yazılar (.md)
├── {collection}-inventory.json  ← CMS koleksiyon verisi (her koleksiyon için ayrı)
└── scripts/
    ├── publish.js     ← Wix API'ye gönderici
    ├── convert.js     ← Markdown → Wix RichContent dönüştürücü
    ├── cms.js         ← Thin wrapper → root scripts/cms.js'e yönlendirir
    ├── categories.json ← Wix'teki gerçek kategoriler slug→ID               ⭐ ZORUNLU
    └── tags.json      ← Wix'teki gerçek tag'ler slug→ID                    ⭐ ZORUNLU
```

---

## KOMUT KALIPLARI

| Kullanıcı komutu | Eylem |
|-----------------|-------|
| `[site]'e blog yaz [konu]` | O site için blog yazısı hazırla → onaya sun |
| `[site] topics listesinden [N] yaz` | topics.md'den N yazı hazırla |
| `[site]'e yeni site ekle` | `_template/` kopyalanır, doldurulması istenir |
| `onayla` | Sunulan taslağı onaylar, `posts/` klasörüne kaydeder |
| `düzelt: [not]` | Taslakta değişiklik yap, tekrar sun |
| `gönder` / `yayınla` | Onaylanmış yazıyı Wix'e gönder (`publish.js`) |

**Site tanıma:** Kullanıcı "ibrahiminyerine", "blakfye", "yeni siteye" gibi yazınca
`sites/` klasöründe eşleşen klasörü bul. Bulamazsan kullanıcıya sor.

---

## BLOG YAZISI ÜRETİM AKIŞI

### ADIM 1 — Site Bağlamını Oku (ZORUNLU, her seferinde)

Yazıya başlamadan önce şu 4 dosyayı oku:

```
sites/{site}/brand.md                  → ton, kitle, iç bağlantılar, konu alanları
sites/{site}/config.json               → site adı, domain, siteId
sites/{site}/scripts/categories.json   → kullanılabilir kategori slug'ları
sites/{site}/scripts/tags.json         → kullanılabilir tag slug'ları
```

Bu dosyalar olmadan yazmaya başlama. Eksikse kullanıcıyı bildir.

### ADIM 2 — Araştırma

- WebSearch ile güncel veri topla
- Primary keyword + secondary keyword'ler belirle
- H2/H3 outline oluştur
- brand.md'deki iç bağlantı önerilerini not et

### ADIM 3 — Yaz

- Minimum 1500 kelime
- Primary keyword: başlık (H1) + ilk paragraf + en az 2 H2
- brand.md ton ve stiline uy
- İç bağlantılar doğal yerlerde olsun
- SSS bölümü (min 3 soru)
- Kaynakça (min 2 kaynak)

### ADIM 4 — SEO Doğrulama (Frontmatter Kontrol Listesi)

Her alan için kontrol et, sonra bir sonraki adıma geç:

```
[ ] title          → Dolu?
[ ] description    → 150-160 karakter? (metaDesc değil, description!)
[ ] slug           → Türkçe karakter YOK? (ş→s ç→c ğ→g ı→i ö→o ü→u)
[ ] seoTitle       → "[keyword] | [Marka Adı config.json'dan]" formatı?
[ ] categories     → categories.json'da bu slug var mı?
[ ] tags           → tags.json'da bu slug'lar var mı?
[ ] excerpt        → Dolu?
[ ] language       → "tr"?
[ ] imageUrl       → Pexels/Unsplash ücretsiz URL (varsa)
```

### ADIM 5 — ONAYA SUN ⛔ WİX'E GÖNDERİLMEZ

```
📋 ONAY BEKLİYOR — {site} / {slug}

Site       : {domain}
Başlık     : {title}
Slug       : {slug}
SEO Başlık : {seoTitle}
Meta Açıkl.: {description} ({N} karakter)
Kategori   : {categories}
Tag'ler    : {tags}
Odak KW    : {primary_keyword}
Kelime     : ~{N}

─── İÇERİK ÖNİZLEME ───
{ilk 3 paragraf}

─── YAPI ───
{H2 başlıkları listesi}

Onaylıyor musunuz? → "onayla" veya "düzelt: [not]"
```

### ADIM 6 — Kaydet (Onay sonrası)

1. `status: ready` yap
2. `sites/{site}/posts/{slug}.md` olarak kaydet
3. `topics.md`'de ilgili maddeyi ⏳ → ✅ güncelle
4. Kullanıcıya bildir:
   ```
   ✅ Kaydedildi → sites/{site}/posts/{slug}.md
   Wix'e göndermek için: "gönder"
   ```

### ADIM 7 — Gönder (Ayrı onay)

```bash
node sites/{site}/scripts/publish.js
```

publish.js otomatik yapar:
- `POST /blog/v3/draft-posts` → draft oluştur
- `PATCH seoSlug` → URL slug set et
- `PATCH seoData` → SEO title, meta desc, og tags, keywords
- Görsel varsa: media import → `PATCH media` (seoData'dan ayrı)
- Başarıysa: frontmatter'a `status: published` + `wixId` yaz

---

## HATA ÖNLEME KURALLARI

---

### CMS / Koleksiyon Verisi Depolama

```
❌ Koleksiyon verisini .md veya .txt olarak saklamak
✅ API'den gelen veriler her zaman .json olarak kaydedilir

❌ Kullanıcı "şunu md'ye yaz" dese bile doğrudan uymak
✅ Önce uyar: "Bu veri API'den JSON olarak geliyor, JSON formatında saklamalıyız.
   İnsan tarafından okunması gerekiyorsa news-slugs.txt gibi minimal bir yardımcı
   dosya eklenebilir, ama kaynak .json kalır."
```

**Neden:** API JSON döndürür → MD'ye dönüştürme bilgi kaybı riski taşır,
script'ler JSON'ı parse eder, her güncellemede MD yeniden oluşturmak duplikasyon yaratır.

### Kategori & Tag

```
❌ categories.json'a bakmadan slug yazmak
✅ Her seferinde categories.json oku → sadece var olan slug kullan

❌ tags.json boş bırakmak
✅ tags.json daima güncel olmalı (API'den çek: POST /blog/v3/tags/query)

❌ Yeni kategori/tag API ile oluşturmak
✅ Wix panelinde oluştur → categories.json / tags.json güncelle
   (API ile oluşturulursa Wix aynı label'ı tekrar gördüğünde -1, -2 ekler → duplicate)
```

### Frontmatter

```
❌ metaDesc: "..."        → publish.js bunu okumaz
✅ description: "..."     → doğru alan adı

❌ slug içinde: ğ, ş, ç, ı, ö, ü
✅ slug sadece ASCII: g, s, c, i, o, u

❌ categories: [yok-olan-slug]   → sessizce atlanır, kategori boş kalır
✅ categories: [categories.json'da var olan slug]
```

### Wix API

```
❌ seoData + media aynı PATCH → 400 hata
✅ Ayrı PATCH (publish.js halleder)

❌ CREATE'de slug set etmek → çalışmaz
✅ publish.js sonrası seoSlug PATCH (otomatik)
```

---

## FRONTMATTER TAM ŞEKLİ

```yaml
---
title: "Yazı Başlığı"
description: "150-160 karakter SEO meta açıklaması"
slug: "url-slug-sadece-ascii"
seoTitle: "Anahtar Kelime | Marka Adı"
categories: [kategori-slug]
tags: [tag-slug-1, tag-slug-2]
status: ready
language: tr
excerpt: "1-2 cümle kısa özet"
imageUrl: "https://images.pexels.com/..."
imageAlt: "Görsel açıklaması anahtar kelime içermeli"
---
```

---

## YENİ SİTE EKLEME

Kullanıcı yeni bir site eklediğinde:

1. `sites/_template/` klasörünü kopyala → `sites/{yeni-site}/`
2. `config.json` doldur: `siteId`, `memberId`, `domain`
3. `brand.md` doldur: işletme bilgileri, ton, hedef kitle
4. `topics.md` oluştur: ilk içerik planı
5. Wix API'den kategorileri çek → `categories.json` güncelle:
   ```bash
   # categories.json için
   POST /blog/v3/categories/query  {"paging": {"limit": 100}}
   ```
6. Wix API'den tag'leri çek → `tags.json` güncelle:
   ```bash
   POST /blog/v3/tags/query  {"paging": {"limit": 100}}
   ```
7. `scripts/publish.js` → config yollarını kontrol et
8. CMS koleksiyonu varsa inventory oluştur:
   - `sites/{yeni-site}/{collection-id}-inventory.json` → `fieldMap` dahil
   - `node scripts/cms.js --site {yeni-site} --collection {collection-id} --pull`
9. `SITE-MAP-ANALIZ.md` oluştur (isteğe bağlı)

---

## AKTİF SİTELER

| Site Adı | Domain | Klasör |
|----------|--------|--------|
| blakfy | blakfy.com | `sites/blakfy/` |
| ibrahiminyeri | ibrahiminyeri.com | `sites/ibrahiminyeri/` |

> Yeni site eklendiğinde bu tabloya da eklenir.
