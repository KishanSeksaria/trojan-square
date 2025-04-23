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
  // const deleteChat = useMutation(api.chats.remove)
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
                  <div className='flex w-full items-center gap-2'>
                    <SidebarMenuButton isActive={chat._id === activeChatId}>
                      <Link href={`/chat/${chat._id}`} className='w-full'>
                        {chat.title}
                      </Link>
                    </SidebarMenuButton>
                    {/* <CustomIcon
                      onClick={() => {
                        const isCurrentChat = activeChatId === chat._id
                        deleteChat({ id: chat._id })
                        // Only redirect if we're deleting the current chat
                        if (isCurrentChat) {
                          // Find the next available chat to redirect to
                          const remainingChats =
                            chats?.filter(c => c._id !== chat._id) || []
                          if (remainingChats.length > 0) {
                            router.push(`/chat/${remainingChats[0]._id}`)
                          } else {
                            router.push('/')
                          }
                        }
                      }}
                      className='hover:text-red-500'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M3 6h18'></path>
                        <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
                        <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
                      </svg>
                    </CustomIcon> */}
                  </div>
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
