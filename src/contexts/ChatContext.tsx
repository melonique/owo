import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { User, Conversation, Message, fromMetadataToConversation, toMessages } from "@/types/ChatTypes";
import { DEFAULT_USERS, DEFAULT_CONVERSATIONS } from "@/config/ChatDefaults";
import { getConversations, initializeConversation, sendMessage } from "@/conversations/ConversationClient";
import useAuthentication from "./authentication/useAuthentication";
interface ChatContextData {
  users: User[];
  conversations: Conversation[];
  selectedConversation: Conversation | undefined;
  currentUser: User;
  currentChatId: string;
  isSelectedConversationBot: boolean;
  addMessage: (message: Message) => void;
  getMessages: () => Message[];
  resetBotConversations: () => void;
}
const ChatContext = createContext<ChatContextData>({} as ChatContextData);

type ChatProviderProps = {
  children: ReactNode;
  chatId: string;
}

export const ChatProvider = ({ children, chatId }: ChatProviderProps) => {
  const { user } = useAuthentication()
  const [users, _] = useState<User[]>(DEFAULT_USERS);
  const [conversations, setConversations] = useState<Conversation[]>(DEFAULT_CONVERSATIONS);
  const isSelectedConversationBot = chatId === 'offer' || chatId === 'search'

  const loadConversations = async (): Promise<void> => {
    if (!user) return

    const currentUserId = user.id
    const metadata = await getConversations(currentUserId)
    const conversationsLoaded = metadata.map(fromMetadataToConversation(currentUserId))

    setConversations((previous) => [...previous, ...conversationsLoaded])
  }

  const loadConversationMessages = async (): Promise<void> => {
    if (!user || isSelectedConversationBot) return

    const selectedConversation = conversations.find((conversation) => conversation.id === chatId)
    if (!selectedConversation) return
    
    const loaded = await initializeConversation({ title: selectedConversation.title, users: [user.id, selectedConversation.user.id!] })

    setConversations((prevConversations) => prevConversations.map(updateMessageOrNothing(loaded.id, toMessages(loaded.messages))))
  }

  useEffect(() => {
    loadConversations()
  }, [user])

  useEffect(() => {
    loadConversationMessages()
  }, [chatId])

  const addMessage = (message: Message) => {
    if (!isSelectedConversationBot && user) {
      sendMessage({ id: chatId, sender: user.id, message: message.content })
    }
    setConversations((prevConversations) => prevConversations.map(notifyMatchOrReturn(chatId, message)));
  };

  return (
    <ChatContext.Provider
      value={{
        users,
        currentUser: { id: user?.id },
        currentChatId: chatId,
        conversations,
        addMessage,
        getMessages: useCallback(() => getMessages(conversations)(chatId), [conversations]),
        selectedConversation: getConversation(conversations)(chatId),
        isSelectedConversationBot,
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

const getMessages = (conversations: Conversation[]) => (conversationId: string) => {
  const selectedConversation = conversations.find(
    (conversation) => conversation.id === conversationId
  );
  return selectedConversation?.messages || [];
};

const getConversation = (conversations: Conversation[]) => (conversationId: string) => {
  const selectedConversation = conversations.find(
    (conversation) => conversation.id === conversationId
  );
  return selectedConversation;
};
