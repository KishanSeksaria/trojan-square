import z from 'zod'

export const ClerkUserWebhookSchema = z.object({
  clerkUserId: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  image_url: z.optional(z.string())
})

// export type ClerkUserWebhook = z.infer<typeof ClerkUserWebhookSchema>
