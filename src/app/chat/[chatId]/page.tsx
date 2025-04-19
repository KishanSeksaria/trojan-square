import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import React from 'react'

function page({ params }: { params: { chatId: string } }) {
  return (
    <Card className='w-1/2'>
      <CardHeader>
        <CardTitle>Welcome to Chat!</CardTitle>
        <CardDescription>Your chat ID is: {params.chatId}.</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default page
