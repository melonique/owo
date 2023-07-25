import { User } from '@/types/ChatTypes'
import { OFFER_BOT_USER } from '@/bots/offer/config'

export const DEFAULT_USERS = [OFFER_BOT_USER, {
  id: "2",
  username: 'ChatGPT-4',
  avatar: 'https://api.multiavatar.com/gpt-4.png',
}, {
  id: "3",
  username: 'Innovation OnePager Assistant',
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
    title: 'Poster une offre',
    user: DEFAULT_USERS[0],
    messages: [],
  },
  {
    id: "id",
    title: 'Parler avec un user',
    user: DEFAULT_USERS[1],
    messages: [],
  },
  {
    id: "another-one",
    title: 'Parler avec un autre user',
    user: DEFAULT_USERS[2],
    messages: [],
  },
]

export const CURRENT_USER = {
  id: "you",
  username: 'You',
  avatar: 'https://api.multiavatar.com/You.png',
}
