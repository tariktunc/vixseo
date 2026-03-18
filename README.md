<p align="center">
  <img src="public/logo.svg" alt="VixSEO" width="280" />
</p>

<p align="center">
  <strong>Wix sitelerini tek panelden yöneten SEO yönetim panosu</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-0F2447?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/shadcn/ui-10B981?style=flat-square" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square&logo=clerk" alt="Clerk" />
  <img src="https://img.shields.io/badge/Vercel-Deploy-000?style=flat-square&logo=vercel" alt="Vercel" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Wix_API-Entegre-0C6EFC?style=flat-square" alt="Wix API" />
  <img src="https://img.shields.io/badge/Search_Console-Entegre-EA4335?style=flat-square&logo=google&logoColor=white" alt="Search Console" />
  <img src="https://img.shields.io/badge/Google_Ads-Entegre-FBBC04?style=flat-square&logo=googleads&logoColor=white" alt="Google Ads" />
</p>

---

## Nedir?

VixSEO, birden fazla Wix sitesinin SEO performansını izlemek ve yönetmek için geliştirilmiş bir dashboard uygulamasıdır. Web (Vercel) ve masaüstü (Electron) olarak çalışır.

### Temel Özellikler

- **Çoklu işletme yönetimi** — blakfy, ibrahiminyeri ve daha fazlası
- **Wix Blog & CMS** — yazılar, kategoriler, tag'ler
- **Google Search Console** — trafik, sorgular, pozisyon takibi
- **Google Ads** — anahtar kelime hacmi araştırma
- **SEO audit** — eksik title, description, kategori tespiti
- **Sitemap analizi** — slug çakışma kontrolü
- **Redirect yönetimi** — 301 redirect ekleme ve doğrulama
- **Dark mode** + responsive tasarım

---

## Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| **Framework** | Next.js 16 + TypeScript |
| **UI** | shadcn/ui + Tailwind CSS + Lucide React |
| **Grafik** | Recharts (shadcn/ui chart) |
| **State** | TanStack Query + TanStack Table + Zustand |
| **Form** | React Hook Form + Zod |
| **Auth** | Clerk |
| **Database** | Neon Postgres + Drizzle ORM |
| **Animasyon** | Framer Motion |
| **Deploy** | Vercel (web) + Electron (desktop) |

---

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

