import type { ReactNode } from 'react';

/** Explicit segment so `revalidatePath('/blog', 'layout')` targets this subtree (incl. `[slug]`). */
export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
