import { supabase } from "@/config/SupabaseClient"
import { MessageType } from "@/types/ChatTypes"
import { RealtimeChannel } from '@supabase/supabase-js'

type ChannelIdentification = {
  channelId: string,
  senderId: string,
  notifyNewMessage: (message: SenderMessage) => void,
}

export type SenderMessage = {
  id: string,
  conversation: string,
  sent_at: string,
  message: string,
  sender: string,
  type: MessageType
}

const SOURCE_SCHEMA = "public"
const SOURCE_TABLE = "user_messages"

const initializeChannel = ({ channelId, senderId, notifyNewMessage }: ChannelIdentification): RealtimeChannel => {
  return supabase.channel(channelId)
    .on<SenderMessage>(
      "postgres_changes",
      { 
        event: 'INSERT',
        schema: SOURCE_SCHEMA,
        table: SOURCE_TABLE,
        filter: `conversation=eq.${channelId}`,
      },
      (payload) => {
        if (payload.new.sender !== senderId) {
          notifyNewMessage(payload.new)
        }
      })
    .subscribe()
}

const removeChannel = async (toRemove: RealtimeChannel): Promise<void> => {
  await supabase.removeChannel(toRemove)
}

export {
  initializeChannel,
  removeChannel,
}