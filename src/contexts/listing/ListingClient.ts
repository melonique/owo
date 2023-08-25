import { supabase } from "@/config/SupabaseClient";
import { Listing, UserProfile } from "./Listing";

type SearchUsescase = {
    searchQuery: string;
}

export const searchListings = async ({ searchQuery }: SearchUsescase): Promise<Listing[]> => {
    const { data: listing } = await supabase.functions.invoke('search-offers', {
        body: { query: searchQuery }
    })

    if (!listing) {
        return []
    }

    return listing.map(assembleListing)
}

export const fetchListings = async (): Promise<Listing[]> => {
    const { data: listing } = await supabase
        .from('offer')
        .select(`
            id,
            created_at,
            title,
            description,
            tags,
            type,
            images,
            user_profile (
                id,
                name,
                email,
                created_at,
                username
            )
        `)
        .eq('deleted', false)
        .order('created_at', { ascending: false })

    if (!listing) {
        return []
    }

    return listing.map(assembleListing)
}

const assembleListing = (listing: any): Listing => {
    return {
        ...listing,
        userProfile: singleUserProfile(listing.user_profile)
    }
}

const singleUserProfile = (userProfile: any): UserProfile => {
    return {
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email,
        username: userProfile.username,
        createdAt: userProfile.created_at
    }
}

type DeleteUsecase = {
    id: string;
}

export const deleteListing = async ({ id }: DeleteUsecase): Promise<void> => {
    await supabase
        .from('offer')
        .update({deleted: true})
        .eq('id', id)
}
