'use client';

import { useState } from 'react';
import { Download, ShoppingCart, Lock, X } from 'lucide-react';
import type { Ebook } from '@/lib/ebooks';

type Props = { book: Ebook };

export function EbookDownloadButton({ book }: Props) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isProtected = book.protected === true;
  const hasDirectDownload = book.downloadUrl && !isProtected;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/ebook-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: book.id, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Nie udało się pobrać pliku.');
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = res.headers.get('Content-Disposition')?.match(/filename="(.+)"/)?.[1] || `${book.id}.epub`;
      a.click();
      URL.revokeObjectURL(url);
      setOpen(false);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  if (isProtected) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 text-white cta-gradient-animated hover:scale-105 hover:shadow-[0_0_28px_rgba(167,139,250,0.4)]"
        >
          <Download className="w-4 h-4" aria-hidden />
          Pobierz e-book
        </button>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            aria-modal="true"
            role="dialog"
            onClick={() => { setOpen(false); setError(''); setPassword(''); }}
          >
            <div
              className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700/60 shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => { setOpen(false); setError(''); setPassword(''); }}
                className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50"
                aria-label="Zamknij"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-purple-400" aria-hidden />
                <h3 className="text-lg font-semibold text-white">Pobierz e-book</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">{book.title}</p>
              <form onSubmit={handleSubmit}>
                <label htmlFor="ebook-password" className="block text-sm font-medium text-slate-300 mb-2">
                  Hasło
                </label>
                <input
                  id="ebook-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Wprowadź hasło"
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoComplete="current-password"
                  disabled={loading}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-400" role="alert">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full font-semibold py-3 px-4 text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? 'Pobieranie…' : 'Pobierz'}
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  if (hasDirectDownload) {
    return (
      <a
        href={book.downloadUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 text-white cta-gradient-animated hover:scale-105 hover:shadow-[0_0_28px_rgba(167,139,250,0.4)]"
      >
        <Download className="w-4 h-4" aria-hidden />
        Pobierz e-book
      </a>
    );
  }

  return (
    <a
      href={book.buyUrl}
      target={book.buyUrl.startsWith('http') ? '_blank' : undefined}
      rel={book.buyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full font-semibold text-sm sm:text-base transition-all h-12 min-h-12 px-6 sm:px-8 text-white cta-gradient-animated hover:scale-105 hover:shadow-[0_0_28px_rgba(167,139,250,0.4)]"
    >
      <ShoppingCart className="w-4 h-4" aria-hidden />
      Kup e-book
    </a>
  );
}
