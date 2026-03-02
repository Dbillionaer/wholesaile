#!/usr/bin/env bun
/**
 * MAO (Maximum Allowable Offer) Calculator
 *
 * Calculates the maximum price you can offer a seller while still leaving
 * enough profit for your end buyer using the 70% rule.
 *
 * Formula:
 *   MAO = (ARV × investorPercent) - repairs - closingCosts - assignmentFee
 *
 * Usage:
 *   bun scripts/mao-calculator.ts --arv 250000 --repairs 40000 --fee 12000
 *   bun scripts/mao-calculator.ts --arv 250000 --repairs 40000 --fee 12000 --percent 0.65
 */

export interface MAOInput {
  /** After Repair Value — what the property will be worth fully renovated */
  arv: number;
  /** Estimated repair/renovation costs */
  repairs: number;
  /** Your assignment fee (profit) */
  assignmentFee: number;
  /** Closing costs (default: 3% of ARV) */
  closingCosts?: number;
  /** Investor's target share of ARV (default: 0.70 = 70% rule) */
  investorPercent?: number;
}

export interface MAOOutput {
  /** Maximum Allowable Offer — the most you can pay the seller */
  mao: number;
  /** Maximum purchase price for the end buyer (MAO + assignment fee) */
  buyerTotal: number;
  /** End buyer's estimated profit potential */
  buyerProfit: number;
  /** Detailed breakdown of the calculation */
  breakdown: {
    arv: number;
    investorShare: number;
    repairs: number;
    assignmentFee: number;
    closingCosts: number;
  };
}

/**
 * Calculate the Maximum Allowable Offer for a wholesale deal.
 *
 * @param input - Deal parameters
 * @returns MAO calculation results
 */
export function calculateMAO(input: MAOInput): MAOOutput {
  const {
    arv,
    repairs,
    assignmentFee,
    closingCosts = Math.round(arv * 0.03), // Default: 3% of ARV
    investorPercent = 0.7, // Default: 70% rule
  } = input;

  const investorShare = Math.round(arv * investorPercent);
  const mao = investorShare - repairs - closingCosts - assignmentFee;
  const buyerTotal = mao + assignmentFee;
  const buyerProfit = arv - buyerTotal - repairs - closingCosts;

  return {
    mao: Math.round(mao),
    buyerTotal: Math.round(buyerTotal),
    buyerProfit: Math.round(buyerProfit),
    breakdown: {
      arv,
      investorShare,
      repairs,
      assignmentFee,
      closingCosts: Math.round(closingCosts),
    },
  };
}

// ─── CLI Interface ────────────────────────────────────────────────────────────

function printHelp(): void {
  console.log(`
MAO Calculator — Maximum Allowable Offer for Wholesale Real Estate

Usage:
  bun scripts/mao-calculator.ts --arv <value> --repairs <value> --fee <value> [options]

Required:
  --arv <number>      After Repair Value (what it's worth fully renovated)
  --repairs <number>  Estimated repair/renovation costs
  --fee <number>      Your assignment fee (your profit)

Optional:
  --closing <number>  Closing costs (default: 3% of ARV)
  --percent <number>  Investor's target % of ARV (default: 0.70 = 70% rule)
  --help              Show this help

Examples:
  bun scripts/mao-calculator.ts --arv 250000 --repairs 40000 --fee 12000
  bun scripts/mao-calculator.ts --arv 300000 --repairs 60000 --fee 15000 --percent 0.65
  bun scripts/mao-calculator.ts --arv 200000 --repairs 25000 --fee 10000 --closing 8000
`);
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function printResult(result: MAOOutput, input: MAOInput): void {
  const { breakdown } = result;
  const pct = ((input.investorPercent ?? 0.7) * 100).toFixed(0);

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║              MAO CALCULATION RESULTS                          ║
╠══════════════════════════════════════════════════════════════╣
║  After Repair Value (ARV):      ${formatCurrency(breakdown.arv).padStart(12)}          ║
║  Investor Share (${pct}% rule):    ${formatCurrency(breakdown.investorShare).padStart(12)}          ║
║  (-) Estimated Repairs:         ${formatCurrency(breakdown.repairs).padStart(12)}          ║
║  (-) Closing Costs:             ${formatCurrency(breakdown.closingCosts).padStart(12)}          ║
║  (-) Assignment Fee:            ${formatCurrency(breakdown.assignmentFee).padStart(12)}          ║
╠══════════════════════════════════════════════════════════════╣
║  MAX OFFER TO SELLER (MAO):     ${formatCurrency(result.mao).padStart(12)}          ║
╠══════════════════════════════════════════════════════════════╣
║  Buyer's Total Cost:            ${formatCurrency(result.buyerTotal).padStart(12)}          ║
║  Buyer's Profit Potential:      ${formatCurrency(result.buyerProfit).padStart(12)}          ║
╚══════════════════════════════════════════════════════════════╝`);

  if (result.mao <= 0) {
    console.log("⚠️  WARNING: MAO is zero or negative — this deal may not work at these numbers.");
  }
  if (result.buyerProfit < 30000) {
    console.log("⚠️  WARNING: Buyer profit is below $30K — may be hard to sell to investors.");
  }
  if (result.buyerProfit > 0) {
    console.log(`✅  Deal works! Buyer has ${formatCurrency(result.buyerProfit)} profit potential.`);
  }
}

// Only run CLI when executed directly (not when imported as a module)
if (import.meta.main) {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.length === 0) {
    printHelp();
    process.exit(0);
  }

  const params: Record<string, number> = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace("--", "");
    const value = parseFloat(args[i + 1] ?? "");
    if (key && !isNaN(value)) {
      params[key] = value;
    }
  }

  if (!params.arv || !params.repairs || !params.fee) {
    console.error("❌ Error: --arv, --repairs, and --fee are required.");
    printHelp();
    process.exit(1);
  }

  const input: MAOInput = {
    arv: params.arv,
    repairs: params.repairs,
    assignmentFee: params.fee,
    ...(params.closing !== undefined && { closingCosts: params.closing }),
    ...(params.percent !== undefined && { investorPercent: params.percent }),
  };

  const result = calculateMAO(input);
  printResult(result, input);
}
