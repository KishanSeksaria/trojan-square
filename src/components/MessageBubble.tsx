import { cn } from '@/lib/utils'
import { Message } from 'ai'

// TODO: Fix UI later, this is just a placeholder
function MessageBubble({ message }: { message: Message }) {
  return (
    <div
      className={cn('p-2', message.role === 'user' ? 'text-end' : 'text-start')}
    >
      <p>
        <strong>{message.role}:</strong> {message.content}
      </p>
      <span className='text-sm text-gray-500'>
        {message.createdAt?.toLocaleTimeString()}
      </span>
    </div>
  )
}

export default MessageBubble
