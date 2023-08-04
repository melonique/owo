
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
  id: string;
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
