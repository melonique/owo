import React, { useContext, useRef, useState } from "react";
import { useChat } from "@/contexts/ChatContext";
import { FaSmile, FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { Message, User } from "@/types/ChatTypes";
import {
  Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

interface ConfirmInputProps {
  disabled?: boolean;
}

const ConfirmInput: React.FC<ConfirmInputProps> = ({ disabled }) => {
  const { addMessage, currentUser } = useChat();
  const [radioValue, setRadioValue] = useState('');
  const handleChange = (val:string) => setRadioValue(val);
  const id = "offer"

  const handleSend = () => {
    const message = radioValue;

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
    setRadioValue('')
  };


  return (
    <div className="chat-input d-flex align-items-center">
      <ToggleButtonGroup type="radio" name="confirm" value={radioValue} onChange={handleChange}>
        <ToggleButton id="tbg-radio-1" value="Non" variant="danger">
          Non
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value="Oui" variant="secondary">
          Oui
        </ToggleButton>
      </ToggleButtonGroup>

      <Button className="ms-3" onClick={handleSend}>
        <FaPaperPlane className="icon" />
      </Button>
    </div>
  );
};

export default ConfirmInput;
