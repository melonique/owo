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

type ConversationUserData = {
  [user: UserId]: string,
}

export type ConversationMetadata = Omit<Conversation, 'messages'> & { userData: ConversationUserData[] }

type UserMessageId = string

export type UserMessage = {
  id: UserMessageId
  sentAt: string
  sender: Maybe<UserId>
  message: string
}

const getConversations = async (user: UserId): Promise<ConversationMetadata[]> => {
  const { data: conversations } = await supabase
    .from('conversation_metadata')
    .select(`
      id,
      title,
      users,
      userData:user_data
    `)
    .contains('users', [user])
    .returns<ConversationMetadata[]>()

  return conversations || []
}

type InitializeConversationUsecase = Omit<Conversation, 'id' | 'messages'>

const initializeConversation = async ({ title, users }: InitializeConversationUsecase): Promise<Conversation> => {
  const maybeConversation = await findConversationByUser({ sender: users[0], receiver: users[1] })

  return maybeConversation
    ? await updateConversation({ id: maybeConversation, title })
    : await createConversation({ title, users })
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
    .returns<{ conversation: ConversationId }[]>()

  const { data: receiverConversations } = await supabase
    .from('user_conversations')
    .select('conversation')
    .eq('user_profile', receiver)
    .returns<{ conversation: ConversationId }[]>()

  const firstCommonConversation = senderConversations?.find(
    (toFind) => receiverConversations?.some((found) => toFind.conversation === found.conversation)
  )

  return firstCommonConversation?.conversation
}

const fetchConversation = async (id: ConversationId): Promise<Conversation> => {
  const { data: conversation } = await supabase
    .from('conversation')
    .select('id,title')
    .eq('id', id)
    .single<ConversationMetadata>()

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
    .returns<{ user_profile: Conversation['users'][0] }[]>()

    return users?.map((user) => (user.user_profile)) || []
}

const fetchUserMessages = async (id: ConversationId): Promise<Conversation['messages']> => {
  const { data: messages } = await supabase
    .from('user_messages')
    .select(`
      id,
      sentAt:sent_at,
      sender,
      message
    `)
    .eq('conversation', id)
    .order('sent_at', { ascending: true })
    .returns<Conversation['messages']>()

    return messages || []
}

type CreateConversationUsecase = Omit<Conversation, 'id' | 'messages'>

const createConversation = async ({ title, users }: CreateConversationUsecase): Promise<Conversation> => {
  const { data: conversationMetadata } = await supabase
    .from('conversation')
    .insert({ title })
    .select('id,title')
    .single<ConversationMetadata>()

  if (!conversationMetadata) {
    throw new Error('cannot create conversation')
  }

  await supabase
    .from('user_conversations')
    .insert(users.map((userId) => ({ conversation: conversationMetadata.id, user_profile: userId })))

  return {
    id: conversationMetadata.id,
    title: conversationMetadata.title,
    users,
    messages: [],
  }
}

type UpdateConversationUsecase = {
  id: Conversation['id'],
  title: Conversation['title'],
}

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
  getConversations,
  initializeConversation,
  sendMessage,
}
