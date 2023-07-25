import React, { useRef, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
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
  const { getConversationById, currentUser, conversations } = useChat();
  const conversation = getConversationById(currentChatId)

  if (!conversation) {
    return <>Loading...</>
  }
  const isBot = conversation.id === 'offer'

  return (
    <Row>
      <Col md="4" lg="5" xl="4" >
        <Card className="chatWindow">
          <ChatUserList conversations={conversations} currentChatId={currentChatId}/>
        </Card>
      </Col>
        <Col md="8" lg="7" xl="8">
        {isBot ? <ChatWithBot />
          : <ChatWithUser currentChatId={currentChatId} conversation={conversation} currentUser={currentUser} />}

        </Col>
    </Row>

  );
};

export default Chat;
