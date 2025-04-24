/**
 * Vector search utilities for RAG (Retrieval Augmented Generation) system
 */
import { PrismaClient } from '../../generated/prisma/index'
import { TOP_K_RESULTS, SIMILARITY_THRESHOLD } from './constants'
import { generateEmbedding } from './embeddings'

// Initialize Prisma client
const prisma = new PrismaClient()

export type RAGContext = {
  context: string
  sources: string[]
}

type SearchResult = {
  id: bigint
  url: string
  chunk_index: number
  raw_text: string
  similarity?: number
}

/**
 * Convert a number array to a Postgres vector string
 * @param embedding - Array of numbers representing the embedding
 * @returns Formatted vector string for Postgres
 */
function formatEmbeddingForPostgres(embedding: number[]): string {
  return `[${embedding.join(',')}]`
}

/**
 * Performs a vector similarity search on the pages table
 * @param embedding - The embedding vector to search with
 * @param limit - Maximum number of results to return (default: TOP_K_RESULTS)
 * @param threshold - Minimum similarity score to include (default: SIMILARITY_THRESHOLD)
 * @returns Array of matching Page records with similarity scores
 */
export async function vectorSimilaritySearch(
  embedding: number[],
  limit: number = TOP_K_RESULTS,
  threshold: number = SIMILARITY_THRESHOLD
): Promise<SearchResult[]> {
  try {
    const vectorStr = formatEmbeddingForPostgres(embedding)

    // Using raw query since Prisma doesn't directly support vector operations
    const results = await prisma.$queryRaw<SearchResult[]>`
      SELECT 
        id, 
        url, 
        chunk_index, 
        raw_text,
        1 - (embedding <=> ${vectorStr}::vector) as similarity
      FROM pages
      WHERE 1 - (embedding <=> ${vectorStr}::vector) > ${threshold}
      ORDER BY similarity DESC
      LIMIT ${limit}
    `

    return results
  } catch (error) {
    console.error('Error performing vector search:', error)
    throw error
  }
}

/**
 * Retrieves context from the database based on a query embedding
 * @param query - The query string to generate the embedding from
 * @returns An object containing the context string and sources
 * @throws Error if the embedding generation or search fails
 */
export async function getRAGContext(query: string): Promise<RAGContext> {
  const embedding = await generateEmbedding(query)
  const results = await vectorSimilaritySearch(embedding)

  if (!results.length) {
    return { context: '', sources: [] }
  }

  // Format results into a single context string
  const context = results.reduce((acc: string, result) => {
    acc = acc.concat(`Source: ${result.url}\nContent: ${result.raw_text}\n\n`)
    return acc
  }, '')

  const sources = getSourcesFromResults(results)

  return { context: context.trim(), sources }
}

/**
 * Gets unique URLs from the search results to cite as sources
 */
export function getSourcesFromResults(results: SearchResult[]): string[] {
  const uniqueUrls = new Set<string>()

  for (const result of results) {
    uniqueUrls.add(result.url)
  }

  return Array.from(uniqueUrls)
}
