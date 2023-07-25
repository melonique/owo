import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BiReset } from 'react-icons/bi';
import { useChat } from "@/contexts/ChatContext";
import { Message } from "@/types/ChatTypes";

import ChatMessage from './Message'
import ChatTextInput from './TextInput'
import ChatListItem from './ChatListItem'
type props = {
  currentChatId: string;
}
const Chat: React.FC<props> = ({ currentChatId }) => {
  const { getConversationById, currentUser, conversations } = useChat();
  const conversation = getConversationById(currentChatId)
  if (!conversations) {
    return <>Loading...</>
  }
  return (
    <Row>
      <Col md="4" lg="5" xl="4" >
        {conversations.filter(c => c.id !== 'offer').map((chat) => (
          <ChatListItem key={chat.id} {...chat} />
        ))}
      </Col>
        <Col md="8" lg="7" xl="8">
        <Card className="chatWindow">
          <Card.Header className="d-flex justify-content-between align-items-center p-3">
            <h5 className="mb-0">{conversation.title}</h5>
          </Card.Header>
          <Card.Body style={{ position: "relative", height: "400px", overflowY: "auto" }}>
            {conversation.messages.map((message: Message) => (
              <ChatMessage
                key={message.id}
                avatar={message.user.avatar}
                content={message.content}
                timestamp={message.timestamp}
                isCurrentUser={message.user.id == currentUser.id}
              />
            ))}

            <ChatTextInput chatId={currentChatId} />
          </Card.Body>
        </Card>
          </Col>
    </Row>

  );
};

export default Chat;
