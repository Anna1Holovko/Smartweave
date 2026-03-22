import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Syne, Manrope } from 'next/font/google';
import './globals.css';
import { ClientLayout } from './ClientLayout';

const syne = Syne({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-syne',
  display: 'swap',
});
const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-manrope',
  display: 'swap',
});
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOGO_URL,
  META_TITLE,
  META_DESCRIPTION,
  OG_TITLE,
  OG_DESCRIPTION,
} from '@/lib/site';
import { CART_STORAGE_KEY } from '@/lib/cart';

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
    'automatyzacja procesów',
    'strony WWW dla firm',
    'strony internetowe',
    'design',
    'branding',
    'identyfikacja wizualna',
    'agenci AI',
    'SEO',
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

  // ✅ GOOGLE-FRIENDLY FAVICON SETUP (redesign: W + sparkle icon)
  icons: {
    icon: [
      { url: '/favicon.png?v=4', type: 'image/png', sizes: 'any' },
      { url: '/favicon.ico?v=4', type: 'image/x-icon' },
      { url: '/assets/smartweave-logo-ai.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico?v=4',
    apple: '/apple-touch-icon.png?v=4',
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
  themeColor: '#0d0d0f',
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
        'Automatyzacja procesów biznesowych, agenci AI, strony internetowe, chatboty i aplikacje webowe. Design i wdrożenia dla biznesu',
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
      name: `${SITE_NAME} - Design i automatyzacja`,
      description:
        'Automatyzacja procesów biznesowych, agenci AI, strony internetowe, chatboty i aplikacje webowe. Branding, SEO',
      url: SITE_URL,
      areaServed: {
        '@type': 'Country',
        name: 'Poland',
      },
      serviceType: [
        'Automatyzacja procesów biznesowych',
        'Agenci AI',
        'Strony internetowe',
        'Identyfikacja wizualna i branding',
        'Chatboty',
        'Aplikacje webowe',
        'SEO',
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
        'Automatyzacja procesów biznesowych, agenci AI, strony internetowe, identyfikacja wizualna, chatboty i aplikacje webowe',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Automatyzacja procesów biznesowych z wykorzystaniem AI' },
        { '@type': 'ListItem', position: 2, name: 'Agenci AI' },
        { '@type': 'ListItem', position: 3, name: 'Strony internetowe' },
        { '@type': 'ListItem', position: 4, name: 'Identyfikacja wizualna i branding' },
        { '@type': 'ListItem', position: 5, name: 'Chatboty' },
        { '@type': 'ListItem', position: 6, name: 'Aplikacje webowe' },
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
    <html lang="pl" className={`${syne.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-[var(--bg-graphite)] text-[#e4e4e7] antialiased">
        {/* E-book cart: reset stored count on each full page load (new entry to the site / refresh). */}
        <Script id="smartweave-cart-reset" strategy="beforeInteractive">
          {`try{localStorage.removeItem(${JSON.stringify(CART_STORAGE_KEY)});}catch(e){}`}
        </Script>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="ffa403a8-8585-416e-8368-83968786fece"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        {/* Google tag (gtag.js) with Consent Mode – respect Cookiebot */}
        <Script id="gtag-consent-default" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_personalization': 'denied',
              'ad_user_data': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y5RJCLXP2Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'G-Y5RJCLXP2Z');
            window.addEventListener('CookiebotOnConsentReady', function() {
              if (window.Cookiebot && window.Cookiebot.consent && window.Cookiebot.consent.statistics) {
                gtag('consent', 'update', { 'analytics_storage': 'granted' });
              }
            });
            if (window.Cookiebot && window.Cookiebot.consent && window.Cookiebot.consent.statistics) {
              gtag('consent', 'update', { 'analytics_storage': 'granted' });
            }
          `}
        </Script>
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
