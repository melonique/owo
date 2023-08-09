import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Offcanvas } from "react-bootstrap";
import { BiReset } from 'react-icons/bi';
import { useChat } from "@/contexts/ChatContext";
import { Message } from "@/types/ChatTypes";

import ChatWithUser from './ChatWithUser'
import ChatUserList from './ChatUserList'
import ChatWithBot from './ChatBot'

type props = {
  currentChatId: string;
}
const Chat: React.FC<props> = ({ currentChatId }) => {
  const { getConversationById, currentUser, conversations, loadConversationMessages } = useChat();
  const conversation = getConversationById(currentChatId);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isBot = conversation && (conversation.id === 'offer' || conversation.id === 'search');

  useEffect(() => {
    if (!currentChatId || isBot) return

    loadConversationMessages(currentChatId)
  }, [currentChatId])

  if (!conversation) {
    return <>Loading...</>
  }

  return (
    <Row>


      <Col md="4" lg="5" xl="4">
        <Offcanvas show={show} onHide={handleClose} responsive="md">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Card style={{ width: '100%' }}>
              <ChatUserList conversations={conversations} currentChatId={currentChatId} />
            </Card>
          </Offcanvas.Body>
        </Offcanvas>
      </Col>

        <Col sm="12" md="8" lg="7" xl="8">
        {isBot ? <ChatWithBot showNav={handleShow} botId={conversation.id as 'offer' | 'search'} />
          : <ChatWithUser currentChatId={currentChatId} conversation={conversation} currentUser={currentUser} showNav={handleShow} />}

        </Col>
    </Row>

  );
};

export default Chat;
