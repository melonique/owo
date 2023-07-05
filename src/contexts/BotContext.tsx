import React, { useMemo, useEffect, createContext, useContext, useState, ReactNode, useCallback } from "react";
import { DEFAULT_BOT_CONFIG  } from '@/config/ChatDefaults'
import { User, Message } from "@/types/ChatTypes";
import { useChat } from "./ChatContext";

interface BotContextData {
  userResponses: string[];
}

const BotContext = createContext<BotContextData | undefined>(undefined);

const DEFAULT_QUESTIONS = DEFAULT_BOT_CONFIG.offer.messages;

interface BotProviderProps {
  children: ReactNode;
  botId: 'offer'
}

export const BotProvider = ({ children, botId }: BotProviderProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);

  const { getMessagesByConversationId, currentUser, addMessage } = useChat();
  const currentMessages = getMessagesByConversationId(botId);

  const getMessage = (index: number) => {
    // si je ne suis pas au bout de ma liste
    if (index < DEFAULT_QUESTIONS.length) {

      const nextQuestion = DEFAULT_QUESTIONS[index]
      // si ma question est pas null ou undefined pareil
      if (nextQuestion) {
        return {
          id: "m-" + nextQuestion, // Replace with a proper ID generation method
          user: DEFAULT_BOT_CONFIG.offer.user,
          content: nextQuestion,
          timestamp: new Date().toISOString(),
        };
      }
    }
    return null
  }


  useEffect(() => {
    const msg = getMessage(0)
    if (msg) {
      addMessage(botId, msg);
    }
  }, [])

  useEffect(() => {
    const lastMessage = currentMessages[currentMessages.length - 1]

    // if message from current user
    if (lastMessage && lastMessage.user.id === currentUser.id) {
      const newIndex = currentQuestionIndex + 1
      // save its answer
      setUserResponses((prevResponses) => [...prevResponses, lastMessage.content]);
      // change for next question
      setCurrentQuestionIndex(newIndex);


      // delay the sending of the next message
      setTimeout(() => {
        const msg = getMessage(newIndex)
        if (msg) {
          addMessage(botId, msg);
        }
      }, 1000);


    }
  }, [currentMessages])


/*  useEffect(() => {
    const msg = getNextMessage()
    if (msg) {
      addMessage('offer', getNextMessage());
    }
  }, [currentQuestionIndex]) */




  return (
    <BotContext.Provider
      value={{
        userResponses
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
