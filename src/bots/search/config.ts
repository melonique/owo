import { searchFollowupQuestions, completeSearch } from './functions'
import { BotMessage, User } from '@/types/ChatTypes'

export const SEARCH_BOT_USER: User = {
  id: "search",
  username: '🤖 Assistant owo',
  avatar: 'https://api.multiavatar.com/make an search.png',
}

  // BUG: ya un bug dans le botcontext qui fait que on a pas le botMemory a jour quand on appel le next message alors
  // je dois ajouter un mesage entre les 2 le temps que le state s'update 🤦‍♀️
export const SEARCH_BOT_CONFIG = {
  id: 'search',
  user: SEARCH_BOT_USER,
  messages: [
    new BotMessage(SEARCH_BOT_USER, "Yoyoyo! Je suis l'assistant owo! Utilise mon intelligence artificielle pour trouver ce que tu cherches! "),
    new BotMessage(SEARCH_BOT_USER, "Dit moi en quelque mots ce que tu recherches. tu peux me parler de ta situation, ton projet. tu peux être super précis ou plutot vague. Je vais essayer de comprendre et de te poser des questions pour affiner ma recherche."),
    new BotMessage(SEARCH_BOT_USER, "Alors, que cherches-tu?", 'search_raw'),
    new BotMessage(SEARCH_BOT_USER, "🌀 Laisse-moi réfléchir...je vais te poser des questions pour affiner ma recherche.", 'ai_search_followup_question', 'process', searchFollowupQuestions),
    new BotMessage(SEARCH_BOT_USER, "✔️ Ça y est, j'ai trouvé ! Alors..."),
    new BotMessage(SEARCH_BOT_USER, "{ai_search_followup_question}", 'search_raw_2'),
    new BotMessage(SEARCH_BOT_USER, "💭 Ok je cherche...", 'ai_search_completion', 'process', completeSearch),
    new BotMessage(SEARCH_BOT_USER, "😄 J'ai trouvé quelque trucs: "),
    new BotMessage(SEARCH_BOT_USER, "{aisearch_completion}"),
    new BotMessage(SEARCH_BOT_USER, "TODO: Permettre de rafiner/modifier la recherche"),
    new BotMessage(SEARCH_BOT_USER, "TODO: Permettre de sauvegarder la recherche affin d'avoir des notifications de nouvelles offres qui y répondent"),
    new BotMessage(SEARCH_BOT_USER, "tu peux utiliser le piton reset pour faire une nouvelle recherche!", '', 'end'),
  ]
}
