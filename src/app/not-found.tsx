import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

function NotFound() {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='text-center'>
        <CardTitle className='text-destructive text-6xl font-extrabold'>
          404
        </CardTitle>
        <CardDescription className='mt-2 text-xl font-medium'>
          Oops! Page not found
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6 text-center'>
        <p className='text-muted-foreground'>
          The page you are looking for does not exist or has been moved.
        </p>

        <Button asChild className='bg-destructive text-accent-foreground'>
          <Link href='/'>Back to Home</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default NotFound
