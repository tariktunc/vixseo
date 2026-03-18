# 🚀 blakfy-content-hub
Sezer
> Multi-site Wix blog content management system with AI-assisted writing and automated publishing pipeline.

![Wix](https://img.shields.io/badge/Platform-Wix-0C6EFC?style=flat-square&logo=wix&logoColor=white)
![Node.js](https://img.shields.io/badge/Scripts-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Claude AI](https://img.shields.io/badge/AI-Claude-CC785C?style=flat-square)
![Sites](https://img.shields.io/badge/Active%20Sites-2-brightgreen?style=flat-square)

---

## 📌 Overview

Blakfy Content Hub, Wix platformundaki birden fazla işletme sitesi için SEO odaklı blog içeriği üretir ve otomatik olarak yayınlar. AI destekli içerik pipeline'ı ile yazı hazırlama, SEO doğrulama ve Wix API entegrasyonunu tek bir sistemde birleştirir.

---

## 🌐 Active Sites

| Site | Domain | Klasör |
|------|--------|--------|
| 🔵 blakfy | [blakfy.com](https://blakfy.com) | `sites/blakfy/` |
| 🟢 ibrahiminyeri | [ibrahiminyeri.com](https://ibrahiminyeri.com) | `sites/ibrahiminyeri/` |

---

## 📁 Project Structure

```
blakfy-content-hub/
├── 📂 sites/
│   ├── 📂 blakfy/
│   │   ├── 📄 brand.md           # Marka kimliği, ton, hedef kitle
│   │   ├── ⚙️  config.json        # Site ID, domain, member ID
│   │   ├── 📋 topics.md          # İçerik planı
│   │   ├── 📂 posts/             # Hazır blog yazıları (.md)
│   │   └── 📂 scripts/
│   │       ├── 🚀 publish.js     # Wix API yayıncı
│   │       ├── 🔄 convert.js     # Markdown → Wix RichContent
│   │       ├── 🏷️  categories.json
│   │       └── 🔖 tags.json
│   ├── 📂 ibrahiminyeri/         # Aynı yapı
│   └── 📂 _template/             # Yeni site şablonu
├── 📂 wix/                       # Wix API referans dökümanları
├── 🔑 wix-credentials.json       # API anahtarları
└── 📖 WIX-BLOG-FORMAT-REHBERI.md
```

---

## ⚡ Workflow

```
✍️  Yaz  →  👀 İncele  →  💾 Kaydet  →  🚀 Yayınla
```

| Adım | Açıklama |
|------|----------|
| ✍️ **Write** | AI, `brand.md` + `categories.json` + `tags.json` okuyarak SEO yazısı üretir |
| 👀 **Review** | Yazı SEO kontrol listesiyle birlikte onaya sunulur |
| 💾 **Save** | Onaylanan yazı `sites/{site}/posts/{slug}.md` olarak kaydedilir |
| 🚀 **Publish** | `publish.js` ile Wix API'ye gönderilir |

```bash
node sites/blakfy/scripts/publish.js
```

---

## ➕ Adding a New Site

```bash
# 1. Template'i kopyala
cp -r sites/_template/ sites/{yeni-site}/

# 2. config.json doldur → siteId, memberId, domain
# 3. brand.md doldur → marka kimliği, ton
# 4. Wix API'den kategori ve tag'leri çek
# 5. categories.json ve tags.json güncelle
```

---

## 🛠️ Tech Stack

| Katman | Teknoloji |
|--------|-----------|
| Platform | Wix Blog v3 API |
| İçerik Formatı | Markdown + YAML frontmatter → Wix RichContent |
| Scriptler | Node.js |
| AI | Claude (içerik üretimi & SEO optimizasyonu) |
