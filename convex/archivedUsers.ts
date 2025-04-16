import z from 'zod'
import { zInternalQuery } from './utils'
import { zid } from 'convex-helpers/server/zod'

export const getAll = zInternalQuery({
  args: {},
  handler: async ctx => {
    const users = await ctx.db.query('archivedUsers').collect()
    return users
  }
})

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

export const getByEmail = zInternalQuery({
  args: {
    email: z.string().email()
  },
  handler: async (ctx, args) => {
    const { email } = args
    const user = await ctx.db
      .query('archivedUsers')
      .withIndex('by_email', (q: any) => q.eq('email', email))
      .unique()
    return user
  }
})

export const getByClerkUserId = zInternalQuery({
  args: {
    clerkUserId: z.string()
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = args
    const user = await ctx.db
      .query('archivedUsers')
      .withIndex('by_clerk_userId', (q: any) =>
        q.eq('clerkUserId', clerkUserId)
      )
      .unique()
    return user
  }
})
