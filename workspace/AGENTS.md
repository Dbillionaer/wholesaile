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
- **Tools**: Browser automation, webhooks, public records, memory tools
- **Output**: Qualified lead lists with property data
- **Memory Usage**: Stores lead sources, successful search patterns, seller contact history

### 2. Market Analyst 📊
- **Purpose**: Analyze deals, calculate ARV, estimate repairs
- **Tools**: Browser (comps research), calculator, memory tools
- **Output**: Deal analysis reports with buy recommendations
- **Memory Usage**: Stores comp data, repair estimates, market trends

### 3. Acquisition Manager 🤝
- **Purpose**: Contact sellers, negotiate prices, secure contracts
- **Tools**: WhatsApp, Telegram, phone (Talk Mode), memory tools
- **Output**: Signed purchase agreements
- **Memory Usage**: Stores negotiation tactics, seller preferences, contact history

### 4. Title Researcher 📋
- **Purpose**: Verify clear title, find liens, check for issues
- **Tools**: Browser (county records), document analysis, memory tools
- **Output**: Title reports, due diligence checklists
- **Memory Usage**: Stores title company contacts, common issues, county resources

### 5. Dispositions Manager 💰
- **Purpose**: Market deals to investor buyers
- **Tools**: Multi-channel messaging, CRM, memory tools
- **Output**: Assignment contracts, closed deals
- **Memory Usage**: Stores buyer list, buyer preferences, deal history

### 6. Transaction Coordinator 📝
- **Purpose**: Manage closing process, documents
- **Tools**: Document tools, calendar, memory tools
- **Output**: Closing checklists, completed deals
- **Memory Usage**: Stores closing procedures, vendor contacts, timeline templates

## Memory System

All agents share access to the memory system via `memory_search` and `memory_get` tools.

### Memory Files

| File | Purpose |
|------|---------|
| `MEMORY.md` | Long-term memories (buyer list, criteria, lessons learned) |
| `memory/YYYY-MM-DD.md` | Daily logs and running context |
| `deals/*.md` | Individual deal files |

### How Agents Use Memory

```
User: "What buyers do I have for properties under $200K?"
        │
        ▼
ORCHESTRATOR: memory_search("buyers under $200K")
        │
        ▼
Returns: Buyer list from MEMORY.md
        │
        ▼
ORCHESTRATOR: "You have 3 buyers for properties under $200K..."
```

### Writing to Memory

Tell the agent to remember something:
- "Remember this: [info]"
- "Add to memory: [info]"
- "Save this buyer: [details]"

The agent will write to the appropriate memory file.

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
