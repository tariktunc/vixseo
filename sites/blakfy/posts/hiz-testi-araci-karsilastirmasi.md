---
title: "Hız Testi Araçları Karşılaştırması: PageSpeed, GTmetrix ve WebPageTest"
slug: "hiz-testi-araci-karsilastirmasi"
focusKeyword: "hız testi aracı"
seoTitle: "Hız Testi Araçları Karşılaştırması: PageSpeed vs GTmetrix | Blakfy"
metaDesc: "PageSpeed Insights, GTmetrix ve WebPageTest arasındaki farklar neler? Hangi hız testi aracı ne zaman kullanılır? 2025 karşılaştırma rehberi."
excerpt: "Site hızını ölçmek için doğru aracı seçmek, optimizasyon çalışmasının başlangıç noktasını belirler. Üç temel hız testi aracını karşılaştırıyoruz."
categories: ["teknik-seo"]
tags: ["teknik-seo", "site-hizi", "core-web-vitals"]
imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop"
imageAlt: "Hız testi araçları karşılaştırması ekran"
language: "tr"
status: "ready"
---

## Hız Testi Araçları Neden Bu Kadar Önemli?

Site hızı, yalnızca kullanıcı deneyimini değil, doğrudan SEO sıralamasını da etkileyen teknik bir faktördür. Google, 2021'den itibaren Core Web Vitals metriklerini resmi sıralama sinyali olarak kullanmaktadır ve bu metrikleri doğru biçimde ölçmeden hangi alanlarda iyileştirme yapmanız gerektiğini belirleyemezsiniz. Piyasada onlarca hız testi aracı bulunmakla birlikte, en yaygın ve en güvenilir üç araç — PageSpeed Insights, GTmetrix ve WebPageTest — birbirinden farklı metodolojiler kullandığı için aynı URL için farklı sonuçlar üretir.

Doğru hız testi aracı seçimi, optimizasyon önceliklerinizi doğrudan şekillendirir. Yanlış araçtan elde edilen verilerle yapılan çalışmalar gerçek sorunları atlayabilir ya da var olmayan sorunlara kaynak harcamanıza yol açabilir. Bu rehberde üç aracı teknik detaylarıyla inceleyerek hangi senaryoda hangisini kullanmanız gerektiğini net biçimde ortaya koyacağız.

---

## PageSpeed Insights Nedir ve Nasıl Kullanılır?

PageSpeed Insights, Google'ın kendi geliştirdiği ve doğrudan Chrome UX Report (CrUX) verilerini kullanan resmi bir hız testi aracıdır. Analiz sonuçları "Saha Verisi" (field data) ve "Lab Verisi" (lab data) olmak üzere iki katmanda sunulur; bu ayrım, aracın diğer alternatiflere göre en belirgin üstünlüğüdür.

Saha verisi, gerçek kullanıcıların Chrome tarayıcısından son 28 gün içinde o URL'e erişirken yaşadığı deneyimlerin topluluğu anlamına gelir. Lab verisi ise simüle edilmiş bir ortamda Lighthouse motoru aracılığıyla üretilir. Bir sitenin yeterli Chrome kullanıcısı trafiği yoksa saha verisi görüntülenmez; bu durumda yalnızca lab verisiyle çalışmak gerekir.

### PageSpeed Insights'ın Güçlü Yönleri

Google'ın sıralama algoritmasının doğrudan baktığı metrikler olan LCP (Largest Contentful Paint), INP (Interaction to Next Paint) ve CLS (Cumulative Layout Shift) bu araçta en doğru biçimde raporlanır. Aracın sunduğu puanlama sistemi (0-100 arası) basit görünse de arka planda Lighthouse'un ağırlıklı metrik hesaplamasına dayanır; yüksek bir puan mutlaka hızlı bir site anlamına gelmez, metrik bazında yorumlama yapmak daha sağlıklıdır.

"Fırsatlar" ve "Teşhisler" bölümleri, tespit edilen sorunları sayısal kazanım tahminleriyle birlikte listeler. Örneğin "Kullanılmayan JavaScript'i kaldırın" önerisi yanında "tahmini 1,4 saniyelik kazanım" gibi bir değer görürsünüz; bu tahminler her zaman gerçeği yansıtmasa da önceliklendirme için faydalı bir çerçeve sunar.

### PageSpeed Insights'ın Sınırlılıkları

