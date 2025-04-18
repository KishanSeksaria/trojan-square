import ChatSidebar from '@/components/ChatSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function ChatLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
