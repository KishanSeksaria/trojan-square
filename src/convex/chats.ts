/**
 * Chats Management Module
 *
 * This module provides functions for managing chat conversations in the application.
 * It includes operations for retrieving, creating, updating, and deleting chats,
 * with appropriate authorization checks to ensure users can only access their own data.
 */
import z from 'zod'
import { zid } from 'convex-helpers/server/zod'
import { zInternalQuery, zMutation, zQuery } from './utils'
import { getAuthenticatedUser } from './users'

/**
 * Retrieve a specific chat by its ID
 *
 * @param id - The ID of the chat to retrieve
 * @returns The chat object
 * @throws Error if chat not found or user not authorized to access it
 */
export const getById = zQuery({
  args: { id: zid('chats') },
  handler: async (ctx, { id }) => {
    const chat = await ctx.db.get(id)
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
    id: zid('chats'),
    title: z.string()
  },
  handler: async (ctx, { id, title }) => {
    const chat = await ctx.db.get(id)
    if (!chat) {
      throw new Error('Chat not found')
    }

    const user = await getAuthenticatedUser(ctx)

    // Authorization check: ensure user owns this chat
    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }

    await ctx.db.patch(id, { title })
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
    id: zid('chats')
  },
  handler: async (ctx, { id }) => {
    const chat = await ctx.db.get(id)
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
      .withIndex('by_chatId', q => q.eq('chatId', id))
      .collect()

    for (const message of messages) {
      await ctx.db.delete(message._id)
    }

    // Delete the chat
    await ctx.db.delete(id)
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
