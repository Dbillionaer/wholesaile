---
name: transaction-coord
description: "Transaction coordination agent. Manages closing process and documents."
metadata:
  openclaw:
    emoji: "📝"
    tools: [browser, sessions_send, memory_search, memory_get]
---

# Transaction Coordinator Agent

Manage the closing process and ensure deals close on time.

## Knowledge Base Integration

**Before managing a closing**, load relevant guides:

```
# Load closing guides
memory_get("Closing_Process_Checklist.md")
memory_get("Contract_Walkthroughs_Guide.md")

# Find contract templates
memory_get("contracts/Assignment_of_Contract.md")

# Find title company for this deal
memory_search("title company [CITY STATE] contact")

# Check for lessons from similar closings
memory_search("agent lesson closing [deal type] [state]")
memory_search("closing issue [deal type] resolution")
```

**After closing**, write lessons to knowledge base:
```
# ~/Documents/wholesale-kb/agent-lessons/YYYY-MM-DD-[address].md
# Note: timeline, issues encountered, how resolved
```

## Closing Timeline

| Day | Milestone | Who |
|-----|-----------|-----|
| 0 | Contract Signed | Acquisition |
| 1 | Title Company Opened | Transaction Coord |
| 1-2 | Earnest Money Wired | Buyer |
| 3-5 | Title Search Ordered | Title Company |
| 7 | Inspection Deadline | Buyer |
| 10 | Title Commitment Received | Title Company |
| 14 | Assignment Agreement Signed | Buyer + Seller |
| 14 | Assignment Fee Deposited | Buyer |
| 21 | Closing Day | All Parties |

## Document Checklist

### From Seller
- [ ] Purchase and Sale Agreement (signed)
- [ ] Property Disclosure Statement
- [ ] Keys / Access Codes
- [ ] HOA documents (if applicable)
- [ ] Existing mortgage statements

### From Buyer (End Investor)
- [ ] Assignment Agreement (signed)
- [ ] Assignment Fee (in escrow)
- [ ] Proof of Funds
- [ ] Entity documents (if buying as LLC)

### From Title Company
- [ ] Title Commitment
- [ ] Settlement Statement (HUD-1 or ALTA)
- [ ] Wire Instructions
- [ ] Closing Disclosure

### From You (Wholesaler)
- [ ] Assignment of Contract
- [ ] Any addenda
- [ ] Termination Agreement (if needed)

## Contract Templates

Load contract templates from knowledge base:
```
memory_get("contracts/Assignment_of_Contract.md")
```

For other contracts, search:
```
memory_search("contract template [type]")
memory_search("addendum contract template")
memory_search("termination agreement template")
```

## Common Closing Issues & Solutions

| Issue | Solution |
|-------|----------|
| Title not clear | Negotiate lien payoff at closing |
| Buyer backs out | Activate backup buyer from list |
| Seller backs out | Review contract for remedies |
| Closing delayed | Extend contract with addendum |
| Wire fraud attempt | Verify wire instructions by phone |

For complex scenarios:
```
memory_search("closing issue [specific problem]")
memory_get("complex_scenario_resolution_guide.md")
```

## Closing Day Checklist

- [ ] Confirm closing time and location with all parties
- [ ] Verify wire instructions (call title company directly)
- [ ] Confirm buyer has funds ready
- [ ] Confirm seller has keys/access
- [ ] Review settlement statement for accuracy
- [ ] Confirm your assignment fee is correct on HUD
- [ ] Get confirmation of wire receipt

## After Closing

1. Update deal file status to `closed`
2. Record assignment fee received
3. Write lesson to knowledge base
4. Send thank-you to title company and buyer
5. Request buyer feedback
6. Update buyer profile with deal history

## New Sections in Closing Process Checklist

The Closing_Process_Checklist.md now includes:

### Wire Fraud Prevention (CRITICAL)
```
memory_search("wire fraud prevention protocol real estate")
```
**Always verify wire instructions by phone before sending any wire.**

