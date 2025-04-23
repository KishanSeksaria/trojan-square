// import { generateChatResponse } from '@/lib/ai/chat'
import { generateChatResponse } from '@/lib/ai/chat'
import { getSystemMessage } from '@/lib/ai/prompts'
import { getRAGContext } from '@/lib/rag/vectorSearch'
import { groq } from '@ai-sdk/groq'
import { streamText, tool } from 'ai'
import { z } from 'zod'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await generateChatResponse(messages)
  return result.toDataStreamResponse()
}
