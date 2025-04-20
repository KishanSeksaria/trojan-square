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
    <SidebarProvider className='h-[calc(100vh-4rem)] overflow-y-auto py-8'>
      <ChatSidebar />
      <SidebarInset className='overflow-y-auto'>
        <NavigationMenu className='bg-background sticky top-0 z-10 w-full flex-0 px-4 shadow-sm'>
          <NavigationMenuList className='h-12'>
            <NavigationMenuItem>
              <ShowTooltip withMessage={`Toggle Sidebar (CMD/CTRL + B)`}>
                <SidebarTrigger className='rounded-full' />
              </ShowTooltip>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className='flex w-full flex-1 flex-col items-center justify-center p-2'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
