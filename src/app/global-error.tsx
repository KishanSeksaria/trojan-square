'use client'

import { Button } from '@/components/ui/button'

export default function GlobalError() {
  return (
    <html lang='en'>
      <head>
        <title>Global Error</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className='bg-gray-100'>
        <div className='flex h-screen w-screen items-center justify-center bg-gray-100'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-red-600'>
              Something went wrong!
            </h1>
            <p className='mt-4 text-lg text-gray-700'>
              Please try again later.
            </p>
            <Button className='mt-6' onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
