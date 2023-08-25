import { useState } from "react"
import { Listing } from "./Listing"
import { fetchListings, searchListings, deleteListing } from "./ListingClient"

type UseListing = {
    listings: Listing[]
    loading: boolean
    getAll: () => Promise<void>
    search: (query: string) => Promise<void>
    deleteListingById: (id: string) => Promise<void>
}

const useListing = (): UseListing => {
    const [listings, setListings] = useState<Listing[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const getAll = async (): Promise<void> => {
        setLoading(true)
        const newListings = await fetchListings()
        setListings(newListings)
        setLoading(false)
    }

    const deleteListingById = async (id: string): Promise<void> => {
        setLoading(true)
        await deleteListing({ id })
        const newList = [...listings]
        setListings(newList.filter(x => x.id !== id))
        setLoading(false)
    }

    const search = async (query: string): Promise<void> => {
        setLoading(true)
        const newListings = await searchListings({ searchQuery: query })
        setListings(newListings)
        setLoading(false)
    }

    return { listings, loading, getAll, search, deleteListingById }
}

export default useListing
