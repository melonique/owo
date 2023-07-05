import React, { createContext, useContext, useState, ReactNode } from "react";
import { DEFAULT_BOT_CONFIG  } from '@/config/ChatDefaults'
import { User, Message } from "@/types/ChatTypes";

interface BotContextData {
  userResponses: string[];
  recordResponse: (response: string) => void;
  currentQuestion: Message | null;
  botUser: User;
}

const BotContext = createContext<BotContextData | undefined>(undefined);

const DEFAULT_QUESTIONS = DEFAULT_BOT_CONFIG.offer.messages;

interface BotProviderProps {
  children: ReactNode;
  id: string
}

export const BotProvider = ({ children, id }: BotProviderProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);

  const getNextQuestion = () => {
    if (currentQuestionIndex < DEFAULT_QUESTIONS.length) {
      return DEFAULT_QUESTIONS[currentQuestionIndex];
    }
    return null;
  };

  const getNextMessage = () => {
    const nextQuestion = getNextQuestion()
    if (nextQuestion) {
      const newMessage: Message = {
        id: "m-" + nextQuestion, // Replace with a proper ID generation method
        user: DEFAULT_BOT_CONFIG.offer.user,
        content: nextQuestion,
        timestamp: new Date().toISOString(),
      };
      return newMessage
    }
    return null
  }

  const recordResponse = (response: string) => {
    setUserResponses((prevResponses) => [...prevResponses, response]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <BotContext.Provider
      value={{
        currentQuestion: getNextMessage(),
        recordResponse,
        userResponses,
        botUser: DEFAULT_BOT_CONFIG.offer.user
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
