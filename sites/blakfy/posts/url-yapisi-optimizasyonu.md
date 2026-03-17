wixId: "2d668928-502c-4058-9744-0d8626bb02b1"
---
title: "URL Yapısı Optimizasyonu: SEO için En İyi Format"
slug: "url-yapisi-optimizasyonu"
focusKeyword: "url yapısı optimizasyonu"
seoTitle: "URL Yapısı Optimizasyonu: SEO için En İyi Format 2025 | Blakfy"
metaDesc: "SEO için ideal URL yapısı nasıl olmalı? URL uzunluğu, özel karakter, parametreler, slug optimizasyonu ve URL değiştirme rehberi."
excerpt: "URL yapısı hem arama motoru hem kullanıcı için bir işaret levhasıdır. Temiz, anlamlı ve hiyerarşik URL'ler SEO'yu destekler, kötü URL'ler de zarara yol açar."
categories: ["teknik-seo"]
tags: ["seo", "google-search-console"]
imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop"
imageAlt: "URL yapısı optimizasyon SEO teknik rehber"
language: "tr"
status: "published"
---
URL yapısı optimizasyonu, teknik SEO'nun en temel ama en çok göz ardı edilen adımlarından biri. Bir sayfanın URL'si hem Google'ın hem de kullanıcının o sayfanın ne hakkında olduğunu anlamasına yardımcı olur. Blakfy olarak incelediğimiz Türk sitelerinin büyük çoğunluğunda hatalı URL yapısıyla karşılaşıyoruz: tarih içeren slug'lar, Türkçe özel karakterler, anlamsız parametre zincirleri. Bu rehberde, doğru url yapısı optimizasyonunu adım adım ele alıyoruz.

URL (Uniform Resource Locator), bir web sayfasının benzersiz adresidir. SEO açısından URL yapısı doğrudan bir sıralama faktörü olmasa da dolaylı etkisi büyük: anlaşılır URL'ler daha fazla tıklanır, backlink alır ve Google'ın içeriği kategorize etmesine yardımcı olur. Kötü yapılandırılmış URL'ler ise tarama bütçesi israfına ve duplicate content sorunlarına zemin hazırlar.

## İyi URL'nin Özellikleri

URL yapısı optimizasyonunun başlangıç noktası, iyi bir URL'nin nasıl göründüğünü anlamaktır. Google'ın yayımladığı web yöneticisi rehberlerinde ve SEO uzmanlarının onlarca yıllık deneyiminde birleşen altı temel özellik var.

### 1. Okunabilir ve Anlamlı

İyi bir URL, ziyaretçi tıklamadan önce bile sayfanın içeriğini tahmin edebilmesini sağlar. Bu hem tıklama oranını artırır hem Google'ın içerik sınıflandırmasını kolaylaştırır.

**Kötü URL:**
```
siteniz.com/p=234
siteniz.com/product/sku-23487423
siteniz.com/category/c1/sub/s3/item/123
```

**İyi URL:**
```
siteniz.com/seo-rehberi/
siteniz.com/erkek-giyim/gomlek/slim-fit-beyaz/
siteniz.com/blog/seo-nedir/
```

Kullanıcı URL'ye bakarak sayfanın ne hakkında olduğunu anlayabilmeli. Özellikle sosyal medyada paylaşılan URL'lerde bu okunabilirlik tıklama oranını doğrudan etkiler.

### 2. Kısa ve Odaklı

URL uzadıkça tıklama eğilimi düşer, backlink alınması zorlaşır ve Google'ın URL'yi tam olarak göstermesi güçleşir. Gereksiz kelimeler, tarih bilgisi ve ID numaraları URL'yi şişirir.

- Kötü: `/blog/2023/01/15/dijital-pazarlamanin-onemi-ve-faydalar/`
- İyi: `/blog/dijital-pazarlama-rehberi/`

Bir URL'de her kelime, o sayfanın içeriğine dair bir sinyal gönderir. Anlam taşımayan kelimeler bu sinyali zayıflatır. Url yapısı optimizasyonu yapılırken slug'dan doldurma sözcükleri çıkarmak ilk adımlardan biri olmalı.

### 3. Anahtar Kelime İçeren (Ama Zorlama Değil)

URL'de hedef anahtar kelimenin yer alması hafif ama gerçek bir SEO sinyalidir. Google, URL'deki kelimeleri sayfanın konusunu anlamak için kullanır. Ancak bu, keyword doldurmaya izin vermez.

- `/seo-nedir/` → "SEO nedir" aramaları için anlamlı uyum
- `/dijital-pazarlama-ajans-istanbul/` → yerel SEO için doğal uyum

Kelime doldurmaktan kesinlikle kaçının: `/en-iyi-seo-seo-optimizasyon-seo-arac/` gibi URL'ler Google tarafından spam sinyali olarak okunabilir ve sıralamayı olumsuz etkiler.

### 4. Tire (-) ile Ayrılmış

Google, tire (-) ile birleştirilmiş kelimeleri ayrı kelimeler olarak okur ve yorumlar. Alt çizgi (_) teknik olarak desteklense de Google'ın kendi rehberleri tire kullanımını açıkça önerir.

