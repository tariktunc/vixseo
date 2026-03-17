wixId: "ec1e4db4-4d02-4736-a7a2-fca5140e438e"
---
title: "Log Dosyası Analizi: Googlebot'u Takip Etmek"
slug: "log-dosyasi-analizi"
focusKeyword: "log dosyası analizi"
seoTitle: "Log Dosyası Analizi: Googlebot Takibi ve Crawl Optimizasyonu | Blakfy"
metaDesc: "Server log analizi nedir, nasıl yapılır? Googlebot aktivitesini izlemek, crawl bütçesini optimize etmek ve teknik SEO sorunlarını tespit etmek için rehber."
excerpt: "Log dosyaları, Googlebot'un sitenizde gerçekte ne yaptığını gösterir. Hangi sayfaları ne sıklıkla tarıyor, nerede takılıyor? Bu veri SEO stratejinizi temelden değiştirebilir."
categories: ["teknik-seo"]
tags: ["seo", "google-search-console", "javascript"]
imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=900&fit=crop"
imageAlt: "Log dosyası analizi server SEO teknik tarama"
language: "tr"
status: "published"
---
Server log dosyaları, SEO'nun en az kullanılan ama en değerli veri kaynaklarından biridir. Google Search Console size Googlebot'un indekslediği sayfaları gösteriyor — log dosyaları ise Googlebot'un sitenize gelip ne yaptığını, hangi URL'leri ne zaman istediğini, nerede 404 döndüğünü, hangi sayfaları hiç ziyaret etmediğini gösteriyor. Bu ham veri, GSC'nin sağlayamadığı gerçek zamanlı tarama davranışını ortaya koyar.

## Log Dosyası Nedir?

Web sunucusu, her HTTP isteğini log dosyasına kaydeder. Bu dosyada her satır bir istek:

```
66.249.66.194 - - [15/Mar/2025:10:23:41 +0000] "GET /blog/seo-rehberi/ HTTP/1.1" 200 34512 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
```

Bu satırda şunlar var:
- IP adresi: 66.249.66.194 (Googlebot)
- Tarih/Saat
- İstenen URL: /blog/seo-rehberi/
- HTTP Durum Kodu: 200 (başarılı)
- Yanıt boyutu
- User-Agent: Googlebot

Tüm bu isteklerin toplandığı dosya → server access log.

## Log Analizi Neden Önemli?

**Crawl bütçesini anlama:** Google sitenizi günde kaç kez tarıyor? Hangi sayfalara odaklanıyor? Değersiz sayfalar bütçe tüketiyor mu?

**Gerçek bot aktivitesi:** GSC geciktirilmiş ve örneklenmiş veri sunar. Log dosyası gerçek zamanlı ve eksiksiz.

**Taranmayan sayfalar tespiti:** Yayınladığınız ama Googlebot'un hiç ziyaret etmediği sayfalar hangileri?

**Hata tespiti:** Googlebot'un gördüğü 404, 500, 301 hatalarını direkt görebilirsiniz.

**JavaScript rendering:** Hangi JS dosyaları yükleniyor, Googlebot JS'i işliyor mu?

## Log Dosyasına Nasıl Erişilir?

**cPanel barındırma:** cPanel → Logs → Raw Access Logs. `.gz` sıkıştırılmış format.

**Nginx:** `/var/log/nginx/access.log`

**Apache:** `/var/log/apache2/access.log`

**CDN'li siteler (Cloudflare, AWS):** CDN'nin kendi log yönetim panelinden erişin.

**Hosting sağlayıcı:** Türk hosting sağlayıcıları (Bülent Hosting, Turhost vb.) genellikle cPanel erişimi sağlıyor.

**Büyük siteler için:** Log boyutu gigabyte'lara ulaşabilir. Sadece belirli tarih aralığını indirin.

## Analiz Araçları

### Screaming Frog Log Analyzer

Screaming Frog'un log analiz aracı. Windows/Mac/Linux.

**Özellikler:**
- Bot filtreleme (Googlebot, Bingbot vb. ayrı)
- URL bazlı bot aktivitesi
- Durum kodu dağılımı
- Taranmayan sayfalar

**Fiyat:** Screaming Frog SEO Spider lisansıyla birlikte ($259/yıl).

### Botify / Lumar (JetOctopus)

Kurumsal ölçek için profesyonel log analiz platformları. Otomatik log toplama + görsel raporlama.

