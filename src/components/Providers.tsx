import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from './ConvexProvider'
import { ThemeProvider } from './ThemeProvider'
import { SidebarProvider } from './ui/sidebar'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.CLERK_CONVEX_PUBLISHABLE_KEY!}
      afterSignOutUrl={'http://localhost:3000/'}
    >
      <ConvexClientProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </ConvexClientProvider>
    </ClerkProvider>
  )
}

export default Providers
