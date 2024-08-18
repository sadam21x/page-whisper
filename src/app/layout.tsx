import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Page Whisper | Ask anything about the page you are on',
  description: 'Ask anything about the page you are on',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(inter.variable, 'font-inter antialiased')}>
        <Toaster position='top-center' theme='light' richColors expand />
        {children}
      </body>
    </html>
  )
}
