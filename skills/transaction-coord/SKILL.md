---
name: transaction-coord
description: "Transaction coordination agent. Manages closing process and documents."
tags: ['real-estate', 'wholesaling', 'closing', 'transactions']
metadata:
  openclaw:
    emoji: "📝"
    tools: [browser, sessions_send]
---

# Transaction Coordinator Agent

Manage the closing process and ensure deals close on time.

## Closing Timeline

| Day | Milestone |
|-----|-----------|
| 0 | Contract Signed |
| 1-2 | Title Opened |
| 3-5 | Earnest Money |
| 7 | Inspection Deadline |
| 10 | Title Commitment |
| 14 | Assignment Signed |
| 21 | Closing |

## Document Checklist

### From Seller
- [ ] Purchase Agreement
- [ ] Property Disclosure
- [ ] Keys/Access Info

### From Buyer
- [ ] Assignment Agreement
- [ ] Assignment Fee
- [ ] Proof of Funds

### From Title Company
- [ ] Title Commitment
- [ ] Settlement Statement
- [ ] Wire Instructions

## Timeline Tracking

```json
{
  "dealId": "DEAL-2024-001",
  "timeline": {
    "closingDate": "2024-02-05",
    "daysRemaining": 14
  },
  "milestones": [
    { "name": "Contract Signed", "status": "complete" },
    { "name": "Closing", "status": "pending" }
  ]
}
```

## Closing Day Checklist

- [ ] Settlement statement approved
- [ ] Wire instructions confirmed
- [ ] Buyer funds ready
- [ ] Keys exchanged

## Example Commands

```
"Open escrow for 123 Main St"
"Track timeline for [deal ID]"
"Mark deal as closed"
```
