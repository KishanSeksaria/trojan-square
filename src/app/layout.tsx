import { type Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Header from '@/components/Header'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
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
        className={`${geistSans.variable} ${geistMono.variable} flex h-full min-h-screen flex-col antialiased`}
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
