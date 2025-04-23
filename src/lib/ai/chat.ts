import { groq } from '@ai-sdk/groq'
import { Message, streamText } from 'ai'
import { getSystemMessage } from './prompts'
import { tools } from './tools'

/**
 * Generates a chat response using the AI model and RAG context
 * @param messages - Array of chat messages
 * @returns A stream of text responses from the AI model
 */
export async function generateStreamingChatResponse(messages: Message[]) {
  return streamText({
    model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),
    system: getSystemMessage(),
    messages,
    tools,
    toolCallStreaming: true,
    temperature: 0.7
  })
}
