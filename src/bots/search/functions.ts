import { supabase } from "@/config/SupabaseClient"

type searchFollowupQuestionsType = { search_raw: string }
export const searchFollowupQuestions = async ({ search_raw }: searchFollowupQuestionsType) => {
    const { data: response } = await supabase.functions.invoke<string>('prompt-ai-followup-questions', {
        body: { content: search_raw }
    })

    return response ? response : 'rip'
}
type completeSearchType = {
  search_raw: string;
  ai_search_followup_question: string;
  search_raw_2: string;
}
export const completeSearch = async ({
  search_raw,
  ai_search_followup_question,
  search_raw_2,
}: completeSearchType) => {

  const content = `${search_raw},  ${ai_search_followup_question},  ${search_raw_2}`;

    const { data: response } = await supabase.functions.invoke<string>('prompt-ai-complete-offer', {
        body: { content }
    })

    return response ? response : 'rip'
}