#### Zorunlu

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Neon Postgres
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Wix API
WIX_API_KEY=IST.xxx
```

#### İşletme bazlı

Her Wix sitesi için ayrı site ID:

```env
WIX_SITE_ID_BLAKFY=xxx-xxx-xxx
WIX_SITE_ID_IBRAHIMINYERI=xxx-xxx-xxx
```

#### Opsiyonel

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

Vercel Dashboard > Storage > Neon Postgres oluştur veya [neon.tech](https://neon.tech) kullan.

```bash
npx drizzle-kit push
```

### 5. Çalıştır

```bash
npm run dev
```

http://localhost:3000 adresinde açılır.

---

## Proje Yapısı

```
src/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Ana dashboard
│   ├── settings/page.tsx       # İşletme yönetimi
│   ├── [business]/             # İşletme detay sayfaları
│   │   ├── page.tsx            #   Özet (SC + yazı durumu)
│   │   ├── posts/page.tsx      #   Yazı meta listesi
│   │   ├── analytics/page.tsx  #   Search Console detay
│   │   ├── keywords/page.tsx   #   Anahtar kelime araştırma
│   │   ├── sitemap/page.tsx    #   Sitemap analiz
│   │   └── redirects/page.tsx  #   Redirect yönetimi
│   └── api/                    # API routes
├── lib/                        # Core modüller
│   ├── wix.ts                  #   Wix API client
│   ├── blog.ts                 #   Blog query
│   ├── db.ts                   #   Drizzle client
│   └── constants.ts            #   Sabitler
├── components/
│   ├── ui/                     # shadcn/ui
│   ├── layout/                 # Navbar, switcher, theme
│   ├── dashboard/              # Kartlar, stats
│   └── posts/                  # Tablo, SEO badge
├── hooks/                      # TanStack Query hooks
├── db/schema.ts                # Drizzle tablo tanımları
└── types/                      # TypeScript + Zod
```

---

## API Routes

| Method | Route | Açıklama |
|--------|-------|----------|
| `GET` | `/api/businesses` | İşletmeleri listele |
| `POST` | `/api/businesses` | Yeni işletme ekle |
| `DELETE` | `/api/businesses?id=x` | İşletme sil |
| `GET` | `/api/[business]/posts` | Wix yazıları |
| `GET` | `/api/[business]/categories` | Kategoriler + tag'ler |
| `GET` | `/api/[business]/analytics/sc` | SC verileri (cache) |
| `GET` | `/api/health` | Env key durumu |

---

## Database

| Tablo | Açıklama |
|-------|----------|
| `businesses` | İşletme bilgileri ve API key durumları |
| `sc_pages` | Search Console sayfa performansı (cache) |
| `sc_queries` | Search Console sorgu performansı (cache) |
| `sitemap_entries` | Sitemap URL'leri (cache) |
| `redirects` | Redirect kuralları |
| `keyword_searches` | Keyword araştırma geçmişi |
| `audit_results` | SEO audit sonuçları |

---

## Tema

<table>
<tr>
<td align="center"><strong>Token</strong></td>
<td align="center"><strong>Light</strong></td>
<td align="center"><strong>Dark</strong></td>
</tr>
<tr>
<td>Primary</td>
<td><img src="https://img.shields.io/badge/-%230F2447?style=flat-square&color=0F2447" /> <code>#0F2447</code></td>
<td><img src="https://img.shields.io/badge/-%23E2E8F0?style=flat-square&color=E2E8F0" /> <code>#E2E8F0</code></td>
</tr>
<tr>
<td>Accent</td>
<td><img src="https://img.shields.io/badge/-%2310B981?style=flat-square&color=10B981" /> <code>#10B981</code></td>
<td><img src="https://img.shields.io/badge/-%2310B981?style=flat-square&color=10B981" /> <code>#10B981</code></td>
</tr>
<tr>
<td>Background</td>
<td><img src="https://img.shields.io/badge/-%23FFFFFF?style=flat-square&color=FFFFFF" /> <code>#FFFFFF</code></td>
<td><img src="https://img.shields.io/badge/-%230B1120?style=flat-square&color=0B1120" /> <code>#0B1120</code></td>
</tr>
<tr>
<td>Muted</td>
<td><img src="https://img.shields.io/badge/-%23F4F6F9?style=flat-square&color=F4F6F9" /> <code>#F4F6F9</code></td>
<td><img src="https://img.shields.io/badge/-%231E293B?style=flat-square&color=1E293B" /> <code>#1E293B</code></td>
</tr>
</table>

---

## Deploy

### Vercel (Web)

1. [vercel.com/new](https://vercel.com/new) > GitHub repo'yu import et
2. Environment variables ekle
3. Storage > Neon Postgres oluştur
4. Deploy

### Electron (Desktop)

```bash
npm run electron:dev    # geliştirme
npm run electron:build  # paketleme (.exe / .dmg)
```

---

## Yol Haritası

- [x] Proje scaffold + tema
- [x] Auth (Clerk) + dark mode
- [x] Wix API port + işletme CRUD
- [x] Ana dashboard + işletme kartları
- [x] Yazılar tablosu (TanStack Table)
- [x] Analytics sayfası (SC)
- [ ] SC API refresh + DB cache (cron)
- [ ] Google Ads keyword volume
- [ ] Sitemap + Redirect yönetimi
- [ ] SEO audit
- [ ] Electron wrapper

---

<p align="center">
  <sub>Blakfy &copy; 2026 &mdash; Private repository</sub>
</p>
