import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import ChatTextInput from './TextInput';
import ChatMessage from './Message';
import { Conversation, Message, User } from '@/types/ChatTypes';

type ChatWithUserProps = {
  currentChatId: string
   conversation: Conversation
   currentUser: User
}
const ChatWithUser = ({ currentChatId, conversation, currentUser }: ChatWithUserProps) => {

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
        <div ref={ref} />
      </Card.Body>
      <Card.Footer>
        <ChatTextInput chatId={currentChatId} />
      </Card.Footer>
    </Card>
);}

ChatWithUser.propTypes = {};

export default ChatWithUser;