Araç, yalnızca tek bir URL'i test eder ve sohbet bağlamı taşımaz. Sayfalar arası karşılaştırma yapmak, zaman içindeki değişimi izlemek ya da waterfall (şelale) diyagramı ile detaylı istek bazlı analiz yapmak PageSpeed Insights üzerinden mümkün değildir. Bunun yanı sıra araç, teste yönelik sunucu konumu ya da tarayıcı profilini seçmenize izin vermez; test her zaman Google'ın altyapısından gerçekleştirilir.

---

## GTmetrix Nedir ve Nasıl Kullanılır?

GTmetrix, Kanada merkezli GT.net tarafından geliştirilen ve 2022'den itibaren tamamen Lighthouse tabanlı metrikler üzerine geçmiş bir hız testi aracıdır. Ücretsiz hesapla Vancouver, Tokyo, Londra ve birkaç başka konumdan test yapılabilir; ücretli planlarda 35'in üzerinde test lokasyonu ve gelişmiş zamanlama özellikleri sunulur.

GTmetrix'in en belirgin avantajı, zaman içindeki değişimi izlemeye ve farklı versiyonları karşılaştırmaya olanak sağlamasıdır. Araç, belirli aralıklarla otomatik test çalıştırabilir; bu sayede deploy sonrası hız değişimlerini ya da üçüncü taraf script etkilerini zamanla takip edebilirsiniz.

### GTmetrix'in Waterfall Görünümü

GTmetrix'in en güçlü özelliği, HTTP isteklerini görsel bir zaman çizelgesi üzerinde sunan waterfall diyagramıdır. Her istek için DNS çözümleme, bağlantı kurma, ilk byte (TTFB), içerik indirme süresi gibi aşamalar ayrı ayrı gösterilir. Bu diyagram sayesinde hangi kaynağın yüklemeyi engellediğini (render-blocking), hangi üçüncü taraf scriptinin uzun yanıt süresi yarattığını gözle görülür biçimde tespit edebilirsiniz.

Örneğin bir e-ticaret sitesinde Facebook Pixel veya live chat widget'ının 400-600 ms gibi bir gecikmeye yol açtığını waterfall üzerinden net biçimde görmek, bu scriptleri asenkron yüklemeye ya da ertelemeye öncelik vermenizi sağlar. Bu tür bir görselleştirme, PageSpeed Insights'ın öneriler listesinden çok daha somut bir aksiyon noktası sunar.

### GTmetrix'in Video Kayıt Özelliği

Ücretli hesaplarda sayfanın yükleme sürecini milisaniye adımlarıyla kaydeden video özelliği bulunur. Bu kayıt, özellikle CLS (düzen kayması) sorunlarını görsel olarak belgelemenin ve geliştirici ekibiyle paylaşmanın en kolay yoludur; sayının ardındaki davranışı görmek, düzeltmenin neden gerektiğini çok daha kolay anlatır.

---

## WebPageTest Nedir ve Nasıl Kullanılır?

WebPageTest, Catchpoint tarafından desteklenen açık kaynaklı bir hız testi aracıdır ve üç araç arasında en geniş konfigürasyon seçeneklerini sunar. 40'ın üzerinde test lokasyonu, onlarca gerçek tarayıcı ve cihaz kombinasyonu, özel bağlantı hızı profilleri ve scripting desteği sayesinde WebPageTest gerçek dünya senaryolarını en yakın biçimde simüle etme kapasitesine sahiptir.

WebPageTest, varsayılan olarak her URL'i iki kez test eder: ilk görüntüleme (first view) ve tekrar görüntüleme (repeat view). İlk görüntülemede önbellek boştur, tekrar görüntülemede tarayıcı önbelleğinden yararlanan kaynaklar gösterilir; bu karşılaştırma, önbellekleme stratejinizin ne kadar etkili olduğunu ölçmek için birebirdir.

### WebPageTest'in Öne Çıkan Özellikleri

WebPageTest, scriptleme özelliği sayesinde giriş yapma, sepete ürün ekleme gibi kullanıcı akışlarını test edebilir; bu özellik diğer iki araçta bulunmaz. Ayrıca "Experiments" (Deneyler) bölümü ile belirli kaynakları engellediğinizde ya da belirli HTTP yanıt başlıklarını değiştirdiğinizde hızın nasıl değişeceğini tahmin edebilirsiniz. Bu, "Eğer Google Fonts'u kaldırsam ne kadar kazanırım?" gibi hipotezleri test etmenin pratik yoludur.

Araçtaki "Opportunities & Experiments" paneli, önerilen optimizasyonları otomatik olarak simüle ederek tahmini kazanımları gösterir. Bu özellik, geliştirme kaynağı kısıtlı ekiplerin en yüksek etkili aksiyonlara odaklanmasını kolaylaştırır.

