import PRICES, { ModelName } from "./prices";

export type CostSummary = {
  promptCost: number,
  completionCost: number,
  totalCost: number,
}
  
export type CostTokens = {
  prompt: number,
  completion: number,
}

export const calculateCost = (modelName: ModelName, tokens: CostTokens): CostSummary => {
    const languageModel = PRICES.LanguageModels[modelName];
    const promptCost = languageModel.Input * tokens.prompt / 1000;
    const completionCost = languageModel.Output * tokens.completion / 1000;
    const totalCost = promptCost + completionCost;
  
    return {
      promptCost,
      completionCost,
      totalCost,
    };
  }