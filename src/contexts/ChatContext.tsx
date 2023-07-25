import React, { createContext, useCallback, useContext, useEffect, useState, PropsWithChildren } from "react";
import { User, Conversation, Message } from "@/types/ChatTypes";
import { DEFAULT_USERS, DEFAULT_WELCOME_MESSAGE, DEFAULT_CONVERSATIONS, CURRENT_USER } from "@/config/ChatDefaults";
interface ChatContextData {
  users: User[];
  conversations: Conversation[];
  currentUser: User;
  addMessage: (conversationId: string, message: Message) => void;
  getMessagesByConversationId: (conversationId: string) => Message[];
  getConversationById: (conversationId: string) => Conversation;
  resetConversations: () => void;
}
const ChatContext = createContext<ChatContextData>({} as ChatContextData);


export const ChatProvider: React.FC<PropsWithChildren> = ({ children }) => {


  const [users, setUsers] = useState<User[]>(DEFAULT_USERS);

  const [conversations, setConversations] = useState<Conversation[]>(DEFAULT_CONVERSATIONS);

  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER)


  useEffect(() => {

    if (typeof window !== "undefined") {
      if (localStorage.getItem("chatUsers")) {
        setUsers(JSON.parse(localStorage.getItem("chatUsers") as string))
      }
    }
    if (typeof window !== "undefined") {
      if (localStorage.getItem("chatConversations")) {
        setConversations(JSON.parse(localStorage.getItem("chatConversations") as string))
      }
    }

    const storedUsers = localStorage.getItem("chatUsers");
    const storedConversations = localStorage.getItem("chatConversations");
    if (storedUsers && storedConversations) {
      setUsers(JSON.parse(storedUsers));
      setConversations(JSON.parse(storedConversations));
    }
  }, []);

/*
  useEffect(() => {
    localStorage.setItem("chatUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("chatConversations", JSON.stringify(conversations));
  }, [conversations]);
*/
/*
  const createConversation = (title: string, user: User) => {
    const newConversation = {
      id: 'm_' + conversations.length + 1,
      title: title,
      user: user,
      messages: [DEFAULT_WELCOME_MESSAGE(user)],
    };
    setConversations((prevConversations) => [
      ...prevConversations,
      newConversation,
    ]);
  };
*/
  const addMessage = (conversationId: string, message: Message) => {
    setConversations((prevConversations) => {
      return prevConversations.map((conversation : Conversation): Conversation => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            messages: [...conversation.messages, message],
          };
        }
        return conversation;
      });
    });
  };

  const getMessagesByConversationId = (conversationId: string) => {
    const selectedConversation = conversations.find(
      (conversation) => conversation.id === conversationId
    );
    return selectedConversation?.messages || [];
  };
  const getConversationById = (conversationId: string) => {
    const selectedConversation = conversations.find(
      (conversation) => conversation.id === conversationId
    );
    return selectedConversation;
  };

  return (
    <ChatContext.Provider
      value={{
        users,
        currentUser,
        conversations,
        addMessage,
        getMessagesByConversationId: useCallback(getMessagesByConversationId, [conversations]),
        getConversationById: useCallback(getConversationById, [conversations]),
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
