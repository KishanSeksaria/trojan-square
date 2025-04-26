'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

export default function Error() {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='text-center'>
        <CardTitle className='text-destructive text-4xl font-bold'>
          Chat Not Found
        </CardTitle>
        <CardDescription className='mt-2 text-lg'>
          The chat you&apos;re looking for does not exist or has been removed.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6 text-center'>
        <p className='text-muted-foreground'>
          Please select an existing chat from the sidebar or create a new one.
        </p>

        <Button asChild className='bg-accent text-accent-foreground'>
          <Link href='/chat'>Back to Chat</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
