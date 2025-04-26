'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function GlobalError() {
  return (
    <html lang='en'>
      <head>
        <title>Global Error</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <div className='flex h-screen w-screen items-center justify-center p-4'>
          <Card className='w-full max-w-md'>
            <CardHeader className='text-center'>
              <CardTitle className='text-destructive text-4xl font-bold'>
                Something went wrong!
              </CardTitle>
              <CardDescription className='mt-2 text-lg'>
                An unexpected error occurred while processing your request.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6 text-center'>
              <p className='text-muted-foreground'>
                Please try reloading the page. If the problem persists, try
                again later.
              </p>

              <Button
                className='bg-primary text-primary-foreground'
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}
