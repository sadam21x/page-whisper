import { RAGChat, openai } from '@upstash/rag-chat'
import { redis } from './redis'

export const ragChat = new RAGChat({
  model: openai('gpt-4-turbo'),
  redis: redis,
})
