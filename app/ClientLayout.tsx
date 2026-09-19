'use client';

import { usePathname } from 'next/navigation';
import { Chatbot } from './components/Chatbot';
import { ChatbotUiProvider } from './contexts/ChatbotUiContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isArchive = pathname?.startsWith('/smartweave-v1');

  return (
    <ChatbotUiProvider>
      {children}
      {!isArchive && <Chatbot />}
    </ChatbotUiProvider>
  );
}
