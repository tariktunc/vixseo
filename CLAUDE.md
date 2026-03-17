# xmlBlog — Çok Siteli İçerik Yönetim Sistemi

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

Bu sistem, Wix platformundaki **birden fazla işletme sitesi** için blog ve CMS içeriği üretir.
Siteler `sites/` klasörüne eklenerek sisteme dahil edilir. Sabit bir site listesi yoktur.

---

## PROJE HİYERARŞİSİ

```
xmlBlog/
├── CLAUDE.md                        ← Bu dosya — global sistem kuralları
├── WIX-BLOG-FORMAT-REHBERI.md       ← Wix RichContent format referansı
├── wix-credentials.json             ← API anahtarı (tüm siteler ortak kullanır)
│
├── wix/                             ← Wix API bilgi tabanı (global)
│   ├── README.md
│   ├── api-reference.md
│   └── publish-checklist.md
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
└── scripts/                         ← Siteden bağımsız paylaşılan scriptler
    └── (publish.js, convert.js vb. her sitenin kendi scripts/ klasöründe)
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
└── scripts/
    ├── publish.js     ← Wix API'ye gönderici
    ├── convert.js     ← Markdown → Wix RichContent dönüştürücü
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
8. `SITE-MAP-ANALIZ.md` oluştur (isteğe bağlı)

---

## AKTİF SİTELER

| Site Adı | Domain | Klasör |
|----------|--------|--------|
| blakfy | blakfy.com | `sites/blakfy/` |
| ibrahiminyeri | ibrahiminyeri.com | `sites/ibrahiminyeri/` |

> Yeni site eklendiğinde bu tabloya da eklenir.
