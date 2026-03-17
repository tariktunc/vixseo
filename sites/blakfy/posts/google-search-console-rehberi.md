wixId: "ae3bf229-7b70-430a-a669-198e85437167"
---
title: "Google Search Console Tam Rehberi 2025: Sıfırdan Uzmanlığa"
slug: "google-search-console-rehberi"
focusKeyword: "google search console rehberi"
seoTitle: "Google Search Console Rehberi 2025: Sıfırdan Uzmanlığa | Blakfy"
metaDesc: "Google Search Console nasıl kullanılır? Performans raporu, kapsam hataları, Core Web Vitals, URL inceleme ve SEO kararları için tam rehber."
excerpt: "Google Search Console, sitenizin Google'daki gerçek performansını gösteren ücretsiz ve vazgeçilmez SEO aracıdır. Bu rehberde tüm raporları ve kullanım senaryolarını ele alıyoruz."
categories: ["google-araclari"]
tags: ["seo", "google-search-console", "teknik-seo"]
imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop"
imageAlt: "Google Search Console SEO analiz paneli"
language: "tr"
status: "published"
---
Google Search Console (GSC), Google'ın web yöneticilerine sunduğu ücretsiz araçtır. SEMrush veya Ahrefs gibi ücretli araçlar tahmini veri sunarken, GSC gerçek Google verisi sunar: hangi sorgularda görünüyorsunuz, hangi sayfalar indekslendi, hangi hatalar var. Bu rehberde her raporu ve ne işe yaradığını adım adım açıklıyoruz.

## Google Search Console Kurulumu

### Mülk Ekleme

GSC'ye giriş için Google hesabı yeterli. [search.google.com/search-console](https://search.google.com/search-console) adresine gidin.

**İki mülk türü var:**

**Domain mülkü** (önerilen): `example.com` — HTTP, HTTPS, www, www olmayan tüm varyantları tek mülkte toplar. DNS kaydıyla doğrulanır.

**URL öneki mülkü**: `https://www.example.com` — yalnızca bu protokol ve subdomaini kapsar. HTML etiketi, Google Analytics veya Google Tag Manager ile doğrulanır.

### Doğrulama Yöntemleri

**DNS kaydı (Domain mülkü):** Domain sağlayıcınızın DNS panelinde TXT kaydı eklersiniz. En kapsamlı kapsam — kesinlikle tercih edin.

**HTML etiketi:** `<head>` içine meta etiketi ekleyin. Etiket silinirse doğrulama düşer.

**Google Analytics:** GA4 izleme kodu sayfada aktifse otomatik doğrulanır.

**Google Tag Manager:** GTM konteyner kodunuz aktifse çalışır.

Doğrulama sonrası veriler geriye dönük 16 aya kadar görünür hale gelir — ama yeni mülkte bu süre dolmadan önce birkaç gün beklemeniz gerekir.

## Performans Raporu: En Kritik Bölüm

Performans raporuna soldan "Arama Sonuçları" tıklayın. Bu rapor dört temel metriği gösterir:

**Tıklama (Click):** Kullanıcının sonucu tıkladığı sayı.

**Gösterim (Impression):** Sitenizin arama sonuçlarında görüntülendiği sayı. Kullanıcının sonucu görmesi şart değil — sayfayı kaydırmadan da sayılır.

**TO (Tıklama Oranı / CTR):** Tıklama ÷ Gösterim × 100. %3 genel web ortalaması; yüksek pozisyonlarda (1-3) %10-30 beklenebilir.

**Ortalama Konum:** Google'da ortalama sıralama pozisyonunuz.

### Filtreler ve Segmentasyon

**Tarih aralığı:** Son 3, 6, 12 veya 16 ay. Yıllık karşılaştırma için önceki yılla karşılaştır.

**Arama Türü:** Web, Görsel, Video, Haber. SEO çalışmaları genellikle "Web" filtresiyle yapılır.

**Sorgular sekmesi:** Hangi arama ifadeleriyle görünüyorsunuz? Bu, anahtar kelime araştırmasının en doğru verisidir.

**Sayfalar sekmesi:** Her URL'nin performansını ayrı ayrı görün.

**Ülkeler sekmesi:** Trafik hangi ülkeden geliyor?

