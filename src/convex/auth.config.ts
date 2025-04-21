/**
 * Authentication Configuration for Convex
 *
 * This file configures the authentication providers for the Convex backend.
 * It sets up Clerk as the authentication provider by specifying its issuer URL.
 * The issuer URL is obtained from environment variables for security.
 */
export default {
  providers: [
    {
      domain: process.env.CLERK_CONVEX_ISSUER_URL!, // The issuer URL from Clerk (required)
      applicationID: 'convex' // The application ID for Clerk-Convex integration
    }
  ]
}
