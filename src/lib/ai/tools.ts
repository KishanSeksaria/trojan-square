import { tool } from 'ai'
import { z } from 'zod'
import { getRAGContext } from '../rag/vectorSearch'
import FirecrawlApp from '@mendable/firecrawl-js'
import Exa from 'exa-js'

export const exa = new Exa(process.env.EXA_API_KEY)

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })

/**
 * Tool to get information from the knowledge base to answer questions.
 * @param question - The user's question
 * @returns The relevant context from the knowledge base
 */
export const ragTool = tool({
  description: `get information from your knowledge base to answer questions.`,
  parameters: z.object({
    question: z.string().describe("the user's question")
  }),
  execute: async ({ question }) => getRAGContext(question)
})

/**
 * Tool to scrape a URL for information and get HTML or Markdown content.
 * @param urlToCrawl - The URL to crawl
 * @returns The scraped content in HTML or Markdown format
 */
export const webScrapeTool = tool({
  description: 'Scrape a URL for information and get HTML or Markdown content',
  parameters: z.object({
    urlToCrawl: z
      .string()
      .url()
      .min(1)
      .max(100)
      .describe('The URL to crawl (including http:// or https://)')
  }),
  execute: async ({ urlToCrawl }) => {
    const crawlResponse = await app.crawlUrl(urlToCrawl, {
      limit: 1,
      scrapeOptions: {
        formats: ['markdown', 'html']
      }
    })
    if (!crawlResponse.success) {
      throw new Error(`Failed to crawl: ${crawlResponse.error}`)
    }
    return crawlResponse.data
  }
})

/**
 * Tool to search the web for up-to-date information.
 * @param query - The search query
 * @returns The search results
 */
export const webSearchTool = tool({
  description: 'Search the web for up-to-date information',
  parameters: z.object({
    query: z.string().min(1).max(100).describe('The search query')
  }),
  execute: async ({ query }) => {
    const { results } = await exa.searchAndContents(query, {
      livecrawl: 'always',
      numResults: 3
    })
    return results.map(result => ({
      title: result.title,
      url: result.url,
      content: result.text.slice(0, 1000), // take just the first 1000 characters
      publishedDate: result.publishedDate
    }))
  }
})

export const tools = {
  searchKnowledgeBase: ragTool
  // webSearch: webSearchTool
}
