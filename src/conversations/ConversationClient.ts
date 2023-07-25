import { supabase } from '@/config/SupabaseClient'
import { RealtimeChannel } from '@supabase/supabase-js'

type ChannelIdentification = {
  senderId: string,
  receiverId: string,
}

const SOURCE_SCHEMA = "public"
const SOURCE_TABLE = "conversations"

const initializeChannel = ({ receiverId }: ChannelIdentification): RealtimeChannel => {
  return supabase.channel(receiverId)
    .on(
      "postgres_changes",
      { 
        event: 'INSERT',
        schema: SOURCE_SCHEMA,
        table: SOURCE_TABLE,
        filter: `${receiverId}=in.channel`,
      },
      (payload: unknown) => console.log('return from payload', payload))
    .subscribe()
}

const removeChannel = async (toRemove: RealtimeChannel): Promise<void> => {
  await supabase.removeChannel(toRemove)
}

type SenderMessage = {
  createdAt: string,
  message: string,
  senderId: string,
}

const getMessages = async ({ senderId, receiverId }: ChannelIdentification): Promise<SenderMessage[]> => {
  const { data: messages } = await supabase
    .from('conversations')
    .select(`
      created_at,
      message,
      user_profile (
        id
      )
    `)
    .contains('channel', [receiverId, senderId])

  return []
}

type Message = {
  toSend: string,
}

const sendMessage = async ({ senderId, receiverId, toSend }: ChannelIdentification & Message): Promise<void> => {
  const newMessage = {
    channel: [senderId, receiverId],
    sender: senderId,
    message: toSend,
  }

  await supabase
    .from('conversations')
    .insert(newMessage)
}
