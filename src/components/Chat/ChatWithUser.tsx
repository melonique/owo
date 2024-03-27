import React, { useEffect, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import ChatTextInput from './TextInput';
import ChatMessage from './Message';
import ChatMessages from './ChatMessages';
import { Conversation, User } from '@/types/ChatTypes';
import { useLiveChat } from '@/contexts/useLiveChat';
import { IoIosMenu } from 'react-icons/io';


type ChatWithUserProps = {
  conversation: Conversation
  currentUser: User
  showNav: () => void
}
const ChatWithUser = ({ conversation, currentUser, showNav }: ChatWithUserProps) => {
  useLiveChat({ conversation, currentUser })

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
    <Card className="conversationWindow">
      <Card.Header className="d-flex justify-content-start align-items-center p-3">
        <Button variant="light" className="d-md-none mr-3" onClick={showNav}>
          <IoIosMenu className="icon" />
        </Button>
        <h5 className="mb-0">{conversation.title}</h5>
      </Card.Header>

      <div className="d-flex flex-row p-2 d-md-none">
        <div>
          <img
            src={conversation.user.avatar}
            alt="avatar"
            className="d-flex align-self-center me-3"
            width="40"
          />
        </div>
        <p style={{ lineHeight: '40px', margin: 0 }}>{conversation.user.username}</p>
      </div>
      <hr className="m-0 p-0" />

      <Card.Body style={{ position: "relative", height: "400px", overflowY: "auto" }}>
        <ChatMessages component={ChatMessage} messages={conversation.messages} currentUser={currentUser} />
        <div ref={ref} />
      </Card.Body>
      <Card.Footer>
        <ChatTextInput />
      </Card.Footer>
    </Card>
);}

export default ChatWithUser;
