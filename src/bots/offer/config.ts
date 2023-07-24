import { followupQuestions, completeOffer, saveOffer } from './functions'
import { BotMessage, User } from '@/types/ChatTypes'

export const OFFER_BOT_USER: User = {
  id: "offer",
  username: 'Assistant owo',
  avatar: 'https://api.multiavatar.com/make an offer.png',
}

export const OFFER_BOT_CONFIG = {
  id: 'offer',
  user: OFFER_BOT_USER,
  messages: [
    new BotMessage(OFFER_BOT_USER, '👋 Bonjour! Je suis l\'assistant owo! 🦾 Mon objectif est de t\'aider a faire ton annonce à la vitesse de l\'éclair! ⚡️'),
    new BotMessage(OFFER_BOT_USER, 'Alors, qu\'as-tu à proposer à ta super communauté aujourd\'hui? 😊?', 'offer_raw', 'listen-confirm'),
    new BotMessage(OFFER_BOT_USER, '... je réfléchit ...', 'ai_offer_followup_question', 'process', followupQuestions ),
    // BUG: ya un bug dans le botcontext qui fait que on a pas le botMemory a jour quand on appel le next message alors
    // je dois ajouter un mesage entre les 2 le temps que le state s'update 🤦‍♀️
    new BotMessage(OFFER_BOT_USER, 'Ok, donc...'),
    new BotMessage(OFFER_BOT_USER, '{ai_offer_followup_question}', 'offer_raw_2'),
    new BotMessage(OFFER_BOT_USER, 'Cette offre et pour un pret, une vente ou un don? ou toutes ces réponses?', 'offer_terms_raw'),
    new BotMessage(OFFER_BOT_USER, 'Ok, je prépare ma proposition...', 'ai_offer_completion', 'process', completeOffer ),
    new BotMessage(OFFER_BOT_USER, 'Ok, donc...'),
    new BotMessage(OFFER_BOT_USER, '{ai_offer_completion}'),
    new BotMessage(OFFER_BOT_USER, 'Je sauvegarde?', 'save_offer', 'listen-confirm'),
    new BotMessage(OFFER_BOT_USER, '...je réfléchit...', 'ai_offer_saved', 'process', saveOffer ),
    new BotMessage(OFFER_BOT_USER, 'Ok, donc...'),
    new BotMessage(OFFER_BOT_USER, '{ai_offer_saved}'),
  ]
}
