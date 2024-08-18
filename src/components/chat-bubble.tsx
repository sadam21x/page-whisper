import type { Message } from 'ai/react'
import { Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  message: Message
}

export default function ChatBubble(props: Props) {
  const content = props.message.content
  const isUserMessage = props.message.role === 'user'

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isUserMessage && 'flex-row-reverse'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full p-2',
          isUserMessage ? 'bg-muted' : 'bg-slate-100'
        )}
      >
        {isUserMessage ? (
          <User className='h-5 w-5' />
        ) : (
          <Bot className='h-5 w-5' />
        )}
      </div>

      <div
        className={cn(
          'max-w-[70%] rounded-lg px-3 py-2',
          isUserMessage ? 'bg-brand-emerald text-white' : 'bg-muted'
        )}
      >
        <p>{content}</p>
      </div>
    </div>
  )
}
