import Head from 'next/head';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: 'LinkMini - Shorten URLs',
  description: 'Shorten URLs with light speed and access dashboards',
}

export default function RootLayout({ children }) {
  return (
    <>
    <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-MTTGSPSHN3" />
    </html>
    </>
  )
}
