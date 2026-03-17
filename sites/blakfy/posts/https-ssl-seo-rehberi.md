wixId: "b19c1cd4-5ebc-47eb-80f4-f82482994922"
---
title: "HTTPS ve SSL: SEO'ya Etkisi, Kurulum ve Geçiş Rehberi 2025"
slug: "https-ssl-seo-rehberi"
focusKeyword: "https ssl seo"
seoTitle: "HTTPS ve SSL SEO'ya Etkisi ve Kurulum Rehberi 2025 | Blakfy"
metaDesc: "HTTPS neden SEO için zorunlu? SSL sertifikası türleri, HTTP'den HTTPS'e güvenli geçiş, 301 yönlendirme ve GSC mülk migrasyonu için tam rehber."
excerpt: "Google 2014'ten beri HTTPS'i hafif sıralama sinyali olarak kullanıyor. Ama asıl etki sıralamadan çok güvenlik, kullanıcı güveni ve teknik uyumluluk üzerinde."
categories: ["teknik-seo"]
tags: ["seo", "teknik-seo", "hosting"]
imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&h=900&fit=crop"
imageAlt: "HTTPS SSL sertifikası güvenli web sitesi SEO"
language: "tr"
status: "published"
---
HTTP (HyperText Transfer Protocol) ile HTTPS (HTTP Secure) arasındaki temel fark, iletişimin şifrelenmesidir. HTTPS, kullanıcı ile sunucu arasındaki veri transferini SSL/TLS protokolü aracılığıyla şifreler. Google 2014'te HTTPS'i hafif bir sıralama sinyali ilan etti. Bugün gelinen noktada HTTPS bir lüks değil, minimum standart haline geldi.

## HTTPS Neden Önemli?

**Güvenlik:** Kullanıcıların form doldururken, şifre girerken veya ödeme yaparken gönderdiği veriler şifrelenmiş iletilir. Ortadaki adam (MITM) saldırıları engellenir.

**SEO sinyali:** Google HTTPS'i hafif ama gerçek bir sıralama faktörü olarak kullanır. İki benzer site varsa HTTPS olan tercih edilir.

**Tarayıcı uyarıları:** Chrome ve Firefox, HTTP sitelerini "Güvenli Değil" olarak işaretler. Bu uyarı kullanıcı güvenini doğrudan etkiler.

**Referral trafik korunması:** HTTP sitelerinde Google Analytics'te gelen referral trafiği "direct" olarak görünür. HTTPS'te referrer bilgisi doğru aktarılır.

**Core Web Vitals ve HTTP/2:** HTTP/2 protokolü yalnızca HTTPS üzerinde çalışır. HTTP/2, çoklu paralel istek yükleme ile hız avantajı sağlar.

**Core Web Vitals izleme:** Google Chrome'un CrUX verisi yalnızca HTTPS sayfalar için toplanır.

## SSL/TLS Sertifikası Türleri

### DV (Domain Validated)

Yalnızca domain sahipliği doğrulanır. Hızlı verilir (dakikalar içinde), ücretsiz seçenekler mevcut.

**Kimler için:** Kişisel bloglar, içerik siteleri, küçük işletme web siteleri.

**Örnek:** Let's Encrypt — tamamen ücretsiz, otomatik yenileme.

### OV (Organization Validated)

Domain sahipliği + şirketin varlığı doğrulanır. Sertifikada organizasyon bilgisi görünür.

**Kimler için:** Orta ve büyük ölçekli şirket web siteleri.

**Maliyet:** Yıllık 50-300 USD.

### EV (Extended Validation)

En kapsamlı doğrulama. Şirketin hukuki, operasyonel ve fiziksel varlığı doğrulanır.

**Kimler için:** Bankalar, finans kurumları, büyük e-ticaret siteleri.

**Maliyet:** Yıllık 200-1000 USD.

**Not:** Eski tarayıcılar EV sertifikasında yeşil adres çubuğu gösteriyordu. Modern tarayıcılar bu görsel ayrımı kaldırdı.

### Wildcard Sertifikası

`*.example.com` — Ana domain ve tüm subdomainler için tek sertifika (blog.example.com, shop.example.com vb.).

### Multi-Domain (SAN) Sertifikası

Birden fazla farklı domain için tek sertifika.

## Ücretsiz SSL: Let's Encrypt

Let's Encrypt, 2015'ten beri ücretsiz DV sertifikası sunuyor. 3 ayda bir otomatik yenileme desteği ile pratik.

**Hosting entegrasyonu:** Çoğu modern hosting (Cloudflare, cPanel, Plesk, DirectAdmin) Let's Encrypt'i tek tıkla yüklemeye izin verir.

**Certbot (Kendi sunucu yönetenler için):**
```bash
# Ubuntu/Debian
apt install certbot
certbot --nginx -d example.com -d www.example.com

# Otomatik yenileme
certbot renew --dry-run
```

## HTTP'den HTTPS'e Geçiş

Bu geçiş dikkatsiz yapılırsa trafik kaybına yol açabilir. Adım adım güvenli geçiş:

### 1. SSL Sertifikasını Kur

Hosting panelinizden veya certbot ile sertifikayı kurun.

### 2. Sitenin HTTPS Versiyonunu Test Et

`https://siteniz.com` adresine gidin — hata var mı? Mixed content (karma içerik) uyarısı görünüyor mu?

