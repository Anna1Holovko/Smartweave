import { SITE_URL } from './site';

/**
 * Fallback paths when Notion has no page cover yet. Filenames under `public/assets/blog/`; overrides
 * when the name is not `{slug}-cover.png`. The site prefers **Notion** `cover_url` when present
 * (see lib/blog-adapter.ts). Notion: `npm run sync:notion-covers -- --from-code` (linki) lub
 * `npm run upload:notion-covers` (upload z `public/assets/blog/`, `--replace` nadpisuje okładki).
 */
export const BLOG_COVER_FILENAME_BY_SLUG: Record<string, string> = {
  /** Matches `DEFAULT_BLOG_COVER` / hero asset name in repo. */
  'automatyzacja-procesow-agenci-ai-odzyskaj-czas': 'automatyzacja-agenci-ai-odzyskaj-czas-cover.png',
};

export function blogCoverFilenameForSlug(slug: string): string {
  const s = slug.trim();
  return BLOG_COVER_FILENAME_BY_SLUG[s] ?? `${s}-cover.png`;
}

/** Path for `next/image` and static hosting, e.g. `/assets/blog/foo-cover.png`. */
export function blogCoverPublicPath(slug: string): string {
  return `/assets/blog/${blogCoverFilenameForSlug(slug)}`;
}

/** Absolute URL for Open Graph, Notion external cover, etc. */
export function blogCoverAbsoluteUrl(slug: string, siteUrl: string = SITE_URL): string {
  const path = blogCoverPublicPath(slug);
  return `${siteUrl.replace(/\/$/, '')}${path}`;
}
