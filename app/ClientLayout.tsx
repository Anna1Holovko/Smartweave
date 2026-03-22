'use client';

import { CustomCursor } from './components/CustomCursor';
import { Chatbot } from './components/Chatbot';
import { ChatbotUiProvider } from './contexts/ChatbotUiContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChatbotUiProvider>
      <CustomCursor />
      {children}
      <Chatbot />
    </ChatbotUiProvider>
  );
}
