'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from './ConvexProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider publishableKey={process.env.CLERK_CONVEX_PUBLISHABLE_KEY!}>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ClerkProvider>
  )
}

export default Providers
