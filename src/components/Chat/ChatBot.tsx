import React, { useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { BiReset } from 'react-icons/bi';
import { useChat } from "@/contexts/ChatContext";
import { useBot } from "@/contexts/BotContext";
import { Message } from "@/types/ChatTypes";
import { IoIosMenu } from 'react-icons/io';

import ChatBotMessage from './Message'
import ChatBotTextInput from './TextInput'
import ChatBotContifmInput from './ConfirmInput'
import ChatBotPictureInput from './PictureInput'
import ResetInput from './ResetInput'
import ChatMessages from './ChatMessages'



const BotInput: React.FC<{botMode : string}> = ({ botMode }) => {
  switch (botMode) {
    case 'listen':
      return <ChatBotTextInput />
    case 'listen-picture':
      return <ChatBotPictureInput />
    case 'listen-confirm':
      return <ChatBotContifmInput />
    case 'end':
      return <ResetInput />
    default:
      return <ChatBotTextInput />
  }
}

type ChatBotProps = {
  showNav: () => void;
}
const ChatBot: React.FC<ChatBotProps> = ({ showNav }) => {
  const { getMessages, currentUser, selectedConversation: conversation } = useChat();
  const { resetBot, botMode, botMemory } = useBot();
  const ref = useRef<HTMLDivElement>(null);
  const currentMessages = conversation?.messages || getMessages();

  useEffect(() => {
    if (currentMessages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [currentMessages.length]);


  return (
    <Card className="chatWindow">
      <Card.Header className="d-flex justify-content-between align-items-center p-3">
        <Button variant="light" className="d-md-none" onClick={showNav}>
          <IoIosMenu className="icon" />
        </Button>
        <h5 className="mb-0">{conversation?.title} <span className="text-muted" title={JSON.stringify(botMemory, null, 2)}>🛠</span></h5>
        <Button variant="light" onClick={resetBot}>
          <BiReset className="icon" />
        </Button>
      </Card.Header>
      <Card.Body style={{ position: "relative", overflowY: "auto" }}>
        <ChatMessages component={ChatBotMessage} messages={currentMessages} currentUser={currentUser}/>
        <div ref={ref} />
      </Card.Body>
      <Card.Footer>
        <BotInput botMode={botMode} />
      </Card.Footer>
    </Card>
  );
};

export default ChatBot;
