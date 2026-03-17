wixId: "5ce2349b-b57b-4ea2-9321-50ffeb85bea0"
---
title: "Anahtar Kelime Yamyamlığı Nedir? Tespit ve Çözüm Rehberi"
slug: "anahtar-kelime-yamyamligi"
focusKeyword: "anahtar kelime yamyamlığı"
seoTitle: "Anahtar Kelime Yamyamlığı Nedir? Tespit ve Çözüm Rehberi | Blakfy"
metaDesc: "Anahtar kelime yamyamlığı nedir, neden sıralamayı düşürür? GSC ve araçlarla tespit, canonical tag vs 301 redirect karar ağacı, içerik birleştirme ve önleme stratejisi."
excerpt: "Web sitelerinin %37'sinde aktif anahtar kelime yamyamlığı sorunu var. Aynı kelimeyi hedefleyen iki sayfan varsa Google hangisini göstereceğini bilemez — ikisi de kaybeder."
categories: ["teknik-seo"]
tags: ["seo", "backlink"]
imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop"
imageAlt: "Anahtar kelime yamyamlığı SEO sorun tespit analiz"
language: "tr"
status: "published"
---
Web sitelerinin %37'sinde aktif anahtar kelime yamyamlığı sorunu var. Google'ın birinci sırası tıklamaların %27,6'sını alırken üçüncü sıra yalnızca %11'ini alıyor — aradaki fark %60'tan fazla. Yamyamlık, güçlü bir tekil sıralama yerine iki zayıf sıralamaya yol açıyor ve her ikisi de bu kayıptan nasibini alıyor. Düzeltilmesi gereken bir sorun olmaktan çok, önce tanınması gereken bir sorun — çünkü çoğu site bunun farkında değil.

## Anahtar Kelime Yamyamlığı Nedir?

Aynı web sitesindeki iki veya daha fazla sayfanın aynı anahtar kelimeyi ya da aynı arama niyetine hizmet eden çok yakın kelime varyasyonlarını hedeflemesidir. Google bu sayfaların birbirini desteklediğini değil, rekabet ettiğini algılar.

**Kritik ayrım:** Aynı kelimeyi kullanmak tek başına yamyamlık değil. İki sayfanın **aynı arama niyetine** hitap etmesi gerekiyor. "SEO nedir" (bilgilendirici) ve "SEO hizmeti al" (ticari) sayfaları aynı kök kelimeyi içerse de farklı niyetlere hizmet ettiğinden rekabet etmiyor. Gerçek yamyamlık iki bilgilendirici sayfa ya da iki ticari sayfanın aynı sorguyu hedeflemesidir.

## Neden Sıralamayı Düşürür?

| Etki | Açıklama |
|---|---|
| **Otorite Dağılması** | Backlinkler ve sayfa otoritesi tek güçlü sayfada toplanmak yerine ikiye bölünüyor |
| **Sıralama Karmaşası** | Google hangi sayfayı göstereceğine karar veremiyor; farklı sayfalar sıralamada yer değiştiriyor |
| **Düşük CTR** | Kullanıcılar aynı domainten iki sonuç görünce hangisini tıklayacağını bilemiyor |
| **Crawl Bütçesi İsrafı** | Büyük sitelerde Googlebot yarışan sayfaları taramak için kaynak harcıyor |
| **Yanlış Sayfa Sıralanıyor** | Hedeflenmeyen ya da daha zayıf sayfa, asıl hedef sayfanın önüne geçiyor |
| **Link Değeri Bölünmesi** | Dış backlinklerden gelen güç tek sayfada birikmek yerine ikisine dağılıyor |

**Pratik uyarı sinyalleri:** Aynı kelime için farklı sayfalar haftadan haftaya sıralama değiştiriyor. Yeni içerik yayınlamasına rağmen sıralamalar düşüyor. Trafikte bariz bir dış neden olmaksızın kayıp yaşanıyor.

## Yamyamlık Her Zaman Sorun Mudur?

