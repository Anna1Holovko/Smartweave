import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from './ClientLayout';

export const metadata: Metadata = {
  title: {
    default:
      'Tworzenie stron internetowych na AI i automatyzacja dla firm | SmartWeave',
    template: '%s | SmartWeave',
  },

  description:
    'Tworzymy nowoczesne strony internetowe na AI i automatyzacje dla małych i średnich firm. Szybkie, responsywne i zoptymalizowane pod SEO, aby Twoja firma zdobywała klientów online.',

  icons: {
    icon: '/assets/favicon.png',
  },

  openGraph: {
    title:
      'Strony internetowe na AI i automatyzacja dla firm – SmartWeave',
    description:
      'Projektujemy strony WWW na AI i wdrażamy automatyzacje, które zwiększają widoczność w Google i pomagają firmom rosnąć.',
    url: 'https://smartweave.pl',
    siteName: 'SmartWeave',
    locale: 'pl_PL',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Strony internetowe na AI i automatyzacja – SmartWeave',
    description:
      'Nowoczesne strony WWW na AI i automatyzacje dla małych i średnich firm.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-slate-950 text-white antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
