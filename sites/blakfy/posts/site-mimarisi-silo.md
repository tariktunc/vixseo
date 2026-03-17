wixId: "a7635224-0223-44b1-85dc-6374740401ff"
---
title: "Site Mimarisi ve Silo Yapısı: SEO için İdeal Site Tasarımı"
slug: "site-mimarisi-silo"
focusKeyword: "site mimarisi silo yapısı"
seoTitle: "Site Mimarisi ve Silo Yapısı: SEO Rehberi 2025 | Blakfy"
metaDesc: "SEO için ideal site mimarisi nasıl tasarlanır? Silo yapısı, URL hiyerarşisi, internal linking ve tarama verimliliği için kapsamlı site mimarisi rehberi."
excerpt: "Kötü site mimarisi, mükemmel içeriklerin bile görünmez kalmasına yol açar. Doğru hiyerarşi hem Googlebot'a hem kullanıcıya sitenizi anlatır."
categories: ["teknik-seo"]
tags: ["seo", "backlink", "javascript"]
imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1600&h=900&fit=crop"
imageAlt: "Site mimarisi silo yapısı SEO hiyerarşi"
language: "tr"
status: "published"
---
Site mimarisi, web sitenizdeki sayfaların nasıl organize edildiğini ve birbirine nasıl bağlandığını ifade eder. Hem kullanıcı deneyimi hem SEO için kritik bir temeldir. Kötü yapılandırılmış bir sitede Googlebot önemli sayfaları bulamaz, değerli içerikler tarama bütçesinin derinliklerine gömülür ve link gücü doğru sayfaları beslemez.

## SEO için İdeal Site Mimarisinin İlkeleri

### 1. Yassı Hiyerarşi (Flat Architecture)

Her sayfanın ana sayfadan en fazla 3-4 tıkla ulaşılabilmesi gerekiyor.

**Kötü (derin hiyerarşi):**
```
Ana Sayfa → Kategori → Alt Kategori → Alt-Alt Kategori → Ürün
(4-5 tık derinliği)
```

**İyi (yassı hiyerarşi):**
```
Ana Sayfa → Kategori → Ürün
(maksimum 3 tık)
```

Derin sayfalar Googlebot için daha az erişilebilir, daha az link değeri alır ve indekslenmesi zorlaşır.

### 2. Mantıklı URL Hiyerarşisi

URL yapısı, site hiyerarşisini yansıtmalı:

```
siteniz.com/                          → Ana Sayfa
siteniz.com/erkek-giyim/               → Kategori
siteniz.com/erkek-giyim/gomlek/        → Alt Kategori
siteniz.com/erkek-giyim/gomlek/slim-fit-beyaz/  → Ürün
```

Bu yapı hem kullanıcıya hem Googlebot'a "bu sayfa nerededir?" sorusunu yanıtlar.

### 3. Tutarlı İç Bağlantı (Internal Linking)

Link gücü (link equity) iç bağlantılar üzerinden dağıtılır. Güçlü sayfalar, zayıf sayfaları besler.

**Temel kural:** Ana sayfadan tek tıkla ulaşılabilen sayfalar en fazla link gücü alır.

## Silo Yapısı (SEO Silo Structure)

Silo, birbiriyle ilgili sayfaların gruplandırıldığı tematik yapıdır. Site içeriğini konulara göre "silolara" ayırıp her silo kendi içinde güçlü iç bağlantı ağı oluşturur.

### Neden Silo?

**Konu otoritesi:** Google, belirli bir konuya odaklanmış siloyu tematik otorite olarak değerlendiriyor.

**Link gücü yoğunlaştırma:** Silo içindeki sayfalar birbirini destekliyor — dağılmış değil, odaklanmış link gücü.

**Kullanıcı navigasyonu:** Bir konuyla ilgilenen kullanıcı, silo içinde kolayca gezinebiliyor.

### Silo Türleri

**Hard Silo (Katı Silo):**
URL klasörleriyle fiziksel ayrım:
```
/seo/
  /seo/teknik-seo/
  /seo/on-page-seo/
  /seo/backlink/

/e-ticaret/
  /e-ticaret/urun-sayfasi/
  /e-ticaret/kategori-sayfasi/
```

Silodan siloya (ör. /seo/ → /e-ticaret/) bağlantı yok veya sınırlı.

