# Blog cover images

Use **one image per article**, generated with AI and **related to the article content**. The same image is used in:

- **Home** - Blog section cards  
- **Blog listing** - `/blog`  
- **Article page** - `/blog/[slug]` hero and social (Open Graph / Twitter)

## Naming

Place files here with these exact names (from `lib/blog.ts`):

| File | Article |
|------|--------|
| `czy-firma-potrzebuje-automatyzacji-cover.png` | Czy Twoja firma potrzebuje automatyzacji? |
| `make-vs-n8n-2026-cover.png` | Make vs n8n 2026 |
| `jak-mapowac-procesy-biznesowe-cover.png` | Jak mapować procesy biznesowe |
| `automatyzacja-procesow-biznesowych-cover.png` | Automatyzacja procesów biznesowych |
| `design-i-automatyzacja-dla-sme-cover.png` | Design i automatyzacja dla małych firm |
| `seo-i-ai-wyszukiwarki-cover.png` | SEO a wyszukiwarki AI |

Replace the placeholder images with AI-generated covers that match each article. Use the same filename; you can use `.jpg` if you change the path in `lib/blog.ts` for that post.

Recommended: 16:10 aspect ratio, min width ~1200px for sharp display and social previews.
