
export class User {
  id?: string;
  username?: string;
  avatar?: string;
}
export class Message {
  id: string;
  user: User;
  content: string;
  timestamp: string;

  constructor(user: User, content: string) {
    this.id = 'm-' + Math.floor(Math.random() * 10000)
    this.user = user
    this.content = content
    this.timestamp = new Date().toISOString()
  }
}
export class Conversation {
  id?: string;
  title: string;
  user: User;
  messages: Message[];

  constructor(user: User, title: string, id?: string) {
    this.messages = [];
    this.id = id || 'C-' + Math.floor(Math.random() * 10000)
    this.title = title
    this.user = user;
  }
}


// a bot message apply a status and somehting to do for the bot, on send message.
export type BotMode = 'talk' | 'listen' | 'process' | 'end';
export class BotMessage extends Message {
  label: string;
  mode: BotMode;

  constructor(user: User, content: string, label?: string, mode?: BotMode) {
    super(user, content)
    this.label = label || '';
    this.mode = mode || (label ? 'listen' : 'talk');
  }
}
