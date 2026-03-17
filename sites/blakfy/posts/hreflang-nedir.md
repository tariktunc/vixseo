wixId: "8a2a18db-efc4-41a6-854a-44ee660b1047"
---
title: "Hreflang Nedir? Çok Dilli Site Kurmak İsteyenler İçin"
slug: "hreflang-nedir"
focusKeyword: "hreflang nedir"
seoTitle: "Hreflang Nedir? Çok Dilli Site Kurmak İsteyenler İçin | Blakfy"
metaDesc: "Hreflang nedir, nasıl uygulanır? Çok dilli site SEO'su için doğru hreflang kurulumu ve yaygın hatalar. Blakfy teknik SEO rehberi 2025."
excerpt: "Yanlış hreflang = sıralama kaybı. Çok dilli site kuranların çoğu hreflang'ı hatalı uyguluyor. İşte doğru kurulum rehberi."
categories: ["teknik-seo"]
tags: ["seo"]
imageUrl: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&h=900&fit=crop"
imageAlt: "Hreflang çok dilli site dünya haritası"
language: "tr"
status: "published"
---
Hreflang, çok dilli veya çok bölgeli bir site kuruyorsan kesinlikle doğru uygulamanı gerektiren bir HTML etiketidir. Yanlış uygulandığında Google hangi sayfayı hangi ülke için göstereceğini bilemez, sıralamalar birbirine karışır. Blakfy olarak çok dilli sitelerde gördüğümüz sıralama sorunlarının %60'ının kaynağı hatalı hreflang uygulaması. Bu rehberi okuyorsan doğru yerdesin.

## Hreflang Nedir?
Hreflang, HTML sayfalarının `<head>` bölümüne veya HTTP başlığına eklenen bir etikettir. Google'a şunu söyler: 'Bu sayfanın X dilde / Y ülke için olan versiyonu şu URL'dir.' Böylece Google, Türkçe içeriği Türkiye'deki kullanıcılara, İngilizce içeriği İngilizce konuşan kullanıcılara gösterir.

## Hreflang Ne Zaman Kullanılır?

- Sitenin birden fazla dil sürümü varsa (Türkçe + İngilizce gibi)
- Aynı dilde farklı ülkelere yönelik içerik varsa (Türkçe TR ve Türkçe DE gibi)
- Farklı URL yapılarında çok dilli içerik sunuyorsan
Hreflang sadece dil farklılığı için değil, bölgesel farklılık için de kullanılır. Türkiye için Türkçe ve Almanya'daki Türk diasporası için ayrı içerik sunan siteler buna iyi örnektir.

## Hreflang Kodu Nasıl Yazılır?
Temel hreflang etiketi formatı şöyle: `<link rel='alternate' hreflang='tr' href='https://example.com/tr/' />`. Dil kodu için ISO 639-1 standardını kullan: tr (Türkçe), en (İngilizce), de (Almanca). Bölge kodu eklemek için: tr-TR (Türkiye için Türkçe), tr-DE (Almanya için Türkçe), en-US (ABD için İngilizce).

## Hreflang'ın 3 Temel Kuralı

### Kural 1: Her Sayfada Kendi Kendine Link
Her sayfa kendi hreflang etiketini içermek zorunda. Yani Türkçe sayfa hem kendi URL'sine hem İngilizce versiyonuna hreflang vermelidir. Bu kural atlanırsa Google etiketleri geçersiz sayar.

### Kural 2: Çift Yönlü Onay
A sayfası B sayfasına hreflang veriyorsa, B sayfası da A sayfasına hreflang vermek zorunda. Bu karşılıklı onay olmadan Google hreflang sinyallerini yok sayar. Türk sitelerinde en sık atlanan kural bu.

### Kural 3: x-default Etiketi
Hangi dile uymayan kullanıcılar için varsayılan sayfa hangisi? Bunu `hreflang='x-default'` ile belirtirsin. Genellikle ana dil sayfasına veya dil seçim sayfasına işaret eder.

## Hreflang Eklemenin 3 Yöntemi

1. HTML head bölümüne ekle: En yaygın yöntem. Her sayfanın <head> kısmına link etiketlerini ekle.
2. HTTP response header'a ekle: Sunucu konfigürasyonu gerektiriyor. PDF gibi HTML olmayan dosyalar için kullanılır.
3. XML Sitemap'e ekle: Büyük siteler için pratik. Sitemap içinde her URL'nin alternatif sürümlerini belirtirsin.

## Türkiye'den Hreflang Örneği
Bir Türk tekstil firması hem Türkiye hem Almanya pazarına yönelik site yönetiyordu. Türkçe ve Almanca içerikleri vardı. Hreflang eksikti. Sonuç: Almanya'daki Google'da Türkçe sayfalar çıkıyordu, Almanca sayfalar çıkmıyordu. Blakfy olarak hreflang uygulaması yaptık. 6 hafta içinde Almanya'daki organik trafik %85 arttı.

## Adım Adım Hreflang Kurulumu

1. Sitenin tüm dil sürümlerini ve URL yapısını listele.
2. Her dil için doğru dil kodunu (ISO 639-1) belirle.
3. x-default URL'sini belirle — genellikle ana sayfa.
4. Her sayfanın <head> bölümüne karşılıklı hreflang etiketlerini ekle.
5. Google Search Console'da hreflang hatalarını kontrol et.
6. Bir hreflang doğrulama aracıyla etiketleri test et (hreflang.ninja gibi).

## Sık Yapılan Hreflang Hataları

- Tek yönlü hreflang: A sayfası B'ye link veriyor ama B, A'ya link vermiyor.
- Kendi kendine link vermemek: Sayfa kendi URL'sine hreflang vermiyor.
- x-default etiketini unutmak.
- Yanlış dil kodu kullanmak: 'tur' yerine 'tr' kullanılmalı.
- Canonical ve hreflang çakışması: Canonical başka bir URL'ye işaret ediyorsa hreflang karışır.
- 301 yönlendirilen URL'lere hreflang vermek — hreflang canonical URL'ye verilmeli.

## Sık Sorulan Sorular

### Hreflang sıralamayı doğrudan etkiler mi?
Doğrudan bir sıralama faktörü değil ama yanlış uygulandığında büyük sıralama kaybına yol açıyor. Doğru uygulandığında hedef kitle sıralamalarında ciddi iyileşme görülüyor.

### WordPress'te hreflang nasıl eklenir?
WPML veya Polylang eklentileri hreflang'ı otomatik ekliyor. Yoast SEO de hreflang desteği sunuyor. Manuel eklemek için functions.php veya tema header'ına kod eklenir.

### Shopify'da hreflang nasıl çalışır?
Shopify Markets kullanıyorsan hreflang etiketleri otomatik ekleniyor. Ama doğruluğunu mutlaka Google Search Console'dan kontrol et.

### Hreflang hatalarını nasıl tespit ederim?
Google Search Console > International Targeting raporu hreflang hatalarını gösteriyor. Ayrıca hreflang.ninja veya Screaming Frog ile detaylı tarama yapabilirsin.

### Tek dilli site için hreflang gerekli mi?
Hayır. Sadece tek bir dil ve tek bir hedef ülke varsa hreflang'a gerek yok. Eklemek gereksiz karmaşıklık yaratır.

## Kaynakça

- Google Search Central: 'Tell Google about localized versions of your page'
- Ahrefs: 'Hreflang: The Easy Guide for Beginners'
- Semrush: 'Hreflang Tags: What They Are and How to Implement Them'
- Moz: 'Hreflang Tag' — The Definitive Guide
- hreflang.ninja — Hreflang doğrulama aracı
