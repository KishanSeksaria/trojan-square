import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from './ConvexProvider'
import { ThemeProvider } from './ThemeProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider publishableKey={process.env.CLERK_CONVEX_PUBLISHABLE_KEY!}>
      <ConvexClientProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ConvexClientProvider>
    </ClerkProvider>
  )
}

export default Providers
