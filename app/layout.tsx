import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from './ClientLayout';

export const metadata: Metadata = {
  title: 'SmartWeave - Vibe Coding & Automatyzacja',
  description:
    'Projektujemy nowoczesne aplikacje webowe i automatyzujemy Twoje procesy biznesowe. Od koncepcji do działającego produktu.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="bg-slate-950 text-white antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
