/**
 * Archived Users Management Module
 *
 * This module provides functions for accessing archived (deleted) user data.
 * When users delete their accounts, their information is moved to this table
 * for record-keeping and compliance purposes.
 * All functions are internal and not accessible from the client.
 */
import z from 'zod'
import { zInternalQuery } from './utils'
import { zid } from 'convex-helpers/server/zod'

/**
 * Get all archived users from the database
 * Used for admin or auditing purposes
 *
 * @returns Array of archived user objects
 */
export const getAll = zInternalQuery({
  args: {},
  handler: async ctx => {
    const users = await ctx.db.query('archivedUsers').collect()
    return users
  }
})

/**
 * Get a specific archived user by their Convex ID
 *
 * @param id - The Convex document ID of the archived user
 * @returns The archived user object or null if not found
 */
export const getById = zInternalQuery({
  args: {
    id: zid('archivedUsers')
  },
  handler: async (ctx, args) => {
    const { id } = args
    const user = await ctx.db.get(id)
    return user
  }
})

/**
 * Find an archived user by their email address
 * Useful for checking if a previously deleted user tries to sign up again
 *
 * @param email - The email address to search for
 * @returns The archived user object or null if not found
 */
export const getByEmail = zInternalQuery({
  args: {
    email: z.string().email()
  },
  handler: async (ctx, args) => {
    const { email } = args
    const user = await ctx.db
      .query('archivedUsers')
      .withIndex('by_email', q => q.eq('email', email))
      .unique()
    return user
  }
})

/**
 * Find an archived user by their Clerk user ID
 * Used to verify if a user was previously registered and deleted
 *
 * @param clerkUserId - The Clerk user ID to search for
 * @returns The archived user object or null if not found
 */
export const getByClerkUserId = zInternalQuery({
  args: {
    clerkUserId: z.string()
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = args
    const user = await ctx.db
      .query('archivedUsers')
      .withIndex('by_clerk_userId', q => q.eq('clerkUserId', clerkUserId))
      .unique()
    return user
  }
})
