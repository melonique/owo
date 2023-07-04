import React, { createContext, useContext, useState, ReactNode } from "react";

interface BotContextData {
  currentQuestion: string | null;
  userResponses: string[];
  recordResponse: (response: string) => void;
}

const BotContext = createContext<BotContextData | undefined>(undefined);

const DEFAULT_QUESTIONS = ["What is your name?", "How old are you?", "What's your favorite color?"];

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

  const recordResponse = (response: string) => {
    setUserResponses((prevResponses) => [...prevResponses, response]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <BotContext.Provider
      value={{
        currentQuestion: getNextQuestion(),
        recordResponse,
        userResponses,
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
