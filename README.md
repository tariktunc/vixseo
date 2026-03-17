# blakfy-content-hub

Multi-site Wix blog content management system with AI-assisted writing and automated publishing pipeline.

## Overview

Blakfy Content Hub, Wix platformundaki birden fazla işletme sitesi için SEO odaklı blog içeriği üretir ve otomatik olarak yayınlar. AI destekli içerik pipeline'ı ile yazı hazırlama, SEO doğrulama ve Wix API entegrasyonunu tek bir sistemde birleştirir.

## Active Sites

| Site | Domain | Folder |
|------|--------|--------|
| blakfy | blakfy.com | `sites/blakfy/` |
| ibrahiminyeri | ibrahiminyeri.com | `sites/ibrahiminyeri/` |

## Project Structure

```
blakfy-content-hub/
├── sites/
│   ├── blakfy/
│   │   ├── brand.md          # Brand identity, tone, target audience
│   │   ├── config.json       # Site ID, domain, member ID
│   │   ├── topics.md         # Content plan
│   │   ├── posts/            # Ready-to-publish blog posts (.md)
│   │   └── scripts/
│   │       ├── publish.js    # Wix API publisher
│   │       ├── convert.js    # Markdown → Wix RichContent converter
│   │       ├── categories.json
│   │       └── tags.json
│   ├── ibrahiminyeri/        # Same structure
│   └── _template/            # Template for new sites
├── wix/                      # Wix API reference docs
├── wix-credentials.json      # API keys (shared)
└── WIX-BLOG-FORMAT-REHBERI.md
```

## Workflow

1. **Write** — AI generates SEO-optimized blog post based on `brand.md`, `categories.json`, `tags.json`
2. **Review** — Post presented for approval with SEO checklist
3. **Save** — Approved post saved to `sites/{site}/posts/{slug}.md`
4. **Publish** — Sent to Wix via `publish.js`

```bash
node sites/blakfy/scripts/publish.js
```

## Adding a New Site

1. Copy `sites/_template/` → `sites/{new-site}/`
2. Fill `config.json` with `siteId`, `memberId`, `domain`
3. Fill `brand.md` with brand identity and tone
4. Fetch categories and tags from Wix API
5. Update `categories.json` and `tags.json`

## Tech Stack

- **Platform:** Wix (Blog v3 API)
- **Content Format:** Markdown with YAML frontmatter → Wix RichContent
- **Scripts:** Node.js
- **AI:** Claude (content generation & SEO optimization)
