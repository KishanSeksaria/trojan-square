import { Button } from '@/components/ui/button'
import Link from 'next/link'

function NotFound() {
  // return (
  //   <Card className='w-1/2 overflow-auto'>
  //     <CardHeader>
  //       <CardTitle>Oops!! Page Not Found</CardTitle>
  //       <CardDescription>
  //         Looks like you are looking for a page that does not exist.
  //       </CardDescription>
  //     </CardHeader>
  //     <CardContent>
  //       <p className='text-muted-foreground text-sm'>
  //         Please check the URL or return to the home page.
  //       </p>
  //       <Button variant='outline' className='mt-4'>
  //         <Link
  //           href='/'
  //           className='flex w-full items-center justify-between gap-2'
  //         >
  //           <p>Go to Home</p>
  //           <ArrowRight />
  //         </Link>
  //       </Button>
  //     </CardContent>
  //   </Card>
  // )

  return (
    // <div className='flex flex-row p-8'>
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

    /* <div className='relative ml-8 h-60 w-60'>
        <Image
          src='/trojan_square.png'
          alt='Trojan Helmet Illustration'
          layout='fill'
          objectFit='contain'
        />
      </div> */
    // </div>
  )
}

export default NotFound
