'use client'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from './ui/sidebar'
import { SquarePen, Trash } from 'lucide-react'
import ShowTooltip from './ShowTooltip'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { HTMLAttributes } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import CustomIcon from './CustomIcon'
import { Doc } from '@/convex/_generated/dataModel'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { TextGenerateEffect } from './ui/text-generate-effect'
import { toast } from 'sonner'

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
  const deleteChat = useMutation(api.chats.remove)
  const router = useRouter()

  return (
    <Sidebar
      variant='inset'
      className={cn('top-16 bottom-8', className)}
      {...props}
    >
      <SidebarHeader className='flex flex-row items-center justify-between'>
        <p className='font-bold'>Ask USC AI</p>
        <div className='flex items-center gap-0'>
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
                <SidebarMenuItem key={chat._id} className='py-1'>
                  <SidebarMenuButton
                    asChild
                    isActive={chat._id === activeChatId}
                  >
                    <Link href={`/chat/${chat._id}`}>
                      <TextGenerateEffect
                        words={chat.title}
                        className='text-foreground hover:text-foreground/80 line-clamp-1 text-xs font-medium'
                      />
                    </Link>
                  </SidebarMenuButton>
                  <AlertDialog>
                    <ShowTooltip withMessage='Delete chat'>
                      <AlertDialogTrigger asChild>
                        <SidebarMenuAction asChild>
                          <CustomIcon>
                            <Trash className='text-destructive' />
                          </CustomIcon>
                        </SidebarMenuAction>
                      </AlertDialogTrigger>
                    </ShowTooltip>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this chat?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this chat from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            void deleteChat({ chatId: chat._id })
                            toast.success('Chat deleted successfully')
                            if (chat._id === activeChatId) {
                              // router.push('/chat')
                              redirect('/chat')
                            }
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
