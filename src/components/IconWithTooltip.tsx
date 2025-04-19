import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@radix-ui/react-tooltip'
import { Button } from './ui/button'

function IconWithTooltip({
  children,
  tooltipMessage,
  onClick
}: {
  children: React.ReactNode
  tooltipMessage: string
  onClick?: () => void
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='ghost' size='icon' onClick={onClick}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom' className='bg-background rounded p-2'>
          <p>{tooltipMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default IconWithTooltip
