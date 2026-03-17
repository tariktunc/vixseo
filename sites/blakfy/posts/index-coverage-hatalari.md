wixId: "b49e4952-8412-4a05-8b00-0f0d330904b2"
---
title: "Index Coverage Hataları: Google Search Console Çözüm Rehberi"
slug: "index-coverage-hatalari"
focusKeyword: "index coverage hataları"
seoTitle: "Index Coverage Hataları: GSC Çözüm Rehberi 2025 | Blakfy"
metaDesc: "Google Search Console'da index coverage hataları nedir, nasıl çözülür? Crawled not indexed, Discovered not indexed, noindex ve robots.txt hataları için rehber."
excerpt: "İçerikleriniz yayınlandı ama Google'da görünmüyor. Search Console'daki index coverage raporunu okumayı ve yaygın hataları çözmeyi öğrenin."
categories: ["teknik-seo"]
tags: ["seo", "google-search-console"]
imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&h=900&fit=crop"
imageAlt: "Index coverage hataları Google Search Console çözüm"
language: "tr"
status: "published"
---
İçerik ürettiniz, yayınladınız — ama Google'da görünmüyor. En sık karşılaşılan SEO hayal kırıklıklarından biri bu. Google Search Console'daki "Dizin Oluşturma" (Index Coverage) raporu, hangi URL'lerin neden indekslenmediğini gösterir. Bu rehber, yaygın index sorunlarını ve çözümlerini ele alıyor.

## Google Search Console Index Raporuna Erişim

GSC → Sol Menü → "İndeksleme" → "Sayfalar"

**Durum grupları:**
- ✅ **İndeks'e alındı:** Sağlıklı, Google bu URL'yi indexlemiş
- ⚠️ **Uyarı:** İndekslenmiş ama sorun var
- ❌ **Hata:** İndekslenemedi
- ℹ️ **Dışarıda:** İndeks dışında (intentional veya değil)

## Yaygın Index Hataları ve Çözümleri

### 1. "Keşfedildi — şu anda dizine alınmadı" (Discovered — Currently Not Indexed)

**Anlam:** Googlebot URL'yi biliyor ama henüz ziyaret etmedi. Kuyruğa alındı.

**Nedenler:**
- Siteniz yeni kuruldu
- İçerik düşük kaliteli (Google öncelik vermedi)
- Tarama bütçesi yetersiz (büyük siteler)
- Bağlantısız sayfa (iç link yok)

**Çözümler:**
- URL'yi manuel olarak "URL Denetimi → İndekslemeyi İste" ile iste
- Sitemap'e ekle ve GSC'ye gönder
- İç bağlantı ekle
- İçerik kalitesini artır

### 2. "Tarandı — şu anda dizine alınmadı" (Crawled — Currently Not Indexed)

**Anlam:** Googlebot ziyaret etti, indekslemeye değer bulmadı.

Bu durum daha ciddi. Google sayfayı görüp "indekslemeye değmez" dedi.

**Nedenler:**
- İnce içerik (thin content): Çok az kelime, düşük değer
- Duplicate content: Aynı içerik başka yerde var
- Yoğun reklam, düşük içerik oranı
- Teknik sorunlar (yavaş yükleme, JavaScript hataları)

**Çözümler:**
- İçeriği zenginleştirin (500+ kelime, özgün değer)
- Duplicate kontrol edin (Siteliner veya Copyscape)
- Core Web Vitals düzeltin
- E-E-A-T sinyallerini güçlendirin

### 3. "Alternate page with proper canonical tag" (Kanonik ile Değiştirilen Sayfa)

**Anlam:** Bu URL bir başka URL'ye canonical ile işaret ediyor. Google canonical hedefini indexledi.

**Durum:** Eğer kasıtlıysa — sorun yok. Eğer yanlışlıkla canonical eklediyseniz — düzeltin.

**Kontrol:**
```html
<link rel="canonical" href="https://siteniz.com/dogru-url/">
```

### 4. "Page with redirect" (Yönlendirilen Sayfa)

**Anlam:** URL yönlendirme yapıyor. Normal beklenen durum.

