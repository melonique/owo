import openAiApi from "@/backend/services/OpenAiAPI";


export default async function handler(req, res) {
  // TODO: Add authentication with token
  try {
    if (req.method !== "POST") {
      throw "Only POST requests are allowed";
    }
    // TODO: Make the 2 calls a single one when the models alows it. (now there is no vision with json_mode)
    const { picture } = req.body;
/*
    const imageDescription = "this is a pair of shoes :D";
    const listing = {
      title: "Adidas High-Top Sneakers",
      description:
        "Predominantly black high-top Adidas sneakers with white signature three stripes. Features Velcro strap closure and padded collar for comfort. Lightly used condition with signs of wear. Size not visible in image. Blue reflective accent on heel counter. Adidas logo on Velcro strap and heel. Intact outsole with little wear. No box or additional accessories included.",
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
*/
    const imageDescription = await openAiApi.visionDescription(picture);
    const listing = await openAiApi.listingCompletions(imageDescription);

    res.status(200).json({ imageDescription, ...listing });
  } catch (error) {
    res.status(500).json(error);
  }
}
