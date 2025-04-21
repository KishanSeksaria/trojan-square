import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@radix-ui/react-tooltip'

function ShowTooltip({
  children,
  withMessage: tooltipMessage
}: {
  children: React.ReactNode
  withMessage: string
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side='bottom'
          className='bg-background mt-2 overflow-hidden rounded-2xl p-2'
        >
          <p>{tooltipMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ShowTooltip
