import { supabase } from "@/config/SupabaseClient";
import { Listing } from "./Listing";

export const getRange = (page: number): [number, number] => {
    const PAGE_SIZE = 12
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

    const { data: listing } = await supabase.from('listing').select('*').range(first, last)

    return listing as Listing[]
}