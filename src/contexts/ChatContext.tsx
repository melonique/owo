import React, { createContext, useCallback, useContext, useEffect, useState, PropsWithChildren } from "react";
import { User, Conversation, Message } from "@/types/ChatTypes";
import { DEFAULT_USERS, DEFAULT_WELCOME_MESSAGE, DEFAULT_CONVERSATIONS, CURRENT_USER } from "@/config/ChatDefaults";
interface ChatContextData {
  users: User[];
  conversations: Conversation[];
  currentUser: User;
  addMessage: (conversationId: string, message: Message) => void;
  getMessagesByConversationId: (conversationId: string) => Message[];
  getConversationById: (conversationId: string) => Conversation | undefined;
  resetConversations: () => void;
}
const ChatContext = createContext<ChatContextData>({} as ChatContextData);


export const ChatProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(DEFAULT_USERS);
  const [conversations, setConversations] = useState<Conversation[]>(DEFAULT_CONVERSATIONS);
  const [currentUser] = useState<User>(CURRENT_USER)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("chatUsers")) {
        setUsers(JSON.parse(localStorage.getItem("chatUsers") as string))
      }
    }

    const storedUsers = localStorage.getItem("chatUsers");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const addMessage = (conversationId: string, message: Message) => {
    setConversations((prevConversations) => prevConversations.map(notifyMatchOrReturn(conversationId, message)));
  };

  return (
    <ChatContext.Provider
      value={{
        users,
        currentUser,
        conversations,
        addMessage,
        getMessagesByConversationId: useCallback(getMessagesByConversationId(conversations), [conversations]),
        getConversationById: useCallback(getConversationById(conversations), [conversations]),
        resetConversations: () => setConversations(DEFAULT_CONVERSATIONS)
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider.");
  }
  return context;
};

const notifyMatchOrReturn = (conversationId: Conversation['id'], message: Message) => (conversation : Conversation): Conversation => {
  if (conversation.id === conversationId) {
    return {
      ...conversation,
      messages: [...conversation.messages, message],
    };
  }
  return conversation;
}

const getMessagesByConversationId = (conversations: Conversation[]) => (conversationId: string) => {
  const selectedConversation = conversations.find(
    (conversation) => conversation.id === conversationId
  );
  return selectedConversation?.messages || [];
};

const getConversationById = (conversations: Conversation[]) => (conversationId: string) => {
  const selectedConversation = conversations.find(
    (conversation) => conversation.id === conversationId
  );
  return selectedConversation;
};
