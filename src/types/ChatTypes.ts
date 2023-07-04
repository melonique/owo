
export interface User {
  id: string;
  username: string;
  avatar: string;
}
export interface Message {
  id: string;
  user: User;
  content: string;
  timestamp: string;
}
export interface Conversation {
  id: string;
  title: string;
  user: User;
  messages: Message[];
}
