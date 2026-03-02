---
name: compliance
description: "Legal compliance agent. Ensures wholesale activities comply with state and federal regulations including TCPA, disclosure requirements, and contract law."
metadata:
  openclaw:
    emoji: "⚖️"
    tools: [read, memory_search, memory_get]
---

# Compliance Agent

Ensure all wholesale real estate activities comply with applicable laws and regulations.

> **Disclaimer:** This skill provides general guidance only. Always consult a licensed real estate attorney in your state before executing deals. Laws change frequently.

## Knowledge Base Integration

```
# Load compliance guides
memory_get("compliance/state_requirements.md")
memory_get("compliance/tcpa_guide.md")

# Check state-specific rules
memory_search("compliance [STATE] wholesaling laws disclosure")
memory_search("wholesaling legal [STATE] license requirement")

# TCPA guidance
memory_search("TCPA consent requirements SMS marketing")
memory_search("do not call list [phone number]")
```

---

## State-by-State Wholesaling Requirements

### States with Specific Disclosure Requirements

| State | Disclosure Required | Form/Method | Notes |
|-------|---------------------|-------------|-------|
| **Florida** | Yes | Written in contract | Must disclose intent to assign |
| **Texas** | Yes | Written in contract | Must disclose you're a principal, not agent |
| **California** | Yes | Written disclosure | Must disclose principal status; DRE oversight |
| **Georgia** | Recommended | Verbal + written | No specific form required; best practice to disclose |
| **Ohio** | Yes | Written disclosure | Required before contract execution |
| **Illinois** | Yes | Written in contract | Must disclose in contract; >1 deal/year may need license |
| **North Carolina** | Yes | Written disclosure | Must disclose equitable interest |
| **Virginia** | Yes | Written disclosure | Advertising restrictions apply |

### States Requiring Real Estate Attorney at Closing

These states require a licensed real estate attorney to conduct closings:
- Georgia
- South Carolina
- Massachusetts
- New York
- Delaware
- Connecticut
- Vermont
- West Virginia

### States with Licensing Concerns

| State | Issue | Guidance |
|-------|-------|----------|
| **Illinois** | May need license for >1 deal/year | Consult attorney; use entity structure |
| **Oklahoma** | Strict advertising rules | Market the contract, never the property |
| **Montana** | Limited wholesaling | Must have genuine equitable interest |
| **Virginia** | Advertising restrictions | Cannot advertise property you don't own |
| **New Mexico** | License may be required | Consult attorney before first deal |

---

## Required Contract Language

### Assignment Clause (EVERY contract must include)

```
"Buyer: [Your Name] and/or assigns"

AND

"Buyer reserves the right to assign this contract to any third party
at Buyer's sole discretion. Seller acknowledges and consents to such
assignment. Assignee shall assume all obligations of Buyer hereunder."
```

### Seller Disclosure Statement (Recommended for all deals)

```
INVESTOR DISCLOSURE

Buyer is a real estate investor who intends to purchase this property
for investment purposes. Buyer may assign this contract to a third
party investor prior to closing. Buyer is NOT acting as a real estate
agent or broker and is NOT representing Seller's interests.

Seller acknowledges reading and understanding this disclosure.

Seller Signature: _________________ Date: _________
```

---

## TCPA Compliance (SMS/Phone Outreach)

### What TCPA Requires

The Telephone Consumer Protection Act (TCPA) governs marketing calls and texts:

- **Prior express consent** required before sending marketing texts
- **Opt-out requests** must be honored within 24 hours
- **Contact hours:** Only 8 AM – 9 PM in recipient's local time zone
- **Do Not Call Registry:** Check before calling any number
- **Penalties:** Up to $1,500 per violation (per message/call)

### Consent Requirements by Contact Type

| Contact Type | Consent Required | How to Obtain |
|-------------|-----------------|---------------|
| Inbound call (seller called you) | No | They initiated contact |
| Response to direct mail | Implied | They responded to your mail |
| Cold call from list | Yes | Must have prior consent |
| Cold text from list | Yes | Must have prior written consent |
| Follow-up after initial contact | Yes | Document initial consent |

### Consent Documentation

When a seller provides their number, document it:

```
# Create consent record
# File: ~/Documents/wholesale-kb/consent/YYYY-MM-DD-[phone-last4].md

---
phone: "+15551234567"
source: "direct_mail_response"
consent_type: "inbound_call"
consent_date: "2026-03-02T12:00:00Z"
consent_notes: "Seller called our number from yellow letter campaign"
property: "123 Main St, Atlanta, GA 30318"
---
```

### Opt-Out Handling

When a seller/buyer texts STOP, UNSUBSCRIBE, CANCEL, END, or QUIT:

1. **Immediately** add to do-not-contact list
2. Send confirmation: "You've been removed from our contact list."
3. Log opt-out with timestamp
4. **Never contact again** from any channel

```
# Create do-not-contact record
# File: ~/Documents/wholesale-kb/do-not-contact/[phone-last4].md

---
phone: "+15551234567"
opt_out_date: "2026-03-02T14:30:00Z"
opt_out_method: "text"
opt_out_phrase: "STOP"
property: "456 Oak Ave, Atlanta, GA 30310"
---
```

### Before Any Outreach — Checklist

- [ ] Check do-not-contact list: `memory_search("do not contact [phone]")`
- [ ] Verify consent exists: `memory_search("consent [phone]")`
- [ ] Confirm contact time is 8 AM – 9 PM recipient's local time
- [ ] Message includes opt-out instructions ("Reply STOP to opt out")
- [ ] Number is not on National Do Not Call Registry

---

## Prohibited Activities

| Activity | Why Prohibited | Risk |
|----------|----------------|------|
| Marketing the property (not the contract) | You don't own it | License law violation |
| Acting as a real estate agent | You're a principal | License law violation |
| Representing the seller | Conflict of interest | License law violation |
| Giving legal advice | Unauthorized practice of law | Criminal liability |
| Misrepresenting your role | Fraud | Civil + criminal liability |
| Contacting opted-out numbers | TCPA violation | $1,500/message fine |

---

## Advertising Rules

### Safe Language (Use These)

- "I have a property under contract at [address]"
- "Equitable interest for sale at [address]"
- "Assignment of contract available at [address]"
- "Investor special — contract assignment"

### Unsafe Language (Avoid These)

- "For sale by owner" (you're not the owner)
- "Selling [address]" (you're selling a contract, not the property)
- "I own [address]" (you don't own it yet)
- "Buy this house from me" (implies ownership)

---

## Compliance Checklist for Each Deal

### Before Signing Contract with Seller

- [ ] Disclosure statement signed by seller
- [ ] "and/or assigns" in buyer name
- [ ] Assignment clause in contract
- [ ] Attorney state? → Engage closing attorney
- [ ] State-specific requirements met (see table above)

### Before Marketing to Buyers

- [ ] Contract is fully executed (signed by both parties)
- [ ] You have genuine equitable interest
- [ ] Marketing the contract, not the property
- [ ] Using safe advertising language

### Before Closing

- [ ] Assignment agreement signed by buyer
- [ ] Assignment fee documented
- [ ] Title company notified of assignment
- [ ] All parties have copies of all documents

---

## Knowledge Base Queries

```
# State-specific requirements
memory_search("compliance [STATE] wholesaling disclosure requirement")
memory_search("real estate license [STATE] wholesaling exemption")

# Contract language
memory_search("assignment clause contract language")
memory_search("investor disclosure statement template")

# TCPA
memory_search("TCPA consent documentation")
memory_search("do not contact list [phone number]")

# Attorney states
memory_search("closing attorney required [STATE]")
```