**Soft Silo (Esnek Silo):**
URL yapısı sabit olmayabilir ama iç bağlantılar silo mantığını takip eder. Yalnızca tematik olarak ilişkili sayfalar birbirine bağlanır.

### Silo Yapısı Kurulumu

**Adım 1: Konu haritası çıkarın**

Sitenizin kapsadığı tüm konuları listeleyin ve gruplandırın:
- SEO (teknik, içerik, backlink, araçlar...)
- E-ticaret (ürün sayfası, kategori, ödeme...)
- Sosyal medya (Instagram, LinkedIn, TikTok...)

**Adım 2: Pillar ve cluster belirleyin**

Her silo için:
- 1 Pillar page (ana konu sayfası): Geniş kapsamlı
- 5-10 Cluster page (alt konu sayfaları): Pillar'a bağlı

**Adım 3: URL yapısını planlayın**

Pillar: `/seo/`
Cluster'lar: `/seo/teknik-seo/`, `/seo/backlink/`, `/seo/anahtar-kelime/`

**Adım 4: İç bağlantı kurallarını belirleyin**

- Her cluster → pillar'a bağlanır
- Pillar → tüm cluster'lara bağlanır
- Cluster'lar birbiriyle ilişkiliyse bağlanabilir
- Farklı silodan gelen bağlantılar sınırlı tutulur

## Breadcrumb Navigasyonu

Breadcrumb (ekmek kırıntısı), kullanıcıya "neredesiniz" bilgisi verir:

```
Ana Sayfa > SEO > Teknik SEO > Site Mimarisi
```

**SEO faydaları:**
- Hem kullanıcı hem Googlebot için hiyerarşiyi netleştirir
- Schema markup ile zengin snippet (Google sonuçlarında URL yerine breadcrumb görünür)
- Sayfalar arası link değeri aktarımı

**Uygulama:**
- WordPress: Yoast SEO breadcrumb özelliği
- WooCommerce: Otomatik kategori breadcrumb
- Özel: BreadcrumbList schema

## Site Haritası ve Mimarinin Uyumu

Site haritanız, site mimarinizi yansıtmalı:
- Silo gruplarına göre ayrı sitemap dosyaları (sitemap-blog.xml, sitemap-urunler.xml)
- Öncelik skoru (`<priority>`) hiyerarşiyle uyumlu
- Siloların kök URL'leri en yüksek öncelikle

## E-ticaret Site Mimarisi

E-ticaret için özel yapı:

```
Ana Sayfa
├── Erkek Giyim (kategori)
│   ├── Gömlekler (alt kategori)
│   │   ├── Slim Fit Gömlekler (filtre)
│   │   └── Ürünler...
│   └── Pantolonlar
│       └── Ürünler...
├── Kadın Giyim
│   └── ...
└── Blog
    └── Yazılar...
```

**Yaygın hatalar:**

**Çok derin kategori yapısı:** 5+ seviye. Çözüm: Kategorileri birleştirin.

**Parametreli URL'ler:** `/urunler?renk=siyah&beden=42` → canonical ile yönetin.

**Yalıtılmış sayfalar (orphan pages):** Hiçbir iç link almayan sayfalar. Bunları bulun ve bağlayın.

## Sık Sorulan Sorular

### Mevcut siteyi silo yapısına dönüştürmek zor mu?

Evet — URL değişikliği, 301 yönlendirme ve kapsamlı iç link revizyonu gerektirir. Adım adım, dikkatli bir geçiş planıyla yapılmalı.

### Küçük bir site için silo gerekli mi?

20 sayfanın altında silo aşırı mühendislik. Temel mantıklı kategori yapısı ve tutarlı iç linking yeterli.

### Blog ve e-ticaret aynı sitede nasıl yapılandırılır?

Ayrı silo olarak tasarlayın: `/blog/` ve `/magaza/`. Aralarında tematik bağlantılar kurulabilir (ürünle ilgili blog yazısı, blog yazısından ürüne link).

## Kaynakça

- Moz: Site Architecture for SEO — moz.com/learn/seo/site-architecture
- Ahrefs: Silo Structure Guide — ahrefs.com/blog
- Backlinko: Website Architecture — backlinko.com/hub/seo/site-structure
- Google: Organize Your Site's Hierarchy — developers.google.com/search/docs