**Sorun:** Yönlendirme zinciri (A → B → C) varsa. Direkt (A → C) yapın.

### 5. "Excluded by 'noindex' tag" (Noindex ile Dışlandı)

**Anlam:** Sayfada `<meta name="robots" content="noindex">` etiketi var.

**Kontrol:** Kasıtlı mı? Gizlenmesi gereken sayfa mı (sepet, hesabım)?

**Hata:** Önemli sayfaları yanlışlıkla noindex'lemek. Yoast SEO "bu sayfayı arama motorlarından gizle" seçeneği kolayca işaretlenebilir.

**Çözüm:** Noindex etiketini kaldırın.

### 6. "Blocked by robots.txt" (Robots.txt ile Engellendi)

**Anlam:** robots.txt dosyasındaki Disallow kuralı Googlebot'u engelliyor.

**Kontrol:** GSC → URL Denetimi Aracı → URL girin → Robots.txt kontrolü.

**Çözüm:** robots.txt'den ilgili Disallow kuralını kaldırın. GSC → Robots.txt Tester ile kontrol edin.

### 7. "Not found (404)" (Bulunamadı)

**Anlam:** Sayfa mevcut değil.

**Nedenler:**
- Silinen veya taşınan sayfa
- URL yazım hatası
- Geçici sunucu sorunu

**Çözüm:**
- Sayfa kalıcı silindiyse: 410 (Gone) yanıt koduna geçin veya ilgili içeriğe 301
- Taşındıysa: 301 ile yeni URL'ye yönlendirin

### 8. "Server error (5xx)" (Sunucu Hatası)

**Anlam:** Sunucu isteğe yanıt veremiyor.

**Acil durum:** 500 hataları Googlebot'un sayfayı indekslemesini tamamen engeller.

**Çözüm:** Sunucu loglarına bakın, hosting sağlayıcıyla iletişime geçin, eklenti/tema çatışması kontrol edin.

### 9. "Soft 404" (Sahte 404)

**Anlam:** Sayfa 200 döndürüyor ama içerik yok/çok az ("Ürün bulunamadı", boş arama sayfası).

**Çözüm:** Boş sayfaları gerçek 404'e dönüştürün veya ilgili içeriğe yönlendirin.

## Öncelik Sıralaması

Hangi hataları önce çözmelisiniz?

1. **Server error (5xx):** Acil — tüm taramayı bloke eder
2. **Önemli sayfalar "Not indexed":** Gelir kaybı doğrudan etkilenir
3. **Yanlış noindex/robots.txt:** Kolayca düzeltilebilir, etkisi büyük
4. **Crawled not indexed:** İçerik kalite sorunu — zaman alır
5. **Discovered not indexed:** Zaman meselesi, büyük site değilse düzelir

## Toplu URL İndeksleme İsteme

GSC'de manuel "İndekslemeyi İste" günde yalnızca sınırlı sayıda URL için çalışır.

**Toplu indeksleme için:**
- Sitemap güncelleyin
- GSC → Sitemaps → Yeniden gönder
- Yeni içerikler için Indexing API (geliştiriciler için)

## Sık Sorulan Sorular

### İçerik yayınladıktan ne kadar sonra indekslenir?

Değişken: Büyük otorite siteler saatler içinde. Yeni siteler 2-8 hafta. Sitemap + GSC bildirim bu süreci hızlandırır.

### Tüm sayfalarımın indekslenmesi şart mı?

Hayır. Fiyat sayfaları, hesap sayfaları, teşekkür sayfaları gibi içeriklerin noindex olması doğru. Yalnızca değerli, özgün içerikler indekslenmeli.

### GSC'de "Dışarıda" grubundaki sayfa sayısı çok fazla ne anlama gelir?

Site büyümesine kıyasla normaldir. Önemli olan hangi sayfaların dışarıda olduğu — bunlar içinde kritik sayfalar var mı?

## Kaynakça

- Google Search Central: Indexing Coverage — developers.google.com/search
- Google: Index Coverage Report — support.google.com/webmasters/answer/7440203
- Ahrefs: Fix Index Coverage Issues — ahrefs.com/blog
- Search Engine Journal: GSC Indexing Report — searchenginejournal.com
