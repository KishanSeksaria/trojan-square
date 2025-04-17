import { Sidebar, SidebarProvider } from '@/components/ui/sidebar'

export default function ChatLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex w-full items-center justify-center'>
      {/* <Sidebar></Sidebar> */}
      {children}
    </div>
  )
}
