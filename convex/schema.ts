import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index('byClerkUserId', ['clerkUserId'])
    .index('byEmail', ['email'])
})
