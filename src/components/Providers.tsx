'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from './ConvexProvider'
import { ThemeProvider } from './ThemeProvider'
import { usePathname } from 'next/navigation'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  console.log('Current path:', pathName)
  return (
    <ClerkProvider
      publishableKey={process.env.CLERK_CONVEX_PUBLISHABLE_KEY!}
      afterSignOutUrl={'/'}
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