**Cihazlar sekmesi:** Masaüstü, Mobil, Tablet dağılımı.

### GSC ile SEO Fırsatı Bulmak

**Yüksek gösterim, düşük TO:** 1.000+ gösterim ama %1'in altında TO. Bu sayfalar Google'da görünüyor ama kullanıcılar tıklamıyor. Başlık ve meta açıklamayı optimize edin.

**Konum 4-10 arasında sıralanan sorgular:** Biraz daha çalışmayla ilk 3'e girebilirsiniz. Bu sorgular için içeriği güçlendirin.

**Uzun kuyruklu sorgular:** Hiç hedeflemediğiniz ama trafik getiren sorgular. Bu sorguları kapsayan yeni içerik yazın.

## URL İnceleme Aracı

Herhangi bir URL'nin Google'daki durumunu anlık kontrol eder. Üstteki arama çubuğuna URL'yi yazın.

**Gösterilen bilgiler:**
- Google tarafından indekslenip indekslenmediği
- Son tarama tarihi
- Canonical URL (Google'ın hangi versiyonu asıl saydığı)
- Mobil kullanılabilirlik durumu
- Sayfa için keşfedilen veri
- İndeks kapsamı (neden indekslenmedi ise sebebi)

**"İndeksleme İste" butonu:** Yeni veya güncellenmiş içeriği Google'a bildirmek için kullanın. GSC anında işlem yapamaz ama kuyruğa alır. Günde en fazla 10-12 URL için kullanışlıdır.

## Kapsam (İndeks) Raporu

Sol menüden "İndeks" → "Sayfalar" tıklayın. Bu rapor sayfalarınızın indeks durumunu 4 kategoriye ayırır:

### Hata — Acil Müdahale Gerekli

**"Gönderildi ve indekslendi" dışındaki tüm hatalar dikkatle incelenmeli:**

**404 — Bulunamadı:** Sayfa silinmiş veya URL değişmiş. Eski URL'ye 301 yönlendirme ekleyin.

**301 yönlendirme hatası:** Yönlendirme zinciri çok uzun veya döngüsel. Direkt yönlendirme yapın.

**Sunucu Hatası (5xx):** Hosting sorunu — barındırma sağlayıcınıza bildirin.

**robots.txt tarafından engellendi:** İsteyerek mi engellediniz? Değilse robots.txt'i düzeltin.

**Noindex etiketi:** `<meta name="robots" content="noindex">` etiketi var. Kasıtlı mı, değil mi kontrol edin.

### Uyarı — İncelenmeli

**"İndekslenmedi, tarandı":** Sayfa bulundu ama içerik kalitesi düşük olduğu için Google indekslemedi. İçerik kalitesini artırın veya sayfayı noindex yapın.

**"Keşfedildi — şu an sıraya alındı":** Sayfa bulundu ama henüz taranmadı. Beklemeniz gerekir veya URL İnceleme → İndeksleme İste ile hızlandırın.

**"Canonical — Google tarafından seçildi, gönderilenden farklı":** Google sizin belirlediğiniz canonical'ı kabul etmedi, başka bir URL'yi asıl olarak seçti. İki sayfanın içeriğini karşılaştırın.

### İyi Durumlar

**"Gönderildi ve indekslendi":** Her şey yolunda.

**"İndekslenmiyor, kullanıcı tarafından hariç tutuldu":** `noindex` etiketi var ve bu bilerek yapılmış. Örneğin login sayfaları, teşekkür sayfaları.

## Deneyim Raporu

### Core Web Vitals

Sol menüden "Deneyim" → "Core Web Vitals". Sayfalarınızı üç kategoriye ayırır: İyi, İyileştirme Gerekiyor, Zayıf.

**LCP (Largest Contentful Paint):** En büyük içerik öğesinin yüklenme süresi. 2,5 saniyenin altı hedef.

**CLS (Cumulative Layout Shift):** Görsel kararlılık. 0,1'in altı iyi.

**INP (Interaction to Next Paint):** Etkileşim yanıt süresi. 200ms altı iyi.

**Önemli not:** GSC'deki Core Web Vitals verileri gerçek kullanıcı verisidir (CrUX — Chrome User Experience Report). PageSpeed Insights lab verisiyle farklılık gösterebilir. GSC verisi daha önemlidir.

Bir sayfada sorun görürseniz, o sayfayı tıklayın — aynı sorundan etkilenen tüm URL'ler listelenecektir.

### Mobil Kullanılabilirlik

Mobil uyumsuz sayfalar burada listelenir. Yaygın hatalar:
- Dokunma öğeleri çok yakın
- Görünüm alanı yapılandırılmamış
- Metin okunması için yakınlaştırma gerekiyor

## Site Haritası Raporları

Sol menüden "İndeks" → "Site Haritaları". XML site haritanızı buraya gönderin.

**Site haritası gönderme:** "Yeni site haritası ekle" kutusuna URL'yi yazın → Gönder. `https://siteniz.com/sitemap.xml` formatı.

**Kontrol edilecekler:**
- Durum: Başarıyla işlendi mi?
- Keşfedilen URL sayısı: Site haritasındaki URL sayısıyla örtüşüyor mu?
- Son okunma tarihi: Güncel mi?

XML site haritası şablonu:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/sayfa/</loc>
    <lastmod>2025-03-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## Bağlantılar Raporu

Sol menüden "Arama Trafiği" → "Bağlantılar".

**Dış bağlantılar:** Sitenize hangi dış sitelerden kaç backlink geliyor? Hangi sayfalarınız en fazla backlink alıyor? En çok hangi anchor text kullanılıyor?

**İç bağlantılar:** Sitenizin hangi sayfasına en fazla iç link var? Bu, Google'ın sitenizdeki öncelikli sayfaları nasıl algıladığını gösterir. Önemli sayfalarınız az iç link alıyorsa, bağlantı yapısını güçlendirin.

## E-posta Bildirimleri Ayarı

GSC tespit ettiği önemli sorunları e-postayla bildirebilir. Sağ üst köşeden "Ayarlar" → "Kullanıcı ve izinler" → kendi e-posta adresinizin yanından "Tercih edilen"i seçin.

Bildirim türleri:
- Site bağlantı hataları
- Mobil kullanılabilirlik sorunları
- AMP hataları
- Güvenlik sorunları

## GSC'yi Düzenli Kullanma Alışkanlıkları

**Haftalık (15 dk):** Performans raporunda tıklama/gösterim değişimlerini kontrol et. Ani düşüş var mı?

**Aylık (30 dk):** Kapsam hatalarını gözden geçir. Yeni hatalar çıktı mı? Core Web Vitals'ta iyileşme var mı?

**Üç aylık (1 saat):** Yılllık karşılaştırma yap. Hangi sorgular ivme kazandı? Hangi sayfalar geriledi?

**Algoritma güncellemesi sonrası:** Güncellemeden hemen sonra performans raporunda tarih karşılaştırması yap. Trafik düştüyse hangi sayfalar etkilendi?

## Sık Sorulan Sorular

### GSC ile Ahrefs/SEMrush arasındaki fark nedir?

GSC gerçek Google verisidir. Ahrefs ve SEMrush tahmine dayalı kendi veritabanlarını kullanır. Sıralama takibi için üçüncü parti araçlar daha detaylı olabilir, ama kaynak trafik ve indeks durumu için GSC en güvenilir kaynaktır.

### Yeni site için GSC ne zaman veri göstermeye başlar?

Doğrulama sonrası 24-72 saat içinde ilk veriler gelmeye başlar. Ama anlamlı performans verisi için en az 28 gün gerekir — GSC'nin varsayılan tarih aralığı da 28 gündür.

### GSC'de "Ortalama Konum 1" ama trafik yok, neden?

Düşük hacimli bir anahtar kelimede 1. olabilirsiniz. Gösterim sayısını inceleyin — gösterim çok düşükse, o kelime neredeyse hiç aranmıyor demektir.

### Sitemi GSC'ye eklediğimde Google daha hızlı mı indeksler?

Evet — özellikle XML site haritası gönderdiğinizde ve yeni sayfalar için "İndeksleme İste" kullandığınızda. Ama bu garanti değil, Google'ın kuyruğuna girer.

## Kaynakça

- Google Search Console Yardım Merkezi — support.google.com/webmasters
- Google Search Central Blog — developers.google.com/search/blog
- Search Engine Land: GSC Guide — searchengineland.com
- Moz: Google Search Console Guide — moz.com