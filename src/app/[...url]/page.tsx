import { cookies } from 'next/headers'
import { redis } from '@/lib/redis'
import { ragChat } from '@/lib/rag-chat'
import { reconstructUrl } from '@/lib/utils'
import ChatWrapper from '@/components/chat-wrapper'
import InitError from '@/components/init-error'

type Props = {
  params: {
    url: string | string[] | undefined
  }
}

export const dynamic = 'force-dynamic'

async function initialize(props: Props) {
  const url = reconstructUrl(props.params.url as string[])
  const sessionCookie = cookies().get('sessionId')?.value
  const sessionId = `${url}--${sessionCookie}`.replace(/\//g, '')

  try {
    const isAlreadyIndexed = await redis.sismember('indexed-urls', url)

    if (!isAlreadyIndexed) {
      const addToContext = await ragChat.context.add({
        type: 'html',
        source: url,
      })

      if (!addToContext.success) {
        throw new Error(addToContext.error)
      }

      await redis.sadd('indexed-urls', url)
    }

    const initialMessages = await ragChat.history.getMessages({
      sessionId,
      amount: 10,
    })

    return {
      sessionId,
      initialMessages,
    }
  } catch (error: any) {
    return { error: error.message ?? 'Internal Server Error' }
  }
}

export default async function Page(props: Props) {
  const data = await initialize(props)

  if (data.error) {
    return <InitError error={data.error} />
  }

  return (
    <ChatWrapper
      sessionId={data.sessionId!}
      initialMessages={data.initialMessages!}
    />
  )
}
