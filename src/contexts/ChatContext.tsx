import React, { createContext, useCallback, useContext, useEffect, useState, PropsWithChildren } from "react";
import { User, Conversation, Message, fromMetadataToConversation, toMessages } from "@/types/ChatTypes";
import { DEFAULT_USERS, DEFAULT_CONVERSATIONS } from "@/config/ChatDefaults";
import { getConversations, initializeConversation, sendMessage } from "@/conversations/ConversationClient";
import useAuthentication from "./authentication/useAuthentication";
interface ChatContextData {
  users: User[];
  conversations: Conversation[];
  currentUser: User;
  addMessage: (conversationId: string, message: Message) => void;
  getMessagesByConversationId: (conversationId: string) => Message[];
  loadConversationMessages: (conversationId: string) => Promise<void>;
  getConversationById: (conversationId: string) => Conversation | undefined;
  resetBotConversations: () => void;
}
const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthentication()
  const [users, setUsers] = useState<User[]>(DEFAULT_USERS);
  const [conversations, setConversations] = useState<Conversation[]>(DEFAULT_CONVERSATIONS);

  const loadConversations = async (): Promise<void> => {
    if (!user) return

    const currentUserId = user.id
    const metadata = await getConversations(currentUserId)
    const conversationsLoaded = metadata.map(fromMetadataToConversation(currentUserId))

    setConversations((previous) => [...previous, ...conversationsLoaded])
  }

  const loadConversationMessages = async (id: Conversation['id']): Promise<void> => {
    if (!user || id === 'offer' || id === 'search') return

    const selectedConversation = conversations.find((conversation) => conversation.id === id)
    if (!selectedConversation) return
    
    const loaded = await initializeConversation({ title: selectedConversation.title, users: [user.id, selectedConversation.user.id!] })

    setConversations((prevConversations) => prevConversations.map(updateMessageOrNothing(loaded.id, toMessages(loaded.messages))))
  }

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

  useEffect(() => {
    loadConversations()
  }, [user])

  const addMessage = (conversationId: string, message: Message) => {
    if (conversationId !== 'offer' && conversationId !== 'search' && user) {
      sendMessage({ id: conversationId, sender: user.id, message: message.content })
    }
    setConversations((prevConversations) => prevConversations.map(notifyMatchOrReturn(conversationId, message)));
  };

  return (
    <ChatContext.Provider
      value={{
        users,
        currentUser: { id: user?.id },
        conversations,
        addMessage,
        getMessagesByConversationId: useCallback(getMessagesByConversationId(conversations), [conversations]),
        getConversationById: useCallback(getConversationById(conversations), [conversations]),
        loadConversationMessages,
        resetBotConversations: () => setConversations(
          (prevConversations) => prevConversations
            .map(updateMessageOrNothing('offer', []))
            .map(updateMessageOrNothing('search', []))
        )
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

const updateMessageOrNothing = (conversationId: Conversation['id'], messages: Message[]) => (conversation : Conversation): Conversation => {
  if (conversation.id === conversationId) {
    return {
      ...conversation,
      messages,
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
