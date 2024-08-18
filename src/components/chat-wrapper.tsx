'use client'

import { type Message, useChat } from 'ai/react'
import { Bot, MessageSquare } from 'lucide-react'
import ChatInput from './chat-input'
import ChatBubble from './chat-bubble'

type Props = {
  sessionId: string
  initialMessages: Message[]
}

export default function ChatWrapper(props: Props) {
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      api: '/api/chat',
      body: { sessionId: props.sessionId },
      initialMessages: props.initialMessages,
    })

  return (
    <div className='flex h-screen flex-col bg-background'>
      <header className='bg-brand-emerald px-4 py-4 text-white lg:px-16'>
        <div className='mx-auto flex max-w-screen-2xl items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Bot className='h-6 w-6' />
            <h1 className='text-lg font-medium'>Page Whisper</h1>
          </div>
        </div>
      </header>

      <div className='flex-1 overflow-auto px-4 py-8 lg:px-16'>
        <div className='mx-auto max-w-screen-2xl space-y-4'>
          {messages.length ? (
            messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))
          ) : (
            <div className='my-8 flex flex-col items-center justify-center'>
              <MessageSquare className='size-16 text-brand-emerald' />

              <h3 className='mt-4 text-center text-xl font-bold text-brand-emerald'>
                You're all set!
              </h3>

              <p className='mt-2 text-center text-sm'>
                Ask your first question to get started.
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
