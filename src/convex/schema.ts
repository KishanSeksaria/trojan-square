/**
 * Convex Database Schema Definition
 *
 * This file defines the data model for the Convex database tables and their relationships.
 * It uses Convex's schema definition syntax with strongly typed fields and indexing.
 */
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // The schema for the users table
  // This table stores information about active users in the application
  users: defineTable({
    clerkUserId: v.string(), // External ID from Clerk authentication service
    firstName: v.string(), // User's first name
    lastName: v.string(), // User's last name
    email: v.string(), // User's email address
    imageUrl: v.optional(v.string()), // Profile image URL (optional)
    createdAt: v.number(), // Timestamp when the user was created
    updatedAt: v.number() // Timestamp when the user was last updated
  })
    .index('by_clerk_userId', ['clerkUserId']) // Index for fast lookup by Clerk user ID
    .index('by_email', ['email']), // Index for fast lookup by email

  // The schema for the archived users table
  // This table stores information about deleted users for historical and compliance purposes
  archivedUsers: defineTable({
    clerkUserId: v.string(), // External ID from Clerk authentication service
    firstName: v.string(), // User's first name
    lastName: v.string(), // User's last name
    email: v.string(), // User's email address
    imageUrl: v.optional(v.string()), // Profile image URL (optional)
    createdAt: v.number(), // Timestamp when the user was originally created
    deletedAt: v.number() // Timestamp when the user was deleted/archived
  })
    .index('by_clerk_userId', ['clerkUserId']) // Index for fast lookup by Clerk user ID
    .index('by_email', ['email']), // Index for fast lookup by email

  // The schema for the chats table
  // This table stores chat sessions created by users
  chats: defineTable({
    userId: v.id('users'), // Reference to the user who owns this chat
    title: v.string(), // Title of the chat conversation
    createdAt: v.number() // Timestamp when the chat was created
  }).index('by_userId', ['userId']), // Index for fast lookup of all chats for a specific user

  // The schema for the messages table
  // This table stores individual messages within chat conversations
  messages: defineTable({
    chatId: v.id('chats'), // Reference to the chat this message belongs to
    content: v.string(), // The text content of the message
    role: v.union(v.literal('user'), v.literal('assistant')), // Whether the message is from the user or AI assistant
    createdAt: v.number() // Timestamp when the message was created
  }).index('by_chatId', ['chatId']) // Index for fast lookup of all messages in a specific chat
})
