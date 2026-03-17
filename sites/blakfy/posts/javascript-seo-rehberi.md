wixId: "be4adddf-9d38-4096-8a0b-fd66d8abd1d7"
---
title: "JavaScript SEO: SPA ve Next.js Sitelerde SEO Nasıl Yapılır?"
slug: "javascript-seo-rehberi"
focusKeyword: "javascript seo"
seoTitle: "JavaScript SEO: SPA ve Next.js SEO Rehberi 2025 | Blakfy"
metaDesc: "JavaScript SEO nedir? SPA, React, Next.js sitelerinde SEO sorunları ve çözümleri. SSR, SSG, prerendering ve Googlebot rendering süreci için tam rehber."
excerpt: "JavaScript tabanlı siteler harika kullanıcı deneyimi sunar ama Googlebot bu içerikleri render etmekte gecikebilir. JavaScript SEO'nun temel prensiplerini ele alıyoruz."
categories: ["teknik-seo"]
tags: ["seo", "teknik-seo", "javascript"]
imageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1600&h=900&fit=crop"
imageAlt: "JavaScript SEO Next.js React teknik optimizasyon"
language: "tr"
status: "published"
---
JavaScript tabanlı web uygulamaları modern web geliştirmenin merkezinde. React, Vue, Angular ve Next.js ile oluşturulan siteler olağanüstü kullanıcı deneyimi sunar. Ama bu framework'lerin nasıl çalıştığını anlamadan SEO yaparsanız, içeriğiniz Google'da hiç görünmeyebilir. JavaScript SEO, bu teknik farkı kapatmak için gerekli bilgi ve pratikleri kapsar.

## Googlebot JavaScript'i Nasıl İşler?

Geleneksel HTML sitelerinde Googlebot sayfayı indirir ve hemen metin içeriğini okuyabilir. JavaScript tabanlı sitelerde süreç farklı çalışır:

**1. Fetch:** Googlebot HTML dosyasını indirir.

**2. Parse:** HTML'yi ayrıştırır — ama bu noktada içerik henüz oluşmamış olabilir. SPA'larda (Single Page Application) ilk HTML'de genellikle yalnızca boş bir `<div id="root"></div>` vardır.

**3. Render (Rendering):** Googlebot JavaScript dosyalarını indirir ve çalıştırarak sayfanın son halini oluşturur.

**4. İndeksleme:** Render edilen içeriği indeksler.

**Kritik sorun:** Rendering, fetch'ten saatler hatta günler sonra gerçekleşebilir. Google'ın "Render Bütçesi" sınırlıdır ve JavaScript render maliyetli bir işlemdir. Bu süre içinde sayfa indekslenemez veya eksik içerikle indekslenir.

## Rendering Türleri

### Client-Side Rendering (CSR)

İçerik kullanıcının tarayıcısında JavaScript çalıştıktan sonra oluşur. Tipik React veya Vue SPA'sı.

**SEO sorunu:** Googlebot sayfaya geldiğinde boş bir HTML görür. Render için beklemesi gerekir — bu gecikme indekslemeyi yavaşlatır.

**Ne zaman kullanılır:** Giriş gerektiren uygulamalar (dashboard, SaaS arayüzleri) — SEO gerekmeyen sayfalar.

### Server-Side Rendering (SSR)

Her istek geldiğinde sunucu JavaScript'i çalıştırır ve dolu HTML döndürür.

**SEO faydası:** Googlebot anında tam HTML içeriğini görür. Render bekleme yoktur.

**Dezavantaj:** Her istek için sunucu işlem maliyeti. Yoğun trafiklerde pahalı olabilir.

**Framework'ler:** Next.js (getServerSideProps), Nuxt.js (SSR modu)

### Static Site Generation (SSG)

Derleme (build) anında HTML dosyaları önceden oluşturulur. Statik dosyalar CDN'den sunulur.

**SEO faydası:** Her sayfa hazır HTML olarak gelir. Render gecikme sıfır.

**Dezavantaj:** İçerik değiştiğinde yeniden build gerekir. Çok dinamik siteler için uygun değil.

**Framework'ler:** Next.js (getStaticProps), Gatsby, Astro, Hugo

### Incremental Static Regeneration (ISR)

SSG ve SSR'nin birleşimi. Sayfalar statik olarak önceden oluşturulur ama belirli aralıklarla arka planda yenilenir.

**SEO faydası:** Hem hız hem güncel içerik. Next.js'in ISR özelliği bu sorunu çözer.

```javascript
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 60, // 60 saniyede bir yenile
  };
}
```

## Next.js SEO Optimizasyonu

Next.js, React tabanlı uygulamalar için en SEO dostu framework'tür. Doğru yapılandırıldığında SSR ve SSG'nin avantajlarını birleştirir.

### next/head ile Meta Etiketler

```javascript
import Head from 'next/head';

export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | Siteniz</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://example.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
      </Head>
      <article>{/* içerik */}</article>
    </>
  );
}
```

### next/image ile Görsel Optimizasyonu

```javascript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Açıklayıcı alt metin"
  width={1600}
  height={900}
  priority={true}  // LCP görseli için
/>
```

