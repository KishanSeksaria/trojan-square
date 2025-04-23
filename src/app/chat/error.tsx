'use client'
export default function Error() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold'>Error: Chat not found</h1>
      <h2 className='text-md font-bold'>
        Please select any of the existing chat
      </h2>
    </div>
  )
}
