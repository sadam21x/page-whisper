import { cookies } from 'next/headers'
import { redis } from '@/lib/redis'
import { ragChat } from '@/lib/rag-chat'
import { reconstructUrl } from '@/lib/utils'
import ChatWrapper from '@/components/chat-wrapper'

type Props = {
  params: {
    url: string | string[] | undefined
  }
}

export const dynamic = 'force-dynamic'

export default async function Page(props: Props) {
  const url = reconstructUrl(props.params.url as string[])
  const isAlreadyIndexed = await redis.sismember('indexed-urls', url)
  const sessionCookie = cookies().get('sessionId')?.value
  const sessionId = `${reconstructUrl}--${sessionCookie}`.replace(/\//g, '')

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: 'html',
      source: url,
    })

    await redis.sadd('indexed-urls', url)
  }

  const initialMessages = await ragChat.history.getMessages({
    sessionId,
    amount: 10,
  })

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
}