**Fiyat:** Kurumsal (yüzlerce-binlerce $).

### ELK Stack (Elasticsearch + Logstash + Kibana)

Açık kaynak, güçlü ama teknik kurulum gerektirir. Büyük siteler için ideal.

### Manuel Analiz

Küçük siteler için temel komut satırı analizi:

```bash
# Googlebot isteklerini filtrele
grep "Googlebot" access.log > googlebot.log

# Her URL kaç kez ziyaret edildi?
awk '{print $7}' googlebot.log | sort | uniq -c | sort -rn | head 50
```

## Log Analizinde Bakılacaklar

### 1. Googlebot IP Doğrulama

Tüm "Googlebot" user-agent'ı gerçek Google değildir. Kötü botlar Googlebot taklit edebilir.

Gerçek Googlebot IP aralığı için `host <IP>` komutuyla DNS doğrulama yapın — `googlebot.com` dönmeli.

Veya Google'ın yayınladığı IP listesiyle (developers.google.com/search/apis/ipranges/googlebot.json) karşılaştırın.

### 2. Tarama Frekansı

Hangi sayfalar ne sıklıkla tarınıyor?

- Yüksek frekanslı: Ana sayfa, güncel içerikler, sitemap (normal)
- Düşük frekanslı ama önemli sayfalar: İçerik var ama Googlebot ilgi göstermiyor — internal link sorunu olabilir
- Yüksek frekans + düşük değer: Parametre URL'leri, filtreler, sepet sayfaları (tarama bütçesi israfı)

### 3. Durum Kodu Dağılımı

| Kod | Anlam | Aksiyon |
|---|---|---|
| 200 | Başarılı | Normal |
| 301 | Yönlendirme | Neye yönlendiriyor kontrol et |
| 302 | Geçici yönlendirme | Kalıcıysa 301'e çevir |
| 404 | Bulunamadı | Kaynağı düzelt veya 410 |
| 500 | Sunucu hatası | Teknik sorun — acil |
| 503 | Geçici erişim yok | Uzunsa sorun |

Yüksek 404 oranı = eski URL'ler hâlâ tarınıyor ama içerik yok.

### 4. Bot Harcama Segmentasyonu

Googlebot sitenizde zamanını nerede geçiriyor?

- Yüksek değerli sayfalar (ürün, blog, kategori): %80+
- Düşük değer (arama sayfaları, filtreler): Mümkün olduğunca azaltın

Robots.txt ve crawl bütçesi ayarları bu dengeyi etkiler.

### 5. Taranmayan Önemli Sayfalar

Log'da hiç görünmeyen ama önemli olan sayfalar:
- Yeni yayınlanan içerikler
- Yüksek değerli ürün sayfaları
- Site mimarisinde derin gömülü sayfalar

Bu sayfaları sitemap'e ekleyin ve internal link yapısını güçlendirin.

## Log Analizinden Aksiyon Çıkarmak

**Robots.txt güncelleme:** Gereksiz yüksek frekans taranan URL'leri Disallow ile engelleyin.

**Sitemap güncelleme:** Taranmayan ama önemli sayfaları sitemap aracılığıyla bildirim.

**Internal link iyileştirme:** Googlebot'un az ilgi gösterdiği önemli sayfaları daha fazla iç link ile güçlendirin.

**404 temizleme:** Eski URL'leri doğru 301 yönlendirmelerine bağlayın veya 410 ile "kalıcı silindi" işaretleyin.

## Sık Sorulan Sorular

### Log analizi her site için gerekli mi?

Büyük siteler (10.000+ sayfa) için kritik. Küçük siteler için GSC ve Screaming Frog genellikle yeterli.

### Log dosyaları ne kadar süre saklanmalı?

Minimum 30 gün, ideal 3-6 ay. Algoritma güncellemelerinden önce ve sonrasını karşılaştırmak için.

### Cloudflare kullanan sitede log analizi yapılabilir mi?

Evet — Cloudflare Logs özelliğiyle loglar S3 veya analiz araçlarına gönderilebilir (Ücretli Enterprise planında tam özellik).

## Kaynakça

- Screaming Frog: Log File Analyzer — screamingfrog.co.uk/log-file-analyser
- Google: Crawl Budget Management — developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget
- Botify: Log Analysis Guide — botify.com/blog
- JetOctopus: Log Analysis Tutorial — jetoctopus.com/blog
