import { revalidatePath, revalidateTag } from 'next/cache';

/** Invalidates Notion list cache + ISR for pages that embed blog data. */
export async function revalidateBlogCache(): Promise<{ ok: true; revalidated: string[] }> {
  revalidateTag('notion-blog');
  revalidatePath('/blog');
  revalidatePath('/');
  revalidatePath('/sitemap.xml');
  return {
    ok: true,
    revalidated: ['tag:notion-blog', '/blog', '/', '/sitemap.xml'],
  };
}
