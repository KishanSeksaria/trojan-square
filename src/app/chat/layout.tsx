'use client'
import ChatSidebar from '@/components/ChatSidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import ShowTooltip from '@/components/ShowTooltip'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'

export default function ChatLayout({
  children
}: {
  children: React.ReactNode
}) {
  const chats = useQuery(api.chats.getAuthenticatedUserChats)
  const { chatId: activeChatId } = useParams()
  const [activeChatTitle, setActiveChatTitle] = useState<string | null>(null)

  useEffect(() => {
    if (chats && activeChatId) {
      const chat = chats.find(chat => chat._id === activeChatId)
      if (chat) {
        setActiveChatTitle(chat.title)
      } else {
        setActiveChatTitle(null)
      }
    }
  }, [chats, activeChatId])

  return (
    <SidebarProvider className='overflow-y-auto'>
      <ChatSidebar chats={chats} activeChatId={activeChatId?.toString()} />
      <SidebarInset className='overflow-y-auto'>
        <div className='bg-background sticky top-0 z-10 flex min-h-12 w-full items-center gap-2 px-4 shadow-sm'>
          <ShowTooltip withMessage={`Toggle Sidebar (CMD/CTRL + B)`}>
            <SidebarTrigger className='rounded-full' />
          </ShowTooltip>
          <TextGenerateEffect words={activeChatTitle ?? 'No active chat'} />
        </div>
        <div className='flex w-full flex-1 flex-col items-center justify-center'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
