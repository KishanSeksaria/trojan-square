import z from 'zod'
import { zid } from 'convex-helpers/server/zod'
import { zMutation, zQuery } from './utils'
import { getAuthenticatedUser } from './users'

// Get a specific chat by ID
export const getById = zQuery({
  args: { id: zid('chats') },
  handler: async (ctx, { id }) => {
    const chat = await ctx.db.get(id)
    if (!chat) {
      throw new Error('Chat not found')
    }
    return chat
  }
})

// Get all chats for a user
export const getAllByUser = zQuery({
  args: {},
  handler: async ctx => {
    try {
      const user = await getAuthenticatedUser(ctx)
      const chats = await ctx.db
        .query('chats')
        .withIndex('by_userId', q => q.eq('userId', user._id))
        .order('desc')
        .collect()

      return chats
    } catch {
      return []
    }
  }
})

// Create a new chat
export const create = zMutation({
  args: {
    title: z.string()
  },
  handler: async (ctx, { title }) => {
    const user = await getAuthenticatedUser(ctx)

    const chatId = await ctx.db.insert('chats', {
      userId: user._id,
      title,
      createdAt: Date.now()
    })

    return chatId
  }
})

// Update a chat's title
export const update = zMutation({
  args: {
    id: zid('chats'),
    title: z.string()
  },
  handler: async (ctx, { id, title }) => {
    const chat = await ctx.db.get(id)
    if (!chat) {
      throw new Error('Chat not found')
    }

    const user = await getAuthenticatedUser(ctx)

    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }

    await ctx.db.patch(id, { title })
  }
})

// Delete a chat and its messages
export const remove = zMutation({
  args: {
    id: zid('chats')
  },
  handler: async (ctx, { id }) => {
    const chat = await ctx.db.get(id)
    if (!chat) {
      throw new Error('Chat not found')
    }

    const user = await getAuthenticatedUser(ctx)

    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }

    // Delete all messages in the chat
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_chatId', q => q.eq('chatId', id))
      .collect()

    for (const message of messages) {
      await ctx.db.delete(message._id)
    }

    // Delete the chat
    await ctx.db.delete(id)
  }
})
