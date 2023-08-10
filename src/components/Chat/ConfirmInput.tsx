import React, { useState } from "react";
import { useChat } from "@/contexts/ChatContext";
import { FaPaperPlane } from 'react-icons/fa';
import { Message } from "@/types/ChatTypes";
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

interface ConfirmInputProps {
  disabled?: boolean;
}

const ConfirmInput: React.FC<ConfirmInputProps> = ({ disabled }) => {
  const { addMessage, currentUser } = useChat();
  const [radioValue, setRadioValue] = useState('');
  const handleChange = (val:string) => setRadioValue(val);

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
      type: 'text',
    };

    addMessage(newMessage);

    // Reset input field
    setRadioValue('')
  };


  return (
    <div className="chat-input d-flex align-items-center">
      <ToggleButtonGroup type="radio" name="confirm" value={radioValue} onChange={handleChange}>
        <ToggleButton id="tbg-radio-1" value="Non" variant="danger" disabled={disabled}>
          Non
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value="Oui" variant="secondary" disabled={disabled}>
          Oui
        </ToggleButton>
      </ToggleButtonGroup>

      <Button className="ms-3" onClick={handleSend} disabled={disabled}>
        <FaPaperPlane className="icon" />
      </Button>
    </div>
  );
};

export default ConfirmInput;
