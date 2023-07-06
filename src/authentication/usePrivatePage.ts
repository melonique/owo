import { useRouter } from "next/router"
import useAuthentication from "./useAuthentication"
import { useEffect } from "react"

const usePrivatePage = () => {
    const router = useRouter()
    const { resume } = useAuthentication()
  
    useEffect(() => {
      resume(() => router.replace('/'))
    }, [])
}

export default usePrivatePage