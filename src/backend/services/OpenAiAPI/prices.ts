// https://openai.com/pricing

type Pricing = {
  LanguageModels: LanguageModels
};

type LanguageModels = Record<ModelName, LanguageModel>;

export type ModelName = "gpt-4-1106-vision-preview" | "gpt-4-vision-preview" | "gpt-3.5-turbo-0125" | "gpt-4" | "gpt-4-0314" | "gpt-4-0613" | "gpt-3.5-turbo" | "gpt-3.5-turbo-16k" | "gpt-3.5-turbo-16k-0613" | "gpt-3.5-turbo-0301" | "gpt-3.5-turbo-0613" | "text-ada-001" | "text-babbage-001" | "text-curie-001" | "text-davinci-001" | "text-davinci-002" | "text-davinci-003";

type LanguageModel = {
  Input: number,
  Output: number,
}

const PRICES: Pricing = {
  LanguageModels: {
    "gpt-4-1106-vision-preview": {
      Input: 0.01,
      Output: 0.03,
    },
    "gpt-4-vision-preview": {
      Input: 0.01,
      Output: 0.03,
    },
    "gpt-3.5-turbo-0125": {
      Input: 0.0005,
      Output: 0.0015,
    },
    //
    "gpt-4": {
      Input: 0.03,
      Output: 0.06,
    },
    "gpt-4-0314": {
      Input: 0.03,
      Output: 0.06,
    },
    "gpt-4-0613": {
      Input: 0.03,
      Output: 0.06,
    },
    "gpt-3.5-turbo": {
      Input: 0.001125,
      Output: 0.002,
    },
    "gpt-3.5-turbo-16k": {
      Input: 0.003,
      Output: 0.004,
    },
    "gpt-3.5-turbo-16k-0613": {
      Input: 0.003,
      Output: 0.004,
    },
    "gpt-3.5-turbo-0301": {
      Input: 0.003,
      Output: 0.004,
    },
    "gpt-3.5-turbo-0613": {
      Input: 0.003,
      Output: 0.004,
    },
    "text-ada-001": {
      Input: 0.0004,
      Output: 0.0004,
    },
    "text-babbage-001": {
      Input: 0.0005,
      Output: 0.0005,
    },
    "text-curie-001": {
      Input: 0.002,
      Output: 0.002,
    },
    "text-davinci-001": {
      Input: 0.02,
      Output: 0.02,
    },
    "text-davinci-002": {
      Input: 0.02,
      Output: 0.02,
    },
    "text-davinci-003": {
      Input: 0.02,
      Output: 0.02,
    },
  },
  // FineTuningModels: {
  //   ada: {
  //     Training: 0.0004,
  //     Usage: 0.0016,
  //   },
  //   babbage: {
  //     Training: 0.0006,
  //     Usage: 0.0024,
  //   },
  //   curie: {
  //     Training: 0.003,
  //     Usage: 0.012,
  //   },
  //   davinci: {
  //     Training: 0.03,
  //     Usage: 0.12,
  //   },
  // },
  // EmbeddingModels: {
  //   ada: {
  //     Usage: 0.0001,
  //   },
  // },
  // ImageModels: {
  //   Resolution: {
  //     "1024x1024": 0.02,
  //     "512x512": 0.018,
  //     "256x256": 0.016,
  //   },
  // },
  // AudioModels: {
  //   "whisper-1": {
  //     Usage: 0.006,
  //   },
  // },
};

export default PRICES;

