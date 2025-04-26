import { Message } from 'ai'
import React from 'react'
import Markdown from 'react-markdown'
import { cn } from '@/lib/utils'

function MessageBubble({ message }: { message: Message }) {
  const isAssistant = message.role === 'assistant'

  return (
    <>
      <div
        className={cn(
          'before:bg-background relative max-w-[60%] rounded-lg p-2 text-sm',
          isAssistant
            ? 'bg-secondary dark:bg-secondary/60 before:border-r-secondary self-start'
            : 'bg-accent before:border-l-accent self-end'
        )}
      >
        {isAssistant ? (
          message.parts ? (
            message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return <Markdown key={i}>{part.text}</Markdown>
                case 'tool-invocation':
                  return (
                    <span key={i} className='font-light italic'>
                      {'calling tool: ' + part.toolInvocation.toolName}
                    </span>
                  )
                case 'reasoning':
                  return <div key={i}>{part.reasoning}</div>
                default:
                  return null
              }
            })
          ) : message.content ? (
            // Fallback for backward compatibility
            <Markdown>{message.content}</Markdown>
          ) : (
            <span className='font-light italic'>
              {'calling tool: ' + message?.toolInvocations?.[0].toolName}
            </span>
          )
        ) : (
          <p className='whitespace-pre-wrap'>{message.content}</p>
        )}
      </div>
      <span
        className={cn(
          'text-muted-foreground text-xs',
          isAssistant ? 'self-start' : 'self-end'
        )}
      >
        {message.createdAt?.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit'
        })}
      </span>
    </>
  )
}

export default MessageBubble
