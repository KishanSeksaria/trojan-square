import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from './ui/sidebar'
import { SquarePen } from 'lucide-react'
import ShowTooltip from './ShowTooltip'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { HTMLAttributes } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import CustomIcon from './CustomIcon'
import { Doc } from '@/convex/_generated/dataModel'
// import { TextGenerateEffect } from './ui/text-generate-effect'

function ChatSidebar({
  className,
  chats,
  activeChatId,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  chats: Doc<'chats'>[] | undefined
  activeChatId: string | undefined
}) {
  const createChat = useMutation(api.chats.create)
  const router = useRouter()

  return (
    <Sidebar variant='inset' className={cn('top-16', className)} {...props}>
      <SidebarHeader className='flex flex-row items-center justify-between'>
        <p className='font-bold'>Ask USC AI</p>
        <div className='flex items-center gap-0'>
          {/* <ShowTooltip withMessage='Search your chats'>
            <CustomIcon>
              <Search />
            </CustomIcon>
          </ShowTooltip> */}
          <ShowTooltip withMessage='Start a new chat'>
            <CustomIcon
              onClick={async () => {
                const chatId = await createChat({ title: 'New Chat' })
                router.push(`/chat/${chatId}`)
              }}
            >
              <SquarePen />
            </CustomIcon>
          </ShowTooltip>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {chats?.map(chat => (
                <SidebarMenuItem key={chat._id}>
                  <SidebarMenuButton
                    asChild
                    isActive={chat._id === activeChatId}
                  >
                    <Link href={`/chat/${chat._id}`}>
                      {/* <TextGenerateEffect
                        words={chat.title}
                        className='line-clamp-1'
                      /> */}
                      <p className='line-clamp-1'>{chat.title}</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default ChatSidebar