---

## Hangi Hız Testi Aracı Ne Zaman Kullanılır?

Üç araç arasında doğru seçim, ne tür bir soruya cevap aradığınıza bağlıdır. Her birinin güçlü olduğu senaryolar birbirinden farklıdır ve pratikte bu üç aracı birbirini tamamlayıcı biçimde kullanmak en verimli yaklaşımdır.

### Araç Karşılaştırma Tablosu

Aşağıdaki karşılaştırma, üç aracın temel boyutlarda nasıl konumlandığını göstermektedir:

**PageSpeed Insights:** Google'ın resmi aracı. CrUX saha verisi içerir. Sıralama sinyalleriyle doğrudan ilişkilidir. Konfigürasyon seçeneği sınırlıdır. Ücretsiz, API erişimi mevcuttur.

**GTmetrix:** Lighthouse tabanlı. Waterfall diyagramı ve zaman serisi takibi konusunda güçlüdür. Farklı lokasyonlarda test yapılabilir. Ücretsiz plan kısıtlıdır, ücretli planla çok daha işlevsel hale gelir.

**WebPageTest:** Açık kaynak, geniş konfigürasyon. Scripting ve deney simülasyonu destekler. Teknik ekipler için en kapsamlı araç. Öğrenme eğrisi diğerlerine göre daha diktir.

**Hangi senaryoda hangi araç:** Google'a kendi sitenizin gerçek kullanıcı deneyimini raporlamak istiyorsanız PageSpeed Insights kullanın. Üçüncü taraf scriptlerin etkisini ve waterfall üzerinden yükleme sırasını analiz etmek istiyorsanız GTmetrix tercih edin. Farklı coğrafi konumlardan, farklı ağ koşullarında test yapmak ya da karmaşık kullanıcı akışlarını test etmek istiyorsanız WebPageTest en doğru tercihtir.

---

## Hız Testi Sonuçlarını Doğru Yorumlama

Birçok site sahibi, hız testi aracından aldığı tek bir puanı mutlak doğru olarak yorumlar; bu yaklaşım yanıltıcı sonuçlara yol açar. Her hız testi aracı, aynı URL için farklı puanlar üretir çünkü test altyapıları, tarayıcı profilleri, bant genişliği simülasyonları ve ağırlıklandırma formülleri birbirinden farklıdır.

Puan yerine metrik bazında yorumlama yapmak çok daha güvenilir bir yöntemdir. LCP için iyi eşik 2,5 saniyenin altıdır; INP için 200 milisaniyenin altı iyi olarak sınıflandırılır; CLS için 0,1'in altı hedeflenir. Bu eşikler Google tarafından resmi olarak yayımlanmıştır ve PageSpeed Insights'ın raporladığı saha verisi doğrudan bu eşiklere göre "İyi / İyileştirme Gerekli / Zayıf" olarak sınıflandırılır.

### Mobil ve Masaüstü Farkına Dikkat Edin

PageSpeed Insights ve GTmetrix hem mobil hem masaüstü test yapabilir. Mobil test sonuçları genellikle masaüstünden belirgin biçimde düşüktür çünkü simüle edilen 4G bağlantısı ve daha yavaş CPU profili gerçek mobil kullanıcı koşullarını taklit etmeye çalışır. Google'ın sıralama sinyali olarak kullandığı CrUX verisi ise gerçek mobil cihazlardan toplanır; dolayısıyla mobil saha verisi en öncelikli odak noktanız olmalıdır.

---

## Optimizasyon Öncelikleri: Test Sonuçlarından Aksiyona

Hız testi aracından elde ettiğiniz verileri somut aksiyon listesine dönüştürmek için önceliklendirme gereklidir. Her uyarı aynı etkiye sahip değildir; kaynağa göre farklı çözüm yolları bulunur.

### Render-Blocking Kaynaklar

Render-blocking JavaScript ve CSS, sayfanın görsel olarak işlenmeye başlamasını geciktiren en yaygın sorun kaynaklarındandır. GTmetrix waterfall diyagramında kırmızı blok olarak gösterilen bu kaynaklar için `defer` veya `async` öznitelikleri eklenmeli, kritik olmayan CSS ise `<link rel="preload">` ile ayrıştırılmalıdır.

### Büyük Ağ Yükleri

