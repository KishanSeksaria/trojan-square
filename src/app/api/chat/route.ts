// import { generateChatResponse } from '@/lib/ai/chat'
import { generateStreamingChatResponse } from '@/lib/ai/chat'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await generateStreamingChatResponse(messages)
  return result.toDataStreamResponse()
}
