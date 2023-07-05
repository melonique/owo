import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Chat } from '@/components'
import { BotProvider } from '@/contexts/BotContext'
import { ChatProvider } from '@/contexts/ChatContext'
import { useRouter } from "next/router"
import useAuthentication from "@/authentication/useAuthentication"
import { useEffect } from "react"
import { PrivateLayout } from "@/components/Layouts"


const Offer = () => {
  const router = useRouter()
  const { user } = useAuthentication()

  /* useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user]) */

  return (
    <ChatProvider>
      <BotProvider id="offer">
        <Container fluid className="text-center">
          <Row className="d-flex justify-content-center">
            <Col md="10" lg="8" xl="6">
              <Chat />
            </Col>
          </Row>
        </Container>
      </BotProvider>
    </ChatProvider>
  )
}


Offer.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}


export default Offer
