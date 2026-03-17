wixId: "e24a5b21-4296-4c17-93da-86df8af81068"
---
title: "Uluslararası SEO: Çok Dilli ve Çok Ülkeli Site Stratejisi"
slug: "uluslararasi-seo"
focusKeyword: "uluslararası seo"
seoTitle: "Uluslararası SEO: Çok Dilli Site Rehberi 2025 | Blakfy"
metaDesc: "Uluslararası SEO nasıl yapılır? Hreflang etiketi, ccTLD vs alt klasör, dil hedefleme ve farklı ülkelerde sıralama stratejileri için kapsamlı rehber."
excerpt: "Sitenizi birden fazla dil veya ülke için optimize etmek, hreflang ve doğru URL yapısından çok daha fazlasını gerektiriyor. Uluslararası SEO'nun temellerini öğrenin."
categories: ["ileri-seviye-seo"]
tags: ["seo", "google-search-console"]
imageUrl: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=1600&h=900&fit=crop"
imageAlt: "Uluslararası SEO dünya haritası çok dilli"
language: "tr"
status: "published"
---
Sitenizi yalnızca Türkiye'ye değil, birden fazla ülkeye veya dile hedeflemek istiyorsanız uluslararası SEO devreye giriyor. Çok dilli veya çok bölgeli bir yapı doğru kurulmadığında ciddi indeksleme sorunlarına, içerik çakışmalarına ve fırsat kayıplarına yol açar. Bu rehber, uluslararası SEO'nun temel yapıtaşlarını ele alıyor.

## Uluslararası SEO Ne Zaman Gerekir?

**Farklı dil:** Türkçe ve İngilizce içerik sunan bir site.

**Farklı ülke, aynı dil:** Türkiye ve Almanya'da yaşayan Türkçe konuşan kitlelere ayrı içerik.

**Farklı ülke, farklı dil:** Türkiye, ABD ve Almanya pazarlarına ayrı URL ve içerikle hizmet vermek.

## URL Yapısı Seçenekleri

Uluslararası SEO'nun en temel kararlarından biri URL yapısıdır.

### Seçenek 1: ccTLD (Ülke Kodu Üst Düzey Alan Adı)

Her ülke için ayrı alan adı:
```
siteniz.com.tr  → Türkiye
siteniz.de      → Almanya
siteniz.co.uk   → Birleşik Krallık
```

**Avantajlar:**
- Güçlü ülke hedefleme sinyali
- Her alan adı bağımsız otorite inşa edebilir

**Dezavantajlar:**
- Her alan adı ayrı SEO çalışması gerektiriyor
- Maliyet ve yönetim karmaşıklığı yüksek
- Yeni alan adları başlangıçta otorite yok

### Seçenek 2: Alt Klasör (Subdirectory)

Tek alan adı altında ülke/dil klasörleri:
```
siteniz.com/tr/   → Türkçe
siteniz.com/en/   → İngilizce
siteniz.com/de/   → Almanca
```

**Avantajlar:**
- Tüm ülke/diller tek domain altında — otorite birleşiyor
- Yönetimi görece kolay
- Başlangıçta hızlı etki (ana domainin gücünden faydalanır)

**Dezavantajlar:**
- Ülke hedefleme sinyali ccTLD kadar güçlü değil
- Klasörlerin ayrı içerik sunması şart (duplicate content riski)

### Seçenek 3: Alt Alan Adı (Subdomain)

```
tr.siteniz.com   → Türkçe
en.siteniz.com   → İngilizce
de.siteniz.com   → Almanca
```

**Avantajlar:**
- Teknik ayrım sağlar, farklı hosting altyapısı kullanılabilir

**Dezavantajlar:**
- Google her subdomain'i ayrı site olarak değerlendirme eğiliminde — link gücü bölünür
- Alt klasörden daha az önerilen

**Genel öneri:** Büyük uluslararası markalar için ccTLD. Kaynakları sınırlı işletmeler için alt klasör en pratik seçenek.

## Hreflang Etiketi

Uluslararası SEO'nun teknik olarak en kritik noktası hreflang etiketidir.

### Hreflang Nedir?

Google'a bir sayfanın hangi dil ve ülke için olduğunu bildiren HTML etiketi:

```html
<link rel="alternate" hreflang="tr" href="https://siteniz.com/tr/hakkimizda/" />
<link rel="alternate" hreflang="en-US" href="https://siteniz.com/en/about/" />
<link rel="alternate" hreflang="de" href="https://siteniz.com/de/ueber-uns/" />
<link rel="alternate" hreflang="x-default" href="https://siteniz.com/about/" />
```

**x-default:** Belirli bir dil/bölge için uygun sürüm bulunmadığında varsayılan URL.

### Hreflang Kuralları

**Karşılıklı işaret:** Her sayfanın tüm versiyonlarını listelemesi ve her listelenen sayfanın geri işaret etmesi gerekiyor.