`next/image` otomatik olarak WebP dönüşümü, lazy loading ve boyut optimizasyonu yapar.

### Sitemap Oluşturma

Next.js'te dinamik sitemap:

```javascript
// pages/sitemap.xml.js
export async function getServerSideProps({ res }) {
  const posts = await getAllPosts();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts.map(post => `
        <url>
          <loc>https://example.com/blog/${post.slug}</loc>
          <lastmod>${post.updatedAt}</lastmod>
        </url>
      `).join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
}
```

## JavaScript SEO Sorunlarını Tespit Etme

### Google Search Console → URL İnceleme

İncelemek istediğiniz URL'yi girin → "Canlı URL Test Et" → "Görünümü Test Et". Bu, Googlebot'un sayfayı nasıl render ettiğini gösterir.

**Kontrol edin:**
- Rendered HTML'de anahtar içerik var mı?
- Başlık ve meta açıklama doğru çıkıyor mu?
- Hata konsolu mesajları var mı?

### Fetch as Googlebot (Eski GSC Aracı)

GSC'nin eski arayüzünde "Getir ve Oluştur" özelliği sayfanın render edilmiş halini gösteriyordu. Yeni arayüzde URL İnceleme aracıyla entegre edildi.

### Chrome DevTools → JavaScript Devre Dışı

F12 → Command Palette (Ctrl+Shift+P) → "Disable JavaScript" → Sayfayı yenile. JavaScript olmadan ne görünüyor? Eğer içerik yoksa, Googlebot render etmeden önce de aynı şeyi görebilir.

## Yaygın JavaScript SEO Hataları

### Hata 1: Lazy Loaded İçerik Görünmüyor

Sonsuz scroll veya "Daha fazla yükle" butonu ile gelen içerik, Googlebot tarafından görülmeyebilir. Kritik içerikleri başlangıçta HTML'de sunun.

### Hata 2: JavaScript ile Yüklenen Meta Etiketler

```javascript
// YANLIŞ — Googlebot bunu okuyamayabilir
document.title = 'Sayfa Başlığı';
```

Meta etiketler SSR veya SSG ile HTML'de hazır gelmeli.

### Hata 3: Yavaş JavaScript Yükleme

Büyük JavaScript bundle'ları Core Web Vitals'ı olumsuz etkiler. Code splitting, tree shaking ve lazy loading kullanın.

### Hata 4: SPA Routing'de History API Sorunları

```javascript
// Hash routing (YANLIŞ SEO için)
https://example.com/#/sayfa

// History API (DOĞRU)
https://example.com/sayfa
```

`#` (hash) sonrası URL'ler Googlebot tarafından ayrı sayfa olarak taranmaz.

### Hata 5: JavaScript ile İçerik Gizleme

CSS `display:none` veya CSS animasyon ile gizlenen ama JS ile görünür yapılan içerik, Google tarafından gizli/düşük değerli kabul edilebilir.

## Prerendering Çözümleri

Mevcut bir SPA'yı SSR'ye geçirmek büyük bir mühendislik çalışması gerektirebilir. Alternatif olarak prerendering kullanılabilir:

**Prerendering servisleri:** Prerender.io, Rendertron — Googlebot'u tespit ederek önceden render edilmiş HTML sunar.

**Uyarı:** Google bu yöntemi (Googlebot'a farklı içerik sunmak) cloaking sayabilir. Dikkatli kullanın — rendered içerik gerçek içerikle tamamen aynı olmalı.

## Yapılandırılmış Veri (Schema) ve JavaScript

JSON-LD formatındaki yapılandırılmış veri, JavaScript ile de eklenebilir. Google bu yaklaşımı destekler:

```javascript
// Next.js'te JSON-LD
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "author": { "@type": "Person", "name": "Yazar Adı" },
      "datePublished": post.publishedAt,
    })
  }}
/>
```

## Sık Sorulan Sorular

### React ile yapılmış site SEO için kötü mü?

Hayır, ama ekstra dikkat gerektirir. SSR veya SSG ile doğru yapılandırılmış React sitesi mükemmel SEO sağlar. Sorun React değil, CSR-only yaklaşımıdır.

### Next.js App Router ile Pages Router'ın SEO farkı nedir?

Her ikisi de SEO dostu SSR/SSG sunar. App Router (Next.js 13+) daha modern ve server component mimarisi sunar. Metadata API daha temizdir. SEO açısından pratik fark minimaldir.

### JavaScript sitemin indekslenip indekslenmediğini nasıl anlarım?

GSC → URL İnceleme → "Canlı URL Test Et" ile Googlebot'un ne gördüğünü kontrol edin. Ayrıca `site:siteniz.com` Google araması yaparak indekslenmiş sayfaları kontrol edin.

### Vue.js sitelerinde JavaScript SEO nasıl yapılır?

Nuxt.js framework'ü Vue için SSR/SSG desteği sunar. Next.js'e benzer yapılandırma mantığı geçerlidir.

## Kaynakça

- Google Arama Merkezi: JavaScript SEO Temelleri — developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Next.js SEO Dokümantasyonu — nextjs.org/learn/seo
- Google: Dynamic Rendering — developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering
- Web.dev: JavaScript SEO — web.dev