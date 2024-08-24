import { type NextRequest, NextResponse } from 'next/server'
import { aiUseChatAdapter } from '@upstash/rag-chat/nextjs'
import { ragChat } from '@/lib/rag-chat'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { messages, sessionId } = await req.json()
  const lastMessage = messages[messages.length - 1].content

  const response = await ragChat.chat(lastMessage, {
    streaming: true,
    sessionId,
  })

  return aiUseChatAdapter(response)
}

export async function DELETE(req: NextRequest) {
  try {
    const { sessionId } = await req.json()
    await ragChat.history.deleteMessages({ sessionId })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
