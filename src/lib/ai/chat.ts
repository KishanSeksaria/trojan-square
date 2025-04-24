import { groq } from '@ai-sdk/groq'
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
    model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),
    system: SYSTEM_MESSAGE,
    messages,
    tools,
    toolCallStreaming: true,
    temperature: 0.7
  })
}
