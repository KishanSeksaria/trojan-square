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
import { Search, SquarePen } from 'lucide-react'
import IconWithTooltip from './IconWithTooltip'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { HTMLAttributes } from 'react'
import { useParams, useRouter } from 'next/navigation'

function ChatSidebar({ ...props }: HTMLAttributes<HTMLDivElement>) {
  const chats = useQuery(api.chats.getAllForAuthenticatedUser)
  const createChat = useMutation(api.chats.create)
  const router = useRouter()
  const { chatId } = useParams()

  return (
    <Sidebar variant='inset' className='top-16' {...props}>
      <SidebarHeader className='flex flex-row items-center justify-between'>
        <p className='font-bold'>Ask USC AI</p>
        <div className='flex items-center gap-0'>
          <IconWithTooltip tooltipMessage='Search your chats'>
            <Search />
          </IconWithTooltip>
          <IconWithTooltip
            tooltipMessage='Start a new chat'
            onClick={async () => {
              const chatId = await createChat({ title: 'New Chat' })
              router.push(`/chat/${chatId}`)
            }}
          >
            <SquarePen />
          </IconWithTooltip>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {chats?.map(chat => (
                <SidebarMenuItem key={chat._id}>
                  <SidebarMenuButton isActive={chat._id === chatId}>
                    <Link href={`/chat/${chat._id}`} className='w-full'>
                      {chat.title}
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
