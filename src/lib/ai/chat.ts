// import { groq } from '@ai-sdk/groq'
// import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { Message, streamText } from 'ai'
import { tools } from './tools'
import { SYSTEM_MESSAGE } from './prompts'

/**
 * Generates a chat response using the AI model and RAG context
 * @param messages - Array of chat messages
 * @returns A stream of text responses from the AI model
 */
export async function generateStreamingChatResponse(messages: Message[]) {
  return streamText({
    // model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),
    // model: openai('gpt-3.5-turbo'),
    model: google('gemini-2.0-flash-001', {
      useSearchGrounding: true
    }),
    // model: google('gemini-2.0-flash-001'),
    system: SYSTEM_MESSAGE,
    messages,
    tools,
    toolCallStreaming: true,
    temperature: 0.3
  })
}
