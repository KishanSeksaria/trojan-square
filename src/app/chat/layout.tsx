'use client'
import ChatSidebar from '@/components/ChatSidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import ShowTooltip from '@/components/ShowTooltip'

export default function ChatLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset className='overflow-y-auto'>
        <NavigationMenu className='bg-background sticky top-0 z-10 w-full flex-0 px-4'>
          <NavigationMenuList className='h-12'>
            <NavigationMenuItem>
              <ShowTooltip withMessage={`Toggle Sidebar (CMD/CTRL + B)`}>
                <SidebarTrigger className='rounded-full' />
              </ShowTooltip>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className='flex h-full w-full flex-1 flex-col items-center justify-center'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
