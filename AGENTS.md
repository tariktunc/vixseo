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

## Agent Team Yapısı — 6 Agent, 4 Katman

Tüm agent'lar **Opus** modunda çalışır.

### Akış
```
Kullanıcı → user-liaison → prompt-engineer → lead-manager → [frontend-dev, backend-dev] → test-engineer → lead-manager → prompt-engineer → user-liaison → Kullanıcı
```

### Katman 0: Kullanıcı Arayüzü & Çeviri
| Agent | Rol | İletişim |
|-------|-----|----------|
| `user-liaison` | Kullanıcının Türkçe girdisini düzeltir, İngilizceye çevirir, JSON/CSV formatında prompt-engineer'a iletir | ↔ kullanıcı, → prompt-engineer |

### Katman 1: Görev Üretimi
| Agent | Rol | İletişim |
|-------|-----|----------|
| `prompt-engineer` (team-lead) | İngilizce girdiyi JSON task'a dönüştürür, sonucu sunar | ↔ user-liaison, → lead-manager |

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
                  liaison prompt  lead   front  back   test
user-liaison        -      ✅      -      -      -      -
prompt-engineer    ✅       -      ✅     -      -      -
lead-manager        -      ✅      -     ✅     ✅     ✅
frontend-dev        -       -     ✅      -     ✅     ✅
backend-dev         -       -     ✅     ✅      -     ✅
test-engineer       -       -     ✅     ✅     ✅      -
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

### Agent Tool Kullanım Rehberi (Claude Code Best Practices)

**Paralel Başlatma (Zorunlu):**
Bağımsız görevleri tek mesajda birden fazla Agent tool call ile başlat.
```
Agent(subagent_type: "frontend-dev", name: "fe-task", prompt: "...")
Agent(subagent_type: "backend-dev", name: "be-task", prompt: "...")
```

**Background Execution:**
Uzun görevleri arka planda çalıştır — tamamlanma bildirimi otomatik gelir, sleep/polling yapma.
```
Agent(subagent_type: "backend-dev", run_in_background: true, prompt: "...")
```

**Worktree Isolation:**
Riskli değişiklikler (DB migration, büyük refactor) için izole git worktree.
```
Agent(subagent_type: "backend-dev", isolation: "worktree", prompt: "...")
```

**Permission Modes:**
- `auto` — varsayılan
- `acceptEdits` — her edit kullanıcı onayı ister
- `bypassPermissions` — tam yetki (güvenilir işler)
- `plan` — önce plan onayı (büyük refactor)
- `dontAsk` — soru sormadan çalış

**SendMessage ile Agent Devam:**
Çalışan/tamamlanmış agent'a ek talimat — context korunur.
```
SendMessage(to: "fe-task", message: "API kontratı değişti...")
```

**Task İlerleme Takibi:**
```
TaskCreate(description: "...", status: "in_progress")
TaskUpdate(id: "...", status: "completed")
```
Kural: Aynı anda yalnızca BİR görev `in_progress` olabilir.

**Tool Kullanım Hiyerarşisi (Tüm Agent'lar):**
- Read/Edit/Write → dosya işlemleri (Bash ile cat/sed/echo KULLANMA)
- Glob → dosya arama (Bash ile find/ls KULLANMA)
- Grep → içerik arama (Bash ile grep/rg KULLANMA)
- Explore agent → karmaşık, çok dosyalı araştırma
- Bash → yalnızca build, test, git gibi shell gerektiren işler

### Task Dependency System

#### Alanlar
- `blocks`: Bu gorev tamamlanmadan baslatilAMAYACAK gorevler
- `blockedBy`: Bu gorevi ENGELLEYEN gorevler (once onlar bitmeli)
- `owner`: Gorevi sahiplenen agent ismi

#### Ornek
```
TaskCreate({ subject: "Define shared types" })           // task-1
TaskCreate({ subject: "Build API route" })                // task-2
TaskUpdate({ taskId: "2", addBlockedBy: ["1"] })          // API → tiplere bagimli
TaskUpdate({ taskId: "1", owner: "backend-dev", status: "in_progress" })
```

#### Kurallar
- `blockedBy` listesi bos degilse gorev ALINAMAZ
- Tamamlanan gorev bagimli gorevleri otomatik serbest birakir
- Partial implementation'da `completed` YAPMA — `in_progress` kalsin
- Teammate'ler TaskList ile bos gorev arar, ID sirasina gore alir (dusuk ID once)

### TodoWrite — Tek Agent Gorev Takibi

TaskCreate/TaskUpdate takim icin, TodoWrite tek agent icin kullanilir.

#### Alanlar
- `content`: Imperative form — "Run tests", "Fix auth bug"
- `activeForm`: Present continuous — "Running tests", "Fixing auth bug" (spinner'da gosterilir)

#### Kurallar
- Ayni anda TAM OLARAK BIR gorev `in_progress` (daha az degil, daha fazla degil)
- `pending → in_progress → completed` gecis sirasi
- Tamamlanan gorevi HEMEN `completed` yap — batch'leme
- Hata/blocker varsa `completed` YAPMA, `in_progress` kalsin

#### Ne Zaman Kullan
- 3+ adimlik karmasik gorevler
- Kullanici birden fazla is veriyor

#### Ne Zaman KULLANMA
- Tek, basit gorev
- Bilgi sorusu
- 2 adimdan az trivial is

### Fork Pattern — Kendini Kopyalama

`subagent_type` BELIRTMEZSEN, agent kendini fork'lar — parent context'i miras alinir.

#### Ne zaman fork kullan
- Arastirma: Acik uclu sorulari fork'a ver
- Implementasyon: 2+ edit gerektiren isler
- Paralel arastirma: Bagimsiz sorulari ayri fork'lar olarak tek mesajda baslat

#### Kurallar
- Fork'lar ucuz — parent prompt cache'ini paylasir
- Fork'a `model` ATAMA — farkli model cache kullanamaz
- `output_file` OKUMA — mid-flight okuma context'i kirletir
- Sonuc otomatik bildirim olarak gelir — tahmin/fabricate YAPMA
- Fork bitmeden kullanici sorarsa: "Fork hala calisiyor" de, sonuc uydurma