Sayfa ağırlığı yüksekse — özellikle optimize edilmemiş görseller, kullanılmayan JavaScript kütüphaneleri ya da büyük font dosyaları nedeniyle — ilk önce görsel optimizasyonu ele almak genellikle en yüksek kazanımı sağlar. WebP veya AVIF formatına geçiş, tek başına sayfa ağırlığını yüzde 30-50 oranında düşürebilir.

### Sunucu Yanıt Süresi (TTFB)

Time to First Byte (TTFB) 800 milisaniyenin üzerindeyse sorun büyük olasılıkla CDN eksikliği, yavaş hosting, veritabanı sorgu performansı ya da önbelleksiz dinamik sayfa üretiminden kaynaklanır. Blakfy olarak, TTFB sorunlarının çözümünde altyapı katmanından başlamayı ve sırayla hosting, CDN, uygulama katmanı önbelleği adımlarını değerlendirmeyi öneriyoruz.

### Üçüncü Taraf Etkisi

Google Analytics, Meta Pixel, canlı sohbet widget'ları ve diğer üçüncü taraf scriptler toplam yükleme süresinin yüzde 20-40'ına yol açabilir. Bu scriptleri asenkron yüklemek ya da kullanıcı etkileşimi gerçekleşene kadar ertelemek (facade pattern), kullanıcı tarafından algılanan hızı iyileştirmenin en etkili yollarından biridir.

---

## Düzenli Hız Testi ve İzleme

Tek seferlik bir hız testi, sitenizin performans durumunun anlık fotoğrafıdır. Ancak gerçek değer, performansı zaman içinde izlemekten gelir. Bir güncelleme, yeni bir plugin, üçüncü taraf bir servis değişikliği ya da görsel içerik artışı aniden performansı düşürebilir.

GTmetrix'in zamanlanmış test özelliği ve Google Search Console'un Core Web Vitals raporu, bu sürekli izleme ihtiyacını karşılar. Search Console raporunda URL gruplaması yapılır; bu sayede belirli sayfa türlerinin (kategori, ürün, blog) diğerlerine göre nasıl performans gösterdiğini karşılaştırabilirsiniz.

Blakfy olarak yönettiğimiz sitelerde teknik SEO sürecinin başında her üç aracın verilerini de karşılaştırmayı standart bir adım olarak uyguluyoruz; bu, özellikle PageSpeed Insights'ta görünmeyen ancak GTmetrix waterfall'unda net biçimde ortaya çıkan sunucu taraflı gecikmeleri yakalamak için önemlidir.

---

## Sık Sorulan Sorular

**PageSpeed Insights puanı kaç olmalı?**
Google'ın resmi eşiği yoktur; ancak sektör genelinde 90+ puan "iyi" olarak kabul görür. Puan yerine LCP, INP ve CLS metriklerinin "İyi" aralığında olmasına odaklanmak daha doğru bir yaklaşımdır. Yüksek puan ama kötü saha verisi, SEO açısından iyi bir sinyal değildir.

**Farklı araçlar neden farklı puanlar veriyor?**
Her hız testi aracı farklı test altyapısı, tarayıcı versiyonu, ağ simülasyonu ve metrik ağırlıklandırması kullanır. PageSpeed Insights Lighthouse'un belirli bir versiyonunu kullanırken GTmetrix farklı bir konfigürasyonla çalışır. Bu nedenle puanları araçlar arasında karşılaştırmak yanıltıcıdır; aynı araçla zaman içindeki değişime bakmak daha anlamlıdır.

**WebPageTest ücretsiz mi?**
WebPageTest'in temel test işlevselliği tamamen ücretsizdir. Ancak bazı gelişmiş özellikler (daha fazla test lokasyonu, API erişimi, deney simülasyonu) ücretli planlara dahildir.

**Hız testini ne sıklıkla yapmalıyım?**
Büyük içerik güncellemeleri, yeni plugin/script eklemeleri veya hosting değişikliklerinin ardından mutlaka test yapılmalıdır. Bunun dışında aylık düzenli izleme yeterlidir; yüksek trafikli e-ticaret siteleri için haftalık izleme önerilir.

---

## Kaynakça

- Google Developers. (2024). *PageSpeed Insights documentation*. https://developers.google.com/speed/docs/insights/v5/about
- Google Developers. (2024). *Core Web Vitals*. https://web.dev/vitals/
- GTmetrix. (2024). *GTmetrix documentation*. https://gtmetrix.com/blog/
- Catchpoint. (2024). *WebPageTest documentation*. https://docs.webpagetest.org/
- Chromium Project. (2024). *Chrome UX Report*. https://developer.chrome.com/docs/crux/
