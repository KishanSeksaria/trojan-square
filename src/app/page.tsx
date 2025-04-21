import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className='min-h-screen overflow-y-auto bg-white font-sans text-black'>
      {/* Navbar */}
      {/* <header className='flex items-center justify-between p-6 shadow-sm'>
        <h1 className='flex items-center gap-2 text-2xl font-bold'>
          <Image
            src='/icons/trojan-logo.svg'
            alt='Trojan Logo'
            width={32}
            height={32}
          />
          TROJAN SQUARE
        </h1>
        <nav className='flex gap-6 text-sm'>
          <Link href='#features'>Features</Link>
        </nav>
        <Button className='bg-yellow-400 text-black hover:bg-yellow-500'>
          Try It Now
        </Button>
      </header> */}

      {/* Hero Section */}
      <section className='grid items-center gap-8 px-8 py-16 md:grid-cols-2'>
        <div>
          <h2 className='mb-4 text-4xl font-bold'>
            Your USC Personal Assistant.
          </h2>
          <p className='mb-6 text-lg text-gray-700'>
            Get quick answers on courses, events, and more with an AI-powered
            assistant built for the Trojan Family.
          </p>
          <Button className='bg-[#941C2F] text-white hover:bg-[#7e1a29]'>
            Ask Trojan Square
          </Button>
        </div>
        <div className='relative'>
          <img
            src='/chatbot-avatar.svg'
            alt='Assistant'
            width={250}
            height={250}
            className='mx-auto'
          />
          {/* <a href="https://storyset.com/online">Online illustrations by Storyset</a> */}
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='px-8 py-12'>
        <h3 className='mb-8 text-2xl font-bold'>Features</h3>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <div className='rounded-lg border bg-white p-4 shadow-sm'>
            <h4 className='mb-2 font-semibold'>
              What courses is Professor Saty teaching next semester?
            </h4>
            <p className='text-sm text-gray-600'>
              Professor Saty is teaching CSCI 572 and CSCI 585 in the fall.
            </p>
          </div>
          <div className='rounded-lg border bg-white p-4 shadow-sm'>
            <h4 className='mb-2 font-semibold'>
              What events are happening next week?
            </h4>
            <p className='text-sm text-gray-600'>
              The USC vs. UCLA football game is on Saturday at 7 PM.
            </p>
          </div>
        </div>

        {/* Marketplace */}
        <div className='mt-16'>
          <h3 className='mb-2 text-2xl font-bold'>
            Trojan Market - Buy, Sell, and Trade on Campus
          </h3>
          <p className='mb-6 max-w-2xl text-gray-700'>
            A trusted marketplace just for USC students. Find books, tech, dorm
            supplies, or even subleases—powered by your @usc.edu email.
          </p>
          <div className='mb-4 grid grid-cols-3 gap-4'>
            <div className='h-[80px] w-[120px] overflow-hidden rounded-md'>
              <img
                src='books.svg'
                alt='Books'
                className='h-full w-full object-cover'
              />
            </div>
            {/* <a href="https://storyset.com/people">People illustrations by Storyset</a> */}
            <div className='h-[80px] w-[120px] overflow-hidden rounded-md'>
              <img
                src='airpods.svg'
                alt='Airpods'
                className='h-full w-full object-cover'
              />
            </div>
            <div className='h-[80px] w-[120px] overflow-hidden rounded-md'>
              <img
                src='dorm.svg'
                alt='Dorm Bed'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <Button className='bg-[#941C2F] text-white'>
              Browse Marketplace
            </Button>
            <Button variant='outline'>List an Item</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
