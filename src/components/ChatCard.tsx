import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'

function ChatCard({ question, answer }: { question: string; answer: string }) {
  return (
    <Card className='hover:bg-accent/50 transition-colors'>
      <CardHeader className='gap-2'>
        <CardTitle className='text-base font-medium'>{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-2'>
          <Image
            src='/ai_agent.png'
            alt='AI Agent'
            className='size-5'
            width={20}
            height={20}
          />
          <CardDescription>{answer}</CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}

export type QuestionAnswer = {
  question: string
  answer: string
}

export const questionAnswers: QuestionAnswer[] = [
  {
    question: 'What events are happening next week on campus?',
    answer: 'The USC vs. UCLA football game is on Saturday at 7 PM.'
  },
  {
    question: 'What courses is Prof. Saty teaching next semester?',
    answer: 'Professor Saty is teaching CSCI 572 and CSCI 585 in the fall.'
  }
]

export default ChatCard
