'use client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useParams } from 'next/navigation'

function ChatPage() {
  // Convert the string chatId to a Convex ID
  const { chatId } = useParams()
  const chatMessages = useQuery(api.messages.getAllByChatId, {
    chatId: chatId as Id<'chats'>
  })

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle>Chat ID</CardTitle>
          <CardDescription>{chatId}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default ChatPage
