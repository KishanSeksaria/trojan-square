import { tool as createTool } from 'ai'
import { z } from 'zod'
import { getRAGContext } from '../rag/vectorSearch'

/**
 * Tool to get information from the knowledge base to answer questions.
 * @param question - The user's question
 * @returns The relevant context from the knowledge base
 */
export const ragTool = createTool({
  description: `get information from your knowledge base to answer questions.`,
  parameters: z.object({
    question: z.string().describe("the user's question")
  }),
  execute: async ({ question }) => getRAGContext(question)
})

export const tools = {
  getInformation: ragTool
}