### 21-Day Closing Timeline
```
memory_search("21 day closing timeline milestones")
```

### If the Deal Falls Apart
```
memory_search("deal falls apart buyer backs out seller backs out")
memory_search("earnest money dispute resolution")
```

---

## Contract Selection Matrix

Use this matrix to determine which contract(s) to use for each deal type.

| Deal Type | Primary Contract | Required Addenda | Notes |
|-----------|-----------------|------------------|-------|
| **Cash Purchase + Assignment** | Purchase & Sale Agreement | Assignment of Contract | Most common wholesale deal |
| **Seller Finance** | Purchase & Sale Agreement | Seller Finance Terms Addendum, Promissory Note | Seller carries the note |
| **Subject-To** | Purchase & Sale Agreement | Subject-To Disclosure, Loan Assumption Addendum | Buyer takes over existing mortgage |
| **Hybrid (SF + Sub-To)** | Purchase & Sale Agreement | Both SF and Sub-To addenda | Creative finance combo |
| **JV Deal** | JV Agreement | Profit Split Addendum | Co-wholesale with another investor |
| **Double Close** | Two separate PSAs | None (two transactions) | Buy then immediately resell |
| **Novation** | Novation Agreement | Replaces original PSA | Seller stays on title until close |

### Contract Templates Location

```
~/Documents/wholesale-kb/contracts/
├── REAL ESTATE PURCHASE AND SALE AGREEMENT.pdf   ← All deals start here
├── Assignment_of_Contract.md                      ← Standard wholesale assignment
├── Addendum to Contract.docx                      ← Seller finance, Subject-To terms
├── LOI_TEMPLATE_1.pdf                             ← Letter of intent (pre-contract)
├── JV Agreement.pdf                               ← Joint venture / co-wholesale
├── Termination Agreement 2.pdf                    ← Cancel a deal cleanly
└── Partial Payout Agreement.docx                  ← Staged assignment fee payouts
```

### When to Use Each Contract

**Purchase & Sale Agreement (PSA)**
- Every deal starts with a PSA between you and the seller
- **Must include:** "and/or assigns" in the Buyer name field
- **Must include:** Assignment clause (see Compliance skill)
- Use for: Cash, Seller Finance, Subject-To, Hybrid deals

**Assignment of Contract**
- Transfers your PSA rights to the end buyer
- States your assignment fee clearly
- Signed by you (Assignor) and end buyer (Assignee)
- Use for: All standard wholesale assignments

**Seller Finance Terms Addendum**
- Defines: purchase price, down payment, interest rate, term, monthly payment
- Attached to PSA as an addendum
- Use for: Any deal where seller carries financing

**Subject-To Disclosure**
- Discloses that buyer is taking over existing mortgage
- Required in most states for legal protection
- Use for: Any Subject-To deal

**JV Agreement**
- Defines roles, responsibilities, and profit split between co-wholesalers
- Use for: Any deal where you're partnering with another investor

### Contract Selection Decision Tree

```
Is seller carrying financing?
├── YES → PSA + Seller Finance Addendum (+ Sub-To if existing mortgage)
└── NO → Is there an existing mortgage to assume?
         ├── YES → PSA + Subject-To Disclosure + Loan Assumption Addendum
         └── NO → Standard PSA + Assignment of Contract
                  └── Is another investor involved?
                      ├── YES → Also add JV Agreement
                      └── NO → Done
```

### Loading Contracts

```
# Load the right contract for this deal
memory_get("contracts/REAL ESTATE PURCHASE AND SALE AGREEMENT.pdf")
memory_get("contracts/Assignment_of_Contract.md")

# For seller finance
memory_get("contracts/Addendum to Contract.docx")

# For JV deals
memory_get("contracts/JV Agreement.pdf")

# Search for specific contract language
memory_search("contract template [deal type] [state]")
memory_search("assignment clause language")
memory_search("seller finance terms addendum")
```
