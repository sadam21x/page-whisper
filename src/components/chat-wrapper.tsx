'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { type Message, useChat } from 'ai/react'
import { toast } from 'sonner'
import { Bot, MessagesSquare, Settings, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import ChatInput from './chat-input'
import ChatBubble from './chat-bubble'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'

type Props = {
  sessionId: string
  initialMessages: Message[]
}

export default function ChatWrapper(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat({
    api: '/api/chat',
    body: { sessionId: props.sessionId },
    initialMessages: props.initialMessages,
  })

  function scrollToBottom() {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }

  async function clearHistory() {
    const toastId = toast.loading('Deleting chat history...')

    const res = await fetch('/api/chat', {
      method: 'DELETE',
      body: JSON.stringify({ sessionId: props.sessionId }),
    })

    if (res.ok) {
      toast.success('Chat history deleted', { id: toastId })
      location.reload()
    } else {
      toast.error('Failed to delete chat history', { id: toastId })
    }
  }

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong', { id: 'chat-error-toast' })
    } else {
      toast.dismiss('chat-error-toast')
    }
  }, [error])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className='flex h-screen flex-col bg-background'>
      <header className='bg-brand-emerald px-4 py-4 text-white lg:px-16'>
        <div className='mx-auto flex max-w-screen-2xl items-center justify-between'>
          <Link href='/' className='flex items-center gap-2'>
            <Bot className='h-6 w-6' />
            <h1 className='text-lg font-medium'>
              {isLoading ? 'Thinking...' : 'Page Whisper'}
            </h1>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='focus:outline-none'>
                <Settings className='h-5 w-5' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem className='hover:outline-none'>
                <button
                  onClick={clearHistory}
                  className='flex items-center gap-2 rounded py-1 pl-2 pr-6 hover:bg-slate-100'
                >
                  <Trash className='h-4 w-4' />
                  Clear history
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div
        ref={containerRef}
        className='flex-1 overflow-auto px-4 py-8 lg:px-16'
      >
        <div className='mx-auto max-w-screen-2xl space-y-4'>
          {messages.length ? (
            messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))
          ) : (
            <div className='my-8 flex flex-col items-center justify-center'>
              <MessagesSquare className='size-16 text-brand-emerald' />

              <h3 className='mt-4 text-center text-xl font-bold text-brand-emerald'>
                You're all set!
              </h3>

              <p className='mt-2 text-center text-sm'>
                Ask your first question
              </p>
            </div>
          )}
        </div>
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
