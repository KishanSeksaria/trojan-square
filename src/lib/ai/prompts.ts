/**
 * Generates a system message for an AI assistant based on whether RAG context is provided.
 *
 * @param ragContext - Optional string containing relevant information from USC websites.
 * If provided, returns a specialized USC information assistant prompt.
 * If not provided, returns a general assistant prompt.
 *
 * @returns A string containing the system message to be used for the AI assistant.
 * The returned message will either be:
 * - A specialized USC assistant prompt that includes the provided context and instructions
 * for citing sources (when ragContext is provided)
 * - A general assistant prompt for concise responses (when ragContext is not provided)
 */
export const getSystemMessage = () => {
  return `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    If no relevant information is found in the tool calls, respond, "Sorry, I don't know."`
}
// export const getSystemMessage = (ragContext?: string) => {
//   if (ragContext) {
//     return `You are a helpful assistant specialized in USC (University of Southern California) information.
//        Use the following relevant information from USC websites to answer the user's questions:

//        ${ragContext}

//        Answer the user's questions as best as you can using the provided context. When information is available in the context, use it.
//        When the context doesn't have relevant information, say you don't have that specific information.
//        Always cite the source URL when you use information from the provided context.
//        Answer the questions in detail.`
//   }

//   return "You are a helpful assistant. Answer the user's questions as best as you can. Answer questions in a short and concise manner."
// }