- Doğru: `/seo-rehberi/`
- Yanlış: `/seo_rehberi/`
- Yanlış: `/seorehberi/`

Bu fark küçük görünebilir ama "seorehberi" gibi bir slug'da Google "seo" ve "rehberi" kelimelerini ayrı ayrı değerlendiremez, tek bir anlamsız string olarak görür.

### 5. Küçük Harf

URL'ler büyük/küçük harf duyarlıdır (case-sensitive). Sunucu yapılandırmasına göre `/SEO-Rehberi/` ve `/seo-rehberi/` iki farklı sayfa olarak değerlendirilebilir ve duplicate content sorununa yol açar.

Tüm URL'leri küçük harfle oluşturun. Büyük harf içeren eski URL'leriniz varsa, 301 yönlendirmesiyle küçük harf versiyonuna yönlendirin.

### 6. Türkçe Özel Karakter Yok

URL'de ğ, ü, ş, ı, ö, ç kullanmamalısınız. Bu karakterler URL encoding ile `%C3%BC` gibi dizilere dönüşür ve hem çirkin görünür hem de paylaşım sırasında bozulabilir.

- Yanlış: `/türkçe-içerik/`
- Doğru: `/turkce-icerik/`

Modern tarayıcılar encode edilmiş Türkçe karakterleri okuyabilse de backlink, e-posta ve mesajlaşma uygulamalarında bu karakterler sorun yaratır. Url yapısı optimizasyonu için Türkçe karakterlerden tamamen kaçınmak en güvenli yaklaşım.

## URL Yapısı Türleri

URL yapısı tercih ederken sitenizin boyutu, içerik hiyerarşisi ve büyüme planı belirleyicidir. Üç temel model var.

### Düz Yapı (Flat URL)

Tüm sayfalar doğrudan ana domain'den erişilebilir. Sade ve kolay taranabilir.

```
siteniz.com/seo-rehberi/
siteniz.com/dijital-pazarlama/
siteniz.com/e-ticaret-kurulumu/
```

Blog ve küçük siteler için uygundur. İçerik sayısı arttıkça sayfalar arasındaki hiyerarşik ilişki kaybolmaya başlar, bu da iç bağlantı stratejisini zorlaştırır.

### Hiyerarşik Yapı (Hierarchical URL)

Kategoriler ve alt kategoriler URL yapısına yansıtılır. Googlebot'un site hiyerarşisini anlamasını kolaylaştırır.

```
siteniz.com/blog/seo/
siteniz.com/blog/seo/teknik-seo/
siteniz.com/magaza/giyim/gomlek/
```

Büyük siteler, e-ticaret ve içerik hiyerarşisi olan siteler için doğru seçimdir. Url yapısı optimizasyonu kapsamında hiyerarşik yapı, silo mimarisiyle birleştiğinde en güçlü SEO altyapısını oluşturur.

### Karma Yapı

Farklı içerik türleri için farklı yapı kuralları belirlenir. En yaygın kullanılan modeldir.

- Blog: `/blog/slug/`
- Ürünler: `/magaza/kategori/slug/`
- Sayfalar: `/hakkimizda/`

Karma yapıda önemli olan tutarlılık: hangi içerik türü için hangi format kullandığınızı belirleyip buna sadık kalmak.

## Parametreli URL'ler

Parametreli URL'ler, url yapısı optimizasyonunun en karmaşık bölümünü oluşturur. E-ticaret sitelerinde filtreleme, sıralama ve arama parametreleri yüzlerce tekrarlayan URL ortaya çıkarır.

**Örnek:**
```
siteniz.com/urunler/?renk=siyah&beden=42&siralama=fiyat-artan
```

Bu URL, üç parametre içeriyor: renk, beden, sıralama. Kombinasyonların sayısı onlarca hatta yüzlerceyse, her biri Googlebot için ayrı bir URL anlamına gelir.

**Sorunlar:**

- Onlarca parametre kombinasyonu = onlarca unique URL
- Her kombinasyon benzer içerik → duplicate content
- Tarama bütçesi israfı
- Link equity dağılımı bozulur

**Çözümler:**

**Canonical tag:** Parametre URL'lerinden ana ürün listesi URL'sine canonical ekleyin:
```html
<link rel="canonical" href="https://siteniz.com/urunler/">
```

**Robots.txt:** Tamamen tarama dışı bırakmak için:
```
Disallow: /*?*
```
Bu yaklaşımı dikkatli kullanın. Gerekli parametre URL'lerini de kapsamasın.

**JavaScript yönlendirme:** Kritik filtreleme URL'leri için history.pushState ile temiz URL oluşturmak mümkün. Özellikle büyük e-ticaret sitelerinde geliştiricilerle birlikte değerlendirin.

## URL Değiştirme ve 301 Yönlendirme

Mevcut URL'leri değiştirmeniz gerektiğinde en büyük risk backlink değeri ve sıralama kaybıdır. Doğru yapılandırılmış 301 yönlendirmesi bu riski büyük ölçüde ortadan kaldırır.

