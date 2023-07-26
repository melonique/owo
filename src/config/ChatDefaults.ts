import { User } from '@/types/ChatTypes'
import { OFFER_BOT_USER } from '@/bots/offer/config'

export const DEFAULT_USERS = [OFFER_BOT_USER, {
  id: "vero-user-id",
  username: '🕵️‍♀️ Assistant owo',
  avatar: 'https://api.multiavatar.com/Véro-Lopez.png',
}, {
  id: "another-user-id",
  username: 'John Doe',
  avatar: 'https://api.multiavatar.com/One pager.png',
}]

export const DEFAULT_WELCOME_MESSAGE = (user: User) => ({
  id: "m-0",
  user,
  content: 'Welcome! Say something :)',
  timestamp: Date.now(),
})

export const DEFAULT_CONVERSATIONS = [
  {
    id: "offer",
    title: 'Rédiger une annonce',
    user: DEFAULT_USERS[0],
    messages: [],
  },
  {
    id: "search",
    title: 'Faire une recherche',
    user: DEFAULT_USERS[1],
    messages: [],
  },
  {
    id: "another-one",
    title: 'Bas bleus à vendre',
    user: DEFAULT_USERS[2],
    messages: [],
  },
]

export const CURRENT_USER = {
  id: "you",
  username: 'You',
  avatar: 'https://api.multiavatar.com/You.png',
}
