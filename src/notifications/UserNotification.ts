type UserNotification<T> = {
  id: string,
  target: string,
  excerpt: string,
  type: 'message',
  createdAt: string,
  context: T,
  status: 'new' | 'seen' | 'deleted',
}

type ConversationContext = {
  conversationId: string,
}

export type UserConversationNotification = UserNotification<ConversationContext>