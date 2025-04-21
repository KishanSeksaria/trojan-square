import { Button } from '@/components/ui/button'
import Link from 'next/link'

function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-destructive text-6xl font-extrabold'>404</h1>
      <p className='mt-2 mb-6 text-xl'>Oops! Page not found</p>
      <p className='text-muted-foreground mb-6 text-center sm:w-1/2'>
        The page you are looking for does not exist or has been moved.
      </p>

      <Button asChild className='bg-destructive text-accent-foreground'>
        <Link href='/'>Back to Home</Link>
      </Button>
    </div>
  )
}

export default NotFound
