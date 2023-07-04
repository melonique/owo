import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaSmile, FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { useChat } from "@/contexts/ChatContext";
import { Message } from "@/types/ChatTypes";

import ChatMessage from './Message'
import ChatInput from './Input'

const Chat: React.FC = () => {
  const { getMessagesByConversationId, currentUser } = useChat();
  const id = "offer"
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);


  useEffect(() => {
    const messages = getMessagesByConversationId(id);
    setCurrentMessages(messages);
  }, [getMessagesByConversationId, id]);


  return (
    <Card style={{ height: "100vh" }}>
      <Card.Header className="d-flex justify-content-between align-items-center p-3">
        <h5 className="mb-0">Poster une offre</h5>
      </Card.Header>
      <Card.Body style={{ position: "relative", height: "400px", overflowY: "auto" }}>

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
      <Card.Footer className="text-muted d-flex justify-content-start align-items-center p-3">
        <ChatInput />
      </Card.Footer>
    </Card>
  );
};

export default Chat;
