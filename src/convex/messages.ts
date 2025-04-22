/**
 * Messages Management Module
 *
 * This module provides functions for managing chat messages in the application.
 * It includes operations for retrieving, creating, and deleting messages,
 * with appropriate authorization checks to ensure users can only access their own data.
 */
import z from 'zod'
import { zid } from 'convex-helpers/server/zod'
import { zInternalMutation, zMutation, zQuery } from './utils'
import { Id } from './_generated/dataModel'
import { getAuthenticatedUser } from './users'
import { internal } from './_generated/api'

/**
 * Retrieve all messages for a specific chat
 *
 * @param chatId - The ID of the chat to get messages for
 * @returns Array of message objects in ascending order (oldest first)
 * @throws Error if chat not found or user not authorized to access it
 */
export const getAllByChatId = zQuery({
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

    // Authorization check: ensure user owns this chat
    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }

    // Get messages
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_chatId', q => q.eq('chatId', chatId))
      .order('asc') // Order by creation time ascending (oldest first)
      .collect()

    return messages
  }
})

/**
 * Create a new message in a chat
 *
 * @param chatId - The ID of the chat to add the message to
 * @param content - The text content of the message
 * @param role - The role of the message sender ('user' or 'assistant')
 * @returns The ID of the newly created message
 * @throws Error if chat not found or user not authorized
 */
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

    // Authorization check: ensure user owns this chat
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

    // If this is the first message in the chat, rename the chat
    if (chat.title === 'New Chat' && role === 'assistant') {
      await ctx.scheduler.runAfter(0, internal.chats.generateChatTitle, {
        chatId,
        userId: user._id,
        messageContent: content
      })
    }

    return messageId
  }
})

/**
 * Create a new assistant message in a chat
 *
 * @param chatId - The ID of the chat to add the message to
 * @param content - The text content of the message
 * @returns The ID of the newly created message
 * @throws Error if chat not found or user not authorized
 */
export const sendAssistantMessage = zInternalMutation({
  args: {
    chatId: zid('chats'),
    content: z.string()
  },
  handler: async (ctx, { chatId, content }) => {
    // Verify chat exists and user has access
    const chat = await ctx.db.get(chatId)
    if (!chat) {
      throw new Error('Chat not found')
    }

    // Create message
    const messageId = await ctx.db.insert('messages', {
      chatId,
      content,
      role: 'assistant',
      createdAt: Date.now()
    })

    return messageId
  }
})

/**
 * Delete a specific message
 *
 * @param id - The ID of the message to delete
 * @throws Error if message not found, chat not found, or user not authorized
 */
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

    // Authorization check: ensure user owns the chat containing this message
    if (chat.userId !== user._id) {
      throw new Error('Unauthorized')
    }

    await ctx.db.delete(id)
  }
})
