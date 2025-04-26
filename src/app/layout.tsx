import { type Metadata } from 'next'
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Header from '@/components/Header'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'

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
          <div className='flex max-h-[calc(100vh-var(--height-header))] flex-1 flex-col items-center justify-center'>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
              <SignedOutMessage />
            </SignedOut>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export function SignedOutMessage() {
  return (
    <section className='flex flex-col items-center justify-center px-4 text-center'>
      <Image
        src='/logo.png'
        alt='Trojan Square Logo'
        width={500}
        height={500}
        className='mx-auto'
      />
      <p className='mt-4 text-xl font-medium'>Your USC Personal Assistant</p>
      <p className='mt-2 max-w-xl text-base font-light'>
        Find courses, events, and campus essentials. Tailored for the Trojan
        Family.
      </p>
      <p className='mt-2 max-w-xl text-base font-light'>
        Please sign in to access the application
      </p>
    </section>
  )
}
