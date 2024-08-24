import { Bot } from 'lucide-react'
import UrlInput from '@/components/url-input'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className='mx-auto flex min-h-screen max-w-screen-2xl flex-col items-center justify-center'>
      <Bot className='size-16 text-brand-emerald' />

      <h1 className='mt-2 text-center text-2xl font-extrabold text-brand-emerald'>
        Page Whisper
      </h1>

      <p className='mt-1 text-sm'>Enter a URL to get started.</p>

      <UrlInput />
    </div>
  )
}