Hayır. Şu durumlarda yamyamlık zararlı değil:

**1. Farklı arama niyeti:** Biri bilgilendirici biri ticari olan iki sayfa aynı kelimeyi içerse Google bunları farklı sorgulara hitap eden sayfalar olarak görüyor.

**2. İki sayfa aynı anda birinci sayfada:** İki sayfanın birden ilk 10'da yer alması avantaj. Sorun yalnızca her ikisi de üst sıraya çıkamadığında başlıyor.

**3. Markalı sorgular:** Marka adını içeren birden fazla sayfanın sıralanması normal.

**4. Doğru kurulmuş konu kümesi:** Ana sayfa (pillar) + alt içerik (cluster) yapısı, her alt içerik farklı bir alt konuyu hedeflediği sürece yamyamlık değil topikal otorite inşası.

**5. Long-tail farklılaşması:** "SEO nedir" ve "SEO araçları nelerdir" aynı kök kelimeyi paylaşıyor ama farklı sorulara yanıt verdiğinden sorun yok.

## Tespit Yöntemleri

### A. Google Arama Operatörü (Ücretsiz, Anında)

```
site:sitead.com "hedef anahtar kelime"
```

Birden fazla sayfa görünüyorsa yamyamlık sinyali var. Basit ve hızlı ilk kontrol.

### B. Google Search Console (En Güvenilir Ücretsiz Yöntem)

1. GSC → Performans → Arama Sonuçları
2. Filtre Ekle → Sorgu → Şüphelendiğin kelimeyi gir
3. **Sayfalar** sekmesine geç
4. Birden fazla URL görünüyorsa yamyamlık sinyali
5. Gösterim ve tıklamalar birden fazla URL'ye bölünmüş mü kontrol et

### C. Google Kümeleme Filtresini Kapat

Herhangi bir Google arama sonucu URL'sine `&filter=0` ekle. Bu Google'ın aynı domainden sayfaları gruplama davranışını devre dışı bırakır ve gerçekte kaç sayfanın aynı sorgu için yarıştığını gösterir.

### D. Anahtar Kelime Matrisi (Küçük Siteler için En Pratik)

Spreadsheet'e tüm URL'leri bir sütuna, her sayfanın birincil hedef kelimesini bir sonraki sütuna yaz. Herhangi bir kelime iki veya daha fazla satırda görünüyorsa yamyamlık adayı.

### E. SEO Araçlarıyla Otomatik Tespit

**SEMrush:** Position Tracking → Cannibalization sekmesi. Etkilenen kelimeler, rekabet eden sayfalar ve yamyamlık oranı raporlanıyor. Piyasadaki en kapsamlı otomatik rapor.

**Ahrefs:** Site Explorer → Organik Anahtar Kelimeler → "Yalnızca Çoklu URL" filtresi. Birden fazla sayfanın sıralandığı kelimeleri yüzey çıkarıyor.

