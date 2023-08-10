import { Container } from 'react-bootstrap';
import { Chat } from '@/components'
import { useRouter } from 'next/router'
import { BotProvider } from '@/contexts/BotContext'
import { ChatProvider } from '@/contexts/ChatContext'
import { PrivateLayout } from "@/components/Layouts"

const Messages = () => {
  const router = useRouter()

  return (
    <ChatProvider chatId={router.query.chatId}>
      <BotProvider botId={router.query.chatId}>
        <Container fluid className="text-center">
          <Chat />
        </Container>
      </BotProvider>
    </ChatProvider>
  )
}


Messages.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}


export default Messages
