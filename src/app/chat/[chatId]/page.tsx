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
import MessageBubble from '@/components/MessageBubble'
import { Separator } from '@/components/ui/separator'

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
      content: msg.content,
      createdAt: new Date(msg.createdAt)
    }))
  }, [chatMessages])

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id: chatId?.toString(),
    initialMessages: transformedMessages,
    maxSteps: 3,
    onFinish: async (message: Message) => {
      // Handle the message after it is sent
      console.log('Message received from assistant:', message)
      await createMessage({
        chatId: chatId as Id<'chats'>,
        content: message.content,
        role: 'assistant'
      })
    }
  })

  return (
    <div className='flex h-full w-11/12 flex-col items-center justify-center'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Chat ID</CardTitle>
          <CardDescription>{chatId}</CardDescription>
        </CardHeader>
        <CardContent>
          {messages?.map(message => (
            <React.Fragment key={message.id}>
              <MessageBubble message={message} />
              <Separator />
            </React.Fragment>
          ))}
        </CardContent>
      </Card>

      <Input
        value={input}
        onChange={handleInputChange}
        onKeyDown={async e => {
          if (e.key === 'Enter') {
            await createMessage({
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
