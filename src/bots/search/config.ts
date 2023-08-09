import { completeSearch } from './functions'
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
    new BotMessage(SEARCH_BOT_USER, "Encore moi, l'assistant owo! Dans cette conversation, tu peux utiliser mon intelligence artificielle pour chercher dans les annonces :)"),
    new BotMessage(SEARCH_BOT_USER, "Tu n'as qu'a m'expliquer ce que tu recehrches, que ce soit en me parlant de l'activité que tu veux faire, ou encore avec des détails très spécifiques."),
    new BotMessage(SEARCH_BOT_USER, "Alors, ques-ce que tu aimerias que je t'aide a trouver? ", 'search_raw'),
    new BotMessage(SEARCH_BOT_USER, "💭 Ok je cherche...", 'ai_search_result', 'process', completeSearch),
    new BotMessage(SEARCH_BOT_USER, "😄 J'ai trouvé quelque trucs: "),
    new BotMessage(SEARCH_BOT_USER, "{ai_search_result}"),
    new BotMessage(SEARCH_BOT_USER, "TODO: Permettre de rafiner/modifier la recherche"),
    new BotMessage(SEARCH_BOT_USER, "TODO: Permettre de sauvegarder la recherche affin d'avoir des notifications de nouvelles offres qui y répondent"),
    new BotMessage(SEARCH_BOT_USER, "tu peux utiliser le piton reset pour faire une nouvelle recherche!", '', 'end'),
  ]
}

