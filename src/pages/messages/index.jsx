'use client'


import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUi } from '@/contexts/UiContext'

const Messages = () => {
  const router = useRouter()
  const { uiState: { latestConversationOpenedId } } = useUi();

  useEffect(() => {
    router.replace(`/messages/${latestConversationOpenedId}`);
  }, [])
}



export default Messages
