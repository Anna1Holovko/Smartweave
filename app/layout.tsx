import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from './ClientLayout';

export const metadata: Metadata = {
  title: {
    default: 'SmartWeave – Design & Automatyzacja',
    template: '%s | SmartWeave',
  },
  description:
    'SmartWeave projektuje nowoczesne aplikacje webowe i automatyzuje procesy biznesowe. Od pomysłu do działającego produktu.',

  icons: {
    icon: '/assets/favicon.png',
  },

  openGraph: {
    title: 'SmartWeave – Design & Automatyzacja',
    description:
      'Nowoczesne aplikacje webowe i automatyzacja procesów biznesowych. Szybko, nowocześnie, skutecznie.',
    url: 'https://smartweave.pl', // change if needed
    siteName: 'SmartWeave',
    locale: 'pl_PL',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SmartWeave – Design & Automatyzacja',
    description:
      'Projektujemy aplikacje webowe i automatyzujemy procesy biznesowe.',
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
