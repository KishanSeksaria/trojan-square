'use client'
import CustomIcon from '@/components/CustomIcon'
import ShowTooltip from '@/components/ShowTooltip'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { SquarePen } from 'lucide-react'
import { useRouter } from 'next/navigation'

function AskUSCAI() {
  const createChat = useMutation(api.chats.create)
  const router = useRouter()

  return (
    <div className='flex h-full w-full items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='flex flex-row items-start justify-between gap-4'>
          <div className='space-y-1.5'>
            <CardTitle>No chat selected</CardTitle>
            <CardDescription>
              Either select a chat from the sidebar or create a new one.
            </CardDescription>
          </div>
          <ShowTooltip withMessage='Start a new chat'>
            <CustomIcon
              onClick={async () => {
                const chatId = await createChat({ title: 'New Chat' })
                router.push(`/chat/${chatId}`)
              }}
            >
              <SquarePen className='text-muted-foreground hover:text-foreground transition-colors' />
            </CustomIcon>
          </ShowTooltip>
        </CardHeader>
      </Card>
    </div>
  )
}

export default AskUSCAI
