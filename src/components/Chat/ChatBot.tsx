import React, { useRef, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BiReset } from 'react-icons/bi';
import { useChat } from "@/contexts/ChatContext";
import { useBot } from "@/contexts/BotContext";
import { Message } from "@/types/ChatTypes";

import ChatBotMessage from './Message'
import ChatBotTextInput from './TextInput'
import ChatBotContifmInput from './ConfirmInput'

type ChatBotProps = {
  showNav: () => void;
}
const ChatBot: React.FC<ChatBotProps> = ({ showNav }) => {
  const { getMessagesByConversationId, currentUser, getConversationById } = useChat();
  const { resetBot, botMode, botMemory } = useBot();
  const ref = useRef<HTMLDivElement>(null);
  const conversation = getConversationById('offer');
  const currentMessages = conversation?.messages || getMessagesByConversationId('offer');

  useEffect(() => {
    if (currentMessages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [currentMessages.length]);

  const BotInput = () => {
    switch (botMode) {
      case 'listen':
        return <ChatBotTextInput chatId="offer" />
      case 'listen-confirm':
        return <ChatBotContifmInput />
      default:
        return <ChatBotTextInput chatId="offer" />
    }
  }

  return (
    <Card className="chatWindow">
      <Card.Header className="d-flex justify-content-between align-items-center p-3">
        <Button variant="primary" className="d-md-none" onClick={showNav}>
          🍔
        </Button>
        <h5 className="mb-0">{conversation?.title} <span className="text-muted" title={JSON.stringify(botMemory, null, 2)}>🛠</span></h5>
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
        <div ref={ref} />
      </Card.Body>
      <Card.Footer>
        <BotInput />
      </Card.Footer>
    </Card>
  );
};

export default ChatBot;
