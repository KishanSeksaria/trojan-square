import z from 'zod'
import { zMutation, zQuery } from './utils'
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
