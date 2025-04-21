/**
 * HTTP Webhook Handler for Clerk Authentication
 *
 * This module sets up an HTTP endpoint to handle webhook events from Clerk.
 * It processes user creation, update, and deletion events to keep the
 * Convex database in sync with the Clerk authentication service.
 */
import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { internal } from './_generated/api'
import type { UserJSON, WebhookEvent } from '@clerk/backend'
import { Webhook } from 'svix'

// Create an HTTP router to handle webhook requests
const http = httpRouter()

/**
 * Route handler for Clerk webhook events
 * Receives events when users are created, updated, or deleted in Clerk
 */
http.route({
  path: '/clerk-users-webhook',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    // Validate the incoming webhook request
    const event = await validateRequest(request)
    if (!event) {
      return new Response('Error occurred', { status: 400 })
    }
    const {
      id: clerkUserId,
      first_name,
      last_name,
      email_addresses,
      image_url
    } = event.data as UserJSON

    // Process different event types from Clerk
    switch (event.type) {
      case 'user.created': // Intentional fallthrough - handle both cases the same way
      case 'user.updated':
        // Create or update the user in our database
        await ctx.runMutation(internal.users.upsertFromClerk, {
          clerkUserId: clerkUserId!,
          first_name: first_name || '',
          last_name: last_name || '',
          email: email_addresses[0]?.email_address || '',
          image_url: image_url || ''
        })
        break

      case 'user.deleted': {
        // Delete the user from our active users and move to archived users
        const clerkUserId = event.data.id!
        await ctx.runMutation(internal.users.deleteFromClerk, { clerkUserId })
        break
      }
      default:
        console.log('Ignored Clerk webhook event', event.type)
    }

    // Return a success response
    return new Response(null, { status: 200 })
  })
})

/**
 * Validates the webhook request from Clerk
 * Uses the Svix library to verify the webhook signature
 *
 * @param req - The incoming HTTP request
 * @returns The verified webhook event or null if validation fails
 */
async function validateRequest(req: Request): Promise<WebhookEvent | null> {
  const payloadString = await req.text()
  const svixHeaders = {
    'svix-id': req.headers.get('svix-id')!,
    'svix-timestamp': req.headers.get('svix-timestamp')!,
    'svix-signature': req.headers.get('svix-signature')!
  }
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)
  try {
    return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent
  } catch (error) {
    console.error('Error verifying webhook event', error)
    return null
  }
}

export default http
