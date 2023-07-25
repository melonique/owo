import React, { useEffect, useRef } from "react";
import { useChat } from "@/contexts/ChatContext";
import { FaSmile, FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { Message, User } from "@/types/ChatTypes";
import { Button } from 'react-bootstrap'

interface ChatTextInputProps {
  disabled?: boolean;
  chatId: string;
}

const ChatTextInput: React.FC<ChatTextInputProps> = ({ disabled, chatId }) => {
  const { addMessage, currentUser } = useChat();
  const messageInput = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const message = messageInput.current?.value;

    if (!message) {
      return;
    }

    const newMessage: Message = {
      id: "m-" + Math.floor(Math.random() * 10000) , // Replace with a proper ID generation method
      user: currentUser,
      content: message,
      timestamp: new Date().toISOString(),
    };

    addMessage(chatId, newMessage);

    // Reset input field
    messageInput.current!.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() =>  {

  }, [])
  return (
    <div className="chat-input d-flex align-items-center">
      <input
        disabled={disabled}
        autoFocus
        type="text"
        className="form-control form-control"
        placeholder="Type message"
        onKeyDown={handleKeyDown}
        ref={messageInput}
      />
      {/*
        <a className="ms-1 text-muted" href="#!">
          <FaSmile className="icon" />
        </a>
        <a className="ms-3 text-muted" href="#!">
          <FaPaperclip className="icon" />
        </a>
        */}
      <Button className="ms-3" onClick={handleSend}>
        <FaPaperPlane className="icon" />
      </Button>
    </div>
  );
};

export default ChatTextInput;
