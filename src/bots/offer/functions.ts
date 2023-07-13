import { supabase } from "@/config/SupabaseClient"

export const followupQuestions = async (request: string): Promise<string> => {
    const { data: response } = await supabase.functions.invoke<string>('prompt-ai-followup-questions', {
        body: { content: request }
    })

    return response ? response : 'rip'
}

export const completeOffer = async (request: string): Promise<string> => {
    const { data: response } = await supabase.functions.invoke<string>('prompt-ai-followup-questions', {
        body: { content: request }
    })

    return response ? response : 'rip'
}

