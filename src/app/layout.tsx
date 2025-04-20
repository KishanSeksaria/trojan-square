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
        className={`${sourceSans.variable} ${sourceSerif.variable} flex min-h-screen flex-col antialiased`}
      >
        <Providers>
          <Header />
          <div className='flex max-h-[calc(100vh-4rem)] flex-1 flex-col items-center justify-center overflow-y-hidden'>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
              <h1 className='text-4xl font-bold'>Welcome to Trojan Square!</h1>
              <p className='text-lg'>
                Please sign in to access the application.
              </p>
            </SignedOut>
          </div>
        </Providers>
      </body>
    </html>
  )
}
