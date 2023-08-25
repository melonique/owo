import { supabase } from "@/config/SupabaseClient"
import { RealtimeChannel } from '@supabase/supabase-js'
import { UserConversationNotification } from "./UserNotification"
import { SendUserConversationNotificationUsecase } from "@/conversations/ConversationClient"

type UserNotificationIdentification = {
  targetUserId: string,
  notify: (notification: UserConversationNotification) => void,
}

const SOURCE_SCHEMA = "public"
const SOURCE_TABLE = "user_notifications"

const initializeUserNotificationBroadcaster = ({ targetUserId, notify }: UserNotificationIdentification): RealtimeChannel => {
  return supabase.channel(targetUserId)
    .on<UserConversationNotification>(
      "postgres_changes",
      { 
        event: 'INSERT',
        schema: SOURCE_SCHEMA,
        table: SOURCE_TABLE,
        filter: `target=eq.${targetUserId}`,
      },
      (payload) => {
        console.log(payload)
        notify(payload.new)
      })
    .subscribe()
}

const removeUserNotificationBroadcaster = async (toRemove: RealtimeChannel): Promise<void> => {
  await supabase.removeChannel(toRemove)
}

const sendUserNotification = async ({ conversationId, userId, message }: SendUserConversationNotificationUsecase): Promise<void> => {
  const newNotification = {
    type: 'message',
    target: userId,
    excerpt: message,
    context: {
      conversationId,
    },
  }

  await supabase
    .from('user_notifications')
    .insert(newNotification)
}

export {
  initializeUserNotificationBroadcaster,
  removeUserNotificationBroadcaster,
  sendUserNotification,
}