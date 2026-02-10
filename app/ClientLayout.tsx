'use client';

import { CustomCursor } from './components/CustomCursor';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}
