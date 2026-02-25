import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from './ClientLayout';
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOGO_URL,
  META_TITLE,
  META_DESCRIPTION,
  OG_TITLE,
  OG_DESCRIPTION,
} from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  title: { default: META_TITLE, template: `%s | ${SITE_NAME}` },
  description: META_DESCRIPTION,
  keywords: [
    'automatyzacja',
    'automatyzacja procesów',
    'design',
    'strony internetowe',
    'branding',
    'identyfikacja wizualna',
    'agenci AI',
    'SEO',
    SITE_NAME,
    'strony WWW dla firm',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/assets/favicon.png', type: 'image/png' },
      { url: '/assets/smartweave-logo.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/assets/smartweave-logo.png',
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'pl_PL',
    type: 'website',
    images: [{ url: '/assets/smartweave-logo.png', width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ['/assets/smartweave-logo.png'],
  },
  formatDetection: { email: true, telephone: true },
  other: { 'geo.region': 'PL' },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#0f172a' };

/** Structured data for Google Search (Organization, WebSite, WebPage, etc.) */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: SITE_LOGO_URL },
      description: 'Design i automatyzacja dla biznesu: strony internetowe, branding, automatyzacja procesów i agenci AI.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'pl-PL',
      mainEntity: { '@id': `${SITE_URL}/#webpage` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: META_TITLE,
      description: META_DESCRIPTION,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#service` },
      inLanguage: 'pl-PL',
      dateModified: new Date().toISOString().split('T')[0],
      primaryImageOfPage: { '@type': 'ImageObject', url: SITE_LOGO_URL },
      potentialAction: {
        '@type': 'ReadAction',
        target: { '@type': 'EntryPoint', urlTemplate: SITE_URL },
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: `${SITE_NAME} – Design i automatyzacja`,
      description: 'Usługi: projektowanie stron WWW, identyfikacja wizualna i branding, automatyzacja procesów i agenci AI, marketing internetowy i SEO.',
      url: SITE_URL,
      areaServed: { '@type': 'Country', name: 'Poland' },
      serviceType: ['Design', 'Automatyzacja procesów', 'Strony internetowe', 'Branding', 'SEO'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Strona główna', item: SITE_URL }],
    },
    {
      '@type': 'ItemList',
      name: 'Usługi SmartWeave',
      description: 'Główne usługi: strony WWW, design, automatyzacja, marketing.',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Projektowanie i wdrażanie stron www' },
        { '@type': 'ListItem', position: 2, name: 'Identyfikacja wizualna i branding' },
        { '@type': 'ListItem', position: 3, name: 'Automatyzacja procesów i agenci AI' },
        { '@type': 'ListItem', position: 4, name: 'Marketing internetowy i SEO' },
      ],
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
        <a href="#main-content" className="skip-link">
          Przejdź do treści
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
