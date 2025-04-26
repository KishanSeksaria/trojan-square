/**
 * Constants and configuration for RAG (Retrieval Augmented Generation) system
 */

// Number of similar documents to retrieve
export const TOP_K_RESULTS = 50

// Minimum similarity score (0-1) to consider a result relevant
// Adjusted to 0.3 to allow more semantic matches while still filtering noise
export const SIMILARITY_THRESHOLD = 0.3

// OpenAI embedding dimension size
export const EMBEDDING_DIMENSIONALITY = 384
