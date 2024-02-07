import OpenAi from "openai";
import PRICES, { ModelName } from "./prices";

type CostSummary = {
  promptCost: number,
  completionCost: number,
  totalCost: number,
}

type CostTokens = {
  prompt: number,
  completion: number,
}

type Logger = {
  log: (message: string) => void;
}

const consoleLogger: Logger = {
  log: (message: string) => {
    console.log(message);
  }
};

class OpenAiAPI {
  private client;
  private logger: Logger;

  constructor() {
    this.client = new OpenAi();
    this.logger = consoleLogger;
  }

  calculateCost(modelName: ModelName, tokens: CostTokens): CostSummary {
    const languageModel = PRICES.LanguageModels[modelName];
    const promptCost = languageModel.Input * tokens.prompt / 1000;
    const completionCost = languageModel.Output * tokens.completion / 1000;
    const totalCost = promptCost + completionCost;

    this.logger.log(`$$ -- called  --    ${modelName}      $ ${totalCost}    -- $$`);

    return {
      promptCost,
      completionCost,
      totalCost,
    };
  }

  async visionDescription(base64Image: string) {
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

  async listingCompletions(imageDescription: string) {
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
