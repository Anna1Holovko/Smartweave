'use client';

import { CustomCursor } from './components/CustomCursor';
import { Chatbot } from './components/Chatbot';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      {children}
      <Chatbot />
    </>
  );
}
