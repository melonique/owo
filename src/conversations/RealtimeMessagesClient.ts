import { supabase } from "@/config/SupabaseClient"
import { RealtimeChannel } from '@supabase/supabase-js'

type ChannelIdentification = {
  receiverId: string,
}

type SenderMessage = {
  createdAt: string,
  message: string,
  senderId: string,
}

const SOURCE_SCHEMA = "public"
const SOURCE_TABLE = "user_messages"

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