**Her zaman 301 yönlendirmesi ekleyin:**
```
301: /eski-url/ → /yeni-url/
```

301 yönlendirmesi, backlink değerinin %90-99'unu yeni URL'ye aktarır. Geçici değişiklikler için 302, kalıcı taşımalar için 301 kullanın.

**Yönlendirme zincirinden kaçının:**

- Kötü: `/eski/ → /orta/ → /yeni/`
- İyi: `/eski/ → /yeni/`

Her ek yönlendirme, aktarılan link değerini düşürür ve sayfa yükleme süresini artırır. Url yapısı optimizasyonu sırasında yönlendirme zincirlerini düzleştirmek küçük ama değerli bir kazanım sağlar.

**Toplu URL değiştirme araçları:**

- WordPress: Redirection eklentisi
- Apache: .htaccess kuralları
- Nginx: server bloğu yönlendirmeleri
- Shopify: Yönlendirme yöneticisi paneli

## Platform Bazlı URL Optimizasyonu

Her platform, url yapısı optimizasyonu için farklı esneklik sunar. Platformunuza göre uygulama adımları değişir.

### WordPress

Ayarlar → Kalıcı bağlantılar → "Yazı adı" seçeneği en temiz URL yapısını verir:

```
siteniz.com/yazi-adi/
```

Bu ayarı yeni kurulumda yapın. Sonradan değişiklik tüm URL'leri etkiler ve kapsamlı 301 yönlendirme planı gerektirir. WordPress, Türkçe yazı başlığını otomatik slug'a dönüştürürken Türkçe karakter bırakabilir. Her yazıda slug'u manuel olarak latinize edin.

### Shopify

Shopify'da URL yapısı büyük ölçüde sabittir ve değiştirilemez:

- Ürünler: `/products/urun-slug`
- Koleksiyonlar: `/collections/koleksiyon-slug`
- Blog yazıları: `/blogs/haberler/yazi-slug`

Bu kısıtlama, Shopify'ın url yapısı optimizasyonu açısından en büyük zayıflığıdır. Slug kısmını optimize edebilirsiniz ancak prefix'leri değiştiremezsiniz.

### Wix

Wix'te sayfa URL'leri Ayarlar → SEO → URL Slug üzerinden düzenlenebilir. Varsayılan olarak sayfa başlığından oluşturulan slug'ları her sayfa için manuel inceleyin. Türkçe karakter ve gereksiz uzunluğa dikkat edin.

### WooCommerce

Kalıcı bağlantı yapısı WordPress ile aynıdır. Ürün kategorileri için önerilen format: `siteniz.com/urun-kategorisi/gomlek/slim-fit/`. Kategori ve ürün slug'larını Türkçe karakter ve gereksiz kelimelerden arındırın.

## URL Uzunluğu

Google'ın resmi olarak belirttiği bir URL uzunluk sınırı yoktur. Ancak pratik deneyim ve araştırmalar bazı eşikleri ortaya koyuyor.

- 60-100 karakter: ideal, SERP'te tam gösterim
- 100-200 karakter: kabul edilebilir, bazen kısaltılarak gösterilir
- 200+ karakter: sorunlu; paylaşım, görünüm ve tarama açısından riskli

Url yapısı optimizasyonunun temel mantığı burada da geçerli: her karakter anlam taşımalı, doldurma sözcükler URL'ye girmesin.

## Sık Sorulan Sorular

### URL'de tarih kullanmalı mıyım?

Haber sitelerinde tarih URL anlamlı olabilir. Blog içerikleri için tarih, URL'yi zamanlanmış kılar ve içerik güncellemesini zorlaştırır. "2023 tarihli rehber" görüntüsü CTR'ı da düşürür. Blakfy olarak blog URL'lerinde tarih kullanmıyoruz.

### Alt alan adı mı alt klasör mü daha iyi?

`blog.siteniz.com` vs `siteniz.com/blog/` sorusunun cevabı SEO açısından nettir: alt klasör daha iyidir. Blog içerikleri ana sitenin domain otoritesine katkı sağlar. Alt alan adı ayrı bir site gibi değerlendirilir.

### URL'yi değiştirirsem sıralamamı kaybeder miyim?

Doğru 301 yönlendirmesiyle değil. Kısa vadede geçici bir düşüş olabilir ama birkaç haftada toparlanır. Yönlendirme olmadan yapılan URL değişikliği ise sıralamayı doğrudan etkiler.

### Slug'da stop words (bağlaçlar) kullanmalı mıyım?

"ve", "ile", "için" gibi bağlaçları slug'dan çıkarmak genellikle önerilir. Ancak anlam bozuluyorsa bırakmak daha doğru. Url yapısı optimizasyonunda anlam her zaman teknik kuralın önüne geçer.

## Kaynakça

- Google: URL Structure — developers.google.com/search/docs/crawling-indexing/url-structure
- Moz: URL Best Practices — moz.com/learn/seo/url
- Ahrefs: URL Structure for SEO — ahrefs.com/blog
- Backlinko: URL Optimization — backlinko.com