Türkçe sayfa → İngilizce ve Almanca sayfayı işaret eder
İngilizce sayfa → Türkçe ve Almanca sayfayı işaret eder
Almanca sayfa → Türkçe ve İngilizce sayfayı işaret eder

**Tam URL:** Hreflang değerleri mutlaka tam URL içermeli (canonical ile aynı).

**Dil kodları:** ISO 639-1 formatı kullanılmalı (tr, en, de, fr). Ülke hedeflemesi için dil-ülke kombinasyonu: en-US, en-GB, pt-BR, pt-PT.

### Hreflang Hataları

**Eksik karşılıklı işaret:** En yaygın hata. Türkçe sayfa İngilizce versiyonu işaret ediyor ama İngilizce Türkçeye işaret etmiyor.

**Yanlış dil kodu:** `tr-TR` yerine `tr` kullanmak (ülke kodu gereksiz, dil kodu yeterli).

**Canonical çakışması:** Bir sayfa farklı ülke versiyonlarına canonical veriyorsa hreflang anlamsızlaşır.

**Hreflang doğrulama:** Google Search Console → Uluslararası Hedefleme → Dil bölümü. Ahrefs Site Audit da hreflang hatalarını raporlar.

## İçerik Stratejisi

### Gerçek Yerelleştirme vs Çeviri

Makine çevirisi veya kopyala-yapıştır çeviri yeterli değildir.

**Yerelleştirme şunları kapsar:**
- Kültürel referanslar ve örnekler
- Para birimi ve ölçü birimleri
- Yerel arama terimleri (Türkçe "telefon" İngilizce "phone" ile aynı arama amacını taşımayabilir)
- Yerel rakipler ve sektör dinamikleri

### Dil Bazlı Anahtar Kelime Araştırması

Her dil için bağımsız anahtar kelime araştırması yapın. Bir kelimeyi doğrudan çevirmek her zaman doğru arama amacını vermez.

**Örnek:** "SEO" hem Türkçe hem İngilizce aynı terimi kullanır. Ama "dijital pazarlama" ve "digital marketing" arama hacmi ve rekabeti farklıdır.

### Duplicate Content Riski

Aynı içeriği farklı dillerde sunarken duplicate content sorunu oluşabilir. Hreflang bunu çözer — ama doğru uygulanmazsa Google hangi sayfayı sıralayacağını bilemez.

## Teknik Altyapı

### CDN ve Sunucu Konumu

Kullanıcıya coğrafi yakınlık hız açısından önemli. Türkiye trafiği için Türkiye sunucusu veya en azından Avrupa CDN noktası tercih edilmeli.

### Dil Algılama

IP'ye göre otomatik dil yönlendirmesi SEO riski taşır. Google, JavaScript yönlendirmelerini her zaman doğru değerlendirmeyebilir. Tercih edilen yaklaşım: Kullanıcıya dil seçme imkanı sunmak ve seçimi kaydetmek.

**Kesinlikle yapmayın:** Googlebot'a ve kullanıcıya farklı dil göstermek (cloaking).

### Google Search Console Yapılandırması

Her URL versiyonu (alt klasör veya ccTLD) için ayrı GSC mülkü ekleyin. "Uluslararası Hedefleme" bölümünden hedef ülke belirtin.

## E-ticaret için Uluslararası SEO

**Para birimi ve fiyat:** Her ülke sayfasında yerel para biriminde fiyat gösterin.

**Ödeme yöntemleri:** Ülkeye göre farklı ödeme seçenekleri hem UX hem dönüşüm için kritik.

**Kargo ve teslimat:** Yerel kargo bilgisi açıkça belirtilmeli.

**Yasal gereksinimler:** AB için GDPR, ABD için farklı vergi kuralları vb.

## Sık Sorulan Sorular

### Hangi URL yapısı en iyisi?

Kaynak kısıtlıysa alt klasör. Büyük ve kaynak-zengin işletme için ccTLD. Alt alan adı genellikle en az tercih edilendir.

### Hreflang olmadan uluslararası SEO yapılabilir mi?

Teknik olarak yapılabilir ama çok riskli. Google hangi dil/ülke sayfasını sıralayacağını karıştırabilir ve yanlış sonuçları yanlış kullanıcılara gösterebilir.

### Her ülke için ayrı içerik üretmek zorunda mıyım?

Evet. Google, makine çevirisi kalitesindeki içeriği zayıf kaliteli değerlendirebilir. Gerçek yerelleştirme şart.

## Kaynakça

- Google: International Targeting — developers.google.com/search/docs/specialty/international
- Google: Use hreflang — developers.google.com/search/docs/specialty/international/localization
- Ahrefs: International SEO Guide — ahrefs.com/blog
- Moz: International SEO — moz.com/learn/seo/international-seo