**Screaming Frog (500 URL'ye kadar ücretsiz):** Tarama → H1 raporu → Export. Benzer başlıklar ve H1'ler örtüşen hedeflerin proxy göstergesi.

**Google Search Console entegrasyonlu araçlar (SEOTesting, SE Ranking):** Günlük otomatik kontrol ve .csv dışa aktarma.

## Karar Ağacı: Hangi Yöntemi Kullan?

```
Yamyamlık Tespit Edildi
         ↓
İçerik örtüşmesi büyük mü?
   ├── EVET → BİRLEŞTİR
   │     ├── Bir sayfa çok daha güçlü mü?
   │     │     └── EVET → Zayıf sayfayı 301 ile güçlüye yönlendir
   │     └── İki sayfa yakın güçte mi?
   │           └── EVET → İçerikleri birleştir + eski URL'den 301 yönlendir
   │
   └── HAYIR → FARKLILAŞTIR
         ├── Teknik kopyalama mı? (URL parametresi, oturum ID)
         │     └── EVET → Canonical Tag kullan
         └── Niyet ayrıştırılabilir mi?
               └── EVET → Sayfayı farklı long-tail kelimeye yönelt
                         + İç linkleri güncelle
```

## Çözüm Yöntemleri

### 1. 301 Yönlendirme

**Ne zaman kullan:** Zayıf sayfayı tamamen kaldırıyorsan ya da içerik birleştirmesinden sonra eski URL'yi emekliye alıyorsan.

Tüm SEO değeri (link sinyalleri, sıralama gücü) tek sayfada toplanıyor. Kalıcı ve temiz çözüm. Dezavantaj: eski URL artık erişilebilir değil.

### 2. Canonical Tag

**Ne zaman kullan:** İki URL içerik açısından çok benzer ama her ikisinin de canlı kalması gerekiyorsa — ürün renk varyantları, URL parametreleri, yazdırma sürümleri.

Tercih edilmeyen sayfanın `<head>` bölümüne şunu ekle:

```html
<link rel="canonical" href="https://sitead.com/tercih-edilen-sayfa/" />
```

**Önemli uyarı:** Canonical bir ipucu, emir değil. Google görmezden gelebilir. Her iki sayfa da aktif şekilde optimize edilmişse tek başına yamyamlığı çözmez.

### Canonical mı, 301 mi?

| Durum | Doğru Seçim |
|---|---|
| Benzer içerik, her iki URL de canlı kalmalı | Canonical Tag |
| Sayfa kalıcı olarak kaldırılıyor | 301 Yönlendirme |
| URL parametresi veya oturum ID farkı | Canonical Tag |
| İçerik birleştirme, eski URL siliniyor | 301 Yönlendirme |
| Başka sitelerde sendike edilmiş içerik | Canonical Tag |
| Kalıcı URL yapısı değişikliği | 301 Yönlendirme |

**Kural:** Her iki sayfa da gerekli ama içerik benzer → Canonical. Bir sayfa gereksiz → 301 Yönlendirme.

### 3. İçerik Birleştirme

**Ne zaman kullan:** Her iki sayfa da değerli içerik barındırıyor ama tek başlarına eksik kalıyor.

Adımlar:
1. Her iki sayfanın en güçlü içeriklerini tek kapsamlı sayfada birleştir
2. Güçlü URL'yi koru (veya yeni kanonik URL oluştur)
3. Emekliye alınan URL'den 301 yönlendir
4. Emekliye alınan sayfaya işaret eden tüm iç linkleri güncelle

Avantaj: Daha otoriter, daha kapsamlı tek sayfa oluşturuyor. Her iki sayfanın sıralama gücü birleşiyor. 301 ile eski sayfanın backlink değeri de taşınıyor.

### 4. Sayfa De-optimizasyonu (Anahtar Kelime Yeniden Haritalama)

**Ne zaman kullan:** Sayfayı silmek ya da yönlendirmek istemiyorsun ama rekabeti kırmak gerekiyor.

Nasıl yapılır: Rakip sayfanın title tag, H1 ve meta description'ından yarışan kelimeyi kaldır. İç link anchor metinlerini değiştir. Sayfayı farklı bir long-tail kelimeye yönelt.

Örnek: "en iyi koşu ayakkabıları" kelimesini hedefleyen iki sayfan varsa ikincisini "yeni başlayanlar için koşu ayakkabısı seçimi" kelimesine yönelt.

### 5. Noindex Etiketi

**Ne zaman kullan:** Sayfa sitede var olmalı ama arama sonuçlarında görünmemeli — filtre sayfaları, etiket arşivleri, sayfalama sayfaları.

```html
<meta name="robots" content="noindex, follow">
```

**Son çare olarak kullan.** Sayfa birikmiş sıralama otoritesini kaybeder.

## Araçlar Karşılaştırması

| Araç | Ücret | Temel Özellik |
|---|---|---|
| Google Search Console | Ücretsiz | Sorgu bazlı sayfa performansı; en güvenilir ücretsiz kaynak |
| Google Arama Operatörü | Ücretsiz | `site:` komutuyla manuel tespit |
| Screaming Frog | Ücretsiz (500 URL) / Ücretli | H1 ve title duplikasyon tespiti |
| SEMrush | Ücretli | Dedike Cannibalization sekmesi; en kapsamlı |
| Ahrefs | Ücretli | "Çoklu URL" filtresi; tarihsel sıralama grafikleri |
| SE Ranking | Ücretli (14 gün deneme) | Günlük otomatik izleme; CSV dışa aktarma |
| SEOTesting | Ücretli (14 gün deneme) | GSC bağlantılı otomatik rapor; düzeltme testi |
| seo.ai/tools/keyword-cannibalization | Ücretsiz | Giriş gerektirmiyor; hızlı kontrol |

## Önleme Stratejisi

Tespit ve düzeltmek yerine en baştan oluşmasını engellemek çok daha verimli.

**1. İçerik üretmeden önce anahtar kelime haritalama:** Her sayfaya tek benzersiz birincil kelime ata. Hiçbir kelime haritalarda iki satırda görünmemeli.

**2. İçerik takvimi + SEO koordinasyonu:** Her yeni sayfa önerisi önce mevcut anahtar kelime haritasıyla kontrol edilmeli.

**3. Düzenli denetim:** Büyük siteler için aylık, küçük siteler için üç aylık GSC kontrolü.

**4. İç link disiplini:** Aynı anahtar kelime anchor metni birden fazla farklı sayfaya bağlantı vermesin. Her konu için tek güçlü sayfaya yönlendir.

**5. Konu kümesi mimarisi:** Pillar sayfa + cluster makaleler. Her cluster gerçekten farklı bir alt konuyu hedeflemeli ve kendi niyetine sahip olmalı.

## Sık Sorulan Sorular

### Yamyamlık gerçekten sıralamayı düşürür mü?

Evet, doğrudan etkisi var. Link değeri ve sayfa otoritesi bölündüğünde hiçbir sayfa tam güçle sıralamaya giremiyor. SEMrush verisi: web sitelerinin %37'sinde aktif yamyamlık mevcut.

### Canonical tag yeterli mi, yoksa 301 redirect mi yapmalıyım?

İki URL de canlı kalmalıysa canonical. Biri gereksizse 301. Canonical Google için sadece bir ipucu — her ikisi de aktif optimize edilmişse etkisi sınırlı kalır.

### İçerikleri birleştirirsem eski sayfanın backlinkleri kaybolur mu?

Hayır. 301 yönlendirme link değerini taşır. Eski sayfaya yapılan backlinkler 301 aracılığıyla yeni sayfaya aktarılır.

### Noindex mi, 301 mi kullanmalıyım?

Sayfa değerli backlink almışsa 301. Sayfa sitede var olmalı ama sıralama için kullanılmamalıysa noindex.

### Düzeltme sonrası kaç günde iyileşme görürüm?

Çoğunlukla 2–8 hafta. Google'ın sayfayı yeniden taraması ve sıralamayı güncellemesi bu kadar sürebiliyor.

### Duplicate content mi, keyword cannibalization mi — fark nedir?

Duplicate content: aynı metin farklı sayfalar arasında kopyalanmış. Keyword cannibalization: iki farklı sayfa aynı kelime için rekabet ediyor — metinler farklı olabilir ama her ikisi de aynı sorguya hitap ediyor.

## Kaynakça

- Ahrefs: Keyword Cannibalization: What It (Really) Is & How to Fix It — ahrefs.com
- Surfer SEO: What Is Keyword Cannibalization? How to Find, Fix & Prevent It — surferseo.com
- Search Engine Land: Fix Keyword Cannibalization: Identify & Resolve SEO Issues — searchengineland.com
- Sempeak: Anahtar Kelime Yamyamlığı Nedir? Nasıl Çözülür? — sempeak.com
- Orbita: Anahtar Kelime Yamyamlığı Nedir? Nasıl Düzeltilir? — orbita.com.tr
- SEMrush: Position Tracking Cannibalization Report — semrush.com
