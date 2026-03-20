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

---

## Agent Team Yapısı — 5 Agent, 3 Katman

Tüm agent'lar **Opus** modunda çalışır.

### Akış
```
Kullanıcı → prompt-engineer → lead-manager → [frontend-dev, backend-dev] → test-engineer → lead-manager → prompt-engineer → Kullanıcı
```

### Katman 1: Arayüz & Görev Üretimi
| Agent | Rol | İletişim |
|-------|-----|----------|
| `prompt-engineer` (team-lead) | Kullanıcı ile konuşur, isteği JSON task'a dönüştürür, sonucu sunar | → lead-manager |

### Katman 2: Koordinasyon
| Agent | Rol | İletişim |
|-------|-----|----------|
| `lead-manager` | Görevleri parçalar, agent'lara atar, sonuçları toplar, çakışmaları çözer | ↔ tüm agent'lar |

### Katman 3: Uygulama & Kalite
| Agent | Rol | İletişim |
|-------|-----|----------|
| `frontend-dev` | Sayfalar, bileşenler, hook'lar, UI/UX, responsive tasarım | ↔ lead-manager, backend-dev, test-engineer |
| `backend-dev` | API route, DB, auth, Wix/GSC/Ads entegrasyonu, script, migration | ↔ lead-manager, frontend-dev, test-engineer |
| `test-engineer` | Build, TypeScript, kod kuralları denetimi, doğrulama (kalite kapısı) | ↔ lead-manager, frontend-dev, backend-dev |

### Agent Arası İletişim Matrisi
```
                  prompt  lead   front  back   test
prompt-engineer     -      ✅     -      -      -
lead-manager       ✅      -     ✅     ✅     ✅
frontend-dev        -     ✅      -     ✅     ✅
backend-dev         -     ✅     ✅      -     ✅
test-engineer       -     ✅     ✅     ✅      -
```

### prompt-engineer Görev Üretimi

```json
{
  "id": "task-XXX",
  "title": "Görev başlığı",
  "priority": "high|medium|low",
  "agents": ["frontend-dev", "backend-dev"],
  "files": {
    "read": ["src/path/to/file.ts"],
    "modify": ["src/path/to/file.ts"]
  },
  "steps": ["Adım 1", "Adım 2"],
  "rules": ["Özel kural"],
  "test": "Kabul kriteri",
  "depends_on": ["task-YYY"]
}
```

### Prompt Mühendisliği İlkeleri
- Tek sorumluluk: bir görev, bir dosya grubu
- Dosya adı + satır referansı + referans dosya ver
- Paralel çalışabilecek görevleri aynı anda başlat
- Belirsizlik bırakma — beklenen çıktıyı açıkça tanımla
- JSON formatında task oluştur — serbest metin verme
- depends_on ile görev bağımlılıkları belirt
