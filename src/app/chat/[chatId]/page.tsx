import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import React from 'react'

async function page({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle>Chat ID</CardTitle>
          <CardDescription>{chatId}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default page
