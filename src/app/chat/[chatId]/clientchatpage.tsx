'use client'
import EmptyChat from '@/components/EmptyChat'
import MessageBubble from '@/components/MessageBubble'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useChat } from '@ai-sdk/react'
import { Message } from 'ai'
import { useQuery, useMutation } from 'convex/react'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

export default function ClientChatPage() {
  const { chatId } = useParams()
  console.log('Chat ID:', chatId)
  const pathname = usePathname()
  console.log('Chat ID from pathname:', pathname)
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
    <div className='flex h-full w-11/12 flex-col'>
      {messages.length != 0 ? (
        messages?.map(message => (
          <React.Fragment key={message.id}>
            <MessageBubble message={message} />
            <div className='h-4' />
          </React.Fragment>
        ))
      ) : (
        <EmptyChat></EmptyChat>
      )}
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
