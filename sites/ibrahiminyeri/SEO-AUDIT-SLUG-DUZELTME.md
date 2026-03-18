# İbrahiminyeri — SEO Audit: Wix Panel Slug & Label Düzeltmeleri

**Tarih:** 2026-03-18
**Durum:** 11 etiket silindi (44 → 33). Panel düzeltmeleri bekliyor.
**Yer:** Wix Panel → Blog → Etiketler → İlgili etiket → ✏️ Düzenle

---

## Nasıl Yapılır?

1. [manage.wix.com](https://manage.wix.com) → sitenin yönetim paneli
2. Sol menü → **Blog** → **Etiketler**
3. İlgili etikete tıkla → **Düzenle** (kalem ikonu)
4. **Etiket adı** (label) ve/veya **Etiket URL'i** (slug) alanını düzelt
5. **Kaydet**

> ⚠️ Slug değişince eski URL 301 yönlendirmesi almaz — büyük trafiği olan etiketleri önce yap.

---

## 🔴 KRİTİK — Önce Bunları Yap (En Çok Post)

| # | Etiket | Mevcut Slug | Hedef Slug | Post |
|---|--------|------------|-----------|------|
| 1 | Et Mangal | `et-mangal-1` | `et-mangal` | 81 |
| 2 | Bolu Dağı Et Mangal | `bolu-dağı-et-mangal-1` | `bolu-dagi-et-mangal` | 62 |
| 3 | Bolu Dağı | `bolu-dağı` | `bolu-dagi` | 56 |

---

## 🟠 Yüksek Öncelik

| # | Etiket | Mevcut Slug | Hedef Slug | Post |
|---|--------|------------|-----------|------|
| 4 | Kuzu Mangal | `kuzu-mangal-1` | `kuzu-mangal` | 18 |
| 5 | Meşe Közü | `meşe-közü` | `mese-kozu` | 14 |
| 6 | Düzce'de Ne Yenir | `düzce-de-ne-yenir` | `duzce-de-ne-yenir` | 11 |
| 7 | Bakacak Köfte | `bakacak-köfte` | `bakacak-kofte` | 11 |

---

## 🟡 Orta Öncelik

| # | Etiket | Mevcut Slug | Hedef Slug | Post |
|---|--------|------------|-----------|------|
| 8 | Köy Kahvaltısı | `köy-kahvaltısı` | `koy-kahvaltisi` | 8 |
| 9 | Yöresel Kahvaltı | `yöresel-kahvaltı` | `yoresel-kahvalti` | 8 |
| 10 | Bolu Dağı Kahvaltı Mekanları | `bolu-dağı-kahvaltı-mekanları` | `bolu-dagi-kahvalti-mekanlari` | 8 |
| 11 | Abant Kahvaltı Mekanları | `abant-kahvaltı-mekanları` | `abant-kahvalti-mekanlari` | 8 |
| 12 | Yedigöller Kahvaltı Mekanları | `yedigöller-kahvaltı-mekanları` | `yedigoller-kahvalti-mekanlari` | 8 |
| 13 | Serpme Kahvaltı | `serpme-kahvaltı` | `serpme-kahvalti` | 8 |
| 14 | Bolu'da Kahvaltı | `bolu-da-kahvaltı` | `bolu-da-kahvalti` | 8 |
| 15 | Düzce'de Kahvaltı | `düzce-de-kahvaltı` | `duzce-de-kahvalti` | 8 |
| 16 | Kuzu Pirzola | `kuzu-pirzola-1` | `kuzu-pirzola` | 8 |
| 17 | Mola Noktaları | `mola-noktaları` | `mola-noktalari` | 7 |
| 18 | Kıvırcık Kuzu | `kıvırcık-kuzu` | `kiviricik-kuzu` | 5 |
| 19 | Közde Et Mangal | `közde-et-mangal` | `kozde-et-mangal` | 5 |
| 20 | Meşe Kömürü | `meşe-kömürü` | `mese-komuru` | 4 |
| 21 | Yol Üzeri Restoran | `yol-üzeri-restoran` | `yol-uzeri-restoran` | 4 |

---

## 🟢 Düşük Öncelik

| # | Etiket | Mevcut Slug | Hedef Slug | Post |
|---|--------|------------|-----------|------|
| 22 | Düzce Gezi | `düzce-gezi` | `duzce-gezi` | 4 |
| 23 | Günübirlik Gezi | `günübirlik-gezi` | `gunubirlik-gezi` | 4 |

---

## Label Standardizasyonu (Aynı Oturumda Yap)

Aşağıdaki etiketlerin sadece **label** (görünen ad) değiştirilecek, slug dokunulmayacak:

| Mevcut Label | Yeni Label |
|-------------|-----------|
| et mangal mola | Et Mangal Mola |
| et mangal rehberi | Et Mangal Rehberi |
| mangal tarifleri | Mangal Tarifleri |
| Bolu gezi | Bolu Gezi |
| bolu restoran | Bolu Restoran |
| bolu gezilecek yerler | Bolu Gezilecek Yerler |

---

## Kontrol Listesi

Tüm işlemler bittikten sonra:

- [ ] `et-mangal` tag sayfası URL'i: `ibrahiminyeri.com/.../tags/et-mangal` (artık -1 yok)
- [ ] `bolu-dagi-et-mangal` tag sayfası URL'i: Türkçe karakter yok
- [ ] `bolu-dagi` tag sayfası URL'i: Türkçe karakter yok
- [ ] Herhangi bir etiket sayfasında `%C4%9F` veya `%C5%9F` gibi encoded karakter yok
- [ ] etiketler.json'daki `slugTarget` değerleri artık `slug` değerleriyle eşleşiyor
- [ ] scripts/tags.json'daki notlardaki "yapılacak" ifadeleri güncellendi

---

## Sonra: API ile Doğrula

```bash
node sites/ibrahiminyeri/scripts/fetch-tags.js
```

Beklenen çıktı:
- 33 tag, hiçbirinde `⚠️ TR-char` veya `⚠️ suffix` uyarısı yok
- `etiketler.json` otomatik güncellenir (slug → slugTarget, panelAction → null)
- "✅ Tüm panel işlemleri tamamlandı!" mesajı görünür

```bash
# SEO verilerini güncelle (slug düzeltmeleri bittikten sonra)
node sites/ibrahiminyeri/scripts/update-tag-seo.js --dry-run
node sites/ibrahiminyeri/scripts/update-tag-seo.js
```
