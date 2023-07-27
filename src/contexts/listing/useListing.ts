import { useState } from "react"
import { Listing } from "./Listing"
import { fetchListings, deleteListing } from "./ListingClient"

type UseListing = {
    listings: Listing[]
    getPage: (page: number) => Promise<void>
    deleteListingById: (id: string) => Promise<void>
}

const useListing = (): UseListing => {
    const [listings, setListings] = useState<Listing[]>([])

    const getPage = async (page: number): Promise<void> => {
        const newListings = await fetchListings({ page })
        setListings([...listings, ...newListings])
    }
    const deleteListingById = async (id: string): Promise<void> => {
      await deleteListing({ id })
      const newList = [...listings]
      setListings(newList.filter(x => x.id !== id))
    }

    return { listings, getPage, deleteListingById }
}

export default useListing
