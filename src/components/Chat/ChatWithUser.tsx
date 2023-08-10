import React, { useEffect, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import ChatTextInput from './TextInput';
import ChatMessage from './Message';
import { Conversation, Message, User } from '@/types/ChatTypes';

type ChatWithUserProps = {
  conversation: Conversation
  currentUser: User
  showNav: () => void
}
const ChatWithUser = ({ conversation, currentUser, showNav }: ChatWithUserProps) => {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation.messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [conversation.messages.length]);

  return (
    <Card className="chatWindow">
      <Card.Header className="d-flex justify-content-start align-items-center p-3">
        <Button variant="primary" className="d-md-none mr-3" onClick={showNav}>
          🍔
        </Button>
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
        <div ref={ref} />
      </Card.Body>
      <Card.Footer>
        <ChatTextInput />
      </Card.Footer>
    </Card>
);}

export default ChatWithUser;
