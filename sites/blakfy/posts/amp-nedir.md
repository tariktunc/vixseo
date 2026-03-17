wixId: "94f297e1-14ad-4a27-9969-71e5728b0616"
---
title: "AMP Nedir? Accelerated Mobile Pages ve SEO Etkisi"
slug: "amp-nedir"
focusKeyword: "amp nedir"
seoTitle: "AMP Nedir? Accelerated Mobile Pages SEO Etkisi 2025 | Blakfy"
metaDesc: "AMP (Accelerated Mobile Pages) nedir, nasıl çalışır? AMP'ın SEO'ya etkisi, Google'ın güncel tutumu, avantaj ve dezavantajları ile alternatifleri."
excerpt: "AMP bir dönem mobil SEO'nun vazgeçilmezi gibi görünüyordu. Ama Google'ın tutumu değişti. Hâlâ kullanmalı mısınız? Güncel durum ve alternatifler bu yazıda."
categories: ["teknik-seo"]
tags: ["seo", "javascript", "core-web-vitals", "mobil-uyumluluk"]
imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&h=900&fit=crop"
imageAlt: "AMP mobil hız SEO teknik"
language: "tr"
status: "published"
---
AMP (Accelerated Mobile Pages), Google ve Twitter iş birliğiyle 2015 yılında başlatılan açık kaynaklı bir teknik standarttır. Amacı, mobil web sayfalarını olabildiğince hızlı yüklenmesi için özelleştirilmiş bir HTML alt kümesi ve önbellek altyapısıyla sunmaktır. 2020'ye kadar Google arama sonuçlarında AMP sayfalarına özel yer verildi. O günden bu yana Google'ın AMP'a yaklaşımı değişti ve pek çok site AMP'ı terk etti. Bu rehber AMP'ın ne olduğunu, neden önemini yitirdiğini ve bugün ne yapmanız gerektiğini ele alıyor.

## AMP Nasıl Çalışır?

AMP üç bileşenden oluşur:

**AMP HTML:** Standart HTML'in kısıtlanmış bir versiyonu. Bazı taglar yasaklı (form, iframe), bazı özelleştirilmiş AMP bileşenleri zorunlu.

**AMP JS:** Sayfanın yüklenmesini optimize eden JavaScript kütüphanesi. Üçüncü taraf JS büyük ölçüde engellidir.

**AMP Cache:** Google'ın CDN'i. AMP sayfaları Google sunucularında önbelleğe alınır. Kullanıcı Google aramadan tıkladığında sayfa Google cache'inden yüklenir — aslında sitenizden değil.

**Sonuç:** Olağanüstü hızlı yükleme. Ama içerik ve tasarım üzerinde ciddi kısıtlamalar.

## AMP'ın SEO Tarihi

### 2016-2020: Altın Dönem

Google, mobil arama sonuçlarında AMP sayfaları için şimşek simgesi ve "Top Stories" (öne çıkan haberler) karuseline özel erişim sundu.

**AMP olmayan siteler bu karusele giremiyordu.** Bu durum özellikle haber sitelerini AMP'a geçmeye zorladı.

### 2021: Dönüm Noktası

Google, Core Web Vitals'ı resmi sıralama faktörü olarak duyurduğunda önemli bir değişiklik geldi: **Top Stories karuseli artık AMP gerektirmiyor.** Yeterli Core Web Vitals puanına sahip herhangi bir sayfa öne çıkan haberlere girebiliyor.

### Günümüz

AMP özel bir sıralama avantajı sunmuyor. Google, AMP yerine Core Web Vitals'ı mobil deneyim standardı olarak benimsedi.

## AMP'ın Avantajları (Hâlâ Geçerli)

### Hız

Doğru uygulandığında AMP sayfaları olağanüstü hızlı. Google Cache'den yüklenme neredeyse anlık.

### Basit Teknik Yapı

JS kısıtlamaları nedeniyle AMP sayfalar teknik açıdan daha az karmaşık. Hız sorunlarına yol açan üçüncü taraf scriptlerin büyük bölümü dışarıda kalıyor.

### Haber Siteleri İçin Hâlâ Değer

Google Discover ve AMP destekli haber siteleri için hâlâ belirli ön yükleme avantajları var.

## AMP'ın Dezavantajları

### Tasarım Kısıtlamaları

Özel fontlar, animasyonlar, karmaşık form yapıları AMP ile sınırlı. Marka deneyimini ödün vermeden uygulamak zor.

### Analytics ve Tracking Karmaşıklığı

