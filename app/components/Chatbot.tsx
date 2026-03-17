'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

const FLOWISE_CHATBOT_URL =
  process.env.NEXT_PUBLIC_FLOWISE_CHATBOT_URL ||
  'https://cloud.flowiseai.com/api/v1/prediction/1b5ce866-e8a2-4590-bb90-f98d4a5fc779';

type Message = { role: 'user' | 'bot'; text: string };

async function query(question: string): Promise<string> {
  const response = await fetch(FLOWISE_CHATBOT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.message || 'Błąd połączenia');
  const text = result?.text ?? result?.result?.text ?? result?.message ?? (typeof result === 'string' ? result : JSON.stringify(result));
  return String(text);
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [open, messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setLoading(true);
    try {
      const reply = await query(text);
      setMessages((m) => [...m, { role: 'bot', text: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'bot', text: 'Przepraszam, coś poszło nie tak. Spróbuj ponownie za chwilę.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-[#d8f17b] text-[#0e0e0e] shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#d8f17b]/50"
        aria-label={open ? 'Zamknij czat' : 'Otwórz czat'}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-[9997] flex w-[min(100vw-3rem,400px)] flex-col rounded-2xl border border-white/10 bg-[var(--bg-2)] shadow-xl"
          style={{ height: 'min(70vh, 520px)' }}
        >
          <div className="border-b border-white/10 px-4 py-3">
            <h2 className="font-semibold text-[#e4e4e7]">Czat z SmartWeave</h2>
            <p className="text-xs text-zinc-500">Zadaj pytanie o automatyzację, AI lub nasze usługi.</p>
          </div>
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-sm text-zinc-500">Napisz wiadomość, aby rozpocząć.</p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#d8f17b] text-[#0e0e0e]'
                      : 'bg-white/10 text-[#e4e4e7]'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-zinc-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Piszę…</span>
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2 border-t border-white/10 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Napisz wiadomość…"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-[#e4e4e7] placeholder-zinc-500 focus:border-[#d8f17b]/50 focus:outline-none focus:ring-1 focus:ring-[#d8f17b]/50"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d8f17b] text-[#0e0e0e] transition hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Wyślij"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
