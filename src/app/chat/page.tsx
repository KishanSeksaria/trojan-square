'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Skeleton } from '@/components/ui/skeleton'

function AskUSCAI() {
  const router = useRouter()
  const createChat = useMutation(api.chats.create)

  useEffect(() => {
    const createNewChat = async () => {
      try {
        const chatId = await createChat({ title: 'New Chat' })
        router.push(`/chat/${chatId}`)
      } catch (error) {
        console.error('Error creating chat:', error)
      }
    }

    void createNewChat()
  }, [router])

  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  )
}

export default AskUSCAI
