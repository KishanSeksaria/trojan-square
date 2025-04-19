import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

function AskUSCAI({ children }: { children: React.ReactNode }) {
  // TODO: Improve this page
  return (
    <Card className='w-1/2'>
      <CardHeader>
        <CardTitle>Welcome to Ask USC AI!</CardTitle>
        <CardDescription>
          Start a new chat or select an existing one from the sidebar to get
          started.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default AskUSCAI
