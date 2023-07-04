
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

export const DEFAULT_WELCOME_MESSAGE = (user) => ({
  id: "m-0",
  user,
  content: 'Welcome! Say something :)',
  timestamp: Date.now(),
})

export const DEFAULT_CONVERSATIONS = [{
  id: "offer",
  title: 'Say hi!',
  user: DEFAULT_USERS[0],
  messages: [DEFAULT_WELCOME_MESSAGE(DEFAULT_USERS[0])],
}]

export const CURRENT_USER = {
  id: "you",
  username: 'You',
  avatar: 'https://api.multiavatar.com/You.png',
}
