'use client';

import { Chatbot } from './components/Chatbot';
import { ChatbotUiProvider } from './contexts/ChatbotUiContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChatbotUiProvider>
      {children}
      <Chatbot />
    </ChatbotUiProvider>
  );
}
