wixId: "84034b7e-137c-4892-ab15-b12c9e2138e2"
---
title: "Google Tag Manager Rehberi 2025: Etiketleri Kodsuz Yönetin"
slug: "google-tag-manager-rehberi"
focusKeyword: "google tag manager rehberi"
seoTitle: "Google Tag Manager Rehberi 2025: Etiket Yönetimi ve SEO | Blakfy"
metaDesc: "Google Tag Manager nedir, nasıl kurulur? GA4 entegrasyonu, tetikleyiciler, değişkenler ve özel olay takibi için adım adım başlangıç rehberi."
excerpt: "Google Tag Manager, web sitenize eklemeniz gereken tüm etiketleri (GA4, Facebook Pixel, dönüşüm kodları) tek panelden kod yazmadan yönetmenizi sağlar."
categories: ["google-araclari"]
tags: ["seo", "google-tag-manager", "google-analytics"]
imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop"
imageAlt: "Google Tag Manager etiket yönetimi dijital pazarlama"
language: "tr"
status: "published"
---
Her yeni pazarlama aracı, web sitenize bir JavaScript kodu eklemeyi gerektirir: Google Analytics, Facebook Pixel, Hotjar, LinkedIn Insight Tag, dönüşüm takip kodları... Bu kodları her defasında geliştiricinize yaptırmak yavaş ve verimsizdir. Google Tag Manager (GTM), tüm bu etiketleri tek bir "konteyner" içinde yönetmenizi sağlayan ücretsiz bir araçtır.

## Google Tag Manager Nedir?

GTM, web sitenize yalnızca bir kez eklenen bir "konteyner" kodudur. Bu kod eklendikten sonra, diğer tüm pazarlama etiketlerini (GA4, Facebook Pixel, Hotjar vb.) GTM'nin kendi arayüzünden, geliştirici yardımı olmadan ekleyebilirsiniz.

**Avantajları:**
- Yeni etiketleri anında aktif edin
- Kodlama bilgisi gerekmez (temel özellikler için)
- Tüm etiketleri tek yerden yönetin
- Yayınlamadan önce önizleme ile test edin
- Versiyon geçmişi — hata durumunda önceki versiyona geri dönün
- Sayfa hız etkisi azaltılır (asenkron yükleme)

## GTM Kurulumu

### 1. GTM Hesabı Oluşturun

tagmanager.google.com adresine gidin → "Hesap Oluştur":
- Hesap adı: Şirket veya marka adı
- Konteyner adı: Domain URL'si
- Platform: Web

### 2. GTM Kodunu Sitenize Ekleyin

GTM size iki kod parçası verecek:

**Birinci kod (head):** `<head>` etiketinin hemen ardından:
```html
<head>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];...})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

**İkinci kod (body):** `<body>` açılışının hemen ardından:
```html
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### WordPress'te GTM Kurulumu

**Yöntem 1 — Google Site Kit eklentisi:** Google'ın resmi WordPress eklentisi. GA4 ve GTM'yi birlikte kurar.

**Yöntem 2 — GTM4WP eklentisi:** Sadece GTM kodunu ekler. Hafif ve güvenilir.

**Yöntem 3 — Tema header.php:** Tema dosyalarından manuel ekleme. Tema güncellemelerinde kaybolabilir — child theme kullanın.

### Wix'te GTM Kurulumu

Wix → Ayarlar → Pazarlama ve SEO → Google Tag Manager → GTM ID'nizi girin (GTM-XXXXXXX formatında).

## GTM'nin Temel Kavramları

### Etiket (Tag)

Belirli bir tetikleyici gerçekleştiğinde çalışan kod parçası. Örnekler:
- Google Analytics 4 Konfigürasyonu
- GA4 Olayı
- Google Ads Dönüşüm Takibi
- Facebook Pixel Başlatma
- Hotjar Takibi

### Tetikleyici (Trigger)

