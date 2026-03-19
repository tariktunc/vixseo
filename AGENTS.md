<!-- BEGIN:nextjs-agent-rules -->
# Bu Next.js'i tanımıyorsun — Önce oku, sonra yaz

Bu versiyon (16.2.0) breaking changes içeriyor. Kod yazmadan önce:
1. `node_modules/next/dist/docs/` içinde ilgili kılavuzu oku
2. Deprecation uyarılarını dikkate al (`middleware` → `proxy` oldu)
3. `src/proxy.ts` dosyası Clerk clerkMiddleware içerir — middleware.ts yok

## Her Görev Öncesi Kontrol Listesi

- [ ] Değiştireceğin dosyayı **Read** ile oku (satır numaraları dahil)
- [ ] Aynı işi yapan mevcut bir dosya/bileşen var mı? **Glob/Grep** ile kontrol et
- [ ] Tip tanımları `src/types/` klasöründe mi? Var olanı kullan, yenisini açma
- [ ] API route mu yazıyorsun? `requirePermission()` guard'ı ekle
- [ ] Client bileşeni mi? `'use client'` yalnızca gerekliyse ekle — hook dosyalarına **asla** ekleme

## Sık Yapılan Hatalar (Yapma)

| Hata | Doğrusu |
|------|---------|
| `sessionClaims` ile rol okuma | `clerkClient().users.getUser(userId)` → `publicMetadata` |
| `'use client'` hook dosyasına eklemek | Hook'lar directive almaz |
| `TooltipTrigger asChild` kullanmak | base-ui desteklemiyor, `<span tabIndex={0}>` ile sar |
| `any` tipi kullanmak | Spesifik tip veya `unknown` kullan |
| `interface` yerine `type` kullanmamak | `type` tercih et |
| Wrapper envelope response | Raw data döndür: `NextResponse.json(data)` |
| `catch (err)` gereksiz parametre | `catch` (parametresiz) yaz |

## Hızlı Dosya Haritası

```
src/
├── app/
│   ├── (public)/          → landing, sign-in, sign-up
│   ├── (dashboard)/       → auth gerektiren sayfalar
│   │   └── [business]/    → işletmeye özel sayfalar
│   └── api/
│       └── [business]/    → business API route'ları
├── components/
│   ├── ui/                → shadcn bileşenleri (değiştirme)
│   └── [feature]/         → feature bileşenleri
├── hooks/                 → use-*.ts hook'lar
├── lib/
│   ├── auth.ts            → requirePermission, requireBusinessAccess
│   ├── db.ts              → Drizzle singleton
│   └── constants.ts       → sabitler
├── db/
│   ├── schema.ts          → tablo tanımları
│   └── default-businesses.ts → merkezi işletme listesi
└── types/                 → tip tanımları
```
<!-- END:nextjs-agent-rules -->
