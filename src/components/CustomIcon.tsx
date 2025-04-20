import { cn } from '@/lib/utils'
import { Button } from './ui/button'

function CustomIcon({
  className,
  onClick,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className={cn('size-7 rounded-full', className)}
      onClick={event => {
        onClick?.(event)
      }}
      {...props}
    >
      {children}
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  )
}

export default CustomIcon
