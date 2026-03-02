import { describe, it, expect } from "vitest";
import { calculateMAO, type MAOInput } from "./mao-calculator";

describe("MAO Calculator", () => {
  // ─── Standard Inputs ──────────────────────────────────────────────────────

  it("should calculate MAO correctly with standard inputs (70% rule)", () => {
    const result = calculateMAO({
      arv: 200000,
      repairs: 30000,
      assignmentFee: 10000,
    });

    // investorShare = 200000 × 0.70 = 140000
    // closingCosts  = 200000 × 0.03 = 6000
    // MAO = 140000 - 30000 - 6000 - 10000 = 94000
    expect(result.breakdown.investorShare).toBe(140000);
    expect(result.breakdown.closingCosts).toBe(6000);
    expect(result.mao).toBe(94000);
    expect(result.buyerTotal).toBe(104000); // 94000 + 10000
    expect(result.buyerProfit).toBe(60000); // 200000 - 104000 - 30000 - 6000
  });

  it("should handle zero repairs", () => {
    const result = calculateMAO({
      arv: 150000,
      repairs: 0,
      assignmentFee: 5000,
    });

    // investorShare = 150000 × 0.70 = 105000
    // closingCosts  = 150000 × 0.03 = 4500
    // MAO = 105000 - 0 - 4500 - 5000 = 95500
    expect(result.mao).toBe(95500);
    expect(result.breakdown.repairs).toBe(0);
  });

  it("should handle high repair costs", () => {
    const result = calculateMAO({
      arv: 300000,
      repairs: 100000,
      assignmentFee: 15000,
    });

    // investorShare = 300000 × 0.70 = 210000
    // closingCosts  = 300000 × 0.03 = 9000
    // MAO = 210000 - 100000 - 9000 - 15000 = 86000
    expect(result.mao).toBe(86000);
    expect(result.buyerProfit).toBeGreaterThan(0);
  });

  it("should produce negative MAO when deal is too thin", () => {
    const result = calculateMAO({
      arv: 100000,
      repairs: 50000,
      assignmentFee: 20000,
    });

    // investorShare = 100000 × 0.70 = 70000
    // closingCosts  = 100000 × 0.03 = 3000
    // MAO = 70000 - 50000 - 3000 - 20000 = -3000
    expect(result.mao).toBe(-3000);
    expect(result.mao).toBeLessThan(0);
  });

  // ─── Custom Parameters ────────────────────────────────────────────────────

  it("should use custom closing costs", () => {
    const result = calculateMAO({
      arv: 200000,
      repairs: 30000,
      assignmentFee: 10000,
      closingCosts: 10000,
    });

    // investorShare = 200000 × 0.70 = 140000
    // MAO = 140000 - 30000 - 10000 - 10000 = 90000
    expect(result.breakdown.closingCosts).toBe(10000);
    expect(result.mao).toBe(90000);
  });

  it("should use custom investor percentage (65% rule)", () => {
    const result = calculateMAO({
      arv: 200000,
      repairs: 30000,
      assignmentFee: 10000,
      investorPercent: 0.65,
    });

    // investorShare = 200000 × 0.65 = 130000
    // closingCosts  = 200000 × 0.03 = 6000
    // MAO = 130000 - 30000 - 6000 - 10000 = 84000
    expect(result.breakdown.investorShare).toBe(130000);
    expect(result.mao).toBe(84000);
  });

  it("should use custom investor percentage (75% rule)", () => {
    const result = calculateMAO({
      arv: 200000,
      repairs: 30000,
      assignmentFee: 10000,
      investorPercent: 0.75,
    });

    // investorShare = 200000 × 0.75 = 150000
    // closingCosts  = 200000 × 0.03 = 6000
    // MAO = 150000 - 30000 - 6000 - 10000 = 104000
    expect(result.breakdown.investorShare).toBe(150000);
    expect(result.mao).toBe(104000);
  });

  // ─── Output Structure ─────────────────────────────────────────────────────

  it("should return all required output fields", () => {
    const result = calculateMAO({
      arv: 200000,
      repairs: 30000,
      assignmentFee: 10000,
    });

    expect(result).toHaveProperty("mao");
    expect(result).toHaveProperty("buyerTotal");
    expect(result).toHaveProperty("buyerProfit");
    expect(result).toHaveProperty("breakdown");
    expect(result.breakdown).toHaveProperty("arv");
    expect(result.breakdown).toHaveProperty("investorShare");
    expect(result.breakdown).toHaveProperty("repairs");
    expect(result.breakdown).toHaveProperty("assignmentFee");
    expect(result.breakdown).toHaveProperty("closingCosts");
  });

  it("should preserve input values in breakdown", () => {
    const input: MAOInput = {
      arv: 250000,
      repairs: 45000,
      assignmentFee: 12000,
    };
    const result = calculateMAO(input);

    expect(result.breakdown.arv).toBe(250000);
    expect(result.breakdown.repairs).toBe(45000);
    expect(result.breakdown.assignmentFee).toBe(12000);
  });

  it("buyerTotal should equal MAO plus assignment fee", () => {
    const result = calculateMAO({
      arv: 300000,
      repairs: 50000,
      assignmentFee: 15000,
    });

    expect(result.buyerTotal).toBe(result.mao + 15000);
  });

  it("buyerProfit should equal ARV minus buyerTotal minus repairs minus closing", () => {
    const result = calculateMAO({
      arv: 300000,
      repairs: 50000,
      assignmentFee: 15000,
    });

    const expectedProfit =
      300000 - result.buyerTotal - 50000 - result.breakdown.closingCosts;
    expect(result.buyerProfit).toBe(expectedProfit);
  });

  // ─── Real-World Scenarios ─────────────────────────────────────────────────

  it("should handle a typical Atlanta deal correctly", () => {
    // ARV: $285K (3/2 ranch, 1,450 sqft, renovated)
    // Repairs: $45K (full cosmetic + kitchen + bath)
    // Assignment fee: $12K
    const result = calculateMAO({
      arv: 285000,
      repairs: 45000,
      assignmentFee: 12000,
    });

    // investorShare = 285000 × 0.70 = 199500
    // closingCosts  = 285000 × 0.03 = 8550
    // MAO = 199500 - 45000 - 8550 - 12000 = 133950
    expect(result.mao).toBe(133950);
    expect(result.buyerProfit).toBeGreaterThan(50000); // Buyer should profit $50K+
  });

  it("should handle a thin deal with small assignment fee", () => {
    const result = calculateMAO({
      arv: 150000,
      repairs: 60000,
      assignmentFee: 5000,
    });

    // investorShare = 150000 × 0.70 = 105000
    // closingCosts  = 150000 × 0.03 = 4500
    // MAO = 105000 - 60000 - 4500 - 5000 = 35500
    expect(result.mao).toBe(35500);
    expect(result.mao).toBeGreaterThan(0);
  });
});
