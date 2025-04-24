/**
 * Chats Management Module
 *
 * This module provides functions for managing chat conversations in the application.
 * It includes operations for retrieving, creating, updating, and deleting chats,
 * with appropriate authorization checks to ensure users can only access their own data.
 */
import z from 'zod'
import { zid } from 'convex-helpers/server/zod'
import {
  zInternalAction,
  zInternalMutation,
  zInternalQuery,
  zMutation,
  zQuery
} from './utils'
import { getAuthenticatedUser } from './users'
import { generateObject } from 'ai'
import { groq } from '@ai-sdk/groq'
import { internal } from './_generated/api'

/**
 * Retrieve a specific chat by its ID
 *
 * @param id - The ID of the chat to retrieve
 * @returns The chat object
 * @throws Error if chat not found or user not authorized to access it
 */
export const getById = zQuery({
  args: { chatId: zid('chats') },
  handler: async (ctx, { chatId }) => {
    const chat = await ctx.db.get(chatId)
    if (!chat) {
      throw new Error('Chat not found')
    }
    const user = await getAuthenticatedUser(ctx)
    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }
    return chat
  }
})

/**
 * Get all chats for the current user (internal version)
 * This is an internal function not exposed to the client directly
 *
 * @param userId - The ID of the user to get chats for
 * @returns Array of chat objects in descending order (newest first)
 * @returns Empty array if user not authenticated
 */
export const getAllByUser = zInternalQuery({
  args: { userId: zid('users') },
  handler: async (ctx, { userId }) => {
    try {
      const chats = await ctx.db
        .query('chats')
        .withIndex('by_userId', q => q.eq('userId', userId))
        .order('desc') // Order by creation time descending (newest first)
        .collect()

      return chats
    } catch {
      // Return empty array if user is not authenticated
      return []
    }
  }
})

/**
 * Create a new chat for the current user
 *
 * @param title - The title of the new chat
 * @returns The ID of the newly created chat
 * @throws Error if user not authenticated
 */
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

/**
 * Update the title of an existing chat
 *
 * @param id - The ID of the chat to update
 * @param title - The new title for the chat
 * @throws Error if chat not found or user not authorized
 */
export const update = zMutation({
  args: {
    chatId: zid('chats'),
    title: z.string()
  },
  handler: async (ctx, { chatId, title }) => {
    const chat = await ctx.db.get(chatId)
    if (!chat) {
      throw new Error('Chat not found')
    }

    const user = await getAuthenticatedUser(ctx)

    // Authorization check: ensure user owns this chat
    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }

    await ctx.db.patch(chatId, { title })
  }
})

export const updateChatTitle = zInternalMutation({
  args: {
    chatId: zid('chats'),
    title: z.string(),
    userId: zid('users')
  },
  handler: async (ctx, { chatId, title, userId }) => {
    const chat = await ctx.db.get(chatId)
    if (!chat) {
      throw new Error('Chat not found')
    }

    if (chat.userId !== userId) {
      throw new Error('Unauthorized')
    }

    await ctx.db.patch(chatId, { title })
  }
})

/**
 * Delete a chat and all its associated messages
 *
 * @param id - The ID of the chat to delete
 * @throws Error if chat not found or user not authorized
 */
export const remove = zMutation({
  args: {
    chatId: zid('chats')
  },
  handler: async (ctx, { chatId }) => {
    const chat = await ctx.db.get(chatId)
    if (!chat) {
      throw new Error('Chat not found')
    }

    const user = await getAuthenticatedUser(ctx)

    // Authorization check: ensure user owns this chat
    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }

    // Delete all messages in the chat
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_chatId', q => q.eq('chatId', chatId))
      .collect()

    for (const message of messages) {
      await ctx.db.delete(message._id)
    }

    // Delete the chat
    await ctx.db.delete(chatId)
  }
})

/**
 * Get all chats for the currently authenticated user (public version)
 * This function is exposed to the client directly
 *
 * @returns Array of chat objects in descending order (newest first)
 * @throws Error if user not authenticated
 */
export const getAuthenticatedUserChats = zQuery({
  args: {},
  handler: async ctx => {
    const user = await getAuthenticatedUser(ctx)
    const chats = await ctx.db
      .query('chats')
      .withIndex('by_userId', q => q.eq('userId', user._id))
      .order('desc') // Order by creation time descending (newest first)
      .collect()

    return chats
  }
})

/**
 * Generate a chat title based on the provided message content
 * This function uses Groq's "llama-3.1-8b-instant" model to create a descriptive name for the chat
 * This is an internal function not exposed to the client directly
 *
 * @param messageContent - The message content to base the title on
 * @returns The generated title for the chat
 */
export const generateChatTitle = zInternalAction({
  args: {
    chatId: zid('chats'),
    messageContent: z.string(),
    userId: zid('users')
  },
  handler: async (ctx, { chatId, messageContent, userId }) => {
    const { object } = await generateObject({
      model: groq('llama-3.1-8b-instant'),
      prompt: `Generate a concise and descriptive chat title based on this message. The title must be between 10 and 35 characters long.\n\nMessage: "${messageContent}"\n\nRespond with a title that captures the main topic or purpose of the conversation. Be direct and specific.`,
      schema: z.object({
        title: z
          .string()
          .min(10)
          .max(35)
          .describe('A concise, descriptive title for the chat')
      }),
      temperature: 0.3 // Lower temperature for more consistent output
    })

    await ctx.runMutation(internal.chats.updateChatTitle, {
      chatId,
      title: object.title,
      userId
    })
  }
})
