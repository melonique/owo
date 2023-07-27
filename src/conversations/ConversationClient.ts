import { supabase } from '@/config/SupabaseClient'

type UserId = string

type ConversationId = string

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
  sender: UserId | undefined
  message: string
}

type FindConversationRequest = {
  sender: UserId,
  receiver: UserId,
}

type FindConversationResponse = ConversationId | undefined

const findConversationByUser = async ({ sender, receiver }: FindConversationRequest): Promise<FindConversationResponse> => {
  const { data: senderConversations } = await supabase
    .from('user_conversations')
    .select('*')
    .eq('user_profile', sender)

  const { data: receiverConversations } = await supabase
    .from('user_conversations')
    .select('*')
    .eq('user_profile', receiver)

  // find the first
  return ''
}
