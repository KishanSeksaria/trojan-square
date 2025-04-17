import z from 'zod'
import { zInternalMutation, zQuery } from './utils'
import { zid } from 'convex-helpers/server/zod'
import { ClerkUserWebhookSchema } from '../src/lib/zod'
import { QueryCtx } from './_generated/server'

export const getAll = zQuery({
  args: {},
  handler: async ctx => {
    const users = await ctx.db.query('users').collect()
    return users
  }
})

export const getById = zQuery({
  args: {
    id: zid('users')
  },
  handler: async (ctx, { id }) => {
    const user = await ctx.db.get(id)
    return user
  }
})

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

export const getCurrentUser = zQuery({
  args: {},
  handler: async ctx => await getAuthenticatedUser(ctx)
})

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
      await ctx.db.patch(user._id, {
        firstName: first_name,
        lastName: last_name,
        email,
        imageUrl: image_url,
        updatedAt: now
      })
    } else {
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
