/**
 * Utilities for generating embeddings for RAG system
 */
import { pipeline } from '@huggingface/transformers'
import type { FeatureExtractionPipeline } from '@huggingface/transformers'
import path from 'path'
import { env } from 'onnxruntime-node'

// Mark as server-only
import 'server-only'

let embedderPromise: Promise<FeatureExtractionPipeline> | null = null

async function getEmbedder(): Promise<FeatureExtractionPipeline> {
  if (!embedderPromise) {
    embedderPromise = (async () => {
      try {
        const modelPath = path.join(
          process.cwd(),
          'local_models',
          'all-MiniLM-L6-v2'
        )
        console.log('Using model path:', modelPath)

        // Configure ONNX environment for Node.js
        env.wasm.numThreads = 1

        const embedder = await pipeline('feature-extraction', modelPath, {
          local_files_only: true
        })
        return embedder as FeatureExtractionPipeline
      } catch (error) {
        embedderPromise = null
        console.error('Error initializing embedder:', error)
        throw error
      }
    })()
  }
  return embedderPromise
}

/**
 * Generate embeddings for a text using OpenAI's embeddings API
 * @param text - The text to generate an embedding for
 * @returns A vector representation of the text (embedding)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const embedderInstance = await getEmbedder()
    const embedding = await embedderInstance(text, {
      pooling: 'mean',
      normalize: true
    })
    return embedding.data as number[]
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw error
  }
}

/**
 * Generate embeddings for multiple texts in batch
 * @param texts - Array of texts to generate embeddings for
 * @returns Array of embeddings
 */
export async function generateEmbeddingsBatch(
  texts: string[]
): Promise<number[][]> {
  try {
    const results = await Promise.all(
      texts.map(text => generateEmbedding(text))
    )
    return results
  } catch (error) {
    console.error('Error generating embeddings in batch:', error)
    throw error
  }
}
