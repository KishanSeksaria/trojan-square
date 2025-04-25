import { Message } from 'ai'
import React from 'react'

function MessageBubble({ message }: { message: Message }) {
  if (message.role === 'assistant') {
    return (
      <React.Fragment>
        <div className='bg-secondary before:border-r-secondary before:border-b-secondary relative max-w-[60%] self-start rounded-lg p-2 text-sm before:absolute before:bottom-0 before:left-[-8px] before:border-8 before:border-transparent'>
          <p>
            {message.content.length > 0 ? (
              message.content
            ) : (
              <span className='font-light italic'>
                {'calling tool: ' + message?.toolInvocations?.[0].toolName}
              </span>
            )}
          </p>
        </div>
        <span className='text-foreground self-start text-sm'>
          {message.createdAt?.toLocaleTimeString()}
        </span>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <div className='bg-accent before:border-l-accent before:border-b-accent relative max-w-[60%] self-end rounded-lg p-2 text-sm before:absolute before:right-[-8px] before:bottom-0 before:border-8 before:border-transparent'>
          <p>{message.content}</p>
        </div>
        <span className='text-foreground self-end text-sm'>
          {message.createdAt?.toLocaleTimeString()}
        </span>
      </React.Fragment>
    )
  }
}

export default MessageBubble
