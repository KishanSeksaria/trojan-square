import { type Metadata } from 'next'
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Header from '@/components/Header'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans'
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif'
})

export const metadata: Metadata = {
  title: 'Trojan Square',
  description:
    'Welcome to the Trojan Square - Your one-stop solution for all things USC!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning className='h-full'>
      <body
        className={`${sourceSans.variable} ${sourceSerif.variable} flex h-full min-h-screen flex-col font-sans antialiased`}
      >
        <Providers>
          <Header />
          <main className='h-full flex-1'>
            <SignedIn>
              <div className='flex h-full flex-col items-center justify-center p-4'>
                {children}
              </div>
            </SignedIn>
            <SignedOut>
              <div className='flex h-full flex-col items-center justify-center p-4'>
                <h1 className='text-4xl font-bold'>
                  Welcome to Trojan Square!
                </h1>
                <p className='text-lg'>
                  Please sign in to access the application.
                </p>
              </div>
            </SignedOut>
          </main>
        </Providers>
      </body>
    </html>
  )
}
