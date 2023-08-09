import { supabase } from "@/config/SupabaseClient"



type completeSearchType = {
  search_raw: string;
}

export const completeSearch = async ({
  search_raw,
}: completeSearchType) => {

  const query = `${search_raw}`;

  const { data: response } = await supabase.functions.invoke<string>('search-offers', {
      body: { query }
  })

    return response ? response : 'rip'
}
