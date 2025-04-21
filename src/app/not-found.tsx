import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

function NotFound() {
  return (
    <Card className='w-1/2 overflow-auto'>
      <CardHeader>
        <CardTitle>Oops!! Page Not Found</CardTitle>
        <CardDescription>
          Looks like you are looking for a page that does not exist.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground text-sm'>
          Please check the URL or return to the home page.
        </p>
        <Button variant='outline' className='mt-4'>
          <Link
            href='/'
            className='flex w-full items-center justify-between gap-2'
          >
            <p>Go to Home</p>
            <ArrowRight />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default NotFound