Etiketin ne zaman çalışacağını belirler:
- Sayfa görüntüleme (her sayfa)
- Belirli sayfa görüntüleme (URL içeriyorsa)
- Tıklama (belirli bir butona)
- Form gönderimi
- Scroll derinliği (%50, %75, %100)
- Zamanlayıcı (30 saniye sonra)
- Özel olay (dataLayer'dan)

### Değişken (Variable)

Etiketler ve tetikleyiciler içinde kullanılan dinamik değerler:
- URL — mevcut sayfa URL'si
- Click ID — tıklanan elementin ID'si
- Form ID — gönderilen formun ID'si
- Özel JavaScript değişkenleri

### dataLayer

JavaScript nesnesi — GTM ve siteniz arasında veri aktarım köprüsü:
```javascript
// Satın alma olayını dataLayer'a it
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': '12345',
    'value': 299.99,
    'currency': 'TRY',
    'items': [{ 'item_name': 'Ürün Adı', 'price': 299.99 }]
  }
});
```

## GA4'ü GTM ile Kurma

GTM'nin en yaygın kullanımı Google Analytics 4 entegrasyonudur.

### Adım 1: GA4 Konfigürasyonu Etiketi

GTM → Etiketler → Yeni:
- Etiket türü: Google Analytics: GA4 Konfigürasyonu
- Ölçüm Kimliği: G-XXXXXXXXXX (GA4 hesabından alın)
- Tetikleyici: Tüm Sayfalar

### Adım 2: Özel Olay Etiketi (İstege Bağlı)

Form gönderimleri, buton tıklamaları gibi olayları ayrıca takip etmek için:
- Etiket türü: Google Analytics: GA4 Olayı
- Konfigürasyon etiketi: GA4 Konfigürasyonu
- Olay adı: `generate_lead` (veya özel isim)
- Tetikleyici: Form gönderimi

### Adım 3: Önizleme ile Test

GTM → Önizleme → Sitenizin URL'sini girin.

Sayfa açıldığında GTM Debugger aktif olur. Her sayfa görüntülemede ve tetikleyicilerde hangi etiketlerin çalıştığını canlı görürsünüz.

### Adım 4: Yayımlama

Test başarılıysa GTM → Yayımla → Sürüm adı girin.

## Facebook Pixel'i GTM ile Kurma

GTM → Etiketler → Yeni:
- Etiket türü: Özel HTML
- HTML alanına Facebook Pixel kodunu yapıştırın:

```html
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'PIXEL_ID_BURAYA');
fbq('track', 'PageView');
</script>
```

- Tetikleyici: Tüm Sayfalar

## Scroll Takibi (Kaydırma Derinliği)

Kullanıcının sayfayı ne kadar kaydırdığını ölçmek, içerik optimizasyonu için değerli veri sağlar.

**Tetikleyici oluşturun:**
- Tetikleyici türü: Kaydırma Derinliği
- Dikey kaydırma eşikleri: 25, 50, 75, 100

**Etiket oluşturun:**
- GA4 Olayı
- Olay adı: `scroll`
- Olay parametresi: `percent_scrolled` → `{{Scroll Depth Threshold}}`
- Tetikleyici: Yukarıdaki scroll tetikleyicisi

## Dönüşüm Takibi

### Form Gönderimi Takibi

İletişim formu gönderimlerini takip etmek:

**Tetikleyici:**
- Form gönderimi
- Tüm formlar veya spesifik form ID'si

**Etiket:**
- GA4 Olayı: `generate_lead`

### Telefon Tıklaması Takibi

```
Tetikleyici:
- Tıklama — Yalnızca Bağlantılar
- Tıklama URL'si — ile başlar — tel:
```

**Etiket:** GA4 Olayı: `phone_click`

## Önizleme ve Hata Ayıklama

GTM Preview Mode en değerli özelliklerden biridir:

1. GTM → Önizleme → Sitenizi açın
2. Sağ alt köşede "Google Tag Manager" paneli görünür
3. Her olay için hangi etiketlerin çalıştığını, hangilerinin neden çalışmadığını görürsünüz
4. Sorunlu tetikleyicileri buradan tespit edin

**Google Analytics DebugView:** GA4 → Admin → DebugView — GTM test modu aktifken gerçek zamanlı olay akışını görürsünüz.

## GTM Versiyonlama

Her yayınlama işlemi yeni bir versiyon oluşturur. Hata durumunda eski versiyona geri dönün:

GTM → Versiyonlar → İstediğiniz versiyon → Yayımla.

Bu özellik, hatalı etiket kurulumlarında anında geri dönüşü sağlar.

## Sık Sorulan Sorular

### GTM sayfa hızını etkiler mi?

GTM kodu asenkron yüklenir — sayfa render'ını bloklamaz. Ama GTM içindeki çok sayıda ağır etiket (Hotjar, çok sayıda pixel) toplamda yükleme süresini artırabilir. Kullanılmayan etiketleri devre dışı bırakın.

### GTM olmadan doğrudan kod eklemek daha mı iyi?

Geliştirici kaynak gerektirmesi dışında teknik fark minimal. GTM'nin avantajı hız ve bağımsızlık — pazarlama ekibi geliştirici beklemeden etiket ekleyebilir.

### GTM ile hangi araçlar entegre edilebilir?

Neredeyse her JavaScript tabanlı pazarlama aracı: Google Ads, Facebook/Meta Pixel, Twitter Pixel, LinkedIn Insight Tag, Hotjar, Clarity, Intercom, Crisp, Tidio, özel analytics araçları, A/B test araçları...

### Google Analytics 4'ü GTM olmadan kurabilir miyim?

Evet — GA4 kodunu direkt sitenize ekleyebilirsiniz. Ama GTM ile daha esnek ve yönetilebilir bir yapı elde edersiniz.

## Kaynakça

- Google Tag Manager Yardım Merkezi — support.google.com/tagmanager
- Google Analytics 4 + GTM — developers.google.com/analytics
- Simo Ahava: GTM Blog — simoahava.com
- Measureschool: GTM Tutorials — measureschool.com