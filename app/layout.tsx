import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { Provider } from '@/components/provider';
import { site, organization } from '@/lib/site';
import './globals.css';
import './content.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.title}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: '武汉大学动漫协会' }],
  icons: { icon: '/favicon.ico' },
  openGraph: { type: 'website', locale: 'zh_CN', title: site.title, description: site.description, images: ['/WHUDAYS.png'] },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="zh-CN" suppressHydrationWarning>
    <body className="flex min-h-screen flex-col">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Provider>{children}</Provider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-LQLQ2CEQ64" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        if (location.hostname === 'whudays.org' || location.hostname === 'www.whudays.org') {
          gtag('config', 'G-LQLQ2CEQ64');
        }
      `}</Script>
    </body>
  </html>;
}
