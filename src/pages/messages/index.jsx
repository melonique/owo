'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUi } from '@/contexts/UiContext'
import { PrivateLayout } from "@/components/Layouts"

const Messages = () => {
  const router = useRouter()
  const { uiState: { latestConversationOpenedId } } = useUi();

  useEffect(() => {
    console.log('latestConversationOpenedId', latestConversationOpenedId)
    const pushTo = latestConversationOpenedId  != 'undefined' ? latestConversationOpenedId : 'offer'
    router.replace(`/messages/${pushTo}`);
  }, [])
}

Messages.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default Messages
