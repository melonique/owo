import { BotMessage, Message, User } from '@/types/ChatTypes'

export const DEFAULT_USERS = [{
  id: "offer",
  username: 'Assistant owo',
  avatar: 'https://api.multiavatar.com/make an offer.png',
}, {
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

export const DEFAULT_CONVERSATIONS = [{
  id: "offer",
  title: 'Poster une offre',
  user: DEFAULT_USERS[0],
  messages: [],
}]

export const CURRENT_USER = {
  id: "you",
  username: 'You',
  avatar: 'https://api.multiavatar.com/You.png',
}

export const DEFAULT_BOT_CONFIG = {
  'offer' : {
    id: 'offer',
    user: DEFAULT_USERS[0],
    messages: [
      new BotMessage(DEFAULT_USERS[0], '👋 Bonjour! Je suis l\'assistant owo! 🦾 Mon objectif est de t\'aider a faire ton annonce à la vitesse de l\'éclair! ⚡️'),
      new BotMessage(DEFAULT_USERS[0], "Alors, qu'as-tu à proposer à ta super communauté aujourd'hui? 😊?", 'offer_raw'),
    //  new BotMessage(DEFAULT_USERS[0], '... je réfléchit ...', 'offer_followup_chatgpt', 'process'),
      new BotMessage(DEFAULT_USERS[0], "Ok, veux tu me donner plus de détails, whatever", 'offer_raw_2'),
      new BotMessage(DEFAULT_USERS[0], "Cette offre et pour un pret, une vente ou un don? ou toutes ces réponses?", 'offer_terms_raw')
    ]
  }
}
