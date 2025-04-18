import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton
} from './ui/sidebar'
import { HTMLAttributes } from 'react'

function ChatSidebar(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Sidebar variant='inset' className='top-16' {...props}>
      <SidebarHeader>
        <h1 className='text-2xl font-bold'>Chat Sidebar</h1>
        <p className='text-muted-foreground text-sm'>
          This is a sidebar for chat applications. You can add your own
          components here.
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuButton asChild isActive>
            <Link href='/chat'>Chat</Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default ChatSidebar
