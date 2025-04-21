import { HTMLAttributes, ReactElement } from 'react'

function ChatCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className='rounded-lg border bg-white p-4 shadow-sm'>
      <div className='flex'>
        <img
          src='ai_agent.png'
          className='mx-2 mt-2 self-start'
          width={20}
          height={20}
        ></img>
        <h4 className='mb-2 font-semibold'>{question}</h4>
      </div>
      <hr className='my-4 border-t' />
      <p className='text-input text-sm'>{answer}</p>
    </div>
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
    question: 'What courses is Prof. Saty teaching next sem?',
    answer: 'Professor Saty is teaching CSCI 572 and CSCI 585 in the fall.'
  }
]

export default ChatCard
