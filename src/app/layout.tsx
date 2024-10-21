import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'

import './globals.css'
import Footer from '@/components/landing/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/Toasts'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const font = Poppins({ weight: ['400', '600', '800'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PicTeller - Crea Imágenes Temáticas',
  description: 'Transforma imágenes de productos con promociones y temáticas especiales para compartir en redes sociales. Genera descripciones, cambia fondos y agrega overlays en segundos con PicTeller.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className={`${font.className}`}>
            {children}
            <Footer />
          </div>
          <Toaster richColors position="bottom-right" expand />
        </ThemeProvider>
      </body>
    </html>
  )
}
