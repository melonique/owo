import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/config/SupabaseClient'
import { useChat } from "@/contexts/ChatContext";
import { FaPaperPlane } from 'react-icons/fa';
import { Message } from "@/types/ChatTypes";
import { Button } from 'react-bootstrap'
import { PhotoUpload } from '@/components'

interface PicutreInputProps {
  disabled?: boolean;
}

const PicutreInput: React.FC<PicutreInputProps> = ({ disabled }) => {
  const { addMessage, currentUser } = useChat();
  const [file, setFile] = useState<File | null>(null)

  const handleFileSelect = (file: File) => {
    setFile(file);
  };

  const handleSend = async () => {
    if (!file) {
      return;
    }

    // upload file to server
    const uuid = uuidv4();
    const filePath = `${currentUser.id}/${uuid}.${file.name.split('.')[1]}`

    const { data, error } = await supabase
      .storage
      .from('offers')
      .upload(filePath, file, {
        cacheControl: '3600',
      })

    const publicBaseUrl = 'https://nchfhnhquozlugyqknuf.supabase.co/storage/v1/object/public/offers'

    const newMessage: Message = {
      id: uuidv4(),
      user: currentUser,
      content: `${publicBaseUrl}/${filePath}`,
      timestamp: new Date().toISOString(),
      type: "image"
    };

    addMessage(newMessage);

    // Reset input field
    setFile(null);
  };

  const handleCancelMessage = () => {
    setFile(null);

    const cancelMessage: Message = {
      id: uuidv4(),
      user: currentUser,
      content: 'NULL',
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    addMessage(cancelMessage);
  }

  return (
    <div className="chat-input d-flex align-items-center">
      <PhotoUpload onFileSelect={handleFileSelect} />
      <div>
        {file && <Button onClick={handleSend} className="mr-2">
          <FaPaperPlane className="icon" />
        </Button>}

        <Button variant="danger" onClick={handleCancelMessage} >
          X
        </Button>
      </div>
    </div>
  );
};

export default PicutreInput;
