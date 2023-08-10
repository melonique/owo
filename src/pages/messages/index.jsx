'use client'


import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Messages = () => {
  const router = useRouter()

  useEffect(() => {
    // some logic...
    router.replace(`/messages/offer`);
  }, [])
}



export default Messages
