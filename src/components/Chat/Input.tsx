import React, { useContext, useRef } from "react";
import { useChat } from "@/contexts/ChatContext";
import { FaSmile, FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { Message, User } from "@/types/ChatTypes";

interface ChatInputProps {
}

const ChatInput: React.FC<ChatInputProps> = () => {
  const { addMessage, currentUser } = useChat();
  const id = "offer"
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

    addMessage(id, newMessage);

    // Reset input field
    messageInput.current!.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
      <input
        type="text"
        className="form-control form-control-lg"
        id="exampleFormControlInput2"
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
      <a className="ms-3" href="#!">
        <FaPaperPlane className="icon" />
      </a>
    </div>
  );
};

export default ChatInput;
