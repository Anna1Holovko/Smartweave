import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from './ClientLayout';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  title: {
    default:
      'Design i automatyzacja dla firm | Strony WWW, branding, automatyzacja procesów | SmartWeave',
    template: '%s | SmartWeave',
  },
  description:
    'SmartWeave: design i automatyzacja dla biznesu. Tworzymy strony internetowe, identyfikację wizualną oraz wdrażamy automatyzację procesów i agentów AI. SEO, branding, integracje.',
  keywords: [
    'automatyzacja',
    'automatyzacja procesów',
    'design',
    'strony internetowe',
    'branding',
    'identyfikacja wizualna',
    'agenci AI',
    'SEO',
    'SmartWeave',
    'strony WWW dla firm',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
  icons: { icon: '/assets/favicon.png' },
  openGraph: {
    title: 'Design i automatyzacja dla firm – strony WWW, branding, automatyzacja | SmartWeave',
    description: 'Projektujemy strony i wdrażamy automatyzację procesów. Design i UTOMATYZACJA dla małych i średnich firm.',
    url: SITE_URL,
    siteName: 'SmartWeave',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design i automatyzacja – SmartWeave',
    description: 'Strony WWW, branding i automatyzacja procesów dla firm.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'SmartWeave',
      url: SITE_URL,
      description: 'Design i automatyzacja dla biznesu: strony internetowe, branding, automatyzacja procesów i agenci AI.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'SmartWeave',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'pl-PL',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'SmartWeave – Design i automatyzacja',
      description: 'Usługi: projektowanie stron WWW, identyfikacja wizualna i branding, automatyzacja procesów i agenci AI, marketing internetowy i SEO.',
      url: SITE_URL,
      areaServed: 'PL',
      serviceType: ['Design', 'Automatyzacja procesów', 'Strony internetowe', 'Branding', 'SEO'],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-slate-950 text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
