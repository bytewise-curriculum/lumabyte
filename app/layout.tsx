import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: 'LumaByte — Full-Service Tech Company',
  description:
    'LumaByte builds scalable web apps, infrastructure, AI integrations, and marketing systems for businesses ready to grow.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
