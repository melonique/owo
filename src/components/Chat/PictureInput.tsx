import React, { useState  } from "react";
import { useChat } from "@/contexts/ChatContext";
import { FaPaperPlane } from 'react-icons/fa';
import { Message, User } from "@/types/ChatTypes";
import { Button } from 'react-bootstrap'
import { PhotoUpload } from '@/components'

interface PicutreInputProps {
  disabled?: boolean;
  chatId: 'offer' | 'search';
}

const PicutreInput: React.FC<PicutreInputProps> = ({ disabled, chatId }) => {
  const { addMessage, currentUser } = useChat();
  const [file, setFile] = useState<File | null>(null)

  const handleFileSelect = (file: File) => {
    setFile(file);
  };

  const handleSend = () => {
    if (!file) {
      return;
    }
    debugger
    const newMessage: Message = {
      id: "m-" + Math.floor(Math.random() * 10000), // Replace with a proper ID generation method
      user: currentUser,
      content: (file as File).name,
      timestamp: new Date().toISOString(),
    };

    addMessage(chatId, newMessage);

    // Reset input field
    setFile(null);
  };

  return (
    <div className="chat-input d-flex align-items-center">
      <PhotoUpload onFileSelect={handleFileSelect} />
      <Button className="ms-3" onClick={handleSend}>
        <FaPaperPlane className="icon" />
      </Button>
    </div>
  );
};

export default PicutreInput;
