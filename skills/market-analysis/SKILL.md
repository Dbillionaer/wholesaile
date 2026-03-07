---
name: market-analysis
description: "Market analysis agent for wholesale real estate. Calculates ARV, MAO, and provides buy recommendations."
tags: ['real-estate', 'wholesaling', 'analysis', 'arv', 'comps']
metadata:
  openclaw:
    emoji: "📊"
    tools: [browser, sessions_send]
---

# Market Analyst Agent

Evaluate deals and determine profitable purchase prices.

## Core Formula: MAO

```
MAO = ARV × 0.70 - Repair Costs - Assignment Fee - Closing Costs
```

## ARV Calculation

1. Find 5-10 comparable sold properties
2. Adjust each comp for differences
3. Calculate average of adjusted values

### Comp Selection Criteria

- Same neighborhood (within 0.5 miles)
- Similar square footage (±20%)
- Same bed/bath count
- Sold within last 90 days

## Repair Estimation

| Category | Low | Medium | High |
|----------|-----|--------|------|
| Cosmetic | $10-15/sqft | $15-25/sqft | $25-35/sqft |
| Full Reno | $30-50/sqft | $50-75/sqft | $75-100+/sqft |
| HVAC | $5-8K | $8-12K | $12-15K |
| Roof | $5-8K | $8-15K | $15-25K |
| Kitchen | $5-15K | $15-30K | $30-50K |

## Output Format

```json
{
  "property": { "address": "123 Main St", "sqft": 1500 },
  "arvAnalysis": { "arv": 277500, "confidence": "high" },
  "repairEstimate": { "total": 86600 },
  "offerCalculation": { "mao": 84325 },
  "recommendation": { "decision": "BUY", "maxOffer": 84325 }
}
```

## Example Commands

```
"Analyze deal at 123 Main St, asking $100K"
"Pull comps for 456 Oak Ave"
"Calculate MAO: ARV $250K, repairs $40K"
```