AMP sayfaları Google Cache'den geldiği için doğrudan analytics izlemesi çalışmaz. AMP Analytics entegrasyonu ayrı yapılandırma gerektirir.

### İçerik Sahipliği Sorunu

Sayfa teknik olarak Google URL'sinde (`google.com/amp/...`) sunuluyor. Kullanıcı fark etmeyebilir ama URL'nin sitenize ait olmaması bazı durumlarda sorun.

### Geliştirme ve Bakım Maliyeti

İki farklı sayfa sürümü yönetmek (AMP ve standart) içerik ve teknik açıdan çift çalışma.

### Kaldırılan Özel Avantajlar

AMP olmadan da Top Stories'e girilebildiğinden, birincil motivasyon ortadan kalktı.

## AMP ve Core Web Vitals Karşılaştırması

| Boyut | AMP | İyi Core Web Vitals |
|---|---|---|
| Hız | Çok hızlı (cache) | Hızlı (optimize edilmişse) |
| Tasarım özgürlüğü | Kısıtlı | Tam özgürlük |
| Geliştirme karmaşıklığı | Yüksek | Değişken |
| Sıralama avantajı | Yok (2021 sonrası) | Core Web Vitals ile aynı |
| Marka deneyimi | Zayıf | Tam kontrol |

## AMP'ı Hâlâ Kullanmalı Mısınız?

### Kullanmaya Devam Edin

- Büyük, köklü haber sitesiyseniz (AMP altyapısı yerleşik, kaldırmak riskli)
- Özellikle hızlı içerik tüketim platformlarına (Google Discover, Bing News) öncelik veriyorsanız
- AMP sayfalarınız Core Web Vitals hedeflerini tutturuyorsa

### AMP'ı Bırakın veya Geçmeyin

- Yeni site kuruyorsanız — doğrudan Core Web Vitals odaklı teknik yapı kurmanız daha mantıklı
- E-ticaret, SaaS veya kurumsal siteysseniz — AMP avantajı bu kategorilerde yok
- Tasarım ve marka deneyimine önem veriyorsanız — AMP kısıtlamaları bunu zorlaştırır

## AMP Alternatifi: Hızlı ve Standart Web

AMP'a alternatif, modern web performans pratiklerini uygulamaktır:

### Next.js veya Nuxt.js

Server-side rendering ve static site generation ile AMP seviyesine yakın hız. Tam tasarım özgürlüğü.

### Resim Optimizasyonu

WebP formatı, lazy loading, doğru boyutlandırma — LCP skorunu doğrudan iyileştirir.

### Kritik CSS ve JS Optimizasyonu

Render-blocking kaynakları azaltın. Kritik CSS inline alın.

### CDN Kullanımı

Cloudflare veya benzeri CDN ile cache ve global dağıtım. AMP Cache'e benzer hız.

### Core Web Vitals Odağı

LCP, INP ve CLS hedeflerini tutturmak, AMP'ın sağladığı SEO avantajlarının tamamını sağlıyor.

## Mevcut AMP Sitenizi Nasıl Geçirirsiniz?

AMP'tan çıkmak istiyorsanız dikkatli bir süreç gerekiyor:

1. **Standart sayfaların Core Web Vitals hazırlığı:** Önce standart sayfaları optimize edin
2. **AMP-canonical eşleştirme:** Mevcut AMP URL'lerinden standart sayfalara 301 yönlendirme
3. **GSC izleme:** Geçiş sonrası Top Stories ve organik trafik takibi
4. **Kademeli geçiş:** Tüm siteyi aynı anda değiştirmek yerine bölüm bölüm geçin

## Sık Sorulan Sorular

### AMP sıralamayı etkiler mi?

Artık doğrudan etkilemiyor. 2021 öncesinde Top Stories için avantaj vardı, bu kaldırıldı. Core Web Vitals puanları belirleyici.

### Habercilik dışı siteler için AMP değerli mi?

Çok az senaryoda. E-ticaret ve kurumsal siteler için standart modern web teknolojileri çok daha iyi.

### AMP kaldırmak trafik kaybettirir mi?

Dikkatli geçişle hayır. Core Web Vitals hazırlığı yapılmışsa trafik korunur.

## Kaynakça

- Google Search Central: AMP — developers.google.com/search/docs/appearance/google-news
- AMP Project — amp.dev
- Google: Page Experience Update — developers.google.com/search/docs/appearance/page-experience
- Search Engine Land: AMP News — searchengineland.com
