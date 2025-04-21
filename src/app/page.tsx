'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import ChatCard, { questionAnswers } from '@/components/ChatCard'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  return (
    <div className='min-h-screen overflow-y-auto font-sans text-black'>
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
          <h2 className='text-foreground text-fontsize mb-4 font-bold'>
            Your USC Personal Assistant.
          </h2>
          <p className='text-accent-foreground mb-6 text-lg'>
            Get quick answers on courses, events, and more with an AI-powered
            assistant built for the Trojan Family.
          </p>
          <Button
            className='bg-destructive text-accent-foreground'
            onClick={async => {
              router.push('/chat')
            }}
          >
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
        <h3 className='mb-6 text-2xl font-bold'>Features</h3>
        <div className='grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-2'>
          <div className='grid grid-cols-2 gap-8'>
            {questionAnswers.map((item, index) => (
              <ChatCard
                key={index}
                question={item.question}
                answer={item.answer}
              ></ChatCard>
            ))}
          </div>

          {/* Marketplace */}
          <div>
            <h3 className='text-foreground mb-2 text-2xl font-bold'>
              Trojan Market - Buy, Sell, and Trade on Campus
            </h3>
            <p className='text-foreground mb-6 max-w-2xl'>
              A trusted marketplace just for USC students. Find books, tech,
              dorm supplies, or even subleases—powered by your @usc.edu email.
            </p>
            <div className='mb-4 grid grid-cols-3 gap-4'>
              <div className='h-[120px] overflow-hidden rounded-md'>
                <img
                  src='books.jpg'
                  alt='Books'
                  className='h-full w-full object-cover'
                />
              </div>
              {/* <a href="https://storyset.com/people">People illustrations by Storyset</a> */}
              <div className='h-[120px] overflow-hidden rounded-md'>
                <img
                  src='airpods.jpg'
                  alt='Airpods'
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='h-[120px] overflow-hidden rounded-md'>
                <img
                  src='table_lamp.jpg'
                  alt='Table Lamp'
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
            <div className='flex gap-4'>
              <Button
                className='bg-destructive text-accent-foreground'
                // variant='destructive'
                onClick={async () => {
                  router.push('/marketplace')
                }}
              >
                Browse Marketplace
              </Button>
              <Button
                className='bg-muted text-accent-foreground'
                variant='outline'
                onClick={async () => {
                  router.push('/marketplace')
                }}
              >
                List an Item
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
