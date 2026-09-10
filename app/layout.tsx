import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
// import LiveChatWidget from '@/components/LiveChatWidget'
import SocialSidebar from '@/components/social-sidebar'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { ProposalModalProvider } from '@/hooks/use-proposal-modal'
import { SiteSettingsProvider } from '@/components/site-settings-provider'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY, type SiteSettingsData } from '@/sanity/lib/queries'
import { SITE_URL } from '@/lib/site-url'

const GTM_ID = 'GTM-K2K4QPL7'

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})
const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  weight: ['400', '500'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AI Engineering & Cloud Solutions Company | Beno Support",
  description:
    "Beno Support delivers AI engineering, software development, cloud infrastructure, cybersecurity, and digital transformation services for startups, SMBs, and enterprises worldwide.",
  generator: "beno",
  verification: {
    google: "lE4vg7aW2w_QoKNrrz60oMipgr3CqCfQLElOgss2BgQ",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetched once here (root layout wraps every page) and made available to
  // any client component via context — so no individual page needs to fetch
  // or pass this down itself. Falls back to null (→ each component's own
  // hardcoded defaults) if Sanity is unreachable or has no data yet.
  const siteSettings = await client
    .fetch<SiteSettingsData | null>(SITE_SETTINGS_QUERY)
    .catch(() => null)

  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} bg-background`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SiteSettingsProvider siteSettings={siteSettings ?? undefined}>
          <ProposalModalProvider>
            {children}
          </ProposalModalProvider>
          <SocialSidebar />
          {/* <LiveChatWidget /> */}
          <WhatsAppFloat whatsappNumber={siteSettings?.whatsappNumber} />
        </SiteSettingsProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
