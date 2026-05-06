import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'O Guga Barbearia | Setúbal',
  description: 'Barbearia tradicional em Setúbal. Cortes, barbas e tratamentos de excelência. Praça Marquês de Pombal 26, 2900-562 Setúbal.',
  keywords: 'barbearia, setúbal, corte de cabelo, barba, barbearia setúbal, o guga barbearia',
  openGraph: {
    title: 'O Guga Barbearia | Setúbal',
    description: 'Barbearia tradicional em Setúbal. Cortes, barbas e tratamentos de excelência.',
    type: 'website',
    locale: 'pt_PT',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian text-cream antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
