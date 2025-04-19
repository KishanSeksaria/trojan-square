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

export default function ChatLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ChatSidebar />
      <SidebarInset>
        <NavigationMenu className='w-full flex-0 px-4'>
          <NavigationMenuList className='h-14'>
            <NavigationMenuItem>
              <SidebarTrigger />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className='flex h-full w-full flex-1 items-center justify-center'>
          {children}
        </div>
      </SidebarInset>
    </>
  )
}
