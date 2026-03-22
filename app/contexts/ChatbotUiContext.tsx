'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type ChatbotUiContextValue = {
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
};

const ChatbotUiContext = createContext<ChatbotUiContextValue | null>(null);

export function ChatbotUiProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const value = useMemo(() => ({ chatOpen, setChatOpen }), [chatOpen]);
  return <ChatbotUiContext.Provider value={value}>{children}</ChatbotUiContext.Provider>;
}

/** ScrollToTop / others: safe outside provider (e.g. tests) → false */
export function useChatbotOpen(): boolean {
  return useContext(ChatbotUiContext)?.chatOpen ?? false;
}

export function useChatbotUi(): ChatbotUiContextValue {
  const ctx = useContext(ChatbotUiContext);
  if (!ctx) {
    throw new Error('useChatbotUi must be used within ChatbotUiProvider');
  }
  return ctx;
}
