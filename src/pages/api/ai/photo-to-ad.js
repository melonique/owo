import OpenAi from "openai";
import openAiApi from "@/backend/services/OpenAiAPI";
import base64Image from './base64img.js';


export default async function handler(req, res) {

  try {

   // const imageDescription = await openAiApi.visionDescription(base64Image);

    const listing = {
      title: "Adidas High-Top Sneakers",
      description:
        "Predominantly black high-top Adidas sneakers with white signature three stripes. Features Velcro strap closure and padded collar for comfort. Lightly used condition with signs of wear. Size not visible in image. Blue reflective accent on heel counter. Adidas logo on Velcro strap and heel. Intact outsole with little wear. No box or additional accessories included.",
      proposition_terms: {
        don: false,
        pret: false,
        vente: true,
        service: false,
        location: false,
      },
      tags: [
        "Adidas",
        "sneakers",
        "fashion",
        "footwear",
        "black",
        "high-top",
        "style",
        "athletic",
      ],
    };
    // const listing = await openAiApi.listingCompletions(imageDescription);

    res.status(200).json({ listing });
  } catch (error) {
    res.status(500).json(error);
  }
}
