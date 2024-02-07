import { calculateCost } from "./cost-calculator";

describe('cost-calculator', () => {
  it('should calculate cost', () => {
    const costSummary = calculateCost("text-ada-001", { prompt: 100, completion: 100 });
    expect(costSummary).toEqual({
      promptCost: 0.00004,
      completionCost: 0.00004,
      totalCost: 0.00008,
    });
  });
});