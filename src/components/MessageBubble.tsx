import { cn } from '@/lib/utils'
import { Message } from 'ai'

// TODO: Fix UI later, this is just a placeholder
function MessageBubble({ message }: { message: Message }) {
  return (
    <div
      className={cn('p-2', message.role === 'user' ? 'text-end' : 'text-start')}
    >
      <p>
        <strong>{message.role}:</strong>
      </p>
      <p>
        {message.content.length > 0 ? (
          message.content
        ) : (
          <span className='font-light italic'>
            {'calling tool: ' + message?.toolInvocations?.[0].toolName}
          </span>
        )}
      </p>
      <span className='text-sm text-gray-500'>
        {message.createdAt?.toLocaleTimeString()}
      </span>
    </div>
  )
}

export default MessageBubble
