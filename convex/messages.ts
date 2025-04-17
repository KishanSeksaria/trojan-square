import z from 'zod'
import { zid } from 'convex-helpers/server/zod'
import { zMutation, zQuery } from './utils'
import { Id } from './_generated/dataModel'
import { getAuthenticatedUser } from './users'

// Get all messages for a chat
export const getByChatId = zQuery({
  args: {
    chatId: zid('chats')
  },
  handler: async (ctx, { chatId }) => {
    // Verify chat exists and user has access
    const chat = await ctx.db.get(chatId)
    if (!chat) {
      throw new Error('Chat not found')
    }

    const user = await getAuthenticatedUser(ctx)

    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }

    // Get messages
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_chatId', q => q.eq('chatId', chatId))
      .order('asc')
      .collect()

    return messages
  }
})

// Create a new message
export const create = zMutation({
  args: {
    chatId: zid('chats'),
    content: z.string(),
    role: z.enum(['user', 'assistant'])
  },
  handler: async (ctx, { chatId, content, role }) => {
    // Verify chat exists and user has access
    const chat = await ctx.db.get(chatId)
    if (!chat) {
      throw new Error('Chat not found')
    }

    const user = await getAuthenticatedUser(ctx)

    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }

    // Create message
    const messageId = await ctx.db.insert('messages', {
      chatId,
      content,
      role,
      createdAt: Date.now()
    })

    return messageId
  }
})

// Delete a specific message
export const remove = zMutation({
  args: {
    id: zid('messages')
  },
  handler: async (ctx, { id }) => {
    const message = await ctx.db.get(id)
    if (!message) {
      throw new Error('Message not found')
    }

    // Verify chat ownership
    const chat = await ctx.db.get(message.chatId as Id<'chats'>)
    if (!chat) {
      throw new Error('Chat not found')
    }

    const user = await getAuthenticatedUser(ctx)

    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }

    await ctx.db.delete(id)
  }
})
