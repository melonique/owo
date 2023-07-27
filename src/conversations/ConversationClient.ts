import { supabase } from '@/config/SupabaseClient'

type UserId = string

type ConversationId = string

type Maybe<T> = T | undefined

type Conversation = {
  id: ConversationId
  title: string
  users: UserId[]
  messages: UserMessage[]
}

type UserMessageId = string

type UserMessage = {
  id: UserMessageId
  sentAt: string
  sender: Maybe<UserId>
  message: string
}

type InitializeConversationUsecase = Omit<Conversation, 'id' | 'messages'>

const initializeConversation = async ({ title, users }: InitializeConversationUsecase): Promise<Conversation> => {
  const maybeConversation = await findConversationByUser({ sender: users[0], receiver: users[1] })

  return maybeConversation
    ? fetchConversation(maybeConversation)
    : createConversation({ title, users })
}

type FindConversationRequest = {
  sender: UserId,
  receiver: UserId,
}

type FindConversationResponse = Maybe<ConversationId>

const findConversationByUser = async ({ sender, receiver }: FindConversationRequest): Promise<FindConversationResponse> => {
  const { data: senderConversations } = await supabase
    .from('user_conversations')
    .select('conversation')
    .eq('user_profile', sender)
    .returns<ConversationId[]>()

  const { data: receiverConversations } = await supabase
    .from('user_conversations')
    .select('conversation')
    .eq('user_profile', receiver)
    .returns<ConversationId[]>()

  const firstCommonConversation = senderConversations?.find(
    (toFind) => receiverConversations?.some((found) => toFind === found)
  )

  return firstCommonConversation
}

type ConversationMetadata = Omit<Conversation, 'users' | 'messages'>

type FetchConversationResponse = Conversation

const fetchConversation = async (id: ConversationId): Promise<FetchConversationResponse> => {
  const { data: conversation } = await supabase
    .from('conversation')
    .select('id,title')
    .eq('id', id)
    .returns<ConversationMetadata>()

  if (!conversation) {
    throw new Error('conversation not found')
  }

  const users = await fetchConversationUsers(conversation.id)
  const messages = await fetchUserMessages(conversation.id)

  return {
    ...conversation,
    users,
    messages,
  }
}

const fetchConversationUsers = async (id: ConversationId): Promise<Conversation['users']> => {
  const { data: users } = await supabase
    .from('user_conversations')
    .select('user_profile')
    .eq('conversation', id)
    .returns<Conversation['users']>()

    return users || []
}

const fetchUserMessages = async (id: ConversationId): Promise<Conversation['messages']> => {
  const { data: messages } = await supabase
    .from('user_messages')
    .select(`
      id,
      sent_at:sentAt,
      sender,
      message
    `)
    .eq('conversation', id)
    .order('sentAt', { ascending: true })
    .returns<Conversation['messages']>()

    return messages || []
}

type CreateConversationUsecase = Omit<Conversation, 'id' | 'messages'>

const createConversation = async ({ title, users }: CreateConversationUsecase): Promise<Conversation> => {
  const { data: conversationId } = await supabase
    .from('conversation')
    .insert({ title })
    .select('id')
    .returns<ConversationId>()

  if (!conversationId) {
    throw new Error('cannot create conversation')
  }

  await supabase
    .from('user_conversations')
    .insert(users.map((userId) => ({ conversation: conversationId, user_profile: userId })))

  return {
    id: conversationId,
    title,
    users,
    messages: [],
  }
}

type UpdateConversationUsecase = ConversationMetadata

const updateConversation = async ({ id, title }: UpdateConversationUsecase): Promise<Conversation> => {
  await supabase
    .from('conversation')
    .update({ title })
    .eq('id', id)
    
  return await fetchConversation(id)
}

type SendMessageUsecase = {
  id: ConversationId,
  sender: UserId,
  message: string,
}

const sendMessage = async ({ id, sender, message }: SendMessageUsecase): Promise<void> => {
  const newMessage = {
    conversation: id,
    sender,
    message,
  }

  await supabase
    .from('user_messages')
    .insert(newMessage)
}

export {
  initializeConversation,
  updateConversation,
  sendMessage,
}