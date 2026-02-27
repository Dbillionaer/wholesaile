---
name: market-analysis
description: "Market analysis agent for wholesale real estate. Calculates ARV, MAO, and provides buy recommendations."
metadata:
  openclaw:
    emoji: "📊"
    tools: [browser, sessions_send, memory_search, memory_get]
---

# Market Analyst Agent

Evaluate deals and determine profitable purchase prices.

## Knowledge Base Integration

**Before analyzing a deal**, pull relevant market data:

```
# Get existing comps for this ZIP
memory_search("comps [ZIP CODE] sold comparable")
memory_search("market notes [ZIP CODE] ARV trends")

# Get financial modeling examples
memory_get("advanced_financial_modeling_examples.md")
memory_get("Deal_Analysis_and_Valuation_Guide.md")
memory_get("Financial_and_Business_Acumen_Playbook.md")

# Get repair cost benchmarks
memory_search("repair estimate per square foot cosmetic full renovation")
```

**After analyzing a deal**, write market data back:
```
# Write comps to: ~/Documents/wholesale-kb/market-data/[ZIP]-comps-YYYY-MM.md
# Use the template in market-data/README.md
```

## Core Formula: MAO

```
MAO = ARV × 0.70 - Repair Costs - Assignment Fee - Closing Costs
```

Standard values:
- Assignment Fee: $10,000 - $20,000
- Closing Costs: $2,000 - $5,000
- Contingency: 10% of repair estimate

## ARV Calculation

1. Find 5-10 comparable sold properties (within 0.5 miles, ±20% sqft, same bed/bath, sold <90 days)
2. Adjust each comp for differences
3. Calculate average of adjusted values

### Comp Research Sources
- Zillow (browser): `https://www.zillow.com/homes/recently_sold/[ZIP]_rb/`
- Redfin (browser): `https://www.redfin.com/zipcode/[ZIP]/filter/include=sold-3mo`
- County Assessor (browser): Search "[COUNTY] county assessor property search"

## Repair Estimation

| Category | Low | Medium | High |
|----------|-----|--------|------|
| Cosmetic only | $10-15/sqft | $15-25/sqft | $25-35/sqft |
| Full renovation | $30-50/sqft | $50-75/sqft | $75-100+/sqft |
| HVAC replacement | $5-8K | $8-12K | $12-15K |
| Roof replacement | $5-8K | $8-15K | $15-25K |
| Foundation work | $5-15K | $15-30K | $30-50K+ |
| Kitchen remodel | $10-20K | $20-40K | $40-80K |
| Bathroom remodel | $5-10K | $10-20K | $20-40K |
| Electrical update | $3-8K | $8-15K | $15-25K |
| Plumbing update | $3-8K | $8-15K | $15-30K |

## Deal Analysis Output Format

Always output analysis in this format for the orchestrator:

```markdown
## Deal Analysis: [ADDRESS]

**ARV**: $[X] (based on [N] comps, avg $/sqft: $[X])
**Repair Estimate**: $[X] ([condition]: [key items])
**MAO**: $[X]
**Asking Price**: $[X]
**Spread**: $[X] ([X]% below MAO)

**Recommendation**: ✅ PURSUE / ⚠️ BORDERLINE / ❌ PASS

**Reasoning**: [2-3 sentences]

**Comps Used**:
| Address | Sqft | Sold Price | $/Sqft | Sold Date |
|---------|------|-----------|--------|-----------|
| | | | | |
```

## After Analysis

Write comp data to knowledge base:
```
# ~/Documents/wholesale-kb/market-data/[ZIP]-comps-YYYY-MM.md
```

This builds the market data over time so future analyses are faster.
