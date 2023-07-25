import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Chat } from '@/components'
import { useRouter } from 'next/router'
import { BotProvider } from '@/contexts/BotContext'
import { ChatProvider } from '@/contexts/ChatContext'
import { PrivateLayout } from "@/components/Layouts"

const Messages = () => {
  const router = useRouter()
  return (
    <ChatProvider>
      <BotProvider botId="offer">
      <Container fluid className="text-center">
        <Chat currentChatId={router.query.chatId}/>
        </Container>
      </BotProvider>
    </ChatProvider>
  )
}


Messages.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}


export default Messages
