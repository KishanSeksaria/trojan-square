import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from './ConvexProvider'
import { ThemeProvider } from './ThemeProvider'
import { SidebarProvider } from './ui/sidebar'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.CLERK_CONVEX_PUBLISHABLE_KEY!}
      afterSignOutUrl={
        process.env.NEXT_PUBLIC_AFTER_SIGN_OUT_URL || 'http://localhost:3000/'
      }
    >
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
