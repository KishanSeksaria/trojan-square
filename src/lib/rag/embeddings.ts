type EmbedRequestBody = {
  textToEmbed: string
}

type EmbedResponse = {
  embeddings: number[][]
}

/**
 * Generate embeddings for a text using OpenAI's embeddings API
 * @param text - The text to generate an embedding for
 * @returns A vector representation of the text (embedding)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await fetch(
      process.env.EMBEDDING_GENERATION_ENDPOINT || '',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ textToEmbed: text } as EmbedRequestBody)
      }
    )
    console.log('Response from embedder:', response)

    const data = (await response.json()) as EmbedResponse
    console.log('Response from embedder:', data)

    return data.embeddings[0] as number[]
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
