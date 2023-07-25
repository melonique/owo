import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BiReset } from 'react-icons/bi';
import { useChat } from "@/contexts/ChatContext";
import { useBot } from "@/contexts/BotContext";
import { Message } from "@/types/ChatTypes";

import ChatBotMessage from './Message'
import ChatBotTextInput from './TextInput'
import ChatBotContifmInput from './ConfirmInput'

const ChatBot: React.FC = () => {
  const { getMessagesByConversationId, currentUser } = useChat();
  const { resetBot, botMode } = useBot();

  const currentMessages = getMessagesByConversationId('offer');
  const BotInput = () => {
    switch (botMode) {
      case 'listen':
        return <ChatBotTextInput chatId="offer" />
      case 'listen-confirm':
        return <ChatBotContifmInput />
      default:
        return <ChatBotTextInput disabled chatId="offer" />
    }
  }

  return (
    <Card className="chatWindow">
      <Card.Header className="d-flex justify-content-between align-items-center p-3">
        <h5 className="mb-0">Poster une offre</h5>
        <Button onClick={resetBot}>
          <BiReset className="icon" />
        </Button>
      </Card.Header>
      <Card.Body style={{ position: "relative", height: "400px", overflowY: "auto" }}>
        {currentMessages.map((message: Message) => (
          <ChatBotMessage
            key={message.id}
            avatar={message.user.avatar}
            content={message.content}
            timestamp={message.timestamp}
            isCurrentUser={message.user.id == currentUser.id}
          />
        ))}
      </Card.Body>
      <Card.Footer>
        <BotInput />
      </Card.Footer>
    </Card>
  );
};

export default ChatBot;
