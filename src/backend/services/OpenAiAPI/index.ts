import OpenAi from "openai";
import { ModelName } from "./prices";
import { CostTokens, CostSummary, calculateCost } from "./cost-calculator";

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
    const costSummary = calculateCost(modelName, tokens);

    this.logger.log(`$$ -- called  --    ${modelName}      $ ${costSummary.totalCost}    -- $$`);

    return costSummary;
  }

  async visionDescription(base64Image: string) {
    try {
      const visionCompletion = await this.client.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: `
            L'objectif est de vendre cet objet sur un marché de l'occasion.
            Décrivez l'objet principal de la photo. Décrivez-le, sa couleur, sa marque et son état.
            Indiquez la taille si elle est évidente et toute autre information pertinente que vous pouvez voir sur la photo.
            Restez précis et sincère. Ne faites pas de suppositions ou de propositions.
            N'émettez pas d'opinion.`,
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Décrivez l'objet sur cette image en français." },
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
      Je vais te donner des informaitons a propos d'une annonce classée, en francais canadien.

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
            "tags": string[][liste des tags]
          `,
          },
          {
            role: "user",
            content: `Fait une annonce basée sur la descirption de cette image: ${imageDescription}`,
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
