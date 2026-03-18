# VixSEO

Wix sitelerini tek panelden yöneten SEO yönetim panosu.

## Nedir?

VixSEO, birden fazla Wix sitesinin SEO performansını izlemek ve yönetmek için geliştirilmiş bir dashboard uygulamasıdır.

**Temel Özellikler:**

- Çoklu işletme yönetimi (blakfy, ibrahiminyeri, ...)
- Wix Blog & CMS entegrasyonu (yazılar, kategoriler, tag'ler)
- Google Search Console entegrasyonu (trafik, sorgular, pozisyon)
- Google Ads entegrasyonu (anahtar kelime hacmi)
- SEO eksik tespiti (title, description, kategori kontrolü)
- Sitemap analizi ve slug çakışma kontrolü
- Redirect yönetimi
- Dark mode + responsive tasarım

## Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 16 + TypeScript |
| UI | shadcn/ui + Tailwind CSS + Lucide React |
| Grafik | Recharts (shadcn/ui chart) |
| State | TanStack Query + TanStack Table + Zustand |
| Form | React Hook Form + Zod |
| Auth | Clerk |
| Database | Neon Postgres + Drizzle ORM |
| Animasyon | Framer Motion |
| Deploy | Vercel (web) + Electron (desktop) |

## Kurulum

### 1. Repo'yu klonla

```bash
git clone git@github.com:Blakfy/vixseo.git
cd vixseo
```

### 2. Bağımlılıkları kur

```bash
npm install
```

### 3. Environment variables

`.env.example` dosyasını `.env.local` olarak kopyala ve doldur:

```bash
cp .env.example .env.local
```

**Zorunlu:**

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Neon Postgres
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Wix API
WIX_API_KEY=IST.xxx
```

**İşletme bazlı (her site için):**

```env
WIX_SITE_ID_BLAKFY=xxx-xxx-xxx
WIX_SITE_ID_IBRAHIMINYERI=xxx-xxx-xxx
```

**Opsiyonel:**

```env
# Google Search Console (service account JSON)
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}

# Google Ads
GOOGLE_ADS_CLIENT_ID=xxx
GOOGLE_ADS_CLIENT_SECRET=xxx
GOOGLE_ADS_DEVELOPER_TOKEN=xxx
GOOGLE_ADS_CUSTOMER_ID=xxx
GOOGLE_ADS_REFRESH_TOKEN=xxx
```

### 4. Database oluştur

Vercel Dashboard > Storage > Neon Postgres oluştur. Ya da [neon.tech](https://neon.tech) üzerinden.

Tabloları oluştur:

```bash
npx drizzle-kit push
```

### 5. Çalıştır

```bash
npm run dev
```

http://localhost:3000 adresinde açılır.

## Proje Yapısı

```
src/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Ana dashboard
│   ├── settings/page.tsx       # İşletme yönetimi
│   ├── [business]/             # İşletme detay sayfaları
│   │   ├── page.tsx            # Özet (SC metrikleri + yazı durumu)
│   │   ├── posts/page.tsx      # Yazı meta listesi
│   │   ├── analytics/page.tsx  # Search Console detay
│   │   ├── keywords/page.tsx   # Anahtar kelime araştırma
│   │   ├── sitemap/page.tsx    # Sitemap analiz
│   │   └── redirects/page.tsx  # Redirect yönetimi
│   └── api/                    # API routes (Wix/SC/Ads proxy)
│       ├── businesses/         # İşletme CRUD
│       ├── [business]/posts/   # Wix yazıları
│       ├── [business]/analytics/sc/  # SC verileri
│       └── health/             # Env key durum kontrolü
├── lib/                        # Portlanmış modüller
│   ├── wix.ts                  # Wix API client
│   ├── blog.ts                 # Wix Blog query
│   ├── db.ts                   # Drizzle client
│   └── constants.ts            # Tema, sabitler
├── components/
│   ├── ui/                     # shadcn/ui bileşenleri
│   ├── layout/                 # Navbar, business switcher, theme toggle
│   ├── dashboard/              # İşletme kartları, stats
│   └── posts/                  # Yazı tablosu, SEO badge
├── hooks/                      # TanStack Query hooks
├── db/schema.ts                # Drizzle tablo tanımları
└── types/                      # TypeScript + Zod şemaları
```

## API Routes

| Method | Route | Açıklama |
|--------|-------|----------|
| GET | `/api/businesses` | İşletmeleri listele |
| POST | `/api/businesses` | Yeni işletme ekle |
| DELETE | `/api/businesses?id=x` | İşletme sil |
| GET | `/api/[business]/posts` | Wix yazıları |
| GET | `/api/[business]/categories` | Kategoriler + tag'ler |
| GET | `/api/[business]/analytics/sc` | SC verileri (cache) |
| GET | `/api/health` | Env key durumu |

## Database Tabloları

| Tablo | Açıklama |
|-------|----------|
| businesses | İşletme bilgileri |
| sc_pages | Search Console sayfa cache |
| sc_queries | Search Console sorgu cache |
| sitemap_entries | Sitemap URL cache |
| redirects | Redirect kuralları |
| keyword_searches | Keyword araştırma geçmişi |
| audit_results | SEO audit sonuçları |

## Tema

VixSEO özel renk paleti:

| Token | Light | Dark |
|-------|-------|------|
| Primary | `#0F2447` (lacivert) | `#E2E8F0` |
| Accent | `#10B981` (zümrüt) | `#10B981` |
| Background | `#FFFFFF` | `#0B1120` |
| Muted | `#F4F6F9` | `#1E293B` |

## Deploy

### Vercel (Web)

1. [vercel.com/new](https://vercel.com/new) > GitHub repo'yu import et
2. Environment variables ekle
3. Storage > Neon Postgres oluştur
4. Deploy

### Electron (Desktop)

Electron, Vercel URL'ini saran bir thin shell olarak çalışır:

```bash
npm run electron:dev    # geliştirme
npm run electron:build  # paketleme (.exe / .dmg)
```

## Yol Haritası

- [x] Proje scaffold + tema
- [x] Auth (Clerk) + dark mode
- [x] Wix API port + işletme CRUD
- [x] Ana dashboard + işletme kartları
- [x] Yazılar tablosu (TanStack Table)
- [x] Analytics sayfası (SC)
- [ ] SC API refresh + DB cache (cron)
- [ ] Google Ads keyword volume
- [ ] Sitemap çekme + analiz
- [ ] Redirect CRUD
- [ ] SEO audit
- [ ] Electron wrapper

## Lisans

Private repository. Blakfy &copy; 2026
