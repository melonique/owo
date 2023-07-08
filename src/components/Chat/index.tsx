import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BiReset } from 'react-icons/bi';
import { useChat } from "@/contexts/ChatContext";
import { useBot } from "@/contexts/BotContext";
import { Message } from "@/types/ChatTypes";

import ChatMessage from './Message'
import ChatInput from './Input'

const Chat: React.FC = () => {
  const { getMessagesByConversationId, currentUser } = useChat();
  const { userResponses, resetBot, botMode } = useBot();

  const currentMessages = getMessagesByConversationId('offer');


  return (
    <Card className="chatWindow">
      <Card.Header className="d-flex justify-content-between align-items-center p-3">
        <h5 className="mb-0">Poster une offre</h5>
        <Button onClick={resetBot}>
          <BiReset className="icon" />
        </Button>
      </Card.Header>
      <Card.Body style={{ position: "relative", height: "400px", overflowY: "auto" }}>
        {JSON.stringify(userResponses)}

        {currentMessages.map((message: Message) => (
          <ChatMessage
            key={message.id}
            avatar={message.user.avatar}
            content={message.content}
            timestamp={message.timestamp}
            isCurrentUser={message.user.id == currentUser.id}
          />
        ))}

      </Card.Body>
      <Card.Footer className="text-muted d-flex justify-content-start align-items-center">
        <ChatInput disabled={botMode !== 'listen'} />
      </Card.Footer>
    </Card>
  );
};

export default Chat;
