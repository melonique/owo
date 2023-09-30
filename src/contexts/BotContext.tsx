import React, { useEffect, createContext, useContext, useState, ReactNode } from "react";
import { OFFER_BOT_CONFIG } from '@/bots/offer/config'
import { SEARCH_BOT_CONFIG } from '@/bots/search/config'
import { Message, BotMessage, BotMode } from "@/types/ChatTypes";
import { useChat } from "./ChatContext";

interface BotContextData {
  botMemory: Record<string, string>;
  botMode: BotMode;
  resetBot: () => void;
}

const BotContext = createContext<BotContextData | undefined>(undefined);

const DEFAULT_QUESTIONS: { search: BotMessage[], offer: BotMessage[] } = { offer: OFFER_BOT_CONFIG.messages, search: SEARCH_BOT_CONFIG.messages };

interface BotProviderProps {
  children: ReactNode;
  botId: 'offer' | 'search';
}

export const BotProvider = ({ children, botId }: BotProviderProps) => {
  const [currentBotMessageIndex, setCurrentBotMessageIndex] = useState(0);
  const [botMemory, setBotMemory] = useState<Record<string, string>>({});
  const [botMode, setBotMode] = useState<BotMode>('talk');

  const { getMessages, currentUser, addMessage, resetBotConversations: resetConversations } = useChat();

  const currentMessages = getMessages();

  const getMessage = (index: number): BotMessage | null => {
    return DEFAULT_QUESTIONS[botId][index] ?? null;
  }

  const sendMessageAt = (index: number): void => {
    const msg = getMessage(index)
    if (msg) {
      addMessage(msg.updateMsg(botMemory));
      setBotMode(msg.mode);
    }
  }

  const resetBot = () => {
    setBotMemory({})
    setCurrentBotMessageIndex(0)
    resetConversations()
    sendMessageAt(0)
  }

  const sendBotMessage = () => {
    const newIndex = currentBotMessageIndex + 1;
    // change for next question
    setCurrentBotMessageIndex(newIndex);
    // delay the sending of the next message
    setTimeout(() => {
      sendMessageAt(newIndex);
    }, 500);
  }

  // send first message
  useEffect(() => {
    setCurrentBotMessageIndex(0);
    resetConversations();
    sendMessageAt(0);
  }, [botId])


  // Actions on new messages added to conversation
  useEffect(() => {
    const lastMessage = currentMessages[currentMessages.length - 1]
    if (!lastMessage) { return; }

    const isBotMessage = (message: Message): message is BotMessage => message.user.id === botId

    switch (botMode) {
      case 'listen':
      case 'listen-picture':
      case 'listen-confirm':
        if (lastMessage.isAuthor(currentUser)) {
          const lastBotMessage = getMessage(currentBotMessageIndex)
          if(lastBotMessage) {
            setBotMemory((botMemory) => ({ ...botMemory, [lastBotMessage.label]: lastMessage.content }))
            sendBotMessage();
          }
        }
        break;
      case 'talk':
        if (isBotMessage(lastMessage)) {
          sendBotMessage()
        }
        break;
      case 'process':
        if (isBotMessage(lastMessage)) {
          lastMessage.action?.(botMemory)
            .then((result) => {
              if (result) {
                setBotMemory((botMemory) => ({ ...botMemory, [lastMessage.label]: result }))
                sendBotMessage();
              }
            })
        }
        break;
      default:
        break;
    }
  }, [currentMessages])

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
