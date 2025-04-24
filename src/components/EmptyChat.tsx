function EmptyChat() {
  return (
    <div className='text-foreground flex h-full w-full items-center justify-center text-center'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <p className='text-md'>Hey Buddy, Ready to dive in.</p>
        <p className='text-muted-foreground text-sm'>
          Start a conversation with me by typing in the input box below.
        </p>
      </div>
    </div>
  )
}
export default EmptyChat
