'use client'


import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUi } from '@/contexts/UiContext'

const Messages = () => {
  const router = useRouter()
  const { uiState: { latestConversationOpenedId } } = useUi();

  useEffect(() => {
    console.log('latestConversationOpenedId', latestConversationOpenedId)
    const pushTo = latestConversationOpenedId  != 'undefined' ? latestConversationOpenedId : 'offer'
    router.replace(`/messages/${pushTo}`);
  }, [])
}



export default Messages
