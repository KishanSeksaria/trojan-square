import z from 'zod'
import { zInternalMutation, zQuery } from './utils'
import { zid } from 'convex-helpers/server/zod'

export const getAll = zQuery({
  args: {},
  handler: async ctx => await ctx.db.query('users').collect()
})

export const getById = zQuery({
  args: {
    id: zid('users')
  },
  handler: async (ctx, args) => {
    const { id } = args
    return await ctx.db.get(id)
  }
})

export const getByEmail = zQuery({
  args: {
    email: z.string().email()
  },
  handler: async (ctx, args) => {
    const { email } = args
    return await ctx.db
      .query('users')
      .withIndex('by_email', q => q.eq('email', email))
      .unique()
  }
})

export const getByClerkId = zQuery({
  args: {
    clerkUserId: z.string()
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = args
    return await ctx.db
      .query('users')
      .withIndex('by_clerk_userId', q => q.eq('clerkUserId', clerkUserId))
      .unique()
  }
})

export const getCurrentUser = zQuery({
  args: {},
  handler: async ctx => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return null
    }
    return await ctx.db
      .query('users')
      .withIndex('by_clerk_userId', q => q.eq('clerkUserId', identity.subject))
      .unique()
  }
})

export const upsertFromClerk = zInternalMutation({
  args: z.object({
    clerkUserId: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    image_url: z.optional(z.string())
  }),
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
  args: z.object({
    clerkUserId: z.string()
  }),
  handler: async (ctx, args) => {
    const { clerkUserId } = args
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_userId', q => q.eq('clerkUserId', clerkUserId))
      .first()
    if (user) {
      await ctx.db.delete(user._id)
    }
  }
})
