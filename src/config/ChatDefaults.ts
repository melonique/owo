import { User } from '@/types/ChatTypes'
import { OFFER_BOT_USER } from '@/bots/offer/config'
import { SEARCH_BOT_USER } from '@/bots/search/config'

export const DEFAULT_USERS = [OFFER_BOT_USER, SEARCH_BOT_USER]

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
  }, /*
  {
    id: "search",
    title: 'Faire une recherche',
    user: DEFAULT_USERS[1],
    messages: [],
  }, */
]
