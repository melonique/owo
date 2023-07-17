import { supabase } from "@/config/SupabaseClient"


export const followupQuestions = async ({ offer_raw }) => {
    const { data: response } = await supabase.functions.invoke<string>('prompt-ai-followup-questions', {
        body: { content: offer_raw }
    })

    return response ? response : 'rip'
}

export const completeOffer = async ({
  offer_raw,
  ai_offer_followup_question,
  offer_raw_2,
  offer_terms_raw,
}) => {

  const content = `
    user: ${offer_raw} ;
    YOU: ${ai_offer_followup_question} ;
    User: ${offer_raw_2};
    YOU: Cette offre et pour un pret, une vente ou un don? ou toutes ces réponses? ;
    User: ${offer_terms_raw}
  `;

    const { data: response } = await supabase.functions.invoke<string>('prompt-ai-complete-offer', {
        body: { content }
    })

    return response ? response : 'rip'
}




// TODO: une function qui save!
export const saveOffer = async ({ save_offer, ai_offer_completion }) => {
  if (!save_offer) {
    return "Ok! Tempis! tu peux cliquer sur le bouton reset en haut pour recommencer!"
  } else {

    /* const { data: response } = await supabase.functions.invoke<string>('prompt-ai-followup-questions', {
        body: { content: ai_offer_completion }
    }) */
    return "Saved! Tu peux cliquer sur le bouton reset en haut pour recommencer!"
  }
}
