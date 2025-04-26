'use client'
import MessageBubble from '@/components/MessageBubble'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { OnFinishOptions } from '@/lib/types'
import { useChat } from '@ai-sdk/react'
import { Message } from 'ai'
import { useQuery, useMutation } from 'convex/react'
import { SendHorizontal } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

// TODO: Automatically focus the input field when the page loads
export default function ClientChatPage() {
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
    onFinish: async (message: Message, options: OnFinishOptions) => {
      // Handle the message after it is sent
      console.log('Message received:', message)
      if (options.finishReason === 'stop') {
        await createMessage({
          chatId: chatId as Id<'chats'>,
          content: message.content,
          role: 'assistant'
        })
      }
    }
  })

  const sendChatMessage = async (input: string) => {
    // Check if the input is empty
    if (!input) return

    // Create a new message in Convex
    await createMessage({
      chatId: chatId as Id<'chats'>,
      content: input,
      role: 'user'
    })

    // Send the message to the AI SDK
    handleSubmit()
  }

  // Scroll to the bottom of the chat when new messages are added
  const bottomRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Focus the input field when the component mounts
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <>
      <div className='flex h-full w-full flex-col px-4 pt-2'>
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
        <div ref={bottomRef} />
      </div>
      <div className='bg-background sticky bottom-0 flex w-full items-center p-2'>
        <Input
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
          onKeyDown={async e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              await sendChatMessage(input)
            }
          }}
          placeholder='Type your message here...'
        />
        <Button
          type='submit'
          variant='ghost'
          size='icon'
          className='absolute right-2 my-auto'
          onClick={async () => {
            await sendChatMessage(input)
          }}
        >
          <SendHorizontal />
        </Button>
      </div>
    </>
  )
}

function EmptyChat() {
  return (
    <div className='text-foreground flex h-full w-full items-center justify-center text-center'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <p className='text-md'>Hey buddy, ready to dive in?</p>
        <p className='text-muted-foreground text-sm'>
          Start a conversation with me by typing in the input box below.
        </p>
      </div>
    </div>
  )
}
