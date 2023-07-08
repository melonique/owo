import React, { useMemo, useEffect, createContext, useContext, useState, ReactNode, useCallback } from "react";
import { DEFAULT_BOT_CONFIG  } from '@/config/ChatDefaults'
import { User, Message, BotMessage, BotMode } from "@/types/ChatTypes";
import { useChat } from "./ChatContext";

interface BotContextData {
  userResponses: string[];
  botMode: BotMode;
  resetBot: () => void;
}

const BotContext = createContext<BotContextData | undefined>(undefined);

const DEFAULT_QUESTIONS: BotMessage[] = DEFAULT_BOT_CONFIG.offer.messages;

interface BotProviderProps {
  children: ReactNode;
  botId: 'offer'
}

export const BotProvider = ({ children, botId }: BotProviderProps) => {
  const [currentBotMessageIndex, setCurrentBotMessageIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const addUserResponse = (label: string, value: string):void => {
    setUserResponses((userResponses) => ({...userResponses, [label]: value}))
  }
  const [botMode, setBotMode] = useState<BotMode>('talk');

  const { getMessagesByConversationId, currentUser, addMessage, resetConversations } = useChat();
  const currentMessages = getMessagesByConversationId(botId);

  const getMessage = (index: number): BotMessage | null => {
    // si je ne suis pas au bout de ma liste
    if (index < DEFAULT_QUESTIONS.length) {

      const nextQuestion = DEFAULT_QUESTIONS[index]
      // si ma question est pas null ou undefined pareil
      return nextQuestion || null
    }
    return null
  }

  const resetBot = () => {
    setUserResponses({})
    setCurrentBotMessageIndex(0)
    resetConversations()
    const msg = getMessage(0)
    if (msg) {
      addMessage(botId, msg);
    }
  }

  const sendBotMessage = () => {
    const newIndex = currentBotMessageIndex + 1
    // change for next question
    setCurrentBotMessageIndex(newIndex);
    // delay the sending of the next message
    setTimeout(() => {
      const msg = getMessage(newIndex)
      if (msg) {
        setBotMode(msg.mode);
        addMessage(botId, msg);
      }
    }, 500);
  }

  // send first message
  useEffect(() => {
    const msg = getMessage(0)
    setCurrentBotMessageIndex(0);
    if (msg) {
      setBotMode(msg.mode);
      addMessage(botId, msg);
    }
  }, [])


  // Actions on new messages added to conversation
  useEffect(() => {
    const lastMessage = currentMessages[currentMessages.length - 1]
    if (!lastMessage) { return; }

    const messageIsFromBot = lastMessage.user.id === botId


    switch (botMode) {
      case 'listen':
        // if message from current user
        if (lastMessage && lastMessage.user.id === currentUser.id) {
          const lastBotMessage = getMessage(currentBotMessageIndex)
          if(lastBotMessage) {
            addUserResponse(lastBotMessage.label, lastMessage.content);
            sendBotMessage();
          }
        }
        break;
      case 'talk':
        if(messageIsFromBot){
          sendBotMessage()
        }
      case 'process':
          console.log('IS SUPPOSED TO PROCESS SOMETHING')
      default:
        break;
    }

    // if message from bot
    if (lastMessage && lastMessage.user.id === botId && botMode === 'talk') {
      console.log('TALKING', currentBotMessageIndex)
    }

  }, [currentMessages])


/*  useEffect(() => {
    const msg = getNextMessage()
    if (msg) {
      addMessage('offer', getNextMessage());
    }
  }, [currentBotMessageIndex]) */




  return (
    <BotContext.Provider
      value={{
        userResponses,
        botMode,
        resetBot
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

export const useBot = (): BotContextData => {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error("useBot must be used within a BotProvider.");
  }
  return context;
};
