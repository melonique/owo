
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
  title?: string;
  user?: User;
  messages?: Message[];
}

type onCaptureOptions = 'trigger.end';

export class BotQuestion extends Message {
  label: string;
  onCapture: onCaptureOptions;

  constructor(user: User, content: string, label: string) {
    super(user, content)
    this.onCapture = 'trigger.end' // quand l'utilisateur
    this.label = label
  }
}

export type BotMessages = BotQuestion | Message;
