'use client'

import type { useChat } from 'ai/react'
import { Send } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

type Props = {
  input: string
  setInput: ReturnType<typeof useChat>['setInput']
  handleInputChange: ReturnType<typeof useChat>['handleInputChange']
  handleSubmit: ReturnType<typeof useChat>['handleSubmit']
}

export default function ChatInput(props: Props) {
  return (
    <form onSubmit={props.handleSubmit} className='bg-muted px-4 py-4 lg:px-16'>
      <div className='mx-auto flex max-w-screen-2xl items-center gap-2'>
        <Textarea
          value={props.input}
          placeholder='Enter your question...'
          className='flex-1 resize-none rounded-lg border-none focus:ring-0 focus-visible:ring-0'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              props.handleSubmit()
              props.setInput('')
            }
          }}
          onChange={props.handleInputChange}
          autoFocus
        />

        <Button variant='ghost' size='icon' className='hover:bg-muted/50'>
          <Send className='h-5 w-5' />
          <span className='sr-only'>Send</span>
        </Button>
      </div>
    </form>
  )
}
