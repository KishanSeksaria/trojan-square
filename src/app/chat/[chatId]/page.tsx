'use client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useParams } from 'next/navigation'
import { Message, useChat } from '@ai-sdk/react'
import { Input } from '@/components/ui/input'

function ChatPage() {
  const { chatId } = useParams()
  const chatMessages = useQuery(api.messages.getAllByChatId, {
    // Convert the string chatId to a Convex ID
    chatId: chatId as Id<'chats'>
  })
  const createMessage = useMutation(api.messages.create)

  // Transform Convex messages to AI SDK Message format
  const transformedMessages: Message[] = React.useMemo(() => {
    if (!chatMessages) return []

    return chatMessages.map(msg => ({
      id: msg._id,
      role: msg.role,
      content: msg.content
    }))
  }, [chatMessages])

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id: chatId?.toString(),
    initialMessages: transformedMessages,
    onFinish: async (message: Message) => {
      // Handle the message after it is sent
      console.log('Message sent:', message)
      await createMessage({
        chatId: chatId as Id<'chats'>,
        content: message.content,
        role: 'assistant'
      })
    }
  })

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle>Chat ID</CardTitle>
          <CardDescription>{chatId}</CardDescription>
        </CardHeader>
        <CardContent>
          {messages?.map((message, index) => (
            <div key={index} className='mb-2'>
              <strong>{message.role}:</strong> {message.content}
            </div>
          ))}
        </CardContent>
      </Card>
      <Input
        value={input}
        onChange={handleInputChange}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            createMessage({
              chatId: chatId as Id<'chats'>,
              content: input,
              role: 'user'
            })
            handleSubmit()
          }
        }}
        placeholder='Type your message...'
        className='mt-4'
      />
    </div>
  )
}

export default ChatPage
