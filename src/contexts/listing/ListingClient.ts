import { supabase } from "@/config/SupabaseClient";
import { Listing, UserProfile } from "./Listing";

export const getRange = (page: number): [number, number] => {
    const PAGE_SIZE = 9999999999
    const PAGE_START_NUMBER = 1

    const start = (Math.max(page, PAGE_START_NUMBER) - PAGE_START_NUMBER) * PAGE_SIZE
    const end = start + PAGE_SIZE - 1

    return [start, end]
}

type FetchUsecase = {
    page: number;
}

export const fetchListings = async ({ page }: FetchUsecase): Promise<Listing[]> => {
    const [ first, last ] = getRange(page)

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
        .range(first, last)
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

    const { data: listing, error } = await supabase
        .from('offer')
        .update({deleted: true})
        .eq('id', id)
}
