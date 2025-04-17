import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // The schema for the users table
  // This table stores the active users of the application
  users: defineTable({
    clerkUserId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index('by_clerk_userId', ['clerkUserId'])
    .index('by_email', ['email']),

  // The schema for the archived users table
  // This table stores the deleted users of the application
  archivedUsers: defineTable({
    clerkUserId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    deletedAt: v.number()
  })
    .index('by_clerk_userId', ['clerkUserId'])
    .index('by_email', ['email']),

  // The schema for the chats table
  chats: defineTable({
    userId: v.id('users'),
    title: v.string(),
    createdAt: v.number()
  }).index('by_userId', ['userId']),

  // The schema for the messages table
  messages: defineTable({
    chatId: v.id('chats'),
    content: v.string(),
    role: v.union(v.literal('user'), v.literal('assistant')),
    createdAt: v.number()
  }).index('by_chatId', ['chatId'])
})
