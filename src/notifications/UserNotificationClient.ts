import { supabase } from "@/config/SupabaseClient"
import { RealtimeChannel } from '@supabase/supabase-js'
import { UserConversationNotification } from "./UserNotification"

type ConversationId = string
type UserId = string

export type SendUserConversationNotificationUsecase = {
  conversationId: ConversationId,
  userId: UserId,
  message: string,
}

type UserNotificationIdentification = {
  targetUserId: UserId,
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

const getAllNotifications = async (user: UserId): Promise<UserConversationNotification[]> => {
  const { data: userNotifications } = await supabase
    .from('user_notifications')
    .select(`
      id,
      target,
      excerpt,
      type,
      createdAt:created_at,
      context,
      status
    `)
    .eq('target', user)
    .order('created_at', { ascending: false })
    .returns<UserConversationNotification[]>()

  return userNotifications || []
}

export {
  initializeUserNotificationBroadcaster,
  removeUserNotificationBroadcaster,
  sendUserNotification,
  getAllNotifications,
}