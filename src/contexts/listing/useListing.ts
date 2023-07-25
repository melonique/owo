import { useState } from "react"
import { Listing } from "./Listing"
import { fetchListings } from "./ListingClient"

type UseListing = {
    listings: Listing[]
    getPage: (page: number) => Promise<void>
}

const useListing = (): UseListing => {
    const [listings, setListings] = useState<Listing[]>([])

    const getPage = async (page: number): Promise<void> => {
        const newListings = await fetchListings({ page })
        setListings([...listings, ...newListings])
    }

    return { listings, getPage }
}

export default useListing