**Mixed content:** Sayfa HTTPS ile sunuluyor ama içinde HTTP kaynakları (resim, font, script) varsa oluşur. Bu uyarı güvenlik simgesini bozar ve bazı kaynakların yüklenmesini engeller.

Mixed content'i düzeltmek için tüm kaynak URL'lerini `https://` ile başlatın:
```html
<!-- Sorunlu -->
<img src="http://example.com/resim.jpg">

<!-- Doğru -->
<img src="https://example.com/resim.jpg">
<!-- veya -->
<img src="//example.com/resim.jpg"> (protokol-bağımsız)
```

WordPress için "Better Search Replace" eklentisi veritabanındaki tüm HTTP URL'lerini HTTPS ile değiştirir.

### 3. 301 Yönlendirmeleri Kur

Tüm HTTP URL'lerini HTTPS'e 301 ile yönlendirin:

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

**Nginx:**
```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}
```

**Cloudflare:** SSL/TLS → Always Use HTTPS ayarını etkinleştirin.

### 4. www / non-www Tutarlılığını Sağla

Hem `https://example.com` hem `https://www.example.com` erişilebilir mi? Birini diğerine 301 ile yönlendirin. Canonical URL'lerinizle tutarlı olan versiyonu tercih edin.

### 5. Canonical URL'leri Güncelle

Tüm canonical etiketlerini `https://` ile başlayan URL'lere güncelleyin.

### 6. Sitemap'i Güncelle

XML sitemap'teki tüm URL'ler `https://` ile başlamalı. Google Search Console'a güncellenmiş sitemap'i yeniden gönderin.

### 7. Internal Link'leri Güncelle

Sitede http:// ile başlayan iç bağlantılar 301 yönlendirme üzerinden gider — bu tarama bütçesini tüketir. Direkt https:// bağlantılarla değiştirin.

### 8. Google Search Console'da Alan Taşıma

GSC'de eski `http://` mülkünüzden "Alan Değişikliği" yapın. Bu Google'a geçişi resmi olarak bildirir ve indeks sinyallerinin aktarımını hızlandırır.

**GSC Mülk Ekle:** `https://` versiyonu için yeni mülk oluşturun — hem `https://example.com` hem `https://www.example.com`.

### 9. Backlink Güncellemeleri

Önemli backlink kaynaklarına yeni HTTPS URL'yi bildirin. Bu özellikle spam domain dışındaki gerçek referans siteler için değerlidir.

## HSTS (HTTP Strict Transport Security)

HSTS, tarayıcıya "bu siteye sadece HTTPS ile bağlan" talimatı verir. 301 yönlendirme gereksinimini ortadan kaldırarak güvenliği artırır.

**Apache:**
```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

**Nginx:**
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

`preload` ekleyerek hstspreload.org listesine başvurabilirsiniz — tarayıcılar bu listeyi kullanarak ilk istekten itibaren HTTPS'i zorlar.

**Dikkat:** HSTS'yi etkinleştirmeden önce HTTPS geçişini tamamlandığından emin olun. HSTS aktifken HTTP'ye dönmek çok zorlaşır.

## Sertifika Yenilemeyi İzleme

SSL sertifikası süresi dolduğunda site "Bağlantınız güvenli değil" hatasıyla tamamen kapanır.

**İzleme araçları:**
- SSL Labs (ssllabs.com/ssltest) — Sertifika kalitesi ve konfigürasyon analizi
- UptimeRobot — SSL sertifika son kullanma takibi (ücretsiz)
- Google Search Console — SSL hataları varsa uyarı gönderir

**Let's Encrypt:** 90 günde bir yenileme gerekir — certbot ile otomatik yenileme kurun.

## Sık Sorulan Sorular

### HTTPS geçişinden sonra sıralamalarım düştü, neden?

301 yönlendirmeler düzgün kurulmuşsa Google sinyalleri aktarır ve geçici düşüşler hızla toparlanır. Ama:
- 302 kullandıysanız aktarım gerçekleşmez
- Sitemap ve canonical güncellenmediyse karışık sinyaller gönderilir
- GSC'de alan taşıma yapılmadıysa Google'ın geçişi fark etmesi yavaşlar

### Ücretsiz Let's Encrypt yeterli mi?

Evet — e-ticaret dahil çoğu site için Let's Encrypt DV sertifikası yeterlidir. Yalnızca finans sektörü veya kural gereği OV/EV gerektiren durumlar için ücretli sertifika alın.

### Cloudflare'in ücretsiz SSL'si gerçek SSL mi?

Cloudflare'in ücretsiz planı "Flexible SSL" sunuyor — kullanıcı ile Cloudflare arasındaki bağlantı şifreleniyor, ama Cloudflare ile orijin sunucu arasındaki bağlantı şifrelenmeyebilir. "Full (Strict)" modu için orijin sunucuda da sertifika kurulu olmalı. En güvenli seçenek Full Strict modudur.

### HTTPS geçişinden sonra analytics verileri nasıl etkilenir?

HTTP'den HTTPS'e geçerken referral trafik kaynaklarının görünümü değişebilir. İlk hafta verilerini karşılaştırmak için Google Analytics'te URL ayarlarını da HTTPS'e güncelleyin.

## Kaynakça

- Google Arama Merkezi: HTTPS — developers.google.com/search/docs/crawling-indexing/https
- Let's Encrypt — letsencrypt.org
- SSL Labs: SSL Test — ssllabs.com/ssltest
- HSTS Preload List — hstspreload.org
- Mozilla: HTTPS Only Mode — developer.mozilla.org