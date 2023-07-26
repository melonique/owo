import { useState } from "react"
import { Listing } from "./Listing"
import { fetchListings, deleteListing } from "./ListingClient"

type UseListing = {
    listings: Listing[]
    getPage: (page: number) => Promise<void>
    deleteListing: (id: string) => Promise<void>
}

const useListing = (): UseListing => {
    const [listings, setListings] = useState<Listing[]>([])

    const getPage = async (page: number): Promise<void> => {
        const newListings = await fetchListings({ page })
        setListings([...listings, ...newListings])
    }
    const deleteListing = async (id: string): Promise<void> => {
      debugger
       // const response = await deleteListing({id})
        console.log('response')
        debugger
    }

    return { listings, getPage, deleteListing }
}

export default useListing
