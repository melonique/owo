import { ConversationMetadata, UserMessage } from "@/conversations/ConversationClient";

export class User {
  id?: string;
  username?: string;
  avatar?: string;
}

export type MessageType = 'text' | 'image' // | 'video' | 'audio' | 'file' | 'location' | 'sticker' | 'contact' | 'link' | 'poll' | 'template' | 'list' | 'carousel' | 'buttons' | 'quickReplies' | 'form' | 'custom'
export class Message {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  type: MessageType;

  constructor(user: User, content: string, timestamp?: string, id?: string, type?: MessageType) {
    this.id = id ?? 'm-' + Math.floor(Math.random() * 10000)
    this.user = user
    this.content = content
    this.timestamp = timestamp ?? new Date().toISOString()
    this.type = type || 'text'
  }
}

export const toMessages = (userMessages: UserMessage[]) => {
  return userMessages.map((userMessage) => {
    const sender = { id: userMessage.sender, avatar: `https://api.multiavatar.com/${userMessage.sender}.png` }
    return new Message(sender, userMessage.message, userMessage.sentAt, userMessage.id)
  })
}

export class Conversation {
  id: string;
  title: string;
  user: User;
  messages: Message[];

  constructor(user: User, title: string, id?: string) {
    this.messages = []
    this.id = id || 'C-' + Math.floor(Math.random() * 10000)
    this.title = title
    this.user = user
  }
}

export const fromMetadataToConversation = (currentUserId: string) => (data: ConversationMetadata): Conversation => {
  const [withUserId] = data.users.filter((userId) => userId !== currentUserId)
  const [username] = data.userData.filter((userData) => Object.keys(userData)[0] === withUserId)

  return new Conversation({ id: withUserId, avatar: `https://api.multiavatar.com/${withUserId}.png`, username: username[withUserId] }, data.title, data.id)
}

// a bot message apply a status and somehting to do for the bot, on send message.
export type BotMode = 'talk' | 'listen' | 'listen-confirm' | 'listen-picture' | 'process' | 'end';
export class BotMessage extends Message {
  label: string;
  mode: BotMode;
  action?: (content: any) => Promise<any>

  constructor(user: User, content: string, label?: string, mode?: BotMode, action?: (content: any) => Promise<any>) {
    super(user, content)
    this.label = label || '';
    this.mode = mode || (label ? 'listen' : 'talk');
    this.action = action;
  }

  updateMsg(data:any) {
    const newStr = this.content.replace(
      /{(\w*)}/g,
      function( m, key ){
        return data.hasOwnProperty( key ) ? data[ key ] : "";
      }
    );
    this.content = newStr;
    return this;
  }

}
