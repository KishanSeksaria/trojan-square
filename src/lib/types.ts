// possible reasons the stream can end
export type FinishReason =
  | 'stop'
  | 'length'
  | 'content-filter'
  | 'tool-calls'
  | 'error'
  | 'other'
  | 'unknown'

// breakdown of token usage
export type CompletionTokenUsage = {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

// the shape of the second callback argument
export type OnFinishOptions = {
  finishReason: FinishReason
  usage: CompletionTokenUsage
}
