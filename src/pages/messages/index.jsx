import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Chat } from '@/components'
import { BotProvider } from '@/contexts/BotContext'
import { ChatProvider } from '@/contexts/ChatContext'
import { PrivateLayout } from "@/components/Layouts"

const Messages = () => {
  return (
    <ChatProvider>
      <Container fluid className="text-center">
        <Row className="d-flex justify-content-center">
          <Col md="10" lg="8" xl="6">
            <Chat />
          </Col>
        </Row>
      </Container>
    </ChatProvider>
  )
}


Messages.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}


export default Messages
