'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function UrlInput() {
  const [input, setInput] = useState(
    'https://en.wikipedia.org/wiki/Lionel_Messi'
  )

  const [isRedirecting, setIsRedirecting] = useState(false)

  const router = useRouter()

  function handleSubmit() {
    if (input && !isRedirecting) {
      setIsRedirecting(true)
      router.push(`/${input}`)
    }
  }

  return (
    <>
      <input
        value={input}
        placeholder='Enter a URL...'
        className='mt-4 w-[80%] resize-none rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none lg:w-[50%]'
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit()
          }
        }}
        autoFocus
      />

      <Button
        size='sm'
        className='mt-4'
        onClick={handleSubmit}
        disabled={isRedirecting}
      >
        {isRedirecting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        Let's Go 🚀
      </Button>
    </>
  )
}
