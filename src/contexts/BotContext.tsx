import React, { useEffect, createContext, useContext, useState, ReactNode, useCallback } from "react";
import { OFFER_BOT_CONFIG } from '@/bots/offer/config'
import { Message, BotMessage, BotMode } from "@/types/ChatTypes";
import { useChat } from "./ChatContext";

interface BotContextData {
  botMemory: any;
  botMode: BotMode;
  resetBot: () => void;
}

const BotContext = createContext<BotContextData | undefined>(undefined);

const DEFAULT_QUESTIONS: BotMessage[] = OFFER_BOT_CONFIG.messages;

interface BotProviderProps {
  children: ReactNode;
  botId: 'offer'
}

export const BotProvider = ({ children, botId }: BotProviderProps) => {
  const [currentBotMessageIndex, setCurrentBotMessageIndex] = useState(0);
  const [botMemory, setBotMemory] = useState({});
  const addUserResponse = (label: string, value: string):void => {
    setBotMemory((botMemory) => ({...botMemory, [label]: value}))
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
    setBotMemory({})
    setCurrentBotMessageIndex(0)
    resetConversations()
    const msg = getMessage(0)
    if (msg) {
      addMessage(botId, msg.updateMsg(botMemory));
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
        addMessage(botId, msg.updateMsg(botMemory));
      }
    }, 500);
  }

  // send first message
  useEffect(() => {
    const msg = getMessage(0)
    setCurrentBotMessageIndex(0);
    if (msg) {
      resetConversations();
      setBotMode(msg.mode);
      addMessage(botId, msg.updateMsg(botMemory));
    }
  }, [])


  // Actions on new messages added to conversation
  useEffect(() => {
    const lastMessage = currentMessages[currentMessages.length - 1]
    if (!lastMessage) { return; }

    const isBotMessage = (message: Message): message is BotMessage => message.user.id === botId

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
        if (isBotMessage(lastMessage)) {
          sendBotMessage()
        }
      case 'process':
        if (isBotMessage(lastMessage)) {
          const lastLastMessage = currentMessages[currentMessages.length - 2]
          lastMessage.action?.(lastLastMessage.content)
            .then((result) => {
              if (result) {
                addUserResponse(lastMessage.label, result);
                sendBotMessage();
              }
            })
        }
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
        botMemory,
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
