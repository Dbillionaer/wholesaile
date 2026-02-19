# Long-Term Memory

This file stores durable memories for the wholesale real estate multi-agent system. The orchestrator and all sub-agents can access this via `memory_search` and `memory_get`.

## Investment Criteria

<!-- Add your target investment criteria here -->

- **Target Markets**: [Add your target ZIP codes/cities]
- **Price Range**: $[MIN] - $[MAX]
- **Minimum Equity**: [X]%
- **Property Types**: [Single-family, Multi-family, Land, etc.]
- **Minimum Spread**: $[X] (ARV - Purchase - Repairs)

## Buyer List

<!-- Track your investor buyers -->

### Cash Buyers

| Name | Phone | Email | Criteria | Areas |
|------|-------|-------|----------|-------|
| [Buyer 1] | [Phone] | [Email] | [What they buy] | [Areas] |

### Assignable Contract Buyers

| Name | Phone | Email | Fee Range | Property Types |
|------|-------|-------|-----------|----------------|
| [Buyer 1] | [Phone] | [Email] | $5K-$15K | [Types] |

## Seller Scripts

### Initial Contact Script
```
Hi, this is [NAME]. I'm calling about your property at [ADDRESS]. 
I'm a local real estate investor and I'd like to make you a cash offer. 
Is now a good time to talk?
```

### Follow-up Script
```
Hi [NAME], this is [YOUR NAME] following up on our conversation about 
[ADDRESS]. Have you had a chance to think about my offer?
```

## Key Formulas

### MAO (Maximum Allowable Offer)
```
MAO = ARV × 0.70 - Repair Costs - Assignment Fee - Closing Costs
```

### 70% Rule
```
Max Purchase Price = ARV × 0.70 - Repair Costs
```

## Trusted Vendors

### Title Companies
| Company | Contact | Phone | Notes |
|---------|---------|-------|-------|
| [Company] | [Contact] | [Phone] | [Notes] |

### Contractors
| Company | Contact | Phone | Specialty | Notes |
|---------|---------|-------|-----------|-------|
| [Company] | [Contact] | [Phone] | [Specialty] | [Notes] |

### Attorneys
| Name | Phone | Specialty | Notes |
|------|-------|-----------|-------|
| [Name] | [Phone] | [Specialty] | [Notes] |

## Lessons Learned

<!-- Document mistakes and lessons for future reference -->

### [Date] - [Topic]
- What happened:
- What I learned:
- How to avoid in future:

## Goals

### Monthly Targets
- [ ] Leads generated: [X]
- [ ] Offers made: [X]
- [ ] Contracts signed: [X]
- [ ] Deals closed: [X]
- [ ] Revenue: $[X]

### Annual Targets
- [ ] Total deals: [X]
- [ ] Total revenue: $[X]

## Important Dates

| Date | Event | Notes |
|------|-------|-------|
| [Date] | [Event] | [Notes] |

## Compliance Notes

- Always disclose you're a wholesaler
- Never practice law without a license
- Follow state-specific wholesaling regulations
- Keep records of all transactions
