import React, { useContext, useRef, useState } from "react";
import { useChat } from "@/contexts/ChatContext";
import { FaSmile, FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { Message, User } from "@/types/ChatTypes";
import {
  Button, ButtonGroup, ToggleButton } from 'react-bootstrap'

interface ChatTextInputProps {
  disabled?: boolean;
}

const ChatTextInput: React.FC<ChatTextInputProps> = ({ disabled }) => {
  const { addMessage, currentUser } = useChat();
  const [radioValue, setRadioValue] = useState('');
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


  const confirmOptions = [
    { name: 'Non', value: 'NO', color: 'primary' },
    { name: 'Oui', value: 'YES', color: 'secondary'},
  ];



  return (
    <div className="chat-input d-flex align-items-center">

      <ButtonGroup>
        {confirmOptions.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={radio.color}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <Button className="ms-3" href="#!">
        <FaPaperPlane className="icon" />
      </Button>
    </div>
  );
};

export default ChatTextInput;
