import { groq } from '@ai-sdk/groq'
import { streamText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: groq('deepseek-r1-distill-llama-70b'),
    system:
      "You are a helpful assistant. Answer the user's questions as best as you can. Answer questions in a short and concise manner.",
    messages
  })

  return result.toDataStreamResponse()
}
