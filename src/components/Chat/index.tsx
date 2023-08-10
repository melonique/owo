import React, { useState, useEffect } from "react";
import { Row, Col, Card, Offcanvas } from "react-bootstrap";
import { useChat } from "@/contexts/ChatContext";

import ChatWithUser from './ChatWithUser'
import ChatUserList from './ChatUserList'
import ChatWithBot from './ChatBot'

const Chat: React.FC = () => {
  const { selectedConversation: conversation, currentUser, conversations, currentChatId, isSelectedConversationBot } = useChat();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          {isSelectedConversationBot
            ? <ChatWithBot showNav={handleShow} />
            : <ChatWithUser conversation={conversation} currentUser={currentUser} showNav={handleShow} />
          }
        </Col>
    </Row>

  );
};

export default Chat;
