# Wholesale Real Estate Multi-Agent System

This workspace configures a team of specialized AI agents for wholesale real estate operations using OpenClaw's **orchestrator pattern**.

## Orchestrator Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR (Main Agent)                   │
│                   Your Central Command                          │
│                                                                 │
│  • Receives all incoming messages (WhatsApp, Telegram, etc.)   │
│  • Analyzes requests and decides which agent to spawn          │
│  • Uses sessions_spawn to delegate tasks                        │
│  • Collects results and delivers to user                        │
│  • Model: claude-opus-4-6 (high intelligence)                   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ sessions_spawn({ agentId: "lead-scout", task: "..." })
                      │
        ┌─────────────┼─────────────┬─────────────┬──────────────┐
        │             │             │             │              │
        ▼             ▼             ▼             ▼              ▼
┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌────────────┐
│   LEAD    │ │  MARKET   │ │ACQUISITION│ │  TITLE    │ │DISPOSITIONS│
│   SCOUT   │ │ ANALYST   │ │  MANAGER  │ │ RESEARCHER│ │  MANAGER   │
│    🔍     │ │    📊     │ │    🤝     │ │    📋     │ │     💰     │
│ (subagent)│ │ (subagent)│ │ (subagent)│ │ (subagent)│ │ (subagent) │
│  Sonnet   │ │  Sonnet   │ │  Sonnet   │ │  Sonnet   │ │   Sonnet   │
└───────────┘ └───────────┘ └───────────┘ └───────────┘ └────────────┘
                      │
                      │ Announces results back
                      ▼
              ┌───────────────┐
              │  ORCHESTRATOR │
              │  delivers to  │
              │     USER      │
              └───────────────┘
```

## How Coordination Works

### 1. User Sends Message
```
User (WhatsApp): "Find me deals in ZIP 90210 under $300k"
        │
        ▼
   ORCHESTRATOR receives message
```

### 2. Orchestrator Spawns Sub-Agent
```
Orchestrator analyzes request → Decides "lead-scout" is needed

sessions_spawn({
  agentId: "lead-scout",
  task: "Find distressed properties in ZIP 90210 under $300k",
  model: "anthropic/claude-sonnet-4-5"
})
```

### 3. Sub-Agent Works & Reports Back
```
lead-scout runs → Searches Zillow, Redfin, county records
        │
        ▼
Announces results back to Orchestrator:
"Found 5 potential leads: [property details...]"
```

### 4. Orchestrator May Chain Agents
```
Orchestrator: "Good leads! Now analyze them."
        │
        ▼
sessions_spawn({
  agentId: "market-analysis",
  task: "Analyze these 5 properties for ARV and MAO"
})
        │
        ▼
market-analysis reports back with deal analysis
        │
        ▼
Orchestrator delivers final results to user
```

## Agent Roles

### 1. Lead Scout 🔍
- **Purpose**: Find distressed properties and motivated sellers
- **Tools**: Browser automation, webhooks, public records
- **Output**: Qualified lead lists with property data

### 2. Market Analyst 📊
- **Purpose**: Analyze deals, calculate ARV, estimate repairs
- **Tools**: Browser (comps research), calculator
- **Output**: Deal analysis reports with buy recommendations

### 3. Acquisition Manager 🤝
- **Purpose**: Contact sellers, negotiate prices, secure contracts
- **Tools**: WhatsApp, Telegram, phone (Talk Mode)
- **Output**: Signed purchase agreements

### 4. Title Researcher 📋
- **Purpose**: Verify clear title, find liens, check for issues
- **Tools**: Browser (county records), document analysis
- **Output**: Title reports, due diligence checklists

### 5. Dispositions Manager 💰
- **Purpose**: Market deals to investor buyers
- **Tools**: Multi-channel messaging, CRM
- **Output**: Assignment contracts, closed deals

### 6. Transaction Coordinator 📝
- **Purpose**: Manage closing process, documents
- **Tools**: Document tools, calendar
- **Output**: Closing checklists, completed deals

## Communication Protocol

Agents communicate via `sessions_send`:

```
Orchestrator → Lead Scout: "Find deals in [ZIP CODE]"
Lead Scout → Orchestrator: "Found 15 potential leads"
Orchestrator → Market Analyst: "Analyze these properties"
Market Analyst → Orchestrator: "3 deals meet criteria"
Orchestrator → Acquisition: "Contact these sellers"
Acquisition → Orchestrator: "1 contract signed"
Orchestrator → Dispositions: "Market this deal"
Dispositions → Orchestrator: "Buyer found, assignment signed"
```

## Key Formulas

### Maximum Allowable Offer (MAO)
```
MAO = ARV × 0.70 - Repair Costs - Assignment Fee - Closing Costs
```

### Assignment Fee Range
- Standard: $5,000 - $15,000
- Premium deals: $15,000 - $25,000

## Lead Sources

1. **Driving for Dollars** - Manual input via mobile node
2. **Probate Records** - County court filings
3. **Tax Delinquent Lists** - County treasurer
4. **Code Violations** - City building department
5. **Expired Listings** - MLS (if licensed)
6. **Direct Mail Responses** - Phone/webhook input
7. **Skip Tracing** - Third-party APIs

## Workflow Stages

1. **Lead Generation** → Property identified
2. **Initial Screening** → Basic criteria met
3. **Deep Analysis** → ARV, repairs, MAO calculated
4. **Seller Contact** → Outreach initiated
5. **Negotiation** → Price agreed
6. **Contract Signed** → Purchase agreement executed
7. **Due Diligence** → Title clear, inspections done
8. **Marketing** → Deal blasted to buyers list
9. **Assignment** → Contract assigned to end buyer
10. **Closing** → Fee collected

## Configuration

See `openclaw.json` for channel and session configuration.
See `skills/` directory for agent-specific prompts and tools.
