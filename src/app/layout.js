export const metadata = {
  title: 'URL Shortener',
  description: 'Shorten URLs with light speed and access dashboards',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
