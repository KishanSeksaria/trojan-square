import { Metadata } from 'next'
import ClientChatPage from './client-chat-page'

// Metadata for the chat page
export const generateMetadata = async ({
  params
}: {
  params: Promise<{ chatId: string }>
}): Promise<Metadata> => {
  const { chatId } = await params
  return {
    title: `Chat ${chatId} | Trojan Square`,
    description:
      'Chat with Trojan Square - Your one-stop solution for all things USC!'
  }
}

//Since we cant have metadata and the layout in the same file, we have to create a new file for the client component and import it here
function ChatPage() {
  return <ClientChatPage />
}

export default ChatPage
