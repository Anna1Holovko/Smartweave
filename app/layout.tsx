import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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

  title: {
    default: META_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: META_DESCRIPTION,

  keywords: [
    'projektowanie stron www dla firm',
    'strony pod leada B2B',
    'automatyzacja procesów AI',
    'wdrożenia AI',
    'architektura automatyzacji',
    'agenci AI dla firm',
    'strony internetowe generujące leady',
    'AI dla biznesu',
    SITE_NAME,
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  // ✅ GOOGLE-FRIENDLY FAVICON SETUP
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/assets/smartweave-logo.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: SITE_LOGO_URL,
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [SITE_LOGO_URL],
  },

  formatDetection: {
    email: true,
    telephone: true,
  },

  other: {
    'geo.region': 'PL',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

/* ============================= */
/*        STRUCTURED DATA        */
/* ============================= */

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO_URL,
      },
      description:
        'Projektowanie stron www dla firm, automatyzacja procesów AI, strony pod leada B2B, agenci AI. Partner strategiczny.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'pl-PL',
      mainEntity: {
        '@id': `${SITE_URL}/#webpage`,
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: META_TITLE,
      description: META_DESCRIPTION,
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#service`,
      },
      inLanguage: 'pl-PL',
      dateModified: new Date().toISOString().split('T')[0],
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: SITE_LOGO_URL,
      },
      potentialAction: {
        '@type': 'ReadAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: SITE_URL,
        },
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: `${SITE_NAME} – strony B2B, automatyzacja AI, agenci AI`,
      description:
        'Projektowanie stron www dla firm, automatyzacja procesów AI, strony pod leada B2B, wdrożenia AI, agenci AI. Partner strategiczny.',
      url: SITE_URL,
      areaServed: {
        '@type': 'Country',
        name: 'Poland',
      },
      serviceType: [
        'Projektowanie stron www dla firm',
        'Strony pod leada B2B',
        'Automatyzacja procesów AI',
        'Agenci AI dla firm',
        'Wdrożenia AI',
        'Architektura automatyzacji',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Strona główna',
          item: SITE_URL,
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Usługi SmartWeave',
      description:
        'Projektowanie stron www dla firm, automatyzacja procesów AI, strony pod leada B2B, agenci AI.',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Projektowanie stron www dla firm' },
        { '@type': 'ListItem', position: 2, name: 'Automatyzacja procesów AI' },
        { '@type': 'ListItem', position: 3, name: 'Agenci AI dla firm' },
      ],
    },
  ],
};

/* ============================= */
/*           LAYOUT              */
/* ============================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-slate-950 text-white antialiased">
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="ffa403a8-8585-416e-8368-83968786fece"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        <a href="#main-content" className="skip-link">
          Przejdź do treści
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
