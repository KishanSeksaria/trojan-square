/**
 * User Management Module
 *
 * This module provides functions for managing users in the application,
 * including CRUD operations and user authentication handling.
 * It integrates with Clerk as the authentication provider.
 */
import z from 'zod'
import { zInternalMutation, zQuery } from './utils'
import { zid } from 'convex-helpers/server/zod'
import { ClerkUserWebhookSchema } from '../src/lib/zod'
import { QueryCtx } from './_generated/server'

/**
 * Get all users from the database
 * Used for admin or listing purposes
 */
export const getAll = zQuery({
  args: {},
  handler: async ctx => {
    const users = await ctx.db.query('users').collect()
    return users
  }
})

/**
 * Get a specific user by their Convex ID
 *
 * @param id - The Convex document ID of the user to retrieve
 * @returns The user object or null if not found
 */
export const getById = zQuery({
  args: {
    id: zid('users')
  },
  handler: async (ctx, { id }) => {
    const user = await ctx.db.get(id)
    return user
  }
})

/**
 * Find a user by their email address
 *
 * @param email - The email address to search for
 * @returns The user object or null if not found
 */
export const getByEmail = zQuery({
  args: {
    email: z.string().email()
  },
  handler: async (ctx, { email }) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_email', q => q.eq('email', email))
      .unique()
    return user
  }
})

/**
 * Get the currently authenticated user
 *
 * @returns The user object for the currently authenticated user
 * @throws Error if not authenticated or user not found
 */
export const getCurrentUser = zQuery({
  args: {},
  handler: async ctx => await getAuthenticatedUser(ctx)
})

/**
 * Create or update a user based on Clerk webhook data
 * This is called when a user signs up or updates their profile in Clerk
 *
 * @param args - User data from Clerk webhook
 */
export const upsertFromClerk = zInternalMutation({
  args: ClerkUserWebhookSchema,
  handler: async (ctx, args) => {
    const { clerkUserId, first_name, last_name, email, image_url } = args
    const now = Date.now()
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_userId', q => q.eq('clerkUserId', clerkUserId))
      .first()
    if (user) {
      // Update existing user
      await ctx.db.patch(user._id, {
        firstName: first_name,
        lastName: last_name,
        email,
        imageUrl: image_url,
        updatedAt: now
      })
    } else {
      // Create new user
      await ctx.db.insert('users', {
        clerkUserId: clerkUserId,
        firstName: first_name,
        lastName: last_name,
        email,
        imageUrl: image_url,
        createdAt: now,
        updatedAt: now
      })
    }
  }
})

/**
 * Delete a user when they delete their account in Clerk
 * Moves the user to the archivedUsers table for record-keeping
 *
 * @param clerkUserId - The Clerk user ID of the user to delete
 */
export const deleteFromClerk = zInternalMutation({
  args: {
    clerkUserId: z.string()
  },
  handler: async (ctx, { clerkUserId }) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_userId', q => q.eq('clerkUserId', clerkUserId))
      .unique()
    if (!user) {
      return
    }
    const now = Date.now()
    // Move the user to the archived users table
    const archivedUser = {
      clerkUserId: user.clerkUserId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
      deletedAt: now
    }
    await ctx.db.insert('archivedUsers', archivedUser) // Move the user to the archived users table
    await ctx.db.delete(user._id)
  }
})

/**
 * Utility function to get the currently authenticated user
 * Used throughout the application to verify authentication and get user data
 *
 * @param ctx - The Convex query context
 * @returns The authenticated user object
 * @throws Error if not authenticated or user not found
 */
export const getAuthenticatedUser = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) {
    throw new Error('Not authenticated')
  }
  const user = await ctx.db
    .query('users')
    .withIndex('by_clerk_userId', q => q.eq('clerkUserId', identity.subject))
    .unique()
  if (!user) {
    throw new Error('User not found')
  }
  return user
}
