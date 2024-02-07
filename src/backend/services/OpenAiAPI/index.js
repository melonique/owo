import OpenAi from "openai";
import PRICES from "./prices.js";

class OpenAiAPI {
  constructor() {
    this.client = new OpenAi();
  }

  calculateCost(modelName, {prompt_tokens, completion_tokens}) {
    modelName = modelName.toLowerCase();

    let pricePerToken = PRICES.LanguageModels[modelName];
    if (!pricePerToken) {
      // Closest other model find
        throw new Error('Unknown model ' + modelName);
    }
    if(!prompt_tokens) prompt_tokens = 0;
    if(!completion_tokens) completion_tokens = 0;
    prompt_tokens /= 1000;
    completion_tokens /= 1000;
    const cost = {
        promptCost: pricePerToken["Input"] * prompt_tokens,
        completionCost: pricePerToken["Output"] * completion_tokens,
        totalCost: pricePerToken["Input"] * prompt_tokens + pricePerToken["Input"] * completion_tokens,
    }
    console.log('$$ -- called  --    ', modelName,'      $ ',  cost.totalCost, '    -- $$');
    return cost
}

  async visionDescription(base64Image) {
    try {
      const visionCompletion = await this.client.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: `The objective is to sell this item on a second hand marketplace. Describe the principal object of the picture. Describe it, its color, brand, and condition. List the size if is obvious and any other relevant information that you can see in the picture. stay specific and truthfull. dont make assumptions or propositions. dont emmit oppinion.`,
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Describe the item on this image" },
              {
                type: "image_url",
                image_url: {
                  url: `${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      });

      this.calculateCost("gpt-4-vision-preview", visionCompletion.usage);

      const imageDescription = visionCompletion.choices[0].message.content;

      return imageDescription;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async listingCompletions(imageDescription) {
    try {
      const listingCompletion = await this.client.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `

      L'Assistant est un chatbot IA qui aide les utilisateurs à convertir un texte en langage naturel en format JSON. Après que les utilisateurs saisissent leurs informations, vous retournez toujours l'objet JSON directement.
      Je vais te donner des informaitons a propos d'une annonce classée,

          Tes réponses sont toujours composées ainsit:
          - un titre en 5 mots ou moins qui résume le contenu de l'offre
          - une courte description suivi des détials en point de forme du contenu de l'offre
          - prends note des termes de l'offre, si c'est service, un don, un pret, une vente, ou plusieur à la fois.
          - prépare une liste de hashtags a la pinterest représentant l'offre. Les hashtags doient etre des catégories,
            des noms, des audiences, des lifestyle, des activitées faites avec ces objets, etc.
            tu vas ensuite me répondre uniquement un objet JSON validecontenant les infroamtions suivantes:
            \`\`\`
            {"title": [le titre],
            "description": [la description],
            "proposition_terms": {
              "don": boolean[si c'est un don],
              "pret": boolean[si c'est un pret],
              "vente": boolean[si c'est une vente],
              "service": boolean[si c'est un service],
              "location": boolean[si c'est un cas de location (rental)],
            },
            "tags": string[][liste des tags]
          `,
          },
          {
            role: "user",
            content: `Create a listing based on this desciprtion: ${imageDescription}`,
          },
        ],
        max_tokens: 400,
      });

      this.calculateCost("gpt-3.5-turbo-0125", listingCompletion.usage);

      const listing = listingCompletion.choices[0].message.content;
      return JSON.parse(listing)

    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}

const openAiApi = new OpenAiAPI();
export default openAiApi;
