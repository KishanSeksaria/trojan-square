'use client'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ChatCard, { questionAnswers } from '@/components/ChatCard'

export default function HomePage() {
  const router = useRouter()
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='grid items-center gap-8 px-8 py-16 md:grid-cols-2'>
        <div>
          <h2 className='mb-4 text-4xl font-bold'>
            Your USC Personal Assistant.
          </h2>
          <p className='text-muted-foreground mb-6 text-lg'>
            Get quick answers on courses, events, and more with an AI-powered
            assistant built for the Trojan Family.
          </p>
          <Button
            variant='destructive'
            onClick={() => {
              router.push('/chat')
            }}
          >
            Ask Trojan Square
          </Button>
        </div>
        <div className='relative'>
          <Image
            src='/chatbot-avatar.svg'
            alt='Assistant'
            width={250}
            height={250}
            className='mx-auto'
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='px-8 py-12'>
        <h3 className='mb-6 text-2xl font-bold'>Features</h3>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='grid grid-cols-2 gap-4'>
            {questionAnswers.map((item, index) => (
              <ChatCard
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>

          {/* Marketplace */}
          <div>
            <h3 className='mb-2 text-2xl font-bold'>
              Trojan Market - Buy, Sell, and Trade on Campus
            </h3>
            <p className='text-muted-foreground mb-6 max-w-2xl'>
              A trusted marketplace just for USC students. Find books, tech,
              dorm supplies, or even subleases—powered by your @usc.edu email.
            </p>
            <div className='mb-4 grid grid-cols-3 gap-4'>
              <div className='h-[120px] overflow-hidden rounded-md'>
                <Image
                  src='/books.jpg'
                  alt='Books'
                  width={200}
                  height={120}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='h-[120px] overflow-hidden rounded-md'>
                <Image
                  src='/airpods.jpg'
                  alt='Airpods'
                  width={200}
                  height={120}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='h-[120px] overflow-hidden rounded-md'>
                <Image
                  src='/table_lamp.jpg'
                  alt='Table Lamp'
                  width={200}
                  height={120}
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
            <div className='flex gap-4'>
              <Button
                variant='destructive'
                onClick={() => router.push('/marketplace')}
              >
                Browse Marketplace
              </Button>
              <Button
                variant='outline'
                onClick={() => router.push('/marketplace')}
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
